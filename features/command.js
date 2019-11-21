const { BotkitConversation } = require('botkit');
const service = require('../util/api_service.js');
const util = require('../util/util.js');
const cards = require('../lib/response_card');



module.exports = function (controller) {


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
     * alarm
     */
    controller.hears(['alarm on'], 'message,direct_message', async (bot, message) => {
        await bot.reply(message, {
            text: "cards not supported on this platform yet",
            attachments: cards['alarm_on']
        });
    });

    controller.hears(['alarm off'], 'message,direct_message', async (bot, message) => {
        await bot.reply(message, {
            text: "cards not supported on this platform yet",
            attachments: cards['alarm_off']
        });
    });

    /**
     * 
     */
    controller.hears(['status', 'brief'], 'message,direct_message', async (bot, message) => {
        const userId = message.personEmail;
        const nexusList = util.nexus.get(userId);

        if (Object.entries(nexusList).length == 0) {
            await bot.reply(message, '등록된 장비가 없습니다.');
        } else {
            for (let i in nexusList) {
                const data = {
                    info: nexusList[i],
                    nic: await service.showInterfaceBrief(),
                    system: await service.showSystemResources()
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
                obj['content'] = util.adaptive.bind(cards['brief'], data);

                await bot.reply(message, {
                    text: "cards not supported on this platform yet",
                    attachments: obj
                });
            }
        }

    });


    /**
     * quit : conversation을 종료한다.
     */
    controller.interrupts('quit', 'message,direct_message', async (bot, message) => {
        await bot.reply(message, '필요한 게 있으면 말씀해주세요!');

        // cancel any active dialogs
        await bot.cancelAllDialogs();
    });



    /**
     * nexus 
     */
    controller.hears('list', 'message,direct_message', async (bot, message) => {
        // console.log(bot, message)
        const userId = message.personEmail;

        const nexusList = util.nexus.get(userId);
        let response = '등록된 넥서스 장비:\n'
        if (Object.entries(nexusList).length == 0) {
            await bot.reply(message, '등록된 장비가 없습니다.');
        } else {
            for (var i in nexusList) {
                response += `> ip: \`${i}\`, \`${nexusList[i].chassis_id}\`, hostname: \`${nexusList[i].host_name}\`<br>`
            }
            await bot.reply(message, {
                markdown: response
            });
        }
    });

    controller.hears('add', 'message,direct_message', async (bot, message) => {
        await bot.reply(message, {
            text: "cards not supported on this platform yet",
            attachments: cards['nexus_add']
        });
    });

    controller.hears('del', 'message,direct_message', async (bot, message) => {
        let array = [];
        const data = util.nexus.get(message.personEmail);
        
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
        obj['content'] = util.adaptive.bind(cards['nexus_del'], array);

        console.log(JSON.stringify(cards['nexus_del']));
        
        await bot.reply(message, {
            text: "cards not supported on this platform yet",
            attachments: obj
        });
    });



}