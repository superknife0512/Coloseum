<template>
  <div>
    <v-header :activePage="activePage" @changePage="activePage = $event"></v-header>
    <div class="container">
      <battle-field v-if="activePage === 'battle'"></battle-field>
      <user-page v-else></user-page>
    </div>
  </div>
</template>

<script>
import battleField from './pages/battleField.vue';
import userPage from './pages/userPage.vue';
import vHeader from './components/header/header';

export default {
  data() {
    return {
      activePage: 'battle',
    };
  },

  created() {
    this.$store.commit('initApp');
    console.log('start');
  },
  components: {
    battleField,
    vHeader,
    userPage,
  },
};
</script>
