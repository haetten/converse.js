import { __ } from 'i18n';
import { _converse, api } from "@converse/headless/core";
import { html } from "lit";
import { repeat } from 'lit/directives/repeat.js';



export default (o) => {
    _converse.log.info("\"quepasa-mapa\" - no template");

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
			${scripts()}
			<script>
			${repeat(o.items, item => item.jid, item => tpl_item(o, item))}
			</script>
			
		`;
	}
	else{
		return html`...`;
	}
}


const tpl_item = (o, item) => {
	/*
	
*/ 
	if(o && o.items && o.items.length>0){
		criaMarcador(-15.778466324418028, -47.88605394609443, null, "Sala 01");
	}
    return html`
		
        criaMarcador(-15.782533909674745, -47.921914382830956, 
                    null,
                    "${item.name} <a href='#' @click=${o.openRoom}>clique</a>"
                    , true);
    `;
}

function texto_carregando () {
    return html`
			<center>
		          <span>Que<span class="subdued">Pasa</span></span>
			</center>
	`;
}

function scripts () {
    return html`

		 	<script>
		
		            criaMarcador(-15.778466324418028, -47.88605394609443, null, "Sala 01");
		            criaMarcador(-15.779292288838215, -47.88652601488105, null, "Sala 02");
		            
		            criaMarcador(-15.782533909674745, -47.921914382830956, 
		                        null,
		                        "Sala 03 <a href='www.google.com'>clique</a>"
		                        , true);
					
		    </script>
	`;
}