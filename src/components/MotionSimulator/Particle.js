import Vector2 from './Vector2';

class Particle {
    constructor(position, velocity, life, color, size) {
        this.position = position;
        this.velocity = velocity;
        this.acceleration = Vector2.zero;
        this.age = 0;
        this.life = life;
        this.color = color;
        this.size = size;
    }
}

export default Particle;