<template>
  距离下班还剩{{ minutes }}分{{ seconds.toFixed(3) }}秒
  <br />
  距离绩效奖金发放还剩{{ infinity }}年
</template>

<script>
export default {
  name: 'FreeTimer',
  data() {
    return {
      minutes: 0,
      seconds: 0,
      infinity: Number.MAX_VALUE,
    };
  },
  mounted() {
    setInterval(() => {
      var timeDiff =
        new Date(`${new Date().toLocaleDateString()} 17:30:00`) - new Date();
      this.minutes = Math.floor(timeDiff / 1000 / 60);
      this.seconds = (timeDiff - this.minutes * 60 * 1000) / 1000;
    }, 10);
  },
};
</script>