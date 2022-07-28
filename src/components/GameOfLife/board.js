import config from './config'
import { Dot, Dots } from './dot'
const conf = config

export function Board(ctx, size, dots) {
    this.ctx = ctx;
    this.size = size;
    this.dots = new Dots(dots || []);
    this.init();
}

Board.prototype.go = function () {
    this.dots.forEach(dot => {
        dot.nextGenType = dot.calDotType();
    });
    this.dots.forEach(dot => {
        dot.draw(dot.nextGenType);
    });
};

Board.prototype.init = function () {
    for (var i = 0; i < this.size.width; i += conf.dotSize) {
        for (var j = 0; j < this.size.height; j += conf.dotSize) {
            this.dots.findByLoc(i, j) || this.dots.add(new Dot(this.ctx, i, j))
        }
    }

    this.dots.forEach(dot => {
        lookForNeighbors.call(this, dot);
    });

    this.dots.draw();
    return this.dots;
}

Board.prototype.random = function () {
    this.dots.clear();

    for (var i = 0; i < this.size.width; i += conf.dotSize) {
        for (var j = 0; j < this.size.height; j += conf.dotSize) {
            this.dots.add(new Dot(this.ctx, i, j, Math.round(Math.random()) ? 'white' : 'black'));
        }
    }

    this.init();
    return this.dots;
}

function lookForNeighbors(dot) {
    if (!dot.neighbors) {
        dot.neighbors = {};

        var isOverflow = (loc) => {
            return loc.x < conf.dotSize || loc.x + conf.dotSize > this.size.width
                || loc.y < conf.dotSize || loc.y + conf.dotSize > this.size.height;
        };

        var setNeighbor = (loc, id) => {
            if (isOverflow(loc))
                dot.neighbors[id] = { type: 'black' };
            else
                dot.neighbors[id] = this.dots.findByLoc(loc.x, loc.y) || this.dots.add(new Dot(this.ctx, loc.x, loc.y));
        };

        setNeighbor({ x: dot.x, y: dot.y - conf.dotSize }, 'top');
        setNeighbor({ x: dot.x, y: dot.y + conf.dotSize }, 'bottom');
        setNeighbor({ x: dot.x - conf.dotSize, y: dot.y }, 'left');
        setNeighbor({ x: dot.x + conf.dotSize, y: dot.y }, 'right');
        setNeighbor({ x: dot.x - conf.dotSize, y: dot.y - conf.dotSize }, 'topleft');
        setNeighbor({ x: dot.x + conf.dotSize, y: dot.y - conf.dotSize }, 'topright');
        setNeighbor({ x: dot.x - conf.dotSize, y: dot.y + conf.dotSize }, 'bottomleft');
        setNeighbor({ x: dot.x + conf.dotSize, y: dot.y + conf.dotSize }, 'bottomright');
    }
}