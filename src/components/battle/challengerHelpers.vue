<template>
  <div class="helpers">
    <challenger-helper v-for="i in 4" :key="i" />
  </div>
</template>
<script>
import challengerHelper from './helper';

export default {
  components: {
    challengerHelper,
  },
};
</script>
<style lang="scss" scoped>
  .helpers{
    height: 3rem;
    width: 70%;
    background-color: #fcdfc8;
    display: flex;
    align-items: center;
    justify-self: flex-end;
    border-radius: 50px;
    padding: 0 2rem;
    justify-content: center;
  }
</style>
