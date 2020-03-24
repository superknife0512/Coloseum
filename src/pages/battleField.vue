<template>
  <div>
    <helper-modal
      @onClose="isModalActive = false"
      :isActive="isModalActive" />
    <summary-modal
      :isActive="isActiveSummary"
      @onClose="isActiveSummary = false" />
    <br>
    <div class="d-flex">
      <h3>Battle Field</h3>
      <button class="btn btn-danger ml-4" @click="resetGame()">Reset the game</button>
    </div>
    <hr>
    <player-bar></player-bar>
    <br>
    <section2></section2>
    <slide-trans>
      <section3 v-if="!question"></section3>
      <section4 v-else></section4>
    </slide-trans>
    <br><br>
  </div>
</template>
<script>
import playerBar from '../components/playerBar.vue';
import section2 from '../components/section2.vue';
import section3 from '../components/section3.vue';
import section4 from '../components/section4.vue';
import helperModal from '../components/modals/helperModal';
import summaryModal from '../components/modals/summaryModal';
import slideTrans from '../components/transitions/slide';

export default {
  /* eslint-disable no-restricted-globals */
  /* eslint-disable no-alert */

  created() {
    this.socket.on('allAnswersSubmitted', () => {
      this.isActiveSummary = true;
    });
  },
  data() {
    return {
      isModalActive: false,
      isActiveSummary: false,
    };
  },

  computed: {
    helperChallenger() {
      return this.$store.state.helperPower;
    },
    socket() {
      return this.$store.state.socket;
    },
    question() {
      return this.$store.state.question;
    },
  },

  watch: {
    helperChallenger(value) {
      if (value !== null) {
        this.isModalActive = true;
      }
    },
  },

  methods: {
    resetGame() {
      const sure = confirm('Are you sure');
      if (sure) {
        localStorage.clear();
        this.$axios.post('/reset', {})
          .then(() => {
            location.reload();
          });
      }
    },
  },

  components: {
    playerBar,
    section2,
    section3,
    section4,
    helperModal,
    summaryModal,
    slideTrans,
  },
};
</script>
