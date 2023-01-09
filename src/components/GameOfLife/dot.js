import config from './config'
const conf = config

export function Dot(ctx, x, y, type) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = conf.dotSize;
    this.height = conf.dotSize;
    this.type = type || 'black';
}

Dot.prototype.draw = function (type) {
    this.type = type || 'black';
    this.color = type === 'white' ? conf.dotWhite : conf.dotBlack;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
};

Dot.prototype.calDotType = function () {
    var whiteCount = 0;
    for (var id in this.neighbors || {})
        if (this.neighbors[id].type === 'white') whiteCount++;

    switch (whiteCount) {
        case 2:
            return this.type;
        case 3:
            return 'white';
        default:
            return 'black';
    }
};

//----------------------------------------------

export function Dots(dots) {
    this.dots = dots;
    this.hashLoc = {};
}

function getHashLocKey(x, y) {
    return `(${x},${y})`;
}

Dots.prototype.findByLoc = function (x, y) {
    return this.hashLoc[getHashLocKey(x, y)] || this.dots.find(dot => {
        return dot.x === x && dot.y === y;
    });
};

Dots.prototype.clear = function () {
    this.dots.length = 0;
    this.hashLoc = {};
};

Dots.prototype.add = function (dot) {
    this.dots.push(dot);
    this.hashLoc[getHashLocKey(dot.x, dot.y)] = dot;
    return dot;
};

Dots.prototype.forEach = function (callback) {
    this.dots.forEach(callback);
};

Dots.prototype.draw = function () {
    this.forEach(function (dot) {
        dot.draw(dot.type);
    });
};

Dots.prototype.checkChange = function (dots) {
    var changed = false;

    dots.forEach((dot) => {
        if (changed) return;

        var d = this.findByLoc(dot.x, dot.y);
        if (d) {
            if (d.type !== dot.type)
                changed = true;
        } else
            changed = true;
    });

    return changed;
};