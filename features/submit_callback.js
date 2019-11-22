const util = require('../util/util');
const api = require('../util/api_service');
const cards = require('../lib/response_card');

module.exports = function (controller) {

    let alarmSetting;

    controller.on('attachmentActions', async (bot, message) => {
        let markdown = "Thanks.  Received:  \n```\n" + JSON.stringify(message.value) + "\n```\n";
        let userId;
        let params;

        console.log('submit message arrived!!!!!', message.value);

        try {
            switch (message.value.command) {
                case 'alarm_on':
                    util.success(bot, message, 'Alarm has been turned on.')
                    break;
                case 'add_nexus':
                    userId = message.value.userId;
                    let result = await api.showVersion(message.value.ip_addr, message.value.port);
                    util.nexus.add(userId, message.value.ip_addr, message.value.port, result);
                    util.success(bot, message, 'Nexus has been added.')
                    break;
                case 'del_nexus':
                    userId = message.value.userId;
                    if (message.value.all) {
                        util.nexus.deleteAll(userId);
                    } else {
                        const target = JSON.parse(message.value.target);
                        util.nexus.delete(userId, target.ip, target.port);
                    }
                    util.success(bot, message, 'Nexus has been removed.');
                    break;
                case 'view_interface':
                    params = message.value;
                    params.endpoint = api.getEndpoint(params.ip, params.port);
                    const data = {
                        info: params,
                        detail: await api.showInterfaceDetail(params.ip, params.port, params.interface)
                    };
                    let obj = Object.assign({}, cards['view_interface']);
                    obj['content'] = util.adaptive.bind(obj, data);
                    console.log(JSON.stringify(obj));
                    await bot.reply(message, {
                        text: "cards not supported on this platform yet",
                        attachments: obj
                    });
                    break;
                case 'config_interface':
                    params = message.value;
                    break;
                default:
                    break;

            }
        } catch (e) {
            console.log('error =====', e);
            util.error(bot, message, 'Error has occured. Please try again.')
        }

    });

}