import tpl_mapa from "./templates/quepasa-mapa.mapa.js";
import { CustomElement } from 'shared/components/element.js';
import { _converse, api, converse } from "@converse/headless/core";
const { Strophe, u, sizzle, $iq } = converse.env;
import { getAttributes } from '@converse/headless/shared/parsers';
//import MUCListModal from 'plugins/muc-views/modals/muc-list.js';
//import { initStorage } from '@converse/headless/utils/storage.js';
//import RoomsListModel from './quepasa-mapa.model.js';
//import BootstrapModal from "plugins/modal/base.js";
/*
import { __ } from 'i18n';
import { isUniView } from '@converse/headless/utils/core.js';
*/

export class Mapa extends CustomElement {

    render () {
         return tpl_mapa(this);
    }

    async openRoom (ev) { // eslint-disable-line class-methods-use-this
        ev.preventDefault();
        const name = ev.target.textContent;
        const jid = ev.target.getAttribute('data-room-jid');
        const data = {
            'name': name || Strophe.unescapeNode(Strophe.getNodeFromJid(jid)) || jid
        }
        api.rooms.open(jid, data, true);
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
        const rooms = iq ? sizzle('query item', iq) : [];
		this.rooms = rooms;
        if (rooms.length) {
            this.items = rooms.map(getAttributes);

            var i = 0;
            for (let item of this.items) {
                i++;
                if(i % 1 == 0){
                    item.lat = -15.778466324418028;
                    item.lng = -47.88605394609443;
                }
                if(i % 2 == 0){
                    item.lat = -15.778466324418028;
                    item.lng = -47.90652601488105;
                }
                if(i % 3 == 0){
                    item.lat = -15.782533909674745;
                    item.lng = -47.921914382830956;
                }
            }

        } else {
            this.items = [];
        }
        
        this.requestUpdate();
        return true;
    }

    // Send an IQ stanza to the server asking for all groupchats
    updateRoomsList () {
	        const iq = $iq({
	            'to': api.settings.get('muc_domain'),
	            'from': _converse.connection.jid, //_converse.connection.jid,
	            'type': "get"
	        }).c("query", {xmlns: Strophe.NS.DISCO_ITEMS});

	        api.sendIQ(iq)
	            .then(iq => this.onRoomsFound(iq))
	
    }

    initialize () {
        this.items = [];
        _converse.api.listen.on('connected', () => {
			this.updateRoomsList ();
		});

    }


}

api.elements.define('quepasa-mapa', Mapa);
