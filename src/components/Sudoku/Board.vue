<template>
  <a-table
    :showHeader="false"
    :bordered="true"
    :pagination="false"
    :dataSource="gridDatasource"
    :columns="columns"
  >
    <template v-slot:bodyCell="{ text, index, column }">
      <a-input
        v-if="createMode"
        @change="
          (e) => gridCellChanged(e.data, index, (column || {}).dataIndex)
        "
      />
      <b
        style="color: #1890ff; text-align: center; display: block; height: 22px"
        v-else-if="seed.length && seed[index][(column || {}).dataIndex]"
      >
        {{ text }}
      </b>
      <span style="text-align: center; display: block; height: 22px" v-else>{{
        text
      }}</span>
    </template>
  </a-table>
</template>

<script>
import NumberBlock from './NumberBlock';
import RuleHelper from './RuleHelper';

export default {
  name: 'SudokuBoard',
  props: {
    size: { type: Number, default: 9 },
  },
  data() {
    return {
      createMode: false,
      seed: [],
      datasource: [],
      columns: [],
    };
  },
  computed: {
    gridDatasource() {
      var arr = [];
      for (var rowIndex = 0; rowIndex < this.size; rowIndex++) {
        var data = {};
        this.columns.forEach((col, colIndex) => {
          if (
            this.datasource.length > rowIndex &&
            this.datasource[rowIndex].length > colIndex
          )
            data[col.dataIndex] = this.datasource[rowIndex][colIndex];
          else data[col.dataIndex] = '';
        });
        arr.push(data);
      }
      return arr;
    },
  },
  mounted() {
    for (var colIndex = 0; colIndex < this.size; colIndex++) {
      this.columns.push({
        dataIndex: colIndex,
        key: colIndex,
        customCell: (_, rowIndex, e) => {
          const lineStyle = 'solid 1px #ccc';
          var style = {};
          if (parseInt(rowIndex % 3) == 0) style.borderTop = lineStyle;
          if (parseInt(rowIndex % 3) == 2) style.borderBottom = lineStyle;
          if (parseInt(e.dataIndex % 3) == 0) style.borderLeft = lineStyle;
          if (parseInt(e.dataIndex % 3) == 2) style.borderRight = lineStyle;
          return { style };
        },
      });
    }
  },
  methods: {
    Init(seed) {
      if (seed) this.seed = seed;
      else this.seed.length = 0;

      if (!this.seed.length) {
        for (var i = 0; i < this.size; i++) {
          this.seed.push([]);
          for (var j = 0; j < this.size; j++) {
            this.seed[i].push('');
          }
        }
      }

      this.datasource.length = 0;
      for (i = 0; i < this.size; i++) {
        var row = [];
        for (j = 0; j < this.size; j++) {
          if (this.seed[i][j]) row.push(this.seed[i][j]);
          else row.push('');
        }
        this.datasource.push(row);
      }
    },
    async Calulate() {
      return new Promise((resolve) => {
        var ruleHelper = new RuleHelper(
          JSON.parse(JSON.stringify(this.datasource))
        );

        if (this.tryFill(ruleHelper)) this.datasource = ruleHelper.datasource;
        else alert('数独求解失败');
        resolve();
      });
    },
    tryFill(ruleHelper, pos) {
      if (typeof pos === 'undefined') pos = 0;
      if (pos >= this.size * this.size) return true;
      const rowIndex = parseInt(pos / this.size);
      const colIndex = parseInt(pos % this.size);

      if (ruleHelper.datasource[rowIndex][colIndex])
        return this.tryFill(ruleHelper, pos + 1);

      var fetchedNum;
      var numBlock = new NumberBlock(this.size);
      // numBlock.ExcludeDatasource(ruleHelper, rowIndex, colIndex);
      numBlock.Store.forEach((num) => {
        if (ruleHelper.Check(rowIndex, colIndex, num)) {
          fetchedNum = num;
          ruleHelper.datasource[rowIndex][colIndex] = num;

          if (this.tryFill(ruleHelper, pos + 1)) return;
          else {
            fetchedNum = undefined;
            ruleHelper.datasource[rowIndex][colIndex] = '';
          }
        }
      });

      return !!fetchedNum;
    },
    tryFill1(ruleHelper) {
      for (var i = 0; i < this.size; i++) {
        for (var j = 0; j < this.size; j++) {
          if (!ruleHelper.datasource[i][j]) {
            for (var num = 1; num <= this.size; num++)
              if (ruleHelper.Check(i, j, num)) {
                ruleHelper.datasource[i][j] = num;

                if (this.tryFill(ruleHelper)) return true;
                else ruleHelper.datasource[i][j] = '';
              }

            return false;
          }
        }
      }
      return true;
    },
    StartCreate() {
      this.createMode = true;
      this.Init();
    },
    gridCellChanged(val, rowIndex, colIndex) {
      this.seed[rowIndex][colIndex] = val;
    },
    EndCreate() {
      this.createMode = false;
      for (var i = 0; i < this.size; i++) {
        for (var j = 0; j < this.size; j++) {
          this.seed[i][j] = parseInt(this.seed[i][j]) || 0;
        }
      }

      this.Init(this.seed);
      return JSON.stringify(this.seed);
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .ant-table-tbody {
  > tr:hover > td,
  .ant-table-cell-row-hover {
    background: none !important;
  }

  > tr > td:hover {
    background: #efefef !important;
  }
}
</style>