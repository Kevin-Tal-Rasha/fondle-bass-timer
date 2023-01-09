<template>
  <FreeTimer />
  <a-button @click="goto('GOL')">生命游戏</a-button>
  <a-button @click="goto('Sudoku')">数独</a-button>
</template>

<script>
import FreeTimer from '@/components/FreeTimer';
export default {
  name: 'HomePage',
  components: { FreeTimer },
  methods: {
    goto(type) {
      switch (type) {
        case 'GOL':
          this.$router.push('/gol');
          break;
        case 'Sudoku':
          this.$router.push('/sudoku');
          break;
      }
    },
  },
};
</script>