module.exports = function( controller ) {
    
    /**
     * receive hook
     */
    controller.middleware.receive.use(function(bot, message, next) {

        // log it
        // console.log('RECEIVED: ', message);

        // modify the message
        message.logged = true;

        // continue processing the message
        next();

    });

    /**
     * send hook
     */
    controller.middleware.send.use(function(bot, message, next) {

        // log it
        // console.log('SENT: ', message);

        // modify the message
        message.logged = true;

        // continue processing the message
        next();

    });  
};