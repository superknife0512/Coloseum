<template>
  <div>
    <v-header :activePage="activePage" @changePage="activePage = $event"></v-header>
    <div class="container">
      <battle-field v-if="activePage === 'battle'"></battle-field>
      <user-page v-if="activePage === 'user'"></user-page>
      <sign-in-page
        v-if="activePage === 'signIn'"
        @changePage="activePage = $event"></sign-in-page>
    </div>
  </div>
</template>

<script>
import battleField from './pages/battleField.vue';
import userPage from './pages/playerPage.vue';
import vHeader from './components/header/header';
import signInPage from './pages/signInPage';

export default {
  data() {
    return {
      activePage: 'battle',
    };
  },

  created() {
    this.initSocketState();
    this.$store.commit('initApp');
  },

  methods: {
    initSocketState() {
      this.socket.on('globalAddPlayer', (playerList) => {
        this.$store.commit('setAllPlayers', playerList);
      });
    },
  },
  components: {
    battleField,
    vHeader,
    userPage,
    signInPage,
  },

  computed: {
    socket() {
      return this.$store.state.socket;
    },
  },
};
</script>
