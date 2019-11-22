

// module.exports = function( controller ) {

//     setInterval(() => {

//     });

// };

// module.exports.switches = {
//     'membership.id': {
//         'ip': {
//             'alarm': ''
//         }
//     }
// };


const { BotkitConversation } = require('botkit');


module.exports = function(controller) {




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


    // const NEW_ROOM_DIALOG = 'new_room_dialog';
    // const dialog = new BotkitConversation(NEW_ROOM_DIALOG, controller);
    // dialog.say('I created this room so we could continue our conversation in private...');
    // dialog.ask('How does that sound?', async(response, convo, bot) => {

    // }, {key: 'how_it_sounds'});
    // dialog.say('Ah, {{vars.how_it_sounds}}, eh?');
    // dialog.say('I guess that is that.')

    // controller.addDialog(dialog);


    
    // controller.hears('delete',['message', 'direct_message'], async(bot, message) => {

    //     let reply = await bot.reply(message,'This message will be deleted in a few seconds.');
    //     setTimeout(async () => {
    //         let res = await bot.deleteMessage(reply);
    //     }, 5000);

    // });


    // controller.hears('create a room',['message', 'direct_message'], async(bot, message) => {

    //     // create a room
    //     let room = await bot.api.rooms.create({title: 'botkit test room'});

    //     // add user as member (bot is automatically added)
    //     let membership2 = await bot.api.memberships.create({
    //         roomId: room.id,
    //         personId: message.user,
    //     });

    //     await bot.startConversationInRoom(room.id, message.user);
    //     await bot.beginDialog(NEW_ROOM_DIALOG);

    // });

    // controller.on('memberships.created', async(bot, message) => {
    //     console.log('memberships created', message);
    // });

    // controller.on('bot_space_join', async(bot, message) => {
    //     await bot.reply(message,'Greetings! My name is Cisco Nexus bot.');
    //     await bot.reply(message,'I am here to help you to manage Nexus devices.');
    //     await bot.reply(message, {markdown: '궁금한게 있으면 `help`를 외쳐주세요.'} )
        
    //     bot.reply(message, "Hi, I am the Hello World bot !\n\nType `hello` to see me in action.", function(err, newMessage) {
    //         if (newMessage.roomType == "group") {
    //             bot.reply(message, "\n\n**Note that this is a 'Group' space. I will answer only when mentionned.**");
    //         }
    //     });
    // });

    // controller.on('create_bot', async(bot, message) => {
    //     setInterval(async() => {

    //         // console.log(controller);
    //         controller.trigger('alert', bot, message);
    //         // let bot = await controller.spawn();
    //         // // await bot.changeContext(reference);
    
    //         // await bot.say('Breaking news!');
    //     }, 1000);
    // })

    
    
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