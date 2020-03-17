<template>
  <v-modal @close="onClose()">
    <div class="modal__helper">
      <h3> {{ helperInfo.title }} </h3>
      <p> {{ helperInfo.explain }} </p>
      <div class="modal__player top" v-if="helperPowerName === 'link'">
        <img :src="avatarTop" alt="avatar">
        <h4> {{ topInNormal.username }} is your rival now!!</h4>
      </div>
      <div class="modal__player bottom" v-if="helperPowerName === 'support'">
        <img :src="avatarBottom" alt="avatar">
        <h4> {{ bottomInNormal.username }} is your Team mate now!! </h4>
      </div>
    </div>
  </v-modal>
</template>
<script>
import vModal from './modal';
import imgChoose from '../util/imgChoose';

export default {
  data() {
    return {
      // some things here
    };
  },

  methods: {
    onClose() {
      this.$emit('onClose');
    },
  },

  computed: {
    avatarTop() {
      return imgChoose.avaChoose(this.topInNormal.img);
    },

    avatarBottom() {
      return imgChoose.avaChoose(this.bottomInNormal.img);
    },

    helperPowerName() {
      return this.$store.state.helperPower.name;
    },
    helperInfo() {
      let infoObj = {};
      switch (this.helperPowerName) {
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

    topInNormal() {
      const sortPlayers = [...this.$store.state.normalPlayer].sort((a, b) => b.point - a.point);
      return sortPlayers[0];
    },

    bottomInNormal() {
      const sortPlayers = [...this.$store.state.normalPlayer].sort((a, b) => b.point - a.point);
      return sortPlayers[2];
    },
  },

  components: {
    vModal,
  },
};
</script>
<style lang="scss" scoped>
.modal{
  &__player {
    display: flex;
    align-items: center;
    img {
      height: 5rem;
      width: 5rem;
      border-radius: 50%;
      margin-right: 1.5rem;
      object-fit: cover;
    }
    h4 {
      color: rgb(255, 72, 0);
    }
  }
}
</style>
