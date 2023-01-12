import MusicalAlphabet from './MusicalAlphabet';
const speed = 500;

class Speaker {
    constructor() {
        var contextClass = (window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext);
        if (contextClass) {
            this.context = new contextClass();
            this.gain = this.context.createGain();
            this.gain.connect(this.context.destination);
        }

        this.musicalAlphabet = new MusicalAlphabet();
        this.playing = false;
    }

    //播放声音
    playTone(frequency) {
        //API https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode
        //示例 https://mdn.github.io/violent-theremin/
        if (this.context && !this.oscillator) {
            this.oscillator = this.context.createOscillator();
            this.oscillator.type = 'triangle';//波形这里用的是三角波 查看示例：https://codepen.io/gregh/pen/LxJEaj
            // this.oscillator.detune.setValueAtTime(100, this.context.currentTime); // value in cents
            this.oscillator.connect(this.gain);
            this.oscillator.start(0);
        }
        this.oscillator.frequency.value = frequency;//声音频率 
    }
    //停止播放
    playGap() {
        this.playTone(0);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, 10);
        })
    }

    async PlayNote(note, tempo) {
        this.playTone(this.musicalAlphabet.FetchFrequency(note));
        return new Promise(resolve => {
            setTimeout(async () => {
                await this.playGap();
                resolve();
            }, speed * (tempo || 1));
        })
    }

    async Play(musicScore) {
        this.playing = true;
        const notes = musicScore.split(' ');
        for (var note of notes) {
            if (!this.playing) return
            var tempo = 1;
            if (note.indexOf('_') >= 0) {
                tempo = Number(note.split('_')[1]);
                note = note.split('_')[0];
            }
            await this.PlayNote(note, tempo);
        }
    }

    async Stop() {
        this.playing = false;

        if (this.oscillator) {
            this.oscillator.stop(0);
            this.oscillator.disconnect(0);
            this.oscillator = null;
        }
    }
}

export default Speaker;