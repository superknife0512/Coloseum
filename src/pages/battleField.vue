<template>
  <div>
    <br>
    <h3>Battle Field</h3>
    <hr>
    <player-bar></player-bar>
    <br>
    <section2></section2>
    <section3></section3>
    <section4></section4>
    <br><br>
  </div>
</template>
<script>
import playerBar from '../components/playerBar.vue';
import section2 from '../components/section2.vue';
import section3 from '../components/section3.vue';
import section4 from '../components/section4.vue';

export default {
  components: {
    playerBar,
    section2,
    section3,
    section4,
  },
};
</script>
