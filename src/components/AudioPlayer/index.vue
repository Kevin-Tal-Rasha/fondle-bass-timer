<template>
  <a-button @click="toggle">{{ status ? '⏹️' : '▶️' }}</a-button>
</template>

<script>
import Speaker from './Speaker';

export default {
  data() {
    return {
      status: 0,
      speaker: undefined,
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
      const musicScore =
        // 'c1 g1 e1 c1 a b_0.5 a_0.5 g c1 a c1 d1_0.5 e1_0.5 f1 g b c1_1.5';
        'e1_0.5 e1_0.5 e1_0.5 d1_0.5 e1_1.5 n_0.5 d1_0.5 e1_0.5 d1_0.5 d1_0.5 a a_0.5 b_0.5 c1 d1_0.5 c1_0.5 b a_0.5 g_0.5 a_2 n ' +
        'e1_0.5 e1_0.5 e1_0.5 d1_0.5 e1_1.5 a1_0.5 g1_0.5 a1_0.5 g1_0.5 g1_0.5 d1 d1_0.5 e1_0.5 f1 g1_0.5 f1_0.5 e1 d1_0.5 c1_0.5 e1_2.5 n_0.5 ' +
        'e1_0.5 a1 b1_0.5 a1_0.5 g1_1.5 e1_0.5 g1_2 n_0.5 e1_0.5 g1_0.5 d1 a1_0.5 g1_0.5 e1 d1_0.5 e1_0.5 e1_2 n_0.5 ' +
        'd1 a1_0.5 a1_1.5 n_0.5 c1 a1_0.5 a1_1.5 n_0.5 a1_0.5 b1_0.5 c2 b1_0.5 a1_0.5 b1 g1 e1_2 n_0.5 ' +
        'e1_0.5 a1 b1_0.5 a1_0.5 g1_1.5 e1_0.5 g1_2 n_0.5 e1_0.5 g1_0.5 d1 a1_0.5 g1_0.5 e1 d1_0.5 e1_0.5 e1_2 n_0.5 ' +
        'd1 a1_0.5 a1_1.5 n_0.5 c1 a1_0.5 a1_1.5 n_0.5 a1_0.5 b1_0.5 c2 b1_0.5 a1_0.5 b1 g1 a1_2';
      await this.speaker.Play(musicScore);
      this.stop();
    },
    stop() {
      this.speaker.Stop();
      this.status = 0;
    },
  },
};
</script>