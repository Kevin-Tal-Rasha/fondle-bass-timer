<!--
 * @description: 
    数独规则：将1~9填入9x9的盘面中，使每行、每列、每个粗线宫（3x3）内均不重复。
    行：横排，从上到下依次为第1~9行，记作 R1~R9 或 r1~r9；
    列：竖排，从左到右依次为第1~9列，记作 C1~C9 或 c1~c9；
    宫：粗线围住的3x3小九宫，从左到右、从上到下依次为第1~9宫，记作 B1~B9 或 b1~b9；
    提示数：题目中初始已存在的数字，作为解题推理的基础依据；
    通过 行+列 即可定位任一宫格，比如第4行第6列的宫格可记作 R4C6（或 r4c6）
 * @author: 
 * @date: 2022-12-23 16:51:24
 * @version: V1.0.0
!-->
<template>
  <div class="board">
    <Board ref="SudokuBoard" />
  </div>
  <a-button @click="Create">{{ createMode ? '完成' : '创建' }}</a-button>
  <a-button @click="Calulate">计算</a-button>
  <p>{{ calTimeDesc }}</p>
</template>

<script>
import moment from 'moment';
import Board from './Board.vue';
export default {
  components: { Board },
  data() {
    return {
      createMode: false,
      calTime: '',
      // seed: [
      //   [0, 0, 0, 8, 1, 0, 0, 0, 0],
      //   [2, 0, 0, 3, 7, 0, 0, 0, 0],
      //   [8, 1, 0, 0, 0, 0, 0, 4, 0],
      //   [0, 0, 1, 0, 0, 0, 0, 7, 2],
      //   [0, 0, 0, 0, 0, 0, 0, 6, 3],
      //   [0, 7, 3, 6, 0, 0, 0, 0, 0],
      //   [0, 0, 9, 2, 0, 0, 6, 0, 0],
      //   [4, 0, 0, 0, 0, 6, 0, 0, 9],
      //   [0, 0, 0, 0, 0, 1, 7, 0, 0],
      // ],
      // seed: [
      //   [0, 0, 5, 3, 0, 0, 0, 0, 0],
      //   [8, 0, 0, 0, 0, 0, 0, 2, 0],
      //   [0, 7, 0, 0, 1, 0, 5, 0, 0],
      //   [4, 0, 0, 0, 0, 5, 3, 0, 0],
      //   [0, 1, 0, 0, 7, 0, 0, 0, 6],
      //   [0, 0, 3, 2, 0, 0, 0, 8, 0],
      //   [0, 6, 0, 5, 0, 0, 0, 0, 9],
      //   [0, 0, 4, 0, 0, 0, 0, 3, 0],
      //   [0, 0, 0, 0, 0, 9, 7, 0, 0],
      // ],
      seed: [
        [8, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 3, 6, 0, 0, 0, 0, 0],
        [0, 7, 0, 0, 9, 0, 2, 0, 0],
        [0, 5, 0, 0, 0, 7, 0, 0, 0],
        [0, 0, 0, 0, 4, 5, 7, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 3, 0],
        [0, 0, 1, 0, 0, 0, 0, 6, 8],
        [0, 0, 8, 5, 0, 0, 0, 1, 0],
        [0, 9, 0, 0, 0, 0, 4, 0, 0],
      ],
      // seed: [
      //   [0, 6, 1, 0, 3, 0, 0, 2, 0],
      //   [0, 5, 0, 0, 0, 8, 1, 0, 7],
      //   [0, 0, 0, 0, 0, 7, 0, 3, 4],
      //   [0, 0, 9, 0, 0, 6, 3, 7, 8],
      //   [0, 0, 3, 2, 7, 9, 5, 0, 0],
      //   [5, 7, 0, 3, 0, 0, 9, 0, 2],
      //   [1, 9, 0, 7, 6, 0, 0, 0, 0],
      //   [8, 0, 2, 4, 0, 0, 7, 6, 0],
      //   [6, 4, 0, 0, 1, 0, 2, 5, 0],
      // ],
    };
  },
  mounted() {
    this.$refs.SudokuBoard.Init(this.seed);
  },
  computed: {
    calTimeDesc() {
      if (this.calTime) return `计算时间：${this.calTime.asMilliseconds()}ms`;
      else return '';
    },
  },
  methods: {
    Create() {
      this.createMode = !this.createMode;
      const sudokuBoard = this.$refs.SudokuBoard;
      if (!this.createMode) {
        const data = sudokuBoard.EndCreate();
        console.log(data);
      } else sudokuBoard.StartCreate();
    },
    Calulate() {
      const startTime = new moment();
      const sudokuBoard = this.$refs.SudokuBoard;
      sudokuBoard.Calulate().then(() => {
        const endTime = new moment();
        this.calTime = moment.duration(endTime.diff(startTime));
      });
    },
  },
};
</script>

<style scoped>
.board {
  width: 600px;
  margin: 20px auto;
}

.ant-btn {
  margin-right: 10px;
}
</style>