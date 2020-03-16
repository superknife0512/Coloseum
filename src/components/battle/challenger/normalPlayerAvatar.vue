<template>
  <figure class="avatar">
    <h6> {{ name }} </h6>
    <img :src="avaChoose"
         :alt="img"
         @dblclick="changeChallenger(name)">
    <h5 @click="showModal = !showModal"> {{ point }} </h5>
    <change-score-tooltip :isShow="showModal" :name="name"></change-score-tooltip>
  </figure>
</template>
<script>
import changeScoreTooltip from '../../tooltips/changeScore';
import imgChoose from '../../util/imgChoose';
import eventBus from '../../util/bus';

export default {
  props: {
    img: String,
    name: String,
    point: Number,
  },
  data() {
    return {
      showModal: false,
    };
  },
  components: {
    changeScoreTooltip,
  },
  computed: {
    avaChoose() {
      return imgChoose.avaChoose(this.img);
    },
  },
  methods: {
    changeChallenger(name) {
      this.$emit('changeChallenger', name);
      eventBus.$emit('initPower');
    },
  },
};
</script>
<style lang="scss" scoped>
  .avatar{
    margin-right: 3rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 1rem;
    position: relative;
    h6{
      color: rgb(255, 255, 255);
      font-weight: 600;
      margin-bottom: 0.2rem;
      font-style: italic
    }
    img {
      height: 5.5rem;
      width: 5.5rem;
      object-fit: cover;
      border-radius: 50%;
      transition: all .2s;

      &:hover{
        transform: translateY(-.2rem);
      }
    }
    h5 {
      padding: .1rem 1.2rem;
      background-color: #fff;
      border-radius: 25rem;
      margin-top: -.6rem;
      cursor: pointer;
      transition: all .2s;

      &:hover {
        transform: scale(1.1);
      }
    }
  }
</style>
