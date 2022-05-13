import tpl_mapa from "./templates/quepasa-mapa.mapa.js";
import { CustomElement } from 'shared/components/element.js';
import { _converse, api, converse } from "@converse/headless/core";
const { Strophe, u, sizzle, $iq } = converse.env;
import { getAttributes } from '@converse/headless/shared/parsers';
import MUCListModal from 'plugins/muc-views/modals/muc-list.js';
import { initStorage } from '@converse/headless/utils/storage.js';
import RoomsListModel from './quepasa-mapa.model.js';
import BootstrapModal from "plugins/modal/base.js";



/*
import { CustomElement } from 'shared/components/element.js';
import { __ } from 'i18n';
import { initStorage } from '@converse/headless/utils/storage.js';
import { isUniView } from '@converse/headless/utils/core.js';
const { Strophe, u } = converse.env;
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
        // _converse.log.info("\"onRoomsFound\" - entrou" + iq);

        const rooms = iq ? sizzle('query item', iq) : [];
		this.rooms = rooms;
		// _converse.log.info("Salas " + rooms.length);
        if (rooms.length) {
            this.items = rooms.map(getAttributes);
        } else {
            this.items = [];
        }
        
        this.requestUpdate();
		//this.render();
		//api.elements.define('quepasa-mapa', Mapa);
		//this.render();
        return true;
    }

    // Send an IQ stanza to the server asking for all groupchats
    updateRoomsList () {
	        // _converse.log.info("[quepasa-mapa.view] _converse.xmppstatus" + _converse.xmppstatus);
	        // _converse.log.info("[quepasa-mapa.view] _converse.connection.jid" + _converse.connection.jid);
        	
	        // _converse.log.info("buscando salas... " + api.settings.get('muc_domain'));
	        // _converse.log.info("buscando salas... " + this.model.get('muc_domain'));
	        const iq = $iq({
	            'to': "muc.localhost", //this.model.get('muc_domain'),
	            'from': _converse.connection.jid, //_converse.connection.jid,
	            'type': "get"
	        }).c("query", {xmlns: Strophe.NS.DISCO_ITEMS});
	        api.sendIQ(iq)
	            .then(iq => this.onRoomsFound(iq))
	
    }

    initialize () {
        this.items = [];
        // _converse.log.info("[quepasa-mapa.view - initialize]");

        _converse.api.listen.on('connected', () => {
			this.updateRoomsList ();
		});

    }



}

api.elements.define('quepasa-mapa', Mapa);
