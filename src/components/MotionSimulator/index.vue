<template>
  <canvas ref="canvas" :width="width" :height="height" @mousemove="interact" />
</template>

<script>
import Vector2 from './Vector2';
import Color from './Color';
import Particle from './Particle';
import ParticleSystem from './ParticleSystem';
import ChamberBox from './ChamberBox';

export default {
  mounted() {
    // this.demoKinematics();
    // this.demoBasicParticleSystem();
    // this.demoCollisionChamber();
    this.demoInteractiveEmit();
  },
  data() {
    return {
      width: 1024,
      height: 768,
      newMousePosition: Vector2.zero,
    };
  },
  computed: {
    ctx() {
      return this.$refs.canvas.getContext('2d');
    },
  },
  methods: {
    start(interval, step) {
      setInterval(step, interval);
    },
    clear() {
      this.ctx.clearRect(0, 0, this.width, this.height);
    },
    demoKinematics() {
      var position = new Vector2(10, 200);
      var velocity = new Vector2(50, -150);
      var acceleration = new Vector2(0, 100);
      var dt = 0.1;

      this.start(10, () => {
        position = position.add(velocity.multiply(dt));
        velocity = velocity.add(acceleration.multiply(dt));

        this.ctx.strokeStyle = '#000000';
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.beginPath();
        this.ctx.arc(position.x, position.y, 5, 0, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
      });
    },
    demoBasicParticleSystem() {
      var ps = new ParticleSystem();
      var dt = 0.1;

      function sampleDirection() {
        var theta = Math.random() * 2 * Math.PI;
        return new Vector2(Math.cos(theta), Math.sin(theta));
      }

      this.start(1000 / 60, () => {
        ps.emit(
          new Particle(
            new Vector2(this.width / 2, this.height / 3),
            sampleDirection().multiply(100),
            3,
            Color.blue,
            5
          )
        );
        ps.simulate(dt);

        this.clear();
        ps.render(this.ctx);
      });
    },
    demoCollisionChamber() {
      var ps = new ParticleSystem();
      ps.effectors.push(new ChamberBox(0, 0, this.width, this.height));
      var dt = 0.01;

      function sampleDirection(angle1, angle2) {
        var t = Math.random();
        var theta = angle1 * t + angle2 * (1 - t);
        return new Vector2(Math.cos(theta), Math.sin(theta));
      }

      function sampleColor(color1, color2) {
        var t = Math.random();
        return color1.multiply(t).add(color2.multiply(1 - t));
      }

      this.start(1000 / 60, () => {
        ps.emit(
          new Particle(
            new Vector2(200, 200),
            sampleDirection(Math.PI * 1.75, Math.PI * 2).multiply(500),
            10,
            sampleColor(Color.blue, Color.purple),
            5
          )
        );
        ps.simulate(dt);

        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        this.ctx.fillRect(0, 0, this.width, this.height);
        ps.render(this.ctx);
      });
    },
    demoInteractiveEmit() {
      var ps = new ParticleSystem();
      ps.effectors.push(new ChamberBox(0, 0, 400, 400));
      var dt = 0.01;
      var oldMousePosition = Vector2.zero;

      function sampleDirection(angle1, angle2) {
        var t = Math.random();
        var theta = angle1 * t + angle2 * (1 - t);
        return new Vector2(Math.cos(theta), Math.sin(theta));
      }

      function sampleColor(color1, color2) {
        var t = Math.random();
        return color1.multiply(t).add(color2.multiply(1 - t));
      }

      function sampleNumber(value1, value2) {
        var t = Math.random();
        return value1 * t + value2 * (1 - t);
      }

      this.start(10, () => {
        var velocity = this.newMousePosition
          .subtract(oldMousePosition)
          .multiply(10);
        velocity = velocity.add(sampleDirection(0, Math.PI * 2).multiply(20));
        var color = sampleColor(Color.red, Color.yellow);
        var life = sampleNumber(1, 2);
        var size = sampleNumber(2, 4);
        ps.emit(
          new Particle(this.newMousePosition, velocity, life, color, size)
        );
        oldMousePosition = this.newMousePosition;

        ps.simulate(dt);

        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.width, this.height);
        ps.render(this.ctx);
      });
    },
    interact(e) {
      if (e.layerX || e.layerX == 0) {
        e.target.style.position = 'relative';
        this.newMousePosition = new Vector2(e.layerX, e.layerY);
      } else this.newMousePosition = new Vector2(e.offsetX, e.offsetY);
    },
  },
};
</script>