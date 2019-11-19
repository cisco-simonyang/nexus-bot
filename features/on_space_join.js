
module.exports = function( controller ) {
    controller.on('bot_space_join', async(bot, message) => {
        await bot.reply(message,'Greetings! My name is Cisco Nexus bot.');
        await bot.reply(message,'I am here to help you to manage Nexus devices.');
        await bot.reply(message, {markdown: '궁금한게 있으면 `help`를 외쳐주세요.'} )
        
        bot.reply(message, "Hi, I am the Hello World bot !\n\nType `hello` to see me in action.", function(err, newMessage) {
            if (newMessage.roomType == "group") {
                bot.reply(message, "\n\n**Note that this is a 'Group' space. I will answer only when mentionned.**");
            }
        });
    });
    
};



