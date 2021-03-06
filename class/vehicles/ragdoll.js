import Vector from "../math/cartesian.js";
import n from "./mass.js";
import r from "./spring.js";
import Vehicle from "./vehicle.js";

export default class extends Vehicle {
    constructor(t, e) {
        super();
        this.parent = e;
        var i, o, a, h, l, c, u, p, d, f, v = [], g = [], m = new Vector(0,0);
        i = new n(m, e),
        o = new n(m, e),
        a = new n(m, e),
        h = new n(m, e),
        c = new n(m, e),
        l = new n(m, e),
        u = new n(m, e),
        p = new n(m, e),
        d = new n(m, e),
        f = new n(m, e),
        v.push(i),
        v.push(o),
        v.push(a),
        v.push(h),
        v.push(c),
        v.push(l),
        v.push(u),
        v.push(p),
        v.push(d),
        v.push(f),
        g.push(new r(i,o,this)),
        g.push(new r(i,a,this)),
        g.push(new r(a,c,this)),
        g.push(new r(i,h,this)),
        g.push(new r(h,l,this)),
        g.push(new r(o,u,this)),
        g.push(new r(u,d,this)),
        g.push(new r(o,p,this)),
        g.push(new r(p,f,this));
        for (var y in v)
            v[y].radius = 3;
        for (var y in v)
            v[y].friction = .05;
        i.radius = o.radius = 8;
        for (var y in g)
            g[y].springConstant = .4;
        for (var y in g)
            g[y].dampConstant = .7;
        this.masses = v,
        this.springs = g,
        this.head = i,
        this.waist = o,
        this.lElbow = a,
        this.rElbow = h,
        this.rHand = l,
        this.lHand = c,
        this.lKnee = u,
        this.rKnee = p,
        this.lFoot = d,
        this.rFoot = f;
        for (var y in t)
            this[y].pos.equ(t[y])
    }
    parent = null;
    zero(t, e) {
        t = t.factor(.7),
        e = e.factor(.7);
        var i = this.springs
            , s = this.masses;
        for (var n in i) {
            var r = i[n].m2.pos.sub(i[n].m1.pos).len();
            i[n].lrest = r,
            i[n].leff = r
        }
        for (var n = 1; 4 >= n; n++)
            i[n].lrest = 13,
            i[n].leff = 13;
        for (var n in i)
            i[n].leff > 20 && (i[n].lrest = 20,
            i[n].leff = 20);
        var o = [this.head, this.lElbow, this.rElbow, this.lHand, this.rHand]
            , a = [this.waist, this.lKnee, this.rKnee, this.lFoot, this.rFoot];
        for (var n in o)
            o[n].old = o[n].pos.sub(t);
        for (var n in a)
            a[n].old = a[n].pos.sub(e);
        for (var n in s)
            s[n].vel.equ(s[n].pos.sub(s[n].old)),
            s[n].vel.x += 1 * (Math.random() - Math.random()),
            s[n].vel.y += 1 * (Math.random() - Math.random())
    }
    draw() {
        var t = this.head,
            e = this.waist,
            i = this.lElbow,
            s = this.rElbow,
            n = this.rHand,
            r = this.lHand,
            o = this.lKnee,
            a = this.rKnee,
            h = this.lFoot,
            l = this.rFoot,
            c = this.parent.scene,
            u = c.camera,
            p = u.zoom,
            d = c.game.canvas.getContext("2d"),
            f = this.parent.alpha || 1;
        d.strokeStyle = lite.getVar("dark") ? "rgba(255,255,255," + .5 * f + ")" : "rgba(0,0,0," + .5 * f + ")",
        d.lineWidth = 5 * p,
        d.lineCap = "round",
        d.lineJoin = "round";
        var v = t.pos.toScreen(c);
        d.beginPath(),
        d.moveTo(v.x, v.y);
        var g = i.pos.toScreen(c);
        d.lineTo(g.x, g.y);
        var m = r.pos.toScreen(c);
        d.lineTo(m.x, m.y),
        d.stroke(),
        d.strokeStyle = lite.getVar("dark") ? "rgba(255,255,255," + f + ")" : "rgba(0,0,0," + f + ")",
        d.beginPath(),
        d.moveTo(v.x, v.y);
        var y = s.pos.toScreen(c);
        d.lineTo(y.x, y.y);
        var w = n.pos.toScreen(c);
        d.lineTo(w.x, w.y),
        d.stroke(),
        d.strokeStyle = lite.getVar("dark") ? "rgba(255,255,255," + f + ")" : "rgba(0,0,0," + f + ")",
        d.lineWidth = 8 * p,
        d.beginPath(),
        d.moveTo(v.x, v.y);
        var x = e.pos.toScreen(c);
        d.lineTo(x.x, x.y),
        d.stroke(),
        d.lineWidth = 5 * p,
        d.beginPath(),
        d.moveTo(x.x, x.y);
        var _ = o.pos.toScreen(c);
        d.lineTo(_.x, _.y);
        var b = h.pos.toScreen(c);
        d.lineTo(b.x, b.y);
        var T = o.pos.sub(e.pos).normalize();
        T = T.factor(4).add(h.pos);
        var C = T.toScreen(c);
        d.lineTo(C.x, C.y),
        d.stroke(),
        d.strokeStyle = lite.getVar("dark") ? "rgba(255,255,255," + .5 * f + ")" : "rgba(0,0,0," + .5 * f + ")",
        d.lineWidth = 5 * p,
        d.beginPath(),
        d.moveTo(x.x, x.y);
        var k = a.pos.toScreen(c);
        d.lineTo(k.x, k.y);
        var S = a.pos.sub(e.pos).normalize();
        S = S.factor(4).add(l.pos);
        var P = l.pos.toScreen(c);
        d.lineTo(P.x, P.y);
        var M = S.toScreen(c);
        d.lineTo(M.x, M.y),
        d.stroke(),
        v.inc(v.sub(x).factor(.25));
        if (window.lite.getVar("cr")) {
            let t = v.sub(x)
              , e = new Vector(t.y,-t.x)
              , i = v.add(e.factor(.15 * this.dir)).add(t.factor(-.05))
              , s = v.add(e.factor(-.35 * this.dir)).add(t.factor(.15));
            d.beginPath(),
            d.arc(v.x, v.y, 5 * p, 0, 2 * Math.PI, !1),
            d.moveTo(i.x, i.y),
            d.lineTo(s.x, s.y),
            d.lineWidth = 2 * p,
            d.strokeStyle = lite.getVar("dark") ? "#fdfdfd" : "#000",
            d.stroke()
        } else {
            var D = GameInventoryManager.getItem(this.parent.cosmetics.head)
            , I = this.drawHeadAngle;
            D.draw(d, v.x, v.y, I, p, this.dir, 1)
        }
    }
    update() {
        for (const t of this.springs)
            t.update();
        for (const t of this.masses)
            t.update();
        this.updateDrawHeadAngle()
    }
    updateDrawHeadAngle() {
        var t, e;
        this.dir < 0 ? (e = this.head.pos,
        t = this.waist.pos) : (t = this.head.pos,
        e = this.waist.pos);
        var i = t.x
            , s = t.y
            , n = e.x
            , r = e.y
            , o = i - n
            , h = s - r;
        this.drawHeadAngle = -(Math.atan2(o, h) + Math.PI)
    }
}