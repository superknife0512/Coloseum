<template>
  <div v-if="isShow" class="changeScore" :style="potition">
    <img src="../../assets/img/UI/arrow.png" alt="arrow">
    <div class="changeScore__control">
      <input type="number" class="form-control" placeholder="Score">
      <div class="btn-group mt-2">
        <button class="btn btn-danger"> - </button>
        <button class="btn btn-success"> + </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    isShow: Boolean,
    potition: {
      type: String,
      default: 'bottom: -6.5rem !important',
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
