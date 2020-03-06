<template>
  <div class="mt-4" v-if="question">
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
              @end="onFinal()"/>
    </div>
  </div>
</template>

<script>
import vSummary from './battle/section4/summary';
import vContent from './battle/section4/content';
import vTime from './battle/section4/time';

export default {
  data() {
    return {
      isStart: false,

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
  },
  components: {
    vSummary,
    vContent,
    vTime,
  },
  methods: {
    onStart() {
      this.isStart = true;
      this.blockBegin = false;
      this.blockEnd = false;
    },
    onStop() {
      this.isStart = false;
      this.blockEnd = true;
    },
    onFinal() {
      this.isStart = false;
      this.blockEnd = false;
    },
  },
};
</script>

<style lang="scss" scoped>
  .jumbotron{
    padding: 2rem;
  }
</style>
