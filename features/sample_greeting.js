const { BotkitConversation } = require('botkit');


/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

function isValidIp(ip) {
    if (ip) return true;
    return false;
}

// const request = require('request-promise-native')
// require('dotenv').config();

// let bodyData = {
//     "ins_api": {
//         "version": "1.0",
//         "type": "cli_show",
//         "chunk": "0",
//         "sid": "1",
//         "input": "show interface brief",
//         "output_format": "json"
//     }
// };

// let url = 'http://112.216.179.85:1102/ins';



// class APIService {
//     async showInterfaceBrief() {
//         const options = {
//             url: url,
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': 'Basic YWRtaW46ITIzNFF3ZXI='
//             },
//             body : bodyData
//         }
//         const result = await request.post(options);
//         return result;
//     }

//     showLoggingLog() {

//     }
// }

// const service = new APIService();
// module.exports = new APIService();
const service = require('../util/api_service.js');


module.exports = function( controller ) {

    let memberships = [];

    controller.hears(new RegExp(/^cli (.*?)$/i), 'message,direct_message', async(bot, message) => {

        // message.matches is the result of message.text.match(regexp) so in this case the parameter is in message.matches[1]
        const command = message.matches[1];

        const result = await service.cli(command);
        console.log('######', command, result);
        await bot.reply(message, '' + result);
    
    });

    controller.interrupts('help', 'message,direct_message', async(bot, message) => {
        // start a help dialog, then eventually resume any ongoing dialog
        // await bot.beginDialog(HELP_DIALOG);
        await bot.reply(message,{text: '도움말: 명령어를 보여줄거에요!', markdown: '*Available Command!*'}); 
    });
    
    controller.interrupts('quit', 'message,direct_message', async(bot, message) => {
        await bot.reply(message, 'Quitting!');
    
        // cancel any active dialogs
        await bot.cancelAllDialogs();
    });

    controller.hears(async(message) => { return message.intent==="help" }, 'message', async(bot, message) => { 
        // do something
        await bot.reply(message, 'intent help???');
    });


    controller.hears(['hi','hello','howdy','hey','aloha','hola','bonjour','oi'],['message', 'direct_message'], async (bot,message) => {
        if (!message.personEmail.endsWith('@cisco.com')) return;
        await bot.reply(message,'Hello, ' + message.personEmail);
        await bot.reply(message, {markdown: '궁금한게 있으면 `help`를 외쳐주세요.'} )

    });

    controller.hears(['status', 'brief'],['message', 'direct_message'], async (bot,message) => {
        await bot.reply(message,'넥서스 상태값 표시합니다.');
        const result = await service.showInterfaceBrief();
        await bot.reply(message,result);
    });

    


    controller.hears(['error'],['message', 'direct_message'], async (bot,message) => {
        let response = '# warning\n![warning](https://www.google.com/favicon.ico)\n## Error occured';
        await bot.reply(message,{text: 'Available Command!', markdown: response});
        
    });


    // const { BotkitConversation } = require('botkit');

    // define the conversation
    const onboarding = new BotkitConversation('onboarding', controller);

    onboarding.say('Hello human!');
    // collect a value with no conditions
    onboarding.ask('What is your name?', async(answer) => { 
        // do nothing.
    }, {key: 'name'});

    // collect a value with conditional actions
    onboarding.ask('Do you like tacos?', [
        {
            pattern: 'yes',
            handler: async function(answer, convo, bot) {
                await convo.gotoThread('likes_tacos');
            }
        },
        {
            pattern: 'no',
            handler: async function(answer, convo, bot) {
                await convo.gotoThread('hates_life');
            }
        }
    ],{key: 'tacos'});
    // define a 'likes_tacos' thread
    onboarding.addMessage('HOORAY TACOS', 'likes_tacos');
    // define a 'hates_life' thread
    onboarding.addMessage('TOO BAD!', 'hates_life');
    // handle the end of the conversation
    onboarding.after(async(results, bot) => {
        const name = results.name;
    });
    // add the conversation to the dialogset
    controller.addDialog(onboarding);

    controller.hears('add switch', 'message,direct_message', async (bot, message) => {
        bot.beginDialog('onboarding');
    });



    controller.hears(new RegExp(/^switch (.*?) (.*?)$/i), 'message,direct_message', async(bot, message) => {

        // message.matches is the result of message.text.match(regexp) so in this case the parameter is in message.matches[1]
        let param = message.matches[1];
        let ip = message.matches[2];
        console.log(param, '####', ip);
        switch (param) {
            case 'add':
                if (isValidIp(ip)) {
                    await bot.reply(message, '스위치를 추가했습니다.');
                } else {
                    await bot.reply(message, '이 형태로 말해주세요. `switch add ${switch ip}`');
                }
                break;
            case 'del':
                if (isValidIp(ip)) {
                    await bot.reply(message, '스위치를 삭제했습니다.');
                } else {
                    await bot.reply(message, '이 형태로 말해주세요. `switch del ${switch ip}`');
                }
                break;
            default:
                await bot.reply(message, 'No valid command');
                break;
                
        }
    });

    controller.hears(new RegExp(/^switch (.*?)$/i), 'message,direct_message', async(bot, message) => {
        // message.matches is the result of message.text.match(regexp) so in this case the parameter is in message.matches[1]
        let param = message.matches[1];
        let ip = message.matches[2];
        console.log(param, '####', ip);
        switch (param) {
            case 'list':
                await bot.reply(message, '스위치 목록.');
                break;
            default:
                await bot.reply(message, 'No valid command');
                break;  
        }
    });

    controller.on('message,direct_message', async(bot, message) => {
        await bot.reply(message, 'Sorry. I cannot understand.');
    });


    controller.on('alert', async(bot, message) => {
        await bot.reply(message, 'Alert');
    });


    controller.on('memberships.created', async(bot, message) => {
        await bot.reply(message,'Greetings!');
        await bot.reply(message, {markdown: '> **Available commands**\n> - hello\n> - hello'} )
        if (message.data.roomType == 'group') {
            await bot.reply(message, 'This is a group Space...you must @mention me!');
        }
        memberships.push({
            reference: message.reference,
            user: message.user
        });
    });

    controller.hears(new RegExp(/.*alarm.*list.*|.*list.*alarm.*/i), 'message,direct_message', async(bot, message) => {
        await bot.reply(message, "alarm list");
    });

    controller.hears(new RegExp(/.*alarm.*add.*/i), 'message,direct_message', async(bot, message) => {
        await bot.reply(message, "alarm add");
    });

    controller.on('channel_join', async(bot, message) => {
        await bot.reply(message,'Welcome to the channel!');
    });

    // Log every message received
    controller.middleware.receive.use(function(bot, message, next) {

        // log it
        console.log('RECEIVED: ', message);

        // modify the message
        message.logged = true;

        // continue processing the message
        next();

    });

    // Log every message sent
    controller.middleware.send.use(function(bot, message, next) {

        // log it
        console.log('SENT: ', message);

        // modify the message
        message.logged = true;

        // continue processing the message
        next();

    });

    
    // sending alert sample.
    setInterval(async () => {
        for (let i in memberships) {
            let bot = await controller.spawn();

            await bot.changeContext(memberships[i].reference);

            await bot.say('ALERT! A trigger was detected');
        }
        
    }, 60000);

    
    // setInterval(async() => {
    //     if(saved_reference) {


    //         console.log(saved_reference)

    //         let bot = await controller.spawn();
    //         bot.changeContext(saved_reference);
    //         bot.say('Hello!');
    //     }
    //     // let bot = await controller.spawn();
    //     // // await bot.changeContext(reference);

    //     // await bot.say('Breaking news!');
    // }, 1000);





    
    // controller.hears('sample','message,direct_message', async(bot, message) => {
    //     await bot.reply(message, 'I heard a sample message.');
    // });

    

    // controller.on('message,direct_message', async(bot, message) => {
    //     await bot.reply(message, `Echo: ${ message.text }`);
    // });


    // controller.hears('.*','message,direct_message', async(bot, message) => {

    //     await bot.reply(message, 'I heard: ' + message.text);
    
    // });
    
    // controller.on('event', async(bot, message) => {
    //     await bot.reply(message,'I received an event of type ' + message.type);
    // });



    // controller.hears(async (message) => message.text && message.text.toLowerCase() === 'foo', ['message'], async (bot, message) => {
    //     await bot.reply(message, 'I heard "foo" via a function test');
    // });

    // // controller.hears(pattern, event, handler)

    // // use a regular expression to match the text of the message
    // controller.hears(new RegExp(/^\d+$/), ['message','direct_message'], async function(bot, message) {
    //     await bot.reply(message,{ text: 'I heard a number using a regular expression.' });
    // });

    // // match any one of set of mixed patterns like a string, a regular expression
    // controller.hears(['allcaps', new RegExp(/^[A-Z\s]+$/)], ['message','direct_message'], async function(bot, message) {
    //     await bot.reply(message,{ text: 'I HEARD ALL CAPS!' });
    // });

    // controller.on('message,direct_message', async(bot, message) => { 

    //     await bot.reply(message, {
    //         text: 'Here is a menu!',
    //         quick_replies: [
    //             {
    //                 title: "Main",
    //                 payload: "main-menu",
    //             },
    //             {
    //                 title: "Help",
    //                 payload: "help"
    //             }
    //         ]
    //     });
    // });
}