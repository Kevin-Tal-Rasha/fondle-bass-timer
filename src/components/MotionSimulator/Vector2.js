class Vector2 {
    constructor(x, y) {
        this.x = x; this.y = y;
    }
    copy() {
        return new Vector2(this.x, this.y);
    }
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    sqrLength() {
        return this.x * this.x + this.y * this.y;
    }
    normalize() {
        var inv = 1 / this.length(); return new Vector2(this.x * inv, this.y * inv);
    }
    negate() {
        return new Vector2(-this.x, -this.y);
    }
    add(v) {
        return new Vector2(this.x + v.x, this.y + v.y);
    }
    subtract(v) {
        return new Vector2(this.x - v.x, this.y - v.y);
    }
    multiply(f) {
        return new Vector2(this.x * f, this.y * f);
    }
    divide(f) {
        var invf = 1 / f; return new Vector2(this.x * invf, this.y * invf);
    }
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }

    static zero = new Vector2(0, 0);
}

export default Vector2;