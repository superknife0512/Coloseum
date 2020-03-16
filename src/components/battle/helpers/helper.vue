<template>
  <figure class="helper"
          @click="chooseHelper()"
          :class="{'helper__active': helperPower.isOn}">
    <img :src="helperImg" :alt="helperImg">
    <h5> -{{ helperPower.point }} </h5>
  </figure>
</template>

<script>
import imgChoose from '../../util/imgChoose';

export default {
  props: {
    helperPower: Object,
    img: String,
  },
  data() {
    return {
      // isChoose: false,
    };
  },
  computed: {
    helperImg() {
      return imgChoose.helperImgChoose(this.img);
    },
  },
  methods: {
    chooseHelper() {
      this.$emit('chooseHelper');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/sass/main.scss';
  .helper {
    background-color: rgb(245, 239, 235);
    display: inline-block;
    padding: 1.5rem;
    border-radius: 50%;
    margin-bottom: 0;
    border: .5rem solid rgb(253, 231, 132);
    cursor: pointer;
    transition: all .2s;
    position: relative;

    &:not(:last-child) {
      margin-right: 1.9rem;
    }
    &:hover{
      transform: scale(1.1) translateY(-.5rem);
    }
    img {
      height: 3rem;
      width: 3rem;
      object-fit: cover;
    }

    h5 {
      color: rgb(255, 95, 21);
      padding: .3rem 1rem;
      background-color: #fff;
      position: absolute;
      bottom: -2rem;
      left: 1rem;
      border-radius: 24px;
      @include boxShadow(.3px);
    }

    &__active{
      transform: scale(1.3);
      border: .5rem solid #ff815a;
      &:hover{
        transform: scale(1.3);
      }
    }
  }
</style>
