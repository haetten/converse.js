import ConverseRoot from './root.js';
import { api, converse } from '@converse/headless/core';
import { ensureElement } from './utils.js';


converse.plugins.add('converse-rootview', {

    initialize () {
        // Configuration values for this plugin
        // ====================================
        // Refer to docs/source/configuration.rst for explanations of these
        // configuration settings.
        api.settings.extend({
            'auto_insert': true,
            'theme': 'quepasa',
            'dark_theme': 'quepasa_dark',
        });

        api.listen.on('chatBoxesInitialized', ensureElement);

        // Only define the element now, otherwise it it's already in the DOM
        // before `converse.initialized` has been called it will render too
        // early.
        api.elements.define('converse-root', ConverseRoot);
    }
});
