<template>
  <div class="question">
    <div class="question__content mb-4">
      <h5 v-show="!isBlock">{{ question.content }} ?</h5>
    </div>
    <div class="alert alert-light question__answer" role="alert">
      <h5 v-for="(ans, i) in question.answers" :key="i">
        ({{ i }}) - {{ ans }}
      </h5>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    blockBegin: Boolean,
    blockEnd: Boolean,
  },
  computed: {
    question() {
      return this.$store.state.question;
    },
    isBlock() {
      if (this.blockBegin === true || this.blockEnd === true) {
        return true;
      }
      return false;
    },
  },
};
</script>
<style lang="scss" scoped>
.question {
  &__content{
    h5{
      color: rgb(0, 67, 129);
      font-size: 1.4rem;
    }
  }
  &__answer{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
    h5 {
      text-transform: capitalize;
      color: #444;
    }
  }
}
</style>
