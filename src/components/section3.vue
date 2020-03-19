<template>
  <div class="section-3" v-if="!question">
    <div class="d-flex mb-2">
      <h4>Setup</h4>
      <button
        class="btn btn-secondary ml-2"
        :disabled="time === null ||questionLevel === null"
        @click="chooseQuestion()">
        Start question
      </button>
    </div>
    <question-choose @setQuestion="questionLevel = $event" :level="questionLevel"></question-choose>
    <time-choose @setTime="time = $event" :time="time"></time-choose>
  </div>
</template>

<script>
import questionChoose from './battle/section3/questionChoose';
import timeChoose from './battle/section3/timeChoose';

export default {
  data() {
    return {
      time: null,
      questionLevel: null,
    };
  },
  components: {
    questionChoose,
    timeChoose,
  },
  methods: {
    chooseQuestion() {
      this.$store.commit('selectQuestion', {
        questionLevel: this.questionLevel,
        time: this.time,
      });
      const bonusTime = this.bonusTimeCal;
      const percentByRank = (this.challengerRank - 1) * 0.07 + 1;
      const bonusScore = Math.round(percentByRank * (this.level * 10 + bonusTime));
      this.$store.commit('setScore', bonusScore);
      this.time = null;
      this.questionLevel = null;
    },
  },
  computed: {
    challengerRank() {
      return this.$store.state.rank;
    },
    bonusTimeCal() {
      switch (this.time) {
        case '15':
          return 15;
        case '45':
          return 10;
        case '90':
          return 5;
        default:
          return 0;
      }
    },
    level() {
      switch (this.questionLevel) {
        case 'easy':
          return 1;
        case 'normal':
          return 2;
        case 'hard':
          return 3;
        default:
          return 4;
      }
    },
    question() {
      return this.$store.state.question;
    },
  },
};
</script>

<style lang="scss" scoped>
  .section-3{
    margin-top: 3.4rem;
  }
</style>
