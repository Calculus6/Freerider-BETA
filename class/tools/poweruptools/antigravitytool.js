import i from "../../math/cartesian.js";
import Tool from "../tool.js";
import n from "../../sector/powerups/antigravity.js";

export default class extends Tool {
    constructor(t) {
        super(t);
        this.powerup = new n(0, 0, t.scene.track);
        this.p1 = new i(0, 0);
        this.p2 = new i(0, 0);
        this.active = !1;
    }
    powerup = null;
    name = "antigravity";
    p1 = null;
    p2 = null;
    active = !1;
    draw(t) {
        var e = this.mouse.touch
          , i = (e.pos,
        this.camera.zoom)
          , s = this.scene.settings.device
          , n = this.scene.screen;
        if (this.active === !0) {
            var r = n.realToScreen(this.p1.x, "x")
              , o = n.realToScreen(this.p1.y, "y");
            t.globalAlpha = .4,
            this.powerup.draw(r, o, i, t),
            t.globalAlpha = 1
        } else if ("desktop" === s) {
            var r = n.realToScreen(e.real.x, "x")
              , o = n.realToScreen(e.real.y, "y");
            t.globalAlpha = .8,
            this.powerup.draw(r, o, i, t),
            t.globalAlpha = 1
        }
    }
    press() {
        var t = this.mouse.touch
          , e = t.real;
        this.p1.x = e.x,
        this.p1.y = e.y;
        var i = this.scene.track
          , s = new n(this.p1.x,this.p1.y,i);
        i.addPowerup(s),
        this.toolhandler.addActionToTimeline({
            type: "add",
            objects: [s]
        })
    }
}