import { __ } from 'i18n';
import { _converse, api } from "@converse/headless/core";
import { html } from "lit";



export default (el) => {
    _converse.log.info("\"quepasa-mapa\" - no template");
    return html`template_mapa`;
}
