<template>
  <div class="time">
    <div class="time__clock" :class="clockBgComputing">
      <h3>{{ remainingTime }}</h3>
      <div class="time__clock-rotate time__animated"
           v-if="isStart"></div>
    </div>
    <div class="progress">
      <div
        class="progress-bar progress-bar-striped progress-bar-animated"
        role="progressbar" aria-valuenow="75" aria-valuemin="0"
        :class="bgComputing"
        aria-valuemax="100" :style="`width: ${percent}%`">
      </div>
    </div>
    <audio :src="endingAudio" ref="audioController"></audio>
  </div>
</template>
<script>
import busEvent from '../../util/bus';
import endingAudio from '../../../assets/audio/ending.mp3';

export default {
  created() {
    busEvent.$on('startCounting', () => {
      this.startCounting();
    });
    this.socket.on('allAnswersSubmitted', () => {
      this.remainingTime = 0;
    });
  },
  props: {
    time: {
      type: Number,
      default: 0,
    },
    isStart: Boolean,
  },
  data() {
    return {
      remainingTime: this.time,
      interval: null,
      endingAudio,
    };
  },
  methods: {
    apiCallChangeQuestionState(state) {
      this.$axios.post('/question', { state });
    },
    startCounting() {
      this.apiCallChangeQuestionState('start');
      this.$emit('start');
      this.interval = setInterval(() => {
        this.remainingTime -= 1;
      }, 1000);
    },
    callTimeUpAPI() {
      this.$axios.post('/time-up')
        .then((res) => {
          console.log(res);
        });
    },
  },
  computed: {
    percent() {
      return Math.floor((this.remainingTime / this.time) * 100);
    },
    bgComputing() {
      let bg = '';
      if (this.percent <= 50 && this.percent > 20) {
        bg = 'bg-warning';
      } else if (this.percent <= 20) {
        bg = 'bg-danger';
      }
      return bg;
    },
    clockBgComputing() {
      let bg = '';
      if (this.percent <= 50 && this.percent > 20) {
        bg = 'time__warning';
      } else if (this.percent <= 20) {
        bg = 'time__danger';
      }
      return bg;
    },
    socket() {
      return this.$store.state.socket;
    },
    numberOfAnswers() {
      return this.$store.state.playerAnswers.length;
    },
    numberOfPlayers() {
      return this.$store.state.allPlayers.length;
    },
  },
  watch: {
    remainingTime(val) {
      if (val === 0) {
        clearInterval(this.interval);
        this.$emit('end');
        this.apiCallChangeQuestionState('end');
        this.$refs.audioController.play();
        if (this.numberOfAnswers < this.numberOfPlayers) {
          this.callTimeUpAPI();
        }
      }
    },
    isStart(val) {
      if (!val) {
        clearInterval(this.interval);
        this.apiCallChangeQuestionState('end');
      }
    },
  },
};
</script>
<style lang="scss" scoped>

  @keyframes rotateAnim{
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  .time{
    display: flex;
    align-items: center;
    .progress {
      background-color: #fff;
      width: 100%;
    }
    &__clock {
      height: 4rem;
      width: 4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgb(0, 153, 255);
      border-radius: 50%;
      position: relative;
      transform: translateX(.2rem);
      h3 {
        margin-bottom: 0;
        color: #fff;
      }
    }
    &__clock-rotate{
      position: absolute;
      top: -8px;
      left: -11px;
      height: 5rem;
      width: 5rem;
      border: rgb(83, 198, 252) dashed 7px;
      border-radius: 50%
    }
    &__warning {
      background-color: #ffbb00;
    }
    &__danger {
      background-color: #ff0d21;
    }
    &__animated{
      animation: rotateAnim 3s linear infinite;
    }
  }
</style>
