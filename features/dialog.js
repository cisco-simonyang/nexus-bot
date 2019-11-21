/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const { BotkitConversation } = require('botkit');
const util = require('../util/util');
const api = require('../util/api_service');


module.exports = function(controller) {

    function isValidIp(ip) {
        if (ip) return true;
        return false;
    }

    /**
     * nexus add
     */
    const nexus_add = new BotkitConversation(util.constants.DIALOG_NEXUS_ADD, controller);
    nexus_add.say('넥서스 장비를 추가합니다. 취소하려면 `quit`을 입력하세요.');
    nexus_add.ask('추가하려는 넥서스 장비의 IP주소를 입력하세요.', async(response, convo, bot) => {
        const userId = bot._config.activity.from.name;
        const ip = response;
        try {
            let result = await api.showVersion(response);
            util.nexus.add(userId, ip, '1102', result);
            nexus_add.say('성공적으로 nexus 장비가 추가되었습니다.');
        } catch(e) {
            console.log('error :::', e);
            nexus_add.say('스위치를 찾지 못했습니다. NX-API가 활성화되어 있는지 확인해주세요.');
        }    
    });
    controller.addDialog(nexus_add);

    
    /**
     * nexus delete
     */
    const nexus_delete = new BotkitConversation(util.constants.DIALOG_NEXUS_DELETE, controller);
    // await console.log('nexus delete config ===> ', nexus_delete.getConfig())
    nexus_delete.say('넥서스 장비를 삭제합니다.' + JSON.stringify(nexus_delete.script));
    nexus_delete.ask('삭제하려는 넥서스 장비의 IP주소를 입력하세요.', async(response, convo, bot) => {
        const userId = bot._config.activity.from.name;
        const ip = response;
        try {
            if (util.nexus.isExist(userId, ip)) {
                util.nexus.delete(userId, ip);
                nexus_delete.say('넥서스 장비를 성공적으로 삭제되었습니다.');
            } else {
                nexus_delete.say('해당 넥서스 장비는 존재하지 않습니다.');
            }
        } catch(e) {
            console.log('error :::', e);
            nexus_delete.say('해당 넥서스 장비는 존재하지 않습니다.');
        }    
    });
    controller.addDialog(nexus_delete);

    

}