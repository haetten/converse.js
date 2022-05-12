import tpl_mapa from "./templates/mapa.js";
import { CustomElement } from 'shared/components/element.js';
import { _converse, api, converse } from "@converse/headless/core";

/*
import { CustomElement } from 'shared/components/element.js';
import { __ } from 'i18n';
import { _converse, api, converse } from "@converse/headless/core";
import { initStorage } from '@converse/headless/utils/storage.js';
import { isUniView } from '@converse/headless/utils/core.js';
import { getAttributes } from '@converse/headless/shared/parsers';
const { Strophe, u } = converse.env;
*/

export class Mapa extends CustomElement {

    initialize () {
        _converse.log.info("\"quepasa-mapa\" - na view");
        //this.updateRoomsList ();
    }

    render () {
         return tpl_mapa(this);
    }
/*
    async openRoom (ev) { // eslint-disable-line class-methods-use-this
        ev.preventDefault();
        const name = ev.target.textContent;
        const jid = ev.target.getAttribute('data-room-jid');
        const data = {
            'name': name || Strophe.unescapeNode(Strophe.getNodeFromJid(jid)) || jid
        }
        await api.rooms.open(jid, data, true);
    }

    async closeRoom (ev) { // eslint-disable-line class-methods-use-this
        ev.preventDefault();
        const name = ev.target.getAttribute('data-room-name');
        if (confirm(__("Are you sure you want to leave the groupchat %1$s?", name))) {
            const jid = ev.target.getAttribute('data-room-jid');
            const room = await api.rooms.get(jid);
            room.close();
        }
    }


    
    // Handle the IQ stanza returned from the server, containing all its public groupchats.    
    onRoomsFound (iq) {
        //this.loading_items = false;
        const rooms = iq ? sizzle('query item', iq) : [];
        if (rooms.length) {
            //this.model.set({'feedback_text': __('Groupchats found')}, {'silent': true});
            //this.items = rooms.map(getAttributes);
        } else {
            //this.items = [];
            //this.model.set({'feedback_text': __('No groupchats found')}, {'silent': true});
        }
        alert(rooms);
        this.render();
        return true;
    }

    // Send an IQ stanza to the server asking for all groupchats
    updateRoomsList () {
        const iq = $iq({
            'to': "muc.localhost", //this.model.get('muc_domain'),
            'from': _converse.connection.jid,
            'type': "get"
        }).c("query", {xmlns: Strophe.NS.DISCO_ITEMS});
        api.sendIQ(iq)
            .then(iq => this.onRoomsFound(iq))
            .catch(() => this.onRoomsFound())
    }
*/

}

api.elements.define('quepasa-mapa', Mapa);
