require('dotenv').config();
const request = require('request-promise-native')

let options = {
    url: 'http://112.216.179.85:10000/ins',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic YWRtaW46ITIzNFF3ZXI='
        // 'Authorization': 'Basic YWRtaW46Q2lzY28xMjM='

    },
    json: {
        ins_api: {
            "version": "1.0",
            "type": "cli_show",
            "chunk": "0",
            "sid": "sid",
            "input": "",
            "output_format": "json"
        }
    }
}



class APIService {

    getEndpoint(ip, port) {
        return `http://${ip}:${port}/`;
    }

    getUrl(ip, port) {
        return `http://${ip}:${port}/ins`;
    }

    async showVersion(ip, port) {
        options.url = this.getUrl(ip, port);
        options.json.ins_api.input = 'show version';
        const result = await request.post(options);
        if (result.ins_api.outputs.output.code == '200') {
            // console.log(JSON.stringify(result))
            return result.ins_api.outputs.output.body;
        } else {
            throw new Error('Network Error');
        }
    }

    // 
    async showInterfaceDetail(ip, port, nic) {
        try {
            options.url = this.getUrl(ip, port);
            options.json.ins_api.input = `show interface ${nic}`;
            const result = await request.post(options);

            if (result.ins_api.outputs.output.code == '200') {
                return result.ins_api.outputs.output.body.TABLE_interface.ROW_interface;
            } else {
                throw new Error('[Network Error] show interface detail');
            }
        } catch (e) {

        }

    }

    // 
    async showInterfaceBrief(ip, port) {
        options.url = this.getUrl(ip, port);
        options.json.ins_api.input = 'show interface brief';
        const result = await request.post(options);

        if (result.ins_api.outputs.output.code == '200') {
            const interfaces = result.ins_api.outputs.output.body.TABLE_interface.ROW_interface;
            let total_count = 0;
            let up_count = 0;
            let down_count = 0;
            for (let i in interfaces) {
                total_count++;
                if (interfaces[i]['state'] == 'up') {
                    up_count++;
                } else {
                    down_count++;
                }
            }
            return {
                count: {
                    total: total_count,
                    up: up_count,
                    down: down_count
                },
                interfaces: interfaces
            };
        } else {
            throw new Error('[Network Error] show interfacebrief');
        }
    }

    // 
    async showSystemResources(ip, port) {
        options.url = this.getUrl(ip, port);
        options.json.ins_api.input = 'show system resources';
        const result = await request.post(options);

        if (result.ins_api.outputs.output.code == '200') {
            return result.ins_api.outputs.output.body;
        } else {
            throw new Error('[Network Error] show system resources');
        }
    }


    // async test(ip) {
    //     let statusCode;
    //     let result = await request({
    //         method: 'GET',
    //         url : `http://${ip}:${port}`,
    //         headers: {
    //             'Authorization': 'Basic YWRtaW46ITIzNFF3ZXI='
    //         }
    //     }).on('response', (res) => {
    //         statusCode = res.statusCode;
    //     }).then(() => {
    //         if (statusCode == 200) {
    //             return true;
    //         } else {
    //             return false;
    //         }
    //     });
    //     return result;
    // }


    // cli command
    async cli(command) {
        options.json.ins_api.input = command;
        const result = await request.post(options);
        if (result.ins_api.outputs.output.body) {
            const body = JSON.stringify(result.ins_api.outputs.output.body);
            return body;
        } else {
            return 'Invalid command';
        }
    }



}

module.exports = new APIService();

