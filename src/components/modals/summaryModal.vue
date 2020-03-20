
<template>
  <v-modal @close="onClose()">
    <div class="summary">
      <h3>Summary</h3>
      <h5> Challenger: <span class="summary__bold">
        {{ summaryInfo.isChallengerCorrect ? 'Correct' : 'Incorrect' }}
         </span>
      </h5>
      <h5 v-if="!summaryInfo.isChallengerCorrect">
        Number of CORRECT answers:
        <span class="summary__bold">
         {{ summaryInfo.numberOfAnswerCorrect }}
        </span>
      </h5>
      <h5 v-if="summaryInfo.isChallengerCorrect">
        Number of INCORRECT answers:
        <span class="summary__bold">
          {{ summaryInfo.numberOfAnswerFail }}
        </span>
      </h5>
      <h5> Helper power: <span class="summary__bold"> {{ helperPower || 'No' }} </span> </h5>
      <hr>
      <h4> Total Point: <span class="summary__bold"> {{ finalScore }} </span> </h4>
      <img :src="trumpet" alt="trumpet" class="summary__trumpet--left">
      <img :src="trumpet" alt="trumpet" class="summary__trumpet--right">
    </div>
  </v-modal>
</template>

<script>
import vModal from './modal';
import trumpet from '../../assets/img/UI/trumpet.png';
/* eslint-disable max-len */
export default {
  data() {
    return {
      trumpet,
    };
  },
  components: {
    vModal,
  },

  methods: {
    onClose() {
      this.$emit('onClose');
      if (!this.helperPower) {
        this.withoutHelper();
      } else if (this.stateOfHelperPower.name === 'shield') {
        this.shieldHelper();
      } else if (this.stateOfHelperPower.name === 'link') {
        this.chainHelper();
      } else if (this.stateOfHelperPower.name === 'support') {
        this.supportHelper();
      } else if (this.stateOfHelperPower.name === 'steal') {
        this.stealHelper();
      }
      this.$store.commit('updateAllPlayer');
      this.updateBackendPlayerScore();
    },

    helperInfo(helperName) {
      let infoObj = {};
      switch (helperName) {
        case 'shield':
          infoObj = {
            explain: 'Other players is disable from answering this question and your score is still stand whether your answer is true or false.',
            title: 'Spirit Shield',
          };
          break;
        case 'link':
          infoObj = {
            explain: 'Block the highest rank player from submit answer or the second one if you are currently the top rank.',
            title: 'Inferno Chain',
          };
          break;
        case 'support':
          infoObj = {
            explain: 'You and the lowest rank player will become the team, you guys will receive half of scores (each) if one of your answer is correct.',
            title: 'Cosmic Binding',
          };
          break;
        default:
          infoObj = {
            explain: 'Steal the score from who submits the wrong answer in your turn.',
            title: 'Hands of Midas',
          };
      }
      return infoObj;
    },

    updateBackendPlayerScore() {
      this.$axios.post('/update-score', {
        allPlayers: [...this.allPlayersData],
      }).then((res) => {
        console.log(res);
      });
    },

    withoutHelper() {
      this.$store.commit('plusScore', {
        name: this.challengerName,
        score: this.finalScore,
      });
    },

    shieldHelper() {
      console.log('ShieldHelper');
      this.$store.commit('plusScore', {
        name: this.challengerName,
        score: this.finalScore,
      });
    },

    chainHelper() {
      this.$store.commit('plusScore', {
        name: this.challengerName,
        score: this.finalScore,
      });
    },

    supportHelper() {
      this.$store.commit('plusScore', {
        name: this.challengerName,
        score: this.finalScore,
      });
      this.$store.commit('plusScore', {
        name: this.bottomNormal.username,
        score: this.finalScore,
      });
    },

    stealHelper() {
      this.$store.commit('plusScore', {
        name: this.challengerName,
        score: this.finalScore,
      });
      if (this.finalScore > 0) {
        this.normalPlayers.forEach((ele) => {
          this.$store.commit('minusScore', {
            name: ele.username,
            score: (Math.floor(this.finalScore / (this.summaryInfo.numberOfAnswerFail))),
          });
        });
      }
    },
  },

  computed: {
    stateOfHelperPower() {
      return this.$store.state.helperPower;
    },

    finalScore() {
      return this.$store.state.finalScore;
    },
    helperPower() {
      const helper = this.$store.state.helperPower;
      if (!helper) {
        return null;
      }
      const infoObj = this.helperInfo(helper.name);
      return infoObj.title;
    },
    challengerName() {
      return this.$store.state.challenger.username;
    },
    summaryInfo() {
      const questionCorrectAns = this.$store.state.question.correctAns;
      const { playerAnswers } = this.$store.state;
      const { challengerName } = this;
      const challengerAns = playerAnswers.find((ele) => ele.username === challengerName).answer;
      const normalAnswers = playerAnswers.filter((ele) => ele.username !== challengerName);
      const isChallengerCorrect = challengerAns === questionCorrectAns;
      const numberOfAnswerCorrect = normalAnswers.filter((ele) => ele.answer === questionCorrectAns).length;
      return {
        isChallengerCorrect,
        numberOfAnswerCorrect,
        numberOfAnswerFail: normalAnswers.length - numberOfAnswerCorrect,
      };
    },
    bottomNormal() {
      const sortedNormalPlayer = [...this.$store.state.normalPlayer].sort((b, a) => b.score - a.score);
      return sortedNormalPlayer[0];
    },

    normalPlayers() {
      return this.$store.state.normalPlayer;
    },

    allPlayersData() {
      return this.$store.state.allPlayers;
    },
  },
};
</script>

<style lang="scss" scoped>
  %trumpet {
    position: absolute;
    top: -5.9rem;
    height: 6rem;
    // transform-origin: 0% 0%;
  }
  .summary {
    position: relative;
    h3 {
      text-transform: uppercase;
      color: rgb(255, 67, 139);
      margin-bottom: 1.2rem;
      font-weight: 700;
    }
    &__bold {
      font-size: 1.5rem;
      color: rgb(48, 89, 151);
      margin-left: 0.2rem;
    }
    &__trumpet {
      &--right {
        @extend %trumpet;
        right: -6rem;
      }
      &--left {
        @extend %trumpet;
        left: -6rem;
        transform: rotate(-90deg);
      }
    }
  }
</style>
