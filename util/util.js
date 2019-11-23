var ACData = require("adaptivecards-templating");
// var AdaptiveCards = require("adaptivecards");
const cards = require('../lib/response_card');


let util = {
    info: async function (bot, message, msg) {
        let obj = Object.assign({}, cards['msg_info']);
        obj['content'] = util.adaptive.bind(cards['msg_info'], {
            message: msg
        });
        // console.log(obj)
        await bot.reply(message, {
            text: "cards not supported on this platform yet",
            attachments: obj
        });
        return;
    },
    warn: async function (bot, message, msg) {
        let obj = Object.assign({}, cards['msg_warning']);
        obj['content'] = util.adaptive.bind(cards['msg_warning'], {
            message: msg
        });
        // console.log(obj)
        await bot.reply(message, {
            text: "cards not supported on this platform yet",
            attachments: obj
        });
        return;
    },
    success: async function (bot, message, msg) {
        let obj = Object.assign({}, cards['msg_success']);
        obj['content'] = util.adaptive.bind(cards['msg_success'], {
            message: msg
        });
        console.log(JSON.stringify(obj));
        await bot.reply(message, {
            text: "cards not supported on this platform yet",
            attachments: obj
        });
        return;
    },
    error: async function (bot, message, msg) {
        let obj = Object.assign({}, cards['msg_error']);
        obj['content'] = util.adaptive.bind(cards['msg_error'], {
            message: msg
        });

        await bot.reply(message, {
            text: "cards not supported on this platform yet",
            attachments: obj
        });
    },
    constants: {
        DIALOG_NEXUS_ADD: 'nexus_add_dialog',
        DIALOG_NEXUS_DELETE: 'nexus_delete_dialog'
    },
    nexus: {
        _list: {},

        _user_init: function (userId) {
            if (util.nexus._list[userId] == undefined) {
                util.nexus._list[userId] = {};
            }
        },
        add: function (userId, ip, port, switchInfo) {
            util.nexus._user_init(userId);
            switchInfo.ip = ip;
            switchInfo.port = port;
            util.nexus._list[userId][ip + ':' + port] = switchInfo;
            // console.log('\n\n\nadd ===>\n\n\n', ip, port, util.nexus._list);
        },
        delete: function (userId, ip, port) {
            util.nexus._user_init(userId);
            delete util.nexus._list[userId][ip];
        },
        deleteAll: function (userId) {
            util.nexus._list[userId] = {};
        },
        get: function (userId) {
            util.nexus._user_init(userId);
            return util.nexus._list[userId];
        },
        isExist: function (userId, ip) {
            try {
                if (util.nexus._list[userId][ip])
                    return true;
            } catch (e) {
                return false;
            }
            return false;
        }
    },
    alarm: {
        reference: {
            _ref: {},
            put: function (userId, reference) {
                util.alarm.reference._ref[userId] = reference;
            },
            get: function (userId) {
                return util.alarm.reference._ref[userId]
            }
        },
        _list: {},
        on: function (userId, alarmId) {
            util.alarm._list[userId] = alarmId;
        },
        off: function (userId) {
            const alarmId = util.alarm._list[userId];
            clearInterval(alarmId);
            util.alarm._list[userId] = {};
        }
    },
    adaptive: {
        bind: function (templatePayload, data) {
            var template = new ACData.Template(templatePayload);

            // Create a data binding context, and set its $root property to the
            // data object to bind the template to
            var context = new ACData.EvaluationContext();
            context.$root = data;

            // "Expand" the template - this generates the final Adaptive Card,
            // ready to render
            var card = template.expand(context);
            // console.log('card ===', card);
            return card.content;

            // Render the card
            // var adaptiveCard = new AdaptiveCards.AdaptiveCard();
            // console.log('adaptiveCard ===', adaptiveCard);
            // adaptiveCard.parse(card);
        }
    }
};

module.exports = util;

