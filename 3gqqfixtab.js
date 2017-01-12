function Swipe(t, e) {
    "use strict";
    function i() {
        if (g = y.children,
        w = g.length,
        g.length < 2 && (e.continuous = !1),
        f.transitions && e.continuous && g.length < 3) {
            var i = g[0].cloneNode(!0);
            i.removeAttribute("data-log-exp");
            var n = y.children[1].cloneNode(!0);
            n.removeAttribute("data-log-exp"),
            y.appendChild(i),
            y.appendChild(n),
            g = y.children
        }
        m = new Array(g.length),
        v = t.getBoundingClientRect().width || t.offsetWidth,
        y.style.width = g.length * v + "px",
        e.useForImg && (y.style.height = v * e.useForImg.height / e.useForImg.width + "px");
        for (var o = g.length; o--; ) {
            var r = g[o];
            r.style.width = v + "px",
            r.setAttribute("data-index", o),
            f.transitions && (r.style.left = o * -v + "px",
            s(o, b > o ? -v : o > b ? v : 0, 0))
        }
        e.continuous && f.transitions && (s(a(b - 1), -v, 0),
        s(a(b + 1), v, 0)),
        f.transitions || (y.style.left = b * -v + "px"),
        t.style.visibility = "visible"
    }
    function n() {
        e.continuous ? r(b - 1) : b && r(b - 1)
    }
    function o() {
        e.continuous ? r(b + 1) : b < g.length - 1 && r(b + 1)
    }
    function a(t) {
        return (g.length + t % g.length) % g.length
    }
    function r(t, i) {
        if (b != t) {
            if (f.transitions) {
                var n = Math.abs(b - t) / (b - t);
                if (e.continuous) {
                    var o = n;
                    n = -m[a(t)] / v,
                    n !== o && (t = -n * g.length + t)
                }
                for (var r = Math.abs(b - t) - 1; r--; )
                    s(a((t > b ? t : b) - r - 1), v * n, 0);
                t = a(t),
                s(b, v * n, i || _),
                s(t, 0, i || _),
                e.continuous && s(a(t - n), -(v * n), 0)
            } else
                t = a(t),
                l(b * -v, t * -v, i || _);
            b = t;
            var c = b >= w ? b - w : b;
            p(e.callback && e.callback(c, g[b]))
        }
    }
    function s(t, e, i) {
        c(t, e, i),
        m[t] = e
    }
    function c(t, e, i) {
        var n = g[t]
          , o = n && n.style;
        o && (o.webkitTransitionDuration = o.MozTransitionDuration = o.msTransitionDuration = o.OTransitionDuration = o.transitionDuration = i + "ms",
        o.webkitTransform = "translate(" + e + "px,0)translateZ(0)",
        o.msTransform = o.MozTransform = o.OTransform = "translateX(" + e + "px)")
    }
    function l(t, i, n) {
        if (!n)
            return void (y.style.left = i + "px");
        var o = +new Date
          , a = setInterval(function() {
            var r = +new Date - o;
            return r > n ? (y.style.left = i + "px",
            T && d(),
            e.transitionEnd && e.transitionEnd.call(event, b, g[b]),
            void clearInterval(a)) : void (y.style.left = (i - t) * (Math.floor(r / n * 100) / 100) + t + "px")
        }, 4)
    }
    function d() {
        x = setTimeout(o, T)
    }
    function u(t) {
        t || (T = 0),
        clearTimeout(x)
    }
    var h = function() {}
      , p = function(t) {
        setTimeout(t || h, 0)
    }
      , f = {
        addEventListener: !!window.addEventListener,
        touch: "ontouchstart"in window || window.DocumentTouch && document instanceof DocumentTouch,
        transitions: function(t) {
            var e = ["transitionProperty", "WebkitTransition", "MozTransition", "OTransition", "msTransition"];
            for (var i in e)
                if (void 0 !== t.style[e[i]])
                    return !0;
            return !1
        }(document.createElement("swipe"))
    };
    if (t) {
        var g, m, v, w, y = t.children[0];
        e = e || {};
        var b = parseInt(e.startSlide, 10) || 0
          , _ = e.speed || 300;
        e.continuous = void 0 !== e.continuous ? e.continuous : !0,
        e.useResizeEvent = void 0 !== e.useResizeEvent ? e.useResizeEvent : !0,
        e.useForImg = void 0 !== e.useForImg ? e.useForImg : null;
        var x, A, T = e.auto || 0, k = {}, C = {}, S = {
            handleEvent: function(t) {
                switch (t.type) {
                case "touchstart":
                    this.start(t);
                    break;
                case "touchmove":
                    this.move(t);
                    break;
                case "touchend":
                    p(this.end(t));
                    break;
                case "webkitTransitionEnd":
                case "msTransitionEnd":
                case "oTransitionEnd":
                case "otransitionend":
                case "transitionend":
                    p(this.transitionEnd(t));
                    break;
                case "resize":
                    e.useResizeEvent && p(i)
                }
                e.stopPropagation && t.stopPropagation()
            },
            start: function(t) {
                var e = t.touches[0];
                k = {
                    x: e.pageX,
                    y: e.pageY,
                    time: +new Date
                },
                A = void 0,
                C = {},
                y.addEventListener("touchmove", this, !1),
                y.addEventListener("touchend", this, !1)
            },
            move: function(t) {
                if (!(t.touches.length > 1 || t.scale && 1 !== t.scale)) {
                    e.disableScroll && t.preventDefault();
                    var i = t.touches[0];
                    C = {
                        x: i.pageX - k.x,
                        y: i.pageY - k.y
                    },
                    "undefined" == typeof A && (A = !!(A || Math.abs(C.x) < Math.abs(C.y))),
                    A || (t.preventDefault(),
                    u(!0),
                    e.continuous ? (c(a(b - 1), C.x + m[a(b - 1)], 0),
                    c(b, C.x + m[b], 0),
                    c(a(b + 1), C.x + m[a(b + 1)], 0)) : (C.x = C.x / (!b && C.x > 0 || b == g.length - 1 && C.x < 0 ? Math.abs(C.x) / v + 1 : 1),
                    c(b - 1, C.x + m[b - 1], 0),
                    c(b, C.x + m[b], 0),
                    c(b + 1, C.x + m[b + 1], 0)))
                }
            },
            end: function() {
                var t = +new Date - k.time
                  , i = Number(t) < 250 && Math.abs(C.x) > 20 || Math.abs(C.x) > v / 2
                  , n = !b && C.x > 0 || b == g.length - 1 && C.x < 0;
                e.continuous && (n = !1);
                var o = C.x < 0;
                if (!A)
                    if (i && !n) {
                        o ? (e.continuous ? (s(a(b - 1), -v, 0),
                        s(a(b + 2), v, 0)) : s(b - 1, -v, 0),
                        s(b, m[b] - v, _),
                        s(a(b + 1), m[a(b + 1)] - v, _),
                        b = a(b + 1)) : (e.continuous ? (s(a(b + 1), v, 0),
                        s(a(b - 2), -v, 0)) : s(b + 1, v, 0),
                        s(b, m[b] + v, _),
                        s(a(b - 1), m[a(b - 1)] + v, _),
                        b = a(b - 1));
                        var r = b >= w ? b - w : b;
                        e.callback && e.callback(r, g[b])
                    } else
                        e.continuous ? (s(a(b - 1), -v, _),
                        s(b, 0, _),
                        s(a(b + 1), v, _)) : (s(b - 1, -v, _),
                        s(b, 0, _),
                        s(b + 1, v, _));
                y.removeEventListener("touchmove", S, !1),
                y.removeEventListener("touchend", S, !1)
            },
            transitionEnd: function(t) {
                parseInt(t.target.getAttribute("data-index"), 10) == b && (T && d(),
                e.transitionEnd && e.transitionEnd.call(t, b, g[b]))
            }
        };
        return i(),
        T && d(),
        f.addEventListener ? (f.touch && y.addEventListener("touchstart", S, !1),
        f.transitions && (y.addEventListener("webkitTransitionEnd", S, !1),
        y.addEventListener("msTransitionEnd", S, !1),
        y.addEventListener("oTransitionEnd", S, !1),
        y.addEventListener("otransitionend", S, !1),
        y.addEventListener("transitionend", S, !1)),
        window.addEventListener("resize", S, !1)) : window.onresize = function() {
            i()
        }
        ,
        {
            setup: function() {
                i()
            },
            slide: function(t, e) {
                u(),
                r(t, e)
            },
            prev: function() {
                u(),
                n()
            },
            next: function() {
                u(),
                o()
            },
            begin: function() {
                T = e.auto,
                d()
            },
            stop: function() {
                u()
            },
            getPos: function() {
                return b
            },
            getNumSlides: function() {
                return w
            },
            kill: function() {
                u();
                for (var t = g.length; t--; ) {
                    {
                        g[t]
                    }
                    f.transitions && c(t, 0, 0)
                }
                f.addEventListener ? (y.removeEventListener("touchstart", S, !1),
                y.removeEventListener("webkitTransitionEnd", S, !1),
                y.removeEventListener("msTransitionEnd", S, !1),
                y.removeEventListener("oTransitionEnd", S, !1),
                y.removeEventListener("otransitionend", S, !1),
                y.removeEventListener("transitionend", S, !1),
                window.removeEventListener("resize", S, !1)) : window.onresize = null
            }
        }
    }
}
define("init", ["m_zepto", "main", "recom", "modData", "tabs", "fixTab", "m_hijack", "jump", "m_log", "m_qqWebview", "m_browser", "shortcutIos", "otherAds", "m_pushNews", "m_login", "JSP", "m_stat", "m_storage"], function(t, e, i, n, o, a, r, s, c, l, d, u, h, p, f, g, m, v) {
    var w = g.userInfo
      , l = l.default
      , y = {
        init: function() {
            this.initLogin(),
            this.initGrayTabs(),
            this.initComMods(),
            this.sendBackLog()
        },
        initGrayTabs: function() {
            1 === n.useDoubleTabs ? (o.init(),
            a.init()) : (e.init(),
            this.sendPvLog())
        },
        initComMods: function() {
            this.qqWebview(),
            h.init(),
            this.initPushNews(),
            this.initHeaderLink(),
            s.init(),
            new u,
            this.initHijack()
        },
        sendPvLog: function() {
            var e = {
                aid: "index",
                channel: "index"
            };
            c.pvSendAll(t.extend({}, e, {
                pid: 135
            }), e)
        },
        qqWebview: function() {
            function e() {
                d.isFromIos || (document.title = "返回",
                setTimeout(function() {
                    document.title = "手机腾讯网"
                }, 300))
            }
            l.canTitlebarCustom && (mqq.ui.setWebViewBehavior({
                bottomBar: !1
            }),
            t(".lincowebapp-wrapper").on("click", "a", function(i) {
                var n = t(i.currentTarget).attr("href");
                if (n && n.indexOf("//") > -1) {
                    var o = n.split("#")
                      , a = o[0].indexOf("?") > -1 ? "&" : "?";
                    return n = o[0] + a + "_wv=1" + (o[1] ? "#" + o[1] : ""),
                    l.openUrl(n, i),
                    /(aid=template)|(yuetu)/gi.test(n) && e(),
                    !1
                }
            }),
            t(window).on("unload", function() {
                mqq.ui.setTitleButtons({
                    right: {
                        title: " ",
                        callback: function() {}
                    }
                })
            }))
        },
        initHijack: function() {
            var t = 3;
            d.isFromQQBrower && (t = 11),
            r.init({
                projectId: t
            })
        },
        initPushNews: function() {
            p.default.init({
                "if": 1285
            })
        },
        initHeaderLink: function() {
            t("#hd-wrap").on("click", function(e) {
                var i = t(e.currentTarget).data("link");
                -1 === i.indexOf("aid=storywall&f_pid=135#home") && (location.href = i)
            }),
            t("#login").on("click", function(t) {
                t.stopPropagation(),
                f.isLogin() ? location.href = "//infoapp.3g.qq.com/g/usercenter/touch?f_pid=135" : f.login(function() {
                    location.reload()
                })
            }),
            t("#hd-wrap .lk-recom").on("click", function(e) {
                e.stopPropagation();
                var i = t(e.currentTarget).data("href");
                i && (location.href = i)
            })
        },
        initLogin: function() {
            f.init({
                islogin: w.isLogin,
                uid: w.qq
            })
        },
        sendTempLog: function() {
            var t = 10 * Math.random();
            if (d.isFromIos && t > 5) {
                var e = document.documentElement.clientWidth || window.innerWidth;
                c.ckSend("indexPage", "clientInfo," + e)
            }
        },
        sendBackLog: function() {
            var e = "index_back_time"
              , i = v.getItem(e)
              , n = t(document.body).data("time");
            n && i == n ? c.ckUserSend("indexPageUser", "backButNotRefresh") : v.setItem({
                key: e,
                value: n,
                ttl: 86400
            })
        }
    };
    y.init()
}),
define("m_zepto", [], function() {
    var t = function() {
        function t(t) {
            return null == t ? String(t) : Q[X.call(t)] || "object"
        }
        function e(e) {
            return "function" == t(e)
        }
        function i(t) {
            return null != t && t == t.window
        }
        function n(t) {
            return null != t && t.nodeType == t.DOCUMENT_NODE
        }
        function o(e) {
            return "object" == t(e)
        }
        function a(t) {
            return o(t) && !i(t) && Object.getPrototypeOf(t) == Object.prototype
        }
        function r(t) {
            return "number" == typeof t.length
        }
        function s(t) {
            return L.call(t, function(t) {
                return null != t
            })
        }
        function c(t) {
            return t.length > 0 ? A.fn.concat.apply([], t) : t
        }
        function l(t) {
            return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
        }
        function d(t) {
            return t in P ? P[t] : P[t] = new RegExp("(^|\\s)" + t + "(\\s|$)")
        }
        function u(t, e) {
            return "number" != typeof e || D[l(t)] ? e : e + "px"
        }
        function h(t) {
            var e, i;
            return E[t] || (e = q.createElement(t),
            q.body.appendChild(e),
            i = getComputedStyle(e, "").getPropertyValue("display"),
            e.parentNode.removeChild(e),
            "none" == i && (i = "block"),
            E[t] = i),
            E[t]
        }
        function p(t) {
            return "children"in t ? I.call(t.children) : A.map(t.childNodes, function(t) {
                return 1 == t.nodeType ? t : void 0
            })
        }
        function f(t, e, i) {
            for (x in e)
                i && (a(e[x]) || J(e[x])) ? (a(e[x]) && !a(t[x]) && (t[x] = {}),
                J(e[x]) && !J(t[x]) && (t[x] = []),
                f(t[x], e[x], i)) : e[x] !== _ && (t[x] = e[x])
        }
        function g(t, e) {
            return null == e ? A(t) : A(t).filter(e)
        }
        function m(t, i, n, o) {
            return e(i) ? i.call(t, n, o) : i
        }
        function v(t, e, i) {
            null == i ? t.removeAttribute(e) : t.setAttribute(e, i)
        }
        function w(t, e) {
            var i = t.className
              , n = i && i.baseVal !== _;
            return e === _ ? n ? i.baseVal : i : void (n ? i.baseVal = e : t.className = e)
        }
        function y(t) {
            var e;
            try {
                return t ? "true" == t || ("false" == t ? !1 : "null" == t ? null : /^0/.test(t) || isNaN(e = Number(t)) ? /^[\[\{]/.test(t) ? A.parseJSON(t) : t : e) : t
            } catch (i) {
                return t
            }
        }
        function b(t, e) {
            e(t);
            for (var i = 0, n = t.childNodes.length; n > i; i++)
                b(t.childNodes[i], e)
        }
        var _, x, A, T, k, C, S = [], I = S.slice, L = S.filter, q = window.document, E = {}, P = {}, D = {
            "column-count": 1,
            columns: 1,
            "font-weight": 1,
            "line-height": 1,
            opacity: 1,
            "z-index": 1,
            zoom: 1
        }, j = /^\s*<(\w+|!)[^>]*>/, M = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, N = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, F = /^(?:body|html)$/i, R = /([A-Z])/g, z = ["val", "css", "html", "text", "data", "width", "height", "offset"], U = ["after", "prepend", "before", "append"], O = q.createElement("table"), W = q.createElement("tr"), B = {
            tr: q.createElement("tbody"),
            tbody: O,
            thead: O,
            tfoot: O,
            td: W,
            th: W,
            "*": q.createElement("div")
        }, V = /complete|loaded|interactive/, H = /^[\w-]*$/, Q = {}, X = Q.toString, G = {}, Y = q.createElement("div"), $ = {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        }, J = Array.isArray || function(t) {
            return t instanceof Array
        }
        ;
        return G.matches = function(t, e) {
            if (!e || !t || 1 !== t.nodeType)
                return !1;
            var i = t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector;
            if (i)
                return i.call(t, e);
            var n, o = t.parentNode, a = !o;
            return a && (o = Y).appendChild(t),
            n = ~G.qsa(o, e).indexOf(t),
            a && Y.removeChild(t),
            n
        }
        ,
        k = function(t) {
            return t.replace(/-+(.)?/g, function(t, e) {
                return e ? e.toUpperCase() : ""
            })
        }
        ,
        C = function(t) {
            return L.call(t, function(e, i) {
                return t.indexOf(e) == i
            })
        }
        ,
        G.fragment = function(t, e, i) {
            var n, o, r;
            return M.test(t) && (n = A(q.createElement(RegExp.$1))),
            n || (t.replace && (t = t.replace(N, "<$1></$2>")),
            e === _ && (e = j.test(t) && RegExp.$1),
            e in B || (e = "*"),
            r = B[e],
            r.innerHTML = "" + t,
            n = A.each(I.call(r.childNodes), function() {
                r.removeChild(this)
            })),
            a(i) && (o = A(n),
            A.each(i, function(t, e) {
                z.indexOf(t) > -1 ? o[t](e) : o.attr(t, e)
            })),
            n
        }
        ,
        G.Z = function(t, e) {
            return t = t || [],
            t.__proto__ = A.fn,
            t.selector = e || "",
            t
        }
        ,
        G.isZ = function(t) {
            return t instanceof G.Z
        }
        ,
        G.init = function(t, i) {
            var n;
            if (!t)
                return G.Z();
            if ("string" == typeof t)
                if (t = t.trim(),
                "<" == t[0] && j.test(t))
                    n = G.fragment(t, RegExp.$1, i),
                    t = null;
                else {
                    if (i !== _)
                        return A(i).find(t);
                    n = G.qsa(q, t)
                }
            else {
                if (e(t))
                    return A(q).ready(t);
                if (G.isZ(t))
                    return t;
                if (J(t))
                    n = s(t);
                else if (o(t))
                    n = [t],
                    t = null;
                else if (j.test(t))
                    n = G.fragment(t.trim(), RegExp.$1, i),
                    t = null;
                else {
                    if (i !== _)
                        return A(i).find(t);
                    n = G.qsa(q, t)
                }
            }
            return G.Z(n, t)
        }
        ,
        A = function(t, e) {
            return G.init(t, e)
        }
        ,
        A.extend = function(t) {
            var e, i = I.call(arguments, 1);
            return "boolean" == typeof t && (e = t,
            t = i.shift()),
            i.forEach(function(i) {
                f(t, i, e)
            }),
            t
        }
        ,
        G.qsa = function(t, e) {
            var i, o = "#" == e[0], a = !o && "." == e[0], r = o || a ? e.slice(1) : e, s = H.test(r);
            return n(t) && s && o ? (i = t.getElementById(r)) ? [i] : [] : 1 !== t.nodeType && 9 !== t.nodeType ? [] : I.call(s && !o ? a ? t.getElementsByClassName(r) : t.getElementsByTagName(e) : t.querySelectorAll(e))
        }
        ,
        A.contains = q.documentElement.contains ? function(t, e) {
            return t !== e && t.contains(e)
        }
        : function(t, e) {
            for (; e && (e = e.parentNode); )
                if (e === t)
                    return !0;
            return !1
        }
        ,
        A.type = t,
        A.isFunction = e,
        A.isWindow = i,
        A.isArray = J,
        A.isPlainObject = a,
        A.isEmptyObject = function(t) {
            var e;
            for (e in t)
                return !1;
            return !0
        }
        ,
        A.inArray = function(t, e, i) {
            return S.indexOf.call(e, t, i)
        }
        ,
        A.camelCase = k,
        A.trim = function(t) {
            return null == t ? "" : String.prototype.trim.call(t)
        }
        ,
        A.uuid = 0,
        A.support = {},
        A.expr = {},
        A.map = function(t, e) {
            var i, n, o, a = [];
            if (r(t))
                for (n = 0; n < t.length; n++)
                    i = e(t[n], n),
                    null != i && a.push(i);
            else
                for (o in t)
                    i = e(t[o], o),
                    null != i && a.push(i);
            return c(a)
        }
        ,
        A.each = function(t, e) {
            var i, n;
            if (r(t)) {
                for (i = 0; i < t.length; i++)
                    if (e.call(t[i], i, t[i]) === !1)
                        return t
            } else
                for (n in t)
                    if (e.call(t[n], n, t[n]) === !1)
                        return t;
            return t
        }
        ,
        A.grep = function(t, e) {
            return L.call(t, e)
        }
        ,
        window.JSON && (A.parseJSON = JSON.parse),
        A.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(t, e) {
            Q["[object " + e + "]"] = e.toLowerCase()
        }),
        A.fn = {
            forEach: S.forEach,
            reduce: S.reduce,
            push: S.push,
            sort: S.sort,
            indexOf: S.indexOf,
            concat: S.concat,
            map: function(t) {
                return A(A.map(this, function(e, i) {
                    return t.call(e, i, e)
                }))
            },
            slice: function() {
                return A(I.apply(this, arguments))
            },
            ready: function(t) {
                return V.test(q.readyState) && q.body ? t(A) : q.addEventListener("DOMContentLoaded", function() {
                    t(A)
                }, !1),
                this
            },
            get: function(t) {
                return t === _ ? I.call(this) : this[t >= 0 ? t : t + this.length]
            },
            toArray: function() {
                return this.get()
            },
            size: function() {
                return this.length
            },
            remove: function() {
                return this.each(function() {
                    null != this.parentNode && this.parentNode.removeChild(this)
                })
            },
            each: function(t) {
                return S.every.call(this, function(e, i) {
                    return t.call(e, i, e) !== !1
                }),
                this
            },
            filter: function(t) {
                return e(t) ? this.not(this.not(t)) : A(L.call(this, function(e) {
                    return G.matches(e, t)
                }))
            },
            add: function(t, e) {
                return A(C(this.concat(A(t, e))))
            },
            is: function(t) {
                return this.length > 0 && G.matches(this[0], t)
            },
            not: function(t) {
                var i = [];
                if (e(t) && t.call !== _)
                    this.each(function(e) {
                        t.call(this, e) || i.push(this)
                    });
                else {
                    var n = "string" == typeof t ? this.filter(t) : r(t) && e(t.item) ? I.call(t) : A(t);
                    this.forEach(function(t) {
                        n.indexOf(t) < 0 && i.push(t)
                    })
                }
                return A(i)
            },
            has: function(t) {
                return this.filter(function() {
                    return o(t) ? A.contains(this, t) : A(this).find(t).size()
                })
            },
            eq: function(t) {
                return -1 === t ? this.slice(t) : this.slice(t, +t + 1)
            },
            first: function() {
                var t = this[0];
                return t && !o(t) ? t : A(t)
            },
            last: function() {
                var t = this[this.length - 1];
                return t && !o(t) ? t : A(t)
            },
            find: function(t) {
                var e, i = this;
                return e = t ? "object" == typeof t ? A(t).filter(function() {
                    var t = this;
                    return S.some.call(i, function(e) {
                        return A.contains(e, t)
                    })
                }) : 1 == this.length ? A(G.qsa(this[0], t)) : this.map(function() {
                    return G.qsa(this, t)
                }) : []
            },
            closest: function(t, e) {
                var i = this[0]
                  , o = !1;
                for ("object" == typeof t && (o = A(t)); i && !(o ? o.indexOf(i) >= 0 : G.matches(i, t)); )
                    i = i !== e && !n(i) && i.parentNode;
                return A(i)
            },
            parents: function(t) {
                for (var e = [], i = this; i.length > 0; )
                    i = A.map(i, function(t) {
                        return (t = t.parentNode) && !n(t) && e.indexOf(t) < 0 ? (e.push(t),
                        t) : void 0
                    });
                return g(e, t)
            },
            parent: function(t) {
                return g(C(this.pluck("parentNode")), t)
            },
            children: function(t) {
                return g(this.map(function() {
                    return p(this)
                }), t)
            },
            contents: function() {
                return this.map(function() {
                    return I.call(this.childNodes)
                })
            },
            siblings: function(t) {
                return g(this.map(function(t, e) {
                    return L.call(p(e.parentNode), function(t) {
                        return t !== e
                    })
                }), t)
            },
            empty: function() {
                return this.each(function() {
                    this.innerHTML = ""
                })
            },
            pluck: function(t) {
                return A.map(this, function(e) {
                    return e[t]
                })
            },
            show: function() {
                return this.each(function() {
                    "none" == this.style.display && (this.style.display = ""),
                    "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = h(this.nodeName))
                })
            },
            replaceWith: function(t) {
                return this.before(t).remove()
            },
            wrap: function(t) {
                var i = e(t);
                if (this[0] && !i)
                    var n = A(t).get(0)
                      , o = n.parentNode || this.length > 1;
                return this.each(function(e) {
                    A(this).wrapAll(i ? t.call(this, e) : o ? n.cloneNode(!0) : n)
                })
            },
            wrapAll: function(t) {
                if (this[0]) {
                    A(this[0]).before(t = A(t));
                    for (var e; (e = t.children()).length; )
                        t = e.first();
                    A(t).append(this)
                }
                return this
            },
            wrapInner: function(t) {
                var i = e(t);
                return this.each(function(e) {
                    var n = A(this)
                      , o = n.contents()
                      , a = i ? t.call(this, e) : t;
                    o.length ? o.wrapAll(a) : n.append(a)
                })
            },
            unwrap: function() {
                return this.parent().each(function() {
                    A(this).replaceWith(A(this).children())
                }),
                this
            },
            clone: function() {
                return this.map(function() {
                    return this.cloneNode(!0)
                })
            },
            hide: function() {
                return this.css("display", "none")
            },
            toggle: function(t) {
                return this.each(function() {
                    var e = A(this);
                    (t === _ ? "none" == e.css("display") : t) ? e.show() : e.hide()
                })
            },
            prev: function(t) {
                return A(this.pluck("previousElementSibling")).filter(t || "*")
            },
            next: function(t) {
                return A(this.pluck("nextElementSibling")).filter(t || "*")
            },
            html: function(t) {
                return 0 in arguments ? this.each(function(e) {
                    var i = this.innerHTML;
                    A(this).empty().append(m(this, t, e, i))
                }) : 0 in this ? this[0].innerHTML : null
            },
            text: function(t) {
                return 0 in arguments ? this.each(function(e) {
                    var i = m(this, t, e, this.textContent);
                    this.textContent = null == i ? "" : "" + i
                }) : 0 in this ? this[0].textContent : null
            },
            attr: function(t, e) {
                var i;
                return "string" != typeof t || 1 in arguments ? this.each(function(i) {
                    if (1 === this.nodeType)
                        if (o(t))
                            for (x in t)
                                v(this, x, t[x]);
                        else
                            v(this, t, m(this, e, i, this.getAttribute(t)))
                }) : this.length && 1 === this[0].nodeType ? !(i = this[0].getAttribute(t)) && t in this[0] ? this[0][t] : i : _
            },
            removeAttr: function(t) {
                return this.each(function() {
                    1 === this.nodeType && v(this, t)
                })
            },
            prop: function(t, e) {
                return t = $[t] || t,
                1 in arguments ? this.each(function(i) {
                    this[t] = m(this, e, i, this[t])
                }) : this[0] && this[0][t]
            },
            data: function(t, e) {
                var i = "data-" + t.replace(R, "-$1").toLowerCase()
                  , n = 1 in arguments ? this.attr(i, e) : this.attr(i);
                return null !== n ? n : _
            },
            val: function(t) {
                return 0 in arguments ? this.each(function(e) {
                    this.value = m(this, t, e, this.value)
                }) : this[0] && (this[0].multiple ? A(this[0]).find("option").filter(function() {
                    return this.selected
                }).pluck("value") : this[0].value)
            },
            offset: function(t) {
                if (t)
                    return this.each(function(e) {
                        var i = A(this)
                          , n = m(this, t, e, i.offset())
                          , o = i.offsetParent().offset()
                          , a = {
                            top: n.top - o.top,
                            left: n.left - o.left
                        };
                        "static" == i.css("position") && (a.position = "relative"),
                        i.css(a)
                    });
                if (!this.length)
                    return null;
                var e = this[0].getBoundingClientRect();
                return {
                    left: e.left + window.pageXOffset,
                    top: e.top + window.pageYOffset,
                    width: Math.round(e.width),
                    height: Math.round(e.height)
                }
            },
            css: function(e, i) {
                if (arguments.length < 2) {
                    var n = this[0]
                      , o = getComputedStyle(n, "");
                    if (!n)
                        return;
                    if ("string" == typeof e)
                        return n.style[k(e)] || o.getPropertyValue(e);
                    if (J(e)) {
                        var a = {};
                        return A.each(J(e) ? e : [e], function(t, e) {
                            a[e] = n.style[k(e)] || o.getPropertyValue(e)
                        }),
                        a
                    }
                }
                var r = "";
                if ("string" == t(e))
                    i || 0 === i ? r = l(e) + ":" + u(e, i) : this.each(function() {
                        this.style.removeProperty(l(e))
                    });
                else
                    for (x in e)
                        e[x] || 0 === e[x] ? r += l(x) + ":" + u(x, e[x]) + ";" : this.each(function() {
                            this.style.removeProperty(l(x))
                        });
                return this.each(function() {
                    this.style.cssText += ";" + r
                })
            },
            index: function(t) {
                return t ? this.indexOf(A(t)[0]) : this.parent().children().indexOf(this[0])
            },
            hasClass: function(t) {
                return t ? S.some.call(this, function(t) {
                    return this.test(w(t))
                }, d(t)) : !1
            },
            addClass: function(t) {
                return t ? this.each(function(e) {
                    T = [];
                    var i = w(this)
                      , n = m(this, t, e, i);
                    n.split(/\s+/g).forEach(function(t) {
                        A(this).hasClass(t) || T.push(t)
                    }, this),
                    T.length && w(this, i + (i ? " " : "") + T.join(" "))
                }) : this
            },
            removeClass: function(t) {
                return this.each(function(e) {
                    return t === _ ? w(this, "") : (T = w(this),
                    m(this, t, e, T).split(/\s+/g).forEach(function(t) {
                        T = T.replace(d(t), " ")
                    }),
                    void w(this, T.trim()))
                })
            },
            toggleClass: function(t, e) {
                return t ? this.each(function(i) {
                    var n = A(this)
                      , o = m(this, t, i, w(this));
                    o.split(/\s+/g).forEach(function(t) {
                        (e === _ ? !n.hasClass(t) : e) ? n.addClass(t) : n.removeClass(t)
                    })
                }) : this
            },
            scrollTop: function(t) {
                if (this.length) {
                    var e = "scrollTop"in this[0];
                    return t === _ ? e ? this[0].scrollTop : this[0].pageYOffset : this.each(e ? function() {
                        this.scrollTop = t
                    }
                    : function() {
                        this.scrollTo(this.scrollX, t)
                    }
                    )
                }
            },
            scrollLeft: function(t) {
                if (this.length) {
                    var e = "scrollLeft"in this[0];
                    return t === _ ? e ? this[0].scrollLeft : this[0].pageXOffset : this.each(e ? function() {
                        this.scrollLeft = t
                    }
                    : function() {
                        this.scrollTo(t, this.scrollY)
                    }
                    )
                }
            },
            position: function() {
                if (this.length) {
                    var t = this[0]
                      , e = this.offsetParent()
                      , i = this.offset()
                      , n = F.test(e[0].nodeName) ? {
                        top: 0,
                        left: 0
                    } : e.offset();
                    return i.top -= parseFloat(A(t).css("margin-top")) || 0,
                    i.left -= parseFloat(A(t).css("margin-left")) || 0,
                    n.top += parseFloat(A(e[0]).css("border-top-width")) || 0,
                    n.left += parseFloat(A(e[0]).css("border-left-width")) || 0,
                    {
                        top: i.top - n.top,
                        left: i.left - n.left
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var t = this.offsetParent || q.body; t && !F.test(t.nodeName) && "static" == A(t).css("position"); )
                        t = t.offsetParent;
                    return t
                })
            }
        },
        A.fn.detach = A.fn.remove,
        ["width", "height"].forEach(function(t) {
            var e = t.replace(/./, function(t) {
                return t[0].toUpperCase()
            });
            A.fn[t] = function(o) {
                var a, r = this[0];
                return o === _ ? i(r) ? r["inner" + e] : n(r) ? r.documentElement["scroll" + e] : (a = this.offset()) && a[t] : this.each(function(e) {
                    r = A(this),
                    r.css(t, m(this, o, e, r[t]()))
                })
            }
        }),
        U.forEach(function(e, i) {
            var n = i % 2;
            A.fn[e] = function() {
                var e, o, a = A.map(arguments, function(i) {
                    return e = t(i),
                    "object" == e || "array" == e || null == i ? i : G.fragment(i)
                }), r = this.length > 1;
                return a.length < 1 ? this : this.each(function(t, e) {
                    o = n ? e : e.parentNode,
                    e = 0 == i ? e.nextSibling : 1 == i ? e.firstChild : 2 == i ? e : null;
                    var s = A.contains(q.documentElement, o);
                    a.forEach(function(t) {
                        if (r)
                            t = t.cloneNode(!0);
                        else if (!o)
                            return A(t).remove();
                        o.insertBefore(t, e),
                        s && b(t, function(t) {
                            null == t.nodeName || "SCRIPT" !== t.nodeName.toUpperCase() || t.type && "text/javascript" !== t.type || t.src || window.eval.call(window, t.innerHTML)
                        })
                    })
                })
            }
            ,
            A.fn[n ? e + "To" : "insert" + (i ? "Before" : "After")] = function(t) {
                return A(t)[e](this),
                this
            }
        }),
        G.Z.prototype = A.fn,
        G.uniq = C,
        G.deserializeValue = y,
        A.zepto = G,
        A
    }();
    return function(t) {
        function e(t) {
            return t._zid || (t._zid = p++)
        }
        function i(t, i, a, r) {
            if (i = n(i),
            i.ns)
                var s = o(i.ns);
            return (v[e(t)] || []).filter(function(t) {
                return !(!t || i.e && t.e != i.e || i.ns && !s.test(t.ns) || a && e(t.fn) !== e(a) || r && t.sel != r)
            })
        }
        function n(t) {
            var e = ("" + t).split(".");
            return {
                e: e[0],
                ns: e.slice(1).sort().join(" ")
            }
        }
        function o(t) {
            return new RegExp("(?:^| )" + t.replace(" ", " .* ?") + "(?: |$)")
        }
        function a(t, e) {
            return t.del && !y && t.e in b || !!e
        }
        function r(t) {
            return _[t] || y && b[t] || t
        }
        function s(i, o, s, c, d, u, p) {
            var f = e(i)
              , g = v[f] || (v[f] = []);
            o.split(/\s/).forEach(function(e) {
                if ("ready" == e)
                    return t(document).ready(s);
                var o = n(e);
                o.fn = s,
                o.sel = d,
                o.e in _ && (s = function(e) {
                    var i = e.relatedTarget;
                    return !i || i !== this && !t.contains(this, i) ? o.fn.apply(this, arguments) : void 0
                }
                ),
                o.del = u;
                var f = u || s;
                o.proxy = function(t) {
                    if (t = l(t),
                    !t.isImmediatePropagationStopped()) {
                        t.data = c;
                        var e = f.apply(i, t._args == h ? [t] : [t].concat(t._args));
                        return e === !1 && (t.preventDefault(),
                        t.stopPropagation()),
                        e
                    }
                }
                ,
                o.i = g.length,
                g.push(o),
                "addEventListener"in i && i.addEventListener(r(o.e), o.proxy, a(o, p))
            })
        }
        function c(t, n, o, s, c) {
            var l = e(t);
            (n || "").split(/\s/).forEach(function(e) {
                i(t, e, o, s).forEach(function(e) {
                    delete v[l][e.i],
                    "removeEventListener"in t && t.removeEventListener(r(e.e), e.proxy, a(e, c))
                })
            })
        }
        function l(e, i) {
            return (i || !e.isDefaultPrevented) && (i || (i = e),
            t.each(k, function(t, n) {
                var o = i[t];
                e[t] = function() {
                    return this[n] = x,
                    o && o.apply(i, arguments)
                }
                ,
                e[n] = A
            }),
            (i.defaultPrevented !== h ? i.defaultPrevented : "returnValue"in i ? i.returnValue === !1 : i.getPreventDefault && i.getPreventDefault()) && (e.isDefaultPrevented = x)),
            e
        }
        function d(t) {
            var e, i = {
                originalEvent: t
            };
            for (e in t)
                T.test(e) || t[e] === h || (i[e] = t[e]);
            return l(i, t)
        }
        function u(t, e) {
            t.os = {},
            t.os.webkit = e.match(/WebKit\/([\d.]+)/) ? !0 : !1,
            t.os.android = e.match(/(Android)\s+([\d.]+)/) || e.match(/Silk-Accelerated/) ? !0 : !1,
            t.os.androidICS = t.os.android && e.match(/(Android)\s4/) ? !0 : !1,
            t.os.ipad = e.match(/(iPad).*OS\s([\d_]+)/) ? !0 : !1,
            t.os.iphone = !t.os.ipad && e.match(/(iPhone\sOS)\s([\d_]+)/) ? !0 : !1,
            t.os.webos = e.match(/(webOS|hpwOS)[\s\/]([\d.]+)/) ? !0 : !1,
            t.os.touchpad = t.os.webos && e.match(/TouchPad/) ? !0 : !1,
            t.os.ios = t.os.ipad || t.os.iphone,
            t.os.ios6 = t.os.ios && e.match(/(OS)\s([6])/) ? !0 : !1,
            t.os.playbook = e.match(/PlayBook/) ? !0 : !1,
            t.os.blackberry = t.os.playbook || e.match(/BlackBerry/) ? !0 : !1,
            t.os.blackberry10 = t.os.blackberry && e.match(/Safari\/536/) ? !0 : !1,
            t.os.chrome = e.match(/Chrome/) ? !0 : !1,
            t.os.opera = e.match(/Opera Mobi/) ? !0 : !1,
            t.os.fennec = e.match(/fennec/i) ? !0 : !1,
            t.os.supportsTouch = window.DocumentTouch && document instanceof window.DocumentTouch || "ontouchstart"in window,
            t.os.desktop = !(t.os.ios || t.os.android || t.os.blackberry || t.os.opera || t.os.fennec || t.os.supportsTouch),
            t.feat = {},
            t.feat.nativeTouchScroll = "undefined" != typeof document.documentElement.getElementsByTagName("head")[0].style["-webkit-overflow-scrolling"] && t.os.ios
        }
        var h, p = 1, f = Array.prototype.slice, g = t.isFunction, m = function(t) {
            return "string" == typeof t
        }, v = {}, w = {}, y = "onfocusin"in window, b = {
            focus: "focusin",
            blur: "focusout"
        }, _ = {
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        };
        w.click = w.mousedown = w.mouseup = w.mousemove = "MouseEvents",
        t.event = {
            add: s,
            remove: c
        },
        t.proxy = function(i, n) {
            var o = 2 in arguments && f.call(arguments, 2);
            if (g(i)) {
                var a = function() {
                    return i.apply(n, o ? o.concat(f.call(arguments)) : arguments)
                };
                return a._zid = e(i),
                a
            }
            if (m(n))
                return o ? (o.unshift(i[n], i),
                t.proxy.apply(null, o)) : t.proxy(i[n], i);
            throw new TypeError("expected function")
        }
        ,
        t.fn.bind = function(t, e, i) {
            return this.on(t, e, i)
        }
        ,
        t.fn.unbind = function(t, e) {
            return this.off(t, e)
        }
        ,
        t.fn.one = function(t, e, i, n) {
            return this.on(t, e, i, n, 1)
        }
        ;
        var x = function() {
            return !0
        }
          , A = function() {
            return !1
        }
          , T = /^([A-Z]|returnValue$|layer[XY]$)/
          , k = {
            preventDefault: "isDefaultPrevented",
            stopImmediatePropagation: "isImmediatePropagationStopped",
            stopPropagation: "isPropagationStopped"
        };
        t.fn.delegate = function(t, e, i) {
            return this.on(e, t, i)
        }
        ,
        t.fn.undelegate = function(t, e, i) {
            return this.off(e, t, i)
        }
        ,
        t.fn.live = function(e, i) {
            return t(document.body).delegate(this.selector, e, i),
            this
        }
        ,
        t.fn.die = function(e, i) {
            return t(document.body).undelegate(this.selector, e, i),
            this
        }
        ,
        t.fn.on = function(e, i, n, o, a) {
            var r, l, u = this;
            return e && !m(e) ? (t.each(e, function(t, e) {
                u.on(t, i, n, e, a)
            }),
            u) : (m(i) || g(o) || o === !1 || (o = n,
            n = i,
            i = h),
            (g(n) || n === !1) && (o = n,
            n = h),
            o === !1 && (o = A),
            u.each(function(u, h) {
                a && (r = function(t) {
                    return c(h, t.type, o),
                    o.apply(this, arguments)
                }
                ),
                i && (l = function(e) {
                    var n, a = t(e.target).closest(i, h).get(0);
                    return a && a !== h ? (n = t.extend(d(e), {
                        currentTarget: a,
                        liveFired: h
                    }),
                    (r || o).apply(a, [n].concat(f.call(arguments, 1)))) : void 0
                }
                ),
                s(h, e, o, n, i, l || r)
            }))
        }
        ,
        t.fn.off = function(e, i, n) {
            var o = this;
            return e && !m(e) ? (t.each(e, function(t, e) {
                o.off(t, i, e)
            }),
            o) : (m(i) || g(n) || n === !1 || (n = i,
            i = h),
            n === !1 && (n = A),
            o.each(function() {
                c(this, e, n, i)
            }))
        }
        ,
        t.fn.trigger = function(e, i) {
            return e = m(e) || t.isPlainObject(e) ? t.Event(e) : l(e),
            e._args = i,
            this.each(function() {
                "dispatchEvent"in this ? this.dispatchEvent(e) : t(this).triggerHandler(e, i)
            })
        }
        ,
        t.fn.triggerHandler = function(e, n) {
            var o, a;
            return this.each(function(r, s) {
                o = d(m(e) ? t.Event(e) : e),
                o._args = n,
                o.target = s,
                t.each(i(s, e.type || e), function(t, e) {
                    return a = e.proxy(o),
                    o.isImmediatePropagationStopped() ? !1 : void 0
                })
            }),
            a
        }
        ,
        "focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(e) {
            t.fn[e] = function(t) {
                return t ? this.bind(e, t) : this.trigger(e)
            }
        }),
        ["focus", "blur"].forEach(function(e) {
            t.fn[e] = function(t) {
                return t ? this.bind(e, t) : this.each(function() {
                    try {
                        this[e]()
                    } catch (t) {}
                }),
                this
            }
        }),
        t.Event = function(t, e) {
            m(t) || (e = t,
            t = e.type);
            var i = document.createEvent(w[t] || "Events")
              , n = !0;
            if (e)
                for (var o in e)
                    "bubbles" == o ? n = !!e[o] : i[o] = e[o];
            return i.initEvent(t, n, !0),
            l(i)
        }
        ,
        t.bind = function(e, i, n) {
            e.__events || (e.__events = {}),
            t.isArray(i) || (i = [i]);
            for (var o = 0; o < i.length; o++)
                e.__events[i[o]] || (e.__events[i[o]] = []),
                e.__events[i[o]].push(n)
        }
        ,
        t.trigger = function(e, i, n) {
            var o = !0;
            if (!e.__events)
                return o;
            t.isArray(i) || (i = [i]),
            t.isArray(n) || (n = []);
            for (var a = 0; a < i.length; a++)
                if (e.__events[i[a]])
                    for (var r = e.__events[i[a]], s = 0; s < r.length; s++)
                        t.isFunction(r[s]) && r[s].apply(e, n) === !1 && (o = !1);
            return o
        }
        ,
        t.unbind = function(e, i, n) {
            if (!e.__events)
                return ret;
            t.isArray(i) || (i = [i]);
            for (var o = 0; o < i.length; o++)
                if (e.__events[i[o]])
                    for (var a = e.__events[i[o]], r = 0; r < a.length; r++)
                        if (n == h && delete a[r],
                        a[r] == n) {
                            a.splice(r, 1);
                            break
                        }
        }
        ,
        t.uuid = function() {
            var t = function() {
                return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
            };
            return t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t()
        }
        ,
        u(t, navigator.userAgent)
    }(t),
    function(t) {
        function e(e, i, n) {
            var o = t.Event(i);
            return t(e).trigger(o, n),
            !o.isDefaultPrevented()
        }
        function i(t, i, n, o) {
            return t.global ? e(i || w, n, o) : void 0
        }
        function n(e) {
            e.global && 0 === t.active++ && i(e, null, "ajaxStart")
        }
        function o(e) {
            e.global && !--t.active && i(e, null, "ajaxStop")
        }
        function a(t, e) {
            var n = e.context;
            return e.beforeSend.call(n, t, e) === !1 || i(e, n, "ajaxBeforeSend", [t, e]) === !1 ? !1 : void i(e, n, "ajaxSend", [t, e])
        }
        function r(t, e, n, o) {
            var a = n.context
              , r = "success";
            n.success.call(a, t, r, e),
            o && o.resolveWith(a, [t, r, e]),
            i(n, a, "ajaxSuccess", [e, n, t]),
            c(r, e, n)
        }
        function s(t, e, n, o, a) {
            var r = o.context;
            o.error.call(r, n, e, t),
            a && a.rejectWith(r, [n, e, t]),
            i(o, r, "ajaxError", [n, o, t || e]),
            c(e, n, o)
        }
        function c(t, e, n) {
            var a = n.context;
            n.complete.call(a, e, t),
            i(n, a, "ajaxComplete", [e, n]),
            o(n)
        }
        function l() {}
        function d(t) {
            return t && (t = t.split(";", 2)[0]),
            t && (t == A ? "html" : t == x ? "json" : b.test(t) ? "script" : _.test(t) && "xml") || "text"
        }
        function u(t, e) {
            return "" == e ? t : (t + "&" + e).replace(/[&?]{1,2}/, "?")
        }
        function h(e) {
            e.processData && e.data && "string" != t.type(e.data) && (e.data = t.param(e.data, e.traditional)),
            !e.data || e.type && "GET" != e.type.toUpperCase() || (e.url = u(e.url, e.data),
            e.data = void 0)
        }
        function p(e, i, n, o) {
            return t.isFunction(i) && (o = n,
            n = i,
            i = void 0),
            t.isFunction(n) || (o = n,
            n = void 0),
            {
                url: e,
                data: i,
                success: n,
                dataType: o
            }
        }
        function f(e, i, n, o) {
            var a, r = t.isArray(i), s = t.isPlainObject(i);
            t.each(i, function(i, c) {
                a = t.type(c),
                o && (i = n ? o : o + "[" + (s || "object" == a || "array" == a ? i : "") + "]"),
                !o && r ? e.add(c.name, c.value) : "array" == a || !n && "object" == a ? f(e, c, n, i) : e.add(i, c)
            })
        }
        var g, m, v = 0, w = window.document, y = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, b = /^(?:text|application)\/javascript/i, _ = /^(?:text|application)\/xml/i, x = "application/json", A = "text/html", T = /^\s*$/;
        t.active = 0,
        t.ajaxJSONP = function(e, i) {
            if (!("type"in e))
                return t.ajax(e);
            var n, o, c = e.jsonpCallback, l = (t.isFunction(c) ? c() : c) || "jsonp" + ++v, d = w.createElement("script"), u = window[l], h = function(e) {
                t(d).triggerHandler("error", e || "abort")
            }, p = {
                abort: h
            };
            return i && i.promise(p),
            t(d).on("load error", function(a, c) {
                clearTimeout(o),
                t(d).off().remove(),
                "error" != a.type && n ? r(n[0], p, e, i) : s(null, c || "error", p, e, i),
                window[l] = u,
                n && t.isFunction(u) && u(n[0]),
                u = n = void 0
            }),
            a(p, e) === !1 ? (h("abort"),
            p) : (window[l] = function() {
                n = arguments
            }
            ,
            d.src = e.url.replace(/\?(.+)=\?/, "?$1=" + l),
            w.head.appendChild(d),
            e.timeout > 0 && (o = setTimeout(function() {
                h("timeout")
            }, e.timeout)),
            p)
        }
        ,
        t.ajaxSettings = {
            type: "GET",
            beforeSend: l,
            success: l,
            error: l,
            complete: l,
            context: null,
            global: !0,
            xhr: function() {
                return new window.XMLHttpRequest
            },
            accepts: {
                script: "text/javascript, application/javascript, application/x-javascript",
                json: x,
                xml: "application/xml, text/xml",
                html: A,
                text: "text/plain"
            },
            crossDomain: !1,
            timeout: 0,
            processData: !0,
            cache: !0
        },
        t.ajax = function(e) {
            var i = t.extend({}, e || {})
              , o = t.Deferred && t.Deferred();
            for (g in t.ajaxSettings)
                void 0 === i[g] && (i[g] = t.ajaxSettings[g]);
            n(i),
            i.crossDomain || (i.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(i.url) && RegExp.$2 != window.location.host),
            i.url || (i.url = window.location.toString()),
            h(i);
            var c = i.dataType
              , p = /\?.+=\?/.test(i.url);
            if (p && (c = "jsonp"),
            i.cache !== !1 && (e && e.cache === !0 || "script" != c && "jsonp" != c) || (i.url = u(i.url, "_=" + Date.now())),
            "jsonp" == c)
                return p || (i.url = u(i.url, i.jsonp ? i.jsonp + "=?" : i.jsonp === !1 ? "" : "callback=?")),
                t.ajaxJSONP(i, o);
            var f, v = i.accepts[c], w = {}, y = function(t, e) {
                w[t.toLowerCase()] = [t, e]
            }, b = /^([\w-]+:)\/\//.test(i.url) ? RegExp.$1 : window.location.protocol, _ = i.xhr(), x = _.setRequestHeader;
            if (o && o.promise(_),
            i.crossDomain || y("X-Requested-With", "XMLHttpRequest"),
            y("Accept", v || "*/*"),
            (v = i.mimeType || v) && (v.indexOf(",") > -1 && (v = v.split(",", 2)[0]),
            _.overrideMimeType && _.overrideMimeType(v)),
            (i.contentType || i.contentType !== !1 && i.data && "GET" != i.type.toUpperCase()) && y("Content-Type", i.contentType || "application/x-www-form-urlencoded"),
            i.headers)
                for (m in i.headers)
                    y(m, i.headers[m]);
            if (_.setRequestHeader = y,
            _.onreadystatechange = function() {
                if (4 == _.readyState) {
                    _.onreadystatechange = l,
                    clearTimeout(f);
                    var e, n = !1;
                    if (_.status >= 200 && _.status < 300 || 304 == _.status || 0 == _.status && "file:" == b) {
                        c = c || d(i.mimeType || _.getResponseHeader("content-type")),
                        e = _.responseText;
                        try {
                            "script" == c ? (1,
                            eval)(e) : "xml" == c ? e = _.responseXML : "json" == c && (e = T.test(e) ? null : t.parseJSON(e))
                        } catch (a) {
                            n = a
                        }
                        n ? s(n, "parsererror", _, i, o) : r(e, _, i, o)
                    } else
                        s(_.statusText || null, _.status ? "error" : "abort", _, i, o)
                }
            }
            ,
            a(_, i) === !1)
                return _.abort(),
                s(null, "abort", _, i, o),
                _;
            var A = "async"in i ? i.async : !0;
            if (_.open(i.type, i.url, A, i.username, i.password),
            i.withCredentials && (_.withCredentials = !0),
            i.xhrFields)
                for (m in i.xhrFields)
                    try {
                        _[m] = i.xhrFields[m]
                    } catch (k) {
                        console.log("after open change xhr:" + k)
                    }
            for (m in w)
                x.apply(_, w[m]);
            return i.timeout > 0 && (f = setTimeout(function() {
                _.onreadystatechange = l,
                _.abort(),
                s(null, "timeout", _, i, o)
            }, i.timeout)),
            _.send(i.data ? i.data : null),
            _
        }
        ,
        t.get = function() {
            return t.ajax(p.apply(null, arguments))
        }
        ,
        t.post = function() {
            var e = p.apply(null, arguments);
            return e.type = "POST",
            t.ajax(e)
        }
        ,
        t.getJSON = function() {
            var e = p.apply(null, arguments);
            return e.dataType = "json",
            t.ajax(e)
        }
        ,
        t.fn.load = function(e, i, n) {
            if (!this.length)
                return this;
            var o, a = this, r = e.split(/\s/), s = p(e, i, n), c = s.success;
            return r.length > 1 && (s.url = r[0],
            o = r[1]),
            s.success = function(e) {
                a.html(o ? t("<div>").html(e.replace(y, "")).find(o) : e),
                c && c.apply(a, arguments)
            }
            ,
            t.ajax(s),
            this
        }
        ;
        var k = encodeURIComponent;
        t.param = function(t, e) {
            var i = [];
            return i.add = function(t, e) {
                this.push(k(t) + "=" + k(e))
            }
            ,
            f(i, t, e),
            i.join("&").replace(/%20/g, "+")
        }
    }(t),
    function(t) {
        t.fn.serializeArray = function() {
            var e, i = [];
            return t([].slice.call(this.get(0).elements)).each(function() {
                e = t(this);
                var n = e.attr("type");
                "fieldset" != this.nodeName.toLowerCase() && !this.disabled && "submit" != n && "reset" != n && "button" != n && ("radio" != n && "checkbox" != n || this.checked) && i.push({
                    name: e.attr("name"),
                    value: e.val()
                })
            }),
            i
        }
        ,
        t.fn.serialize = function() {
            var t = [];
            return this.serializeArray().forEach(function(e) {
                t.push(encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value))
            }),
            t.join("&")
        }
        ,
        t.fn.submit = function(e) {
            if (e)
                this.bind("submit", e);
            else if (this.length) {
                var i = t.Event("submit");
                this.eq(0).trigger(i),
                i.isDefaultPrevented() || this.get(0).submit()
            }
            return this
        }
    }(t),
    function(t) {
        function e(t, e, i, n) {
            return Math.abs(t - e) >= Math.abs(i - n) ? t - e > 0 ? "Left" : "Right" : i - n > 0 ? "Up" : "Down"
        }
        function i() {
            d = null,
            h.last && (h.el && h.el.trigger("longTap"),
            h = {})
        }
        function n() {
            d && clearTimeout(d),
            d = null
        }
        function o() {
            s && clearTimeout(s),
            c && clearTimeout(c),
            l && clearTimeout(l),
            d && clearTimeout(d),
            s = c = l = d = null,
            h = {}
        }
        function a(t) {
            return ("touch" == t.pointerType || t.pointerType == t.MSPOINTER_TYPE_TOUCH) && t.isPrimary
        }
        function r(t, e) {
            return t.type == "pointer" + e || t.type.toLowerCase() == "mspointer" + e
        }
        var s, c, l, d, u, h = {}, p = 750;
        t(document).ready(function() {
            var f, g, m, v, w = 0, y = 0;
            "MSGesture"in window && (u = new MSGesture,
            u.target = document.body),
            t(document).bind("MSGestureEnd", function(t) {
                var e = t.velocityX > 1 ? "Right" : t.velocityX < -1 ? "Left" : t.velocityY > 1 ? "Down" : t.velocityY < -1 ? "Up" : null;
                e && (h.el && h.el.trigger("swipe"),
                h.el && h.el.trigger("swipe" + e))
            }).on("touchstart MSPointerDown pointerdown", function(e) {
                (!(v = r(e, "down")) || a(e)) && (m = v ? e : e.touches[0],
                e.touches && 1 === e.touches.length && h.x2 && (h.x2 = void 0,
                h.y2 = void 0),
                f = Date.now(),
                g = f - (h.last || f),
                h.el = t("tagName"in m.target ? m.target : m.target.parentNode),
                s && clearTimeout(s),
                h.x1 = m.pageX,
                h.y1 = m.pageY,
                g > 0 && 250 >= g && (h.isDoubleTap = !0),
                h.last = f,
                d = setTimeout(i, p),
                u && v && u.addPointer(e.pointerId))
            }).on("touchmove MSPointerMove pointermove", function(t) {
                (!(v = r(t, "move")) || a(t)) && (m = v ? t : t.touches[0],
                n(),
                h.x2 = m.pageX,
                h.y2 = m.pageY,
                w += Math.abs(h.x1 - h.x2),
                y += Math.abs(h.y1 - h.y2))
            }).on("touchend MSPointerUp pointerup", function(i) {
                (!(v = r(i, "up")) || a(i)) && (n(),
                h.x2 && Math.abs(h.x1 - h.x2) > 30 || h.y2 && Math.abs(h.y1 - h.y2) > 30 ? l = setTimeout(function() {
                    h.el && h.el.trigger("swipe"),
                    h.el && h.el.trigger("swipe" + e(h.x1, h.x2, h.y1, h.y2)),
                    h = {}
                }, 0) : "last"in h && (30 > w && 30 > y ? c = setTimeout(function() {
                    var e = t.Event("tap");
                    e.cancelTouch = o,
                    h.el && h.el.trigger(e),
                    h.isDoubleTap ? (h.el && h.el.trigger("doubleTap"),
                    h = {}) : s = setTimeout(function() {
                        s = null,
                        h.el && h.el.trigger("singleTap"),
                        h = {}
                    }, 250)
                }, 0) : h = {}),
                w = y = 0)
            }).on("touchcancel MSPointerCancel pointercancel", o),
            t(window).on("scroll", o)
        }),
        ["swipe", "swipeLeft", "swipeRight", "swipeUp", "swipeDown", "doubleTap", "tap", "singleTap", "longTap"].forEach(function(e) {
            t.fn[e] = function(t) {
                return this.on(e, t)
            }
        })
    }(t),
    t
}),
define("m_util", ["m_zepto"], function(t) {
    var e = {};
    return e.url = function() {
        var t = function(t) {
            for (var e, i, n, o = [], a = {}, r = decodeURIComponent, o = t.split("&"), e = o.length; e--; )
                i = o[e],
                n = i.split("="),
                a[r(n[0])] = r(n[1]);
            return a
        }
          , e = function() {
            return t(location.search.slice(1))
        }
          , i = function(e) {
            var i = e ? e : decodeURIComponent(location.hash)
              , n = []
              , o = {};
            return i.replace(/[\.\?\/'"><:;,\[\]\{\}]/gi, ""),
            n = i.split("/"),
            n.length > 0 && (o.__vpageid = n[0].substring(1),
            o.urlParams = n.length > 1 ? t(n[1], !0) : {}),
            o
        }
          , n = function(t, e, i) {
            var n = [e, i].join("=")
              , o = /(\?|\#)/
              , a = {
                "?": "?" + n + "&",
                "#": "?" + n + "#",
                "default": "?" + n
            };
            return o.test(t) ? t.replace(o, function(t, e) {
                return a[e]
            }) : t + a["default"]
        };
        return {
            obj2Str: function(t, e) {
                var i, n, o = "";
                for (i in t)
                    "undefined" != typeof t[i] && (n = e ? encodeURIComponent(t[i]) : t[i],
                    o += i + "=" + n + "&");
                return o.slice(0, o.length - 1)
            },
            url2obj: t,
            getUrlParam: e,
            getHashParams: i,
            getHash: function() {
                var t = location.hash || "#";
                return t
            },
            addUrlParam: n
        }
    }(),
    e.load = function() {
        return {
            loadScript: function(e, i) {
                try {
                    e = e instanceof Array ? e : [e],
                    i = i instanceof Array ? i : [i];
                    var n = document.getElementsByTagName("head")[0]
                      , o = document.createDocumentFragment()
                      , a = []
                      , r = function(t, e) {
                        a[t] = document.createElement("script"),
                        a[t].src = e,
                        a[t].type = "text/javascript",
                        o.appendChild(a[t])
                    };
                    t.each(e, r),
                    n.appendChild(o);
                    var s = function(t, e) {
                        "function" == typeof e && (a[t].onreadystatechange = function() {
                            ("complete" == a[t].readyState || "loaded" == a[t].readyState) && e()
                        }
                        ,
                        a[t].onload = function() {
                            e()
                        }
                        ,
                        a[t].onerror = function() {
                            this.onload = this.onerror = null,
                            this.parentNode.removeChild(this)
                        }
                        )
                    };
                    t.each(i, s)
                } catch (c) {
                    console.error("Warning:There is error on load javascript file!")
                }
            },
            loadCss: function(t) {
                if (t) {
                    var e = document.createDocumentFragment()
                      , i = document.createElement("link");
                    i.async = !0,
                    i.rel = "stylesheet",
                    i.href = t,
                    i.type = "text/css",
                    e.appendChild(i),
                    document.getElementsByTagName("head")[0].appendChild(e)
                }
            },
            loadStaticStyle: function(t) {
                var e = document.createElement("style");
                e.innerHTML = t,
                document.getElementsByTagName("head")[0].appendChild(e)
            },
            loadImg: function(e) {
                t.each(e, function(t, e) {
                    var i = e.getAttribute("orgsrc");
                    i && nextFrame(function() {
                        e.src = i,
                        e.removeAttribute("orgsrc")
                    })
                })
            }
        }
    }(),
    e.cookie = function() {
        return {
            getCookie: function(t) {
                for (var e = t + "=", i = document.cookie.split(" "), n = 0; n < i.length; n++) {
                    var o = i[n].split(";")[0];
                    if (0 == o.indexOf(e)) {
                        var a = e.length
                          , r = o.length;
                        return decodeURIComponent(o.substring(a, r))
                    }
                }
                return ""
            },
            setCookie: function(t, e, i, n, o) {
                var a = new Date;
                null != i && a.setTime(a.getTime() + 24 * i * 60 * 60 * 1e3),
                document.cookie = t + "=" + escape(e) + (null == i ? "" : "; expires=" + a.toGMTString()) + (null == n ? "" : "; domain=" + n) + (null == o ? ";path=/" : "; path=" + o)
            },
            delCookie: function(t, e, i) {
                ("undefined" == typeof e || null == e) && (e = "qq.com");
                var n = new Date;
                n.setTime(n.getTime() - 1);
                var o = this.getCookie(t);
                "" != o && (document.cookie = t + "=" + o + (null != i ? ";path=" + i : "/") + (e ? ";domain=" + e : "") + ";expires=" + n.toGMTString())
            }
        }
    }(),
    e.tpl = function i(t, e) {
        var n = i._cache || (i._cache = {})
          , o = n[t];
        if (o)
            return o(e || {});
        var a = i._regarg || (i.regarg = /\$([A-z_][^$]*\b)/g)
          , r = i._cachereg || (i._cachereg = /<%=(.*?)%>|(<%)|(%>)/g)
          , s = i._cachefn || (i._cachefn = function(t, e, i, n) {
            return (e ? "'+(" + e + ")+'" : "") + (i ? "';" : "") + (n ? "p+='" : "")
        }
        );
        return o = n[t] = new Function("a$","var p=''; p+='" + t.replace(r, s).replace(a, "a$.$1") + "'; return p;"),
        console.log(o),
        o(e || {})
    }
    ,
    e.array = function() {
        return {
            shuffle: function(t) {
                var e, i, n = t.slice(0), o = n.length - 1;
                for (o; o >= 0; o--)
                    e = Math.floor(Math.random() * o),
                    i = n[e],
                    n[e] = n[o],
                    n[o] = i;
                return n
            }
        }
    }(),
    e.string = function() {
        return {
            trim: function(t) {
                var e = t.replace(/(^\s*)|(\s*$)/g, "");
                return e.replace(/(^　*)|(　*$)/g, "")
            }
        }
    }(),
    e.img = function() {
        return {
            resizeImage: function(t, e, i) {
                var n = new Image;
                n.src = t.attr("src");
                var o = ""
                  , a = "";
                n.onload = function() {
                    n.width > 0 && n.height > 0 && (e / n.width >= i / n.height ? i / n.height < 1 || e / n.width > 1 ? (t.attr("width", e),
                    o = parseInt(n.height * e / n.width),
                    t.attr("height", o)) : (t.attr("height", i),
                    a = parseInt(n.width * i / n.height),
                    t.attr("width", a)) : e / n.width < 1 || i / n.height > 1 ? (t.attr("height", i),
                    a = parseInt(n.width * i / n.height),
                    t.attr("width", a)) : (t.attr("width", e),
                    o = parseInt(n.height * e / n.width),
                    t.attr("height", o)))
                }
            }
        }
    }(),
    e.storage = function() {
        return {
            isSupportLocalStorage: function() {
                try {
                    var t = "localStorage"in window && window.localStorage;
                    return t && (localStorage.setItem("storage", ""),
                    localStorage.removeItem("storage")),
                    t
                } catch (e) {
                    return !1
                }
            }
        }
    }(),
    e.encrypt = function() {
        var t = e.cookie.getCookie("skey") || ""
          , i = e.cookie.getCookie("p_skey") || ""
          , n = e.cookie.getCookie("p_lskey") || ""
          , o = t || i || n
          , a = 70215614;
        if (o) {
            for (var r = 0, s = o.length; s > r; r++)
                a += (a << 5) + o.charAt(r).charCodeAt();
            return 2147483647 & a
        }
        return ""
    }
    ,
    e.throttle = function(t, e) {
        function i() {
            o && clearTimeout(o),
            o = null
        }
        function n() {
            var n = this
              , a = arguments;
            i(),
            o = setTimeout(function() {
                t.apply(n, a)
            }, e)
        }
        var o = null;
        return n.cancel = i,
        n
    }
    ,
    e
}),
define("m_msg", ["m_zepto"], function(t) {
    var e = {
        _events: {},
        notify: function(e, i, n) {
            var o, a, r = this._events;
            if (1 == arguments.length && (i = e,
            e = null),
            2 == arguments.length && (n = i,
            i = e,
            e = null),
            e)
                a = r[e],
                a && t.trigger(a, i, n);
            else
                for (o in r)
                    r.hasOwnProperty(o) && t.trigger(r[o], i, n)
        },
        listen: function(e, i, n) {
            var o, a = this._events;
            if (2 == arguments.length && (n = i,
            i = e,
            e = "__global__"),
            o = a[e] = a[e] || {},
            "function" != typeof n)
                throw "VANGOGH.msg.listen : cb is not a function!";
            t.bind(o, i, n)
        }
    };
    return e
}),
define("m_login", ["m_zepto", "m_msg", "m_util"], function(t, e, i) {
    document.domain = "qq.com";
    var n = "00"
      , o = {}
      , a = !1
      , r = ""
      , s = ""
      , c = ""
      , l = function() {
        var n, o = "", a = null, r = null, s = {
            login: {
                arrKeys: [],
                queue: {}
            },
            logout: {
                arrKeys: [],
                queue: {}
            }
        }, c = !1, d = {
            login: {},
            logout: -1
        }, u = !1, h = {
            getTopHeight: function() {
                return document.body.scrollTop + (window.innerHeight > 270 ? (window.innerHeight - 270) / 2 : 0)
            },
            showLoginBox: function() {
                var e = t("html").height() || window.innerHeight || document.documentElement.clientHeight
                  , i = t(window).width();
                r.style.cssText += "display:block;width:" + i + "px;height:" + e + "px;",
                a.style.cssText += "transition: 0;",
                a.style.cssText += "top:" + h.getTopHeight() + "px;",
                a.style.cssText += "display:block; visibility:hidden;opacity: 0;transition: opacity 200ms;",
                setTimeout(function() {
                    a.style.cssText += "opacity:1;visibility:visible;"
                }, 200)
            },
            closeLoginBox: function() {
                r.style.display = "none",
                a.style.display = "none"
            },
            addQueueFunc: function(t, e) {
                var i, n, o = e.toString();
                ("login" == t || "logout" == t) && (i = s[t].queue,
                n = s[t].arrKeys,
                i[o] && -1 != this.getIndexInArray(o, n) || (n.push(o),
                i[o] = e))
            },
            removeQueueFunc: function(t, e) {
                var i, n, o = e.toString();
                ("login" == t || "logout" == t) && (i = s[t].queue,
                n = s[t].arrKeys,
                n.splice(this.getIndexInArray(o, n), 1),
                delete i[o])
            },
            doQueueFunc: function(t, e) {
                var i, n;
                if ("login" == t || "logout" == t) {
                    u = "login" == t ? !0 : !1,
                    d[t] = e,
                    i = s[t].queue,
                    n = s[t].arrKeys;
                    for (var o = 0, a = n.length; a > o; o++)
                        i[n[o]](e)
                }
            },
            getAjaxData: function(t) {
                return "login" != t && "logout" != t ? "" : d[t]
            },
            getIndexInArray: function(t, e) {
                if (e.indexOf)
                    return e.indexOf(t);
                for (var i = 0, n = e.length; n > i; i++)
                    if (e[i] === t)
                        return i;
                return -1
            },
            objToStr: function(t, e) {
                var i, n, o = "";
                for (i in t)
                    "undefined" != typeof t[i] && (n = e ? encodeURIComponent(t[i]) : t[i],
                    o += i + "=" + n + "&");
                return o.slice(0, o.length - 1)
            },
            getScript: function(t, e, i) {
                var n = document.createElement("script");
                n.language = "javascript",
                n.type = "text/javascript",
                i && (n.charset = i),
                n.onload = n.onreadystatechange = function() {
                    this.readyState && "loaded" != this.readyState && "complete" != this.readyState || (e && e(),
                    n.onload = n.onreadystatechange = null,
                    n.parentNode.removeChild(n))
                }
                ,
                n.src = t,
                document.getElementsByTagName("head")[0].appendChild(n)
            },
            randomString: function(t) {
                var e = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split("");
                t || (t = Math.floor(Math.random() * e.length));
                for (var i = "", n = 0; t > n; n++)
                    i += e[Math.floor(Math.random() * e.length)];
                return i
            },
            set_iframe_src: function(t) {
                var e = navigator.userAgent || ""
                  , i = "";
                -1 != e.indexOf("MQQBrowserLightApp") && (i = "&pt_no_onekey=1");
                var n = encodeURIComponent(t)
                  , r = "//ui.ptlogin2.qq.com"
                  , s = r + "/cgi-bin/login?style=38&appid=728041403&s_url=" + n + "&target=self&low_login=1&low_login_hour=4321&daid=" + (location.host.indexOf("3g.qq.com") > -1 ? 261 : 287) + o + i;
                a.setAttribute("src", s)
            }
        };
        return document.body.appendChild(function() {
            var i = document.createDocumentFragment()
              , o = document.createElement("iframe");
            o.id = "ptlogin_iframe",
            o.setAttribute("frameborder", "0"),
            o.setAttribute("scrolling", "no"),
            o.style.cssText = "display:none;z-index:9999;position:absolute;left:50%;top:50%;margin:0px 0 0 -140px;height:270px;width:280px;background:transparent;";
            var s = document.createElement("div");
            return s.id = "ptlogin_shadow",
            s.style.cssText += "display:none;z-index:9998;position:absolute;top:0;left:0;width:100%;height:100%;background:#000;opacity:0.7;",
            i.appendChild(o),
            i.appendChild(s),
            a = o,
            r = s,
            window.addEventListener("message", function(t) {
                if (t && "jqm-asap" != t.data) {
                    if (/3g\.qq\.com$/.test(t.origin))
                        try {
                            {
                                var i = JSON.parse(t.data)
                                  , o = i.JSP || {};
                                i.callback || ""
                            }
                            "login" == i.action && (h.closeLoginBox(),
                            n && n(o),
                            l.doQueueFunc("login", o))
                        } catch (a) {}
                    if (/ui\.ptlogin2\.qq\.com$/.test(t.origin))
                        try {
                            var i = JSON.parse(t.data);
                            "close" == i.action ? (h.closeLoginBox(),
                            e && e.notify("logincacel", [])) : "resize" == i.action
                        } catch (a) {}
                }
            }, !0),
            window.addEventListener("orientationchange", function() {
                "none" != a.style.display && (a.style.cssText += "top:" + h.getTopHeight() + "px;",
                setTimeout(function() {
                    a.style.cssText += "top:" + h.getTopHeight() + "px;"
                }, 500))
            }, !1),
            function() {
                var i = function() {
                    h.closeLoginBox(),
                    e && (e.notify("logincacel", []),
                    e.notify("initLoginCancel", []))
                };
                t.bind(window, "vpageEnter", i),
                t.bind(window, "vpageBack", i)
            }(),
            i
        }()),
        {
            init: function(t) {
                var e = h.objToStr(t);
                o = e ? "&" + e : "",
                t && t.isLogin && (u = !0)
            },
            doQueueFunc: function(t, e, i) {
                h.doQueueFunc(t, e, i)
            },
            getData: function(t) {
                return h.getAjaxData(t)
            },
            isLogin: function() {
                return u
            },
            bind: function(t, e) {
                h.addQueueFunc(t, e)
            },
            login: function(t) {
                e && e.notify("beforelogin", []);
                var t = "function" == typeof t ? t : function() {}
                ;
                n = t;
                var o = i.url.addUrlParam(location.href, "_r", Math.random());
                h.set_iframe_src(location.protocol + "//infoapp.3g.qq.com/g/login/proxy.jsp?sourceUrl=" + encodeURIComponent(encodeURIComponent(o))),
                h.showLoginBox()
            },
            logout: function(t) {
                var e = function() {
                    var e = pt_logout.getCookie("pt4_token")
                      , i = pt_logout.getCookie("skey")
                      , n = pt_logout.getCookie("ptcz");
                    e || i || n || pt_logout.set_ret(2, "3g.qq.com"),
                    pt_logout.logout(function(e) {
                        h.doQueueFunc("logout", e),
                        t && t(e)
                    })
                };
                c ? e() : h.getScript("//imgcache.qq.com/ptlogin/ac/v9/js/ptloginout.js", function() {
                    c = !0,
                    e()
                }, "utf-8")
            }
        }
    }();
    return t.extend(o, {
        init: function(t) {
            n = t.sid,
            a = t.islogin,
            r = t.uid || "",
            s = t.nickname || "",
            l.init(t)
        },
        getSid: function() {
            return n
        },
        getUid: function() {
            return r
        },
        getNickName: function() {
            return s
        },
        loginOut: function(i) {
            l.logout(function(o) {
                if (2 == o)
                    if (e && e.notify("loginout", []),
                    n = "",
                    a = !1,
                    r = "",
                    s = "",
                    t.isFunction(i) && i(),
                    t.isFunction(history.replaceState)) {
                        var c = location.protocol + "//" + location.host + location.pathname
                          , l = ""
                          , d = location.search
                          , u = /[?&]sid=[^&#]*/g;
                        l = u.test(d) ? d.replace(/([?&])sid=[^&#]*/g, "$1sid=") : d,
                        l = c + l + location.hash,
                        window.history.replaceState(null, document.title, l),
                        location.reload()
                    } else {
                        var h = window.location.href.replace(/([&\?])sid=[^&#]*/g, "$1sid=");
                        location.href = h
                    }
                else
                    console.log("status=" + o)
            })
        },
        isLogin: function() {
            return a
        },
        getHead: function() {
            return c
        },
        login: function(t, i) {
            return a && !i ? void (t && t()) : void l.login(function(i) {
                r = i.uin,
                s = i.nick,
                a = i.isLogin,
                c = i.head,
                e && e.notify("loginok", [{
                    uin: r,
                    nick: s,
                    sid: n,
                    avatar: c
                }]),
                t && t(i)
            })
        },
        reLogin: function(t) {
            this.login(t, !0)
        }
    }),
    o
}),
define("m_loader", [], function() {
    var t = {}
      , e = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
    return t.load = function() {
        return {
            loadScript: function(t, i) {
                if (t) {
                    t = Array.isArray(t) ? t : [t],
                    i = Array.isArray(i) ? i : [i];
                    var n = document.createDocumentFragment()
                      , o = []
                      , a = function(t, e) {
                        o[e] = document.createElement("script"),
                        o[e].src = t,
                        o[e].async = !0,
                        n.appendChild(o[e])
                    };
                    t.forEach(a),
                    e.appendChild(n);
                    var r = function(t, e) {
                        "function" == typeof t && (o[e].onload = function() {
                            t(!0)
                        }
                        ,
                        o[e].onerror = function() {
                            this.onload = this.onerror = null,
                            t(!1),
                            this.parentNode.removeChild(this)
                        }
                        )
                    };
                    i.forEach(r)
                }
            },
            loadCss: function(t) {
                if (t) {
                    var i = document.createElement("link");
                    i.rel = "stylesheet",
                    i.href = t,
                    e.appendChild(i)
                }
            }
        }
    }(),
    t
}),
(window.jQuery || window.Zepto) && !function(t) {
    t.fn.Swipe = function(e) {
        return this.each(function() {
            t(this).data("Swipe", new Swipe(t(this)[0],e))
        })
    }
}(window.jQuery || window.Zepto),
window.define && window.define("m_swipe", [], function() {
    return Swipe
}),
define("m_storage", [], function() {
    var t = function() {
        try {
            var t = "localStorage"in window;
            return t && (localStorage.setItem("storage", ""),
            localStorage.removeItem("storage")),
            t
        } catch (e) {
            return !1
        }
    }();
    return {
        setItem: function(e) {
            if (t) {
                var i = {
                    value: e.value
                };
                e.ttl && (i.expire = +new Date + 1e3 * e.ttl),
                localStorage.setItem(e.key, JSON.stringify(i))
            }
        },
        getItem: function(e) {
            var i = null;
            if (t) {
                var n = JSON.parse(localStorage.getItem(e));
                null === n ? i = null : n.expire && n.expire < +new Date ? (this.removeItem(e),
                i = null) : i = n.value
            }
            return i
        },
        removeItem: function(e) {
            t && localStorage.removeItem(e)
        },
        isSupportLs: t
    }
}),
define("m_webp", ["m_storage"], function(t) {
    var e = "data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAsAAAABBxAREYiI/gcAAABWUDggGAAAADABAJ0BKgEAAQABABwlpAADcAD+/gbQAA=="
      , i = "WEBP_SUPPORT"
      , n = 2592e3
      , o = "support"
      , a = "not-support";
    return function() {
        if (t.isSupportLs && !t.getItem(i)) {
            var r = new Image;
            r.onload = function() {
                t.setItem({
                    key: i,
                    value: o,
                    ttl: n
                })
            }
            ,
            r.onerror = function() {
                t.setItem({
                    key: i,
                    value: a,
                    ttl: n
                })
            }
            ,
            r.src = e
        }
    }(),
    {
        getWebpSrc: function(e, n) {
            var a = e
              , r = 32;
            return n && (r = 34),
            t.getItem(i) === o && /cdn\.read\.html5\.qq\.com/gi.test(e) && (a = e.replace(/([?&]imgflag)=[^&#]*/g, "$1=" + r),
            a += encodeURIComponent("?webp=1")),
            a
        }
    }
}),
define("m_lazyLoad", ["m_zepto", "m_webp"], function(t, e) {
    var i = function(e) {
        this.defaultConfig = {
            lazyLoadAttr: "data-src",
            preloadHeight: 200,
            loadedCallback: null,
            lazyLoadBg: !0,
            lazyLoadBgClass: "lazybg",
            useWebp: !1,
            isNeedGif: !0
        },
        this.config = t.extend({}, this.defaultConfig, e || {}),
        this.init.call(this)
    };
    t.extend(i.prototype, {
        init: function() {
            this._cache(),
            this.setLazyImgs(),
            this._initEvent(),
            this.actionLazy()
        },
        _initEvent: function() {
            {
                var e = this;
                this.config
            }
            this.actionLazy = t.proxy(e._lazy, e),
            t(window).on("scroll", e.actionLazy),
            t(window).on("resize", e.actionLazy),
            t(window).on("orientationchange", e.actionLazy),
            t.bind(e, "afterLoaded", function(t) {
                e._afterLoaded(t.img, t.loadType)
            })
        },
        _cache: function() {
            this.scrollTimer = null
        },
        _getLazyImgs: function() {
            var e = this.config
              , i = []
              , n = null;
            return t("img").each(function() {
                n = t(this),
                n.attr(e.lazyLoadAttr) && i.push(n)
            }),
            e.lazyLoadBg && t("." + e.lazyLoadBgClass).each(function() {
                n = t(this),
                n.attr(e.lazyLoadAttr) && i.push(n)
            }),
            i
        },
        setLazyImgs: function() {
            this.lazyImgs = this._getLazyImgs(),
            this.lazyImgsLen = this.lazyImgs.length
        },
        _lazy: function() {
            var e = this
              , i = this.config
              , n = i.lazyLoadAttr
              , o = i.preloadHeight
              , a = t(window);
            this.scrollTimer && (clearTimeout(this.scrollTimer),
            this.scrollTimer = null),
            this.scrollTimer = setTimeout(function() {
                var r = document.body.scrollTop
                  , s = a.height()
                  , c = r + s + o;
                t.each(e.lazyImgs, function(o, a) {
                    var s = a.offset().top
                      , l = s + a.height()
                      , d = a.attr(n);
                    c > s && l > r && d && (a.hasClass(i.lazyLoadBgClass) ? e._loadImg(a, function(e) {
                        t(this).css("background-image", "url( " + e + " )")
                    }, "bg") : e._loadImg(a, function(e) {
                        t(this).attr("src", e)
                    }, "img"))
                })
            }, 50)
        },
        _dispose: function() {
            t(window).off("scroll", this.actionLazy),
            t(window).off("resize", this.actionLazy),
            t(window).off("orientationchange", this.actionLazy)
        },
        _afterLoaded: function(e, i) {
            var n = this.config;
            t.isFunction(n.loadedCallback) && n.loadedCallback(e, i)
        },
        _loadImg: function(i, n, o) {
            var a = new Image
              , r = this
              , s = this.config
              , c = i.attr(s.lazyLoadAttr);
            a.src = c,
            s.useWebp && (a.src = e.getWebpSrc(c, s.isNeedGif)),
            a.onload = function(e) {
                return function() {
                    n && n.call(e, t(this).attr("src")),
                    e.removeAttr(s.lazyLoadAttr),
                    r.lazyImgsLen--,
                    t.trigger(r, "afterLoaded", [{
                        img: e,
                        loadType: o
                    }])
                }
            }(i)
        }
    });
    var n = null;
    return i.getInstance = function(t) {
        return n ? n : n = new i(t)
    }
    ,
    i
}),
define("m_cookie", [], function() {
    var t = {
        set: function(t, e, i, n, o) {
            var a = new Date;
            null != i && a.setTime(a.getTime() + 24 * i * 60 * 60 * 1e3),
            document.cookie = t + "=" + encodeURIComponent(e) + (null == i ? "" : "; expires=" + a.toGMTString()) + (null == n ? "" : "; domain=" + n) + (null == o ? ";path=/" : "; path=" + o)
        },
        get: function(t) {
            for (var e = t + "=", i = document.cookie.split(" "), n = 0; n < i.length; n++) {
                var o = i[n].split(";")[0];
                if (0 == o.indexOf(e)) {
                    var a = e.length
                      , r = o.length;
                    return decodeURIComponent(o.substring(a, r))
                }
            }
            return ""
        },
        del: function(t, e, i) {
            ("undefined" == typeof e || null == e) && (e = "qq.com");
            var n = new Date;
            n.setTime(n.getTime() - 1);
            var o = this.get(t);
            "" != o && (document.cookie = t + "=" + o + (null != i ? ";path=" + i : "/") + (e ? ";domain=" + e : "") + ";expires=" + n.toGMTString())
        }
    };
    return t
}),
define("m_log", ["m_zepto", "m_cookie"], function(t, e) {
    function i(t, e, i, n) {
        var o = "logType=" + e;
        i && (o += "&params=" + i),
        "post" == n ? r(t, e, i) : a(t + "?" + o)
    }
    function n(e) {
        t(document.body).delegate("." + e, "click", function() {
            var i = t(this).data("send").split("|")
              , n = b;
            "log-user-send" == e && (n = _),
            n(i[0], i[1])
        })
    }
    function o(t) {
        var e = location.href
          , i = e.split("?")[1]
          , n = /#.*?\//gi;
        if (i && (i = n.test(i) ? i.replace(n, "&") : i.replace(/#.*/gi, "")),
        i)
            for (var o = i.split("&"), a = 0, r = o.length; r > a; a++) {
                var s = o[a].split("=");
                if (s[0] == t)
                    return decodeURIComponent(s[1])
            }
    }
    function a(t) {
        var e = new Image
          , i = "log" + Math.floor(2147483648 * Math.random()).toString(36);
        window[i] = e,
        e.onload = e.onerror = e.onabort = function() {
            e.onload = e.onerror = e.onabort = null,
            window[i] = null,
            e = null
        }
        ,
        e.src = t
    }
    function r(e, i, n) {
        t.ajax({
            url: e,
            type: "POST",
            data: {
                logType: i,
                params: n
            },
            xhrFields: {
                withCredentials: !0
            },
            success: function() {}
        })
    }
    function s(t) {
        f = t
    }
    function c(t, e) {
        g = t,
        f = e
    }
    var l = !1
      , d = "//statistic.3g.qq.com/comlog/statisticlog"
      , u = "//statistic.3g.qq.com/comlog/pvlog"
      , h = "//statistic.3g.qq.com/comlog/templog"
      , p = "//statistic.3g.qq.com/comlog/comtemplog"
      , f = ""
      , g = "";
    /kf0309/gi.test(location.host) && (d = "//statistic.kf0309.3g.qq.com/comlog/statisticlog",
    u = "//statistic.kf0309.3g.qq.com/comlog/pvlog",
    h = "//statistic.kf0309.3g.qq.com/comlog/templog",
    p = "//statistic.kf0309.3g.qq.com/comlog/comtemplog");
    var m = function() {
        var t = e.get("ad_pqq") || ""
          , i = e.get("3g_guest_id") || ""
          , n = t || i
          , o = 70215614;
        if (n) {
            for (var a = 0, r = n.length; r > a; a++)
                o += (o << 5) + n.charAt(a).charCodeAt();
            return 2147483647 & o
        }
        return ""
    }
      , v = function() {
        function e(e, i) {
            var n = e.split("&")
              , o = !1
              , a = {}
              , r = {}
              , s = null;
            return t.each(n, function(t, e) {
                s = e.split("="),
                a[s[0]] = decodeURIComponent(s[1])
            }),
            t.each(i, function(t, e) {
                a[e] && (r[e] = a[e],
                o = !0)
            }),
            o ? r : null
        }
        function i(t) {
            var e = null;
            return (t.hasOwnProperty("f_pid") || t.hasOwnProperty("f_aid") || t.hasOwnProperty("f_aid_ext")) && (e = {},
            e.f_pid = t.f_pid,
            e.f_aid = t.f_aid,
            t.hasOwnProperty("f_aid_ext") && (e.f_aid_ext = t.f_aid_ext,
            delete t.f_aid_ext)),
            e
        }
        function n() {
            if (l)
                return null;
            l = !0;
            var t = window.location.search || "";
            return t = t.slice(1),
            e(t, ["f_pid", "f_aid", "f_aid_ext"])
        }
        function r() {
            var t = window.location.hash || "";
            return t = t.replace(/#[^\/]+\//, ""),
            e(t, ["f_pid", "f_aid", "f_aid_ext"])
        }
        function s(e) {
            var s = {}
              , l = []
              , u = o("i_f")
              , h = o("g_f")
              , p = o("iarea")
              , g = o("icfa");
            if (e.hasOwnProperty("aid_ext")) {
                var v = e.aid_ext;
                t.isArray(v) || (v = v.split(",")),
                t.each(v.slice(0, 3), function(t, i) {
                    e["f" + (36 + t)] = i
                }),
                delete e.aid_ext
            }
            var w = i(e) || n() || r();
            if (w && (e.f_pid = w.f_pid,
            e.f_aid = w.f_aid,
            w.f_aid_ext)) {
                var y = w.f_aid_ext;
                t.isArray(y) || (y = y.split(",")),
                t.each(y.slice(0, 3), function(t, i) {
                    e["f" + (39 + t)] = i
                })
            }
            e.channel = e.channel || f,
            t.extend(s, e),
            c ? (s.i_f && delete s.i_f,
            s.g_f && delete s.g_f,
            s.iarea && delete s.iarea,
            s.icfa && delete s.icfa) : (u && (s.i_f = u),
            h && (s.g_f = h),
            p && (s.iarea = p),
            g && (s.icfa = g),
            c = !0),
            s.t = +new Date,
            s.referer = encodeURIComponent(document.referrer) || "",
            s.token = m() || "";
            for (var b in s)
                s.hasOwnProperty(b) && l.push(b + "=" + s[b]);
            a(d + "?" + l.join("&"))
        }
        var c = !1
          , l = !1;
        return s
    }()
      , w = function(t) {
        var e = t || {}
          , i = []
          , n = o("i_f")
          , r = o("g_f")
          , s = o("iarea")
          , c = o("icfa");
        t.channel = t.channel || f,
        t.pid = t.pid || g,
        l ? (e.i_f && delete e.i_f,
        e.g_f && delete e.g_f,
        e.iarea && delete e.iarea,
        e.icfa && delete e.icfa) : (n && (e.i_f = n),
        r && (e.g_f = r),
        s && (e.iarea = s),
        c && (e.icfa = c),
        l = !0),
        e.t = +new Date,
        e.referer = encodeURIComponent(document.referrer) || "",
        e.token = m() || "";
        for (var d in e)
            e.hasOwnProperty(d) && i.push(d + "=" + e[d]);
        a(u + "?" + i.join("&"))
    }
      , y = function(e, i) {
        i = t.extend({
            st: 1
        }, i),
        e = t.extend({}, e),
        w(i),
        v(e)
    }
      , b = function(t, e, n) {
        i(h, t, e, n)
    }
      , _ = function(t, e, n) {
        i(p, t, e, n)
    };
    return n("log-send"),
    n("log-user-send"),
    {
        send: a,
        pvSend_2016: v,
        pvSend: w,
        ckSend: b,
        pvSendAll: y,
        ckUserSend: _,
        setChannel: s,
        setPvPara: c
    }
}),
define("m_showLog", ["m_zepto", "m_log"], function(t, e) {
    function i(e) {
        this.defaultConfig = {
            showLogAttr: "data-showlog",
            isGetParams: !1,
            task: []
        },
        this.config = t.extend(this.defaultConfig, e),
        this.init()
    }
    var n = function(t, e) {
        var i = null;
        return function() {
            var n = this
              , o = arguments;
            clearTimeout(i),
            i = setTimeout(function() {
                t.apply(n, o)
            }, e)
        }
    };
    return t.extend(i.prototype, {
        init: function() {
            var t = this;
            t.setShowLogElem(),
            t._checkPos(),
            t._bindEvent()
        },
        _bindEvent: function() {
            var e = this;
            e.config.curScrollMod ? t.bind(e.config.curScrollMod, "scroll", n(function() {
                e._checkPos()
            }, 200)) : t(window).on("scroll", n(function() {
                e._checkPos()
            }, 200))
        },
        _checkPos: function() {
            var e = this
              , i = window.innerHeight + window.scrollY;
            t.each(e.config.task, function(t, n) {
                var o = n
                  , a = o.elem.offset().top
                  , r = a + o.elem.height();
                o.sendState || i > a && r > window.scrollY && (o.sendState = !0,
                e._execTask(o))
            })
        },
        _execTask: function(t) {
            t.isExec = !0,
            this.regTask(t)
        },
        regTask: function(t) {
            t.params && t.isExec && (this._sendLog(t.params),
            t.isExec = !1)
        },
        _sendLog: function(i) {
            return i || this.config.logType ? void ("guangdiantong" == this.config.logType ? t.ajax({
                url: i + "&datatype=jsonp",
                dataType: "jsonp"
            }) : e.ckSend(this.config.logType, i)) : void console.log("曝光统计参数缺失！！！")
        },
        setShowLogElem: function(e, i) {
            function n(e) {
                t.each(e, function(e, a) {
                    var r = t(a);
                    if (!(r.length < 1))
                        if (r.length > 1)
                            t.each(r, function(t, e) {
                                n([e])
                            });
                        else {
                            var s = {
                                elem: r,
                                sendState: !1
                            };
                            i && (s.params = r.attr(o.config.showLogAttr)),
                            o.config.task.push(s)
                        }
                })
            }
            var o = this
              , a = e || o.config.elem;
            i = void 0 == i ? o.config.isGetParams : i,
            a && n(a)
        },
        setParams: function(e) {
            var i = this
              , n = i.config.task;
            "string" == typeof e ? n[0] && (n[0].params = e,
            i.regTask(n[0])) : t.each(n, function(t, e) {
                var n = e;
                n.sendState || (n.params = n.elem.attr(i.config.showLogAttr),
                i.regTask(n))
            })
        }
    }),
    i
}),
define("m_base64", [], function() {
    var t = {
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        encode: function(e) {
            var i, n, o, a, r, s, c, l = "", d = 0;
            for (e = t._utf8_encode(e); d < e.length; )
                i = e.charCodeAt(d++),
                n = e.charCodeAt(d++),
                o = e.charCodeAt(d++),
                a = i >> 2,
                r = (3 & i) << 4 | n >> 4,
                s = (15 & n) << 2 | o >> 6,
                c = 63 & o,
                isNaN(n) ? s = c = 64 : isNaN(o) && (c = 64),
                l = l + this._keyStr.charAt(a) + this._keyStr.charAt(r) + this._keyStr.charAt(s) + this._keyStr.charAt(c);
            return l
        },
        decode: function(e) {
            var i, n, o, a, r, s, c, l = "", d = 0;
            for (e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); d < e.length; )
                a = this._keyStr.indexOf(e.charAt(d++)),
                r = this._keyStr.indexOf(e.charAt(d++)),
                s = this._keyStr.indexOf(e.charAt(d++)),
                c = this._keyStr.indexOf(e.charAt(d++)),
                i = a << 2 | r >> 4,
                n = (15 & r) << 4 | s >> 2,
                o = (3 & s) << 6 | c,
                l += String.fromCharCode(i),
                64 != s && (l += String.fromCharCode(n)),
                64 != c && (l += String.fromCharCode(o));
            return l = t._utf8_decode(l)
        },
        _utf8_encode: function(t) {
            t = t.replace(/\r\n/g, "\n");
            for (var e = "", i = 0; i < t.length; i++) {
                var n = t.charCodeAt(i);
                128 > n ? e += String.fromCharCode(n) : n > 127 && 2048 > n ? (e += String.fromCharCode(n >> 6 | 192),
                e += String.fromCharCode(63 & n | 128)) : (e += String.fromCharCode(n >> 12 | 224),
                e += String.fromCharCode(n >> 6 & 63 | 128),
                e += String.fromCharCode(63 & n | 128))
            }
            return e
        },
        _utf8_decode: function(t) {
            for (var e = "", i = 0, n = c1 = c2 = 0; i < t.length; )
                n = t.charCodeAt(i),
                128 > n ? (e += String.fromCharCode(n),
                i++) : n > 191 && 224 > n ? (c2 = t.charCodeAt(i + 1),
                e += String.fromCharCode((31 & n) << 6 | 63 & c2),
                i += 2) : (c2 = t.charCodeAt(i + 1),
                c3 = t.charCodeAt(i + 2),
                e += String.fromCharCode((15 & n) << 12 | (63 & c2) << 6 | 63 & c3),
                i += 3);
            return e
        }
    };
    return t
}),
define("m_wxshareSet", ["m_zepto"], function(t) {
    function e() {
        window.WeixinJSBridge ? i() : document.addEventListener("WeixinJSBridgeReady", i, !1)
    }
    function i() {
        WeixinJSBridge.on("menu:share:appmessage", function() {
            o()
        }),
        WeixinJSBridge.on("menu:share:timeline", function() {
            a()
        }),
        WeixinJSBridge.on("menu:share:weibo", function() {
            r()
        }),
        console.log("m_wxshareSet:wechat_platform:bindShare")
    }
    function n(t) {
        o = function() {
            WeixinJSBridge.invoke("sendAppMessage", {
                appid: t.appid,
                img_url: t.img_url,
                img_width: t.img_width,
                img_height: t.img_height,
                link: t.link,
                desc: t.desc,
                title: t.title
            }, function() {})
        }
        ,
        a = function() {
            WeixinJSBridge.invoke("shareTimeline", {
                img_url: t.img_url,
                img_width: t.img_width,
                img_height: t.img_height,
                link: t.link,
                desc: t.desc,
                title: t.title
            }, function() {})
        }
        ,
        r = function() {
            WeixinJSBridge.invoke("shareWeibo", {
                content: t.desc,
                url: t.link
            }, function() {})
        }
    }
    var o, a, r, s = {}, c = !1;
    return s.set = function(i) {
        c || (e(),
        c = !0);
        var o = t.extend({
            appid: "",
            img_url: "http://3gimg.qq.com/wap30/img/touch/icon.png",
            img_width: "180",
            img_height: "180",
            link: location.href.replace(/([?&])sid=[^&#]*/g, "$1ctlastwithsid=1"),
            desc: document.title,
            title: document.title
        }, i);
        n(o)
    }
    ,
    s
}),
define("m_tips", ["m_zepto"], function(t) {
    var e, i = null;
    return e = window.TIPS_STYLE_TYPE ? {
        create: function() {
            var e = ['<div class="lincoapp-tips">', '<div class="tips"><i></i>', '<p class="tips-txt"></p>', "</div>", "</div>"].join("");
            return t(".lincoapp-tips").length || t("body").append(e),
            t(".lincoapp-tips")
        },
        getTip: function() {
            return this.tipNode || (this.tipNode = this.create(),
            this._initEvents()),
            this.tipNode
        },
        _initEvents: function() {
            var t = this;
            this.tipNode.on("webkitAnimationEnd", function() {
                "hide" == t.state && t.tipNode.hide()
            })
        },
        showTip: function(t, e, n, o, a) {
            clearTimeout(i),
            this.hiddenTip();
            var r = this
              , s = this.getTip()
              , c = s.find(".tips");
            "error" == n ? c.removeClass("success").addClass("error") : c.removeClass("error").addClass("success"),
            this.state = "show",
            s.find(".tips-txt").html(t),
            s.show().css({
                "-webkit-animation": "newsfadeIn 0.3s linear forwards"
            }),
            e && (i = setTimeout(function() {
                r.state = "hide",
                r.hiddenTip()
            }, o || 1800)),
            this._moveHide(a)
        },
        hiddenTip: function() {
            this.tipNode && this.tipNode.css({
                "-webkit-animation": "newsfadeOut 0.3s linear forwards"
            })
        },
        _moveHide: function(e) {
            var n = this;
            e && t(document.body).one("touchmove", function() {
                clearTimeout(i),
                setTimeout(function() {
                    n.hiddenTip()
                }, 100)
            })
        }
    } : {
        create: function() {
            var e = '<div class="txt-tips" id="commentTip" style="-webkit-transition: top 0.2s linear; transition: top 0.2s linear;-webkit-transform: translateZ(0); /* top: -36px; */">';
            return e += '<div id="div_commenttype" class="seccess-tips">',
            e += '<span id="sp_commentmsg">设置成功</span>',
            e += "</div></div>",
            0 == t("#commentTip").length && t("body").append(e),
            t("#commentTip")
        },
        getTip: function() {
            return this.tipNode || (this.tipNode = this.create()),
            this.tipNode
        },
        showTip: function(e, n, o, a, r) {
            clearTimeout(i),
            this.hiddenTip();
            var s = this
              , c = this.getTip();
            c.html("error" == o ? '<div class="error-tips"><span>' + e + "</span></div>" : '<div class="seccess-tips"><span>' + e + "</span></div>");
            var l = document.body.scrollTop + document.documentElement.scrollTop;
            t("#commentTip").show().css("top", l + "px"),
            n && (i = setTimeout(function() {
                s.hiddenTip()
            }, a || 2500)),
            this._moveHide(r)
        },
        hiddenTip: function() {
            this.getTip().css("top", "-36px").hide()
        },
        _moveHide: function(e) {
            var n = this;
            e && t(document.body).one("touchmove", function() {
                clearTimeout(i),
                setTimeout(function() {
                    n.hiddenTip()
                }, 100)
            })
        },
        setPosition: function(t, e, n) {
            clearTimeout(i),
            this.hiddenTip();
            var o = this
              , a = document.body.scrollTop + document.documentElement.scrollTop
              , r = this.getTip();
            r.css("top", a + "px"),
            t && (i = setTimeout(function() {
                o.hiddenTip()
            }, n || 2500)),
            this._moveHide(e)
        },
        showTipByHtml: function(t, e, i, n) {
            var o = this.getTip();
            o.html(t),
            this.setPosition(e, n, i)
        }
    }
}),
define("m_popDialog", ["m_zepto"], function(t) {
    var e = '.pop-layer{position:absolute;width:100%;height:100%;background-color:black;opacity:.5;top:0;left:0;z-index:999;}.pop-layer{display:none;position:absolute;width:100%;height:100%;background-color:rgba(0,0,0,0.4);top:45px;left:0;z-index:98;}.pop-window{font-family: "\\5FAE\\8F6F\\96C5\\9ED1","微软雅黑",helvetica,arial;background-color:white;border:1px solid white;-webkit-border-radius:5px;position:absolute;top:20%;left:50%;margin-left:-45%;min-width:288px;width:90%;z-index:1000;}.pop-window a{text-decoration: none;}.pop-window .pop-title{background-color:#eaeaea;-webkit-background-clip:content-box;border-bottom:1px solid #d1d1d1;-webkit-box-shadow:0 1px 2px #d1d1d1;height:42px;line-height:42px;padding:1px;position:relative;text-align:center;}.pop-window .pop-title h3{margin:0;color:#888;font-size:14px;position:relative;}.pop-window .share-tit::before{content:"";display:inline-block;height:20px;width:20px;vertical-align:-4px;}.pop-window .for-mb::before{background-position:-186px -140px;}.pop-window .for-sina::before{background-position:-239px -140px;margin-right:4px;}.pop-window .for-qz::before{background-position:-213px -140px;}.pop-window .for-qq::before{background-position:-270px -140px;}.pop-window .pop-title .btn{position:absolute;top:8px;}.pop-window .btn{background:-webkit-gradient(linear,left top,left bottom,from(#95acc5),to(#7992af));border:1px solid #7992af;-webkit-border-radius:2px;color:white;display:inline-block;height:26px;line-height:26px;padding:0 10px;-webkit-box-shadow:0 1px 0 white;font-size:14px;}.pop-window .pop-title .close-btn{left:8px;}.pop-window .pop-title .send-btn{background:#4083ce;border-color:#2f74c1;right:8px;}.pop-window .pop-cont .textarea{padding:8px;background:0;border:0 none;-webkit-border-radius:0;}.pop-window .pop-cont .textarea textarea{-webkit-appearance:caret;border:0 none;color:#010000;font-size:14px;padding:0;width:100%;height:124px;}.pop-window .wb-dialog-bar{border-top:1px solid #eee;color:#888;padding:12px 8px;position:relative;overflow:hidden;}.pop-window .wb-dialog-num{text-align:right;font-size:14px;}.pop-window .wb-dialog-num strong{color:black;margin:0 3px;}'
      , i = !1
      , n = function(t) {
        this.defualtText = "请在此输入您的观点...",
        this.option = {
            btntxt: "分享",
            html: null,
            cssText: t ? t.cssText : e,
            content: "请在此输入您的观点...",
            postFunc: null,
            maxTextNum: 100,
            top: 0,
            left: "50%"
        }
    };
    return n.prototype = {
        _init: function() {
            i = !0;
            var e = this;
            e._setId();
            var n = "<style>" + this.option.cssText + '</style><div id="div_xll_pop_layer' + this.id + '" class="pop-layer" style="display:none;"></div>';
            t("body").append(n);
            var o = '<div class="pop-window" id="pop-window' + this.id + '" style="display:none;"><div class="pop-title"><a href="javascript:void(0);" class="btn close-btn" style="z-index:1;">关闭</a><span class="title"><%=html%></span><a href="javascript:void(0);" class="btn send-btn"><%=btntxt%></a></div><div class="pop-cont">   <div class="textarea">       <textarea>' + this.defualtText + '</textarea>   </div>   <div class="wb-dialog-bar">       <div class="wb-dialog-num">还剩<strong class="lastnum"><%=lastNum%></strong>字</div>   </div></div>';
            t("body").append(o),
            t("#pop-window" + e.id).delegate(".close-btn", "click", function() {
                e.hide()
            }).delegate(".send-btn", "click", function() {
                return "" == e._trim(e.getValue()) ? void alert("请输入内容") : void e.option.postFunc()
            }).delegate("textarea", "click", function() {
                e._trim(e.getValue()) == e.defualtText && t(this).val("")
            }).delegate("textarea", "keyup", function() {
                e._showLast()
            })
        },
        _trim: function(t) {
            var e = /^(\s|\u00A0)+|(\s|\u00A0)+$/g;
            return (t || "").replace(e, "")
        },
        _setId: function() {
            this.id = t(".pop-window").length
        },
        _showLast: function() {
            t("#pop-window" + this.id + " .lastnum").text(this.option.maxTextNum - this._tStrLength(this.getValue()))
        },
        show: function(e) {
            !i && this._init(),
            t.extend(this.option, e),
            this._setPosition(),
            t("#pop-window" + this.id + " .send-btn").text(this.option.btntxt),
            t("#pop-window" + this.id + " .title").html(this.option.html),
            t("#pop-window" + this.id + " textarea").text(this.option.content),
            this._showLast(),
            t("#pop-window" + this.id).show(),
            t("#div_xll_pop_layer" + this.id).show(),
            t("#div_xll_pop_layer" + this.id).css({
                outline: "1px solid rgba(0, 0, 0, 0)"
            })
        },
        _tStrLength: function(t) {
            var e, i = 0;
            for (e = t.length; e--; 0)
                i += t.charCodeAt(e) > 128 ? 1 : .5;
            return Math.ceil(i)
        },
        hide: function() {
            !i && this._init(),
            t("#div_xll_pop_layer" + this.id).hide(),
            t("#pop-window" + this.id).hide(),
            /ucbrowser/i.test(navigator.userAgent) && t("#video-control").css("visibility", "visible"),
            / uc /i.test(navigator.userAgent) && t("#video-control").show()
        },
        _emptyText: function() {
            t("#pop-window" + this.id).find("textarea").val("")
        },
        destroy: function() {
            !i && this._init(),
            t("#pop-window" + this.id).undelegate(".close-btn", "click").undelegate(".send-btn", "click").undelegate("textarea", "click")
        },
        getValue: function() {
            !i && this._init();
            var e = t("#pop-window" + this.id).find("textarea")
              , n = this._trim(e.val())
              , o = n.length;
            if (this._tStrLength(n) > this.option.maxTextNum) {
                for (var a = "", r = 0, s = 0; o > r; r++) {
                    var c = n.charAt(r);
                    if (s += /[\x00-\xff]/.test(c) ? .5 : 1,
                    !(Math.ceil(s) <= this.option.maxTextNum))
                        break;
                    a += c
                }
                n = a,
                e.val(n)
            }
            return n
        },
        _setPosition: function() {
            t("#pop-window" + this.id).css("top", this.option.top).css("left", this.option.left)
        }
    },
    window.is_output_mod_log && console.log("popDialog of module is loaded."),
    n
}),
define("m_share", ["m_zepto", "m_cookie", "m_popDialog", "m_tips", "m_login", "m_wxshareSet", "m_base64", "m_log"], function(t, e, i, n, o, a, r, s) {
    var c = window.navigator.userAgent
      , l = "//jsapi.qq.com/get?api=app.setShareInfo,app.share"
      , d = "//open.mobile.qq.com/sdk/qqapi.js?_bid=152"
      , u = "http://mdc.html5.qq.com/d/directdown.jsp?channel_id=10349"
      , h = "http://openmobile.qq.com/api/check2?page=qzshare.html&loginpage=loginindex.html&logintype=qzone"
      , p = "mqqapi://share/to_fri?src_type=web&version=1&file_type=news&"
      , f = "https://api.weibo.com/oauth2/authorize?client_id=791268966&redirect_uri=http%3A%2F%2Finfoapp.3g.qq.com%2Fg%2Fapp_include%2Ftouch%2FshareSinaWbCallback.jsp%3Fdisplay%3Dmobile%26state%3D"
      , g = "http://infoapp.3g.qq.com/g/app_include/share/ShareTencentAction.jsp"
      , m = "http://infoapp.3g.qq.com/g/app_include/share/ShareSinaAction.jsp"
      , v = "http://3gimg.qq.com/wap30/img/touch/icon.png"
      , w = ".3g.qq.com"
      , y = "info_share_sina_token"
      , b = "infosharewbcbparams_"
      , _ = "mqqapi://share/to_qzone?src_type=app&version=1&file_type=news&req_type=1&"
      , x = "//3gimg.qq.com/wap30/common/qrcode.min_v3.js"
      , A = "mqqapi://share/to_fri?file_type=news&src_type=app&version=1&generalpastboard=1&shareType=1&cflag=1&objectlocation=pasteboard&callback_type=scheme&callback_name=QQ41AF4B2A&"
      , T = {
        shareSuc: "分享成功",
        shareFail: "分享失败",
        submitSame: "请不要提交相同的内容",
        noLogin: "您还没有登录",
        noTxWb: "您还没有开通腾讯微博",
        sinaAuthFail: "新浪微博授权失败",
        submitBtnName: "发表"
    }
      , k = {
        wxShareTip: ['<div style="position:fixed; top:0; right:0; z-index:1000; display:none;">', '<img src="http://3gimg.qq.com/wap30/infoapp/touch/wx_choice/images/weixin_share_layer_bg.png" style="width:250px;">', "</div>"].join(""),
        qqShareTip: ['<div style="display:none; position:fixed; top:0; left:0; z-index:1000; width:100%; height:100%; background: rgba(0,0,0,0.7);">', '<img src="http://3gimg.qq.com/wap30/infoapp/touch/todaynews/images/weixin_share_mask_bg.png" style="position:absolute; right:0; top:0; width:200px;">', "</div>"].join(""),
        postTxWbTitle: '<h3 class="share-tit for-mb">腾讯微博</h3>',
        postSinaWbTitle: '<h3 class="share-tit for-sina">新浪微博</h3>'
    }
      , C = {
        isFromAndroid: /android/gi.test(c),
        isFromIos: /iphone|ipod|ios/gi.test(c),
        isFromWx: /MicroMessenger/gi.test(c),
        isFromQQ: /mobile.*qq/gi.test(c),
        isFromUC: /ucbrowser/gi.test(c),
        isFromQQBrower: /mqqbrowser[^LightApp]/gi.test(c),
        isFromQQBrowerLight: /MQQBrowserLightApp/gi.test(c),
        getScript: function(t, e, i) {
            var n = document.createElement("script");
            i = i || "utf-8",
            n.type = "text/javascript",
            n.charset = i,
            n.onload = n.onreadystatechange = function() {
                this.readyState && "loaded" != this.readyState && "complete" != this.readyState || (e && e(),
                n.onload = n.onreadystatechange = null,
                n.parentNode.removeChild(n))
            }
            ,
            n.src = t,
            document.getElementsByTagName("head")[0].appendChild(n)
        },
        getUrlParam: function(t) {
            var e, i, n, t = t || location.search.slice(1), o = [], a = {}, r = decodeURIComponent;
            for (o = t.split("&"),
            e = o.length; e--; )
                i = o[e],
                n = i.split("="),
                a[r(n[0])] = r(n[1]);
            return a
        },
        htmlDecode: function(t) {
            return t = t.replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&")
        }
    }
      , S = function(e) {
        this.defaultConfig = {
            title: document.title,
            description: document.title,
            img: v,
            url: location.href,
            state: "index5_show",
            ifMap: {
                wx: "",
                sinaWb: "",
                txWb: "",
                qzone: "",
                qq: ""
            }
        },
        this.config = t.extend({}, this.defaultConfig, e || {}),
        this.config.title = C.htmlDecode(this.config.title),
        this.config.description = C.htmlDecode(this.config.description),
        this.shareUrlMap = {},
        this.sinaOauthUrl = f + this.config.state,
        this.init.call(this)
    };
    return t.extend(S.prototype, {
        init: function() {
            this._setShareUrlIf(),
            this._loadQbWxShareUrl(),
            this._initPostPop(),
            this._initShareSinaWb(),
            this._initEvent(),
            this._initWxshareSet(),
            this._initMobileQQShareSet(),
            this._setQbShareInfo()
        },
        _setShareUrlIf: function() {
            function t(t) {
                var e = i;
                return -1 == a[0].indexOf("g_f=") && (e = a[0] + r + "g_f=" + n[t] + s),
                e
            }
            this._filterShareUrlLogPara();
            var e = this.config
              , i = e.url
              , n = e.ifMap
              , o = this.shareUrlMap
              , a = i.split("#")
              , r = a[0].indexOf("?") > 0 ? "&" : "?"
              , s = a[1] ? "#" + a[1] : "";
            o.wx = n.wx ? t("wx") : i,
            o.sinaWb = n.sinaWb ? t("sinaWb") : i,
            o.txWb = n.txWb ? t("txWb") : i,
            o.qzone = n.qzone ? t("qzone") : i,
            o.oriQQ = n.qq ? t("qq") : i,
            o.qq = this._base64EncodeQQUrl(o.oriQQ)
        },
        _loadQbWxShareUrl: function() {
            {
                var t = this;
                this.config
            }
            C.isFromQQBrower && "undefined" == typeof browser ? C.getScript(l, function() {
                t.otherWxShare()
            }) : t.otherWxShare()
        },
        _setQbShareInfo: function() {
            function t() {
                browser.app.setShareInfo({
                    title: e.title,
                    url: e.url,
                    description: e.description,
                    img_url: e.img
                })
            }
            var e = this.config;
            C.isFromQQBrower && (window.browser && browser.app && browser.app.setShareInfo ? t() : C.getScript(l, function() {
                window.browser && browser.app && browser.app.setShareInfo && t()
            }))
        },
        _initPostPop: function() {
            this.popIns = new i
        },
        _initEvent: function() {
            var e = this
              , i = this.config
              , n = 0
              , o = 0;
            t(document.body).delegate(".ic-share", "touchstart", function(t) {
                var e = t.touches[0];
                n = e.clientX,
                o = e.clientY
            }),
            t(document.body).delegate(".ic-share", "touchend", function(a) {
                var r = t(a.currentTarget)
                  , c = r.data("share")
                  , l = "other"
                  , d = event.changedTouches[0];
                if (Math.abs(d.clientX - n) < 2 && Math.abs(d.clientY - o) < 2) {
                    switch (t.trigger(e, "beforeClickShareBtn", [{
                        shareType: c
                    }]),
                    c) {
                    case "share-wx-friend":
                        e.shareWxFriend(),
                        gF = i.ifMap.wx ? i.ifMap.wx : l;
                        break;
                    case "share-wx-timeline":
                        e.shareWxTimeLine(),
                        gF = i.ifMap.wx ? i.ifMap.wx : l;
                        break;
                    case "share-qzone":
                        e.shareQzone(),
                        gF = i.ifMap.qzone ? i.ifMap.qzone : l;
                        break;
                    case "share-qq":
                        e.shareQQ(),
                        gF = i.ifMap.qq ? i.ifMap.qq : l;
                        break;
                    case "share-sina-wb":
                        e.shareSinaWb(),
                        gF = i.ifMap.sinaWb ? i.ifMap.sinaWb : l;
                        break;
                    case "share-tx-wb":
                        e.shareTxWb(),
                        gF = i.ifMap.txWb ? i.ifMap.txWb : l;
                        break;
                    case "share-qrcode":
                        gF = l,
                        e.generateQr("#qrcode-area")
                    }
                    t.trigger(e, "afterClickShareBtn", [{
                        shareType: c
                    }]),
                    s.ckUserSend("user_action", "shareClick," + gF)
                }
            })
        },
        generateQr: function(t) {
            function e() {
                i.qrcodeIns || (i.qrcodeIns = new QRCode(t,{
                    width: 125,
                    height: 125
                }),
                i.qrcodeIns.makeCode(i.config.url))
            }
            var i = this;
            t = "string" == typeof t ? document.querySelector(t) : t,
            window.QRCode ? e() : C.getScript(x, function() {
                e()
            })
        },
        _initWxshareSet: function() {
            var t = this.config;
            a.set({
                title: t.title,
                desc: t.description,
                img_url: t.img,
                link: this.shareUrlMap.wx
            })
        },
        _initMobileQQShareSet: function() {
            function t() {
                mqq.data.setShareInfo({
                    share_url: e.shareUrlMap.oriQQ,
                    title: i.title,
                    desc: i.description,
                    image_url: i.img
                })
            }
            var e = this
              , i = this.config;
            C.isFromQQ && (window.mqq && mqq.data && mqq.data.setShareInfo ? t() : C.getScript(d, function() {
                t()
            }))
        },
        _filterShareUrlLogPara: function() {
            var e = this.config.url
              , i = C.getUrlParam(e)
              , n = i.g_f;
            if (this.config.url = e = e.replace(/([?&])sid=[^&#]*/g, "$1rsid=1").replace(/([?&])i_f=[^&#]*/g, "$1rif=1").replace(/([?&])iarea=[^&#]*/g, "$1rarea=1").replace(/([?&])f_l=[^&#]*/g, "$1rfl=1").replace(/([?&])f_pid=[^&#]*/g, "$1rfpid=1").replace(/([?&])f_aid=[^&#]*/g, "$1rfaid=1").replace(/([?&])f_aid_ext=[^&#]*/g, "$1rfaide=1"),
            this.config.url = e = e.replace(/oauth_state=0&/g, ""),
            !(n && [23830, 23916].indexOf(parseInt(n)) > -1) && /g_f=/i.test(e)) {
                var o = e.split("#")
                  , a = o[1] ? "#" + o[1] : ""
                  , r = o[0].split("?")
                  , s = [];
                if (r[1]) {
                    var c = r[1].split("&");
                    t.each(c, function(t, e) {
                        e.indexOf("g_f") < 0 && s.push(e)
                    })
                }
                this.config.url = r[0] + "?" + s.join("&") + a
            }
        },
        _postTxWb: function() {
            function e(e, i) {
                t.trigger(o, e, [{
                    type: "tx",
                    msg: i
                }])
            }
            function i(t) {
                n.showTip(t, !0, "error"),
                e("wbShareFailure", t)
            }
            var o = this
              , a = this.config
              , r = this.popIns
              , s = ["reason=" + r.getValue(), "url=" + encodeURIComponent(this.shareUrlMap.txWb), "picUrl=" + encodeURIComponent(a.img)].join("&");
            t.ajax({
                url: g + "?callback=?&" + s,
                dataType: "jsonp",
                success: function(t) {
                    0 == t.code ? (n.showTip(T.shareSuc, !0, !0),
                    r.hide(),
                    e("wbShareSuccess", T.shareSuc)) : i("-101" == t.code ? T.noLogin : "-107" == t.code ? T.noTxWb : T.shareFail)
                },
                error: function() {
                    i(T.shareFail)
                }
            })
        },
        _postSinaWb: function() {
            function i(e, i) {
                t.trigger(a, e, [{
                    type: "sina",
                    msg: i
                }])
            }
            function o(t) {
                n.showTip(t, !0, "error"),
                i("wbShareFailure", t)
            }
            var a = this
              , r = this.config
              , s = this.popIns
              , c = e.get(y)
              , l = ["reason=" + encodeURIComponent(s.getValue()), "url=" + encodeURIComponent(this.shareUrlMap.sinaWb), "picurl=" + encodeURIComponent(r.img), "token=" + c].join("&");
            t.ajax({
                url: m + "/g/s?callback=?&" + l,
                dataType: "jsonp",
                success: function(t) {
                    null == t.error_code ? (s.hide(),
                    n.showTip(T.shareSuc, !0),
                    i("wbShareSuccess", T.shareSuc)) : o("20019" == t.error_code ? T.submitSame : T.ShareFail)
                },
                error: function() {
                    o(T.ShareFail)
                }
            })
        },
        _initShareSinaWb: function() {
            try {
                var i = this
                  , o = this.config
                  , a = o.state
                  , r = C.getUrlParam()
                  , s = r.oauth_state
                  , c = r.access_token;
                s && r.state && (0 == s && a == r.state && c ? (e.set(y, c, 1, w),
                e.del(b + a, w),
                this.popIns.show({
                    btntxt: T.submitBtnName,
                    html: k.postSinaWbTitle,
                    postFunc: function() {
                        i._postSinaWb()
                    },
                    content: o.title
                }),
                t.isFunction(history.replaceState) && history.replaceState(null, document.title, location.href.replace(/oauth_state=0&/g, ""))) : 0 != s && n.showTip(T.sinaAuthFail, !0, !0))
            } catch (l) {
                console.error(l.message)
            }
        },
        _base64EncodeQQUrl: function(t) {
            var e = this.config
              , i = p + ["share_id=1101685683", "title=" + r.encode(e.title), "thirdAppDisplayName=" + r.encode("手机腾讯网"), "url=" + r.encode(t)].join("&");
            return i
        },
        _shareWebQzone: function() {
            var t = this.config
              , e = encodeURIComponent(this.shareUrlMap.qzone)
              , i = t.description.substring(0, 200)
              , n = ["title=" + encodeURIComponent(t.title), "imageUrl=" + encodeURIComponent(t.img), "desc=" + encodeURIComponent(i), "summary=" + encodeURIComponent(i), "url=" + e, "successUrl=" + e, "failUrl=" + e, "callbackUrl=" + e].join("&");
            window.location.href = h + "&" + n
        },
        shareTip: function(e) {
            var i = this
              , n = t("body");
            "qqwebview" == e ? (this.shareTipMask || (this.shareTipMask = t(k.qqShareTip),
            n.append(this.shareTipMask)),
            this.shareTipMask.show(),
            setTimeout(function() {
                i.shareTipMask.hide()
            }, 3e3)) : (this.shareTipMask || (this.shareTipMask = t(k.wxShareTip),
            n.append(this.shareTipMask)),
            this.shareTipMask.show(),
            setTimeout(function() {
                i.shareTipMask.hide()
            }, 3e3))
        },
        isQbInstalled: function(t) {
            t = t || {};
            var e = t.testUrl || location.href
              , i = t.onSucc
              , n = t.onFail
              , o = Date.now()
              , a = 0
              , r = navigator.userAgent
              , s = 0
              , c = r.match(/iphone\s*os\s*\d\d?/gi);
            c && (s = parseInt(c[0].split(" ")[2])),
            e = "mttbrowser://url=" + e.replace(/http:\/\//gi, "");
            var l = function() {
                o += 1e3,
                a += 1,
                3 > a ? setTimeout(l, 1e3) : Math.abs(o - Date.now()) > 1e3 ? i && i() : n && n()
            };
            if (s > 8)
                location.href = e;
            else {
                var d = document.createElement("iframe");
                d.src = e,
                d.id = "qbInstallValidator_" + Date.now(),
                d.style.display = "none",
                document.body.appendChild(d),
                setTimeout(l, 1e3),
                setTimeout(function() {
                    d && d.parentNode && d.parentNode.removeChild(d)
                }, 5e3)
            }
            return !1
        },
        setShareConfig: function(e) {
            t.extend(this.config, e),
            this._setShareUrlIf(),
            this._initWxshareSet()
        },
        qbWxShare: function(e) {
            var i = this
              , n = this.config;
            window.browser && browser.app && browser.app.share && browser.app.share({
                title: n.title,
                description: n.description,
                url: i.shareUrlMap.wx,
                img_url: n.img,
                to_app: e
            }, function(n) {
                1 == n.code ? t.trigger(i, "wxShareSuccess", [{
                    type: e
                }]) : t.trigger(i, "wxShareFailure", [{
                    type: e
                }])
            })
        },
        ucWxShare: function(t) {
            var e = this.config
              , i = this.shareUrlMap.wx
              , n = {
                ios: "kWeixinFriend",
                android: "WechatTimeline"
            };
            1 == t && (n.ios = "kWeixin",
            n.android = "WechatFriends"),
            C.isFromIos ? ucbrowser && ucbrowser.web_share(e.title, e.description, i, n.ios, "", "@手机腾讯网", "") : C.isFromAndroid && ucweb && ucweb.startRequest("shell.page_share", [e.title, e.description, i, n.android, "", "", ""])
        },
        otherWxShare: function() {
            var e = this
              , i = C.getUrlParam()
              , n = C.isFromQQBrower;
            i.fromsharefriend && 1 == i.fromsharefriend && n ? (t.isFunction(history.replaceState) && history.replaceState(null, document.title, location.href.replace(/fromsharefriend=1/g, "")),
            setTimeout(function() {
                e.qbWxShare(1)
            }, 50)) : i.fromsharetimeline && 1 == i.fromsharetimeline && n && (t.isFunction(history.replaceState) && history.replaceState(null, document.title, location.href.replace(/fromsharetimeline=1/g, "")),
            setTimeout(function() {
                e.qbWxShare(8)
            }, 50))
        },
        callWxShare: function(t) {
            var e = (this.config,
            "")
              , i = this.config.url.split("#")
              , n = i[0].indexOf("?") > 0 ? "&" : "?"
              , o = i[1] ? "#" + i[1] : ""
              , a = 1 == t ? "fromsharefriend=1" : "fromsharetimeline=1"
              , e = i[0] + n + a + o;
            return C.isFromWx ? void this.shareTip("wxwebview") : C.isFromQQ ? void this.shareTip("qqwebview") : C.isFromUC ? void this.ucWxShare(t) : C.isFromQQBrower ? void this.qbWxShare(t) : C.isFromQQBrowerLight ? void (location.href = u) : void this.isQbInstalled({
                testUrl: e,
                onSucc: function() {},
                onFail: function() {
                    location.href = u
                }
            })
        },
        shareWxTimeLine: function() {
            this.callWxShare(8)
        },
        shareWxFriend: function() {
            this.callWxShare(1)
        },
        shareSinaWb: function() {
            var t = this
              , i = this.config
              , n = e.get(y);
            "" != n ? (window.scrollTo(0, 1),
            this.popIns.show({
                btntxt: T.submitBtnName,
                html: k.postSinaWbTitle,
                postFunc: function() {
                    t._postSinaWb()
                },
                content: i.title
            })) : (e.set(b + i.state, location.href, 1, w),
            window.location.href = this.sinaOauthUrl)
        },
        shareTxWb: function() {
            var t = this
              , e = this.config;
            o.login(function() {
                window.scrollTo(0, 1),
                t.popIns.show({
                    btntxt: T.submitBtnName,
                    html: k.postTxWbTitle,
                    postFunc: function() {
                        t._postTxWb()
                    },
                    content: e.title
                })
            })
        },
        shareQzone: function() {
            var t, e, i = this, n = this.config, o = (encodeURIComponent(this.shareUrlMap.qzone),
            n.description.substring(0, 200),
            r.encode(n.img)), a = r.encode(n.title), s = r.encode(n.description), c = r.encode(this.shareUrlMap.qzone), l = r.encode("手机腾讯网"), d = _ + ["image_url=" + o, "title=" + a, "description=" + s, "url=" + c, "app_name=" + l].join("&");
            if (C.isFromIos)
                var d = A + ["description=" + s, "url=" + c, "title=" + a, "thirdAppDisplayName=" + l, "previewimageUrl=" + o].join("&");
            return C.isFromQQBrower ? void this.callWxShare(3) : (e = Date.now(),
            C.isFromAndroid ? i._shareWebQzone() : C.isFromQQBrowerLight ? i._shareWebQzone() : location.href = d,
            void (t = setTimeout(function() {
                var t = Date.now() - e;
                1e3 > t && i._shareWebQzone()
            }, 1e3)))
        },
        shareQQ: function() {
            var t = (this.config,
            this.shareUrlMap.qq)
              , e = null;
            return C.isFromQQBrower ? void this.qbWxShare(4) : C.isFromQQBrowerLight ? void (location.href = u) : void (C.isFromAndroid && C.isFromUC ? (e = document.createElement("div"),
            e.style.visibility = "hidden",
            e.innerHTML = '<iframe src="' + t + '" scrolling="no" width="1" height="1"></iframe>',
            document.body.appendChild(e),
            setTimeout(function() {
                e && e.parentNode && e.parentNode.removeChild(e)
            }, 5e3)) : location.href = t)
        }
    }),
    S
}),
define("m_tpl", [], function() {
    function t(t, i, n, o, a) {
        var r = this
          , s = i
          , c = document.getElementById(t)
          , l = c ? c.innerHTML : t
          , a = void 0 != a ? a : !0
          , d = []
          , u = function() {}
          , h = function(t, e) {
            return e || (t = t.replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")),
            t
        }
          , p = function(t, e) {
            return new Function(S,"var mTpl_htmlEncode=" + h.toString() + ";\n var s='';\n s+='" + e + "';\n return s")
        }
          , f = function(t) {
            return "mTpl_" + t + "_mTpl"
        }
          , g = function(t) {
            return t.replace(new RegExp(w,"g"), "\r").replace(new RegExp(y,"g"), "\n").replace(/mTpl_comment\d+;/g, function(t) {
                var e = t.slice(12, t.length - 1);
                return m[e]
            })
        }
          , m = {
            length: 0
        }
          , v = f("L", l)
          , w = f("R", l)
          , y = f("N", l);
        if (a && e[t]) {
            for (var b = 0, _ = e[t].propList, x = _.length; x > b; b++)
                d.push(s[_[b]]);
            u = e[t].parsefn
        } else {
            var A = n
              , T = o;
            if (!l)
                return "";
            if (A && T || (A = "<%",
            T = "%>"),
            !(l.indexOf(A) > -1 && l.indexOf(T) > -1))
                return l;
            var k, C = function(t, e) {
                var i = e ? "\n" : "";
                w = e ? "" : w,
                y = e ? "" : y;
                var n = function(t) {
                    return t.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1")
                }(T)
                  , o = new RegExp(v + "(?:(?!" + n + ")[\\s\\S])*" + n + "|('+)","g");
                return l.replace(/<!--(?:(?!-->)[\s\S])*-->/g, function(t) {
                    var e = m.length++;
                    return m[e] = t,
                    "mTpl_comment" + e + ";"
                }).split("\\").join("\\\\").replace(/[\r]/g, w).replace(/[\n]/g, y).split(A).join(v).replace(o, function(t, e) {
                    return e ? new Array(e.length + 1).join("\r") : t
                }).replace(new RegExp(v + "=(.*?)" + T,"g"), "';" + i + " s+=mTpl_htmlEncode(String($1));" + i + " s+='").replace(new RegExp(v + "!=(.*?)" + T,"g"), "';" + i + " s+=mTpl_htmlEncode(String($1),true);" + i + " s+='").split(v).join("';" + i).split(T).join(i + " s+='").split("\r").join("\\'")
            }, S = [];
            for (k in s)
                S.push(k),
                d.push(s[k]);
            u = p(S, C(t)),
            a && (e[t] = {
                parsefn: u,
                propList: S
            })
        }
        var I;
        try {
            I = u.apply(r, d)
        } catch (L) {
            u = p(S, C(t, !0)),
            I = u.apply(r, d)
        }
        return g(I)
    }
    var e = {};
    return t
}),
define("m_shareMask", ["m_zepto", "m_tpl"], function(t, e) {
    function i(t, e) {
        this.elArr = "string" == typeof t ? [t] : t,
        this.config = e || {},
        this.init()
    }
    var n = ["<style>", ".lincoapp-sharely-mask{position:fixed;left:0;bottom:0;z-index:1000;width:100%;height:100%;background:rgba(0,0,0,.3);-webkit-transition:opacity .2s ease-in,z-index .2s ease-in}", ".lincoapp-sharely-mask.show{opacity:1;z-index:1000}", ".lincoapp-sharely-mask.hide{opacity:0;z-index:-1}", ".lincoapp-sharely-fixed{position:fixed;left:0;bottom:0;width:100%;z-index:1000;background:#fff;padding:.06rem .16rem .02rem;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-transition:-webkit-transform .3s}", ".lincoapp-sharely-fixed.show{-webkit-transform:translate3d(0,0,0)}", ".lincoapp-sharely-fixed.hide{-webkit-transform:translate3d(0,100%,0)}", ".lincoapp-sharely-fixed .list{display:-webkit-box;display:box;-webkit-box-pack:center;margin:.15rem 0 .23rem}", ".lincoapp-sharely-fixed li{width:25%;-webkit-box-flex:1;text-align:center;font-size:.11rem;color:#ababab;line-height:1}", ".lincoapp-sharely-fixed li.type1 .u-img:before{background-position:-.72rem 0}", ".lincoapp-sharely-fixed li.type2 .u-img:before{background-position:-1.08rem 0}", ".lincoapp-sharely-fixed li.type3 .u-img:before{background-position:-1.44rem 0}", ".lincoapp-sharely-fixed li.type4 .u-img:before{background-position:0 -.36rem}", ".lincoapp-sharely-fixed li.type5 .u-img:before{background-position:-.36rem -.36rem}", ".lincoapp-sharely-fixed li.type7 .u-img:before{background-position:-.36rem 0}", ".lincoapp-sharely-fixed .u-img{display:-webkit-box;display:box;width:.52rem;height:.52rem;margin:0 auto .08rem;-webkit-box-pack:center;-webkit-box-align:center;border:.01rem solid #F2F7FC;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-border-radius:100%;border-radius:100%}", '.lincoapp-sharely-fixed .u-img:before{content:"";display:inline-block;width:.36rem;height:.36rem;background:url(http://3gimg.qq.com/wap30/common/sp-share4-fixed.png) no-repeat 0 0;background-size:1.8rem auto;-webkit-background-size:1.8rem auto}', ".lincoapp-sharely-fixed .btn-cancel{display:block;height:.36rem;line-height:.36rem;background:#F2F7FC;border-bottom:1px solid #f0f5f9;margin:.23rem 0 .18rem;-webkit-border-radius:1am;border-radius:1am;font-size:.17rem;text-align:center}", ".lincoapp-sharely-fixed .qr-area{padding:.18rem 0 0;text-align:center;font-size:.11rem;color:#ababab}", ".lincoapp-sharely-fixed .qr-area img{width:125px; margin:0 auto 5px;}", "</style>", '<div class="lincoapp-sharely-mask hide"></div>', '<div class="lincoapp-sharely-fixed skin-sharely-fixed hide">', '<ul class="list">', '<li class="type2 ic-share" data-share="share-wx-timeline"><span class="u-img"></span><p class="txt">朋友圈</p></li>', '<li class="type1 ic-share" data-share="share-wx-friend"><span class="u-img"></span><p class="txt">微信好友</p></li>', '<li class="type4 ic-share" data-share="share-qzone"><span class="u-img"></span><p class="txt">QQ空间</p></li>', '<li class="type3 ic-share" data-share="share-qq"><span class="u-img"></span><p class="txt">QQ好友</p></li>', "</ul>", '<ul class="list">', '<li class="type5 ic-share" data-share="share-sina-wb"><span class="u-img"></span><p class="txt">微博</p></li>', '<li class="type7 qr ic-share" data-share="share-qrcode"><span class="u-img"></span><p class="txt">二维码</p></li>', "<li></li>", "<li></li>", "</ul>", '<span id="btnCancel" class="btn-cancel">取消</span>', "</div>", '<div class="lincoapp-sharely-fixed skin-sharely-fixed-qr hide">', '<div class="qr-area">', '<div id="qrcode-area" style="height:130px;"></div>', "<p>让朋友扫一扫访问当前网页</p>", "</div>", '<span id="btnCancelQr" class="btn-cancel">取消</span>', "</div>"].join("")
      , o = !1;
    return t.extend(i.prototype, {
        init: function() {
            this._createDom(),
            this._initEvent()
        },
        _createDom: function() {
            function i() {
                a.shareMask = t(".lincoapp-sharely-mask"),
                a.shareBox = t(".skin-sharely-fixed"),
                a.shareQrBox = t(".skin-sharely-fixed-qr"),
                a.hideBtn = t(".lincoapp-sharely-fixed .btn-cancel"),
                a.qrBtn = a.shareBox.find(".qr")
            }
            var a = this;
            o ? i() : (t(document.body).append(e(n, {
                config: this.config
            })),
            o = !0,
            i())
        },
        _initEvent: function() {
            for (var e = this, i = this.shareMask, n = this.elArr, o = 0, a = n.length; a > o; o++) {
                var r = n[o];
                r = "string" == typeof r ? t(r) : r;
                var s = r.data("from") || "";
                r.on("click", t.proxy(e.show, e, s))
            }
            var c = t.proxy(this.hide, this);
            i.on("click", c),
            this.hideBtn.on("click", c),
            t.bind(window, "vpageEnter", c),
            t.bind(window, "vpageBack", c),
            this.qrBtn.on("click", t.proxy(this.showQr, this)),
            this.shareBox.find("li").on("click", function(e) {
                var i = t(e.currentTarget);
                i.hasClass("qr") || setTimeout(function() {
                    c()
                }, 300)
            })
        },
        showQr: function() {
            this.shareQrBox.show(),
            this.shareQrBox[0].offsetWidth,
            this.shareQrBox.removeClass("hide"),
            this.shareQrBox.addClass("show"),
            this.shareBox.removeClass("show"),
            this.shareBox.addClass("hide")
        },
        show: function(e) {
            this.shareMask.removeClass("hide"),
            this.shareMask.addClass("show"),
            this.shareBox.show(),
            this.shareBox[0].offsetWidth,
            this.shareBox.removeClass("hide"),
            this.shareBox.addClass("show"),
            t.trigger(this, "afterShow", [{
                from: e
            }])
        },
        hide: function() {
            this.shareMask.removeClass("show"),
            this.shareMask.addClass("hide"),
            this.shareBox.removeClass("show"),
            this.shareBox.addClass("hide"),
            this.shareQrBox.removeClass("show"),
            this.shareQrBox.addClass("hide"),
            t.trigger(this, "afterHide")
        }
    }),
    i
}),
define("coopration", ["m_zepto", "m_omgads", "m_log"], function(t, e, i) {
    var n = null
      , o = {
        init: function() {
            this._initViewReport(),
            this._initEvent()
        },
        _initViewReport: function() {
            var i = t('[data-omgtag="true"]');
            t.each(i, function(i, n) {
                n = t(n);
                var o = n.attr("id")
                  , a = n.data("omgad-ping")
                  , r = []
                  , s = (n.data("omgad-reporturlother") || "").split("$$");
                t.each(s, function(t, e) {
                    r.push({
                        url: e
                    })
                }),
                e.view({
                    id: o,
                    data: {
                        ping: a,
                        reportUrlOther: r
                    }
                })
            })
        },
        _initEvent: function() {
            var i = this;
            t.bind(window, "G:afterSliderSwitch", function(o) {
                var r = o.el
                  , s = o.index
                  , c = r.attr("id")
                  , l = t(r.find(".slide-wrap ul li").get(s))
                  , d = l.attr("id")
                  , u = l.data("adtype");
                if (n && (clearTimeout(n),
                n = null),
                u)
                    switch (u) {
                    case "omgad":
                        if (i[c + s])
                            return;
                        i[c + s] = !0;
                        var h = []
                          , p = (l.data("omgad-reporturlother") || "").split("$$");
                        t.each(p, function(t, e) {
                            h.push({
                                url: e
                            })
                        }),
                        e.view({
                            id: d,
                            data: {
                                ping: l.data("omgad-ping"),
                                reportUrlOther: h
                            }
                        });
                        break;
                    case "browser_selfad_exp":
                        a.expLog(d, "browser");
                        break;
                    case "gdtad":
                        a.expLog(d, "gdtad");
                        break;
                    case "qbad":
                        a.expLog(d, "qbad")
                    }
                s > 0 && a.expLog(d, "other", s)
            })
        }
    }
      , a = {
        view: function(e, o, a) {
            var r = this
              , s = t("#" + e)
              , c = document.body.scrollTop
              , l = c + t(window).height()
              , d = s.offset().top
              , u = s.height() / 2
              , h = d + s.height()
              , p = l > d && h > c;
            "qbad" === o && (p = l > d + u && h - u > c),
            p && (this[o + e] = !0,
            "browser" === o ? i.ckSend("indexPage", "index_slider_browser_ad") : "gdtad" === o ? t.ajax({
                url: s.data("apurl") + "&datatype=jsonp",
                dataType: "jsonp"
            }) : "qbad" === o ? (this[o + e] = !1,
            n = setTimeout(function() {
                r[o + e] = !0,
                t.ajax({
                    url: s.data("qbexpurl")
                })
            }, 1e3)) : i.ckSend("indexPage", "index_slider_image," + (a + 1)))
        },
        expLog: function(t, e, i) {
            this[e + t] || this.view(t, e, i)
        }
    };
    return o
}),
define("m_omgads", ["m_zepto", "m_loader", "m_tpl"], function(t, e, i) {
    function n(e) {
        this.defaultConfig = {
            adConf: {},
            pageType: "2",
            notFeedAdArr: [],
            feedAdInfo: {
                list: [],
                base: {
                    adIdPrefix: "feed-omgad-",
                    adTag: "li",
                    selector: "ul li",
                    className: ""
                }
            }
        },
        this.config = t.extend(!0, {}, this.defaultConfig, e || {}),
        this.init.call(this)
    }
    var o = {}
      , a = !1
      , r = !1
      , s = !1
      , c = []
      , l = []
      , d = "//ra.gtimg.com/web/crystal/3gqq/crystal-min.js";
    o.init = function(t) {
        if (r = !0,
        a)
            return void u(t);
        var i = (new Date).getTime();
        e.load.loadScript(d, function(e) {
            var n = (new Date).getTime();
            if (!e) {
                var o = new Image(1,1);
                o.src = "//dp3.qq.com/qqcom/?adb=1&dm=3gqq&err=1002&blockjs=" + (n - i)
            }
            crystal.timer("js", n - i),
            a = !0,
            t && (u(t),
            s = !0);
            for (var r, d = c.length, f = 0; d > f; f++)
                r = c.shift(),
                r && p(r);
            for (var g, m = l.length, f = 0; m > f; f++)
                g = l.shift(),
                g && h(g)
        })
    }
    ;
    var u = function(t) {
        var e = {
            page_type: t.page_type,
            loc_list: t.loc_list
        };
        t.scrollId && (e.scrollId = t.scrollId),
        crystal.init(e)
    };
    o.render = function(t) {
        return a ? void p(t) : (c.push(t),
        void (r || o.init()))
    }
    ,
    o.view = function(t) {
        return a ? void h(t) : (l.push(t),
        void (r || o.init()))
    }
    ;
    var h = function(t) {
        crystal.view({
            id: t.id,
            data: t.data,
            callback: t.callback
        })
    }
      , p = function(t) {
        if (!s) {
            var e = {
                page_type: t.page_type || "2",
                loc_list: [{
                    loc: t.loc,
                    ad_cnt: 1,
                    loc_type: t.loc_type,
                    chl: t.chl
                }]
            };
            t.scrollId && (e.scrollId = t.scrollId),
            console.log("render init: ", e),
            crystal.init(e)
        }
        t.loc_type = t.loc_type.toString();
        var i = {
            id: t.domId,
            loc: t.loc,
            loc_type: t.loc_type,
            render: !0,
            chl: t.chl,
            callback: function(e) {
                console.log("ad data", e);
                var i = g(t.loc_type, e);
                t.callback && t.callback(i),
                t.noTpl || i && f(t, i)
            }
        };
        t.scrollId && (i.scrollId = t.scrollId),
        crystal.load(i)
    }
      , f = function(e, n) {
        var o = t("#" + e.domId)
          , a = "TPL_t" + e.loc_type;
        ("14" === e.loc_type || "1" === e.loc_type) && (a = "TPL_t1");
        var r = i(v[a], {
            adO: n
        }, "<%", "%>", !1);
        o.html(r);
        var s = e.loc_type;
        "1" === s || "14" === s ? o.addClass(n.big_pic ? "lincoapp-publ-infonews5" : n.threepic ? "lincoapp-publ-infonews7" : "lincoapp-publ-infonews3") : "2" === s ? o.addClass("lincoapp-publ-infonews1") : "3" === s && o.addClass("lincoapp-publ-infonews2")
    }
      , g = function(t, e) {
        var i = {};
        try {
            "1" === t || "14" === t ? (i.link = m(e.fodder[0].link_to),
            i.pic = m(e.fodder[0].resource_url),
            i.title = e.fodder[1].text_content,
            i.big_pic = !1,
            i.threepic = !1,
            e.display_config && e.display_config.type && "big_pic" === e.display_config.type ? i.big_pic = !0 : e.display_config && e.display_config.type && "threepic" === e.display_config.type ? (i.threepic = !0,
            i.pics = [m(e.fodder[0].resource_url), m(e.fodder[1].resource_url), m(e.fodder[2].resource_url)],
            i.title = e.fodder[3].text_content) : e.fodder[2] && (i.desc = e.fodder[2].text_content)) : "2" === t ? (i.link = m(e.fodder[0].link_to),
            i.pic = m(e.fodder[0].resource_url),
            i.title = e.fodder[1].text_content) : "3" === t && (i.link = m(e.fodder[0].link_to),
            i.title = e.fodder[0].text_content)
        } catch (n) {
            i = !1
        }
        return i
    }
      , m = function(t) {
        return t ? t.replace("http:", "") : void 0
    }
      , v = {};
    return v.TPL_t1 = '<% if(adO.big_pic) { %><a href="<%=adO.link%>">   <strong class="infonews-tit"><%=adO.title%></strong>   <span class="infonews-u-img">       <div class="img-wrap">           <img src="<%=adO.pic%>" alt="">       </div>   </span>   <div class="info-infonews">       <span class="btn-infonews blue">广告</span>       <span class="btn-infonews" style="display: none;">source</span>   </div></a><% } else if(adO.threepic) { %><a href="<%=adO.link%>">   <strong class="infonews-tit"><%=adO.title%></strong>   <div class="infonews-u-img">       <span class="img-wrap"><img src="<%=adO.pics[0]%>" alt=""></span>       <span class="img-wrap"><img src="<%=adO.pics[1]%>" alt=""></span>       <span class="img-wrap"><img src="<%=adO.pics[2]%>" alt=""></span>   </div>   <div class="info-infonews">      <span class="btn-infonews blue">广告</span>       <span class="btn-infonews" style="display: none;">source</span>       <span class="btn-infonews" style="display: none;">download</span>   </div></a><% } else { %><a href="<%=adO.link%>">   <div class="infonews-detail">       <strong class="infonews-tit<% if(adO.desc) { %>2<% } %>"><%=adO.title%></strong>       <% if(adO.desc) { %><p class="infonews-txt"><%=adO.desc%></p><% } %>       <div class="info-infonews">           <span class="btn-infonews blue">广告</span>           <span class="btn-infonews" style="display: none;">source</span>           <span class="btn-infonews" style="display: none;">download</span>       </div>   </div>   <span class="infonews-u-img">       <div class="img-wrap">           <img src="<%=adO.pic%>"/>       </div>   </span></a><% } %>',
    v.TPL_t2 = '<a href="<%=adO.link%>">   <strong class="infonews-tit"><%=adO.title%></strong>   <span class="infonews-u-img">       <div class="img-wrap">           <img src="<%=adO.pic%>" alt="">       </div>   </span>   <div class="info-infonews">       <span class="btn-infonews blue">广告</span>       <span class="btn-infonews" style="display: none;">source</span>   </div></a>',
    v.TPL_t3 = '<a href="<%=adO.link%>">   <p class="infonews-tit"><%=adO.title%></p>   <span class="btn-infonews blue">广告</span></a>',
    t.extend(n.prototype, {
        init: function() {
            this._cache(),
            this.adLocList.length < 1 || (this._initAdData(),
            this._renderNotFeedAd(),
            this._renderFeedAd())
        },
        _cache: function() {
            var e = this
              , i = this.config
              , n = i.adConf;
            this.adLocList = [],
            t.each(n, function(t, i) {
                e.adLocList.push(i)
            })
        },
        _initAdData: function() {
            var t = this
              , e = this.config;
            o.init({
                page_type: e.pageType,
                loc_list: t.adLocList
            })
        },
        _renderNotFeedAd: function() {
            var e = this.config
              , i = e.adConf;
            e.notFeedAdArr.length < 1 || t.each(e.notFeedAdArr, function(e, n) {
                if (i[n.key] && i[n.key].loc && t("#" + n.id).length) {
                    var a = i[n.key];
                    o.render({
                        loc: a.loc,
                        chl: a.chl,
                        loc_type: a.loc_type,
                        domId: n.id,
                        callback: n.callback || null
                    })
                }
            })
        },
        _renderFeedAd: function() {
            var e = this.config
              , i = e.adConf
              , n = e.feedAdInfo.base
              , a = e.feedAdInfo.list;
            a.length < 1 || t.each(a, function(e, a) {
                if (i[a.key] && i[a.key].loc) {
                    var r = i[a.key]
                      , s = r.seq;
                    t.bind(window, a.eventName, function(e) {
                        var i = e.startIdx
                          , c = e.endIdx
                          , l = e.curPage
                          , d = e.perPage
                          , u = t("#" + a.id);
                        c || (i = d * (l - 1),
                        c = d * l);
                        for (var h = i; c > h; h++)
                            if (s.indexOf(h + 1) > -1) {
                                var p = n.adIdPrefix + t.uuid()
                                  , f = n.adTag
                                  , g = "<" + f + ' id="' + p + '" class="' + n.className + '"></' + f + ">";
                                t(g).insertBefore(t(u.find(n.selector)[h]));
                                var m = {
                                    domId: p,
                                    loc: r.loc,
                                    chl: r.chl,
                                    loc_type: r.loc_type,
                                    callback: function(t) {
                                        a.callback && a.callback(t, p)
                                    },
                                    noTpl: !!a.noTpl
                                };
                                a.scrollId && (m.scrollId = a.scrollId),
                                o.render(m)
                            }
                    })
                }
            })
        }
    }),
    o.InsertAds = n,
    o
}),
define("m_stat", ["m_zepto", "m_log"], function(t, e) {
    function i() {
        var i = "//statistic.3g.qq.com/comlog/comQbtemplog";
        /kf0309/gi.test(location.host) && (i = "//statistic.kf0309.3g.qq.com/comlog/comQbtemplog");
        var n = {}
          , o = {
            sendHandler: function(e) {
                var i = this;
                for (key in e)
                    "excatlog" == key ? i.excatlog(e[key]) : t.each(e[key], function(t, e) {
                        i[key](e.logType, e.params)
                    })
            },
            compose: function() {},
            templog: function(t, i) {
                e.ckSend(t, i)
            },
            comtemplog: function(t, i) {
                e.ckUserSend(t, i)
            },
            excatlog: function(e) {
                var i = t.map(e, function(t) {
                    return t.params
                });
                t.trigger(window, "excatExp", [i])
            },
            combine: function(e, i, a) {
                var r = i.split(",")
                  , s = e + "_" + r[0];
                n[s] = n[s] || {};
                var c = n[s];
                c.params ? t.each(c.params, function(t, e) {
                    e !== r[t] && (c.params[t] += "@" + r[t])
                }) : (c.params = r,
                c.logType = e),
                a && (t.each(n, function(t, e) {
                    o.comtemplog(e.logType, e.params.join(","))
                }),
                n = {})
            },
            QbExpTemplog: function(n, o) {
                var a = o.split("SqbexpS")
                  , r = a[0]
                  , s = a[1]
                  , c = s.split(",")
                  , l = c[4] || ""
                  , d = []
                  , u = []
                  , h = []
                  , p = []
                  , f = []
                  , g = []
                  , m = []
                  , v = [];
                t.each(l.split("@"), function(t, e) {
                    var i = e.split("-")
                      , n = i[0] || "";
                    d.push(n),
                    u.push(i[1]),
                    h.push(i[2]),
                    p.push(i[3]),
                    f.push(i[4]),
                    g.push(i[5]),
                    m.push(i[6]),
                    v.push(n.split("_")[0] + "_ss")
                });
                var w = {
                    logType: "common_exp",
                    params: r,
                    type: "show",
                    bid: c[0],
                    isIndex: c[1],
                    recomModel: c[2],
                    screan: c[3],
                    sourceIds: d.join("@"),
                    sourceTypes: u.join("@"),
                    articleTypes: h.join("@"),
                    articleKeys: p.join("@"),
                    articleOthers: f.join("@"),
                    recomStrategys: g.join("@"),
                    screanOrders: m.join("@"),
                    aids: v.join("@")
                };
                e.send(i + "?" + t.param(w))
            }
        }
          , a = function(t, e) {
            try {
                console[t](e)
            } catch (i) {}
        }
          , r = {
            logger: a,
            pointMap: o,
            ping: function() {},
            watch: function() {},
            init: function() {
                var e = this;
                t(function() {
                    e.watch()
                }),
                e.init = function() {}
            }
        }
          , s = 0
          , c = {};
        return {
            _ins: c,
            createWatch: function(e) {
                var i = t.extend({}, r, e);
                return i.init(),
                i.name || (i.name = "ins" + ++s),
                c[i.name] = i,
                i
            },
            registerEndPoint: function(t, e) {
                return o[t] ? void a("warn", "[" + t + "] 上报点已经存在。") : (e = e || function() {}
                ,
                void (o[t] = e))
            }
        }
    }
    var n = /^(http(s)?:)?\/\//i
      , o = {
        name: "展示行为上报",
        config: {
            flag: "data-log-exp",
            point: "templog"
        },
        _watchs: [],
        _collectQue: {},
        _lastFlag: !1,
        addWatchElem: function(t) {
            t.length > 0 && (this._watchs = this._watchs.concat(t))
        },
        checkWatchElem: function(e, i) {
            var n = e.getBoundingClientRect()
              , o = parseFloat(t(e).data("ratio")) || 0
              , a = {
                width: n.width || n.right - n.left,
                height: n.height || n.bottom - n.top,
                left: n.left,
                right: n.right,
                top: n.top,
                bottom: n.bottom
            }
              , r = {
                width: a.width * (1 - o),
                height: a.height * (1 - o)
            }
              , s = a.left + r.width > 0 && a.left - r.width < i.width - a.width
              , c = a.top + r.height > 0 && a.top - r.height < i.height - a.height;
            return s && c
        },
        checkIsVisble: function(e) {
            var i = t(e);
            return "none" != i.css("display") && "hidden" != i.css("visibility") && i.height() > 0
        },
        checkReportCount: function(e, i) {
            i = i || 1;
            var n = t(e)
              , o = parseInt(n.data("reported-count"), 10) || 0;
            return i > o
        },
        detect: function() {
            var e = t("[" + this.config.flag + "]").not(function() {
                return this.__isDetect ? !0 : (this.__isDetect = !0,
                !1)
            }).toArray();
            return e
        },
        digest: function(t) {
            var e = []
              , i = [];
            if (this._watchs.length <= 0)
                return [];
            for (var n, o = 0; n = this._watchs[o]; o++)
                this.checkIsVisble(n) && this.checkReportCount(n) && this.checkWatchElem(n, t) ? e.push(n) : i.push(n);
            return this._watchs = i,
            e
        },
        handler: function(e) {
            var i = this
              , n = this.digest(e)
              , o = n.length;
            0 !== o && t.each(n, function(t, e) {
                i._lastFlag = t == o - 1,
                i.ping(e)
            })
        },
        ping: function(i) {
            var o = t(i)
              , a = o.attr(this.config.flag);
            a || (a = this.config.point);
            var r = this.pointMap[a];
            "function" === t.type(r) ? this.collector(i, a) : n.test(a) && e.send(a);
            var s = parseInt(o.data("reported-count"), 10) || 0;
            o.data("reported-count", s + 1),
            this._lastFlag && (this.pointMap.sendHandler(this._collectQue),
            this._collectQue = {},
            this._lastFlag = !1)
        },
        collector: function(i, o) {
            var a = this.pointMap
              , r = this._collectQue
              , s = t(i)
              , c = s.data("log-exp-type") || s.data("log-type") || "common_exp"
              , l = s.data("log-exp-params") || s.data("log-params") || ""
              , d = function(t, e, i) {
                r[t] || (r[t] = []),
                r[t].push({
                    logType: e,
                    params: i
                })
            };
            if ("compose" == o)
                for (var u, h = l.split("|"), p = null, f = null, g = 0; u = h[g]; g++)
                    p = u.split("::"),
                    f = a[p[0]],
                    "function" == typeof f ? d(p[0], c, p[1]) : n.test(p[0]) && e.send(p[0]);
            else
                d(o, c, l)
        },
        watch: function() {
            function e() {
                var t = o.detect();
                t.length > 0 && (o.addWatchElem(t),
                o.logger("info", "watch:detect " + t.length + " element")),
                o.handler({
                    scrollLeft: n.scrollLeft(),
                    scrollTop: n.scrollTop(),
                    width: n.width(),
                    height: n.height()
                })
            }
            var i, n, o = this;
            n = t(window).bind("scroll resize", function() {
                i && window.clearTimeout(i),
                i = window.setTimeout(e, 1e3)
            }),
            e(),
            t.bind(window, "statDetectDom", function() {
                i && window.clearTimeout(i),
                i = window.setTimeout(e, 1e3)
            }),
            o.logger("info", "watch:impress")
        }
    }
      , a = {
        name: "点击行为上报",
        config: {
            flag: "data-log-clk",
            point: "templog"
        },
        ping: function(i) {
            var o = t(i)
              , a = o.data("log-clk-type") || o.data("log-type") || "common_click"
              , r = o.data("log-clk-params") || o.data("log-params")
              , s = o.attr(this.config.flag);
            s || (s = this.config.point);
            var c = this.pointMap[s];
            "function" === t.type(c) ? c(a, r) : n.test(s) && e.send(s)
        },
        watch: function() {
            var e = this;
            t("body").delegate("[" + this.config.flag + "]", "click", function() {
                e.ping(t(this))
            }),
            this.logger("info", "watch:click")
        }
    }
      , r = e.stat = window.__STAT = new i;
    return r.createWatch(o),
    r.createWatch(a),
    e
}),
define("m_deferred", ["m_zepto"], function(t) {
    return function(t) {
        t.Callbacks = function(e) {
            e = t.extend({}, e);
            var i, n, o, a, r, s, c = [], l = !e.once && [], d = function(t) {
                for (i = e.memory && t,
                n = !0,
                s = a || 0,
                a = 0,
                r = c.length,
                o = !0; c && r > s; ++s)
                    if (c[s].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
                        i = !1;
                        break
                    }
                o = !1,
                c && (l ? l.length && d(l.shift()) : i ? c.length = 0 : u.disable())
            }, u = {
                add: function() {
                    if (c) {
                        var n = c.length
                          , s = function(i) {
                            t.each(i, function(t, i) {
                                "function" == typeof i ? e.unique && u.has(i) || c.push(i) : i && i.length && "string" != typeof i && s(i)
                            })
                        };
                        s(arguments),
                        o ? r = c.length : i && (a = n,
                        d(i))
                    }
                    return this
                },
                remove: function() {
                    return c && t.each(arguments, function(e, i) {
                        for (var n; (n = t.inArray(i, c, n)) > -1; )
                            c.splice(n, 1),
                            o && (r >= n && --r,
                            s >= n && --s)
                    }),
                    this
                },
                has: function(e) {
                    return !(!c || !(e ? t.inArray(e, c) > -1 : c.length))
                },
                empty: function() {
                    return r = c.length = 0,
                    this
                },
                disable: function() {
                    return c = l = i = void 0,
                    this
                },
                disabled: function() {
                    return !c
                },
                lock: function() {
                    return l = void 0,
                    i || u.disable(),
                    this
                },
                locked: function() {
                    return !l
                },
                fireWith: function(t, e) {
                    return !c || n && !l || (e = e || [],
                    e = [t, e.slice ? e.slice() : e],
                    o ? l.push(e) : d(e)),
                    this
                },
                fire: function() {
                    return u.fireWith(this, arguments)
                },
                fired: function() {
                    return !!n
                }
            };
            return u
        }
    }(t),
    function(t) {
        function e(i) {
            var n = [["resolve", "done", t.Callbacks({
                once: 1,
                memory: 1
            }), "resolved"], ["reject", "fail", t.Callbacks({
                once: 1,
                memory: 1
            }), "rejected"], ["notify", "progress", t.Callbacks({
                memory: 1
            })]]
              , o = "pending"
              , a = {
                state: function() {
                    return o
                },
                always: function() {
                    return r.done(arguments).fail(arguments),
                    this
                },
                then: function() {
                    var i = arguments;
                    return e(function(e) {
                        t.each(n, function(n, o) {
                            var s = t.isFunction(i[n]) && i[n];
                            r[o[1]](function() {
                                var i = s && s.apply(this, arguments);
                                if (i && t.isFunction(i.promise))
                                    i.promise().done(e.resolve).fail(e.reject).progress(e.notify);
                                else {
                                    var n = this === a ? e.promise() : this
                                      , r = s ? [i] : arguments;
                                    e[o[0] + "With"](n, r)
                                }
                            })
                        }),
                        i = null
                    }).promise()
                },
                promise: function(e) {
                    return null != e ? t.extend(e, a) : a
                }
            }
              , r = {};
            return t.each(n, function(t, e) {
                var i = e[2]
                  , s = e[3];
                a[e[1]] = i.add,
                s && i.add(function() {
                    o = s
                }, n[1 ^ t][2].disable, n[2][2].lock),
                r[e[0]] = function() {
                    return r[e[0] + "With"](this === r ? a : this, arguments),
                    this
                }
                ,
                r[e[0] + "With"] = i.fireWith
            }),
            a.promise(r),
            i && i.call(r, r),
            r
        }
        var i = Array.prototype.slice;
        t.when = function(n) {
            var o, a, r, s = i.call(arguments), c = s.length, l = 0, d = 1 !== c || n && t.isFunction(n.promise) ? c : 0, u = 1 === d ? n : e(), h = function(t, e, n) {
                return function(a) {
                    e[t] = this,
                    n[t] = arguments.length > 1 ? i.call(arguments) : a,
                    n === o ? u.notifyWith(e, n) : --d || u.resolveWith(e, n)
                }
            };
            if (c > 1)
                for (o = new Array(c),
                a = new Array(c),
                r = new Array(c); c > l; ++l)
                    s[l] && t.isFunction(s[l].promise) ? s[l].promise().done(h(l, r, s)).fail(u.reject).progress(h(l, a, o)) : --d;
            return d || u.resolveWith(r, s),
            u.promise()
        }
        ,
        t.Deferred = e
    }(t),
    "Deferred module"
}),
define("m_browser", [], function() {
    var t = window.navigator.userAgent;
    return {
        isFromAndroid: /android/gi.test(t),
        isFromXiaomi: /android.+mi/gi.test(t),
        isFromIos: /iphone|ipod|ios/gi.test(t),
        isFromWx: /MicroMessenger/gi.test(t),
        isFromQQ: /mobile.*qq/gi.test(t),
        isFromUC: /ucbrowser/gi.test(t),
        isFromQQBrower: /mqqbrowser/gi.test(t),
        isFromQQBrowerLight: /MQQBrowserLightApp/gi.test(t),
        isFromOpera: /opr\//gi.test(t)
    }
}),
define("m_gdtads", ["m_browser", "m_zepto", "m_tpl", "m_deferred", "m_stat", "m_log"], function(t, e, i, n, o, a) {
    "use strict";
    function r(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }
    function s(t) {
        var e = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1]
          , i = t;
        m(i) || ("number" == typeof i ? i = [{
            posid: i,
            count: 1
        }] : "object" == ("undefined" == typeof i ? "undefined" : h(i)) && (i = [i]));
        var n = "cb_" + (new Date).getTime()
          , o = e.uin
          , a = e.netType
          , r = e.callback
          , s = v(i)
          , c = s.posid
          , d = s.count
          , u = {
            posid: c,
            adposcount: m(i) ? i.length : 1,
            count: d,
            uin: o,
            callback: n,
            ext: JSON.stringify({
                req: {
                    carrier: 0,
                    conn: parseInt(a || 1),
                    c_os: l.default.isFromIos ? "ios" : "android"
                }
            })
        };
        window[n] = function(t) {
            if (t.data) {
                var e = x(i, t.data);
                r && r(e),
                _(i, e)
            } else
                _(i, null)
        }
        ,
        g(f, u)
    }
    var c = {};
    Object.defineProperty(c, "__esModule", {
        value: !0
    }),
    c.default = s;
    var l = r(t)
      , d = r(e)
      , u = r(i)
      , h = (r(n),
    r(o),
    r(a),
    "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
    }
    : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol ? "symbol" : typeof t
    }
    )
      , p = Object.assign || function(t) {
        for (var e = 1; e < arguments.length; e++) {
            var i = arguments[e];
            for (var n in i)
                Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n])
        }
        return t
    }
      , f = "//mi.gdt.qq.com/gdt_mview.fcg"
      , g = function(t, e) {
        var i = function(t) {
            try {
                new Function(e.callback + "({})")()
            } catch (t) {
                console.log(t)
            }
        };
        window.addEventListener("error", i, !1);
        var n = function(t) {
            return Object.keys(t).map(function(e) {
                return e + "=" + encodeURIComponent(t[e])
            }).join("&")
        }
          , o = document.createElement("script");
        o.charset = "gb2312",
        o.src = t + "?" + n(e),
        o.onload = function() {
            window.removeEventListener("error", i)
        }
        ,
        document.getElementsByTagName("head")[0].appendChild(o)
    }
      , m = function(t) {
        return Array.isArray ? Array.isArray(t) : "[object Array]" == {}.toString.call(t)
    }
      , v = function(t) {
        var e = {
            posid: [],
            count: []
        }
          , i = ["posid", "count"];
        return t.forEach(function(t) {
            i.forEach(function(i) {
                e[i].push(t[i] || "")
            })
        }),
        i.forEach(function(t) {
            e[t] = e[t].join("|")
        }),
        e
    }
      , w = "data-log-exp"
      , y = {
        focus: "",
        threepic: '<div class="lincoapp-publ-infonews7" <%=expAttr%>="<%=apurl%>" data-ratio="0.5">\n                    <a href="<%=url%>">\n                        <strong class="infonews-tit"><%=desc%></strong>\n                        <div class="infonews-u-img">\n                            <%for(var i =0; i < img_list.length; i++){%>\n                                <span class="img-wrap">\n                                    <img src="<%=img_list[i]%>" alt=""/>\n                                </span>\n                            <%}%>\n                        </div>\n                        <span class="btn-infonews blue">广告</span>\n                        <%if(appname){%>\n                            <span class="btn-infonews"><%=appname%>-app下载</span>\n                        <%}%>\n                    </a>\n                </div>',
        bigpic: '<div class="lincoapp-publ-infonews5" <%=expAttr%>="<%=apurl%>" data-ratio="0.5">\n                    <a href="<%=url%>">\n                        <%if(desc){%>\n                            <strong class="infonews-tit"><%=desc%></strong>\n                        <%}%>\n                        <span class="infonews-u-img">\n                            <img src="<%=img%>" alt="">\n                        </span>\n                        <div class="info-infonews">\n                            <span class="btn-infonews blue">广告</span>\n                        </div>\n                   </a>\n               </div>',
        feeds: '<div class="lincoapp-publ-infonews3" <%=expAttr%>="<%=apurl%>" data-ratio="0.5">\n                 <a href="<%=url%>">\n                    <div class="infonews-detail">\n                        <strong class="infonews-tit"><%=desc%></strong>\n                        <div class="info-infonews">\n                            <span class="btn-infonews blue">广告</span>\n                            <%if(appname){%>\n                                <span class="btn-infonews"><%=appname%>-app下载</span>\n                            <%}%>\n                        </div>\n                    </div>\n                    <span style="background-image:url(\'<%=img%>\')" class="infonews-u-img"></span>\n                 </a>\n              </div>'
    }
      , b = function(t, e) {
        var i = "string" == typeof t ? d.default(t) : t;
        i.length ? i.html(u.default(y[e.type], p({}, e, {
            expAttr: w
        }))) : A.filter(function(e) {
            return e.dom == t
        }).length || A.push({
            dom: t,
            ad: e
        })
    }
      , _ = function(t, e) {
        t.forEach(function(t, i) {
            e && e[i] ? e[i].forEach(function(n, o) {
                var a = n.img
                  , r = n.width
                  , s = n.height
                  , c = n.type;
                if (t.insert = t.insert || [],
                "bigpic" == c)
                    k(a, r, s).then(function() {
                        if (t.insert[o] && t.type) {
                            var a = t.insert[o];
                            b(a, n)
                        }
                        t.callback && t.callback(e[i][o], t.insert[o])
                    }, function() {
                        t.callback && t.callback(null, t.insert[o])
                    });
                else {
                    if (t.insert[o] && t.type) {
                        var l = t.insert[o];
                        b(l, n)
                    }
                    t.callback && t.callback(e[i][o], t.insert[o])
                }
            }) : t.insert && t.callback ? t.insert.forEach(function(e) {
                t.callback(null, e)
            }) : t.callback && t.callback(null)
        })
    }
      , x = function(t, e) {
        var i = function(t, e) {
            var i = "feeds"
              , n = t.img_list;
            return n && n.length >= 3 ? i = "threepic" : e >= 640 && (i = "bigpic"),
            i
        };
        return t.map(function(t) {
            var n = e[t.posid].cfg;
            return e[t.posid].list.map(function(e) {
                var o = n.playcfg.w
                  , a = n.playcfg.h
                  , r = i(e, o, a);
                return {
                    apurl: e.apurl + "&datatype=jsonp",
                    img: e.img,
                    type: r || t.type,
                    img_list: e.img_list || "",
                    desc: e.desc || e.txt,
                    url: 19 == e.producttype || 12 == e.producttype ? e.rl + "&acttype=42" : e.rl,
                    width: o,
                    height: a,
                    cfg: n,
                    appname: 19 == e.producttype || 12 == e.producttype ? (e.ext || {}).appname || "" : ""
                }
            })
        })
    }
      , A = []
      , T = "GDT_AD:afterRender";
    d.default.bind(window, T, function(t) {
        if (t.dom) {
            var e = A.filter(function(e) {
                return e.dom == t.dom
            });
            if (e.length) {
                var i = e[0].ad;
                b(t.dom, i)
            }
        } else
            A.forEach(function(t) {
                b(t.dom, t.ad)
            })
    });
    var k = function(t, e, i) {
        var n = d.default.Deferred()
          , o = new Image;
        return o.onload = function() {
            o.width == e && o.height == i ? n.resolve() : (n.reject(o.width, o.height),
            (new Image).src = "http://statistic.3g.qq.com/comlog/templog?logType=gdt_fe&params=wrong_img," + t + ", " + o.width + "_" + o.height + "," + e + "_" + i)
        }
        ,
        o.src = t,
        n
    };
    return c
}),
define("m_cssErrorReport", ["m_zepto", "m_log", "m_util"], function(t, e, i) {
    var n = {
        domSelector: ".pages",
        cssLinkSelector: 'link[type="text/css"]',
        cssProperty: "max-width",
        cssValue: "768px",
        projectName: "index"
    }
      , o = {
        init: function(o) {
            if (o = t.extend({}, n, o || {}),
            t(o.domSelector).css(o.cssProperty) !== o.cssValue) {
                e.ckUserSend("indexPageUser", "css404," + o.projectName);
                var a = t(o.cssLinkSelector);
                t.each(a, function(e, n) {
                    var o = t(n).attr("href")
                      , a = "?";
                    o.indexOf("?") > -1 && (a = "&"),
                    i.load.loadCss(o + a + "reload=" + +new Date)
                })
            }
        }
    };
    return o
}),
define("m_clickRate", ["m_zepto", "m_storage"], function(t, e) {
    function i(e) {
        this.defaultConfig = {
            key: "INDEX_CLICK_RATE",
            areaSelector: ".area-clickrate",
            linkSelector: ".lincoapp-graphic-list2 a",
            dataAttrName: "areaname",
            recentlyDays: 30
        },
        this.config = t.extend({}, this.defaultConfig, e || {}),
        this.init.call(this)
    }
    var n = window.navigator.userAgent
      , o = {
        formatNum: function(t) {
            return 10 > t && (t = "0" + t),
            t
        },
        joinDate: function(t, e, i) {
            var n = o.formatNum;
            return t + "-" + n(e) + "-" + n(i)
        },
        dateToJoin: function(t) {
            var e = t.substr(0, 4)
              , i = t.substr(4, 2)
              , n = t.substr(6);
            return [e, i, n].join("-")
        },
        dateToNum: function(t) {
            var e = "";
            return e = "string" == typeof t ? t.split("-").join("") : o.formatDate(t).split("-").join("")
        },
        formatDate: function(t) {
            var e = t.getFullYear()
              , i = t.getMonth() + 1
              , n = t.getDate();
            return o.joinDate(e, i, n)
        },
        sumArr: function(t) {
            for (var e = 0, i = 0, n = t.length; n > i; i++)
                e += t[i];
            return e
        },
        isFromUc: /ucbrowser/gi.test(n),
        isFromSafari: /iPhone.*Safari\/[0-9\.]+$/gi.test(n)
    };
    return t.extend(i.prototype, {
        init: function() {
            e.isSupportLs && (this._cache(),
            this._initLsObj(),
            this._initEvent(),
            this._scrollExp(),
            this.getClickRateResult())
        },
        _cache: function() {
            this.hasSendObj = {},
            this.scrollTimer = null,
            this.lsKey = this.config.key,
            this.dateKey = o.dateToNum(new Date)
        },
        _initLsObj: function() {
            this.config;
            this.clickRateData = e.getItem(this.lsKey) || {},
            this.clickRateData[this.dateKey] = this.clickRateData[this.dateKey] || {}
        },
        _initEvent: function() {
            var e = this.config
              , i = e.areaSelector + " " + e.linkSelector
              , n = t(window);
            t(document.body).delegate(i, "click", t.proxy(this._actClickLink, this)),
            n.on("scroll", t.proxy(this._scrollExp, this)),
            n.on("unload", t.proxy(this.writeLs, this))
        },
        _scrollExp: function() {
            var e = this
              , i = t(window)
              , n = this.config;
            this.scrollTimer && (clearTimeout(this.scrollTimer),
            this.scrollTimer = null),
            this.scrollTimer = setTimeout(function() {
                t.each(t(n.areaSelector), function(o, a) {
                    var r = t(a)
                      , s = a.getBoundingClientRect()
                      , c = a.tagName + o;
                    if (s.top < i.height() && s.bottom > 0 && !e.hasSendObj[c]) {
                        var l = r.data(n.dataAttrName);
                        e.hasSendObj[c] = !0,
                        e.updateLs("exp", l)
                    }
                })
            }, 50)
        },
        updateLs: function(t, e) {
            function i(t) {
                n[e][t] = n[e][t] ? n[e][t] + 1 : 1
            }
            var n = (this.config,
            this.dateKey,
            this.clickRateData[this.dateKey]);
            n[e] = n[e] || {},
            i("exp" === t ? "exp" : "click")
        },
        writeLs: function() {
            e.setItem({
                key: this.lsKey,
                value: this.clickRateData
            })
        },
        _actClickLink: function(e) {
            var i = this.config
              , n = t(e.target).parents(i.areaSelector)
              , a = n.data(i.dataAttrName);
            this.updateLs("click", a),
            (o.isFromUc || o.isFromSafari) && this.writeLs()
        },
        getClickRateResult: function() {
            var t = this.config
              , e = +new Date
              , i = {}
              , n = []
              , a = o.sumArr
              , r = 864e5 * t.recentlyDays;
            for (var s in this.clickRateData) {
                if (!this.clickRateData.hasOwnProperty(s))
                    return;
                if (e - +new Date(o.dateToJoin(s)) > r)
                    delete this.clickRateData[s];
                else {
                    var c = this.clickRateData[s];
                    for (var l in c) {
                        if (!c.hasOwnProperty(l))
                            return;
                        var d = c[l];
                        i[l] = i[l] || {},
                        i[l].exp = i[l].exp || [],
                        i[l].click = i[l].click || [],
                        i[l].exp.push(d.exp || 0),
                        i[l].click.push(d.click || 0)
                    }
                }
            }
            for (var s in i) {
                if (!i.hasOwnProperty(s))
                    return;
                var u = i[s]
                  , h = a(u.exp)
                  , p = a(u.click)
                  , f = p / h
                  , g = Number(f.toFixed(4) || 0);
                u.rate = g,
                n.push({
                    areaName: s,
                    rate: g,
                    totalClick: p,
                    totalExp: h
                }),
                n.sort(function(t, e) {
                    return e.rate - t.rate
                })
            }
            return n
        }
    }),
    {
        create: function(t) {
            return new i(t)
        },
        util: o
    }
}),
define("jump", ["m_zepto", "m_log", "modData", "m_storage", "m_cookie"], function(t, e, i, n, o) {
    var a = {
        init: function() {
            this._cacheDom(),
            this._hideExtBtn(),
            this._initEvent()
        },
        _cacheDom: function() {
            this.bodyEl = t(document.body),
            this.scrollTimer = null,
            this.el = t("#jumphelper"),
            this.goTop = this.el.find(".gotop"),
            this.goBot = this.el.find(".gobot"),
            this.customBtn = this.el.find("#lincoapp-btn-custom"),
            this.mainRefreshBtn = this.el.find(".main-refresh-btn"),
            t.trigger(window, "afterCreateJumpDom")
        },
        _hideExtBtn: function() {
            2 == o.get("tabVersion") && 1 === i.useDoubleTabs && (this.goBot.hide(),
            this.customBtn.hide())
        },
        _initEvent: function() {
            var i = this;
            this.goTop.bind("click", function() {
                window.scrollTo(0, 1),
                e.ckSend("indexPage", "jump,up"),
                t.trigger(window, "goTop")
            }),
            this.mainRefreshBtn.bind("click", function() {
                e.ckSend("indexPage", "clickRefresh"),
                setTimeout(function() {
                    location.reload()
                }, 300)
            }),
            this.bodyEl.bind("touchstart", function() {
                i.el.hide(),
                i.scrollTimer && (clearTimeout(i.scrollTimer),
                i.scrollTimer = null),
                i.scrollTimer = setTimeout(function() {
                    i.el.show()
                }, 1500)
            }),
            this.el.bind("touchstart", function(t) {
                t.stopPropagation()
            }),
            t(window).bind("scroll", function() {
                i.el.hide(),
                i.scrollTimer && (clearTimeout(i.scrollTimer),
                i.scrollTimer = null),
                i.scrollTimer = setTimeout(function() {
                    i.el.show()
                }, 500)
            })
        }
    };
    return a
}),
define("popupAd", ["modData", "m_log"], function(t, e) {
    var i = function(t) {
        var e = t.url || ""
          , i = t.isAd ? "跳过广告" : "跳过";
        return ['<div class="c_20150316 shortcut" id="shortcut-tx">', '<a href="' + e + '" class="u-target">', '<button class="iclose">', i, "</button>", '<img class="sct-img" src="' + t.img + '" alt="" />', '<p class="desc"></p>', "</a>", "</div>"].join("")
    }
      , n = function(t) {
        try {
            var e = "localStorage"in t && t.localStorage;
            return e && (localStorage.setItem("storage", ""),
            localStorage.removeItem("storage")),
            e
        } catch (i) {
            return !1
        }
    }(window)
      , o = function(t) {
        var e = this;
        this.adData = t,
        this.hasShowKey = "popad_" + this.adData.img,
        setTimeout(function() {
            e.init.call(e)
        }, 1e3)
    };
    return o.prototype = {
        init: function() {
            n && this._isShow() && (this._createDom(),
            this._initEvent(),
            localStorage.setItem(this.hasShowKey, 1))
        },
        _createDom: function() {
            var t = this;
            document.querySelector("body").insertAdjacentHTML("beforeend", i(t.adData)),
            this.el = document.querySelector("#shortcut-tx"),
            this.linkEl = this.el.querySelector(".u-target"),
            this.imgEl = this.el.querySelector(".sct-img"),
            this.desEl = this.el.querySelector(".desc"),
            this.imgEl.onload = function() {
                t.show()
            }
        },
        _setPos: function() {
            var t = this.linkEl
              , e = this.imgEl
              , i = 0
              , n = 0
              , o = window.innerWidth
              , a = window.innerHeight;
            this.el.style.width = o + "px",
            this.el.style.height = a + "px",
            1 > o / a ? (t.style.width = "88%",
            e.style.width = "100%",
            t.style.height = "auto",
            e.style.height = "auto",
            i = .88 * o,
            n = 850 * i / 800,
            t.style.marginTop = -(n / 2) + "px") : (t.style.height = "80%",
            e.style.height = "100%",
            t.style.width = "auto",
            e.style.width = "auto",
            n = .8 * a,
            i = 800 * n / 850,
            t.style.marginTop = -(n / 2 + 20) + "px"),
            t.style.marginLeft = -(i / 2) + "px"
        },
        _actLink: function(t) {
            t.preventDefault();
            var e = t.currentTarget
              , i = e.getAttribute("href")
              , n = t.target.tagName.toLowerCase();
            this.hide(),
            "button" != n && "p" != n && i && (location.href = i)
        },
        _actClose: function() {
            this.hide()
        },
        _initEvent: function() {
            window.addEventListener("resize", this.proxy(this._setPos, this), !1),
            window.addEventListener("orientationchange", this.proxy(this._setPos, this), !1),
            this.el.querySelector(".iclose").addEventListener("click", this.proxy(this._actClose, this), !1),
            this.desEl.addEventListener("click", this.proxy(this._actClose, this), !1),
            this.linkEl.addEventListener("click", this.proxy(this._actLink, this), !1),
            document.body.addEventListener("touchmove", this._preventMove)
        },
        _preventMove: function() {},
        _isShow: function() {
            var t = new Date
              , e = (t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate(),
            t.getHours(),
            localStorage.getItem(this.hasShowKey));
            return 1 != e || this.getQueryVal("showpopad") ? !0 : !1
        },
        show: function() {
            var t = this;
            this.el.style.display = "block",
            this._setPos(),
            setTimeout(function() {
                t.hide()
            }, 1e4),
            e.ckSend("indexPage", "showPopAd"),
            this.adData.expurl && ((new Image).src = this.adData.expurl)
        },
        hide: function() {
            document.body.removeEventListener("touchmove", this._preventMove),
            this.el.style.display = "none"
        },
        proxy: function(t, e, i) {
            return function() {
                return i ? t.apply(e, i) : t.apply(e, arguments)
            }
        },
        getQueryVal: function(t) {
            var e = location.search.substring(1);
            if (e)
                for (var i = e.split("&"), n = 0, o = i.length; o > n; n++) {
                    var a = i[n].split("=");
                    if (a[0] == t)
                        return encodeURIComponent(a[1])
                }
        }
    },
    o
}),
define("renderChannel", ["m_zepto", "modData", "m_tpl", "m_omgads", "m_swipe", "m_log"], function(t, e, i, n, o, a) {
    function r() {
        s()
    }
    function s() {
        t.bind(window, "afterRenderAds", function() {
            c();
            var e = t(x.find(".lincoapp-graphic-list2").get(0)).height();
            0 == e && (a.ckSend("indexPage", "jrywHeight0"),
            e = 1335),
            x.css("height", e)
        })
    }
    function c() {
        var t = l("front")
          , e = v.data("ids");
        d("front", t, e, 2),
        p()
    }
    function l(e) {
        var i = t("#lincoapp-home-" + e)
          , n = t(i.find("ul")[0])
          , o = n.find("li a").length;
        return o
    }
    function d(e, i, n, o) {
        t.ajax({
            url: f,
            dataType: "json",
            data: {
                areaName: e,
                pageSize: i,
                ids: n,
                pageNo: o
            },
            success: function(t) {
                0 === t.code && (w || (w = !0,
                d(e, i, t.data.ids, 3)),
                u(t.data, o))
            }
        })
    }
    function u(n, o) {
        n.listImgCutPre = m,
        n.imgPh4b3 = g,
        n.imageVer = e.imageVer,
        n.tagMap = b;
        var a = t(v.find(".tab-list-item").get(o - 1));
        a.html(i(_, n)),
        h(a, o, n.iarea)
    }
    function h(t, i, n) {
        var o = "今日要闻第" + i + "页"
          , a = "front_page" + i;
        "0" === e.imageVer && (a = "front_page" + i + "_nopic"),
        t.data("exppara", "-,-," + a + "@ver6,7,-," + o + "," + n)
    }
    function p() {
        var e = t("#lincoapp-home-front")
          , i = e.find(".paging em")
          , n = e.find(".lincoapp-pointer i")
          , r = v
          , s = new o(r[0],{
            callback: function(e, o) {
                o = t(o),
                i.text(e + 1),
                n.removeClass("selected"),
                t(n.get(e)).addClass("selected"),
                t.trigger(window, "resetImgLazyLoad");
                var s = t(r.find(".tab-list-item").get(e)).data("exppara");
                s && !y["hasSend" + e] && (y["hasSend" + e] = !0,
                a.ckSend("exp", s)),
                o.parent().css("height", o.find(".lincoapp-graphic-list2").height())
            }
        });
        t.trigger(window, "afterInitJrywSwipe", [{
            jrywSwipeIns: s
        }])
    }
    var f = "/g/index6_pos_newslist.htm?indexMode=" + e.imageVer
      , g = "data:image/gif;base64,R0lGODlhBAADAIAAAP///wAAACH5BAEHAAEALAAAAAAEAAMAAAIDjI9WADs="
      , m = "//cdn.read.html5.qq.com/image?src=3gqq&subsrc=index&q=6&r=4&imgflag=5&w=160&h=120&imageUrl=";
    4 == e.netType && (m = "//cdn.read.html5.qq.com/image?src=3gqq&subsrc=index&q=6&r=4&imgflag=5&w=320&h=240&imageUrl=");
    var v = t("#channel-front-tab-con")
      , w = !1
      , y = {}
      , b = {
        0: ["type1", "评论"],
        5: ["type3", "广告"],
        6: ["type7", "头条"],
        7: ["type3", "专辑"],
        8: ["type3", "直播"],
        9: ["type3", "专题"],
        10: ["type3", "独家"],
        11: ["type3", "测试"]
    }
      , _ = ['<ul class="lincoapp-graphic-list2<% if (imageVer === "0") { %> skin-noimg <% } %>">', "<% for (var i = 0; i < list.length; i++) { %>", "<% var item = list[i]; %>", '<% var liClass = ""; %>', '<% if (item.img === "" && imageVer === "1") { %>', '<% liClass = "noimg"; %>', "<% } %>", '<li class="<%= liClass %>">', '<a href="<%= item.url %>" class="a-lk">', '<% if (imageVer === "1") { %> <div class="detail"> <% } %>', '<strong class="tit"><%= item.title %></strong>', '<div class="info">', '<% if (imageVer === "1") { %>', "<% if (item.mark) { %>", '<span class="icon type3"><%= item.mark %></span>', "<% } else if (item.playcnt) { %>", '<span class="icon type3">爱播</span>', "<% } else if (item.tag !== 0) { %>", "<% var tagInfo = tagMap[(item.tag).toString()]; %>", '<span class="icon <%= tagInfo[0] %>"><%= tagInfo[1] %></span>', "<% } %>", "<% if (item.source) { %>", '<span class="resource"><%= item.source %></span>', "<% } %>", '<% if (item.cmt && item.cmt !== "0") { %>', '<span class="icon type1"><%= item.cmt %></span>', "<% } %>", "<% } else { %>", "<% if (item.mark) { %>", '<span class="icon type3"><%= item.mark %></span>', "<% } else if (item.playcnt) { %>", '<span class="icon type3">爱播</span>', "<% } else if (item.tag != 0) { %>", "<% var tagInfo = tagMap[(item.tag).toString()]; %>", '<span class="icon <%= tagInfo[0] %>"><%= tagInfo[1] %></span>', "<% } else { %>", '<% if (item.cmt && item.cmt !== "0") { %>', '<span class="icon type1"><%= item.cmt %></span>', "<% } %>", "<% } %>", "<% } %>", "</div>", '<% if (imageVer === "1") { %> </div> <% } %>', '<% if (item.img && imageVer === "1") { %>', '<span class="u-img">', '<img src="<%= imgPh4b3 %>" data-src="<%= listImgCutPre %><%= item.img %>" alt="" class="img">', "<% if (item.tag === 2) { %>", '<span class="ivideo"></span>', "<% } %>", "</span>", "<% } %>", "</a>", "</li>", "<% } %>", "</ul>"].join("")
      , x = t("#channel-front-tab-con").find(".tab-list-wrap");
    return {
        init: r
    }
}),
define("insertAds", ["m_zepto", "modData", "m_tpl", "m_omgads", "m_log"], function(t, e, i, n, o) {
    function a() {
        r(),
        s()
    }
    function r() {
        t.each(A, function(e, i) {
            var n = t(i)
              , o = n.data("areaname");
            o && "aibo" != o && w.push(o)
        })
    }
    function s() {
        var e = Math.ceil(w.length / 2)
          , i = T.height();
        t.each(A, function(n, o) {
            var a = (t(o),
            o.getBoundingClientRect());
            a.top < i && a.bottom > 0 && !_ && (_ = !0,
            y = e >= n + 1 ? w.splice(0, e) : w.splice(e))
        }),
        _ || (y = w.splice(0, e)),
        y.unshift("aibo"),
        b = w,
        c(y.join(","))
    }
    function c(e, i) {
        var n = h + e;
        i && (n += "&oid=" + i),
        t.ajax({
            url: n,
            dataType: "json",
            success: function(e) {
                0 === e.code ? (l(e.data),
                x || (x = !0,
                c(b, v.join(",")))) : t.trigger(window, "afterRenderAds")
            },
            error: function() {
                t.trigger(window, "afterRenderAds")
            }
        })
    }
    function l(i) {
        function n(i, n, o, a) {
            t.each(i, function(t, i) {
                switch (k++,
                i.imageVer = e.imageVer,
                i.imgPh2b1 = p,
                i.imgPh8b3 = f,
                i.imgPh4b3 = g,
                i.listImgCutPre = m,
                i.channelName = o,
                i.source = i.source || "",
                i.playcnt = i.playcnt || "",
                i.idx = k,
                i.g3_ad_type) {
                case "omgad":
                    d(i, n, a);
                    break;
                case "gdtad":
                    break;
                case "normal":
                    u(i, n);
                    break;
                default:
                    u(i, n)
                }
            })
        }
        var a = !0;
        t.each(i, function(e, i) {
            var o = t("#lincoapp-home-" + e);
            if (o.length) {
                var r = o.find("ul.lincoapp-graphic-list2")
                  , s = r[0]
                  , c = r[1];
                i.firstList && i.firstList.length && s && (n(i.firstList, t(s), e, 6),
                a = !1),
                i.secondList && i.secondList.length && c && (n(i.secondList, t(c), e, 6),
                a = !1),
                "front" === e && i.secondList && i.secondList.length && (n(i.secondList, t(s), e, 12),
                a = !1)
            }
        }),
        a && o.ckUserSend("indexPageUser", "allOmgadsEmpty"),
        x && t.trigger(window, "afterRenderAds")
    }
    function d(o, a, r) {
        var s = null;
        "1" === e.imageVer && o.adobj.empty_order && a.find("li").last().find("a").css("border-bottom", "none"),
        "3g_third_party_script" === o.adobj.display ? (o.iframeSrc = o.adobj.iframe_url + "?tclick=" + encodeURIComponent(o.adobj.link),
        s = t(i(S, o))) : s = t(i(C, o));
        var c = a.find("li");
        c.length < r ? a.append(s) : s.insertAfter(t(c.get(r - 2))),
        v.push(o.adobj.oid),
        t.trigger(window, "resetImgLazyLoad"),
        n.view({
            id: "index-list-text-" + o.channelName + "-" + o.idx,
            data: {
                ping: o.adobj.exp_url,
                reportUrlOther: o.adobj.reportUrlOther || []
            }
        })
    }
    function u(e, n) {
        setTimeout(function() {
            e.apurl = e.apurl || "",
            e.mark = e.mark || "",
            e.adLiClass = "",
            e.img || "1" !== e.imageVer || (e.adLiClass = "noimg");
            var o = t(i(I, e))
              , a = n.find("li")
              , r = a.length - 1;
            t(a.get(r)).attr("data-log-exp") && (r -= 1),
            o.insertAfter(t(a.get(r))),
            t.trigger(window, "resetImgLazyLoad"),
            "gdtad" === e.g3_ad_type && (o.data("log-exp", e.apurl + "&datatype=jsonp"),
            o.data("ratio", .5))
        }, 50)
    }
    var h = "/g/index6_area_advert.htm?indexMode=" + e.imageVer + "&areaName="
      , p = "data:image/gif;base64,R0lGODlhQAAhAIAAAP///wAAACH5BAEHAAEALAAAAABAACEAAAIujI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh0RSAQA7"
      , f = "data:image/gif;base64,R0lGODlhCAADAIAAAPD1+f///yH5BAAHAP8ALAAAAAAIAAMAAAIEhI+pVwA7"
      , g = "data:image/gif;base64,R0lGODlhAwACAIAAAP///wAAACH5BAEHAAEALAAAAAADAAIAAAICjF8AOw=="
      , m = "//cdn.read.html5.qq.com/image?src=3gqq&subsrc=index&q=6&r=4&imgflag=5&w=184&h=122&imageUrl=";
    4 == e.netType && (m = "//cdn.read.html5.qq.com/image?src=3gqq&subsrc=index&q=6&r=4&imgflag=5&w=368&h=244&imageUrl=");
    var v = []
      , w = []
      , y = []
      , b = []
      , _ = !1
      , x = !1
      , A = t(".area-clickrate")
      , T = t(window)
      , k = 0
      , C = ['<li <%if (channelName == "NBA") {%> data-log-exp="//statistic.3g.qq.com/comlog/templog?logType=indexPage&params=checkAdExp" data-ratio="0.5"<%}%> <% if (!adobj.image_url && imageVer === "1" && !adobj.image_urls) { %> class="noimg"<% } %> id="index-list-text-<%= channelName %>-<%= idx %>">', "<% if (!adobj.empty_order) { %>", '<% if (adobj.display_config_type === "big_pic") { %>', '<div class="lincoapp-publ-infonews5">', '<a href="<%= adobj.link %>"<% if (imageVer === "1") { %> class="bbtm0" <% } %>>', '<strong class="infonews-tit"><%= adobj.title %></strong>', '<span class="infonews-u-img"><img src="<%= imgPh8b3 %>" data-src="<%= adobj.image_url %>" alt=""></span>', '<span class="btn-infonews blue">广告</span>', "</a>", "</div>", '<% } else if (adobj.display_config_type === "threepic") { %>', '<a href="<%= adobj.link %>" class="a-lk <% if (imageVer === "1") { %> multi <% } %>">', '<strong class="tit"><%= adobj.title %></strong>', '<% if (adobj.image_urls && adobj.image_urls.length && imageVer === "1") { %>', '<div class="u-img">', "<% for (var i = 0; i < adobj.image_urls.length; i++) { %>", '<span class="img-wrap">', '<img src="<%= imgPh4b3 %>" data-src="<%= adobj.image_urls[i] %>" alt="" class="img">', "</span>", "<% } %>", "</div>", "<% } %>", '<% if (imageVer === "1") { %> <div class="detail"> <% } %>', '<div class="info">', '<span class="icon type3">广告</span>', "</div>", '<% if (imageVer === "1") { %> </div> <% } %>', "</a>", "<% } else { %>", '<a href="<%= adobj.link %>" class="a-lk">', '<% if (imageVer === "1") { %> <div class="detail"> <% } %>', '<strong class="tit"><%= adobj.title %></strong>', '<div class="info">', '<span class="icon type3">广告</span>', "</div>", '<% if (imageVer === "1") { %> </div> <% } %>', '<% if (adobj.image_url && imageVer === "1") { %>', '<span class="u-img">', '<img src="<%= imgPh4b3 %>" data-src="<%= listImgCutPre %><%= adobj.image_url %>" alt="" class="img">', "</span>", "<% } %>", "</a>", "<% } %>", "<% } %>", "</li>"].join("")
      , S = ['<li id="index-list-text-<%= channelName %>-<%= idx %>">', '<a href="javascript:;"><iframe src=<%= iframeSrc %> width="100%" height="74px" scrolling="no" frameborder="0"></iframe></a>', "</li>"].join("")
      , I = ['<li class="<%= adLiClass %>">', '<a href="<%= url %>" class="a-lk">', '<% if (imageVer === "1") { %> <div class="detail"> <% } %>', '<strong class="tit"><%= title %></strong>', '<div class="info">', '<% var tagClassName = "resource"; %>', '<% if (imageVer === "0") { %>', '<% tagClassName = "icon type3"; %>', "<% } %>", '<% var tagName = "广告"; %>', "<% if (source) { %>", "<% tagName = source; %>", "<% } else if (mark && !playcnt) { %>", "<% tagName = mark; %>", "<% } %>", "<% if (playcnt) { %>", '<span class="icon type3">专辑</span>', "<% } %>", '<% if (!playcnt || imageVer === "1") { %>', '<span class="<%= tagClassName %>"><%= tagName %></span>', "<% } %>", '<% if (playcnt && imageVer === "1") { %>', '<span class="icon type6"><%= playcnt %></span>', "<% } %>", "</div>", '<% if (imageVer === "1") { %> </div> <% } %>', '<% if (img && imageVer === "1") { %>', '<span class="u-img">', '<img src="<%= imgPh4b3 %>" data-src="<%= listImgCutPre %><%= img %>" alt="" class="img">', "<% if (playcnt) { %>", '<span class="ivideo"></span>', "<% } %>", "</span>", "<% } %>", "</a>", "</li>"].join("");
    return {
        init: a
    }
}),
define("insertGdtAds", ["m_zepto", "m_gdtads", "modData", "JSP", "m_stat", "m_tpl"], function(t, e, i, n, o, a) {
    function r() {
        s(),
        h.length && e(h, {
            uin: n.userInfo.qq,
            callback: function(t) {
                c(t)
            }
        })
    }
    function s() {
        t.each(f, function(e, i) {
            i = t(i);
            var n = i.data("gdtid");
            n && (h.push({
                posid: n,
                count: 1,
                type: "feeds"
            }),
            p.push(i.find(".lincoapp-graphic-list2").get(0)))
        })
    }
    function c(e) {
        t.each(e, function(e, n) {
            if (n.length) {
                var o = n[0];
                o.imageVer = i.imageVer,
                o.imgPh4b3 = l,
                o.listImgCutPre = d;
                var r = t(a(u, o))
                  , s = t(p[e])
                  , c = s.find("li");
                c.length < 5 ? s.append(r) : r.insertAfter(t(c.get(4))),
                t.trigger(window, "resetImgLazyLoad")
            }
        })
    }
    var l = "data:image/gif;base64,R0lGODlhAwACAIAAAP///wAAACH5BAEHAAEALAAAAAADAAIAAAICjF8AOw=="
      , d = "//cdn.read.html5.qq.com/image?src=3gqq&subsrc=index&q=6&r=4&imgflag=5&w=184&h=122&imageUrl=";
    4 == i.netType && (d = "//cdn.read.html5.qq.com/image?src=3gqq&subsrc=index&q=6&r=4&imgflag=5&w=368&h=244&imageUrl=");
    var u = ['<li data-log-exp="<%= apurl %>" data-ratio="0.5">', '<% if (type === "threepic") { %>', '<a href="<%= url %>" class="a-lk <% if (imageVer === "1") { %> multi <% } %>">', '<strong class="tit"><%= desc %></strong>', '<% if (img_list && img_list.length && imageVer === "1") { %>', '<div class="u-img">', "<% for (var i = 0; i < img_list.length; i++) { %>", '<span class="img-wrap">', '<img src="<%= imgPh4b3 %>" data-src="<%= img_list[i] %>" alt="" class="img">', "</span>", "<% } %>", "</div>", "<% } %>", '<% if (imageVer === "1") { %> <div class="detail"> <% } %>', '<div class="info">', '<% var tagClassName = "resource"; %>', '<% if (imageVer === "0") { %>', '<% tagClassName = "icon type3"; %>', "<% } %>", '<span class="<%= tagClassName %>">广告</span>', "</div>", '<% if (imageVer === "1") { %> </div> <% } %>', "</a>", "<% } else { %>", '<a href="<%= url %>" class="a-lk">', '<% if (imageVer === "1") { %> <div class="detail"> <% } %>', '<strong class="tit"><%= desc %></strong>', '<div class="info">', '<% var tagClassName = "resource"; %>', '<% if (imageVer === "0") { %>', '<% tagClassName = "icon type3"; %>', "<% } %>", '<span class="<%= tagClassName %>">广告</span>', "</div>", '<% if (imageVer === "1") { %> </div> <% } %>', '<% if (img && imageVer === "1") { %>', '<span class="u-img">', '<img src="<%= imgPh4b3 %>" data-src="<%= img %>" alt="" class="img">', "</span>", "<% } %>", "</a>", "<% } %>", "</li>"].join("")
      , e = e.default
      , h = []
      , p = []
      , f = t(".area-clickrate");
    return {
        init: r
    }
}),
define("initBrowserAds", ["m_zepto", "m_browserAds", "m_tpl", "modData"], function(t, e, i, n) {
    function o() {
        a()
    }
    function a() {
        var i = []
          , n = t(".browser-module-text-ad")
          , o = !1;
        t.each(n, function(e, n) {
            n = t(n);
            var o = {
                adType: "custom",
                callback: r
            }
              , a = n.data("info").split(",");
            o.adId = parseInt(a[0], 10),
            o.adKeyword = a[1] || "",
            o.pos = n,
            i.push(o)
        }),
        t.each(t(".area-clickrate"), function(e, n) {
            n = t(n);
            var o = n.data("cmsadid");
            if (o) {
                var a = 6
                  , r = n.data("areaname");
                "image" === r && (a = 15);
                var c = {
                    adType: "custom",
                    pos: a,
                    adWrap: t(n.find(".lincoapp-graphic-list2")[0]),
                    feedItem: "li",
                    adId: o,
                    forceInsert: !0,
                    callback: s
                };
                i.push(c)
            }
        }),
        i.push({
            adType: "custom",
            pos: 6,
            adWrap: t("#lincoapp-home-hotwords"),
            feedItem: "li",
            adId: 100163,
            forceInsert: !0,
            callback: s,
            eventName: "BROWSER_AD:afterRenderHotWords"
        }),
        i.length && (parseInt(10 * Math.random(), 10) + 1 > 5 && (o = !0),
        new e(i))
    }
    function r(t, e) {
        e.html(i(u, t))
    }
    function s(t, e) {
        t && (t.imgPh4b3 = c,
        t.imgPh8b3 = l,
        t.imageVer = n.imageVer,
        t.imageUrl = t.imageUrl || "",
        t.imageUrlList = t.imageUrlList || "",
        e.html(i(d, t)))
    }
    var e = e.default
      , c = "data:image/gif;base64,R0lGODlhAwACAIAAAP///wAAACH5BAEHAAEALAAAAAADAAIAAAICjF8AOw=="
      , l = "data:image/gif;base64,R0lGODlhCAADAIAAAPD1+f///yH5BAAHAP8ALAAAAAAIAAMAAAIEhI+pVwA7"
      , d = ["<% if (adSecondType == 4) { %>", '<a href="<%= link %>" class="a-lk <% if (imageVer === "1") { %> multi <% } %>">', '<strong class="tit"><%= title %></strong>', '<% if (imageVer === "1" && imageUrlList && imageUrlList.length) { %>', '<div class="u-img">', "<% for (var i = 0; i < imageUrlList.length; i++) { %>", '<span class="img-wrap">', '<img src="<%= imageUrlList[i] %>" alt="" class="img">', "</span>", "<% } %>", "</div>", "<% } %>", '<% if (imageVer === "1") { %> <div class="detail"> <% } %>', '<div class="info">', '<span class="icon type3">广告</span>', '<% if (imageVer === "1" && source) { %>', '<span class="btn-infonews"><%= source %></span>', "<% } %>", "</div>", '<% if (imageVer === "1") { %> </div> <% } %>', "</a>", "<% } else if (adSecondType == 1) { %>", '<div class="lincoapp-publ-infonews5">', '<a href="<%= link %>"<% if (imageVer === "1") { %> class="bbtm0" <% } %>>', '<strong class="infonews-tit"><%= title %></strong>', '<span class="infonews-u-img"><img src="<%= imgPh8b3 %>" data-src="<%= imageUrl %>" alt=""></span>', '<span class="btn-infonews blue">广告</span>', "<% if (source) { %>", '<span class="btn-infonews"><%= source %></span>', "<% } %>", "</a>", "</div>", "<% } else { %>", '<a href="<%= link %>" class="a-lk">', '<% if (imageVer === "1") { %> <div class="detail"> <% } %>', '<strong class="tit"><%= title %></strong>', '<div class="info">', '<span class="icon type3">广告</span>', '<% if (imageVer === "1" && source) { %>', '<span class="btn-infonews"><%= source %></span>', "<% } %>", "</div>", '<% if (imageVer === "1") { %> </div> <% } %>', '<% if (imageVer === "1" && imageUrl) { %>', '<span class="u-img">', '<img src="<%= imageUrl %>" alt="" class="img">', "</span>", "<% } %>", "</a>", "<% } %>"].join("")
      , u = ['<div class="lincoapp-home-infonews-wrap">', '<div class="lincoapp-home-infonews">', '<a href="<%= link %>" class="type1">', "<p><%= title %></p>", '<span class="btn-infonews blue">广告</span>', "</a>", "</div>", "</div>"].join("");
    return {
        init: o
    }
}),
define("m_backRecord", ["m_zepto", "m_storage"], function(t, e) {
    var i = {
        init: function(t) {
            e.isSupportLs ? (this.options = t,
            this.initStatus(),
            this.initEvent()) : t.notSupportLsCb && t.notSupportLsCb()
        },
        initStatus: function() {
            var t = this.options
              , i = e.getItem(t.key);
            i && t.initCb && t.initCb(i)
        },
        initEvent: function() {
            var i = this.options;
            t(window).on("unload", function() {
                var n = {}
                  , o = {};
                i.unloadCb && (o = i.unloadCb()),
                n = t.extend({
                    scrollTop: document.body.scrollTop
                }, o || {}),
                e.setItem({
                    key: i.key,
                    ttl: i.ttl,
                    value: n
                })
            })
        }
    };
    return i
}),
define("m_dragSort", ["m_zepto"], function(t) {
    function e(e) {
        this.defaultConfig = {
            el: "drag-wrap",
            disabledSortClass: "disabled",
            dragListSelector: "li",
            sortRstClass: "rst-item",
            activeType: "auto",
            sortAttr: "sort",
            moveClass: "move",
            holderClass: "drag",
            isNeedAnimate: !0,
            animateTime: 200,
            dragWrapId: "drag-wrap-pannel"
        },
        this.config = t.extend({}, this.defaultConfig, e || {}),
        this.el = t("#" + this.config.el),
        this.init.call(this)
    }
    !function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(t, e) {
            return setTimeout(t, e || 1)
        }
    }();
    return t.extend(e.prototype, {
        init: function() {
            this._cache(),
            this._initActiveType(),
            this._initEvent()
        },
        _cache: function() {
            this.lastTime = 0,
            this.lastMoveY = 0,
            this.lastMatchVal = "",
            this.lastDragVal = "",
            this.lastInsertType = "",
            this.hasActive = !1,
            this.hasSwitched = !1,
            this.isActiveLongTap = !1,
            this.longTapTimer = null,
            this.longTapTouchstartX = 0,
            this.longTapTouchstartY = 0,
            this.dragWrapPannel = t("#" + this.config.dragWrapId),
            this.touchStart = t.proxy(this._touchStart, this),
            this.touchMove = t.proxy(this._touchMove, this),
            this.touchEnd = t.proxy(this._touchEnd, this),
            this.longTapTouchStart = t.proxy(this._longTapTouchStart, this),
            this.longTapTouchMove = t.proxy(this._longTapTouchMove, this),
            this.longTapTouchEnd = t.proxy(this._longTapTouchEnd, this)
        },
        _initActiveType: function() {
            var t = this.config;
            switch (t.activeType) {
            case "auto":
                this.activeSort();
                break;
            case "longTap":
                this.activeLongTap()
            }
        },
        _initEvent: function() {
            var e = this
              , i = this.config
              , n = this.el
              , o = i.dragListSelector
              , a = "." + i.disabledSortClass;
            n.on("contextmenu", o, function(t) {
                return t.preventDefault(),
                t.stopPropagation(),
                !1
            }),
            n.on("click", a, function() {
                e.isActiveLongTap || t.trigger(e, "beforeActiveSort", [{
                    el: n.find(a)[0]
                }])
            })
        },
        activeSort: function() {
            var e = this
              , i = this.config
              , n = this.el
              , o = i.dragListSelector;
            this.hasActive || (this.hasActive = !0,
            n.on("touchstart", o, this.touchStart),
            t.trigger(e, "afterActiveSort"))
        },
        activeLongTap: function() {
            var t = this.config
              , e = this.el
              , i = t.dragListSelector;
            this.hasActive || (e.on("touchstart", i, this.longTapTouchStart),
            e.on("touchmove", i, this.longTapTouchMove),
            e.on("touchend", i, this.longTapTouchEnd))
        },
        lockSort: function() {
            {
                var t = this.config;
                this.el,
                t.dragListSelector
            }
            this.destroy(),
            this.hasActive = !1,
            this.isActiveLongTap = !1
        },
        _touchStart: function(e) {
            e.preventDefault(),
            e.stopPropagation();
            var i = this.config
              , n = e.touches[0]
              , o = t(e.currentTarget)
              , a = o[0].getBoundingClientRect()
              , r = this.el
              , s = i.dragListSelector
              , c = 0;
            this.isActiveLongTap = !1,
            c = this.dragWrapPannel.length > 0 && "fixed" === this.dragWrapPannel.css("position") ? this.dragWrapPannel[0].scrollTop : document.body.scrollTop,
            this.curMoveEl = o.clone(),
            this.curMoveEl.css({
                position: "fixed",
                opacity: .9,
                zIndex: 10,
                width: this._getElPureSize(o, "width"),
                height: this._getElPureSize(o, "height"),
                top: a.top - this._getMarginVal(o, "top") + c,
                left: a.left - this._getMarginVal(o, "left")
            }),
            this.curMoveEl.addClass(i.moveClass),
            this.curMoveEl.removeClass(i.sortRstClass),
            this.el.append(this.curMoveEl),
            o.addClass(i.holderClass),
            o.css("opacity", .4),
            this.curDragEl = o,
            this.touchStartX = n.clientX,
            this.touchStartY = n.clientY,
            this.lastMoveY = n.clientY,
            this.hasSwitched = !1,
            r.on("touchmove", s, this.touchMove),
            r.on("touchend", s, this.touchEnd)
        },
        _touchMove: function(e) {
            e.preventDefault(),
            e.stopPropagation();
            var i = this
              , n = this.config
              , o = e.touches[0]
              , a = n.dragListSelector
              , r = this.curMoveEl[0].getBoundingClientRect()
              , s = o.clientX - this.touchStartX
              , c = o.clientY - this.touchStartY
              , l = "translate3d(" + s + "px, " + c + "px, 0)";
            this.curMoveY = o.clientY,
            this.curMoveEl.show(),
            this.curMoveEl.css({
                transform: l,
                "-webkit-transform": l
            }),
            t.each(i.el.find(a), function(e, o) {
                if (o = t(o),
                !o.hasClass(n.holderClass) && !o.hasClass(n.moveClass)) {
                    var a = o[0].getBoundingClientRect()
                      , s = a.left + a.width / 2
                      , c = a.top + a.height / 2;
                    r.top + r.height > c && r.top < c && (i.curMoveY - i.lastMoveY > 0 ? i._actInsert("after-before", o, r, s) : i._actInsert("before-after", o, r, s))
                }
            })
        },
        _touchEnd: function(e) {
            e.preventDefault(),
            e.stopPropagation();
            var i = this.config
              , n = i.dragListSelector
              , o = []
              , a = this.el;
            this.curMoveEl.remove(),
            this.curDragEl.removeClass(i.holderClass),
            this.curDragEl.css("opacity", 1),
            o = this.getSortRst(),
            this.hasSwitched && t.trigger(this, "afterSort", [{
                sortRst: o
            }]),
            a.off("touchmove", n, this.touchMove),
            a.off("touchend", n, this.touchEnd),
            this.isActiveLongTap && (this.lockSort(),
            this.activeSort())
        },
        _longTapTouchStart: function(e) {
            /Android/gi.test(navigator.userAgent) && (e.preventDefault(),
            e.stopPropagation());
            var i = this
              , n = e.touches[0];
            this.longTapTouchstartX = n.clientX,
            this.longTapTouchstartY = n.clientY,
            i.longTapTimer = setTimeout(function() {
                t.trigger(i, "afterActiveSort"),
                i._touchStart(e),
                i.isActiveLongTap = !0
            }, 400)
        },
        _longTapTouchMove: function(t) {
            Math.abs(t.touches[0].clientX - this.longTapTouchstartX) > 1 || Math.abs(t.touches[0].clientY - this.longTapTouchstartY) > 1 ? this._clearLongTapTimer(t) : (t.preventDefault(),
            t.stopPropagation())
        },
        _longTapTouchEnd: function(t) {
            t.preventDefault(),
            t.stopPropagation(),
            this._clearLongTapTimer(t)
        },
        _clearLongTapTimer: function(e) {
            this.longTapTimer && (clearTimeout(this.longTapTimer),
            this.longTapTimer = null,
            this.isActiveLongTap || t.trigger(this, "beforeActiveSort", [{
                el: e.currentTarget
            }]))
        },
        _insertBefore: function(t, e, i) {
            e.left < i && e.left + e.width > i && (this.hasSwitched = !0,
            this._switchEl("before", t))
        },
        _insertAfter: function(t, e, i) {
            e.left + e.width >= i && e.left <= i && (this.hasSwitched = !0,
            this._switchEl("after", t))
        },
        _actInsert: function(t, e, i, n) {
            "after-before" === t ? (this._insertAfter(e, i, n),
            this._insertBefore(e, i, n)) : (this._insertBefore(e, i, n),
            this._insertAfter(e, i, n))
        },
        _switchEl: function(t, e) {
            var i = this
              , n = this.config
              , o = n.sortAttr;
            if (i.curMatchVal = e.data(o),
            i.curDragVal = i.curDragEl.data(o),
            i.curInsertType = t,
            i.curTime = +new Date,
            (i.lastMatchVal !== i.curMatchVal || i.curDragVal !== i.lastDragVal && i.lastMatchVal === i.curMatchVal || i.curInsertType !== i.lastInsertType) && i.curTime - i.lastTime > 250) {
                var a = i.curDragEl[0].getBoundingClientRect()
                  , r = e[0].getBoundingClientRect();
                "before" === t ? i.curDragEl.insertBefore(e) : i.curDragEl.insertAfter(e),
                i.lastMatchVal = i.curMatchVal,
                i.lastDragVal = i.curDragVal,
                i.lastInsertType = i.curInsertType,
                i.lastTime = i.curTime,
                i.lastMoveY = i.curMoveY,
                n.isNeedAnimate && (i._animate(r, e),
                i._animate(a, i.curDragEl))
            }
        },
        _animate: function(t, e) {
            var i = this.config
              , n = e[0].getBoundingClientRect()
              , o = t.left - n.left
              , a = t.top - n.top
              , r = "translate3d(" + o + "px," + a + "px,0)"
              , s = "all " + i.animateTime + "ms";
            e.css({
                transition: "none",
                transform: r,
                "-webkit-transition": "none",
                "-webkit-transform": r
            }),
            e[0].offsetWidth,
            e.css({
                transition: s,
                transform: "translate3d(0,0,0)",
                "-webkit-transition": s,
                "-webkit-transform": "translate3d(0,0,0)"
            }),
            clearTimeout(e.animated),
            e.animated = setTimeout(function() {
                e.css({
                    transition: "",
                    transform: "",
                    "-webkit-transition": "",
                    "-webkit-transform": ""
                })
            }, i.animateTime)
        },
        _getMarginVal: function(t, e) {
            return parseInt(t.css("margin-" + e), 10) + parseInt(t.css("border-" + e + "-width"), 10)
        },
        _getElPureSize: function(t, e) {
            var i = {
                extra1: "left",
                extra2: "right"
            };
            "height" === e && (i = {
                extra1: "top",
                extra2: "bottom"
            });
            var n = parseInt(t.css("padding-" + i.extra1)) + parseInt(t.css("padding-" + i.extra2))
              , o = parseInt(t.css("border-" + i.extra1)) + parseInt(t.css("border-" + i.extra2));
            return t[e]() - n - o + 1
        },
        _preventDefault: function(t) {
            t.preventDefault(),
            t.stopPropagation()
        },
        getSortRst: function() {
            var e = this.config
              , i = "." + e.sortRstClass
              , n = [];
            return t.each(this.el.find(i), function(t, i) {
                n.push(i.getAttribute("data-" + e.sortAttr))
            }),
            n
        },
        destroy: function() {
            var t = this.config
              , e = t.dragListSelector
              , i = this.el;
            i.off("touchstart", e, this.touchStart),
            i.off("touchmove", e, this.touchMove),
            i.off("touchend", e, this.touchEnd),
            i.off("touchstart", e, this.longTapTouchStart),
            i.off("touchmove", e, this.longTapTouchMove),
            i.off("touchend", e, this.longTapTouchEnd)
        }
    }),
    {
        create: function(t) {
            return new e(t)
        }
    }
}),
define("m_popupDragSort", ["m_zepto", "m_dragSort"], function(t, e) {
    var i = function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(t, e) {
            return setTimeout(t, e || 1)
        }
    }()
      , n = {
        TPL: "",
        moreChannelWrapId: "more-channel-wrap",
        closeClass: "iclose",
        newClass: "inew",
        notDelClass: "not-del",
        rootEl: "#page-root-el",
        dragSortConf: {
            el: "drag-wrap",
            disabledSortClass: "disabled",
            dragListSelector: "li.ds-item",
            sortRstClass: "rst-item",
            activeType: "longTap",
            sortAttr: "sort",
            moveClass: "move",
            holderClass: "drag",
            isNeedAnimate: !0,
            animateTime: 200,
            dragWrapId: "drag-wrap-pannel"
        }
    }
      , o = 0
      , a = {
        init: function(t) {
            return this._setConfig(t),
            this.config.TPL ? (this._isShow = !1,
            this._createDom(),
            this._cache(),
            this._initDragSort(),
            this._initEvent(),
            this._bindElTouchEvent(),
            "auto" === this.config.dragSortConf.activeType && this._initLongTap(),
            this) : void console.log("no TPL config")
        },
        _setConfig: function(e) {
            this.config = t.extend({}, n, e || {})
        },
        _createDom: function() {
            var e = this.config
              , i = t(document.body);
            this.el = t(e.TPL),
            i.append(this.el),
            this.setPopupHeight()
        },
        _cache: function() {
            var e = this.config;
            this.win = t(window),
            this.rootEl = t(e.rootEl),
            this.backBtn = this.el.find(".iback"),
            this.editBtn = this.el.find(".btn-operating"),
            this.dragWrap = this.el.find("#" + e.dragSortConf.el),
            this.moreChannelWrap = this.el.find("#" + e.moreChannelWrapId),
            this.isCanRemoveChannel = !0,
            this.isCanAddChannel = !0,
            this.moreChannelTouchstartX = 0,
            this.moreChannelTouchstartY = 0,
            this.initRootElHeight = this.rootEl.css("height"),
            this.initRootElOverflow = this.rootEl.css("overflow"),
            this.dragWrapTouchstart = t.proxy(this._dragWrapTouchstart, this),
            this.dragWrapTouchmove = t.proxy(this._dragWrapTouchmove, this)
        },
        _initEvent: function() {
            var e = this.win
              , i = this.config
              , n = i.closeClass
              , o = i.dragSortConf.dragListSelector;
            e.on("resize", t.proxy(this.setPopupHeight, this)),
            e.on("orientationchange", t.proxy(this.setPopupHeight, this)),
            this.backBtn.on("click", t.proxy(this.hide, this)),
            this.editBtn.on("click", t.proxy(this.edit, this)),
            this.moreChannelWrap.on("touchstart", o, t.proxy(this._moreChanelTouchstart, this)),
            this.moreChannelWrap.on("touchend", o, t.proxy(this._moreChannelTouchend, this)),
            this.dragWrap.on("touchstart", "." + n, t.proxy(this._preRemove, this)),
            this.dragWrap.on("touchend", "." + n, t.proxy(this._removeChannel, this))
        },
        _bindElTouchEvent: function() {
            /Android/gi.test(navigator.userAgent) && (this.dragWrap.on("touchstart", this.dragWrapTouchstart),
            this.dragWrap.on("touchmove", this.dragWrapTouchmove))
        },
        _unbindElTouchEvent: function() {
            /Android/gi.test(navigator.userAgent) && (this.dragWrap.off("touchstart", this.dragWrapTouchstart),
            this.dragWrap.off("touchmove", this.dragWrapTouchmove))
        },
        _dragWrapTouchstart: function(t) {
            var e = t.touches[0];
            this.dragWrapTouchstartY = e.clientY,
            this.elScrollTop = this.el.scrollTop()
        },
        _dragWrapTouchmove: function(t) {
            var e = t.touches[0]
              , i = this.dragWrapTouchstartY - e.clientY;
            this.el.scrollTop(this.elScrollTop + i)
        },
        _initLongTap: function() {
            var e = this
              , i = this.config
              , n = i.closeClass
              , o = this.dragWrap
              , a = i.dragSortConf.dragListSelector
              , r = 0
              , s = 0;
            o.on("touchstart", a, function(o) {
                var c = o.touches[0];
                o.preventDefault(),
                o.stopPropagation(),
                r = c.clientX,
                s = c.clientY,
                e.longTapTimer = setTimeout(function() {
                    t.each(e.dragWrap.find(a), function(e, o) {
                        o = t(o),
                        o.hasClass(i.notDelClass) || o.addClass(n)
                    }),
                    e.editBtn.text("完成"),
                    e.editStatus = !0
                }, 500)
            }),
            o.on("touchmove", a, function(t) {
                var i = t.touches[0];
                (Math.abs(i.clientX - r) > 1 || Math.abs(i.clientY - s) > 1) && e._clearLongTapTimer()
            }),
            o.on("touchend", a, function() {
                e._clearLongTapTimer()
            })
        },
        _moreChanelTouchstart: function(t) {
            var e = t.touches[0];
            this.moreChannelTouchstartX = e.clientX,
            this.moreChannelTouchstartY = e.clientY
        },
        _moreChannelTouchend: function(e) {
            var i = e.changedTouches[0];
            e.preventDefault(),
            e.stopPropagation(),
            Math.abs(i.clientX - this.moreChannelTouchstartX) < 2 && Math.abs(i.clientY - this.moreChannelTouchstartY) < 2 && this.addChannel(t(e.currentTarget))
        },
        _clearLongTapTimer: function() {
            this.longTapTimer && (clearTimeout(this.longTapTimer),
            this.longTapTimer = null)
        },
        _animate: function(t, e) {
            var i = e[0].getBoundingClientRect()
              , n = t.left - i.left
              , o = t.top - i.top
              , a = "translate3d(" + n + "px," + o + "px,0)"
              , r = "all 200ms";
            e.css({
                transition: "none",
                transform: a,
                "-webkit-transition": "none",
                "-webkit-transform": a
            }),
            e[0].offsetWidth,
            e.css({
                transition: r,
                transform: "translate3d(0,0,0)",
                "-webkit-transition": r,
                "-webkit-transform": "translate3d(0,0,0)"
            }),
            clearTimeout(e.animated),
            e.animated = setTimeout(function() {
                e.css({
                    transition: "",
                    transform: "",
                    "-webkit-transition": "",
                    "-webkit-transform": ""
                })
            }, 200)
        },
        _preRemove: function(t) {
            var e = t.touches[0];
            t.preventDefault(),
            t.stopPropagation(),
            this.preTouchstartX = e.clientX,
            this.preTouchstartY = e.clientY,
            this.isCanRemoveChannel = !0
        },
        addChannel: function(e) {
            var i = this
              , n = this.config
              , o = n.closeClass
              , a = n.newClass
              , r = "." + n.dragSortConf.sortRstClass;
            if (this.isCanAddChannel = !0,
            t.trigger(this, "beforeAddChannel", [{
                channelNum: this.dragWrap.find(r).length
            }]),
            this.isCanAddChannel) {
                var s = e[0].getBoundingClientRect()
                  , c = e.clone();
                e.remove(),
                c.removeClass(a),
                this.dragWrap.append(c),
                this.editStatus && c.addClass(o),
                this.config.dragSortConf.isNeedAnimate && this._animate(s, c),
                t.trigger(this, "afterAddChannel", [{
                    addItem: c,
                    channelNum: this.dragWrap.find(r).length
                }]),
                t.trigger(i, "afterSort", [{
                    type: "add",
                    sortRst: i.dragSortIns.getSortRst()
                }])
            }
        },
        _removeChannel: function(e) {
            e.preventDefault(),
            e.stopPropagation(),
            this.removeChannel(t(e.currentTarget), e)
        },
        removeChannel: function(e, i) {
            function n() {
                if (t.trigger(o, "beforeRemoveChannel", [{
                    channelNum: o.dragWrap.find(s).length
                }]),
                o.isCanRemoveChannel) {
                    var i = e[0].getBoundingClientRect()
                      , n = e.clone();
                    e.remove(),
                    n.removeClass(a.dragSortConf.holderClass),
                    n.removeClass(r),
                    n.attr("style", ""),
                    n.insertBefore(o.moreChannelWrap.find(s).get(0)),
                    o.config.dragSortConf.isNeedAnimate && o._animate(i, n),
                    t.trigger(o, "afterRemoveChannel", [{
                        removeItem: n,
                        channelNum: o.dragWrap.find(s).length
                    }]),
                    t.trigger(o, "afterSort", [{
                        type: "remove",
                        sortRst: o.dragSortIns.getSortRst()
                    }])
                }
            }
            var o = this
              , a = this.config
              , r = a.closeClass
              , s = "." + a.dragSortConf.sortRstClass;
            if (i) {
                var c = i.changedTouches[0];
                Math.abs(c.clientX - this.preTouchstartX) < 2 && Math.abs(c.clientY - this.preTouchstartY) < 2 && n()
            } else
                n()
        },
        disableRemove: function() {
            this.isCanRemoveChannel = !1
        },
        disableAdd: function() {
            this.isCanAddChannel = !1
        },
        edit: function(e) {
            var i = this
              , e = e || "finish"
              , n = this.config
              , o = this.editBtn
              , a = n.dragSortConf.dragListSelector
              , r = n.closeClass
              , s = this.dragSortIns;
            "编辑" === o.text() && "edit" !== e ? (s.lockSort(),
            s.activeSort()) : (this._bindElTouchEvent(),
            o.text("编辑"),
            this.editStatus = !1,
            this.dragWrap.find(a).removeClass(r),
            "longTap" === n.dragSortConf.activeType && (s.lockSort(),
            s.activeLongTap()),
            t.trigger(i, "finishDargSort", [{
                sortRst: i.dragSortIns.getSortRst()
            }]))
        },
        _initDragSort: function() {
            var i = this
              , n = this.config
              , o = n.dragSortConf.dragListSelector
              , a = n.closeClass;
            this.dragSortIns = e.create(n.dragSortConf),
            t.bind(this.dragSortIns, "afterSort", function(e) {
                t.trigger(i, "afterSort", [{
                    type: "changePos",
                    sortRst: e.sortRst
                }])
            }),
            t.bind(this.dragSortIns, "afterActiveSort", function() {
                t.each(i.dragWrap.find(o), function(e, i) {
                    i = t(i),
                    i.hasClass(n.notDelClass) || i.addClass(a)
                }),
                i.editBtn.text("完成"),
                i.editStatus = !0,
                i._unbindElTouchEvent()
            }),
            t.bind(this.dragSortIns, "beforeActiveSort", function(e) {
                t.trigger(i, "beforeActiveSort", [{
                    el: e.el
                }])
            }),
            t.bind(this.dragSortIns, "afterActiveSort", function() {
                t.trigger(i, "afterActiveSort")
            })
        },
        setPopupHeight: function() {
            var e = "min-height";
            "fixed" === this.el.css("position") && (e = "height"),
            this.el.css(e, t(window).height())
        },
        _preventDefaultEvent: function(t) {
            t.preventDefault(),
            t.stopPropagation()
        },
        show: function() {
            var e = this;
            o = document.body.scrollTop,
            this._isShow || (this._isShow = !0,
            this.setPopupHeight(),
            e.el.show(),
            e.el[0].offsetWidth,
            i(function() {
                e.el.css("-webkit-transform", "translate3d(0, 0, 0)")
            }),
            setTimeout(function() {
                t.trigger(e, "afterShow", [{
                    scrollTop: o
                }]),
                e.rootEl.css({
                    height: e.win.height(),
                    overflow: "hidden"
                })
            }, 300))
        },
        hide: function(e) {
            var n = this;
            if (e = "number" == typeof e ? e : o,
            this._isShow) {
                this._isShow = !1,
                i(function() {
                    n.el.css("-webkit-transform", "translate3d(100%, 0, 0)")
                });
                try {
                    this.rootEl[0].style.removeProperty("height"),
                    this.rootEl[0].style.removeProperty("overflow")
                } catch (a) {
                    console.log(a),
                    this.rootEl.attr("style", "")
                }
                window.scrollTo(0, e),
                setTimeout(function() {
                    n.el.hide()
                }, 300),
                t.trigger(this, "afterHide")
            }
        }
    };
    return a
}),
define("m_hijack", ["m_zepto", "m_log"], function(t, e) {
    function i() {
        t.each(u, function(t, e) {
            r(document.querySelector("#" + e))
        })
    }
    function n(t) {
        var e = new RegExp("(^|&)" + t + "=([^&]*)(&|$)")
          , i = location.search.substr(1).match(e);
        return null != i ? decodeURIComponent(i[2]) : null
    }
    function o() {
        var t = "iframe_hijack_redirected";
        if (n(t))
            s(0);
        else if (self != top) {
            var e = location.href
              , i = e.split("#");
            i[0] += location.search ? "&" + t + "=1" : "?" + t + "=1";
            try {
                top.location = i.join("#")
            } catch (o) {
                console.log(o)
            }
        }
    }
    function a(t) {
        var e = t ? t.srcElement : document.documentElement;
        if (e.outerHTML) {
            for (var i = /(https?:)?\/\/[a-zA-Z0-9\._-]+\.[a-zA-Z0-9]{2,8}(:[0-9]{1,10})?\/?[^'")\s]*/gi, n = /^(https?:)?\/\/([a-zA-Z0-9\._-]+\.[a-zA-Z0-9]{2,8})/i, o = [], a = [e], c = e.getElementsByTagName("*"), l = 0; l < c.length; l++)
                a.push(c[l]);
            for (var l = 0; l < a.length; l++) {
                {
                    var u = a[l]
                      , h = null;
                    u.getAttribute("id")
                }
                if ("IMG" == u.nodeName.toUpperCase() && u.src && n.test(u.src))
                    h = [u.src];
                else if ("LINK" == u.nodeName.toUpperCase()) {
                    var p = u.getAttribute("href");
                    p && n.test(p) && (h = [p])
                } else
                    "STYLE" == u.nodeName.toUpperCase() ? h = u.innerHTML.match(i) : "IFRAME" == u.nodeName.toUpperCase() && u.src && n.test(u.src) ? h = [u.src] : u.getAttribute("style") && (h = u.getAttribute("style").match(i));
                if (h) {
                    for (var f = !1, g = 0; g < h.length; g++) {
                        var m = n.exec(h[g]);
                        m && m[2] && !d.test(m[2]) && (o.push(h[g]),
                        f = !0)
                    }
                    f && r(u)
                }
            }
            o.length && (t && r(e),
            s(t ? 2 : 1, o))
        }
    }
    function r(t) {
        t && t.setAttribute("style", "display:none;position:fixed;top:-10000px;")
    }
    function s(t, e) {
        if (!g[t]) {
            g[t] = !0;
            var i = {
                project_id: p,
                department_id: h,
                hijack_type: t,
                page_url: location.href,
                blocked: 1
            };
            if (e && (i.ad_url = e.join("||")),
            1 == t && f) {
                for (var n = document.head.outerHTML, o = document.body.children, a = 0; a < o.length; a++) {
                    var r = o[a];
                    "IFRAME" == r.nodeName.toUpperCase() && r.src && 0 != r.src.indexOf("http") || (n += r.outerHTML)
                }
                n = n.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ""),
                n = n.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ""),
                i.html_dom = n
            }
            setTimeout(function() {
                l(i)
            }, 500)
        }
    }
    function c() {
        50 * Math.random() < 1 && l({
            project_id: p,
            department_id: h,
            pv: 1
        }),
        v && e.ckUserSend("hijack", "pv," + m)
    }
    function l(t) {
        var i = [];
        for (var n in t)
            i.push(n + "=" + encodeURIComponent(t[n]));
        var o = new XMLHttpRequest;
        if (o.open("POST", "http://hijack.qq.com/cgi/r", !0),
        o.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
        o.send(i.join("&")),
        v && t.hijack_type) {
            var a = ["iframe", "html", "js", "other"]
              , r = "hijack," + m + "," + a[t.hijack_type];
            t.ad_url && (r += "," + encodeURIComponent(t.ad_url)),
            e.ckUserSend("hijack", r)
        }
    }
    var d = /^.*\.(qq\.com|gtimg\.com|gtimg\.cn|qlogo\.cn|qpic\.cn)$/i
      , u = ["tlbstoolbar"]
      , h = 3
      , p = 3
      , f = !1
      , g = {}
      , m = location.protocol.replace(":", "")
      , v = !1
      , w = {
        init: function(t) {
            t = t || {},
            h = t.departmentId || h,
            p = t.projectId || p,
            f = t.isNeedReportHtml || f,
            d = t.whiteReg || d,
            u = t.blackIdArr || u,
            (5 == p || 12 == p) && (v = !0),
            this.watch()
        },
        watch: function() {
            o(),
            window.addEventListener("DOMNodeInserted", a, !1),
            a(),
            i(),
            c()
        }
    };
    return w
}),
define("shortcutIos", [], function() {
    var t = ["#shortcut-i-pannel {display:none; z-index:9999; position:fixed; width:186px; height:76px; bottom:10px; background-color:#666666; opacity:0.9; border-radius:3px; }", "#shortcut-i-pannel .con { position:relative; height:76px; }", "#shortcut-i-pannel .ic-bg {background:transparent url(//3gimg.qq.com/wap30/infoapp/touch/itravel/images/img/bg-ic.png) no-repeat scroll; -webkit-background-size: 20px auto;}", "#shortcut-i-pannel .ic-closebtn {position:absolute; right:10px; top:10px; z-index:3; width:11px; height:11px; background-position:left top;}", "#shortcut-i-pannel .tip {padding:15px 10px;}", "#shortcut-i-pannel .tip img {width:45px; height:45px; border-radius:3px; float:left; margin-right:10px;}", "#shortcut-i-pannel .tip p {color:#FFFFFF; position:relative; top:-3px; font-size:14px;}", "#shortcut-i-pannel .ic-add { display:inline-block; width:16px; height:20px; background-position:left -19px; position:relative; top:3px; margin-left:5px; }", "#shortcut-i-pannel .ic-arrow {position:absolute; width:20px; height:10px; bottom:-10px; left:83px; background-position:left -44px;}"].join("")
      , e = ['<div id="shortcut-i-pannel">', '<div class="con">', '<div class="ic-bg ic-closebtn"></div>', '<div class="tip">', '<img src="{%imgurl%}" />', '<p>先点击<span class="ic-bg ic-add"></span><br/>再"添加到主屏幕"</p>', "</div>", '<div class="ic-bg ic-arrow"></div>', "</div>", "</div>"].join("")
      , i = function(t) {
        try {
            var e = "localStorage"in t && t.localStorage;
            return e && (localStorage.setItem("storage", ""),
            localStorage.removeItem("storage")),
            e
        } catch (i) {
            return !1
        }
    }(window)
      , n = function() {
        this.dailyShowKey = "dailyShow-shortcutIos",
        this.forceCloseKey = "forceClose-shortcutIos",
        this.iconUrl = "//3gimg.qq.com/wap30/infoapp/touch/itravel/images/sc/home.png",
        this.init.call(this)
    };
    return n.prototype = {
        init: function() {
            i && this._isShow() && (this._createDom(),
            this._initEvent(),
            localStorage.setItem(this.dailyShowKey, this.getFormatDate(new Date)))
        },
        _createDom: function() {
            this.config;
            e = e.replace("{%imgurl%}", this.iconUrl),
            document.querySelector("head").insertAdjacentHTML("beforeend", "<style>" + t + "</style>"),
            document.querySelector("body").insertAdjacentHTML("beforeend", e),
            this.el = document.querySelector("#shortcut-i-pannel"),
            this.show()
        },
        _setPos: function() {
            var t = (this.config,
            document.body.clientWidth);
            this.el.style.left = (t - 186) / 2 + "px"
        },
        _actClose: function() {
            this.config;
            this.hide(),
            localStorage.setItem(this.forceCloseKey, this.getFormatDate(new Date))
        },
        _initEvent: function() {
            this.config;
            window.addEventListener("resize", this.proxy(this._setPos, this), !1),
            window.addEventListener("orientationchange", this.proxy(this._setPos, this), !1),
            this.el.querySelector(".ic-closebtn").addEventListener("click", this.proxy(this._actClose, this), !1)
        },
        _autoClose: function() {
            {
                var t = this;
                this.config
            }
            setTimeout(function() {
                t.hide()
            }, 6e3)
        },
        _isShow: function() {
            var t = (this.config,
            new Date)
              , e = (t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate(),
            t.getHours(),
            864e5)
              , i = (navigator.userAgent,
            this.getFormatDate(new Date))
              , n = localStorage.getItem(this.dailyShowKey)
              , o = localStorage.getItem(this.forceCloseKey);
            if (!this.isIosSafari())
                return !1;
            if (navigator.standalone)
                return !1;
            if (n && +new Date(i) - +new Date(n) < 7 * e)
                return !1;
            if (o) {
                if (+new Date(i) - +new Date(o) < 14 * e)
                    return !1;
                localStorage.removeItem(this.forceCloseKey)
            }
            return !0
        },
        show: function() {
            this.config;
            this._setPos(),
            this.el.style.display = "block",
            this._autoClose()
        },
        hide: function() {
            this.config;
            this.el.style.display = "none"
        },
        getFormatDate: function(t) {
            function e(t) {
                var e = t;
                return 10 > t && (e = "0" + t),
                e
            }
            var i = t.getFullYear()
              , n = t.getMonth() + 1
              , o = t.getDate();
            return i + "-" + e(n) + "-" + e(o)
        },
        isIosSafari: function() {
            var t = navigator.userAgent;
            return /iphone\s+os\s+\d/i.test(t) && !/crios/i.test(t) && !/mqqbrowser/i.test(t) && /safari\/[\d\.]+$/i.test(t) ? !0 : !1
        },
        proxy: function(t, e, i) {
            return function() {
                return i ? t.apply(e, i) : t.apply(e, arguments)
            }
        }
    },
    n
}),
define("userMessage", ["m_zepto", "JSP"], function(t, e) {
    function i() {
        o && t.ajax({
            url: a,
            type: "GET",
            dataType: "jsonp",
            success: function(t) {
                t.msg_badge && 0 == t.msg_badge.code && n(t.msg_badge.data)
            }
        })
    }
    function n(e) {
        var i = e.count
          , n = ""
          , o = r;
        if (i > 0) {
            if (i > 1)
                n = "您有" + i + "条未读消息";
            else if (n = e.msg.title,
            o = e.msg.targetUrl,
            !n)
                return;
            t('<a href="' + o + '" class="h-ad inews">' + n + "</a>").insertBefore(".header-extend")
        }
    }
    var o = e.userInfo.isLogin
      , a = "//infoapp.3g.qq.com/g//usercenter/touch/api/api.jsp?action=msg_badge&callback=?"
      , r = "//infoapp.3g.qq.com/g/s?aid=user_subshow#news";
    return {
        init: i
    }
}),
define("initPopupDragsort", ["m_zepto", "m_popupDragSort", "m_tips", "m_login", "m_tpl", "m_log", "m_storage", "modData", "m_qqWebview"], function(t, e, i, n, o, a, r, s, c) {
    var l = ['<div class="lincoapp-custom-items" id="drag-wrap-pannel" style="display:none;z-index:1001;">', "<% if (!canTitlebarCustom) { %>", '<header class="header">', "<h1>自定义首页</h1>", '<a href="javascript:;" class="iback btn-close"></a>', "</header>", "<% } %>", '<div class="items-detail">', '<div class="items-title">', '<p class="tit">首页频道 / 长按拖动排序和删除</p>', '<span class="btn-operating">编辑</span>', "</div>", '<ul class="items-list" id="drag-wrap"></ul>', '<div class="items-title">', '<p class="tit">推荐频道 / 点击添加</p>', "</div>", '<ul class="items-list" id="more-channel-wrap"></ul>', "</div>", "</div>"].join("")
      , d = ["<% for (var i = 0; i < mainChannelList.length; i++) { %>", "<% var item = mainChannelList[i]; %>", '<% var liClass = "rst-item ds-item"; %>', "<% if (item.type === 1) { %>", '<% liClass = "rst-item disabled"; %>', "<% } else if (item.type === 3) { %>", '<% liClass = "rst-item ds-item not-del"; %>', "<% } %>", '<li class="<%=liClass%>" data-sort="<%=item.areaName%>"><span><%=item.areaTitle%></span></li>', "<% } %>"].join("")
      , u = ["<% for (var i = 0; i < backChannelList.length; i++) { %>", "<% var item = backChannelList[i]; %>", '<% var liClass = (i < 2) ? "rst-item ds-item inew" : "rst-item ds-item"; %>', "<% var title = item.areaTitle; %>", '<li class="rst-item ds-item" data-sort="<%=item.areaName%>"><span><%=item.areaTitle%></span></li>', "<% } %>"].join("")
      , c = c.default
      , h = {}
      , p = s.imageVer
      , f = "/g/user_indexinfo_get.htm?indexMode=" + p
      , g = "/g/user_indexinfo_update.htm"
      , m = !0
      , v = ""
      , w = s.customChannel.minChannelNum
      , y = s.customChannel.maxChannelNum
      , b = {
        init: function() {
            var t = this;
            t.initDom(),
            t.initDragSort(),
            t.initEvent(),
            t.initChannelList()
        },
        initDom: function() {
            t("#lincoapp-btn-custom").on("click", function(e) {
                r.getItem("INDEX_CUSTOM_TIPS") || r.setItem({
                    key: "INDEX_CUSTOM_TIPS",
                    value: "show",
                    ttl: 604800
                }),
                t(e.currentTarget).find(".inew").hide(),
                h.show()
            })
        },
        initChannelList: function() {
            var e = this;
            t.ajax({
                url: f,
                dataType: "json",
                success: function(t) {
                    0 === t.code && (e.renderChannelTpl(t.data),
                    m && (m = !1,
                    v = h.dragSortIns.getSortRst().join(",")))
                }
            })
        },
        renderChannelTpl: function(t) {
            var e = o(d, t)
              , i = o(u, t);
            h.dragWrap.html(e),
            h.moreChannelWrap.html(i),
            h.setPopupHeight()
        },
        initDragSort: function() {
            var t = o(l, {
                canTitlebarCustom: c.canTitlebarCustom
            });
            h = e.init({
                TPL: t,
                rootEl: "#lincowebapp-wrapper"
            })
        },
        initEvent: function() {
            var e = this;
            t.bind(h, "afterShow", function() {
                window.scrollTo(0, 1),
                n.isLogin() || setTimeout(function() {
                    n.login(function() {})
                }, 300),
                c.canTitlebarCustom && (c.setTitleBar({
                    left: {
                        title: "返回",
                        callback: function() {
                            e.hide()
                        }
                    },
                    right: {
                        title: " ",
                        callback: function() {}
                    }
                }),
                c.setTitle("自定义首页")),
                a.ckUserSend("indexPageUser", "showCustomPannel")
            }),
            t.bind(h, "afterHide", function() {
                var t = h.dragSortIns.getSortRst().join(",");
                t !== v ? (a.ckUserSend("indexPageUser", "useCustom"),
                setTimeout(function() {
                    location.reload()
                }, 300)) : h.edit("edit"),
                c.canTitlebarCustom && (c.setTitleBar({
                    right: {
                        title: "悦图",
                        callback: function() {
                            c.openUrl("//yuetu.3g.qq.com/photo/s?aid=image&i_f=1342&_wv=1")
                        }
                    }
                }),
                c.setTitle("手机腾讯网"))
            }),
            t.bind(h, "afterSort", function(e) {
                t.ajax({
                    url: g,
                    type: "POST",
                    data: {
                        channels: e.sortRst.join(","),
                        indexMode: p
                    },
                    success: function() {}
                })
            }),
            t.bind(h, "beforeAddChannel", function(t) {
                t.channelNum > y - 1 && (this.disableAdd(),
                i.showTip("最多只允许添加" + y + "个频道", !0, "error"))
            }),
            t.bind(h, "beforeRemoveChannel", function(t) {
                t.channelNum < w + 1 && (this.disableRemove(),
                i.showTip("频道不允许少于" + w + "个", !0, "error"))
            })
        },
        show: function() {
            h.show()
        },
        hide: function(t) {
            h.hide(t)
        }
    };
    return b
}),
define("videoPlayer", ["m_zepto", "m_video", "m_browser"], function(t, e) {
    var i = '<div id="INDEX_VIDEO_WRAP" style="position:absolute; z-index: 1; left:0; top:0; width:100%; height:100%; display:none;"></div>'
      , n = {
        play: function(t) {
            var i = this
              , n = t.parents(".lincoapp-graphic-list-video")
              , o = t.data("vid")
              , a = t.data("img")
              , r = t.width()
              , s = 344 * r / 688;
            this.createVideoWrap(),
            t.append(i.videoWrap),
            this.videoIns || (this.videoIns = e.creat({
                obj: "INDEX_VIDEO_WRAP",
                videoWidth: r,
                videoHeight: s,
                resizeDefaultClientWidth: !1,
                isHtml5ShowLoadingAdOnStart: !1,
                isHtml5ShowLoadingAdOnChange: !1,
                poster: a,
                useH5Ad: !0,
                logInfo: {
                    pid: 151,
                    isSendQB: !0,
                    qbCate: "201600000000",
                    getter: function() {
                        var t = "38";
                        return n.hasClass("h0") && (t = "44"),
                        {
                            pid: 151,
                            aid: "index",
                            f_aid_ext: t
                        }
                    }
                }
            })),
            this.videoIns.setVideoPoster(a),
            this.videoIns.play(o),
            i.videoWrap.show()
        },
        pause: function() {
            this.videoIns && this.videoIns.pause()
        },
        destroy: function() {
            this.videoWrap && (this.videoIns && this.videoIns.pause(),
            this.videoIns = null,
            this.videoWrap.remove(),
            this.videoWrap = null)
        },
        getPlaytime: function() {
            return this.videoIns ? this.videoIns.getPlaytime() : void 0
        },
        createVideoWrap: function() {
            this.videoWrap || (this.videoWrap = t(i),
            t(document.body).append(this.videoWrap))
        }
    };
    return n
}),
define("otherAds", ["m_zepto", "modData", "m_tpl", "popupAd", "m_storage"], function(t, e, i, n, o) {
    function a() {
        r()
    }
    function r() {
        var e = l("floatAdTime");
        e && (d += "&showpopad=true&_floatAdTime=" + decodeURIComponent(e)),
        t.ajax({
            url: d,
            dataType: "json",
            success: function(t) {
                0 === t.code && s(t.data)
            }
        })
    }
    function s(e) {
        t.each(e, function(t, e) {
            e.firstList && e.firstList.length > 0 && c(e.areaName, e.firstList[0])
        })
    }
    function c(e, a) {
        if ("floatlayer" === e)
            new n(a);
        else {
            a.expurl = a.expurl || "";
            var r = "topad_" + a.img;
            if (!o.getItem(r)) {
                var s = t(i(u, a));
                s.insertBefore(".srch-global"),
                s.find(".btn-clse").on("click", function(t) {
                    t.stopPropagation(),
                    t.preventDefault(),
                    s.hide(),
                    o.setItem({
                        key: r,
                        value: 1,
                        ttl: 86400
                    })
                })
            }
        }
    }
    function l(t) {
        var e = location.search.substring(1);
        if (e)
            for (var i = e.split("&"), n = 0, o = i.length; o > n; n++) {
                var a = i[n].split("=");
                if (a[0] == t)
                    return encodeURIComponent(a[1])
            }
    }
    var d = "/g/index6_area_advert.htm?indexMode=" + e.imageVer + "&areaName=headBanner,floatlayer"
      , u = ['<div class="lincoapp-home-infonews-wrap" id="header-mlcz" <% if (expurl) { %> data-log-exp="<%= expurl %>" <% } %>>', '<div class="lincoapp-home-infonews skin-infonews">', '<a href="<%= url %>" class="type2">', '<img src="<%= img %>" alt="<%= title %>" />', '<span class="btn-infonews" style="display:none;"></span>', '<span class="btn-clse"></span>', "</a>", "</div>", "</div>"].join("");
    return {
        init: a
    }
}),
define("viewMore", ["m_zepto", "m_log"], function(t, e) {
    function i() {
        t.each(n, function(i, n) {
            var o = t(n)
              , a = o.attr("id")
              , r = "";
            a && (r = a.split("-")[2],
            r && o.delegate(".lincoapp-home-more", "click", function() {
                var i = o.find(".skin-graphic-list2-more")
                  , n = o.find(".lincoapp-home-more2");
                i.show(),
                n.show(),
                t(this).hide(),
                t.trigger(window, "resetImgLazyLoad"),
                e.ckSend("indexPage", "channelViewMore," + r)
            }))
        })
    }
    var n = t("#lincowebapp-wrapper .lincoapp-home-section .home-bd");
    return {
        init: i
    }
}),
define("gameApp", ["m_zepto", "m_tpl", "m_browser"], function(t, e, i) {
    function n() {
        i.isFromAndroid && t.ajax({
            url: s,
            type: "GET",
            dataType: "json",
            success: function(t) {
                if (0 == t.code && 0 == t.getAppGamePageListBatch.code) {
                    var e = (t.getAppGamePageListBatch.data || {}).homepage_hot_list || [];
                    o(e),
                    a()
                }
            }
        })
    }
    function o(i) {
        var n = t("#lincoapp-home-gameapp")
          , o = {
            list: i
        };
        n.html(e(r, o)),
        t.trigger(window, "resetImgLazyLoad")
    }
    function a() {
        t("#lincoapp-home-gameapp").delegate("ul li a", "click", function(e) {
            var i = t(e.currentTarget);
            location.href = i.data("href")
        })
    }
    var r = ['<div class="lincoapp-home-list3">', '<ul class="list">', "<% for (var i = 0, len = list.length; i < len; i++) { %>", "<% var item = list[i]; %>", "<li>", '<a href="javascript:;" data-href="<%=item.downloadUrl%>&iarea=268" class="lk lk-game">', '<span class="u-img">', '<img data-src="//cdn.read.html5.qq.com/image?src=3gqq&subsrc=index&q=6&r=4&imgflag=5&w=80&h=80&imageUrl=<%=item.iconUrl%>" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEHAAEALAAAAAABAAEAAAICTAEAOw==" alt="<%=item.gameName%>" class="img">', "</span>", '<p class="p-tit"><%=item.gameName%></p>', "</a>", "</li>", "<% if (i == 4) { %>", '</ul><ul class="list">', "<% } %>", "<% } %>", "</ul>", "</div>"].join("")
      , s = ["//infoapp.3g.qq.com/g/info_common_pages/webapp_action_api.jsp?module=appgame", "action=getAppGamePageListBatch&listIds=homepage_hot_list&pageNo=1&pageSize=10&from=home"].join("&");
    return {
        init: n
    }
}),
define("guessLike", ["m_zepto", "m_tpl", "m_crossStorage", "modData"], function(t, e, i, n) {
    function o() {
        function e() {
            l && clearTimeout(l),
            l = setTimeout(function() {
                document.body.scrollTop + d > c.offset().top - 800 && !u && n()
            }, 100)
        }
        function n() {
            h.onConnect().then(function() {
                return h.get("GLOBAL_RECENTLY_READ", "GLOBAL_USER_MODEL")
            }).then(function(t) {
                o(t)
            })["catch"](function() {
                o([null, null])
            })
        }
        function o(t) {
            a(t),
            r || (u = !0,
            s.unbind("scroll", e))
        }
        var r = !0
          , s = t(window)
          , l = null
          , d = s.height()
          , u = !1
          , h = new i;
        r ? n() : s.bind("scroll", e),
        r || e()
    }
    function a(e) {
        for (var i = e[0] || [], n = e[1] || {}, o = [], a = n.topics || {}, c = 0, l = i.length; l > c; c++) {
            var d = i[c];
            o.push(d.id)
        }
        o = o.join(","),
        a = JSON.stringify(a),
        t.ajax({
            url: s,
            type: "POST",
            dataType: "json",
            withCredentials: !0,
            data: {
                action: "recommendList2",
                pageNo: 1,
                pageSize: 10,
                from: "index",
                readHistory: o,
                model: a
            },
            success: function(t) {
                if (0 == t.code && 0 == t.recommendList2.code) {
                    var e = (t.recommendList2.data || {}).news || [];
                    r(e)
                }
            }
        })
    }
    function r(i) {
        if (!(i.length < 1)) {
            var o = {
                list: i,
                imgCutType: l,
                imageVer: n.imageVer
            };
            c.html(e(d, o)),
            c.parent().show(),
            t.trigger(window, "resetImgLazyLoad")
        }
    }
    var s = "//infoapp.3g.qq.com/g/recommend/api.jsp"
      , c = t("#lincoapp-home-guess")
      , l = n.imgCutType
      , d = ["<% var len = list.length; %>", '<% var RECOM_URL = "/g/s?aid=index&g_ut=3&g_ver=0&tab=recom"; %>', '<% var imgPrefix = "//cdn.read.html5.qq.com/image?src=3gqq&subsrc=index&q=6&r=4&imgflag=5&w=184&h=122&imageUrl="; %>', '<% var imgPh4b3 = "data:image/gif;base64,R0lGODlhAwACAIAAAP///wAAACH5BAEHAAEALAAAAAADAAIAAAICjF8AOw=="; %>', '<div class="lincoapp-home-title">', '<h2 class="tit"><a href="<%=RECOM_URL%>&i_f=860">', '<span>智能推荐</span><span class="tips-user-recom"></span>', "</a></h2>", "</div>", '<% var ulClassName = ""; %>', "<% if (imageVer == 0) { %>", '<% ulClassName = "skin-noimg"; %>', "<% } %>", '<ul class="lincoapp-graphic-list2 <%= ulClassName %>">', "<% for (var i = 0; i < len; i++) { %>", "<% if (i < 6) { %>", "<% var item = list[i]; %>", '<li<% if (item.images.length < 1) { %> class="noimg"<% } %>>', '<a href="<%=item.url%>&i_f=206&icfa=home_touch&iarea=263&from=index&f_pid=135&f_aid_ext=263" class="a-lk">', "<% if (imageVer == 1) { %>", '<div class="detail">', "<% } %>", '<strong class="tit"><%=item.title%></strong>', '<div class="info">', "<% if (imageVer == 1) { %>", '<span class="resource"><%=item.source%></span>', "<% } %>", '<span class="icon type6"><%=item.readNum%></span></div>', "<% if (imageVer == 1) { %>", "</div>", "<% } %>", "<% if (item.images.length > 0 && imageVer == 1) { %>", "<% if (imgCutType == 2) { %>", '<span class="u-img2 lazybg" data-src="<%=item.images[0]%>"></span>', "<% } else { %>", '<span class="u-img">', '<img src="<%=imgPh4b3%>" data-src="<%=imgPrefix%><%=item.images[0]%>" alt="" class="img">', "</span>", "<% } %>", "<% } %>", "</a>", "</li>", "<% } %>", "<% } %>", "</ul>", '<a href="<%= RECOM_URL%>&i_f=1049" class="lincoapp-home-more2">更多精彩推荐</a>'].join("");
    return {
        init: o
    }
}),
define("weather", ["m_zepto", "m_tpl", "m_cookie"], function(t, e, i) {
    function n() {
        o()
    }
    function o(e) {
        var i = p;
        e && (i += "&cityName=" + e),
        t.ajax({
            url: i,
            type: "GET",
            dataType: "json",
            withCredentials: !0,
            success: function(t) {
                0 === t.code && t.get_weather && 0 === t.get_weather.code && (a(t.get_weather.data),
                c())
            }
        })
    }
    function a(t) {
        t.airQlt = s(t.aqi.value),
        t.warn = t.alert,
        t.warnClassMap = g,
        t.localArticles = t.localArticles || null,
        t.randomNews = t.localArticles && t.localArticles.list && t.localArticles.list.length ? r(t.localArticles.list) : null,
        f.html(e(h, t)),
        f.parent().show(),
        u()
    }
    function r(t) {
        var e = t && t.length > 0 ? t.slice(0, 5).sort(function() {
            return .5 - Math.random()
        }) : null;
        return e
    }
    function s(t) {
        var e = ["red", "优"];
        return 50 >= t ? e[0] = "normal" : t > 50 && 100 >= t ? (e[0] = "normal",
        e[1] = "良") : t > 100 && 150 >= t ? e[1] = "轻度污染" : t > 150 && 200 >= t ? e[1] = "中度污染" : t > 200 && 300 >= t ? e[1] = "重度污染" : t > 300 && 500 >= t ? e[1] = "严重污染" : t > 500 ? e[1] = "爆表" : (e[0] = "normal",
        e[1] = "未知"),
        e
    }
    function c() {
        f.delegate(".location", "click", function() {
            var e = t(this);
            e.removeClass("location"),
            e.addClass("rotating"),
            navigator.geolocation ? navigator.geolocation.getCurrentPosition(l, d) : (alert("不支持定位，请点击进入天气页面手动选择"),
            u())
        })
    }
    function l(e) {
        var n = e.coords.latitude
          , a = e.coords.longitude
          , r = ["location=" + n + "," + a, "key=A27BZ-5PWHS-TZJOM-6QFEG-G44MK-WEBGO", "output=jsonp", "callback=?"].join("&");
        t.ajax({
            url: "//apis.map.qq.com/ws/geocoder/v1/?" + r,
            dataType: "jsonp",
            success: function(t) {
                if (0 === t.status) {
                    var e = t.result.address_component.city;
                    e ? (e = e.substr(0, e.length - 1),
                    i.set("defaultcity", e, 7, ".3g.qq.com"),
                    o(e)) : u()
                } else
                    u()
            }
        })
    }
    function d() {
        alert('定位失败，请在"设置-隐私"中开启定位服务'),
        u()
    }
    function u() {
        var t = f.find(".lct-btn");
        t.removeClass("rotating"),
        t.addClass("location")
    }
    var h = ['<div class="lincoapp-weather">', '<% var cityName = encodeURIComponent(aqi.cityName || attention.replace(/(，|,).+/, "")); %>', '<a href="//infoapp.3g.qq.com/g/s?aid=weather&iarea=137&icfa=home_touch&f_pid=135&#home/cityname=<%= cityName %>" class="lk">', '<div class="info">', '<span class="ifont ifont-w<%= condition.icon %>"></span><span class="degree"><em><%= condition.temp %></em><sup>°</sup></span>', '<div class="desc">', "<p><%= condition.condition %></p>", '<p><%= aqi.cityName || attention.replace(/(，|,).+/, "")%></p>', "<% if (warn && warn.length && warn[0].level) { %>", '<span class="<%= warnClassMap[warn[0].level] %>"><%= warn[0].level %>预警</span>', "<% } %>", "</div>", "</div>", '<div class="info">', '<span class="quality"><%= aqi.value || "未知"%></span>', '<div class="desc">', "<p>PM2.5</p>", '<p class="<%= airQlt[0] %>"><%= airQlt[1] %></p>', "</div>", "</div>", "</a>", '<span class="location2"><a href="//infoapp.3g.qq.com/g/s?aid=weather&iarea=137&icfa=home_touch&f_pid=135&backUrl=index#city">切换城市</a></span>', "</div>", "<% if (randomNews && randomNews.length) { %>", "<% var weatherNews = randomNews[0]; %>", '<div class="lincoapp-localnews" data-log-exp="templog" data-log-exp-type="exp" data-log-params="-,-,localNews@ver6,7,-,本地新闻,346">', '<a href="<%= weatherNews.url %>&f_pid=135&iarea=346">本地：<%= weatherNews.title %></a>', "</div>", "<% } %>"].join("")
      , p = "//infoapp.3g.qq.com/g/s?aid=action_api&module=weather&action=get_weather&withLocalNews=true"
      , f = t("#lincoapp-home-weather")
      , g = {
        "蓝色": "warning-lev1",
        "黄色": "warning-lev2",
        "橙色": "warning-lev3",
        "红色": "warning-lev4"
    };
    return {
        init: n
    }
}),
define("novel", ["m_zepto", "m_tpl", "modData"], function(t, e, i) {
    function n() {
        t.ajax({
            url: "https://bookshelf.html5.qq.com/data/ajax?m=recommFor3gQQ&v=" + +new Date,
            dataType: "json",
            success: function(t) {
                0 === t.ret && o(t)
            }
        })
    }
    function o(n) {
        if (!(n.rows && n.rows.length < 1)) {
            var o = t("#lincoapp-home-novel");
            n.imageVer = i.imageVer,
            o.html(e(a, n)),
            o.parent().show(),
            t.trigger(window, "resetImgLazyLoad")
        }
    }
    var a = ['<% var imgPh4b3 = "data:image/gif;base64,R0lGODlhAwACAIAAAP///wAAACH5BAEHAAEALAAAAAADAAIAAAICjF8AOw=="; %>', '<% var imgCutPrefix = "//cdn.read.html5.qq.com/image?src=3gqq&subsrc=index&q=6&r=4&imgflag=5&w=184&h=122&imageUrl="; %>', '<div class="lincoapp-home-novel">', '<div class="lincoapp-home-title">', '<h2 class="tit"><a href="<%=more.url%>">小说</a></h2>', '<div class="title-more">', "<% for (var i = 0; i < catalog.length; i++) { %>", "<% var item = catalog[i]; %>", '<a href="<%=item.url%>"><%=item.name%></a>', "<% } %>", "</div>", "</div>", '<ul class="lincoapp-graphic-list2 <% if (imageVer === "0") { %>skin-noimg"<% } %>">', "<% for (var i = 0; i < rows.length; i++) { %>", "<% var item = rows[i]; %>", "<% var subject = item.subject.substr(0, 2); %>", '<li><a href="<%=item.url%>" class="a-lk">', '<% if (imageVer === "1") { %> <div class="detail"> <% } %>', '<strong class="tit"><%=item.brief%></strong>', '<div class="info">', '<span class="icon type3"><%=subject%></span>', '<% if (imageVer === "1") { %>', '<span class="author"><%=item.author%></span>', "<% } %>", "</div>", '<% if (imageVer === "1") { %> </div> <% } %>', '<% if (imageVer === "1") { %>', '<span class="u-img"><img src="<%=imgPh4b3%>" data-src="<%=imgCutPrefix%><%=item.picurl%>" alt="" class="img"></span>', "<% } %>", "</a></li>", "<% } %>", "</ul>", '<a href="<%=more.url%>" class="lincoapp-home-more2"><%=more.name%></a>', "</div>"].join("");
    return {
        init: n
    }
}),
define("game", ["m_zepto", "m_tpl", "modData"], function(t, e, i) {
    function n() {
        t.ajax({
            url: "//portal.3g.qq.com/portal/api/portal@getQbGameData?adparams=100076@100077@100078@100079",
            dataType: "json",
            success: function(t) {
                t = t["portal@getQbGameData"],
                0 === t.code && t.data && t.data.list && t.data.list.length && o(t.data)
            }
        })
    }
    function o(n) {
        if (!(n.rows && n.rows.length < 1)) {
            var o = t("#lincoapp-home-game");
            n.imageVer = i.imageVer,
            o.html(e(a, n)),
            o.parent().show(),
            t.trigger(window, "resetImgLazyLoad")
        }
    }
    var a = ['<% var imgPh4b3 = "data:image/gif;base64,R0lGODlhAwACAIAAAP///wAAACH5BAEHAAEALAAAAAADAAIAAAICjF8AOw=="; %>', '<% var imgCutPrefix = "//cdn.read.html5.qq.com/image?src=3gqq&subsrc=index&q=6&r=4&imgflag=5&w=184&h=122&imageUrl="; %>', '<div class="lincoapp-home-game">', '<div class="lincoapp-home-title">', '<h2 class="tit"><a href="<%=extendInfo.stLoadMore.sUrl%>">游戏</a></h2>', '<div class="title-more">', "<% for (var i = 0; i < extendInfo.vTagList.length; i++) { %>", "<% var item = extendInfo.vTagList[i]; %>", '<a href="<%=item.sUrl%>"><%=item.sName%></a>', "<% } %>", "</div>", "</div>", '<ul class="lincoapp-graphic-list2 <% if (imageVer === "0") { %>skin-noimg"<% } %>">', "<% for (var i = 0; i < list.length; i++) { %>", "<% var item = list[i].vAdsData[0]; %>", '<li data-log-exp="<%=item.sStatUrl%>" data-ratio="0.5"><a href="<%=item.sUrl%>" class="a-lk">', '<% if (imageVer === "1") { %> <div class="detail"> <% } %>', '<strong class="tit"><%=item.sText%></strong>', '<div class="info">', '<span class="icon type3"><%=item.sTitle%></span>', "</div>", '<% if (imageVer === "1") { %> </div> <% } %>', '<% if (imageVer === "1") { %>', '<span class="u-img"><img src="<%=imgPh4b3%>" data-src="<%=imgCutPrefix%><%=item.sImgUrl%>" alt="" class="img"></span>', "<% } %>", "</a></li>", "<% } %>", "</ul>", '<a href="<%=extendInfo.stLoadMore.sUrl%>" class="lincoapp-home-more2"><%=extendInfo.stLoadMore.sName%></a>', "</div>"].join("");
    return {
        init: n
    }
}),
define("m_promise", [], function() {
    "use strict";
    function t(t) {
        return "function" == typeof t || "object" == typeof t && null !== t
    }
    function e(t) {
        return "function" == typeof t
    }
    function i(t) {
        return "object" == typeof t && null !== t
    }
    function n(t) {
        U = t
    }
    function o(t) {
        V = t
    }
    function a() {
        return function() {
            process.nextTick(d)
        }
    }
    function r() {
        return function() {
            z(d)
        }
    }
    function s() {
        var t = 0
          , e = new X(d)
          , i = document.createTextNode("");
        return e.observe(i, {
            characterData: !0
        }),
        function() {
            i.data = t = ++t % 2
        }
    }
    function c() {
        var t = new MessageChannel;
        return t.port1.onmessage = d,
        function() {
            t.port2.postMessage(0)
        }
    }
    function l() {
        return function() {
            setTimeout(d, 1)
        }
    }
    function d() {
        for (var t = 0; B > t; t += 2) {
            var e = $[t]
              , i = $[t + 1];
            e(i),
            $[t] = void 0,
            $[t + 1] = void 0
        }
        B = 0
    }
    function u() {
        try {
            var t = require
              , e = t("vertx");
            return z = e.runOnLoop || e.runOnContext,
            r()
        } catch (i) {
            return l()
        }
    }
    function h() {}
    function p() {
        return new TypeError("You cannot resolve a promise with itself")
    }
    function f() {
        return new TypeError("A promises callback cannot return that same promise.")
    }
    function g(t) {
        try {
            return t.then
        } catch (e) {
            return te.error = e,
            te
        }
    }
    function m(t, e, i, n) {
        try {
            t.call(e, i, n)
        } catch (o) {
            return o
        }
    }
    function v(t, e, i) {
        V(function(t) {
            var n = !1
              , o = m(i, e, function(i) {
                n || (n = !0,
                e !== i ? b(t, i) : x(t, i))
            }, function(e) {
                n || (n = !0,
                A(t, e))
            }, "Settle: " + (t._label || " unknown promise"));
            !n && o && (n = !0,
            A(t, o))
        }, t)
    }
    function w(t, e) {
        e._state === K ? x(t, e._result) : e._state === Z ? A(t, e._result) : T(e, void 0, function(e) {
            b(t, e)
        }, function(e) {
            A(t, e)
        })
    }
    function y(t, i) {
        if (i.constructor === t.constructor)
            w(t, i);
        else {
            var n = g(i);
            n === te ? A(t, te.error) : void 0 === n ? x(t, i) : e(n) ? v(t, i, n) : x(t, i)
        }
    }
    function b(e, i) {
        e === i ? A(e, p()) : t(i) ? y(e, i) : x(e, i)
    }
    function _(t) {
        t._onerror && t._onerror(t._result),
        k(t)
    }
    function x(t, e) {
        t._state === J && (t._result = e,
        t._state = K,
        0 !== t._subscribers.length && V(k, t))
    }
    function A(t, e) {
        t._state === J && (t._state = Z,
        t._result = e,
        V(_, t))
    }
    function T(t, e, i, n) {
        var o = t._subscribers
          , a = o.length;
        t._onerror = null,
        o[a] = e,
        o[a + K] = i,
        o[a + Z] = n,
        0 === a && t._state && V(k, t)
    }
    function k(t) {
        var e = t._subscribers
          , i = t._state;
        if (0 !== e.length) {
            for (var n, o, a = t._result, r = 0; r < e.length; r += 3)
                n = e[r],
                o = e[r + i],
                n ? I(i, n, o, a) : o(a);
            t._subscribers.length = 0
        }
    }
    function C() {
        this.error = null
    }
    function S(t, e) {
        try {
            return t(e)
        } catch (i) {
            return ee.error = i,
            ee
        }
    }
    function I(t, i, n, o) {
        var a, r, s, c, l = e(n);
        if (l) {
            if (a = S(n, o),
            a === ee ? (c = !0,
            r = a.error,
            a = null) : s = !0,
            i === a)
                return void A(i, f())
        } else
            a = o,
            s = !0;
        i._state !== J || (l && s ? b(i, a) : c ? A(i, r) : t === K ? x(i, a) : t === Z && A(i, a))
    }
    function L(t, e) {
        try {
            e(function(e) {
                b(t, e)
            }, function(e) {
                A(t, e)
            })
        } catch (i) {
            A(t, i)
        }
    }
    function q(t, e) {
        var i = this;
        i._instanceConstructor = t,
        i.promise = new t(h),
        i._validateInput(e) ? (i._input = e,
        i.length = e.length,
        i._remaining = e.length,
        i._init(),
        0 === i.length ? x(i.promise, i._result) : (i.length = i.length || 0,
        i._enumerate(),
        0 === i._remaining && x(i.promise, i._result))) : A(i.promise, i._validationError())
    }
    function E(t) {
        return new ie(this,t).promise
    }
    function P(t) {
        function e(t) {
            b(o, t)
        }
        function i(t) {
            A(o, t)
        }
        var n = this
          , o = new n(h);
        if (!W(t))
            return A(o, new TypeError("You must pass an array to race.")),
            o;
        for (var a = t.length, r = 0; o._state === J && a > r; r++)
            T(n.resolve(t[r]), void 0, e, i);
        return o
    }
    function D(t) {
        var e = this;
        if (t && "object" == typeof t && t.constructor === e)
            return t;
        var i = new e(h);
        return b(i, t),
        i
    }
    function j(t) {
        var e = this
          , i = new e(h);
        return A(i, t),
        i
    }
    function M() {
        throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
    }
    function N() {
        throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
    }
    function F(t) {
        this._id = se++,
        this._state = void 0,
        this._result = void 0,
        this._subscribers = [],
        h !== t && (e(t) || M(),
        this instanceof F || N(),
        L(this, t))
    }
    var R;
    R = Array.isArray ? Array.isArray : function(t) {
        return "[object Array]" === Object.prototype.toString.call(t)
    }
    ;
    var z, U, O, W = R, B = 0, V = ({}.toString,
    function(t, e) {
        $[B] = t,
        $[B + 1] = e,
        B += 2,
        2 === B && (U ? U(d) : O())
    }
    ), H = "undefined" != typeof window ? window : void 0, Q = H || {}, X = Q.MutationObserver || Q.WebKitMutationObserver, G = "undefined" != typeof process && "[object process]" === {}.toString.call(process), Y = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel, $ = new Array(1e3);
    O = G ? a() : X ? s() : Y ? c() : void 0 === H && "function" == typeof require ? u() : l();
    var J = void 0
      , K = 1
      , Z = 2
      , te = new C
      , ee = new C;
    q.prototype._validateInput = function(t) {
        return W(t)
    }
    ,
    q.prototype._validationError = function() {
        return new Error("Array Methods must be provided an Array")
    }
    ,
    q.prototype._init = function() {
        this._result = new Array(this.length)
    }
    ;
    var ie = q;
    q.prototype._enumerate = function() {
        for (var t = this, e = t.length, i = t.promise, n = t._input, o = 0; i._state === J && e > o; o++)
            t._eachEntry(n[o], o)
    }
    ,
    q.prototype._eachEntry = function(t, e) {
        var n = this
          , o = n._instanceConstructor;
        i(t) ? t.constructor === o && t._state !== J ? (t._onerror = null,
        n._settledAt(t._state, e, t._result)) : n._willSettleAt(o.resolve(t), e) : (n._remaining--,
        n._result[e] = t)
    }
    ,
    q.prototype._settledAt = function(t, e, i) {
        var n = this
          , o = n.promise;
        o._state === J && (n._remaining--,
        t === Z ? A(o, i) : n._result[e] = i),
        0 === n._remaining && x(o, n._result)
    }
    ,
    q.prototype._willSettleAt = function(t, e) {
        var i = this;
        T(t, void 0, function(t) {
            i._settledAt(K, e, t)
        }, function(t) {
            i._settledAt(Z, e, t)
        })
    }
    ;
    var ne = E
      , oe = P
      , ae = D
      , re = j
      , se = 0
      , ce = F;
    return F.all = ne,
    F.race = oe,
    F.resolve = ae,
    F.reject = re,
    F._setScheduler = n,
    F._setAsap = o,
    F._asap = V,
    F.prototype = {
        constructor: F,
        then: function(t, e) {
            var i = this
              , n = i._state;
            if (n === K && !t || n === Z && !e)
                return this;
            var o = new this.constructor(h)
              , a = i._result;
            if (n) {
                var r = arguments[n - 1];
                V(function() {
                    I(n, o, r, a)
                })
            } else
                T(i, o, t, e);
            return o
        },
        "catch": function(t) {
            return this.then(null, t)
        }
    },
    ce
}),
define("m_crossStorage", ["m_promise"], function(t) {
    function e(n) {
        n = n || {};
        var o = n.proxyUrl || i;
        this._id = e._generateUUID(),
        this._promise = t,
        this._frameId = n.frameId || "CrossStorageClient-" + this._id,
        this._origin = e._getOrigin(o),
        this._requests = {},
        this._connected = !1,
        this._closed = !1,
        this._count = 0,
        this._timeout = n.timeout || 3e3,
        this._listener = null,
        this._installListener();
        var a;
        n.frameId && (a = document.getElementById(n.frameId)),
        a && this._poll(),
        a = a || this._createFrame(o),
        this._hub = a.contentWindow
    }
    var i = "//proxy.3g.qq.com/wap30/crossStorage/proxy.html";
    e.frameStyle = {
        display: "none",
        position: "absolute",
        top: "-999px",
        left: "-999px"
    },
    e._getOrigin = function(t) {
        var e, i, n;
        return e = document.createElement("a"),
        e.href = t,
        e.host || (e = window.location),
        i = e.protocol && ":" !== e.protocol ? e.protocol : window.location.protocol,
        n = i + "//" + e.host,
        n = n.replace(/:80$|:443$/, "")
    }
    ,
    e._generateUUID = function() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
            var e = 16 * Math.random() | 0
              , i = "x" == t ? e : 3 & e | 8;
            return i.toString(16)
        })
    }
    ,
    e.prototype.onConnect = function() {
        var t = this;
        return this._connected ? this._promise.resolve() : this._closed ? this._promise.reject(new Error("CrossStorageClient has closed")) : (this._requests.connect || (this._requests.connect = []),
        new this._promise(function(e, i) {
            var n = setTimeout(function() {
                i(new Error("CrossStorageClient could not connect"))
            }, t._timeout);
            t._requests.connect.push(function(t) {
                return clearTimeout(n),
                t ? i(t) : void e()
            })
        }
        ))
    }
    ,
    e.prototype.set = function(t, e, i) {
        return this._request("set", {
            key: t,
            value: e,
            ttl: i
        })
    }
    ,
    e.prototype.get = function() {
        var t = Array.prototype.slice.call(arguments);
        return this._request("get", {
            keys: t
        })
    }
    ,
    e.prototype.del = function() {
        var t = Array.prototype.slice.call(arguments);
        return this._request("del", {
            keys: t
        })
    }
    ,
    e.prototype.clear = function() {
        return this._request("clear")
    }
    ,
    e.prototype.getKeys = function() {
        return this._request("getKeys")
    }
    ,
    e.prototype.close = function() {
        var t = document.getElementById(this._frameId);
        t && t.parentNode.removeChild(t),
        window.removeEventListener ? window.removeEventListener("message", this._listener, !1) : window.detachEvent("onmessage", this._listener),
        this._connected = !1,
        this._closed = !0
    }
    ,
    e.prototype._installListener = function() {
        var t = this;
        this._listener = function(e) {
            var i, n, o;
            if (!t._closed && e.data && "string" == typeof e.data && e.origin === t._origin)
                if ("cross-storage:unavailable" !== e.data) {
                    if (-1 !== e.data.indexOf("cross-storage:") && !t._connected) {
                        if (t._connected = !0,
                        !t._requests.connect)
                            return;
                        for (i = 0; i < t._requests.connect.length; i++)
                            t._requests.connect[i](n);
                        delete t._requests.connect
                    }
                    if ("cross-storage:ready" !== e.data) {
                        try {
                            o = JSON.parse(e.data)
                        } catch (a) {
                            return
                        }
                        o.id && t._requests[o.id] && t._requests[o.id](o.error, o.result)
                    }
                } else {
                    if (t._closed || t.close(),
                    !t._requests.connect)
                        return;
                    for (n = new Error("Closing client. Could not access localStorage in hub."),
                    i = 0; i < t._requests.connect.length; i++)
                        t._requests.connect[i](n)
                }
        }
        ,
        window.addEventListener ? window.addEventListener("message", this._listener, !1) : window.attachEvent("onmessage", this._listener)
    }
    ,
    e.prototype._poll = function() {
        var t, e;
        t = this,
        e = setInterval(function() {
            return t._connected ? clearInterval(e) : void (t._hub && t._hub.postMessage("cross-storage:poll", t._origin))
        }, 1e3)
    }
    ,
    e.prototype._createFrame = function(t) {
        var i, n;
        i = window.document.createElement("iframe"),
        i.id = this._frameId;
        for (n in e.frameStyle)
            e.frameStyle.hasOwnProperty(n) && (i.style[n] = e.frameStyle[n]);
        return window.document.body.appendChild(i),
        i.src = t,
        i
    }
    ,
    e.prototype._request = function(t, e) {
        var i, n;
        return this._closed ? this._promise.reject(new Error("CrossStorageClient has closed")) : (n = this,
        n._count++,
        i = {
            id: this._id + ":" + n._count,
            method: "cross-storage:" + t,
            params: e
        },
        new this._promise(function(t, e) {
            var o, a;
            o = setTimeout(function() {
                n._requests[i.id] && (delete n._requests[i.id],
                e(new Error("Timeout: could not perform " + i.method)))
            }, n._timeout),
            n._requests[i.id] = function(i, n) {
                return clearTimeout(o),
                i ? e(new Error(i)) : void t(n)
            }
            ,
            Array.prototype.toJSON && (a = Array.prototype.toJSON,
            Array.prototype.toJSON = null),
            n._hub.postMessage(JSON.stringify(i), n._origin),
            a && (Array.prototype.toJSON = a)
        }
        ))
    }
    ,
    e.getInstance = function() {
        return e.__instance || (e.__instance = new e),
        e.__instance
    }
    ;
    var n = {};
    return e.getInstanceForProxy = function(t) {
        return n[t] || (n[t] = new e({
            proxyUrl: t
        })),
        n[t]
    }
    ,
    e
}),
define("m_pushNews", ["m_zepto", "m_storage", "m_tpl", "m_log"], function(t, e, i, n) {
    "use strict";
    function o(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }
    var a = {};
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var r = o(t)
      , s = o(e)
      , c = o(i)
      , l = o(n)
      , d = '\n    <style>\n        .lincoapp-tips{display:none;position:fixed;left:0;bottom:-.7rem;z-index:99999;display:-webkit-box;display:box;width:100%;height:.7rem;background:#eff6fb;border-top:2px solid #5297e8;padding:.16rem;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-pack:center;-webkit-box-align:center;-webkit-transform:translate3d(0,0,0);-webkit-transition: -webkit-transform 600ms ease;}\n        .lincoapp-tips.slideUp{-webkit-transform:translate3d(0,-100%,0)}\n        .lincoapp-tips.slideDown{-webkit-transform:translate3d(0,0,0)}\n        .lincoapp-tips .stit{display:-webkit-box;display:box;width:.15rem;height:.34rem;background:#277de2;margin-right:.12rem;-webkit-border-radius:2px;border-radius:2px;-webkit-box-pack:center;-webkit-box-align:center;text-align:center;font-size:.1rem;color:#fff;line-height:1.3}\n        .lincoapp-tips p{-webkit-box-flex:1;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;word-break:break-all;overflow:hidden;text-overflow:ellipsis;font-size:.16rem;line-height:1.2}\n        .lincoapp-tips .btn-close{padding:.1rem;width:.22rem;height:.22rem;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAfCAMAAACxiD++AAAAh1BMVEUAAABcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFxcXFyeRq46AAAALHRSTlMA/Pn1PPDrlUkyGefXVSYeCgbczcOKe3NrX1pFK+C1rqiDZlBBEw+7oJs4CR2EWOgAAAD0SURBVCjPfdHZjoJAAETRAmRRRMXBDdxQZnGs//8+ixgj3dLUC4RzEzbk5wzOjWvgRM9Z/IeMkfj0yn4fheQFSAJ6O4d7cqDqK+Tvy01AXmxv5GUn5tb0qnXjdmahR/cz64W4Mf1qfZJucf10FRG5fp5m8gRwFpnHQP65vYoaKOUV0Fuk5Gonb+DYLKUWjABnEZH+gGNLLR708DBQbMhoPF+StwEH2uKvz9fyPbTJVEWvp/JXcba9ls+ATpEbvuq49v1FnnLTD3K7MHwO2MXxVcTkUm7upy3ubldRkL8LADdyOgGcxb1wOLAo9Gt1iB0uOlZ4AFxqHWFCvNhGAAAAAElFTkSuQmCC) no-repeat 50% 50%;background-size:.16rem auto;-webkit-background-size:.16rem auto;margin-top:-.05rem}\n    </style>\n\n    <div class="lincoapp-tips" id="push-news-wrap">\n        <div class="stit"><%= mark %></div>\n        <p><a href="<%= url %>"><%= title %></a></p>\n        <div class="btn-close"></div>\n    </div>\n'
      , u = {
        "if": 1285,
        autoCloseTime: 10
    }
      , h = "/g/s?aid=action_api&module=index5&action=pushNews"
      , p = {
        init: function(t) {
            s.default.isSupportLs && (this.config = r.default.extend({}, u, t || {}),
            this.hideTimer = null,
            this._ajaxData())
        },
        _ajaxData: function() {
            var t = this
              , e = h
              , i = this.getQueryVal("g_f");
            if (this.queryPushTime = this.getQueryVal("pushNewsTime"),
            this.queryPushTime) {
                var n = decodeURIComponent(this.queryPushTime);
                e += "&_time=" + n
            }
            i && (e += "&g_f=" + i),
            r.default.ajax({
                url: e,
                dataType: "json",
                success: function(e) {
                    0 === e.code && t._renderTpl(e.pushNews.data)
                }
            })
        },
        _renderTpl: function(t) {
            if (t.list && t.list.length) {
                var e = t.list[0];
                if (e.title && e.url && (!s.default.getItem(e.signature) || this.queryPushTime)) {
                    var i = e.url
                      , n = this.config.if
                      , o = i.indexOf("?") > -1 ? "&" : "?";
                    s.default.setItem({
                        key: e.signature,
                        value: "1",
                        ttl: 864e3
                    }),
                    e.url = "" + i + o + "i_f=" + n,
                    this._createDom(c.default(d, e)),
                    this._initEvent()
                }
            }
        },
        _createDom: function(t) {
            r.default(document.body).append(t),
            this.el = r.default("#push-news-wrap"),
            this.closeBtn = this.el.find(".btn-close"),
            this.show()
        },
        _initEvent: function() {
            var t = this;
            this.closeBtn.bind("click", function() {
                t.hideTimer && (clearTimeout(t.hideTimer),
                t.hideTimer = null),
                t.hide(),
                t.sendHideLog()
            })
        },
        show: function() {
            var t = this
              , e = this.config
              , i = this.el;
            i.show(),
            i[0].offsetWidth,
            i.addClass("slideUp"),
            this.hideTimer = setTimeout(function() {
                t.hide(),
                t.sendHideLog()
            }, 1e3 * e.autoCloseTime),
            l.default.ckSend("indexPage", "pushNewsStat,show")
        },
        hide: function() {
            var t = (this.config,
            this.el);
            t.addClass("slideDown"),
            setTimeout(function() {
                t.hide()
            }, 1e3)
        },
        sendHideLog: function() {
            l.default.ckSend("indexPage", "pushNewsStat,hide")
        },
        getQueryVal: function(t) {
            var e = location.search.substring(1);
            if (e)
                for (var i = e.split("&"), n = 0, o = i.length; o > n; n++) {
                    var a = i[n].split("=");
                    if (a[0] == t)
                        return encodeURIComponent(a[1])
                }
        }
    };
    return a.default = p,
    a
}),
define("m_browserAds", ["m_zepto", "m_tpl", "m_stat"], function(t, e, i) {
    "use strict";
    function n(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }
    function o(t, e) {
        if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function")
    }
    var a = {};
    Object.defineProperty(a, "__esModule", {
        value: !0
    });
    var r = n(t)
      , s = n(e)
      , c = (n(i),
    function() {
        function t(t, e) {
            for (var i = 0; i < e.length; i++) {
                var n = e[i];
                n.enumerable = n.enumerable || !1,
                n.configurable = !0,
                "value"in n && (n.writable = !0),
                Object.defineProperty(t, n.key, n)
            }
        }
        return function(e, i, n) {
            return i && t(e.prototype, i),
            n && t(e, n),
            e
        }
    }())
      , l = {
        bigPic: '\n        <div class="lincoapp-publ-infonews5">\n            <a href="<%= link %>">\n                <strong class="infonews-tit"><%=title%></strong>\n                <span class="infonews-u-img">\n                    <div class="img-wrap"><img src="<%= imageUrl %>" alt="<%= title %>" /></div>\n                </span>\n                <div class="info-infonews">\n                    <span class="btn-infonews blue">广告</span>\n                    <%if(source){%>\n                        <span class="btn-infonews"><%=source%></span>\n                    <%}%>\n                </div>\n            </a>\n        </div>\n    ',
        feedOnePic: '\n        <div class="lincoapp-publ-infonews3">\n            <a href="<%= link %>">\n                <div class="infonews-detail">\n                    <strong class="infonews-tit"><%= title %></strong>\n                    <div class="info-infonews">\n                        <span class="btn-infonews blue">广告</span>\n                        <%if(source){%>\n                            <span class="btn-infonews"><%=source%></span>\n                        <%}%>\n                    </div>\n                </div>\n                <span class="infonews-u-img">\n                    <div class="img-wrap"><img src="<%= imageUrl%>" alt="<%= title%>"></div>\n                </span>\n            </a>\n        </div>\n    ',
        feedThreePic: '\n        <div class="lincoapp-publ-infonews7">\n            <a href="<%= link %>">\n                <strong class="infonews-tit"><%= title %></strong>\n                <div class="infonews-u-img">\n                    <% for (var i = 0; i < 3; i++) { %>\n                        <% var item = imageUrlList[i]; %>\n                        <span class="img-wrap"><img src="<%= item %>" alt="<%= title %>"></span>\n                    <% } %>\n                </div>\n                <div class="info-infonews">\n                     <span class="btn-infonews blue">广告</span>\n                    <%if(source){%>\n                        <span class="btn-infonews"><%=source%></span>\n                    <%}%>\n                </div>\n            </a>\n        </div>\n    ',
        feedBigPic: '\n        <div class="lincoapp-publ-infonews5">\n            <a href="<%= link %>">\n                <strong class="infonews-tit"><%= title %></strong>\n                <span class="infonews-u-img">\n                    <div class="img-wrap"><img src="<%= imageUrl %>" alt="<%= title %>"></div>\n                </span>\n                <div class="info-infonews">\n                    <span class="btn-infonews blue">广告</span>\n                    <%if(source){%>\n                        <span class="btn-infonews"><%=source%></span>\n                    <%}%>\n                </div>\n            </a>\n        </div>\n    ',
        feedAppBigPic: '\n        <div class="lincoapp-publ-infonews8">\n            <a href="<%= link %>">\n                <span class="infonews-u-img">\n                    <div class="img-wrap"><img src="<%= imageUrl %>" alt=""></div>\n                </span>\n                <div class="infonews-wrap">\n                    <div class="infonews-detail">\n                        <strong class="infonews-tit"><%= title %></strong>\n                        <div class="info-infonews">\n                            <span class="btn-infonews blue">广告</span>\n                            <%if(source){%><span class="btn-infonews"><%= source %></span><%}%>\n                        </div>\n                    </div>\n                    <div class="btn-download"><span>了解详情</span></div>\n                </div>\n            </a>\n        </div>\n    ',
        textLink: '\n        <div class="lincoapp-publ-infonews2">\n            <a href="<%= link %>">\n                <p class="infonews-tit"><%= title %></p>\n                <span class="btn-infonews blue">广告</span>\n            </a>\n        </div>\n    '
    }
      , d = "data-log-exp"
      , u = "/g/advert_qbads.htm"
      , h = function(t) {
        var e = location.search.substring(1);
        if (e)
            for (var i = e.split("&"), n = 0, o = i.length; o > n; n++) {
                var a = i[n].split("=");
                if (a[0] == t)
                    return encodeURIComponent(a[1])
            }
    }
      , p = function() {
        function t(e) {
            arguments.length <= 1 || void 0 === arguments[1] ? !1 : arguments[1];
            o(this, t),
            this.config = e,
            this.isUseNodeAPi = !0,
            this.getAds()
        }
        return c(t, [{
            key: "getAds",
            value: function() {
                this.cache(),
                this.formatAdsconf(),
                this.asyncAds()
            }
        }, {
            key: "cache",
            value: function() {
                this.adsConfMap = {},
                this.adDataMap = {},
                this.queryAdsConf = "",
                h("useTestApi") ? u = "/frontend/mods/browserAds/demo/data.json" : this.isUseNodeAPi && (u = "//nodeapi.3g.qq.com/nodeapi/api/ads@getAds")
            }
        }, {
            key: "formatAdsconf",
            value: function() {
                var t = this
                  , e = []
                  , i = this.config;
                r.default.isArray(i) || (i = [i]),
                r.default.each(i, function(i, n) {
                    if (n.adId) {
                        r.default.isArray(n.pos) || (n.pos = [n.pos]),
                        n.dom = [];
                        var o = n.adId
                          , a = n.pos.length
                          , s = n.adKeyword || "";
                        if ("number" == typeof n.pos[0]) {
                            n.insertType = "index";
                            var c = n.adWrap;
                            n.adWrap = "string" == typeof c ? r.default(c) : c,
                            n.feedTagName = n.feedItem.split(".")[0]
                        } else
                            n.insertType = "dom";
                        t.adsConfMap[o] = n,
                        e.push(o + "," + a + "," + s),
                        t.insetAdHolder(n)
                    }
                }),
                this.queryAdsConf = e.join("@")
            }
        }, {
            key: "insetAdHolder",
            value: function(t) {
                var e = this
                  , i = this;
                t.eventName ? !function() {
                    var n = 0;
                    r.default.bind(window, t.eventName, function(o) {
                        function a() {
                            r.default.each(s, function(e, o) {
                                i.renderAd(t, i.adDataMap[t.adId][n], o),
                                n++
                            })
                        }
                        var s = e.getAdHolders(t, o);
                        s && s.length && (i.adDataMap[t.adId] ? a() : r.default.bind(e, "BROWSER_AD:afterGetData", function() {
                            a()
                        }))
                    })
                }() : this.actInsertAdHolder(t)
            }
        }, {
            key: "getAdHolders",
            value: function(t, e) {
                var i = []
                  , n = t.pos
                  , o = t.adWrap;
                if ("index" == t.insertType) {
                    var a = e.startIdx
                      , s = e.endIdx
                      , c = e.curPage
                      , l = e.perPage;
                    s || (a = l * (c - 1),
                    s = l * c);
                    for (var d = a; s > d; d++)
                        if (n.indexOf(d + 1) > -1) {
                            var u = t.feedTagName
                              , h = r.default("<" + u + "></" + u + ">");
                            h.insertBefore(r.default(o.find(t.feedItem)[d])),
                            i.push(h)
                        }
                    t.forceInsert && !function() {
                        var e = t.feedTagName
                          , n = r.default("<" + e + "></" + e + ">")
                          , a = r.default(o.find(t.feedItem));
                        r.default.each(t.pos, function(t, e) {
                            e > a.length && (n.insertAfter(a[a.length - 1]),
                            i.push(n))
                        })
                    }()
                } else if ("dom" == t.insertType) {
                    {
                        t.pos.length
                    }
                    r.default.each(n, function(t, e) {
                        var n = o.find(e);
                        n.length > 0 && "" == n.html() && !n.data("reported-count") && i.push(n)
                    })
                }
                return i
            }
        }, {
            key: "actInsertAdHolder",
            value: function(t) {
                "dom" === t.insertType ? r.default.each(t.pos, function(e, i) {
                    var n = "string" == typeof i ? r.default(i) : i;
                    t.dom.push(n)
                }) : !function() {
                    var e = t.adWrap
                      , i = t.feedTagName
                      , n = e.find(t.feedItem);
                    r.default.each(n, function(e) {
                        if (t.pos.indexOf(e + 1) > -1) {
                            var o = r.default("<" + i + "></" + i + ">");
                            o.insertBefore(r.default(n[e])),
                            t.dom.push(o)
                        }
                    }),
                    t.forceInsert && !function() {
                        var o = r.default("<" + i + "></" + i + ">");
                        r.default.each(t.pos, function(i, a) {
                            a > n.length && (e.append(o),
                            t.dom.push(o))
                        })
                    }()
                }()
            }
        }, {
            key: "asyncAds",
            value: function() {
                var t = this
                  , e = this;
                return this.queryAdsConf ? void r.default.ajax({
                    url: u,
                    data: {
                        adparams: this.queryAdsConf
                    },
                    type: "GET",
                    dataType: "json",
                    withCredentials: !0,
                    success: function(i) {
                        if (i["ads@getAds"] && (i = i["ads@getAds"]),
                        0 === i.code) {
                            var n = i.data ? i.data : null;
                            if (i.data && i.data.posMap && (n = i.data.posMap),
                            n) {
                                for (var o in n) {
                                    var a = n[o];
                                    e.adDataMap[o] = e.adDataMap[o] ? e.adDataMap[o].concat(a) : a
                                }
                                console.log("adDataMap", e.adDataMap),
                                r.default.trigger(t, "BROWSER_AD:afterGetData", [{
                                    adDataMap: n
                                }]),
                                e.iterateRender(n),
                                r.default.trigger(window, "statDetectDom")
                            }
                        }
                    }
                }) : void console.error("adId can not be empty")
            }
        }, {
            key: "iterateRender",
            value: function(t) {
                var e = this;
                r.default.each(t, function(t, i) {
                    var n = e.adsConfMap[t];
                    n && (n.eventName || r.default.each(i, function(t, i) {
                        var o = n.dom[t];
                        o && e.renderAd(n, i, o)
                    }))
                })
            }
        }, {
            key: "getUrl",
            value: function(t) {
                return t ? t.replace(/http:\/\//i, "//") : ""
            }
        }, {
            key: "renderAd",
            value: function(t, e, i) {
                if (e) {
                    var n = this.getTplType(t, e);
                    i = r.default(i),
                    e.logExpAttr = d,
                    i.attr(d, this.getUrl(e.expurl)),
                    i.data("ratio", .5),
                    i.addClass("j-cms-ads"),
                    "custom" !== n && (i.html(s.default(l[n], e)),
                    r.default.trigger(window, "statDetectDom")),
                    t.callback && (t.callback(e, i),
                    r.default.trigger(window, "statDetectDom"))
                }
            }
        }, {
            key: "getTplType",
            value: function(t, e) {
                if (e) {
                    var i = t.adType
                      , n = i;
                    if ("feeds" === t.adType)
                        if (640 == e.imgWidth)
                            n = "feedBigPic";
                        else
                            switch (e.adSecondType) {
                            case 1:
                                n = "feedBigPic";
                                break;
                            case 4:
                                n = "feedThreePic";
                                break;
                            default:
                                n = "feedOnePic"
                            }
                    return n
                }
            }
        }]),
        t
    }();
    return a.default = p,
    a
}),
define("hotWords", ["m_zepto", "m_tpl", "m_log", "m_gdtads", "JSP", "modData"], function(t, e, i, n, o, a) {
    function r(t, e) {
        var i = [];
        if (t && t.length)
            for (var n = 0; n < Math.min(e, t.length); n++)
                t[n].wordId && i.push(t[n].wordId);
        return i.join(",")
    }
    function s(e) {
        var i = t(e);
        i.delegate(".lincoapp-home-more", "click", function() {
            i.find(".skin-graphic-list2-more").show(),
            i.find(".lincoapp-home-more").hide(),
            i.find(".lincoapp-home-more2").show()
        })
    }
    function c(t, e) {
        var i = {
            showHot: !1,
            source: e.mark,
            img: e.img,
            title: e.title,
            url: e.url,
            wordId: "",
            type: d[e.tag][0]
        };
        t.push(i)
    }
    function l() {
        {
            var i = this
              , o = document.querySelector("#lincoapp-home-hotwords");
            n.default
        }
        if (o) {
            var l = "/g/index6_hotword.htm";
            t.ajax({
                url: l,
                type: "GET",
                dataType: "json",
                withCredentials: !0,
                data: {
                    listSize: t(o).data("size")
                },
                success: function(e) {
                    0 === e.code && e.data.list.length > 0 ? t.trigger(i, "successGetHotWord", [{
                        hotWordData: e.data
                    }]) : t.trigger(i, "errorHotWord", [{
                        tip: "实时热词无数据"
                    }])
                }
            }),
            t.bind(i, "successGetHotWord", function(i) {
                var n = i.hotWordData;
                n.imageVer = a.imageVer,
                n.iarea = t(o).data("iarea"),
                n.listSize = Math.min(parseInt(t(o).data("size")), n.list.length);
                var l = r(n.list, n.listSize);
                t(o).find(".lincoapp-home-title a")[0].href += "&hotwordId=" + encodeURIComponent(l),
                t(o).find(".lincoapp-home-more2")[0].href += "&hotwordId=" + encodeURIComponent(l),
                n.advert.length && (n.listSize++,
                c(n.list, n.advert[0])),
                t(o).find("#lincoapp-hotwords-list").html(e(h, n)),
                n.ad_under.length && t(o).parent().after(e(p, n.ad_under[0])),
                s(o),
                o.style.display = "block",
                t.trigger(window, "BROWSER_AD:afterRenderHotWords", [{
                    curPage: 1,
                    perPage: n.listSize > 9 ? Math.ceil(n.listSize / 2) : n.listSize
                }])
            }),
            t.bind(i, "errorHotWord", function(t) {
                console.log(t.tip),
                o.style.display = "none"
            })
        }
    }
    var d = {
        0: ["type1", "评论"],
        5: ["type3", "广告"],
        6: ["type7", "头条"],
        7: ["type3", "专辑"],
        8: ["type3", "直播"],
        9: ["type3", "专题"],
        10: ["type3", "独家"],
        11: ["type3", "测试"]
    }
      , u = "//cdn.read.html5.qq.com/image?src=3gqq&subsrc=index&q=6&r=4&imgflag=5&w=184&h=122&imageUrl=";
    4 == a.netType && (u = "//cdn.read.html5.qq.com/image?src=3gqq&subsrc=index&q=6&r=4&imgflag=5&w=368&h=244&imageUrl=");
    var h = ['<% var imgPrefix = "' + u + '"; %>', '<% var imgPh4b3 = "data:image/gif;base64,R0lGODlhBAADAIAAAP///wAAACH5BAEHAAEALAAAAAAEAAMAAAIDjI9WADs="; %>', '<ul class="lincoapp-graphic-list2 <% if (imageVer === "0") { %>skin-noimg"<% } %>">', "<% for (var i = 0; i < listSize; i++) { %>", "<% var idx = i + 1; %>", "<% var item = list[i]; %>", "<% if (i < listSize) { %>", '<li <%=(!item.img.length && imageVer === "1") ? "class=noimg": ""%>>', "<% if (item.keyword) {%>", '<div class="stit skin-stit<%=idx > 2 ? 3 : idx%>"><%= item.keyword%></div>', "<% } %>", '<a href="<%= item.url %>&i_f=1214&iarea=<%=iarea%>" class="a-lk">', '<% if (imageVer === "1") { %> <div class="detail"> <% } %>', '<strong class="tit"><%= item.title %></strong>', '<div class="info">', "<% if (item.showHot) { %>", '<span class="icon type3">热荐</span>', '<% } else if (imageVer === "0" && item.type) {%>', '<span class="icon <%=item.type%>"><%=item.source%></span>', "<% } %>", '<% if (imageVer === "1") { %>', '<span class="resource"><%=item.source%></span>', "<% } %>", "</div>", '<% if (imageVer === "1") { %> </div> <% } %>', '<% if (imageVer === "1" && item.img.length) { %>', '<span class="u-img">', '<img src="<%=imgPh4b3%>" data-src="<%=imgPrefix%><%=item.img%>" alt="" class="img">', "</span>", "<% } %>", "</a>", "</li>", "<% if (i == (Math.ceil(listSize/2)-1) && listSize > 9) { %>", '</ul><ul class="lincoapp-graphic-list2 skin-graphic-list2-more <% if (imageVer === "0") { %>skin-noimg"<% } %>" style="display:none;">', "<% } %>", "<% } %>", "<% } %>", "</ul>"].join("")
      , p = ['<% var imgPh4b3 = "data:image/gif;base64,R0lGODlhBAADAIAAAP///wAAACH5BAEHAAEALAAAAAAEAAMAAAIDjI9WADs="; %>', '<section class="lincoapp-home-section">', '<div class="lincoapp-home-infonews-wrap">', '<div class="lincoapp-home-infonews">', '<a href="<%= url %>" class="type1 special-link-forjs">', "<% if (img && img.length > 0) { %>", '<img data-src="<%=img%>" src="<%=imgPh4b3%>" alt="<%= title %>" />', "<% } %>", "<p><%= title %></p>", '<span class="btn-infonews">广告</span>', "</a>", "</div>", "</div>", "</section>"].join("");
    return {
        init: l
    }
}),
define("sogouSearch", ["m_zepto", "m_log", "modData", "m_qqWebview"], function(t, e, i, n) {
    var o = null
      , a = ""
      , n = n.default;
    i.sogoukeyWord && i.sogoukeyWord.keyword && (o = i.sogoukeyWord.keyword,
    a = i.sogoukeyWord.sogouPrefix);
    var r = {
        init: function() {
            this.el = t("#sogou-search"),
            this.el.length < 1 || !o || (this._cacheDom(),
            this._switchKeyWord(),
            this._initEvent())
        },
        _cacheDom: function() {
            this.searchForm = this.el.find(".srch-form"),
            this.searchIpt = this.el.find(".input-txt"),
            this.submitBtn = this.el.find(".srch-btn"),
            this.sogouLogo = this.el.find(".lk-sogou"),
            this.idx = 0
        },
        _switchKeyWord: function() {
            var t = this
              , e = o || []
              , i = this.searchIpt
              , n = e.length;
            2 > n || (this.switchTimer = setInterval(function() {
                t.idx++,
                t.idx == n && (t.idx = 0),
                i.val(e[t.idx])
            }, 7e3))
        },
        _initEvent: function() {
            var o = this;
            this.searchIpt.bind("focus", function() {
                this.value = "",
                o.switchTimer && clearInterval(o.switchTimer),
                a = i.sogoukeyWord.sogouActPrefix
            }),
            this.searchIpt.bind("blur", function() {
                !this.value
            }),
            this.submitBtn.bind("click", function(i) {
                i.preventDefault();
                var r = t.trim(o.searchIpt.val());
                r.length > 100 && (r = r.substring(0, 100)),
                e.ckSend("sogouSearchJump", "fromIndex,searchBtn");
                var s = a + encodeURIComponent(r);
                n.canTitlebarCustom ? n.openUrl(s) : setTimeout(function() {
                    location.href = s
                }, 100)
            }),
            this.sogouLogo.bind("click", function(t) {
                t.preventDefault(),
                e.ckSend("sogouSearchJump", "fromIndex,sogouLogo"),
                n.canTitlebarCustom || setTimeout(function() {
                    location.href = t.target.href
                }, 100)
            })
        }
    };
    return r
}),
define("main", ["m_zepto", "m_login", "m_swipe", "m_lazyLoad", "sogouSearch", "hotWords", "gameApp", "guessLike", "novel", "viewMore", "JSP", "modData", "popupAd", "shortcutIos", "userMessage", "m_showLog", "coopration", "m_log", "m_backRecord", "m_storage", "m_cookie", "m_clickRate", "renderChannel", "weather", "insertAds", "m_util", "initPopupDragsort", "m_msg", "m_cssErrorReport", "m_browser", "initBrowserAds", "insertGdtAds", "game"], function(t, e, i, n, o, a, r, s, c, l, d, u, h, p, f, g, m, v, w, y, b, _, x, A, T, k, C, S, I, L, q, E, P) {
    var D = (d.userInfo,
    0)
      , j = []
      , M = (u.customChannel.openUserChannels,
    "index_image_ver")
      , N = "1"
      , F = "0"
      , R = "INDEX_VERSION_SWITCH_ACTION"
      , z = "底部开启无图模式 更清爽更省流量";
    "4" === u.netType && (z = "底部配置一键开启极速智能无图模式");
    var U = {
        init: function() {
            this._checkLoadCss(),
            this._initLazyLoad(),
            this._initImgSwipe(),
            this._bindJrywSwipeIns(),
            this._initMods(),
            this._initIconsSwipe(),
            this._initEvent(),
            this._initUcLink(),
            this._setFeedEmptyAdCss(),
            this._initShowLog(),
            this._initSortLog(),
            this._initSwitchTip(),
            this._initBackRecord(),
            this._initTempLink(),
            this._initMinicardHeight(),
            this._initClickRate(),
            this._isNotFirstScreenLog()
        },
        _initTempLink: function() {
            function e(e) {
                t.each(t(e), function(e, i) {
                    i = t(i);
                    var n = i.attr("href");
                    /(aibo|nba_new)/.test(n) && i.attr("href", n.replace("http", "https"))
                })
            }
            var i = t(t(".nav-global a")[12]);
            i.attr("href", "//yuetu.3g.qq.com/image/?f_aid_ext=nav&i_f=812&icfa=home_touch&f_pid=135&iarea=239"),
            L.isFromQQBrower && (L.isFromQQ || e(".nav-global a"))
        },
        _checkLoadCss: function() {
            I.init()
        },
        _bindJrywSwipeIns: function() {
            t.bind(window, "afterInitJrywSwipe", function(t) {
                j.push(t.jrywSwipeIns)
            })
        },
        _initImgSwipe: function() {
            var e = t("#lincoapp-home-slide .slide-wrap")
              , n = e.find(".pointer i");
            this.imgSwipeIns = new i(e[0],{
                speed: 400,
                auto: 4e3,
                continuous: !0,
                useForImg: {
                    width: 640,
                    height: 330
                },
                callback: function(i, o) {
                    var a = t(n[i])
                      , r = i;
                    a.length < 1 && (r = i - 2),
                    n.removeClass("selected"),
                    t(n[r]).addClass("selected"),
                    t.trigger(window, "G:afterSliderSwitch", [{
                        el: e.parent(".slide-areatag"),
                        index: i
                    }]);
                    var s = t(o).find("img");
                    if (s.length > 0) {
                        var c = s[0].getAttribute("data-slider");
                        c && (s.attr("src", c),
                        s[0].removeAttribute("data-slider"))
                    }
                }
            }),
            j.push(this.imgSwipeIns)
        },
        _initSwipe: function() {
            function e(e, n) {
                var a = e.find(".pointer i");
                o["sliderIns" + n] = new i(e[0],{
                    speed: 400,
                    auto: 4e3,
                    continuous: !0,
                    useForImg: {
                        width: 640,
                        height: 330
                    },
                    callback: function(i, n) {
                        var o = t(a[i])
                          , r = i;
                        o.length < 1 && (r = i - 2),
                        a.removeClass("selected"),
                        t(a[r]).addClass("selected"),
                        t.trigger(window, "G:afterSliderSwitch", [{
                            el: e.parent(".slide-areatag"),
                            index: i
                        }]);
                        var s = t(n).find("img");
                        if (s.length > 0) {
                            var c = s[0].getAttribute("data-slider");
                            c && (s.attr("src", c),
                            s[0].removeAttribute("data-slider"))
                        }
                    }
                })
            }
            function n() {
                var e = 50
                  , i = t(window)
                  , n = document.body.scrollTop
                  , a = i.height()
                  , s = n + a + e
                  , c = n - e;
                t.each(r, function(e, i) {
                    var i = t("#" + i)
                      , n = i.find(".slide-wrap")
                      , a = i.offset().top
                      , r = a + i.height()
                      , l = n.data("setup");
                    s > a && r > c && !l && (o["sliderIns" + e].setup(),
                    n.data("setup", "true"))
                })
            }
            var o = this
              , a = 0
              , r = []
              , s = ["lincoapp-home-slide", "lincoapp-wechat-slide", "lincoapp-car-slide"];
            t.each(s, function(e, i) {
                var n = t("#" + i + " .slide-wrap");
                n.find("ul>li").length > 1 && r.push(i)
            }),
            t.each(r, function(i, n) {
                e(t("#" + n + " .slide-wrap"), i)
            }),
            t(window).bind("resize", function() {
                a++,
                t(".slide-wrap").removeAttr("data-setup"),
                n()
            }),
            t(window).bind("scroll", function() {
                setTimeout(function() {
                    a > 0 && n()
                }, 100)
            })
        },
        _initMods: function() {
            o.init(),
            a.init(),
            c.init(),
            f.init(),
            m.init(),
            q.init(),
            x.init(),
            A.init(),
            T.init(),
            C.init(),
            E.init(),
            P.init(),
            l.init(),
            r.init()
        },
        _initEvent: function() {
            var i = this;
            t("#login-ft").on("click", function() {
                t(this);
                e.isLogin() ? e.loginOut(function() {
                    location.reload()
                }) : e.login(function() {
                    location.reload()
                })
            }),
            t.bind(window, "resetImgLazyLoad", function() {
                i._resetImgLazyLoad()
            }),
            t("#footer-ver-switch").on("click", function() {
                t(this);
                "0" === u.imageVer ? b.set(M, N, 60) : b.set(M, F, 60),
                y.setItem({
                    key: R,
                    value: "yes",
                    ttl: 60
                }),
                setTimeout(function() {
                    location.reload()
                }, 500)
            }),
            S.listen("beforelogin", function() {
                D = document.body.scrollTop
            }),
            S.listen("logincacel", function() {
                setTimeout(function() {
                    C.hide(D)
                }, 300)
            }),
            S.listen("loginok", function(e) {
                var i = t("#login")
                  , n = t("#login-ft");
                i.addClass("logined-default logined"),
                i.find("span").css("background", "url(" + e.avatar + ")"),
                n.text("退出"),
                C.initChannelList()
            }),
            t.bind(window, "switchTomainNewsTab", function() {
                t.each(j, function(t, e) {
                    e.setup()
                })
            })
        },
        _resetImgLazyLoad: function() {
            var t = this.lazyLoadIns;
            t.setLazyImgs(),
            t.actionLazy()
        },
        _initLazyLoad: function() {
            var t = this;
            this.lazyLoadIns = n.getInstance({
                useWebp: !0,
                isNeedGif: !1
            }),
            setTimeout(function() {
                t.lazyLoadIns.setLazyImgs(),
                t.lazyLoadIns.actionLazy()
            }, 300)
        },
        _initPopupAd: function() {
            new h,
            new p
        },
        _initShowLog: function() {
            var e = []
              , i = this
              , n = t("#lincowebapp-wrapper .show-viewlog-tag");
            t.each(n, function(i, n) {
                var o = t(n)
                  , a = o.attr("id");
                a && e.push("#" + a)
            }),
            this.showLogIns = new g({
                elem: e,
                logType: "exp",
                isGetParams: !0
            }),
            this.showLogGDTIns = new g({
                elem: [".show-gdtad"],
                showLogAttr: "data-showlog",
                logType: "guangdiantong",
                isGetParams: !0
            }),
            t.bind(window, "addGdtExpReport", function(e) {
                t.each(e, function(t, e) {
                    i.showLogGDTIns.setShowLogElem(e),
                    e.addClass("show-gdtad")
                })
            })
        },
        _initSortLog: function() {
            var t = u.sortChannel
              , e = 0;
            d.userInfo.qq > 0 && (e = 1),
            t && (t = t.split(",").join("-"),
            v.ckSend("indexPage", "sortNew," + t + "," + e))
        },
        _initVerTips: function() {
            var e = this.getQueryVal("from");
            if (e && "recom" == e) {
                var i = ['<div class="lincoapp-bar slideUpDown">', '<p class="msg">已切换至[触屏版]，开始精彩的阅读吧！</p>', "</div>"].join("");
                t(document.body).append(i),
                t.isFunction(history.replaceState) && history.replaceState(null, document.title, location.href.replace("&from=recom", ""))
            }
        },
        _initUcLink: function() {
            t("#lincowebapp-wrapper").delegate(".special-link-forjs", "click", function(e) {
                var i = t(e.currentTarget)
                  , n = i.data("href");
                n && (location.href = n)
            })
        },
        _initMinicardHeight: function() {
            function e() {
                var t = n.width() - 2 * parseFloat(n.css("padding-left"))
                  , e = n.find("img")
                  , i = Math.ceil((.724 * t - 2) / 2);
                e.css("height", i)
            }
            var i = t("#lincoapp-home-minicard");
            if (!(i.length < 1)) {
                var n = i.find(".lincoapp-home-infonews>.type3");
                if (!(n.length < 1)) {
                    var o = t(window);
                    e(),
                    o.bind("resize", e),
                    o.bind("orientationchange", e)
                }
            }
        },
        _initBackRecord: function() {
            w.init({
                key: "INDEX_LAST_SCROLL_VALUE",
                ttl: 180,
                initCb: function(t) {
                    y.getItem(R) ? (window.scrollTo(0, 1),
                    y.removeItem(R)) : window.scrollTo(0, t.scrollTop)
                }
            })
        },
        getQueryVal: function(t) {
            var e = location.search.substring(1);
            if (e)
                for (var i = e.split("&"), n = 0, o = i.length; o > n; n++) {
                    var a = i[n].split("=");
                    if (a[0] == t)
                        return encodeURIComponent(a[1])
                }
        },
        _setFeedEmptyAdCss: function() {
            "1" === u.imageVer && t.each(t(".channel-feed-emptyda"), function(e, i) {
                t(i).prev().find("a").css("border-bottom", "none")
            })
        },
        _initClickRate: function() {
            function e(e) {
                var i = ["<style>", ".tt-click-rate {margin: 10px 0;} .tt-click-rate table {width: 100%; background-color: #FFFFFF;}", ".tt-click-rate td {height: 30px;line-height: 30px; vertical-align: center; text-align: center; border: 1px solid #C5C3C3;}", "</style>", '<div class="tt-click-rate">', "<table>", "<thead>", "<td>模块</td>", "<td>曝光</td>", "<td>点击</td>", "<td>点击率</td>", "<thead>", "<tbody></tbody>", "</table>", "</div>"].join("")
                  , n = t(i)
                  , o = n.find("tbody");
                t.each(e, function(t, e) {
                    if (!(e.totalClick < 1)) {
                        var i = Number((100 * e.rate).toFixed(1))
                          , n = ["<tr>", "<td>" + e.areaName + "</td>", "<td>" + e.totalExp + "</td>", "<td>" + e.totalClick + "</td>", "<td>" + i + "%</td>", "</tr>"].join("");
                        o.append(n)
                    }
                }),
                o.find("tr").length > 0 && n.insertBefore(".lincoapp-home-content")
            }
            var i = this;
            this.clickRateIns = _.create();
            var n = this.clickRateIns.getClickRateResult();
            n.length > 0 && i.getQueryVal("showClickRate") && e(n)
        },
        _initIconsSwipe: function() {
            t.each(t(".plug-slider-icons"), function(e, n) {
                n = t(n);
                var o = n.attr("id");
                if (o) {
                    var a = new i(n[0],{
                        callback: function(e) {
                            var i = n.find(".lincoapp-pointer i");
                            i.removeClass("selected"),
                            t(i.get(e)).addClass("selected"),
                            t.trigger(window, "resetImgLazyLoad")
                        }
                    });
                    j.push(a)
                }
            })
        },
        _initSwitchTip: function() {
            "0" === u.imageVer && b.set(M, F, 60),
            y.isSupportLs && ("0" === u.imageVer ? (v.ckSend("indexPage", "noPicVer"),
            y.getItem(R) && v.ckSend("indexPage", "switchVersion,toNoPic")) : (v.ckSend("indexPage", "picVer"),
            y.getItem(R) && v.ckSend("indexPage", "switchVersion,toPic")))
        },
        _isNotFirstScreenLog: function() {
            var e = t("#lincoapp-home-front");
            document.body.scrollTop > e.offset().top + e.height() && v.ckSend("indexPage", "notFirstScreen")
        }
    };
    return U
}),
define("recom", ["m_zepto", "recomList", "JSP", "m_storage", "m_log", "m_util", "modData"], function(t, e, i, n, o, a, r) {
    var s = i.userInfo.qq
      , c = {
        init: function() {
            this.initRecomList(),
            this.initEvent(),
            this.renderList(),
            this.showVerTips()
        },
        checkUid: function() {
            var e = a.cookie
              , i = ["uin", "p_uin", "p_luin", "ad_pqq", "3g_guest_id"]
              , n = "";
            return t.each(i, function(t, i) {
                var o = e.getCookie(i);
                return o && "null" != o ? (o = o > "0" ? o.substring(2) : o,
                n = parseInt(o, 10),
                !1) : void 0
            }),
            0 > n || n > 1e4 && (99999 > n || n > 100001) ? !0 : !1
        },
        initRecomList: function() {
            var i = this.checkUid() ? "userFeed@getUserFeed" : "newsFeed@getNewsFeed";
            o.ckUserSend("recom_tab", i),
            this.recomListIns = e.create(t(".recom-tab-content"), {
                action: i,
                bid: 31,
                uin: s,
                cmsAds: {
                    totalPage: 7,
                    perPagePos: [6, 11],
                    adId: 100164
                }
            })
        },
        renderList: function() {
            var e = this
              , i = location.href.indexOf("test=1") > -1;
            if (n.isSupportLs)
                var o = localStorage.getItem("INDEX_RECOM_TAB")
                  , a = o ? t.parseJSON(o) : {}
                  , r = o && e.checkCacheTime(a.time);
            n.isSupportLs && !i && a && a.qq === s && r ? (e.recomListIns.setCacheData(a),
            t.trigger(window, "resetImgLazyLoad")) : e.recomListIns.requestData()
        },
        checkCacheTime: function(t) {
            var e = +new Date
              , i = 6e4
              , n = e - t;
            return 5 * i >= n && n > 4e3 ? "cache" : !1
        },
        initEvent: function() {
            var e = t(".skin-top")
              , i = this
              , a = !0;
            t(window).on("unload", function() {
                var t = i.recomListIns.getCacheData();
                n.isSupportLs && localStorage.setItem("INDEX_RECOM_TAB", JSON.stringify(t))
            }),
            t(window).on("webkitAnimationEnd", ".skin-top", function() {
                e.removeClass("slideDownUp"),
                a = !0
            }),
            t.bind(window, "showTips", t.proxy(function(t) {
                a && (e.find(".msg").html(t),
                e.addClass("slideDownUp"),
                a = !1)
            })),
            t.bind(window, "goTop", function() {
                o.ckUserSend("recom_tab", "goTop")
            }),
            t(".recom-refresh-btn").on("click", function() {
                i.recomListIns.requestData("before")
            })
        },
        showVerTips: function() {
            var e = r.forceRecom
              , i = this.getQueryVal("from");
            if (e && 1 === e || i && ("smart" === i || "main" === i)) {
                var n = "不一样的位置，一样的智能推荐";
                "main" === i && (n = "开启更多兴趣阅读"),
                t.trigger(window, "showTips", [n]),
                t.isFunction(history.replaceState) && history.replaceState(null, document.title, location.href.replace(/&from=[^&#]*/g, ""))
            }
        },
        getQueryVal: function(t) {
            var e = location.search.substring(1);
            if (e)
                for (var i = e.split("&"), n = 0, o = i.length; o > n; n++) {
                    var a = i[n].split("=");
                    if (a[0] == t)
                        return encodeURIComponent(a[1])
                }
        }
    };
    return c
}),
define("video", ["m_zepto", "JSP", "modData", "videoList"], function(t, e, i, n) {
    var o = {
        init: function() {
            this.initVideoList(),
            this.initEvent()
        },
        initVideoList: function() {
            this.videoListIns = n.create()
        },
        initEvent: function() {}
    };
    return o
}),
define("videoList", ["m_zepto", "modData", "m_tpl", "m_lazyLoad", "m_visbleDetector", "m_share", "m_shareMask", "m_log", "videoPlayer", "m_qqWebview", "m_browser"], function(t, e, i, n, o, a, r, s, c, l) {
    function d(e) {
        this.defaultConfig = {
            el: ".video-tab-content"
        },
        this.config = t.extend({}, this.defaultConfig, e || {}),
        this.init.call(this)
    }
    var l = l.default
      , u = "//aibo.3g.qq.com/g/s?aid=action_api&module=video&action=ctr&type=1&cid=201604120938&exposure=true&vid="
      , h = "//statistic.3g.qq.com/comlog/comtemplog?logType=common_exp&params=38"
      , p = "//ivideo.3g.qq.com/video/api/vendor@getPortalListNew2?ps=10&";
    location.href.indexOf("kf0309") > -1 && (p = "//ivideo.3g.qq.com/video/api/vendor@getPortalListNew2?ps=10&",
    u = "//stevenfang.kf0309.3g.qq.com/video/s?aid=action_api&module=video&action=ctr&type=1&cid=201604120938&vid=");
    var f = ['<div class="lincoapp-graphic-list-video" data-duration=<%=item.duration%> data-vid=<%=item.vid%> data-qbid=<%=item.qbid%>>', '<div class="video">', '<div class="u-img" data-img="<%=item.picUrl%>" data-vid=<%=item.vid%> style="width: <%=width%>; height: <%=height%>; background-image: url(<%=item.picUrl%>);"></div>', '<div class="mask"></div>', "</div>", '<div class="vdetail">', '<div class="vinfo">', '<p class="vtit"><%=item.title%></p>', '<div class="info">', "<% if (item.source) { %>", '<span class="resource"><%=item.source%></span>', "<% } %>", '<span><%=item.playcnt + "次播放"%></span>', '<span class="icon <%=item.formatDuration ? "type2" : ""%>"><%=item.formatDuration%></span>', "</div>", "</div>", "<% if (!canTitlebarCustom) { %>", '<div class="btn-share"></div>', "<% } %>", "</div>", "</div>"].join("")
      , g = {
        fetchErr: "网络异常，<em>点击重新加载</em>",
        loadedAllData: "已显示全部内容",
        loadDataSuc: '<span class="success"></span>为您推荐10条最新视频',
        loading: '<span class="loading rotating"></span>正在载入新内容...'
    }
      , m = ['<section class="lincoapp-home-section">', '<div class="list-video-wrap"></div>', '<div class="lincoapp-btn2"><span class="loading rotating"></span>正在载入新内容...</div>', "</section>"].join("")
      , v = ["<% for (var i = 0; i < list.length; i++) { %>", "<% var item = list[i]; %>", '<div class="lincoapp-graphic-list-video" data-duration=<%=item.duration%> data-vid=<%=item.vid%> data-qbid=<%=item.qbid%>>', '<div class="video">', '<div class="u-img" data-img="<%=item.picUrl%>" data-vid=<%=item.vid%> style="width: <%=width%>; height: <%=height%>; background-image: url(<%=item.picUrl%>);"></div>', '<div class="mask"></div>', "</div>", '<div class="vdetail">', '<div class="vinfo">', '<p class="vtit"><%=item.title%></p>', '<div class="info">', "<% if (item.source) { %>", '<span class="resource"><%=item.source%></span>', "<% } %>", '<span><%=item.playcnt + "次播放"%></span>', '<span class="icon <%=item.formatDuration ? "type2" : ""%>"><%=item.formatDuration%></span>', "</div>", "</div>", "<% if (!canTitlebarCustom) { %>", '<div class="btn-share"></div>', "<% } %>", "</div>", "</div>", "<% } %>"].join("")
      , w = t("#lincowebapp-page-home").width()
      , y = 344 * w / 688
      , b = {}
      , _ = {}
      , x = {
        vid: "",
        item: null,
        halfDuration: 0
    };
    return t.extend(d.prototype, {
        init: function() {
            this._cache(),
            this.async("after"),
            this._initShare(),
            this._initEvent(),
            this._visbleDetector(),
            this._initShareMask()
        },
        _cache: function() {
            var e = this.config;
            this.el = t(e.el),
            this.el.html(m),
            this.listWrap = this.el.find(".list-video-wrap"),
            this.tipsBtn = this.el.find(".lincoapp-btn2"),
            this.tipsBtn.css("padding-top", "0.5rem"),
            this.refreshBtn = t(".video-refresh-btn"),
            this.topTipsBtn = t(".skin-top"),
            this.curPage = 1,
            this.isLoading = !1,
            this.isLoadedAllData = !1,
            this.vids = [],
            this.lastPlayVid = ""
        },
        async: function(e) {
            var i = this;
            this.isLoading = !0,
            t.ajax({
                url: p + "pn=" + this.curPage,
                dataType: "json",
                xhrFields: {
                    withCredentials: !0
                }
            }).then(function(t) {
                if (t = t["vendor@getPortalListNew2"],
                i.isLoading = !1,
                1 === i.curPage && (l.canTitlebarCustom ? i.tipsBtn.attr("style", "padding-bottom: 0.7rem;") : i.tipsBtn.attr("style", "")),
                0 === t.code) {
                    i.curPage++;
                    var n = t.data;
                    if (n && n.list && n.list.length) {
                        n.canTitlebarCustom = l.canTitlebarCustom;
                        for (var o = 0; o < n.list.length; o++) {
                            var a = parseInt(n.list[o].duration);
                            n.list[o].formatDuration = n.list[o].duration ? i.formatTime(Math.floor(a / 60)) + ":" + i.formatTime(a % 60) : ""
                        }
                        i.render(n, e),
                        (2 === i.curPage || "before" === e) && i.showLoadDataTip(g.loadDataSuc)
                    } else
                        i.showTip(g.loadedAllData),
                        i.showLoadDataTip(g.loadedAllData)
                } else
                    i.showTip(g.fetchErr)
            }, function() {
                i.isLoading = !1,
                i.showTip(g.fetchErr)
            })
        },
        showTip: function(t) {
            this.tipsBtn.html(t)
        },
        showLoadDataTip: function(t) {
            var e = this.topTipsBtn;
            e.find(".msg").html(t),
            e.addClass("slideDownUp"),
            setTimeout(function() {
                e.removeClass("slideDownUp")
            }, 2e3)
        },
        _initEvent: function() {
            var e = this;
            t(window).on("scroll", t.proxy(this._scrollCb, this)),
            t(window).on("scroll", function() {
                e.findVideoTimer && clearTimeout(e.findVideoTimer),
                e.findVideoTimer = setTimeout(t.proxy(e.findPlayer, e), 300)
            }),
            this.refreshBtn.on("click", function() {
                e.isLoading || e.async("before")
            }),
            this.el.on("click", ".lincoapp-btn2 em", function() {
                e.async("after")
            }),
            this.el.on("click", ".btn-share", t.proxy(this._onClickShare, this)),
            t.bind(this.shareIns, "afterClickShareBtn", function() {
                s.ckUserSend("indexPageUser", "videoShareClick")
            }),
            t.bind(window, "switchTab", function() {
                c.pause()
            }),
            this.listWrap.on("click", ".lincoapp-graphic-list-video .video", t.proxy(this._assignPlay, this)),
            t.bind(window, "onVideoTimeuUdate", function(t) {
                var i = x.vid
                  , n = t.currentTime;
                _[i] || (_[i] = {},
                n = 0),
                n > x.halfDuration && (_[i].hasInsert || (_[i].hasInsert = !0,
                e.insertRelatedVideo(x.item)))
            })
        },
        _onClickShare: function(e) {
            var i = t(e.currentTarget).parents(".lincoapp-graphic-list-video")
              , n = i.find(".vtit").text()
              , o = i.find(".u-img").data("img")
              , a = "//aibo.3g.qq.com/g/?aid=video#play/id=" + i.data("vid");
            this.shareMaskIns.show(),
            this.shareIns.setShareConfig({
                title: n,
                description: n,
                img: o,
                url: a
            })
        },
        _scrollCb: function() {
            var t = this.listWrap.height()
              , e = t - window.innerHeight - window.scrollY;
            80 > e && t > 0 && !this.isLoading && this.async("after")
        },
        findPlayer: function(e) {
            e = e || "";
            var i = this
              , n = this.listWrap.height();
            if (!(0 >= n)) {
                var o = this.detectorIns.digest();
                t.each(o.vis, function(n, o) {
                    o = t(o);
                    var a = o.data("vid")
                      , r = o.data("duration") || 0;
                    if (0 === n) {
                        if (a === i.lastPlayVid && "force" !== e)
                            return;
                        i.lastPlayVid = a,
                        c.destroy(),
                        o.addClass("current"),
                        c.play(o.find(".u-img")),
                        i.sendExpLog(a),
                        x.halfDuration = parseInt(r / 2, 10),
                        x.item = o,
                        x.vid = a
                    } else
                        o.removeClass("current")
                }),
                t.each(o.invis, function(e, i) {
                    t(i).removeClass("current")
                })
            }
        },
        _assignPlay: function(e) {
            var i = t(e.currentTarget).parent()
              , n = i.data("vid");
            n !== this.lastPlayVid && (this.lastPlayVid = n,
            this.listWrap.find(".lincoapp-graphic-list-video").removeClass("current"),
            i.addClass("current"),
            c.destroy(),
            c.play(i.find(".u-img")),
            this.sendExpLog(n))
        },
        render: function(t, e) {
            t.width = w + "px",
            t.height = y + "px",
            t.list = this.preActData(t.list);
            var n = i(v, t);
            "after" === e ? this.listWrap.append(n) : (this.listWrap.prepend(n),
            window.scrollTo(0, 1)),
            this.detectorIns.detect(),
            (2 === this.curPage || "before" === e) && this.findPlayer()
        },
        preActData: function(e) {
            var i = this
              , n = [];
            return t.each(e, function(t, e) {
                i.vids.indexOf(e.vid) > -1 || (i.vids.push(e.vid),
                e.playcnt = i.formatNum(e.playcnt),
                n.push(e))
            }),
            n
        },
        formatNum: function(t) {
            return rst = t,
            t > 9999 && (rst = (t / 1e4).toFixed(1) + "万"),
            rst
        },
        _initLazyLoad: function() {
            this.lazyLoadIns = n.getInstance({
                useWebp: !0,
                isNeedGif: !1
            })
        },
        actionLazyLoad: function() {
            var t = this.lazyLoadIns;
            t.setLazyImgs(),
            t.actionLazy()
        },
        _visbleDetector: function() {
            this.detectorIns = new o.VisbleDetector(t(window),{
                flag: ".lincoapp-graphic-list-video"
            })
        },
        _initShareMask: function() {
            this.shareMaskIns = new r("#actShareElId")
        },
        _initShare: function() {
            this.shareIns = new a({
                ifMap: {
                    wx: "24083",
                    sinaWb: "24083",
                    txWb: "24083",
                    qzone: "24083",
                    qq: "24083"
                }
            })
        },
        sendExpLog: function(t) {
            this.sendLog(u + t),
            this.sendLog(h)
        },
        sendLog: function(t) {
            (new Image).src = t
        },
        formatTime: function(t) {
            return parseInt(t) > 9 ? t : "0" + t
        },
        insertRelatedVideo: function(e) {
            var i = e.data("qbid")
              , n = this;
            if (i && !e.hasClass("has-recom"))
                if (b[i]) {
                    var o = b[i];
                    o[1] && n.insertVideoDom(o[1], e)
                } else
                    t.ajax({
                        url: "//ivideo.3g.qq.com/video/api/vendor@getFeedsRelatedList?vid=" + i + "&ps=2",
                        dataType: "json",
                        xhrFields: {
                            withCredentials: !0
                        }
                    }).then(function(t) {
                        if (t = t["vendor@getFeedsRelatedList"],
                        0 === t.code && t.data.list) {
                            var o = [];
                            t.data.list.forEach(function(t) {
                                var e = parseInt(t.duration);
                                t.formatDuration = t.duration ? n.formatTime(Math.floor(e / 60)) + ":" + n.formatTime(e % 60) : "",
                                t.qbid = i,
                                o.push({
                                    item: t,
                                    width: w + "px",
                                    height: y + "px",
                                    canTitlebarCustom: l.canTitlebarCustom
                                })
                            }),
                            b[i] = o,
                            o.length > 0 && n.insertVideoDom(o[0], e)
                        }
                    })
        },
        insertVideoDom: function(e, n) {
            var o = t(i(f, e));
            o.css("visibility", "hidden"),
            t(document.body).append(o);
            o.height();
            o.addClass("h0"),
            o.insertAfter(n),
            o.css("visibility", "visible"),
            o.css("height", n.height()),
            this.detectorIns.detect(),
            n.hasClass("h0") ? (n.addClass("has-recom"),
            o.addClass("has-recom")) : n.addClass("has-recom"),
            s.ckUserSend("indexPageUser", "insertRecomVideo")
        }
    }),
    {
        create: function(t) {
            return new d(t)
        }
    }
}),
define("tabs", ["m_zepto", "recom", "main", "video", "m_cookie", "modData", "m_log", "m_storage"], function(t, e, i, n, o, a, r, s) {
    function c() {
        l(),
        d()
    }
    function l() {
        var e = 1
          , i = m("tab");
        e = a.forceRecom || i && ["recom", "video", "main"].indexOf(i) > -1 ? a.tabVersion : parseInt(o.get("tabVersion")) || 1,
        R = _[e] || w,
        u(),
        console.log("tabVersion", e),
        2 === e || v(s.getItem(x)) || C.addClass("inum"),
        t.isFunction(history.replaceState) && history.replaceState(null, document.title, location.href.replace(/([?&])tab=[^&#]*/g, "$1tab=1"))
    }
    function d() {
        T.on("click", "li", function(e) {
            var i = t(e.currentTarget);
            k.removeClass("selected"),
            i.addClass("selected"),
            z = R,
            R = i.data("tab"),
            u(e),
            t.trigger(window, "switchTo" + R + "Tab"),
            t.trigger(window, "switchTab", [{
                curTab: R
            }])
        })
    }
    function u(t) {
        var e = F[R];
        f(t),
        h(),
        e.hasInit || (e.tabMod.init(),
        e.hasInit = !0),
        t && R == y && !v(s.getItem(x)) && (s.setItem({
            key: x,
            value: +new Date,
            ttl: 86400
        }),
        C.removeClass("inum")),
        t || (k.removeClass("selected"),
        T.find('[data-tab="' + R + '"]').addClass("selected"))
    }
    function h() {
        switch (R) {
        case w:
            p("show"),
            E.hide(),
            P.hide(),
            M.hide(),
            N.hide();
            break;
        case y:
            E.show(),
            M.show(),
            N.hide(),
            P.hide(),
            p("hide");
            break;
        case b:
            P.show(),
            N.show(),
            M.hide(),
            E.hide(),
            p("hide")
        }
    }
    function p(t) {
        "show" === t ? (I.show(),
        L.show(),
        D.show(),
        q.show(),
        j.show()) : (I.hide(),
        L.hide(),
        D.hide(),
        q.hide(),
        j.hide())
    }
    function f(e) {
        var i = F[R]
          , n = document.body.scrollTop
          , a = i.scrollTop
          , s = {
            pid: i.pid
        };
        if (F[z].scrollTop = n,
        t.trigger(window, "resetImgLazyLoad"),
        !e && r.ckUserSend("indexPageUser", "tabsPv," + R),
        o.set(A, i.ver, 60),
        e) {
            s.f_pid = F[z].pid,
            r.ckUserSend("indexPageUser", "tabsPv," + z + "2" + R);
            var c = t("#lincoapp-home-header").height();
            n > c && 0 == a && (a = c),
            window.scrollTo(0, a)
        }
        g(s)
    }
    function g(e) {
        var i = {
            aid: "index",
            channel: "index"
        };
        R === w ? r.pvSendAll(t.extend({}, i, e), i) : r.pvSend_2016(t.extend({}, {
            aid: "index"
        }, e))
    }
    function m(t) {
        var e = location.search.substring(1);
        if (e)
            for (var i = e.split("&"), n = 0, o = i.length; o > n; n++) {
                var a = i[n].split("=");
                if (a[0] == t)
                    return encodeURIComponent(a[1])
            }
    }
    function v(t) {
        var e = (new Date).getDate()
          , i = t ? new Date(t).getDate() : t;
        return t ? e === i : !1
    }
    var w = "mainNews"
      , y = "recomNews"
      , b = "videoNews"
      , _ = [w, w, y, b]
      , x = "recomTabNewTip"
      , A = "tabVersion"
      , T = t("#tab-switch-wrap")
      , k = T.find("li")
      , C = T.find(".recom")
      , S = (T.find(".video"),
    t("#lincowebapp-wrapper"))
      , I = S.find(".nav-wrap")
      , L = S.find(".main-tab-content")
      , q = S.find("#footer-wrap")
      , E = S.find(".recom-tab-content")
      , P = S.find(".video-tab-content")
      , D = t("#lincoapp-btn-custom")
      , j = t(".main-refresh-btn")
      , M = t(".recom-refresh-btn")
      , N = t(".video-refresh-btn")
      , F = {
        mainNews: {
            scrollTop: 0,
            pid: 135,
            ver: 1,
            hasInit: !1,
            tabMod: i
        },
        recomNews: {
            scrollTop: 0,
            pid: 150,
            ver: 2,
            hasInit: !1,
            tabMod: e
        },
        videoNews: {
            scrollTop: 0,
            pid: 151,
            ver: 3,
            hasInit: !1,
            tabMod: n
        }
    }
      , R = w
      , z = R;
    return {
        init: c
    }
}),
define("fixTab", ["m_zepto"], function(t) {
    function e() {
        s.hasClass("lincoapp-tab2") || (d = s.offset().top,u = s.height(),r() ? i() : (o(),n()))
    }
    function i() {
        s.addClass("skin-sticky")
    }
    function n() {
        l.on("touchstart", a),
        l.on("touchend", a),
        l.on("touchmove", a),
        l.on("scroll", a),
        l.on("resize", a),
        l.on("orientationchange", a)
    }
    function o() {
        h && (clearTimeout(h),
        h = null),
        h = setTimeout(function() {
            a()
        }, 50)
    }
    function a() {
        document.body.scrollTop > d ? (s.addClass("skin-fixed"),
        c.css("margin-bottom", u + "px")) : (s.removeClass("skin-fixed"),
        c.css("margin-bottom", 0))
    }
    function r() {
        for (var t = ["", "-webkit-", "-ms-", "-moz-", "-o-"], e = "", i = 0; i < t.length; i++)
            e += "position:" + t[i] + "sticky;";
        var n = document.createElement("div")
          , o = document.body;
        n.style.cssText = "display:none;" + e,
        o.appendChild(n);
        var a = /sticky/i.test(window.getComputedStyle(n).position);
        return o.removeChild(n),
        n = null,
        a
    }
    var s = t("#tab-switch-wrap")
      , c = t("#hd-wrap")
      , l = t(window)
      , d = (t(document.body),0)
      , u = s.height()
      , h = null;
    return {
        init: e
    }
}),
define("recomList", ["m_zepto", "m_log", "m_login", "m_tpl", "m_swipe", "m_crossStorage", "m_storage", "m_browserAds", "m_deferred", "m_stat", "m_util", "m_lazyLoad", "modData", "m_qqWebview"], function(t, e, i, n, o, a, r, s, c, l, d, u, h, p) {
    function f(e, i) {
        this.conf = t.extend(f.defaultOptions, i, !0),
        this.conf.container = e,
        this._init()
    }
    var g = location.href.indexOf("0309") > -1 ? "//inewsapi.cs0309.3g.qq.com/recom/api/" : "//inewsapi.3g.qq.com/recom/api/"
      , p = p.default
      , m = d.url.getUrlParam()
      , v = d.url.getHashParams().urlParams
      , w = m.debug || v.debug
      , y = {
        imageCover: "data:image/gif;base64,R0lGODlhAwACAIAAAP///wAAACH5BAEHAAEALAAAAAADAAIAAAICjF8AOw==",
        imageCut: "//cdn.read.html5.qq.com/image?src=3gqq&subsrc=index&q=6&r=4&imgflag=5&w=184&h=122&imageUrl=",
        urlParams: {
            f_pid: "150",
            f_aid_ext: "100000"
        },
        urlPostFix: function(e) {
            var i = d.url
              , n = t.extend({}, this.urlParams);
            if (!e.newsId)
                return e.url;
            e.url.indexOf("f_l") < 0 && (n.f_l = e.code),
            e.tid && 0 != e.tid && e.url.indexOf("topic=") < 0 && (n.topic = e.tid),
            1 == w && (n.debug = 1);
            for (key in n)
                e.url = i.addUrlParam(e.url, key, n[key]);
            return e.url
        },
        condition: function(t) {
            return t.imageCount <= 1
        },
        getInfoTpl: function(t) {
            var e = ""
              , i = ["热", "荐"];
            "探索" == t.label && (t.label = "");
            var n = i.indexOf(t.label) > -1 ? "type1" : "type2";
            return e += '<div class="info">',
            e += '<div class="info-lft">',
            e += t.label ? '<span class="tag ' + n + '">' + t.label + "</span>" : "",
            e += t.source ? '<span class="resource">' + t.source + "</span>" : "",
            e += t.readNum ? '<span class="iview">' + t.readNum + "</span>" : "",
            e += "</div>",
            e += '<span class="idislike h_dislike"></span>',
            e += "</div>"
        },
        getImageTpl: function(t) {
            return t.images && t.images[0] ? '<div class="u-img"><img src="' + this.imageCover + '" data-src="' + this.imageCut + t.images[0] + '" class="img"></div>' : ""
        },
        getLogPrams: function(t) {
            return [t.newsId, t.code, t.tid || "", "", t.ab || ""].join("-")
        },
        getOuterExtInfo: function(t) {
            return t.omni ? '<p class="pos" style="padding: 0 16px 5px; color:#2e80df;">' + t.newsId + "-" + t.omni.code + "-" + t.tid + "-" + t.omni.feature + "</p>" : ""
        },
        render: function(t) {
            return '<li class="news-item" data-log="' + this.getLogPrams(t) + '" data-id="' + t.newsId + '"><a data-href="' + this.urlPostFix(t) + '" class="a-lk ' + (0 == t.imageCount ? "noimg" : "") + '"><div class="detail"><strong class="tit">' + t.title + "</strong>" + this.getInfoTpl(t) + "</div>" + this.getImageTpl(t) + "</a>" + this.getOuterExtInfo(t) + "</li>"
        },
        create: function(e) {
            return t.extend({}, this, e)
        }
    }
      , b = y.create({
        imageCover: "data:image/gif;base64,R0lGODlhBAACAIAAAP///////yH5BAEHAAEALAAAAAAEAAIAAAIDjG8FADs=",
        imageCut: "//cdn.read.html5.qq.com/image?src=3gqq&subsrc=index&q=6&r=4&imgflag=5&w=639&h=320&imageUrl=",
        picResize: function(t) {
            return this.imageCut + t.images[0].replace(/\/320/, "/800")
        },
        condition: function(t) {
            return 0 == t.index && t.images.length >= 1 && t.canFront
        },
        render: function(t) {
            return '<li class="news-item" data-log="' + this.getLogPrams(t) + '"  data-id="' + t.newsId + '"><a data-href="' + this.urlPostFix(t) + '" class="a-lk bigimg"><div class="u-img"><img src="' + this.imageCover + '" data-src="' + this.picResize(t) + '" class="img"><div class="img-mask"></div><strong class="tit">' + t.title + "</strong></div>" + this.getInfoTpl(t) + "</a>" + this.getOuterExtInfo(t) + "</li>"
        }
    })
      , _ = y.create({
        condition: function(t) {
            return t.images && t.images.length >= 3
        },
        getImageTpl: function(t) {
            for (var e = "", i = t.images, n = 0; 3 > n; n++)
                e += '<div class="img-wrap"><img src="' + this.imageCover + '" data-src="' + this.imageCut + i[n] + '" class="img"></div>';
            return '<div class="u-img">' + e + "</div>"
        },
        render: function(t) {
            return '<li class="news-item" data-log="' + this.getLogPrams(t) + '" data-id="' + t.newsId + '"><a data-href="' + this.urlPostFix(t) + '" class="a-lk multi"><strong class="tit">' + t.title + "</strong>" + this.getImageTpl(t) + this.getInfoTpl(t) + "</a>" + this.getOuterExtInfo(t) + "</li>"
        }
    })
      , x = p.canTitlebarCustom ? "50px" : "10px"
      , A = "//cdn.read.html5.qq.com/image?src=3gqq&subsrc=index&q=6&r=4&imgflag=5&w=160&h=120&imageUrl="
      , T = "data:image/gif;base64,R0lGODlhBAADAIAAAP///wAAACH5BAEHAAEALAAAAAAEAAMAAAIDjI9WADs="
      , k = '<section class="lincoapp-home-section" style="padding-bottom: ' + x + '"><div class="h_main_list"></div><div class="lincoapp-btn2 h_more_btn" style="display:none"><span class="loading rotating"></span>正在载入新内容...</div></section>'
      , C = '<li class="h_head_news news-item">   <a data-href="<%=news.url%>" class="a-lk">        <div class="detail">            <strong class="tit"><%=news.title%></strong>            <div class="info">                <div class="info-lft">                   <span class="tag type1">头条</span>                    <span class="resource"><%=news.source%></span>               </div>           </div>        </div>       <%if(news.img){%>       <span class="u-img">            <img data-src="' + A + '<%=news.img%>" src="' + T + '" alt="" class="img">        </span>        <%}%>   </a> </li>'
      , S = '<%var listLen = topicList.length;%><div class="lincoapp-tag h_swipe">   <div class="channel-tab-con" id="swipeSection" >       <div class="tab-list-wrap">           <%for(var i = 0; i < topicList.length; i++){ var topics = topicList[i];%>           <div class="tab-list-item <%if(i == 0){%>selected<%}%>">                   <div class="tag-list ">                       <%for(var j = 0; j < topics.length; j++){ var topic = topics[j];%>                           <%if(topic.name != "" && topic.url != ""){%>                           <a href="<%=topic.url%>" data-id="<%=topic.id%>"><%=topic.name%></a>                           <%}%>                       <%}%>                   </div>           </div>           <%}%>       </div>   </div>   <%if(topicList.length > 1){%>   <div class="pointer">       <%for(var i = 0; i < topicList.length; i++){%>       <i <%if(i == 0){%>class="selected"<%}%>></i>       <%}%>   </div>   <%}%></div>';
    f.defaultOptions = {
        pn: "1",
        updatedTips: '<span class="success"></span>为您推荐#{num}条最新内容',
        netErrorTips: "网络不佳，请稍后再试",
        getAllTips: "已是最新内容，慢慢看",
        deleteTips: "将为您减少此类推荐",
        loadingBtn: '<span class="loading rotating"></span>正在载入新内容...',
        netErrorBtn: '内容网络异常，<em class="refresh">点击重新加载</em>',
        getAllBtn: i.isLogin() ? "内容有尽头，慢慢看" : '点击<em class="login">登录</em>，不一样的精彩',
        deleteMask: '<div class="mask h_delete"><button class="dislike">不感兴趣</button></div>',
        readMark: t('<div class="lincoapp-bar skin-loadmore h_read_mark"><p class="msg">上次读到这里，<span class="blue refresh">点击刷新</span></p></div>')
    };
    var I = f.prototype;
    return I._init = function() {
        this.conf.container.html(k),
        this._initConfig(),
        this._cacheDom(),
        this._bindEvent(),
        this._initCmsAds()
    }
    ,
    I._cacheDom = function() {
        var t = this
          , e = t.conf.container;
        t.feedsList = e.find(".h_main_list"),
        t.moreBtn = e.find(".h_more_btn")
    }
    ,
    I._initConfig = function() {
        var t = this
          , e = t.conf;
        t.loading = !1,
        t.retryCount = 0,
        e.action = e.action || "userFeed@getUserFeed",
        e.sectionAction = "userSection@getUserSection";
        var i = d.url.getUrlParam()
          , n = d.url.getHashParams().urlParams;
        t.isDebug = i.debug || n.debug,
        t.sections = [b, y, _],
        t.userModel = {
            mv: 1,
            mt: "",
            readHistory: "",
            model: ""
        },
        t.lazyLoad = u.getInstance({
            preloadHeight: 200,
            useWebp: !0,
            isNeedGif: !1
        })
    }
    ,
    I._initCard = function(e, i) {
        var o = this;
        try {
            e && e[0] && (o.headNews = t(n(C, {
                headNews: e
            }))),
            i.length > 0 && (o.userSection = t(n(S, {
                topicList: i
            })))
        } catch (a) {
            console.log("template error", a)
        }
    }
    ,
    I._initSwipe = function() {
        var t = this
          , e = t.conf.container;
        t.swipeElem || (t.swipeElem = e.find("#swipeSection")),
        t.swipe || (t.swipe = e.find(".h_swipe"));
        var i = t.swipe.find(".pointer i");
        i.length <= 1 || (this.swipeSection = o(t.swipeElem[0], {
            auto: 5e3,
            startSlide: 0,
            continuous: !0,
            useResizeEvent: !0,
            callback: function(t) {
                i.filter(".selected").removeClass("selected"),
                i.eq(t).addClass("selected")
            }
        }))
    }
    ,
    I._initCmsAds = function() {
        var e = this.conf
          , i = e.cmsAds;
        if (i) {
            i.pos = [];
            for (var n = 1; n <= i.totalPage; n++) {
                var o = n;
                t.each(i.perPagePos, function(t, e) {
                    i.pos.push("#cms-ads-" + e * o)
                })
            }
            this.browserAds = new s.default({
                adType: "feeds",
                pos: i.pos,
                adWrap: e.container,
                feedItem: "div",
                eventName: "RECOM_BROWSER_AD:afterRender",
                adId: i.adId
            })
        }
    }
    ,
    I._actionLazy = function() {
        this.lazyLoad.setLazyImgs(),
        this.lazyLoad.actionLazy()
    }
    ,
    I._bindEvent = function() {
        var n = this
          , o = n.conf.container;
        t(window).on("scroll", d.throttle(function() {
            n._checkPagePos()
        }, 200)),
        o.on("click", ".news-item", function(e) {
            var i = t(this)
              , a = t(e.target)
              , r = i.find("a").data("href");
            return o.find(".skin-del").removeClass("skin-del").find(".h_delete").remove(),
            a.hasClass("h_dislike") ? void i.height(i.height()).addClass("skin-del").append(n.conf.deleteMask) : a.hasClass("dislike") ? void i.addClass("deleted") : (i.addClass("h_last_read gray"),
            void (p.canOpenUrl && r ? p.openUrl(r, e) : r && (location.href = r)))
        }).on("click", ".h_more_btn .login", function() {
            i.login(function() {
                location.reload(!0)
            })
        }).on("click", ".h_more_btn .refresh, .h_read_mark .refresh", function() {
            n.requestData("before")
        }).on("webkitAnimationEnd", ".news-item", function() {
            var i = t(this)
              , o = i.data("id");
            if (0 === i.height()) {
                i.remove(),
                n._checkPagePos(),
                n._actionLazy();
                var a = i.find("a").data("href").split("?")[1]
                  , r = /f_aid_ext=\d+,(\d+)/gi
                  , s = r.exec(a)[1] || "";
                console.log("topic", s),
                e.ckUserSend("del_article", n.conf.bid + "," + s + "," + o),
                n._updateLoadMsg("delete")
            } else
                i.css("-webkit-animation", "liDeleteHeight 600ms 1 ease forwards")
        }),
        t.bind(this, "rendered", function() {
            o.find(".news-item").length < 8 && !n.loading && n.requestData(),
            "before" == n.pos && window.scrollTo(0, 0),
            1 == n.conf.pn && (n.moreBtn.show(),
            n.userSection && n.feedsList.append(n.userSection),
            n._initSwipe()),
            "before" == n.pos && p.canTitlebarCustom && t(o.find(".news-item a").get(0)).css("padding-top", 0),
            n._setLogParams(),
            n._actionLazy(),
            n._getUserModal(),
            n.browserAds.asyncAds(),
            n._updateLoadMsg(n.hasNext ? "success" : "getAll"),
            n.conf.pn++,
            t.trigger(window, "statDetectDom"),
            n.conf.cmsAds && t.trigger(window, "RECOM_BROWSER_AD:afterRender")
        }),
        t.bind(window, "switchTomainNewsTab", function() {
            console.log("leaveRecom"),
            n.swipeSection && n.swipeSection.stop()
        }),
        t.bind(window, "switchTovideoNewsTab", function() {
            console.log("leaveRecom"),
            n.swipeSection && n.swipeSection.stop()
        }),
        t.bind(window, "switchTorecomNewsTab", function() {
            console.log("backRecom"),
            n.swipeSection && (n.swipeSection.setup(),
            n.swipeSection.begin())
        })
    }
    ,
    I._getUserModal = function() {
        var t = this;
        if (r.isSupportLs) {
            var e = a.getInstance();
            return e.onConnect().then(function() {
                return e.get("GLOBAL_USER_MODEL")
            }).then(function(e) {
                e = e || {};
                var i = e.topics
                  , n = e.type
                  , o = e.version;
                t.userModel.model = i ? JSON.stringify(i) : "",
                t.userModel.mt = i ? n : "",
                t.userModel.mv = o ? o : 1
            }).then(function() {
                return e.get("GLOBAL_RECENTLY_READ")
            }).then(function(e) {
                e = e || [],
                t.userModel.readHistory = e.slice(0, 10).map(function(t) {
                    return t.id
                }).join(",")
            })["catch"](function(t) {
                console.log("getUserModel error:", t)
            })
        }
    }
    ,
    I._requestFn = function(i, n) {
        var o = this
          , a = o.conf;
        return t.ajax({
            url: g + n,
            data: i,
            dataType: "json",
            withCredentials: !0,
            timeout: 5e3
        }).then(function(t) {
            return e.ckUserSend("recom_tab", "getData," + o.pos + "," + a.pn),
            o.loading = !1,
            t
        }, function() {
            o.loading = !1,
            o._dataRetry()
        })
    }
    ,
    I.requestData = function(e) {
        var i = this
          , n = i.conf
          , o = null;
        if (!i.loading) {
            i.loading = !0,
            i.pos = 1 == n.pn || "before" == e ? "before" : "after";
            var a = {
                go: i.pos,
                rl: n.bid,
                pn: n.pn,
                ts: +new Date
            }
              , s = n.action;
            return 1 == i.isDebug && (a.mm = "debug"),
            1 == n.pn && (s += ",userSection@getUserSection"),
            r.isSupportLs && 1 == n.pn ? o = i._getUserModal() : (o = t.Deferred(),
            setTimeout(function() {
                o.resolve()
            }, 0)),
            o.then(function() {
                return i._requestFn(t.extend(a, i.userModel), s)
            }).then(function(t) {
                1 == n.pn && i._initCard(h.headNews.list, t[n.sectionAction].data),
                i._requestCb(t)
            })
        }
    }
    ,
    I._requestCb = function(t) {
        var i = this
          , n = i.conf;
        i.responseCode = t.code > 0 ? t[n.action].code : t.code,
        i.feedsData = t[n.action].data || {},
        i.lastUpdate = i.feedsData.updated || +new Date,
        i.hasNext = i.feedsData.hasNext,
        i.feedsData.news && i.feedsData.news.length > 0 ? (i._render(),
        i.retryCount > 0 && (i.retryCount = 0)) : (e.ckUserSend("recom_tab", "getDataError," + i.pos),
        i._dataRetry())
    }
    ,
    I._dataRetry = function() {
        var t = this;
        (t.responseCode < 0 || t.retryCount > 2) && (t._updateLoadMsg("netError"),
        e.ckUserSend("recom_tab", "getDataRetry," + t.pos)),
        t.retryCount < 2 && (t.retryCount++,
        t.requestData(t.pos))
    }
    ,
    I._render = function() {
        var e = this
          , i = e.conf
          , n = (i.container,
        "append")
          , o = '<ul class="lincoapp-graphic-list-recom">#{dom}</ul>'
          , a = [];
        t.each(e.feedsData.news, function(t, i) {
            i.index = t,
            a.push(e._getRenderSection(i))
        });
        var r = t(o.replace("#{dom}", a.join("")));
        "before" == e.pos && (r = e.renderBefore(r),
        n = "prepend"),
        i.cmsAds && i.pn <= i.cmsAds.totalPage && t.each(i.cmsAds.perPagePos, function(t, e) {
            var n = '<div id="cms-ads-' + e * i.pn + '"></div>'
              , o = r.children().eq(e - 2 + t);
            o.length > 0 ? o.after(n) : r.append(n)
        }),
        e.feedsList[n](r),
        t.trigger(e, "rendered")
    }
    ,
    I.renderBefore = function(t) {
        var e = this
          , i = this.conf;
        if (i.pn > 1) {
            var n = e.feedsList.find("ul").eq(0);
            n.before(i.readMark),
            e.swipe.after(n)
        }
        if (e.headNews) {
            var o = t.children().eq(0);
            o.length > 0 ? e.headNews.insertAfter(o) : t.prepend(e.headNews),
            e.feedsList.find(".h_head_news").remove()
        }
        return t
    }
    ,
    I._getRenderSection = function(e) {
        var i, n = this;
        t.each(n.sections, function(n, o) {
            return o.condition(e) ? (i = o,
            i.urlParams = t.extend(i.urlParams, {
                f_aid_ext: "100000," + e.tid
            }),
            !1) : void 0
        });
        var o = i || y;
        return o.render(e)
    }
    ,
    I._updateLoadMsg = function(i) {
        var n = this
          , o = this.conf;
        if ("netError" == i)
            "before" == n.pos && t.trigger(window, "showTips", [o.netErrorTips]),
            n.moreBtn.html(o.netErrorTips);
        else if ("success" == i) {
            var a = n.feedsData.news.length;
            "before" == n.pos && t.trigger(window, "showTips", [o.updatedTips.replace("#{num}", a)]),
            n.moreBtn.html(o.loadingBtn)
        } else
            "getAll" == i ? ("before" == n.pos && t.trigger(window, "showTips", [o.getAllTips]),
            e.ckUserSend("recom_tab", "getAllData")) : "delete" == i && t.trigger(window, "showTips", [o.deleteTips])
    }
    ,
    I._setLogParams = function() {
        {
            var e = this.conf
              , i = e.container
              , n = i.find("ul").not(".has-shown")
              , o = "comtemplog::" + e.bid + ",,,";
            n.length
        }
        t.each(n, function(e, i) {
            var n = t(i)
              , a = n.find("li");
            o += t.map(a, function(e) {
                var i = t(e).data("log");
                return t(e).removeAttr("data-log"),
                i
            }).join("@"),
            n.attr("data-log-exp", "compose").data("log-params", o).addClass("has-shown")
        })
    }
    ,
    I.getCacheData = function() {
        var t = this
          , e = t.conf
          , i = e.container;
        return {
            pn: e.pn,
            scrollPos: window.scrollY,
            html: i.html(),
            hasNext: t.hasNext,
            qq: e.uin,
            time: +new Date
        }
    }
    ,
    I.setCacheData = function(t) {
        var e = this
          , i = e.conf
          , n = i.container;
        i.pn = t.pn,
        i.scrollPos = t.scrollPos,
        e.hasNext = t.hasNext,
        n.html(t.html),
        e._cacheDom(),
        n.find(".h_read_mark").remove(),
        n.find(".h_last_read").removeClass("h_last_read").last().after(i.readMark),
        window.scrollTo(0, i.scrollPos),
        e._actionLazy(),
        e._initSwipe(),
        e._getUserModal()
    }
    ,
    I._checkPagePos = function() {
        var t = this
          , e = t.conf.container;
        if (!t.loading) {
            var i = e.height()
              , n = i - window.innerHeight - window.scrollY
              , o = e.find(".news-item").length;
            (40 > n && i > 0 || 5 > o) && t.requestData()
        }
    }
    ,
    f.create = function(t, e) {
        return t || console.log("container is required!"),
        new f(t,e)
    }
    ,
    f
}),
define("m_qqWebview", ["m_zepto", "m_browser", "m_cookie"], function(t, e, i) {
    "use strict";
    function n(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }
    var o = {};
    Object.defineProperty(o, "__esModule", {
        value: !0
    });
    var a = n(t)
      , r = n(e)
      , s = n(i)
      , c = "canTitlebarCustom"
      , l = "canTitlebarAlpha"
      , d = ".3g.qq.com"
      , u = 60
      , h = {
        navBgColor: 2588130,
        navTextColor: 16777215,
        left: {
            title: "返回",
            callback: function() {
                window.history.back(),
                mqq.ui.popBack()
            }
        },
        right: {
            title: "分享",
            iconID: 4,
            callback: function() {
                mqq.ui.showShareMenu()
            }
        }
    }
      , p = !1
      , f = !1
      , g = !1
      , m = !1
      , v = !1
      , w = {
        init: function() {
            r.default.isFromQQ && window.mqq && (this.checkTitlebar(),
            this.checkCanOpenUrl(),
            this.actExport(),
            this.setDefault(),
            this.setCookie())
        },
        checkTitlebar: function() {
            mqq.compare(!0) && (p = !0),
            mqq.compare("6.3.5") >= 0 && (f = !0)
        },
        checkCanOpenUrl: function() {
            var t = !1;
            return mqq.compare("4.6") >= 0 && (g = !0,
            t = !0),
            t
        },
        setCookie: function() {
            p && !s.default.get(c) && s.default.set(c, p, u, d),
            f && !s.default.get(l) && s.default.set(l, f, u, d)
        },
        actExport: function() {
            var t = s.default.get(c)
              , e = s.default.get(c);
            m = "true" === t ? !0 : !1,
            v = "true" === e ? !0 : !1
        },
        setDefault: function() {
            m && mqq.ui.setWebViewBehavior({
                navBgColor: 2588130,
                webPageBackgroundColorOpen: !0,
                webPageBackgroundColor: 16777215
            })
        }
    };
    w.init();
    var y = function(t) {
        m && (t = a.default.extend({}, h, t || {}),
        mqq.ui.setWebViewBehavior({
            navBgColor: t.navBgColor,
            navTextColor: t.navTextColor
        }),
        mqq.ui.setTitleButtons({
            left: {
                title: t.left.title,
                callback: t.left.callback
            },
            right: {
                title: t.right.title,
                callback: t.right.callback
            }
        }))
    }
      , b = function(t) {
        t = t || document.title,
        document.title = t
    }
      , _ = function(t, e) {
        g && (e && e.preventDefault(),
        mqq.ui.openUrl({
            url: t,
            target: 1
        }))
    };
    return o.default = {
        canTitlebarCustom: m,
        canTitlebarAlpha: v,
        canOpenUrl: g,
        openUrl: _,
        setTitleBar: y,
        setTitle: b
    },
    o
}),
define("m_visbleDetector", ["m_zepto"], function(t) {
    "use strict";
    function e(t) {
        return t && t.__esModule ? t : {
            "default": t
        }
    }
    function i(t, e) {
        if (!(t instanceof e))
            throw new TypeError("Cannot call a class as a function")
    }
    var n = {};
    Object.defineProperty(n, "__esModule", {
        value: !0
    }),
    n.VisbleDetector = void 0;
    {
        var o = e(t)
          , a = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1,
                    n.configurable = !0,
                    "value"in n && (n.writable = !0),
                    Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i),
                n && t(e, n),
                e
            }
        }();
        n.VisbleDetector = function() {
            function t(e) {
                var n = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
                i(this, t),
                this._watchs = [],
                this._detect_flag = n.flag || "[aria-detect]",
                this._ratio = n.ratio || .8,
                this._isWindow = e[0]instanceof Window,
                this.$body = e
            }
            return a(t, [{
                key: "getElemRect",
                value: function(t) {
                    var e = t.getBoundingClientRect();
                    return {
                        width: e.width || e.right - e.left,
                        height: e.height || e.bottom - e.top,
                        left: e.left,
                        right: e.right,
                        top: e.top,
                        bottom: e.bottom
                    }
                }
            }, {
                key: "checkElemArea",
                value: function(t, e) {
                    var i = this.getElemRect(t);
                    i.left = i.left - e.left,
                    i.top = i.top - e.top;
                    var n = this._ratio || .8
                      , o = {
                        width: i.width * (1 - n),
                        height: i.height * (1 - n)
                    }
                      , a = i.left + o.width >= 0 && i.left - o.width <= e.width - i.width
                      , r = i.top + o.height >= 0 && i.top - o.height <= e.height - i.height
                      , s = 0;
                    if (a && r) {
                        var c = i.left <= 0 ? e.left : e.left + i.left
                          , l = i.left + i.width <= e.width ? i.left + i.width + e.left : e.left + e.width
                          , d = i.top <= 0 ? e.top : e.top + i.top
                          , u = i.top + i.height <= e.height ? i.top + i.height + e.top : e.top + e.height;
                        s = (u - d) * (l - c)
                    }
                    return s
                }
            }, {
                key: "checkIsVisble",
                value: function(t) {
                    var e = o.default(t);
                    return "none" != e.css("display") && "hidden" != e.css("visibility") && e.height() > 0
                }
            }, {
                key: "detect",
                value: function() {
                    var t;
                    t = this._isWindow ? o.default("body") : this.$body;
                    var e = t.find(this._detect_flag).not(function() {
                        return this.__is_detect ? !0 : (this.__is_detect = !0,
                        !1)
                    }).toArray();
                    this._watchs = this._watchs.concat(e)
                }
            }, {
                key: "digest",
                value: function() {
                    var t, e = this.$body;
                    t = this._isWindow ? {
                        left: 0,
                        top: 0,
                        width: e.width(),
                        height: e.height()
                    } : e.offset();
                    for (var i, n = [], o = [], a = 0; i = this._watchs[a]; a++)
                        if (this.checkIsVisble(i)) {
                            var r = this.checkElemArea(i, t);
                            i.__vArea = r,
                            r > 0 ? n.push(i) : o.push(i)
                        }
                    return n.sort(function(t, e) {
                        return t.__vArea < e.__vArea
                    }),
                    {
                        vis: n,
                        invis: o
                    }
                }
            }]),
            t
        }()
    }
    return n
}),
define("m_video", ["m_zepto", "m_loader", "m_log", "m_msg"], function(t, e, i, n) {
    function o(e) {
        this.index = 0,
        this.curVidLoged = !1,
        this.lastErrored = !1,
        this.inited = !1,
        this.unInitedTask = [],
        this.config = t.extend({}, p, e),
        t.os.ios || (this.config.hijack_recommend = !1),
        "DEP_WIFI" === this.config.isAutoPlay && (this.config.isAutoPlay = this.config.isWifi ? !0 : !1)
    }
    var a = navigator.userAgent
      , r = !!a.match(/MQQBrowser/)
      , s = !1
      , c = !1
      , l = []
      , d = "//imgcache.qq.com/tencentvideo_v1/tvp/js/tvp.player_v2.js"
      , u = "//ivideo.3g.qq.com/video/api/play@getVideoInfo?"
      , h = function(t) {
        return window.tvp && window.tvp.Player ? void t() : (l.push(t),
        void (c || (c = !0,
        e.load.loadScript(d, function() {
            s = !0;
            for (var t, e = l.length, i = 0; e > i; i++)
                t = l.shift(),
                t && t()
        }))))
    }
      , p = {
        videoHeight: "197px",
        videoWidth: "PAGE_WIDTH",
        hijack_recommend: !1,
        has_end_recommend: !1,
        isWifi: !1,
        isAutoPlay: "DEP_WIFI",
        useH5Ad: !r,
        cb: !1,
        obj: !1,
        downloadAppBanner: !1,
        poster: "",
        logInfo: {
            pid: "",
            from: "",
            playfrom: "",
            getter: function() {
                return {}
            },
            pvLog: !1
        },
        resizeDefaultClientWidth: !0
    };
    return o.prototype = {
        _init: function() {
            var e = this;
            this.player = new tvp.Player,
            this.videoObj = new tvp.VideoInfo,
            this.createdPlayer = !1,
            this.noPlayerId = "no_video_" + t.uuid(),
            t('<div class="video_area" id="' + this.noPlayerId + '" style="text-align: center;min-height: initial;display:none;"><img src="//3glogo.gtimg.com/wap30/info/video/img/vodeo_default.png" alt="" class="img"><img src="//3gimg.qq.com/wap30/infoapp/touch/video/images/iplay.png" alt="" class="iplay hide"></div>').insertAfter(t("#" + this.config.obj)),
            this.noPlayer = t("#" + this.noPlayerId),
            window.addEventListener("resize", function() {
                var t = window.innerWidth + "px"
                  , i = "100%";
                e.config.resizeDefaultClientWidth || (t = e.config.videoWidth,
                i = e.config.videoHeight),
                e.player.resize(t, i)
            }, !1),
            this.inited = !0;
            for (var i, n = 0; n < e.unInitedTask.length; n++)
                i = e.unInitedTask[n],
                e[i.fnName].apply(e, i.fnArgs);
            e.unInitedTask = []
        },
        _setRelatedLink: function() {
            hijack_recommend && has_end_recommend && t("#" + this.obj).on("click", ".tvp_related .tvp_related_link", function(e) {
                var i = t(this).attr("data-vid");
                return i ? (e.preventDefault(),
                !1) : !0
            })
        },
        _fetch: function(e, i) {
            e = t.trim(e);
            var n = this;
            this.curVidLoged = !1,
            this.vid = e,
            "undefined" != typeof e ? this.vid = e : this.playList.length > 0 && (this.vid = this.playList[0].vid);
            var o = "videodata"
              , a = "play@getVideoInfo"
              , r = {
                action: o,
                vd_vid: e,
                key: a
            };
            i && (r.vd_tid = i),
            t.ajax({
                type: "GET",
                url: u + t.param(r),
                dataType: "json",
                success: function(t) {
                    if (t && t[a] && t[a].data) {
                        var e = t[a].data;
                        n.lastErrored && n._init(),
                        n._handlePlayer(e)
                    }
                }
            })
        },
        _handlePlayer: function(e) {
            var i = this;
            i._showPlayer(),
            i.videoObj.setVid(i.vid),
            e.videodata.omgcid && i.videoObj.setCoverId(e.videodata.omgcid),
            i.title = e.videodata.title,
            i.subtype = e.videodata.subtype,
            i.duration = e.videodata.duration,
            i.videoObj.setTagStart(0),
            i.createdPlayer ? (i.config.poster && i.player.setPoster(i.config.poster),
            i.player.setCurVideo(i.videoObj),
            i.player.addParam("pic", e.videodata.picurl || e.videodata.picUrl),
            i.player.addParam("autoplay", i.config.isAutoPlay),
            i.config.isAutoPlay ? i.player.play(i.videoObj) : i.player.play(i.videoObj, !1)) : i._createPlayer(e),
            n.notify("video:updateAlbumTitle", [e.videodata]),
            n.notify("video:shareDataUpdate", [t.extend(e.videodata, {
                vid: i.vid,
                shareUrls: {}
            })]),
            i.config.cb && i.config.cb(t.extend(e.videodata, {
                vid: i.vid,
                shareUrls: {},
                hot: {}
            })),
            i.config.logInfo.pvLog && i._sendLog("play_pv")
        },
        _createPlayer: function(e) {
            var i = this
              , o = e && "live" === e;
            i.createdPlayer = !0;
            var a = "PAGE_WIDTH" === i.config.videoWidth ? window.innerWidth + "px" : i.config.videoWidth
              , r = function(t) {
                return i.config.hasOwnProperty(t)
            }
              , s = {
                width: a,
                height: i.config.videoHeight,
                video: i.videoObj,
                modId: i.config.obj,
                autoplay: i.config.isAutoPlay,
                isHtml5ShowLoadingAdOnStart: r("isHtml5ShowLoadingAdOnStart") ? i.config.isHtml5ShowLoadingAdOnStart : i.config.useH5Ad,
                isHtml5ShowLoadingAdOnChange: r("isHtml5ShowLoadingAdOnChange") ? i.config.isHtml5ShowLoadingAdOnChange : i.config.useH5Ad,
                isHtml5UseUI: r("isHtml5UseUI") ? i.config.isHtml5UseUI : i.config.useH5Ad,
                loadingadAutoplay: i.config.isAutoPlay,
                autoplayAfterLoadingad: !0,
                isSkipLoadingAd: !0,
                isHtml5UseAirPlay: !0,
                onerror: function() {
                    i.lastErrored = !0,
                    n.notify("video:error", [i.vid])
                },
                oninited: function() {
                    var t = i.config.isAutoPlay;
                    t && (i.player.addParam("autoplay", t),
                    i.player && i.player.pause && i.player.pause(),
                    i.player.play(i.videoObj))
                },
                onchange: function() {
                    i.player && i.player.pause && i.player.pause()
                },
                onallended: function() {
                    i.player && i.player.pause && i.player.pause(),
                    i._listPlayNext(),
                    n.notify("video:ended", [i.vid])
                },
                onplaying: function() {
                    i.curVidLoged || (i._sendLog(o ? "play_lv" : "play_vv"),
                    i.curVidLoged = !0),
                    n.notify("video:playing", [i.vid]),
                    t.trigger(i, "video:playing", [{
                        vid: i.vid
                    }])
                },
                onpause: function() {
                    n.notify("video:pause", [i.vid]),
                    t.trigger(i, "video:pause", [{
                        vid: i.vid
                    }])
                },
                plugins: {
                    AppRecommend: i.config.has_end_recommend
                },
                onwrite: function() {
                    i.config.poster && i.player.setPoster(i.config.poster)
                }
            };
            o ? (s.type = 1,
            i.cur_livePid && (s.livepid = i.cur_livePid)) : s.pic = e.videodata.picurl || e.videodata.picUrl,
            i.config.downloadAppBanner && (s.plugins.AppBanner = {
                promotionId: 691,
                downloadUrl: "http://mcgi.v.qq.com/commdatav2?cmd=4&confid=691&platform=aphone"
            }),
            i.player.create(s),
            setTimeout(function() {
                var e = t("#" + s.modId + " video")[0];
                e && (e.ontimeupdate = function() {
                    t.trigger(window, "onVideoTimeuUdate", [{
                        currentTime: e.currentTime
                    }])
                }
                )
            }, 800)
        },
        _sendLog: function(e) {
            var n = this
              , o = this.config.logInfo;
            if ("play_lv" !== e) {
                var a = 0;
                try {
                    var r = n.duration.split("分");
                    a = 2 === r.length ? 60 * parseInt(r[0]) + parseInt(r[1].split("秒")[0]) : parseInt(r[0].split("秒")[0])
                } catch (s) {}
                var c = n.cid || ""
                  , l = n.cidTitle || ""
                  , d = {
                    pid: n.config.logInfo.pid,
                    aid: e,
                    st: 1,
                    readType: [c, n.vid, l, n.title, n.config.logInfo.from, n.subtype, n.config.logInfo.playfrom, a].join("@")
                };
                "play_vv" === e && (d.writeType = "1",
                d.newsContentType = "-"),
                i.pvSend(d)
            }
            if (o.isSendQB && "play_vv" === e) {
                var u = "//aibo.3g.qq.com/g/s?aid=action_api&module=video&action=ctr";
                u += "&vid=" + n.vid + "&type=2",
                o.qbCate && (u += "&cid=" + o.qbCate),
                i.send(u)
            }
            if (o.getter) {
                var h = {}
                  , p = {
                    istranslate: "false",
                    pid: o.pid,
                    st: 2,
                    f26: n.vid,
                    f27: c,
                    f28: n.title || "",
                    f29: l,
                    f30: n.subtype || "",
                    f31: a,
                    f32: "play_vv" === e ? "1" : "0"
                };
                "play_lv" === e && (p = {
                    istranslate: "false",
                    pid: o.pid,
                    st: 6,
                    f26: n.cur_channelId,
                    f27: n.cur_channelName
                }),
                "function" == typeof o.getter ? h = o.getter() : t.isPlainObject(o.getter) && (h = o.getter),
                i.pvSend_2016(t.extend(p, h))
            }
        },
        _listPlayNext: function() {
            var e = this;
            if ((!t.os.android || !r) && e.playList && e.playList.length > 0 && e.index < e.playList.length - 1) {
                e.index++;
                var i = e.playList[e.index];
                i.vid && (e._fetch(i.vid),
                n.notify("video:next", [{
                    index: e.index
                }]))
            }
        },
        _showPlayer: function() {
            this.noPlayer.hide(),
            t("#" + this.config.obj).show()
        },
        listPlay: function(t) {
            if (!this.inited)
                return this.unInitedTask.push({
                    fnName: "listPlay",
                    fnArgs: arguments
                });
            this.setPlayList(t.list),
            this.index = t.index || 0;
            var e = this.playList[this.index];
            this._fetch(e.vid)
        },
        play: function(e, i) {
            return this.inited ? (this.setPlayList([]),
            this.index = 0,
            void (t.isPlainObject(e) && e.vid ? (this.curVidLoged = !1,
            this.vid = e.vid,
            this._handlePlayer(e)) : this._fetch(e, i))) : this.unInitedTask.push({
                fnName: "play",
                fnArgs: arguments
            })
        },
        livePlay: function(t, e, i) {
            return this.inited ? (this.curVidLoged = !1,
            this.cur_channelId = t,
            this.cur_livePid = e || null,
            this.cur_channelName = i || "默认视频直播名称",
            this.videoObj.setChannelId(t),
            void this._createPlayer("live")) : this.unInitedTask.push({
                fnName: "livePlay",
                fnArgs: arguments
            })
        },
        setAutoPlay: function(t) {
            return this.inited ? void (this.config.isAutoPlay = t) : this.unInitedTask.push({
                fnName: "setAutoPlay",
                fnArgs: arguments
            })
        },
        setPlayList: function(t) {
            return this.inited ? void (this.playList = t) : this.unInitedTask.push({
                fnName: "setPlayList",
                fnArgs: arguments
            })
        },
        setVid: function(t) {
            return this.inited ? void (this.vid = t) : this.unInitedTask.push({
                fnName: "setVid",
                fnArgs: arguments
            })
        },
        setCid: function(t) {
            return this.inited ? void (this.cid = t) : this.unInitedTask.push({
                fnName: "setCid",
                fnArgs: arguments
            })
        },
        setCidTitle: function(t) {
            return this.inited ? void (this.cidTitle = t) : this.unInitedTask.push({
                fnName: "setCidTitle",
                fnArgs: arguments
            })
        },
        setLogFrom: function(t) {
            return this.inited ? void (this.config.logInfo.from = t) : this.unInitedTask.push({
                fnName: "setLogFrom",
                fnArgs: arguments
            })
        },
        getVid: function() {
            return this.inited ? this.vid : void 0
        },
        reset: function() {
            this.inited && (this.player.addParam("pic", "http://3glogo.gtimg.com/wap30/info/video/img/vodeo_default.png"),
            t("#" + this.config.obj).hide(),
            this.noPlayer.show())
        },
        pause: function() {
            this.inited && this.player && this.player.pause && this.player.pause()
        },
        getPlaytime: function() {
            return this.inited && this.player && this.player.getPlaytime ? this.player.getPlaytime() : void 0
        },
        cancelFullSceen: function() {
            this.inited && this.player && this.player.cancelFullScreen && this.player.cancelFullScreen()
        },
        siglePlay: function(t) {
            this.inited && this.play(t.vid)
        },
        fetch: function(t) {
            this.inited && this._fetch(t)
        },
        setVideoPoster: function(t) {
            t && (this.config.poster = t)
        }
    },
    {
        creat: function(t) {
            var e = new o(t);
            return h(function() {
                e._init()
            }),
            e
        },
        loadTvp: function(t) {
            h(function() {
                t(window.tvp)
            })
        }
    }
});
