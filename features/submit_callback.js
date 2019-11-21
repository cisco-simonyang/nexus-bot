const cards = require('../lib/response_card');
const util = require('../util/util');
const api = require('../util/api_service');

module.exports = function (controller) {

    let alarmSetting;


    

    

    controller.on('attachmentActions', async (bot, message) => {
        let markdown = "Thanks.  Received:  \n```\n" + JSON.stringify(message.value) + "\n```\n";
        let userId;
        
        console.log('submit message arrived!!!!!', message.value);

        try {
            switch (message.value.command) {
                case 'alarm_on':
                    util.success(bot, message, 'Alarm has turned on.')
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
                default:
                    break;

            }
        } catch (e) {
            console.log('error =====', e);
            util.error(bot, message, 'Error has occured. Please try again.')
        }

    });

}