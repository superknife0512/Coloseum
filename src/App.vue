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
      activePage: 'signIn',
    };
  },

  created() {
    this.$axios.get('/old-data')
      .then((res) => {
        console.log('old data', res.data.playerData);
        if (res.data.playerData.length > 0) {
          const properPlayerList = res.data.playerData.map((ele) => {
            let returnedData = {
              ...ele,
              power: {
                shield: 8,
                link: 5,
                support: 7,
                steal: 11,
              },
            };
            if (ele.power) {
              returnedData = { ...ele };
            }
            return returnedData;
          });
          this.$store.commit('setAllPlayers', properPlayerList);
          this.$store.commit('initApp');
        }
      });
    this.initSocketState();
    this.submitListener();
    this.questionStateListener();
    this.evaluateAnswer();
    this.updateScoreListener();
  },

  methods: {
    updateScoreListener() {
      this.socket.on('updateEachPlayer', (score) => {
        this.$store.commit('setCurrentPlayerScore', score);
      });
    },

    initSocketState() {
      this.socket.on('globalAddPlayer', (playerList) => {
        const properPlayerList = playerList.map((ele) => ({
          ...ele,
          power: {
            shield: 8,
            link: 5,
            support: 7,
            steal: 11,
          },
        }));
        this.$store.commit('setAllPlayers', properPlayerList);
        this.$store.commit('initApp');
      });
    },

    submitListener() {
      this.socket.on('submitAnswer', (answers) => {
        this.$store.commit('updateAnswer', answers);
      });
    },
    questionStateListener() {
      this.socket.on('questionState', (state) => {
        this.$store.commit('canSubmitChange', state);
      });
    },
    evaluateAnswer() {
      this.socket.on('allAnswersSubmitted', () => {
        console.log(this.question);
        if (this.question) {
          this.$store.commit('evaluateAnswer');
        }
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
    question() {
      return this.$store.state.question;
    },
  },
};
</script>
