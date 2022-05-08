import { html } from "lit";
import { api } from '@converse/headless/core.js';
//import 'plugins/quepasa/lit-google-map.bundle.js'


export default () => html`
    <div class="inner-content converse-brand row">
        <div class="converse-brand__padding"></div>
        <div class="converse-brand__heading">
            
        MAPA COM MARCADORES AQUI

        <script async defer
            src="https://maps.googleapis.com/maps/api/js?key=MYAPIKEY&callback=initmap">
        </script>
        </div>
    </div>`;
