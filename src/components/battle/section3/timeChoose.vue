<template>
  <div class="jumbotron">
    <h4>Choose answer time: <h3> {{ time }} </h3></h4>
    <div class="questionChoose">
      <button class="btn btn-success" @click="setTime('10')"> 10s (bonus 15) </button>
      <button class="btn btn-primary" @click="setTime('45')"> 45s (bonus 10) </button>
      <button class="btn btn-warning" @click="setTime('90')"> 90s (bonus 5) </button>
      <button class="btn btn-danger" @click="setTime('140')"> 140s (bonus 0) </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    time: String,
  },
  methods: {
    setTime(time) {
      this.$emit('setTime', time);
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
</style>
