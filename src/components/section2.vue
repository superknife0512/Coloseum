<template>
  <div class="section-2">
    <div class="ranking">Ranking</div>
    <challenger-helpers></challenger-helpers>
  </div>
</template>

<script>
import challengerHelpers from './battle/challengerHelpers';

export default {
  components: {
    challengerHelpers,
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/sass/main.scss';

  .section-2{
    display: flex;
    margin-top: 5rem;
    justify-content: flex-end;
  }
</style>
