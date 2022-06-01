import tpl_mapa from "./templates/quepasa-mapa.mapa.js";
import { CustomElement } from 'shared/components/element.js';
import { _converse, api, converse } from "@converse/headless/core";
const { Strophe, u, sizzle, $iq } = converse.env;
import { getAttributes } from '@converse/headless/shared/parsers';
import { MapAPI } from "./quepasa-mapapi.js"


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
		item.jid = data[0] + "@" + api.settings.get('muc_domain');
		item.name = data[1];
		item.raio = data[2];
		item.lat = data[3];
		item.lng = data[4];
		item.horarioAbertura = data[5];
		item.horarioFechamento = data[6];
	}
	
 /*   
	async getComplementaryInfo(){
		for (let item of this.items) {
			//var host = "http://10.67.123.75:8081";
			var host = "http://localhost:8081";
			var url = host + "/quepasa-api/sala/"+item.jid.replace("@"+api.settings.get('muc_domain'), "");

			await fetch(url)
			.then( (response) => response.json())
			.then((data)=> this.updateItem(data, item))
			.catch( (error) => console.log(error));
		} 
		
	}
	
	async getMarkersAndUpdateMap(){
		await this.getComplementaryInfo();
		await this.requestUpdate();
		
		MapAPI.initMap();
	}
	
    // Handle the IQ stanza returned from the server, containing all its public groupchats.    
    onRoomsFound (iq) {
        const rooms = iq ? sizzle('query item', iq) : [];
		this.rooms = rooms;
		if (rooms.length) {
			this.items = rooms.map(getAttributes);
			this.getMarkersAndUpdateMap();

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
*/

    
	updateItems(data){

		for(let item of data){
			var i = new Object;
			console.log(item);
			this.updateItem(item, i);
			this.items.push(i);
		}
		console.log(this.items);
	}
	
    async getSalasDeAPI () {
		var host = "http://localhost:8081";
		var url = host + "/quepasa-api/salas/";

		await fetch(url)
		.then( (response) => response.json())
		.then((data)=> this.updateItems(data))
		.catch( (error) => console.log(error));
		
		await this.requestUpdate();
		
		MapAPI.initMap();
	}
	

    initialize () {
        this.items = [];
        _converse.api.listen.on('connected', () => {
			//this.updateRoomsList ();
			this.getSalasDeAPI();
		});

    }


}

api.elements.define('quepasa-mapa', Mapa);
