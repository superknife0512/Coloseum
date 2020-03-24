<template>
  <div class="mt-4">
    <h4> Let's begin your battle: </h4>
    <div class="section-4 jumbotron">
      <v-summary @start="onStart"
                :isStart="isStart"
                @stop="onStop" />
      <hr>
      <v-content
        :isStart="isStart"
        :blockBegin="blockBegin"
        :blockEnd="blockEnd" />
      <hr>
      <v-time :time="parseInt(time)"
              :isStart="isStart"
              @end="onFinal()"
              @start="onStart()"/>
    </div>
    <audio :src="openQuestion" type="audio/mpeg" ref="openQuestion"></audio>
    <audio :src="calculatedAudio" type="audio/mpeg" ref="calculatedAudio"></audio>
  </div>
</template>

<script>
import vSummary from './battle/section4/summary';
import vContent from './battle/section4/content';
import vTime from './battle/section4/time';
import openQuestion from '../assets/audio/open-question.mp3';
import level1Audio from '../assets/audio/level-1.mp3';
import level2Audio from '../assets/audio/level-2.mp3';
import level3Audio from '../assets/audio/level-3.mp3';
import level4Audio from '../assets/audio/level-4.mp3';
// import slideTrans from './transitions/slide';

export default {
  mounted() {
    this.$refs.openQuestion.volume = 0.6;
    this.$refs.openQuestion.play();
  },
  data() {
    return {
      isStart: false,
      openQuestion,
      blockBegin: true,
      blockEnd: true,
    };
  },
  computed: {
    time() {
      return this.$store.state.time || '0';
    },
    score() {
      return this.$store.state.score;
    },
    question() {
      return this.$store.state.question;
    },
    calculatedAudio() {
      let audio = null;
      switch (this.question.level) {
        case 'easy':
          audio = level1Audio;
          break;
        case 'normal':
          audio = level2Audio;
          break;
        case 'hard':
          audio = level3Audio;
          break;
        default:
          audio = level4Audio;
          break;
      }
      return audio;
    },
  },
  components: {
    vSummary,
    vContent,
    vTime,
    // slideTrans,
  },
  watch: {
    question(val) {
      if (val === null) {
        this.isStart = false;
        this.blockBegin = true;
        this.blockEnd = true;
      }
    },
  },
  methods: {
    onStart() {
      this.isStart = true;
      this.blockBegin = false;
      this.blockEnd = false;
      this.$refs.calculatedAudio.play();
    },
    onStop() {
      console.log('stop');
      this.isStart = false;
      this.blockEnd = true;
      this.$refs.calculatedAudio.pause();
    },
    onFinal() {
      this.isStart = false;
      this.blockEnd = false;
      this.$refs.calculatedAudio.pause();
    },
  },
};
</script>

<style lang="scss" scoped>
  .jumbotron{
    padding: 2rem;
  }
</style>
