<template>
  <FreeTimer />
  <div>
    <a-button @click="goto('GameOfLife')">生命游戏</a-button>
    <a-button @click="goto('Sudoku')">数独</a-button>
    <a-button @click="goto('AudioPlayer')">音频播放器</a-button>
    <a-button @click="goto('MotionSimulator')">粒子运动模拟器</a-button>
    <a-button @click="goto('LiquidSimulator')">流体模拟器</a-button>
  </div>
</template>

<script>
import FreeTimer from '@/components/FreeTimer';
export default {
  name: 'HomePage',
  components: { FreeTimer },
  methods: {
    goto(type) {
      this.$router.push('/' + type);
    },
  },
};
</script>

<style lang="less" scoped>
.ant-btn {
  margin-right: 10px;
}
</style>