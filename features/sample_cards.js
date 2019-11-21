const samplecards = require('../lib/response_card');

module.exports = function (controller) {

    controller.hears(async (message) => message.text && samples.includes(message.text.toLowerCase()), ['message', 'direct_message'], async (bot, message) => {

        await bot.reply(message, {
            text: "cards not supported on this platform yet",
            attachments: samplecards[message.text.toLowerCase()]
        });
    });

    const samples = [
        "activityupdate",
        "agenda",
        "calendarreminder",
        "expensereport",
        "flightdetails",
        "flightitinerary",
        "flightupdate",
        "foodorder",
        "imagegallery",
        "inputform",
        "inputs",
        "restaurant",
        "sportingevent",
        "stockupdate",
        "weathercompact",
        "weatherlarge",
    ]

}