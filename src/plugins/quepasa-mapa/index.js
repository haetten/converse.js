import { html } from "lit";
import tpl_mapa from "./templates/mapa.js";
import { _converse, api, converse } from "@converse/headless/core";
const { Strophe, $iq, sizzle } = converse.env;
import './view.js';

converse.plugins.add('quepasa-mapa', {
	initialize () {
		alert('asd');

        const bg = document.getElementById('quepasa-mapa');
        if (bg && !bg.innerHTML.trim()) {
            render(tpl_background_logo(), bg);
        }
	}
});



//  api.rooms.open("sala3@muc.localhost", data, true);
