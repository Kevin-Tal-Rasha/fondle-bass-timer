import LiquidSystem from './LiquidSystem';

class Board {
    #liquidSystem;
    #canvas;
    #step = 0;
    #simulateInterval;
    #paintInterval
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
        if (this.#simulateInterval) clearInterval(this.#simulateInterval);
        if (this.#paintInterval) clearInterval(this.#paintInterval);
        this.running = false;
    }

    start() {
        this.running = true;
        this.simulate();
    }

    restart(gsizeX, gsizeY, particlesX, particlesY) {
        this.stop();
        this.#liquidSystem = new LiquidSystem(this.#canvas, gsizeX, gsizeY, particlesX, particlesY);
        this.running = true;
        this.simulate();
    }

    simulate() {
        // clear

        // advance simulation
        this.#liquidSystem.simulate();

        this.#step++;
    }

    init(gsizeX, gsizeY, particlesX, particlesY, color) {
        this.#liquidSystem = new LiquidSystem(this.#canvas, gsizeX, gsizeY, particlesX, particlesY);
        this.#liquidSystem.color = color || '#0000FF';

        this.#simulateInterval = setInterval(() => this.simulate(), 10);
        this.#paintInterval = setInterval(() => this.#liquidSystem.paint(), 10);
        this.start();
    }
}

export default Board