import './view.js';
//import { html } from "lit";
//import tpl_mapa from "./templates/mapa.js";
import { _converse, api, converse } from "@converse/headless/core";
//const { Strophe, $iq, sizzle } = converse.env;

converse.plugins.add('quepasa-mapa', {
    dependencies: [],

	initialize () {
        _converse.log.info("The \"quepasa-mapa\" plugin is being initialized");
        //api.rooms.open("sala3@muc.localhost", "sala3@muc.localhost", true);
		

	}
});

