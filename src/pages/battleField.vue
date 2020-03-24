<template>
  <div>
    <helper-modal
      @onClose="isModalActive = false"
      :isActive="isModalActive" />
    <summary-modal
      :isActive="isActiveSummary"
      @onClose="isActiveSummary = false" />
    <br>
    <h3>Battle Field</h3>
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
