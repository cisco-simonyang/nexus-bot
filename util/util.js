let util = {
    constants: {
        DIALOG_NEXUS_ADD : 'nexus_add_dialog',
        DIALOG_NEXUS_DELETE : 'nexus_delete_dialog'
    },
    nexus: {
        list: {},
        _user_init: function(userId) {
            console.log('_init 1:::', userId, util.nexus.list)
            if (util.nexus.list[userId] == undefined) {
                util.nexus.list[userId] = {};
            }
            console.log('_init 2:::', userId, util.nexus.list)
        },
        add: function(userId, ip, switchInfo) {
            util.nexus._user_init(userId);
            console.log('add:::', userId, util.nexus.list)
            util.nexus.list[userId][ip] = switchInfo;
        },
        delete: function(userId, ip) {
            util.nexus._user_init(userId);
            delete util.nexus.list[userId][ip];
        },
        get: function(userId) {
            util.nexus._user_init(userId);
            return util.nexus.list[userId];
        },
        isExist: function(userId, ip) {
            try {
                if (util.nexus.list[userId][ip]) 
                    return true;
            } catch(e) {
                return false;
            }
            return false;
        }
    }
};

module.exports = util;

