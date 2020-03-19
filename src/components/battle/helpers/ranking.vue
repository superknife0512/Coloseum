<template>
  <div class="ranking">
    <img :src="challengerRank.img" alt="medal">
    <h3>Top: {{ challengerRank.rank }} </h3>
    <h5> Bonus: {{ (challengerRank.rank - 1) * 7 }}% </h5>
  </div>
</template>
<script>
import imgChoose from '../../util/imgChoose';

export default {
  mounted() {
    const index = this.getRankFromSortPlayer;
    this.$store.commit('changeRank', index + 1);
  },
  computed: {
    challengerData() {
      return this.$store.state.challenger;
    },

    getRankFromSortPlayer() {
      const sortPlayer = [...this.$store.state.allPlayers].sort((a, b) => b.score - a.score);
      return sortPlayer.findIndex((ele) => ele.username === this.challengerData.username);
    },

    challengerRank() {
      const index = this.getRankFromSortPlayer;
      const img = imgChoose.medalImg(index + 1);
      return {
        rank: index + 1,
        img,
      };
    },
  },
  watch: {
    challengerRank(newVal, oldVal) {
      if (newVal.rank !== oldVal.rank) {
        this.$store.commit('changeRank', newVal.rank);
      }
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
