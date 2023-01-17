import LiquidSystem from './LiquidSystem';

class Board {
    #liquidSystem;
    #canvas;
    #step = 0;
    running = false;

    constructor(canvas) {
        this.#canvas = canvas;
    }

    mouseMoved(event) {
        this.#liquidSystem && this.#liquidSystem.mouseMoved(event);
    }
    mousePressed() {
        this.#liquidSystem && this.#liquidSystem.mousePressed();
    }
    mouseReleased() {
        this.#liquidSystem && this.#liquidSystem.mouseReleased();
    }

    stop() {
        this.running = false;
    }

    start() {
        this.running = true;
        this.draw();
    }

    restart(gsizeX, gsizeY, particlesX, particlesY) {
        this.#liquidSystem = new LiquidSystem(this.#canvas, gsizeX, gsizeY, particlesX, particlesY);
        this.running = true;
        this.draw();
    }

    draw() {
        // clear

        // advance simulation
        this.#liquidSystem.simulate();

        this.#step++;
    }

    init(gsizeX, gsizeY, particlesX, particlesY, color) {
        this.#liquidSystem = new LiquidSystem(this.#canvas, gsizeX, gsizeY, particlesX, particlesY);
        this.#liquidSystem.color = color || '#0000FF';

        setInterval(() => this.draw(), 10);
        setInterval(() => this.#liquidSystem.paint(), 10);
        this.start();
    }
}

export default Board