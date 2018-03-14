// 腾讯网 webAPP fixTab 方案
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
})