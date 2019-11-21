var ACData = require("adaptivecards-templating");
var AdaptiveCards = require("adaptivecards");


let util = {
    constants: {
        DIALOG_NEXUS_ADD: 'nexus_add_dialog',
        DIALOG_NEXUS_DELETE: 'nexus_delete_dialog'
    },
    nexus: {
        _list: {},
        // _list: {
        //     'simyung@cisco.com': {
        //         '112.216.179.85': {
        //             "header_str": "Cisco Nexus Operating System (NX-OS) Software\nTAC support: http://www.cisco.com/tac\nCopyright (C) 2002-2019, Cisco and/or its affiliates.\nAll rights reserved.\nThe copyrights to certain works contained in this software are\nowned by other third parties and used and distributed under their own\nlicenses, such as open source.  This software is provided \"as is,\" and unless\notherwise stated, there is no warranty, express or implied, including but not\nlimited to warranties of merchantability and fitness for a particular purpose.\nCertain components of this software are licensed under\nthe GNU General Public License (GPL) version 2.0 or \nGNU General Public License (GPL) version 3.0  or the GNU\nLesser General Public License (LGPL) Version 2.1 or \nLesser General Public License (LGPL) Version 2.0. \nA copy of each such license is available at\nhttp://www.opensource.org/licenses/gpl-2.0.php and\nhttp://opensource.org/licenses/gpl-3.0.html and\nhttp://www.opensource.org/licenses/lgpl-2.1.php and\nhttp://www.gnu.org/licenses/old-licenses/library.txt.\n",
        //             "bios_ver_str": "07.66",
        //             "kickstart_ver_str": "9.3(2)",
        //             "nxos_ver_str": "9.3(2)",
        //             "bios_cmpl_time": "06/12/2019",
        //             "kick_file_name": "bootflash:///nxos.9.3.2.bin",
        //             "nxos_file_name": "bootflash:///nxos.9.3.2.bin",
        //             "kick_cmpl_time": "11/4/2019 12:00:00",
        //             "nxos_cmpl_time": "11/4/2019 12:00:00",
        //             "kick_tmstmp": "11/04/2019 22:13:33",
        //             "nxos_tmstmp": "11/04/2019 22:13:33",
        //             "chassis_id": "Nexus9000 C9372PX chassis",
        //             "cpu_name": "Intel(R) Core(TM) i3- CPU @ 2.50GHz",
        //             "memory": 16399924,
        //             "mem_type": "kB",
        //             "proc_board_id": "SAL1932LRSG",
        //             "host_name": "BBforFI",
        //             "bootflash_size": 51496280,
        //             "kern_uptm_days": 0,
        //             "kern_uptm_hrs": 0,
        //             "kern_uptm_mins": 23,
        //             "kern_uptm_secs": 25,
        //             "rr_usecs": 655643,
        //             "rr_ctime": "Thu Nov 21 01:37:23 2019",
        //             "rr_reason": "Module PowerCycled",
        //             "rr_sys_ver": "",
        //             "rr_service": "HW check by card-client",
        //             "plugins": "Core Plugin, Ethernet Plugin",
        //             "manufacturer": "Cisco Systems, Inc.",
        //             "TABLE_package_list": {
        //                 "ROW_package_list": {
        //                     "package_id": ""
        //                 }
        //             },
        //             "ip": "112.216.179.85",
        //             "port": "1102"
        //         }
        //     }
            
        // },
        _user_init: function (userId) {
            if (util.nexus._list[userId] == undefined) {
                util.nexus._list[userId] = {};
            }
        },
        add: function (userId, ip, port, switchInfo) {
            util.nexus._user_init(userId);
            switchInfo.ip = ip;
            switchInfo.port = port;
            util.nexus._list[userId][ip+':'+port] = switchInfo;
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
        _action: function(userId) {
            return async () => {
                const nexusList = util.nexus.get(userId);
                const config = util.alarm.get(userId);
                for (let i in nexusList) {
                    // TODO
                }
            };
        },
        _list: {},
        _user_init: function (userId) {
            if (util.alarm._list[userId] == undefined) {
                util.alarm._list[userId] = {};
            }
        },
        on: function(userId, config) {
            config.timerId = setInterval(_action(userId), config.interval);
            util.alarm._list[userId] = config;
        },
        get: function(userId) {
            return util.alarm._list[userId];
        },
        off: function(userId) {
            clearInterval(util.alarm.get(userId).timerId);
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

