const { BotkitConversation } = require('botkit');
const service = require('../util/api_service.js');
const util = require('../util/util.js');
const samplecards = require('../lib/sample_cards');



module.exports = function( controller ) {

    // let memberships = [];

    // /**
    //  * help : 명령어 보여준다.
    //  */
    controller.interrupts('hi', 'message,direct_message', async(bot, message) => {
        // start a help dialog, then eventually resume any ongoing dialog
        // await bot.beginDialog(HELP_DIALOG);
        await bot.reply(message, {
            text: "cards not supported on this platform yet",
            attachments: samplecards['greeting']
        }); 
    });

    /**
     * 
     */
    controller.hears(['status', 'brief'], 'message,direct_message', async (bot,message) => {
        // await bot.reply(message,'넥서스 상태값 표시합니다.');
        // const result = await service.showInterfaceBrief();

        let data = {
            "nic": [
                {
                    "status": "up",
                    "interface": "mgmt0",
                    "ip_addr": "192.168.10.4",
                    "speed": "1000",
                    "mtu": "1500"
                },
                {
                    "interface": "Ethernet1/1",
                    "vlan": "1",
                    "type": "eth",
                    "portmode": "trunk",
                    "state": "down",
                    "state_rsn_desc": "XCVR not inserted",
                    "speed": "auto",
                    "ratemode": "D"
                }
            ]
        };
        // samplecards['brief']['content'] = util.adaptive.bind(samplecards['brief'], data);

        console.log('##############', JSON.stringify(samplecards['brief']['content']));

        await bot.reply(message, {
            text: "cards not supported on this platform yet",
            attachments: samplecards['brief']
        }); 
    });

    
    /**
     * quit : conversation을 종료한다.
     */
    controller.interrupts('quit', 'message,direct_message', async(bot, message) => {
        await bot.reply(message, '필요한 게 있으면 말씀해주세요!');
    
        // cancel any active dialogs
        await bot.cancelAllDialogs();
    });

    /**
     * 인사말에 대한 응답.
     */
    controller.hears(['hi','hello','howdy','hey','aloha','hola','bonjour','oi'], 'message,direct_message', async (bot,message) => {
        if (!message.personEmail.endsWith('@cisco.com')) return;
        await bot.reply(message,'Hello, ' + message.personEmail);
        await bot.reply(message, {markdown: '궁금한게 있으면 `help`를 외쳐주세요.'} )
    });


    /**
     * nexus list, nexus add, nexus delete.
     */
    controller.hears('nexus list', 'message,direct_message', async (bot,message) => {
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

    controller.hears('nexus add', 'message,direct_message', async (bot,message) => {
        await bot.beginDialog(util.constants.DIALOG_NEXUS_ADD);
    });

    controller.hears('nexus del', 'message,direct_message', async (bot,message) => {
        await bot.beginDialog(util.constants.DIALOG_NEXUS_DELETE, {
            key: 'ddd'
        });
    });


    

    // controller.hears(new RegExp(/^cli (.*?)$/i), 'message,direct_message', async(bot, message) => {

    //     // message.matches is the result of message.text.match(regexp) so in this case the parameter is in message.matches[1]
    //     const command = message.matches[1];

    //     const result = await service.cli(command);
    //     await bot.reply(message, '' + result);
    
    // });

    // controller.hears(async(message) => { return message.intent==="help" }, 'message', async(bot, message) => { 
    //     // do something
    //     await bot.reply(message, 'intent help???');
    // });


    

    

    


    // controller.hears(['error'], 'message,direct_message', async (bot,message) => {
    //     let response = '# warning\n![warning](https://www.google.com/favicon.ico)\n## Error occured';
    //     await bot.reply(message,{text: 'Available Command!', markdown: response});
        
    // });


    // // const { BotkitConversation } = require('botkit');

    // // define the conversation
    // const onboarding = new BotkitConversation('onboarding', controller);

    // onboarding.say('Hello human!');
    // // collect a value with no conditions
    // onboarding.ask('What is your name?', async(answer) => { 
    //     // do nothing.
    // }, {key: 'name'});

    // // collect a value with conditional actions
    // onboarding.ask('Do you like tacos?', [
    //     {
    //         pattern: 'yes',
    //         handler: async function(answer, convo, bot) {
    //             await convo.gotoThread('likes_tacos');
    //         }
    //     },
    //     {
    //         pattern: 'no',
    //         handler: async function(answer, convo, bot) {
    //             await convo.gotoThread('hates_life');
    //         }
    //     }
    // ],{key: 'tacos'});
    // // define a 'likes_tacos' thread
    // onboarding.addMessage('HOORAY TACOS', 'likes_tacos');
    // // define a 'hates_life' thread
    // onboarding.addMessage('TOO BAD!', 'hates_life');
    // // handle the end of the conversation
    // onboarding.after(async(results, bot) => {
    //     const name = results.name;
    // });
    // // add the conversation to the dialogset
    // controller.addDialog(onboarding);

    // controller.hears('add switch', 'message,direct_message', async (bot, message) => {
    //     bot.beginDialog('onboarding');
    // });



    // controller.hears(new RegExp(/^switch (.*?) (.*?)$/i), 'message,direct_message', async(bot, message) => {

    //     // message.matches is the result of message.text.match(regexp) so in this case the parameter is in message.matches[1]
    //     let param = message.matches[1];
    //     let ip = message.matches[2];
    //     switch (param) {
    //         case 'add':
    //             if (isValidIp(ip)) {
    //                 await bot.reply(message, '스위치를 추가했습니다.');
    //             } else {
    //                 await bot.reply(message, '이 형태로 말해주세요. `switch add ${switch ip}`');
    //             }
    //             break;
    //         case 'del':
    //             if (isValidIp(ip)) {
    //                 await bot.reply(message, '스위치를 삭제했습니다.');
    //             } else {
    //                 await bot.reply(message, '이 형태로 말해주세요. `switch del ${switch ip}`');
    //             }
    //             break;
    //         default:
    //             await bot.reply(message, 'No valid command');
    //             break;
                
    //     }
    // });

    // controller.hears(new RegExp(/^switch (.*?)$/i), 'message,direct_message', async(bot, message) => {
    //     // message.matches is the result of message.text.match(regexp) so in this case the parameter is in message.matches[1]
    //     let param = message.matches[1];
    //     let ip = message.matches[2];
    //     switch (param) {
    //         case 'list':
    //             await bot.reply(message, '스위치 목록.');
    //             break;
    //         default:
    //             await bot.reply(message, 'No valid command');
    //             break;  
    //     }
    // });

    // controller.on('message,direct_message', async(bot, message) => {
    //     await bot.reply(message, 'Sorry. I cannot understand.');
    // });


    // controller.on('alert', async(bot, message) => {
    //     await bot.reply(message, 'Alert');
    // });


    // controller.on('memberships.created', async(bot, message) => {
    //     await bot.reply(message,'Greetings!');
    //     await bot.reply(message, {markdown: '> **Available commands**\n> - hello\n> - hello'} )
    //     if (message.data.roomType == 'group') {
    //         await bot.reply(message, 'This is a group Space...you must @mention me!');
    //     }
    //     memberships.push({
    //         reference: message.reference,
    //         user: message.user
    //     });
    // });

    // controller.hears(new RegExp(/.*alarm.*list.*|.*list.*alarm.*/i), 'message,direct_message', async(bot, message) => {
    //     await bot.reply(message, "alarm list");
    // });

    // controller.hears(new RegExp(/.*alarm.*add.*/i), 'message,direct_message', async(bot, message) => {
    //     await bot.reply(message, "alarm add");
    // });

    // controller.on('channel_join', async(bot, message) => {
    //     await bot.reply(message,'Welcome to the channel!');
    // });

    

    
    // // sending alert sample.
    // setInterval(async () => {
    //     for (let i in memberships) {
    //         let bot = await controller.spawn();

    //         await bot.changeContext(memberships[i].reference);

    //         await bot.say('ALERT! A trigger was detected');
    //     }
        
    // }, 60000);

}