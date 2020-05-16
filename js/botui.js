/*
 * botui 0.3.4
 * A JS library to build the UI for your bot
 * https://botui.org
 *
 * Copyright 2017, Moin Uddin
 * Released under the MIT license.
 */

! function (e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define([], function () {
        return e.BotUI = t(e)
    }) : e.BotUI = t(e)
}("undefined" != typeof window ? window : this, function (e, t) {
    "use strict";
    return function (t, n) {
        function o(e, t, n, o) {
            return "<a class='botui-message-content-link' target='" + (o ? "blank" : "") + "' href='" + n + "'>" + t + "</a>"
        }

        function i(e) {
            return e.replace(v.image, "<img class='botui-message-content-image' src='$2' alt='$1' />").replace(v.icon, "<i class='botui-icon botui-message-content-icon fa fa-$1'></i>").replace(v.link, o)
        }

        function r(e, t) {
            var n = document.createElement("script");
            n.type = "text/javascript", n.src = e, t && (n.onload = t), document.body.appendChild(n)
        }

        function s(e) {
            y.action.addMessage && h.message.human({
                delay: 100,
                content: e
            }), y.action.show = !y.action.autoHide
        }

        function a(e) {
            if (!e.loading && !e.content) throw Error('BotUI: "content" is required in a non-loading message object.');
            e.type = e.type || "text", e.visible = !e.delay && !e.loading;
            var t = y.messages.push(e) - 1;
            return new Promise(function (n, o) {
                setTimeout(function () {
                    e.delay && (e.visible = !0, e.loading && (e.loading = !1)), n(t)
                }, e.delay || 0)
            })
        }

        function u(e) {
            return "string" == typeof e && (e = {
                content: e
            }), e || {}
        }

        function c(e, t) {
            for (var n in e) t.hasOwnProperty(n) || (t[n] = e[n])
        }

        function d(e) {
            if (!e.action) throw Error('BotUI: "action" property is required.')
        }

        function l(e) {
            return d(e), c({
                type: "text",
                cssClass: "",
                autoHide: !0,
                addMessage: !0
            }, e), y.action.type = e.type, y.action.cssClass = e.cssClass, y.action.autoHide = e.autoHide, y.action.addMessage = e.addMessage, new Promise(function (t, n) {
                p = t, setTimeout(function () {
                    y.action.show = !0
                }, e.delay || 0)
            })
        }
        if (n = n || {}, !t) throw Error("BotUI: Container id is required as first argument.");
        if (!document.getElementById(t)) throw Error("BotUI: Element with id #" + t + " does not exist.");
        if (!e.Vue && !n.vue) throw Error("BotUI: Vue is required but not found.");
        var f, m, p, g = {
                debug: !1,
                fontawesome: !0
            },
            h = {},
            v = {
                icon: /!\(([^\)]+)\)/gim,
                image: /!\[(.*?)\]\((.*?)\)/gim,
                link: /\[([^\[]+)\]\(([^\)]+)\)(\^?)/gim
            };
        e.Vue = e.Vue || n.vue;
        for (var b in g) n.hasOwnProperty(b) && (g[b] = n[b]);
        e.Promise || Promise || options.promise || r("https://cdn.jsdelivr.net/es6-promise/4.1.0/es6-promise.min.js");
        var w = {
            template: "<div class=\"botui botui-container\" v-botui-container><div class=\"botui-messages-container\"><div v-for=\"msg in messages\" class=\"botui-message\" :class=\"msg.cssClass\" v-botui-scroll><transition name=\"slide-fade\"><div v-if=\"msg.visible\" :class=\"[{human: msg.human, \'botui-message-content\': true}, msg.type]\"><span v-if=\"msg.type == \'text\'\" v-text=\"msg.content\" v-botui-markdown></span> <iframe v-if=\"msg.type == \'embed\'\" :src=\"msg.content\" frameborder=\"0\" allowfullscreen></iframe></div></transition><div v-if=\"msg.loading\" class=\"botui-message-content loading\"><i class=\"dot\"></i><i class=\"dot\"></i><i class=\"dot\"></i></div></div></div><div class=\"botui-actions-container\"><transition name=\"slide-fade\"><div v-if=\"action.show\" v-botui-scroll><form v-if=\"action.type == \'text\'\" class=\"botui-actions-text\" @submit.prevent=\"handle_action_text()\" :class=\"action.cssClass\"><i v-if=\"action.text.icon\" class=\"botui-icon botui-action-text-icon fa\" :class=\"\'fa-\' + action.text.icon\"></i> <input type=\"text\" ref=\"input\" :type=\"action.text.sub_type\" v-model=\"action.text.value\" class=\"botui-actions-text-input\" :placeholder=\"action.text.placeholder\" :size=\"action.text.size\" :value=\"action.text.value\" :class=\"action.text.cssClass\" required v-focus/> <button type=\"submit\" :class=\"{\'botui-actions-buttons-button\': !!action.text.button, \'botui-actions-text-submit\': !action.text.button}\"><i v-if=\"action.text.button && action.text.button.icon\" class=\"botui-icon botui-action-button-icon fa\" :class=\"\'fa-\' + action.text.button.icon\"></i> <span>{{(action.text.button && action.text.button.label) || \'Go\'}}</span></button></form><div v-if=\"action.type == \'button\'\" class=\"botui-actions-buttons\" :class=\"action.cssClass\"> <button type=\"button\" :class=\"button.cssClass\" class=\"botui-actions-buttons-button\" v-for=\"button in action.button.buttons\" @click=\"handle_action_button(button)\" autofocus><i v-if=\"button.icon\" class=\"botui-icon botui-action-button-icon fa\" :class=\"\'fa-\' + button.icon\"></i> {{button.text}}</button></div></div></transition></div></div>",
            data: function () {
                return {
                    action: {
                        text: {
                            size: 30,
                            placeholder: "Write here .."
                        },
                        button: {},
                        show: !1,
                        type: "text",
                        autoHide: !0,
                        addMessage: !0
                    },
                    messages: []
                }
            },
            computed: {
                isMobile: function () {
                    return e.innerWidth && e.innerWidth <= 768
                }
            },
            methods: {
                handle_action_button: function (e) {
                    s(e.text);
                    var t = {
                        type: "button",
                        text: e.text,
                        value: e.value
                    };
                    for (var n in e) e.hasOwnProperty(n) && "type" !== n && "text" !== n && "value" !== n && (t[n] = e[n]);
                    p(t)
                },
                handle_action_text: function () {
                    this.action.text.value && (s(this.action.text.value), p({
                        type: "text",
                        value: this.action.text.value
                    }), this.action.text.value = "")
                }
            }
        };
        e.Vue.directive("botui-markdown", function (e, t) {
            "false" != t.value && (e.innerHTML = i(e.textContent))
        }), e.Vue.directive("botui-scroll", {
            inserted: function (e) {
                m.scrollTop = m.scrollHeight
            }
        }), e.Vue.directive("focus", {
            inserted: function (e) {
                e.focus()
            }
        }), e.Vue.directive("botui-container", {
            inserted: function (e) {
                m = e
            }
        }), f = new e.Vue({
            components: {
                "bot-ui": w
            }
        }).$mount("#" + t);
        var y = f.$children[0];
        return h.message = {
            add: function (e) {
                return a(u(e))
            },
            bot: function (e) {
                return e = u(e), a(e)
            },
            human: function (e) {
                return e = u(e), e.human = !0, a(e)
            },
            get: function (e) {
                return Promise.resolve(y.messages[e])
            },
            remove: function (e) {
                return y.messages.splice(e, 1), Promise.resolve()
            },
            update: function (e, t) {
                var n = y.messages[e];
                return n.content = t.content, n.visible = !t.loading, n.loading = !!t.loading, Promise.resolve(t.content)
            },
            removeAll: function () {
                return y.messages.splice(0, y.messages.length), Promise.resolve()
            }
        }, h.action = {
            show: l,
            hide: function () {
                return y.action.show = !1, Promise.resolve()
            },
            text: function (e) {
                return d(e), y.action.text = e.action, l(e)
            },
            button: function (e) {
                return d(e), e.type = "button", y.action.button.buttons = e.action, l(e)
            }
        }, g.fontawesome && r("https://use.fontawesome.com/ea731dcb6f.js"), g.debug && (h._botApp = f), h
    }
});