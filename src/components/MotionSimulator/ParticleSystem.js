import Vector2 from './Vector2';

class ParticleSystem {
    #particles = new Array();

    constructor() {
        this.gravity = new Vector2(0, 100);
        this.effectors = new Array();
    }

    #aging(dt) {
        for (var i = 0; i < this.#particles.length;) {
            var p = this.#particles[i];
            p.age += dt;
            if (p.age >= p.life)
                this.#kill(i);
            else
                i++;
        }
    }

    #kill(index) {
        if (this.#particles.length > 1)
            this.#particles[index] = this.#particles[this.#particles.length - 1];
        this.#particles.pop();
    }

    #applyGravity() {
        for (var i in this.#particles)
            this.#particles[i].acceleration = this.gravity;
    }

    #kinematics(dt) {
        for (var i in this.#particles) {
            var p = this.#particles[i];
            p.position = p.position.add(p.velocity.multiply(dt));
            p.velocity = p.velocity.add(p.acceleration.multiply(dt));
        }
    }

    #applyEffectors() {
        for (var i in this.effectors) {
            for (var j in this.#particles)
                this.effectors[i].apply(this.#particles[j]);
        }
    }

    emit(particle) {
        this.#particles.push(particle);
    }

    simulate(dt) {
        this.#aging(dt);
        this.#applyGravity();
        this.#applyEffectors();
        this.#kinematics(dt);
    }

    render(ctx) {
        for (var i in this.#particles) {
            var p = this.#particles[i];
            var alpha = 1 - p.age / p.life;
            ctx.fillStyle = 'rgba('
                + Math.floor(p.color.r * 255) + ','
                + Math.floor(p.color.g * 255) + ','
                + Math.floor(p.color.b * 255) + ','
                + alpha.toFixed(2) + ')';
            ctx.beginPath();
            ctx.arc(p.position.x, p.position.y, p.size, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
        }
    }
}

export default ParticleSystem;