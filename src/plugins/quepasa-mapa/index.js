import './quepasa-mapa.view.js';
//import { html } from "lit";
//import tpl_mapa from "./templates/mapa.js";
import { _converse, api, converse } from "@converse/headless/core";
//const { Strophe, $iq, sizzle } = converse.env;

converse.plugins.add('quepasa-mapa', {
    dependencies: ["converse-status", "converse-modal"],

	initialize () {
        _converse.log.info("The \"quepasa-mapa\" plugin is being initialized");

		 if ('serviceWorker' in navigator) {
		   window.addEventListener('load', () => {
		     navigator.serviceWorker.register('./service-worker.js').then(registration => {
		       console.log('SW registered: ', registration);
		     }).catch(registrationError => {
		       console.log('SW registration failed: ', registrationError);
		     });
		   });
		 }
	}
	
});

