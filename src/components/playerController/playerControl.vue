<template>
  <div>
    <div class="user-summary">
      <div class="user-summary__score">
        150
      </div>
      <div class="user-summary__name">
        Leesin
      </div>
    </div>
    <hr>
    <div class="user-answer">
      <div class="user-answer__2-col">
        <h4 class="user-answer__title red" @click="chooseQuestion(1, 'red')"> 1 </h4>
        <h4 class="user-answer__title green" @click="chooseQuestion(2, 'green')" > 2 </h4>
      </div>
      <div class="user-answer__2-col">
        <h4 class="user-answer__title blue" @click="chooseQuestion(3, 'blue')" > 3 </h4>
        <h4 class="user-answer__title orange" @click="chooseQuestion(4, 'orange')" > 4 </h4>
      </div>
      <div class="user-answer__1-col">
        <h4 class="user-answer__title violet" @click="chooseQuestion(5, 'violet')" > 5 </h4>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    chooseQuestion(number, color) {
      this.$emit('chooseQuestion', {
        number,
        color,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/sass/main.scss';
  .user-summary{
    display: flex;
    align-items: center;
    margin-top: 2rem;

    &__score {
      height: 5rem;
      width: 5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #b61c4a;
      color: #fff;
      font-size: 1.6rem;
      font-style: italic;
      border-radius: 50%;
      z-index: 1000;
      flex-shrink: 0;
    }
    &__name {
      padding: 1.3rem 4rem;
      width: 100%;
      background-color: rgb(245, 245, 245);
      @include boxShadow(.3);
      margin-left: -2rem;
      font-size: 1.5rem;
      font-weight: 700;
      color: rgb(10, 76, 121);
      text-transform: uppercase;
      border-top-right-radius: 50px;
      border-bottom-right-radius: 50px;
    }
  }

  .user-answer {
    display: flex;
    flex-direction: column;
    &__2-col {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: .5rem;
    }
    &__title {
      padding: 1.4rem;
      font-size: 2.5rem;
      color: rgb(255, 255, 255);
      display: flex;
      align-items: center;
      justify-content: center;
      height: 12rem;
      border-radius: 1rem;
      cursor: pointer;
      &.red {
        background-color: #f85276;
      }
      &.green {
        background-color: #13d423;
      }
      &.blue {
        background-color: #23a9f7;
      }
      &.orange {
        background-color: #fa762a;
      }
      &.violet {
        background-color: #bf60ff;
      }
    }
  }
</style>
