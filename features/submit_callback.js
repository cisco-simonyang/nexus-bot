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
                    userId = message.value.userId;
                    let nexusList = util.nexus.get(userId);
                    if (Object.entries(nexusList).length == 0) {
                        await util.warn(bot, message, 'No nexus is registered. Please add nexus before alarm setup.');
                    } else {
                        const reference = util.alarm.reference.get(userId);
                        let msg = '';
                        let alarmOn = false;
                        if (message.value.cpu || message.value.cpu == 'true') {
                            msg = `CPU usage exceeded the threshold value(${message.value.cpu_threshold}%)`;
                            alarmOn = true;
                        } else if (message.value.memory || message.value.memory == 'true') {
                            msg = `Memory usage exceeded the threshold value(${message.value.memory_threshold}%)`;
                            alarmOn = true;
                        } else if (message.value.port_change || message.value.port_change == 'true') {
                            msg = `Port on Nexus`;
                            alarmOn = true;
                        }

                        if (alarmOn) {
                            const alarmId = setInterval(async () => {
                                let bot = await controller.spawn();
                                await bot.changeContext(reference);
                                let obj = Object.assign({}, cards['msg_warning']);
                                obj['content'] = util.adaptive.bind(cards['msg_warning'], {
                                    message: msg
                                });
                                await bot.say({
                                    text: "cards not supported on this platform yet",
                                    attachments: obj
                                });
                            }, message.value.interval * 1000);
                            util.alarm.on(userId, alarmId);
                            await util.success(bot, message, 'Alarm has been turned on.')
                        } else {
                            await util.warn(bot, message, 'No alarm condition is configured.');
                        }
                    }

                    break;
                case 'add_nexus':
                    userId = message.value.userId;
                    let result = await api.showVersion(message.value.ip_addr, message.value.port);
                    util.nexus.add(userId, message.value.ip_addr, message.value.port, result);
                    await util.success(bot, message, 'Nexus has been added.')
                    break;
                case 'del_nexus':
                    userId = message.value.userId;
                    if (message.value.all) {
                        util.nexus.deleteAll(userId);
                    } else {
                        const target = JSON.parse(message.value.target);
                        util.nexus.delete(userId, target.ip, target.port);
                    }
                    await util.success(bot, message, 'Nexus has been removed.');
                    break;
                case 'view_interface':
                    params = message.value;
                    params.endpoint = api.getEndpoint(params.ip, params.port);
                    detail = await api.showInterfaceDetail(params.ip, params.port, params.interface);
                    const data = {
                        info: params,
                        detail: Object.assign({ eth_ip_addr: '', eth_ip_mask: '', hw_addr: '', eth_mode: '' }, detail)
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