class Particle {
    constructor(mat, x, y, u, v) {
        this.mat = mat;
        this.x = x;
        this.y = y;
        this.u = u;
        this.v = v;

        this.dudx = 0;
        this.dudy = 0;
        this.dvdx = 0;
        this.dvdy = 0;
        this.cx = 0;
        this.cy = 0;

        this.px = [0, 0, 0];
        this.py = [0, 0, 0];
        this.gx = [0, 0, 0];
        this.gy = [0, 0, 0];
    }
}

export default Particle;