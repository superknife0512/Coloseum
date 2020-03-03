<template>
  <div class="ranking">
    <img :src="challengerRank.img" alt="medal">
    <h3>Top: {{ challengerRank.rank }} </h3>
    <h5> Bonus: {{ (challengerRank.rank - 1) * 7 }}% </h5>
  </div>
</template>
<script>
import imgChoose from '../util/imgChoose';

export default {
  computed: {
    challengerData() {
      return this.$store.state.challenger;
    },

    challengerRank() {
      const sortPlayer = [...this.$store.state.allPlayers].sort((a, b) => b.point - a.point);
      // eslint-disable-next-line max-len
      const index = sortPlayer.findIndex((ele) => ele.username === this.challengerData.username);
      const img = imgChoose.medalImg(index + 1);
      return {
        rank: index + 1,
        img,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
  .ranking{
    text-align: center;
    padding-right: 3rem;
    img {
      height: 10.4rem;
    }
    h3{
      text-transform: uppercase;
      font-weight: 700;
      font-style: italic;
      margin-top: 0.5rem;
    }
    h5{
      color: rgb(248, 62, 6);
    }
  }
</style>
