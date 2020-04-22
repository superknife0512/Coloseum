<template>
  <figure class="helper"
          @click="chooseHelper()"
          :class="{'helper__active': helperPower.isOn}">
    <img :src="helperImg" :alt="helperImg">
    <h5> -{{ helperPower.point }} </h5>
    <audio :src="musicChoice" ref="audioControl"></audio>
  </figure>
</template>

<script>
import imgChoose from '../../util/imgChoose';

import coin from '../../../assets/audio/coin.mp3';
import shield from '../../../assets/audio/shield.mp3';
import support from '../../../assets/audio/support.mp3';
import swordChain from '../../../assets/audio/sword-chain.mp3';

export default {
  props: {
    helperPower: Object,
    img: String,
  },
  data() {
    return {
      // nothing
    };
  },
  computed: {
    helperImg() {
      return imgChoose.helperImgChoose(this.img);
    },
    musicChoice() {
      let audio;
      switch (this.img) {
        case 'link':
          audio = swordChain;
          break;
        case 'shield':
          audio = shield;
          break;
        case 'steal':
          audio = coin;
          break;
        case 'support':
          audio = support;
          break;
        default:
          audio = shield;
          break;
      }
      return audio;
    },
  },
  methods: {
    chooseHelper() {
      this.$refs.audioControl.volume = 0.3;
      this.$refs.audioControl.play();
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
