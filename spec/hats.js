(function (root, factory) {
    define([
        "jasmine",
        "mock",
        "test-utils"
        ], factory);
} (this, function (jasmine, mock, test_utils) {
    "use strict";
    const u = converse.env.utils;

    describe("A XEP-0317 MUC Hat", function () {

        it("can be included in a presence stanza",
            mock.initConverse(
                ['rosterGroupsFetched', 'chatBoxesFetched'], {},
                async function (done, _converse) {

            const muc_jid = 'lounge@montague.lit';
            await test_utils.openAndEnterChatRoom(_converse, muc_jid, 'romeo');
            const view = _converse.chatboxviews.get(muc_jid);
            const hat1_id = u.getUniqueId();
            const hat2_id = u.getUniqueId();
            _converse.connection._dataRecv(test_utils.createRequest(u.toStanza(`
                <presence from="${muc_jid}/Terry" id="${u.getUniqueId()}" to="${_converse.jid}">
                    <x xmlns="http://jabber.org/protocol/muc#user">
                        <item affiliation="member" role="participant"/>
                    </x>
                    <hats xmlns="xmpp:prosody.im/protocol/hats:1">
                        <hat title="Teacher&apos;s Assistant" id="${hat1_id}"/>
                        <hat title="Dark Mage" id="${hat2_id}"/>
                    </hats>
                </presence>
            `)));
            await u.waitUntil(() => view.el.querySelector('.chat-content__notifications').textContent.trim() ===
                "romeo and Terry have entered the groupchat");

            let hats = view.model.getOccupant("Terry").get('hats');
            expect(hats.length).toBe(2);
            expect(hats.map(h => h.title).join(' ')).toBe("Teacher's Assistant Dark Mage");

            _converse.connection._dataRecv(test_utils.createRequest(u.toStanza(`
                <message type="groupchat" from="${muc_jid}/Terry" id="${u.getUniqueId()}" to="${_converse.jid}">
                    <body>Hello world</body>
                </message>
            `)));

            const msg_el = await u.waitUntil(() => view.el.querySelector('.chat-msg'));
            let badges = Array.from(msg_el.querySelectorAll('.badge'));
            expect(badges.length).toBe(2);
            expect(badges.map(b => b.textContent.trim()).join(' ' )).toBe("Teacher's Assistant Dark Mage");

            const hat3_id = u.getUniqueId();
            _converse.connection._dataRecv(test_utils.createRequest(u.toStanza(`
                <presence from="${muc_jid}/Terry" id="${u.getUniqueId()}" to="${_converse.jid}">
                    <x xmlns="http://jabber.org/protocol/muc#user">
                        <item affiliation="member" role="participant"/>
                    </x>
                    <hats xmlns="xmpp:prosody.im/protocol/hats:1">
                        <hat title="Teacher&apos;s Assistant" id="${hat1_id}"/>
                        <hat title="Dark Mage" id="${hat2_id}"/>
                        <hat title="Mad hatter" id="${hat3_id}"/>
                    </hats>
                </presence>
            `)));

            await u.waitUntil(() => view.model.getOccupant("Terry").get('hats').length === 3);
            hats = view.model.getOccupant("Terry").get('hats');
            expect(hats.map(h => h.title).join(' ')).toBe("Teacher's Assistant Dark Mage Mad hatter");
            await u.waitUntil(() => view.el.querySelectorAll('.chat-msg .badge').length === 3);
            badges = Array.from(view.el.querySelectorAll('.chat-msg .badge'));
            expect(badges.map(b => b.textContent.trim()).join(' ' )).toBe("Teacher's Assistant Dark Mage Mad hatter");

            _converse.connection._dataRecv(test_utils.createRequest(u.toStanza(`
                <presence from="${muc_jid}/Terry" id="${u.getUniqueId()}" to="${_converse.jid}">
                    <x xmlns="http://jabber.org/protocol/muc#user">
                        <item affiliation="member" role="participant"/>
                    </x>
                </presence>
            `)));
            await u.waitUntil(() => view.model.getOccupant("Terry").get('hats').length === 0);
            await u.waitUntil(() => view.el.querySelectorAll('.chat-msg .badge').length === 0);
            done();
        }));
    })
}));
