const request = require('request-promise-native')
require('dotenv').config();


const options = {
    url: 'http://112.216.179.85:1102/ins',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic YWRtaW46ITIzNFF3ZXI='
    },
    json : {
        ins_api: {
            "version": "1.0",
            "type": "cli_show",
            "chunk": "0",
            "sid": "1",
            input: "",
            "output_format": "json"
        }
    }
}



class APIService {

    // cli command
    async cli(command) {
        options.json.ins_api.input = command;
        const result = await request.post(options);
        console.log('@@@@@@@', result);
        if (result.ins_api.outputs.output.body) {
            const body = JSON.stringify(result.ins_api.outputs.output.body);
            console.log('length ==== ', body.length);
            return body;
        } else {
            return 'Invalid command';
        }
    }

    // up port and 
    async showInterfaceBrief() {
        options.json.ins_api.input = 'show interface brief';
        const result = await request.post(options);

        const interfaces = result.ins_api.outputs.output.body.TABLE_interface.ROW_interface;
        let total_interface = 0;
        let up_interface = 0;
        let down_interface = 0;
        for (let i in interfaces) {
            total_interface ++;
            if (interfaces[i]['state'] == 'up' ) {
                up_interface ++;
            } else {
                down_interface ++;
            }
        }
        return 'total: ' + total_interface + ', up : ' + up_interface + ', down: ' + down_interface
        // return result;
    }

    async showLoggingLog() {
        options.json.ins_api.input = 'show logging log';
        const result = await request.post(options);
        return result;
    }

    async showLoggingLog() {
        options.json.ins_api.input = 'show logging log';
        const result = await request.post(options);
        return result;
    }

}

module.exports = new APIService();