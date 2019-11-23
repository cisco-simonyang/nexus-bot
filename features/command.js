const { BotkitConversation } = require('botkit');
const service = require('../util/api_service.js');
const util = require('../util/util.js');
const cards = require('../lib/response_card');



module.exports = function (controller) {

    /**
     * test : show a test layout
     */
    controller.hears(['test'], 'message,direct_message', async (bot, message) => {
        await bot.reply(message, {
            text: "cards not supported on this platform yet",
            attachments: cards['test']
        });
    });

    /**
     * 인사말에 대한 응답.
     */
    controller.hears(['help', 'hi', 'hello', 'howdy', 'hey', 'aloha', 'hola', 'bonjour', 'oi'], 'message,direct_message', async (bot, message) => {
        await bot.reply(message, {
            text: "cards not supported on this platform yet",
            attachments: cards['greeting']
        });
    });

    /**
     * alarm on / off
     */
    controller.hears(['alarm on'], 'message,direct_message', async (bot, message) => {
        const userId = message.personEmail;
        util.alarm.reference.put(userId, message.reference);

        let obj = Object.assign({}, cards['alarm_on']);
        obj['content'] = util.adaptive.bind(cards['alarm_on'], {
            userId: userId
        });
        await bot.reply(message, {
            text: "cards not supported on this platform yet",
            attachments: obj
        });
    });

    controller.hears(['alarm off'], 'message,direct_message', async (bot, message) => {
        util.alarm.off(message.personEmail);
        await util.success(bot, message, 'Alarm has been turned off.');
    });

    /**
     * show brief information of nexus
     */
    controller.hears(['status', 'brief'], 'message,direct_message', async (bot, message) => {
        const userId = message.personEmail;
        const nexusList = util.nexus.get(userId);
        //console.log('brief ===> ', nexusList);

        if (Object.entries(nexusList).length == 0) {
            util.warn(bot, message, 'No nexus is registered.');
        } else {
            // util.info(bot, message, 'Nothing has been changed.'); // TODO
            for (let i in nexusList) {
                const data = {
                    userId: message.personEmail,
                    info: Object.assign({bios_ver_str: '', nxos_ver_str: ''}, nexusList[i]),
                    nic: await service.showInterfaceBrief(nexusList[i].ip, nexusList[i].port),
                    system: await service.showSystemResources(nexusList[i].ip, nexusList[i].port)
                }

                data.system.cpu_usage = (parseFloat(data.system.cpu_state_user) + parseFloat(data.system.cpu_state_kernel)).toFixed(2);
                data.system.memory_usage = (parseFloat(data.system.memory_usage_used) / parseFloat(data.system.memory_usage_total) * 100).toFixed(2);
                for (let i in data.nic.interfaces) {
                    if (data.nic.interfaces[i].state == 'up') {
                        data.nic.interfaces[i].color = 'good';
                        data.nic.interfaces[i].iconUrl = 'https://d1nhio0ox7pgb.cloudfront.net/_img/v_collection_png/16x16/plain/bullet_square_glass_green.png';
                    } else {
                        data.nic.interfaces[i].color = 'attention';
                        data.nic.interfaces[i].iconUrl = 'https://d1nhio0ox7pgb.cloudfront.net/_img/v_collection_png/32x32/shadow/bullet_square_glass_red.png';
                    }
                }
                let obj = Object.assign({}, cards['brief']);
                obj['content'] = util.adaptive.bind(obj, data);
                console.log('brief ====', JSON.stringify(obj));
                await bot.reply(message, {
                    text: "cards not supported on this platform yet",
                    attachments: obj
                });
            }
        }

    });


    /**
     * quit : quit conversation
     */
    controller.interrupts('quit', 'message,direct_message', async (bot, message) => {
        await util.success(bot, message, 'Bye! See ya~!')

        // cancel any active dialogs
        await bot.cancelAllDialogs();
    });



    /**
     * list : show the list of nexus 
     */
    controller.hears('list', 'message,direct_message', async (bot, message) => {
        // console.log(bot, message)
        const userId = message.personEmail;

        const nexusList = util.nexus.get(userId);
        let response = 'Registered Nexus:\n'
        if (Object.entries(nexusList).length == 0) {
            util.warn(bot, message, 'No nexus is added.')
        } else {
            for (var i in nexusList) {
                response += `> ip: \`${i}\`, \`${nexusList[i].chassis_id}\`, hostname: \`${nexusList[i].host_name}\`<br>`
            }
            await bot.reply(message, {
                markdown: response
            });
        }
    });

    /**
     * add : adds new nexus device
     */
    controller.hears('add', 'message,direct_message', async (bot, message) => {
        let obj = Object.assign({}, cards['nexus_del']);
        obj['content'] = util.adaptive.bind(cards['nexus_add'], {
            userId: message.personEmail
        });

        await bot.reply(message, {
            text: "cards not supported on this platform yet",
            attachments: obj
        });
    });

    /**
     * del : delete existing nexus
     */
    controller.hears('del', 'message,direct_message', async (bot, message) => {
        let array = [];
        const data = util.nexus.get(message.personEmail);
        if (Object.entries(data).length == 0) {
            util.warn(bot, message, 'There is no Nexus to remove.');
        } else {
            for (let i in data) {
                array.push({
                    endpoint: i,
                    hostname: data[i].host_name,
                    value: JSON.stringify({
                        ip: data[i].ip,
                        port: data[i].port
                    })
                });
            }
            let obj = Object.assign({}, cards['nexus_del']);
            obj['content'] = util.adaptive.bind(cards['nexus_del'], {
                userId: message.personEmail,
                nexus: array
            });

            // console.log(JSON.stringify(cards['nexus_del']));

            await bot.reply(message, {
                text: "cards not supported on this platform yet",
                attachments: obj
            });
        }
    });

    controller.on('message,direct_message', async(bot, message) => {
        await bot.reply(message, 'Sorry. I cannot understand. Type `help` to see commands.');
    });

}