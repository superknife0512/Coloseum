<template>
  <div class="jumbotron">
    <h4>Choose question difficult level: <h3> {{ level }} </h3></h4>
    <div class="questionChoose">
      <button
        class="btn btn-success"
        @click="setLevel('easy')"
        :disabled="questionLimit.easy === 0"> Easy (10 points) </button>
      <button class="btn btn-primary" @click="setLevel('normal')"
              :disabled="questionLimit.normal === 0"> Normal (20 points)
      </button>
      <button class="btn btn-warning" @click="setLevel('hard')"
              :disabled="questionLimit.hard === 0"> Hard (30 points) </button>
      <button class="btn btn-danger" @click="setLevel('death')"
              :disabled="questionLimit.death === 0"> Death Match (40 points)</button>
    </div>
    <audio :src="choosingAudio" type="audio/mpeg" ref="choosingAudio"></audio>
  </div>
</template>

<script>
import choosingAudio from '../../../assets/audio/chooseLevel.mp3';

export default {
  data() {
    return {
      choosingAudio,
    };
  },
  props: {
    level: String,
  },
  methods: {
    setLevel(level) {
      this.$emit('setQuestion', level);
      this.$refs.choosingAudio.play();
    },
  },
  computed: {
    questionLimit() {
      const questions = this.$store.state.allQuestions;

      const easyQuestions = questions.filter((ele) => ele.level === 'easy');
      const normalQuestions = questions.filter((ele) => ele.level === 'normal');
      const hardQuestions = questions.filter((ele) => ele.level === 'hard');
      const deathQuestions = questions.filter((ele) => ele.level === 'death');
      return {
        easy: easyQuestions.length,
        normal: normalQuestions.length,
        hard: hardQuestions.length,
        death: deathQuestions.length,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
  .questionChoose{
    display: flex;
    justify-content: space-between;
  }
  .jumbotron{
    padding: 2rem;
    h4{
      margin-bottom: 1.2rem;
    }
    h3{
      color: rgb(201, 79, 106);
      text-transform: uppercase;
      font-weight: 700;
    }
  }
  .btn {
    text-transform: uppercase;
    margin-right: 5rem;
  }
  [disabled] {
    cursor: not-allowed;
  }
</style>
