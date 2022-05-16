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
    
	updateItem(data, item){
		item.raio = data[1];
		item.lat = data[2];
		item.lng = data[3];
		item.horarioAbertura = data[4];
		item.horarioFechamento = data[5];
	}
	
	async getComplementaryInfo(){
		for (let item of this.items) {
			await fetch("http://localhost:8081/quepasa-api/sala/"+item.jid)
			.then( (response) => response.json())
			.then((data)=> this.updateItem(data, item))
			.catch( (error) => console.log(error));
		}
		this.requestUpdate();        
	}

    // Handle the IQ stanza returned from the server, containing all its public groupchats.    
    onRoomsFound (iq) {
        const rooms = iq ? sizzle('query item', iq) : [];
		this.rooms = rooms;
		if (rooms.length) {
			this.items = rooms.map(getAttributes);
			this.getComplementaryInfo();

        } else {
            this.items = [];
        }
        
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
