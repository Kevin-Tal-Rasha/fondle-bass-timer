import Material from './Material'
import Particle from './Particle'
import Node from './Node'

class LiquidSystem {
    #canvas;
    #ctx;

    constructor(canvas, gsizeX, gsizeY, particlesX, particlesY) {
        this.#canvas = canvas;
        this.#ctx = canvas.getContext('2d');

        this.init(gsizeX, gsizeY, particlesX, particlesY);
    }

    init(gsizeX, gsizeY, particlesX, particlesY) {
        this.particles = [];

        this.gsizeX = gsizeX;
        this.gsizeY = gsizeY;

        this.grid = [[]]; //Nodes
        this.active = []; //Nodes
        this.water = new Material(1.0, 1.0, 1.0, 1.0, 1.0, 1.0);
        this.pressed = false;
        this.pressedprev = false;

        this.mx = 0;
        this.my = 0;
        this.mxprev = 0;
        this.myprev = 0;

        var i = 0, j = 0;
        this.grid = [];
        for (i = 0; i < this.gsizeX; i++) {
            this.grid.push([]);
            for (j = 0; j < this.gsizeY; j++) {
                this.grid[i].push(new Node());
            }
        }

        var p;
        for (i = 0; i < particlesX; i++)
            for (j = 0; j < particlesY; j++) {
                p = new Particle(this.water, i + 4, j + 4, 0.0, 0.0);
                this.particles.push(p);
            }
    }

    paint() {
        if (this.color) this.#ctx.strokeStyle = this.color;
        this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

        this.#ctx.beginPath();
        for (var pi in this.particles) {
            var p = this.particles[pi];
            this.line(4.0 * p.x, 4.0 * p.y,
                4.0 * (p.x - p.u), 4.0 * (p.y - p.v));
        }

        this.#ctx.stroke();
    }

