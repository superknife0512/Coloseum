<template>
  <div class="inform" :style="colorComputing">
    <div class="inform__info">
      <img src="../../assets/img/UI/spin.png" alt="spin">
      <h4> {{ congratelulateChoice }} </h4>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    const randomNumber = Math.floor(Math.random() * 8);
    this.congratelulateChoice = this.congraList[randomNumber];
  },
  data() {
    return {
      congraList: [
        'Wow! How can you get it ^^',
        'Hey! Are you a genius ? :3',
        'Nice choice <3',
        'Awesome, Genius, Perfect!!',
        'Are you sure ??',
        'Let \'s careful now!!',
        'God bless you <3',
        'Let \'s think again :)',
        'You are the best :)',
      ],
      congratelulateChoice: null,
    };
  },
  props: {
    color: String,
  },
  computed: {
    colorComputing() {
      let color = 'background-color: #f85276';
      if (!this.color || this.color === 'red') {
        return color;
      }
      switch (this.color) {
        case 'green':
          color = 'background-color: #13d423';
          break;
        case 'blue':
          color = 'background-color: #23a9f7';
          break;
        case 'orange':
          color = 'background-color: #fa762a';
          break;
        default:
          color = 'background-color: #a219fd';
      }
      return color;
    },
  },
};
</script>
<style lang="scss" scoped>
  .inform {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top:0;
    left: 0;
    background-color: #fff;
    z-index: 1200;
    display: flex;
    justify-content: center;
    align-items: center;
    &__info {
      text-align: center;
      img {
        height: 6.5rem;
        margin-bottom: 1.2rem;
        animation: spinning 1.5s infinite ease;
      }
      h4 {
        color: white;
        font-weight: 700;
      }
    }
  }

  @keyframes spinning {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
