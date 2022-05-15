import { __ } from 'i18n';
import { _converse, api } from "@converse/headless/core";
import { html } from "lit";
import { repeat } from 'lit/directives/repeat.js';



export default (o) => {
	if(o && o.items && o.items.length>0){
/*
		_converse.log.info(o.items);
		_converse.log.info(o.rooms);
		_converse.log.info(o.items.length);
		_converse.log.info(o.rooms.length);
		
		for (let value of o.items) {
			_converse.log.info(value.jid);
		}*/
		
	    return html`
		    <div>
		        <div id="mapa"
					style="display:block; width:100%; height: 100vh; position: static"
					class="flyout box-flyout"
				>
				${texto_carregando()}
				</div>
			</div>
			
			<div id="marcadores" style="display:none">
			${repeat(o.items, item => item.jid, item => tpl_item(o, item))}
			</div>
			
		`;
	}
	else{
		return html`
		    <div>
		        <div id="mapa"
					style="display:block; width:100%; height: 100vh; position: static"
					class="flyout box-flyout"
				>
				${texto_carregando()}
				</div>
			</div>`;
	}
}


const tpl_item = (o, item) => {
	if(o && o.items && o.items.length>0){
		//console.log(item.jid);
	}
    return html`

        <a id="link-${item.jid}"
        class="open-room available-room w-100 marcadores"
        @click=${o.openRoom}
        data-room-jid="${item.jid}"
        data-room-name="${item.name}"
        data-room-lat="${item.lat}"
        data-room-lng="${item.lng}"
        title="Entrar na sala ${item.name}"
        href="#">${item.name || item.jid}</a>
    `;
}

function texto_carregando () {
    return html`			<center>
		          <span>Que<span class="subdued">Pasa</span></span>
			</center>
	`;
}