    simulate() {
        var drag = false;
        var mdx = 0.0, mdy = 0.0;

        if (this.pressed && this.pressedprev) {
            drag = true;
            mdx = 0.25 * (this.mx - this.mxprev);
            mdy = 0.25 * (this.my - this.myprev);
        }

        this.pressedprev = this.pressed;
        this.mxprev = this.mx;
        this.myprev = this.my;

        for (var nn in this.active)
            this.active[nn].clear();
        this.active.length = 0;

        //var i, j;
        var x, y, phi;
        var fx = 0.0, fy = 0.0;
        for (var pi in this.particles) {
            var p = this.particles[pi];
            p.cx = parseInt(p.x - 0.5, 10);
            p.cy = parseInt(p.y - 0.5, 10);

            x = p.cx - p.x;
            p.px[0] = (0.5 * x * x + 1.5 * x + 1.125);
            p.gx[0] = (x + 1.5);
            x += 1.0;
            p.px[1] = (-x * x + 0.75);
            p.gx[1] = (-2.0 * x);
            x += 1.0;
            p.px[2] = (0.5 * x * x - 1.5 * x + 1.125);
            p.gx[2] = (x - 1.5);

            y = p.cy - p.y;
            p.py[0] = (0.5 * y * y + 1.5 * y + 1.125);
            p.gy[0] = (y + 1.5);
            y += 1.0;
            p.py[1] = (-y * y + 0.75);
            p.gy[1] = (-2.0 * y);
            y += 1.0;
            p.py[2] = (0.5 * y * y - 1.5 * y + 1.125);
            p.gy[2] = (y - 1.5);

            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    var n = this.grid[p.cx + i][p.cy + j];
                    if (!n.active) {
                        this.active.push(n);
                        n.active = true;
                    }
                    phi = p.px[i] * p.py[j];
                    n.m += phi * p.mat.m;
                    n.d += phi;
                    n.gx += p.gx[i] * p.py[j];
                    n.gy += p.px[i] * p.gy[j];
                }
            }
        }

        var density, pressure, weight;
        var n01, n02;
        var n11, n12;
        var cx, cy;
        var cxi, cyi;

        var pdx, pdy;
        var C20, C02, C30, C03;
        var csum1, csum2;
        var C21, C31, C12, C13, C11;

        var u, u2, u3;
        var v, v2, v3;

        for (pi in this.particles) {
            p = this.particles[pi];

            cx = parseInt(p.x);
            cy = parseInt(p.y);
            cxi = cx + 1;
            cyi = cy + 1;

            n01 = this.grid[cx][cy];
            n02 = this.grid[cx][cyi];
            n11 = this.grid[cxi][cy];
            n12 = this.grid[cxi][cyi];

            pdx = n11.d - n01.d;
            pdy = n02.d - n01.d;
            C20 = 3.0 * pdx - n11.gx - 2.0 * n01.gx;
            C02 = 3.0 * pdy - n02.gy - 2.0 * n01.gy;
            C30 = -2.0 * pdx + n11.gx + n01.gx;
            C03 = -2.0 * pdy + n02.gy + n01.gy;
            csum1 = n01.d + n01.gy + C02 + C03;
            csum2 = n01.d + n01.gx + C20 + C30;
            C21 = 3.0 * n12.d - 2.0 * n02.gx - n12.gx - 3.0 * csum1 - C20;
            C31 = -2.0 * n12.d + n02.gx + n12.gx + 2.0 * csum1 - C30;
            C12 = 3.0 * n12.d - 2.0 * n11.gy - n12.gy - 3.0 * csum2 - C02;
            C13 = -2.0 * n12.d + n11.gy + n12.gy + 2.0 * csum2 - C03;
            C11 = n02.gx - C13 - C12 - n01.gx;

            u = p.x - cx;
            u2 = u * u;
            u3 = u * u2;
            v = p.y - cy;
            v2 = v * v;
            v3 = v * v2;
            density = n01.d + n01.gx * u + n01.gy * v + C20 * u2 + C02 * v2 + C30 * u3 + C03 * v3 + C21 * u2 * v + C31 * u3 * v + C12 * u * v2 + C13 * u * v3 + C11 * u * v;

            pressure = density - 1.0;
            if (pressure > 2.0)
                pressure = 2.0;

            fx = 0.0;
            fy = 0.0;

            if (p.x < 4.0)
                fx += p.mat.m * (4.0 - p.x);
            else if (p.x > this.gsizeX - 5)
                fx += p.mat.m * (this.gsizeX - 5 - p.x);

            if (p.y < 4.0)
                fy += p.mat.m * (4.0 - p.y);
            else if (p.y > this.gsizeY - 5)
                fy += p.mat.m * (this.gsizeY - 5 - p.y);

            if (drag) {
                var vx = Math.abs(p.x - 0.25 * this.mx);
                var vy = Math.abs(p.y - 0.25 * this.my);
                if ((vx < 10.0) && (vy < 10.0)) {
                    weight = p.mat.m * (1.0 - vx * 0.10) * (1.0 - vy * 0.10);
                    fx += weight * (mdx - p.u);
                    fy += weight * (mdy - p.v);
                }
            }

            for (i = 0; i < 3; i++) {
                for (j = 0; j < 3; j++) {
                    n = this.grid[(p.cx + i)][(p.cy + j)];
                    phi = p.px[i] * p.py[j];
                    n.ax += -((p.gx[i] * p.py[j]) * pressure) + fx * phi;
                    n.ay += -((p.px[i] * p.gy[j]) * pressure) + fy * phi;
                }
            }
        }

        for (var ni in this.active) {
            n = this.active[ni];
            if (n.m > 0.0) {
                n.ax /= n.m;
                n.ay /= n.m;
                n.ay += 0.03;
            }
        }

        var mu, mv;
        for (pi in this.particles) {
            p = this.particles[pi];
            for (i = 0; i < 3; i++) {
                for (j = 0; j < 3; j++) {
                    n = this.grid[(p.cx + i)][(p.cy + j)];
                    phi = p.px[i] * p.py[j];
                    p.u += phi * n.ax;
                    p.v += phi * n.ay;
                }
            }
            mu = p.mat.m * p.u;
            mv = p.mat.m * p.v;
            for (i = 0; i < 3; i++) {
                for (j = 0; j < 3; j++) {
                    n = this.grid[(p.cx + i)][(p.cy + j)];
                    phi = p.px[i] * p.py[j];
                    n.u += phi * mu;
                    n.v += phi * mv;
                }
            }
        }

        for (ni in this.active) {
            n = this.active[ni];
            if (n.m > 0.0) {
                n.u /= n.m;
                n.v /= n.m;
            }
        }

        var gu, gv;
        for (pi in this.particles) {
            p = this.particles[pi];
            gu = 0.0;
            gv = 0.0;
            for (i = 0; i < 3; i++) {
                for (j = 0; j < 3; j++) {
                    n = this.grid[(p.cx + i)][(p.cy + j)];
                    phi = p.px[i] * p.py[j];
                    gu += phi * n.u;
                    gv += phi * n.v;
                }
            }
            p.x += gu;
            p.y += gv;
            p.u += 1.0 * (gu - p.u);
            p.v += 1.0 * (gv - p.v);
            if (p.x < 1.0) {
                p.x = (1.0 + Math.random() * 0.01);
                p.u = 0.0;
            } else if (p.x > this.gsizeX - 2) {
                p.x = (this.gsizeX - 2 - Math.random() * 0.01);
                p.u = 0.0;
            }
            if (p.y < 1.0) {
                p.y = (1.0 + Math.random() * 0.01);
                p.v = 0.0;
            } else if (p.y > this.gsizeY - 2) {
                p.y = (this.gsizeY - 2 - Math.random() * 0.01);
                p.v = 0.0;
            }
        }
    }

    line(x1, y1, x2, y2) {
        this.#ctx.moveTo(x1, y1);
        this.#ctx.lineTo(x2, y2);
    }

    getPosition(obj) {
        var p = obj.offsetParent;
        var left = obj.offsetLeft;
        var top = obj.offsetTop;
        if (p) {
            var pos = this.getPosition(p);
            left += pos[0];
            top += pos[1];
        }
        return [left, top];
    }

    mouseMoved(event) {
        var pos = this.getPosition(this.#canvas);
        this.mx = event.pageX - pos[0];
        this.my = event.pageY - pos[1];
    }

    mousePressed() {
        this.pressed = true;
    }

    mouseReleased() {
        this.pressed = false;
    }
}

export default LiquidSystem