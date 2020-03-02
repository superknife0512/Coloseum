<template>
  <div>
    <br>
    <h3>Battle Field</h3>
    <hr>
    <player-bar></player-bar>
    <br>
    <section2></section2>
  </div>
</template>
<script>
import playerBar from '../components/playerBar.vue';
import section2 from '../components/section2.vue';

export default {
  components: {
    playerBar,
    section2,
  },
};
</script>
