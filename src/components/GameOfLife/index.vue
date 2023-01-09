<!--
 * @description: 
    如果一个格子周围有 3 个格子为白，则该格子为白；
    如果一个格子周围有 2 个格子为白，则该格子颜色不变；
    如果一个格子周围白色格子少于 2 个，则该格子为黑；
    如果一个格子周围有超过 3 个格子为白，则该格子为黑。
 * @author: 
 * @date: 2022-7-28 9:59:40
 * @version: V1.0.0
!-->
<template>
  <canvas ref="canvas" id="canvas" width="800" height="600"></canvas>

  <hr />
  <a-button class="btn" @click="random()">Random</a-button>
  <a-button
    class="btn"
    v-for="(value, name) in conf.patterns"
    :key="name"
    @click="setPattern(value)"
  >
    {{ name }}
  </a-button>
  <br />
  <a-button class="btn" @click="go()">one-step</a-button>
  <a-button class="btn" @click="start()">start</a-button>
  <a-button class="btn" @click="pause()">pause</a-button>
</template>

<script>
import conf from './config';
import { Dot } from './dot';
import { Board } from './board';

export default {
  name: 'GameOfLife',
  mounted() {
    this.ctx = this.$refs.canvas.getContext('2d');
    this.width = this.$refs.canvas.width;
    this.height = this.$refs.canvas.height;
  },
  data() {
    return {
      conf,
      width: 0,
      height: 0,
      ctx: undefined,
      board: undefined,
      timer: undefined,
    };
  },
  methods: {
    init() {
      this.pause();
      this.ctx.fillStyle = this.conf.dotBlack;
      this.ctx.fillRect(0, 0, this.width, this.height);
    },
    go() {
      this.board && this.board.go();
    },
    start() {
      this.pause();
      this.timer = setInterval(this.go, this.conf.interval);
    },
    pause() {
      if (this.timer) clearInterval(this.timer);
    },

    //---------------------init pattern---------------------
    setPattern(pattern) {
      this.init();

      var startDots = [];
      // this.conf[pattern].forEach((v, i) => {
      //     if (v === 1)
      //         startDots.push(new Dot(ctx, i % 35 * this.conf.dotSize + margin.left, Math.trunc(i / 35) * this.conf.dotSize + margin.top, 'white'));
      // });
      pattern.split('\n').forEach((row, rowIndex) => {
        row.split('').forEach((v, colIndex) => {
          if (v === '.')
            startDots.push(
              new Dot(
                this.ctx,
                colIndex * this.conf.dotSize + this.conf.patternMargin.left,
                rowIndex * this.conf.dotSize + this.conf.patternMargin.top,
                'white'
              )
            );
        });
      });
      this.board = new Board(
        this.ctx,
        { width: this.width, height: this.height },
        startDots
      );
    },

    random() {
      this.init();
      this.board = new Board(this.ctx, {
        width: this.width,
        height: this.height,
      });
      this.board.random();
    },
  },
};
</script>

<style scoped>
#canvas {
  margin-top: 15px;
  background-color: #1e1e1e;
}

.btn {
  margin-right: 20px;
}
</style>