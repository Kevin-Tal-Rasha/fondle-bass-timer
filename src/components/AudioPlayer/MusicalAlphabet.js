const notes = [
    'n',
    'A2', '#A2', 'B2',
    'C1', '#C1', 'D1', '#D1', 'E1', 'F1', '#F1', 'G1', '#G1', 'A1', '#A1', 'B1',
    'C#', 'C', 'D#', 'D', 'E', 'F', '#F', 'G#', 'G', 'A', '#A', 'B',
    'c#', 'c', 'd', '#d', 'e', 'f', '#f', 'g', '#G', 'a', '#a', 'b',
    'c1', '#c1', 'd1', '#d1', 'e1', 'f1', '#f1', 'g1', '#g1', 'a1', '#a1', 'b1',
    'c2', '#c2', 'd2', '#d2', 'e2', 'f2', '#2', 'g2', '#g2', 'a2', '#a2', 'b2',
    'c3', '#c3', 'd3', '#d3', 'e3', 'f3', '#f3', 'g3', '#g3', 'a3', '#a3', 'b3',
    'c4', '#c4', 'd4', '#d4', 'e4', 'f4', '#f4', 'g4', '#g4', 'a4', '#a4', 'b4',
    'c5'];

class MusicalAlphabet {
    constructor() {
        // 这里选取 69 音高的频率 440Hz , 这是个整数 , 方便计算
        const standardFrequency = 440.0;

        // 用于存放 0 ~ 127 音高 对应的 音符频率
        var noteFrequency = [];

        for (var i = 0; i <= 127; i++) {
            noteFrequency[i] = (standardFrequency / 32.0) * Math.pow(2, (i - 9.0) / 12.0);
        }


        this.noteVsFreq = {}
        const startIndex = 21;
        for (i = startIndex; i < startIndex + 88; i++) {
            if (i - startIndex === 0)
                this.noteVsFreq[notes[0]] = 0;
            else
                this.noteVsFreq[notes[i - startIndex]] = noteFrequency[i];
        }
    }

    //根据音名获取声音频率
    FetchFrequency(note) {
        return this.noteVsFreq[note];
    }
}

export default MusicalAlphabet