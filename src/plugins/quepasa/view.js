import RoomDetailsModal from 'plugins/muc-views/modals/muc-details.js';
import RoomsListModel from './model.js';
import tpl_roomslist from "./templates/roomslist.js";
import { CustomElement } from 'shared/components/element.js';
import { __ } from 'i18n';
import { _converse, api, converse } from "@converse/headless/core";
import { initStorage } from '@converse/headless/utils/storage.js';
import { isUniView } from '@converse/headless/utils/core.js';

const { Strophe, u } = converse.env;

export class RoomsList extends CustomElement {

    initialize () {
        const id = `converse.roomspanel${_converse.bare_jid}`;
        this.model = new RoomsListModel({ id });
        initStorage(this.model, id);
        this.model.fetch();

        this.listenTo(_converse.chatboxes, 'add', this.renderIfChatRoom)
        this.listenTo(_converse.chatboxes, 'remove', this.renderIfChatRoom)
        this.listenTo(_converse.chatboxes, 'destroy', this.renderIfChatRoom)
        this.listenTo(_converse.chatboxes, 'change', this.renderIfRelevantChange)

        this.requestUpdate();
    }

    renderIfChatRoom (model) {
        u.isChatRoom(model) && this.requestUpdate();
    }

    renderIfRelevantChange (model) {
        const attrs = ['bookmarked', 'hidden', 'name', 'num_unread', 'num_unread_general', 'has_activity'];
        const changed = model.changed || {};
        if (u.isChatRoom(model) && Object.keys(changed).filter(m => attrs.includes(m)).length) {
            this.requestUpdate();
        }
    }

    render () {
        return tpl_roomslist({
            'closeRoom': ev => this.closeRoom(ev),
            'collapsed': this.model.get('toggle-state') !== _converse.OPENED,
            'currently_open': room => isUniView() && !room.get('hidden'),
            'model': this.model,
            'openRoom': ev => this.openRoom(ev),
            'rooms': _converse.chatboxes.filter(m => m.get('type') === _converse.CHATROOMS_TYPE),
            'toggle_state': this.model.get('toggle-state')
        });
    }

    async openRoom (ev) { // eslint-disable-line class-methods-use-this
        ev.preventDefault();
        const name = ev.target.textContent;
        const jid = ev.target.getAttribute('data-room-jid');
        const data = {
            'name': name || Strophe.unescapeNode(Strophe.getNodeFromJid(jid)) || jid
        }
        await api.rooms.open(jid, data, true);
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


}

api.elements.define('converse-rooms-list', RoomsList);
