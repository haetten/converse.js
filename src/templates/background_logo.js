import { html } from "lit";
import { api } from '@converse/headless/core.js';
//import 'plugins/quepasa/lit-google-map.bundle.js'


export default () => html`
    <div class="inner-content converse-brand row">
        <div class="converse-brand__padding"></div>
        <div class="converse-brand__heading">
            
        

        <div id="mapax" style="/*display:block; width:100%; height: 100vh*/"
            class="flyout box-flyout"
        >QuePasa</div>

        </div>
    </div>
    
    `;
