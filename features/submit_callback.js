const cards = require('../lib/response_card');
const util = require('../util/util');
const api = require('../util/api_service');

module.exports = function (controller) {

    let alarmSetting;


    async function success(bot, message, msg) {
        let obj = Object.assign({}, cards['msg_success']);
        obj['content'] = util.adaptive.bind(cards['msg_success'], {
            message: msg
        });
        console.log(obj)
        await bot.reply(message, {
            text: "cards not supported on this platform yet",
            attachments: obj
        });
        return;
    }

    async function error(bot, message, msg) {
        let obj = Object.assign({}, cards['msg_error']);
        obj['content'] = util.adaptive.bind(cards['msg_error'], {
            message: msg
        });

        await bot.reply(message, {
            text: "cards not supported on this platform yet",
            attachments: obj
        });
    }

    controller.on('attachmentActions', async (bot, message) => {
        let markdown = "Thanks.  Received:  \n```\n" + JSON.stringify(message.value) + "\n```\n";
        const userId = message.personEmail;

        console.log('submit message arrived!!!!!', message.value);

        try {
            switch (message.value.command) {
                case 'alarm_on':
                    success(bot, message, 'Alarm has turned on.')
                    break;
                case 'add_nexus':
                    let result = await api.showVersion(message.value.ip_addr);
                    util.nexus.add(userId, message.value.ip_addr, message.value.port, result);
                    success(bot, message, 'Nexus has been added.')
                    break;
                case 'del_nexus':
                    if (message.value.all) {
                        util.nexus.deleteAll(userId);
                    } else {
                        const target = JSON.parse(message.value.target);
                        util.nexus.delete(userId, target.ip, target.port);
                    }
                    success(bot, message, 'Nexus has been removed.');
                    break;
                default:
                    break;

            }
        } catch (e) {
            error(bot, message, 'Error has occured. Please try again.')
        }



    });

}