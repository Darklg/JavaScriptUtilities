/*
 * Plugin Name: Vanilla Body Panels
 * Version: 0.1
 * Plugin URL: https://github.com/Darklg/JavaScriptUtilities
 * JavaScriptUtilities Body Panels may be freely distributed under the MIT license.
 */

function vanillaBodyPanels() {
    'use strict';
    var i = 0,
        len = false;
    /**
     * Body panels
     */
    var actionEvent,
        bodyPanels = document.querySelectorAll('a[data-bodypanel]'),
        bodyPanelsEvent = function(e) {
            var _panelID = this.getAttribute('data-bodypanel');
            if (!_panelID) {
                return;
            }
            e.preventDefault();
            if (document.body.getAttribute('data-bodypanel') == _panelID) {
                document.body.setAttribute('data-bodypanel', '');
            }
            else {
                document.body.setAttribute('data-bodypanel', _panelID);
            }
        };
    for (i = 0, len = bodyPanels.length; i < len; i++) {
        actionEvent = 'click';
        if (bodyPanels[i].getAttribute('data-bodypanelmethod') == 'touch') {
            actionEvent = 'touchend';
        }
        bodyPanels[i].addEventListener(actionEvent, bodyPanelsEvent);
    }
    /* Escape to remove all body panels */
    window.addEventListener("keydown", function(e) {
        if (e.keyCode == 27) {
            document.body.setAttribute('data-bodypanel', '');
        }
    }, true);

}
