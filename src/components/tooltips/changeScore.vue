<template>
  <div v-if="isShow" class="changeScore" :style="potition">
    <img src="../../assets/img/UI/arrow.png" alt="arrow">
    <div class="changeScore__control">
      <input type="number" class="form-control" placeholder="Score" v-model="score">
      <div class="btn-group mt-2">
        <button class="btn btn-danger" @click="changeScore('minus')"> - </button>
        <button class="btn btn-success" @click="changeScore('plus')"> + </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      score: 0,
    };
  },
  props: {
    isShow: Boolean,
    name: String,
    potition: {
      type: String,
      default: 'bottom: -6.5rem !important',
    },
  },
  methods: {
    changeScore(type) {
      if (type === 'plus') {
        this.$store.commit('plusScore', { name: this.name, score: this.score });
      } else {
        this.$store.commit('minusScore', { name: this.name, score: this.score });
      }
      this.score = '';
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/sass/main.scss';

  .changeScore{
    position: absolute;
    // bottom: -6.5rem;
    left: -8px;
    background-color: #fff;
    @include boxShadow(.4);
    padding: .4rem .6rem;
    border-radius: 2.5px;
    width: 7.2rem;

    img{
      position: absolute;
      top: -10px;
      left: 3rem;
      height: 1rem;
    }

    &__control{
      text-align: center;
    }
  }
</style>
