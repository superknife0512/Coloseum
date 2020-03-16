<template>
  <div class="question-sum">
    <h4 class="level ">
      Level: {{ level }} ({{levelPoint * 10}})
    </h4> |
    <h4 class="maxScore ">Max Score: {{ score }} </h4> |
    <button class="btn"
            :class="isStart ? 'btn-danger' : 'btn-primary'"
            @click="gameController()">
       {{ isStart ? 'Stop' : 'Start'}}
    </button>
    <button class="btn btn-secondary" @click="clearQuestion()"> Switch back </button>
  </div>
</template>
<script>
import eventBus from '../../util/bus';

export default {
  props: {
    isStart: Boolean,
  },
  computed: {
    time() {
      return this.$store.state.time;
    },
    score() {
      return this.$store.state.score;
    },
    level() {
      return this.$store.state.level;
    },
    levelPoint() {
      switch (this.level) {
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
  },
  methods: {
    gameController() {
      if (this.isStart) {
        this.stopGame();
      } else {
        this.startCounting();
      }
    },
    startCounting() {
      eventBus.$emit('startCounting');
      this.$emit('start');
    },
    stopGame() {
      this.$emit('stop');
    },
    clearQuestion() {
      this.$store.commit('clearQuestion');
    },
  },
};
</script>
<style lang="scss" scoped>
  %title{
    margin-bottom: 0;
    &:not(:last-child) {
      margin-right: 2rem;
    }
    &:not(:first-child) {
      margin-left: 2rem;
    }
  }
  .question-sum{
    display: flex;
    align-items: center;
    .level {
      color: rgb(165, 34, 78);
      @extend %title;
    }
    h5 {
      color: rgb(1, 89, 161);
      @extend %title;
    }
    .maxScore {
      color: rgb(84, 56, 136);
      @extend %title;
    }
    .btn{
      margin-left: 2rem;
    }
  }
</style>
