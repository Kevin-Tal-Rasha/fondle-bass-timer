class Node {
    constructor() {
        this.m = 0;
        this.d = 0;
        this.gx = 0;
        this.gy = 0;
        this.u = 0;
        this.v = 0;
        this.ax = 0;
        this.ay = 0;
        this.active = false;
    }
    clear() {
        this.m = this.d = this.gx = this.gy = this.u = this.v = this.ax = this.ay = 0.0;
        this.active = false;
    }
}

export default Node;