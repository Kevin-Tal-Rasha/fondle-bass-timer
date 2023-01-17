class ChamberBox {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    apply(particle) {
        if (particle.position.x - particle.size < this.x1 || particle.position.x + particle.size > this.x2)
            particle.velocity.x = -particle.velocity.x;

        if (particle.position.y - particle.size < this.y1 || particle.position.y + particle.size > this.y2)
            particle.velocity.y = -particle.velocity.y;
    }
}

export default ChamberBox;