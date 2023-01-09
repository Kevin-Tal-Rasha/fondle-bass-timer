export function NumberBlock(size,) {
    this.size = size;
    this.Create();
}

NumberBlock.prototype.Create = function () {
    var arr = [];
    for (var i = 0; i < this.size; i++) arr.push(i + 1);
    this.Store = arr;   //.sort(() => Math.random() > 0.5 ? -1 : 1);
}

NumberBlock.prototype.ExcludeDatasource = function (ruleHelper, rowIndex, colIndex) {
    var data = [];
    const setData = (arr) => {
        arr.forEach(num => {
            if (num && data.indexOf(num) < 0) data.push(num);
        });
    };
    setData(ruleHelper.GetRowNums(rowIndex));
    setData(ruleHelper.GetColumnNums(colIndex));
    setData(ruleHelper.GetBlockNums(rowIndex, colIndex));
    data.forEach(num => this.Remove(num));
}

NumberBlock.prototype.Remove = function (num) {
    this.Store.splice(this.Store.findIndex(n => n === num), 1);
}