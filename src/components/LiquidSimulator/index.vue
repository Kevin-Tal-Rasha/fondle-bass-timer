<template>
  <canvas
    ref="canvas"
    width="1024"
    height="768"
    @mousemove="mousemove"
    @mousedown="mousedown"
    @mouseup="mouseup"
  />
</template>

<script>
import Board from './Board';

var board;

export default {
  mounted() {
    board = new Board(this.$refs.canvas);
    board.init(200, 150, 100, 100, '#0000FF');
  },
  methods: {
    mousemove(event) {
      board && board.mouseMoved(event);
    },
    mousedown() {
      board && board.mousePressed();
    },
    mouseup() {
      board && board.mouseReleased();
    },
  },
};
</script>