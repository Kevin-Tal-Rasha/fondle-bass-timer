class RuleHelper {
    constructor(datasource) {
        this.SetDatasource(datasource);
    }

    checkDuplicate(arr, num) {
        return arr.indexOf(num) < 0;
        // if ( arr.indexOf(num) >= 0) return false;

        // var pass = true;
        // var checkedNums = [];
        // arr.forEach(n => {
        //     if (!n || !pass) return;
        //     if (checkedNums.indexOf(n) >= 0) pass = false;
        //     checkedNums.push(n);
        // });
        // return pass;
    }

    SetDatasource(datasource) {
        this.datasource = datasource;
    }

    CheckAll() {
        var checked = true;
        this.datasource.forEach((row, rowIndex) => {
            if (!checked) return;
            row.forEach((num, colIndex) => {
                if (!checked) return;
                checked = this.Check(rowIndex, colIndex, num);
            });
        });
        return checked;
    }

    Check(rowIndex, colIndex, num) {
        return this.CheckRow(rowIndex, num) && this.CheckColumn(colIndex, num) && this.CheckBlock(rowIndex, colIndex, num);
    }

    CheckRow(rowIndex, num) {
        return this.checkDuplicate(this.GetRowNums(rowIndex), num);
    }

    CheckColumn(colIndex, num) {
        return this.checkDuplicate(this.GetColumnNums(colIndex), num);
    }

    CheckBlock(rowIndex, colIndex, num) {
        return this.checkDuplicate(this.GetBlockNums(rowIndex, colIndex), num);
    }

    GetRowNums(rowIndex) {
        return this.datasource[rowIndex];
    }

    GetColumnNums(colIndex) {
        var arr = [];
        this.datasource.forEach((_, rowIndex) => {
            arr.push(this.datasource[rowIndex][colIndex]);
        });
        return arr;
    }

    GetBlockNums(rowIndex, colIndex) {
        var blockNums = []
        const blockSize = Math.sqrt(this.datasource.length);
        for (var i = 0; i < blockSize; i++) {
            for (var j = 0; j < blockSize; j++) {
                blockNums.push(this.datasource[rowIndex + i - (rowIndex % blockSize)][colIndex + j - (colIndex % blockSize)]);
            }
        }
        return blockNums;
    }
}

export default RuleHelper;

// export function RuleHelper(datasource) {
//     this.SetDatasource(datasource);
// }

// function checkDuplicate(arr, num) {
//     return arr.indexOf(num) < 0;
//     // if ( arr.indexOf(num) >= 0) return false;

//     // var pass = true;
//     // var checkedNums = [];
//     // arr.forEach(n => {
//     //     if (!n || !pass) return;
//     //     if (checkedNums.indexOf(n) >= 0) pass = false;
//     //     checkedNums.push(n);
//     // });
//     // return pass;
// }

// RuleHelper.prototype.SetDatasource = function (datasource) {
//     this.datasource = datasource;
// }

// RuleHelper.prototype.CheckAll = function () {
//     var checked = true;
//     this.datasource.forEach((row, rowIndex) => {
//         if (!checked) return;
//         row.forEach((num, colIndex) => {
//             if (!checked) return;
//             checked = this.Check(rowIndex, colIndex, num);
//         });
//     });
//     return checked;
// }

// RuleHelper.prototype.Check = function (rowIndex, colIndex, num) {
//     return this.CheckRow(rowIndex, num) && this.CheckColumn(colIndex, num) && this.CheckBlock(rowIndex, colIndex, num);
// }

// RuleHelper.prototype.CheckRow = function (rowIndex, num) {
//     return checkDuplicate(this.GetRowNums(rowIndex), num);
// }

// RuleHelper.prototype.CheckColumn = function (colIndex, num) {
//     return checkDuplicate(this.GetColumnNums(colIndex), num);
// }

// RuleHelper.prototype.CheckBlock = function (rowIndex, colIndex, num) {
//     return checkDuplicate(this.GetBlockNums(rowIndex, colIndex), num);
// }

// RuleHelper.prototype.GetRowNums = function (rowIndex) {
//     return this.datasource[rowIndex];
// }

// RuleHelper.prototype.GetColumnNums = function (colIndex) {
//     var arr = [];
//     this.datasource.forEach((_, rowIndex) => {
//         arr.push(this.datasource[rowIndex][colIndex]);
//     });
//     return arr;
// }

// RuleHelper.prototype.GetBlockNums = function (rowIndex, colIndex) {
//     var blockNums = []
//     const blockSize = Math.sqrt(this.datasource.length);
//     for (var i = 0; i < blockSize; i++) {
//         for (var j = 0; j < blockSize; j++) {
//             blockNums.push(this.datasource[rowIndex + i - (rowIndex % blockSize)][colIndex + j - (colIndex % blockSize)]);
//         }
//     }
//     return blockNums;
// }