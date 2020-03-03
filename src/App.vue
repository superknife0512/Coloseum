<template>
  <div>
    <v-header></v-header>
    <div class="container">
      <battle-field></battle-field>
    </div>
  </div>
</template>

<script>
import battleField from './pages/battleField.vue';
import vHeader from './components/header/headder.vue';

export default {
  created() {
    this.$store.commit('initApp');
    console.log('start');
  },
  components: {
    battleField,
    vHeader,
  },
};
</script>
