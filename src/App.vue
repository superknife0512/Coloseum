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
  components: {
    battleField,
    vHeader,
  },
};
</script>
