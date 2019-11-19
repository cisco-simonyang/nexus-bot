

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