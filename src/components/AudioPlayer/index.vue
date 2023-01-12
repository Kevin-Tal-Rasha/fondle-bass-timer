<template>
  <a-textarea v-model:value="musicScore" :rows="5" />
  <a-button @click="toggle">{{ status ? '⏹️' : '▶️' }}</a-button>
</template>

<script>
import Speaker from './Speaker';

export default {
  data() {
    return {
      status: 0,
      speaker: undefined,
      musicScore:
        'e1_0.5 e1_0.5 e1_0.5 d1_0.5 e1_1.5 n_0.5 d1_0.5 e1_0.5 d1_0.5 d1_0.5 a a_0.5 b_0.5 c1 d1_0.5 c1_0.5 b a_0.5 g_0.5 a_3 n ' +
        'e1_0.5 e1_0.5 e1_0.5 d1_0.5 e1_1.5 a1_0.5 g1_0.5 a1_0.5 g1_0.5 g1_0.5 d1 d1_0.5 e1_0.5 f1 g1_0.5 f1_0.5 e1 d1_0.5 c1_0.5 e1_2 n_0.5 ' +
        'e1_0.5 a1 b1_0.5 a1_0.5 g1_1.5 e1_0.5 g1_2.5 n_0.5 e1_0.5 g1_0.5 d1 a1_0.5 g1_0.5 e1 d1_0.5 e1_0.5 e1_2.5 n_0.5 ' +
        'd1 a1_0.5 a1_1.5 n c1 a1_0.5 a1_1.5 a1_0.5 b1_0.5 c2 b1_0.5 a1_0.5 b1 g1 e1_2 n_0.5 ' +
        'e1_0.5 a1 b1_0.5 a1_0.5 g1_1.5 e1_0.5 g1_2.5 n_0.5 e1_0.5 g1_0.5 d1 a1_0.5 g1_0.5 e1 d1_0.5 e1_0.5 e1_2.5 n_0.5 ' +
        'd1 a1_0.5 a1_1.5 n c1 a1_0.5 a1_1.5 a1_0.5 b1_0.5 c2 b1_0.5 a1_0.5 b1 g1 a1_3',
    };
  },
  mounted() {
    this.speaker = new Speaker();
  },
  methods: {
    toggle() {
      if (!this.status) this.play();
      else this.stop();
    },
    async play() {
      this.status = 1;
      await this.speaker.Play(this.musicScore);
      this.stop();
    },
    stop() {
      this.speaker.Stop();
      this.status = 0;
    },
  },
};
</script>