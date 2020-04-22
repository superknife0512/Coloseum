<template>
  <v-modal @close="onClose()" :isActive="isActive">
    <div class="modal__helper">
      <img :src="helperImg" alt="helper">
      <h3> {{ helperInfo.title }} </h3>
      <p> {{ helperInfo.explain }} </p>
      <div class="modal__player top" v-if="helperPowerName === 'link'">
        <img :src="avatarTop" alt="avatar">
        <h4> {{ topInNormal.username }} is Blocked !!!</h4>
      </div>
      <div class="modal__player bottom" v-if="helperPowerName === 'support'">
        <img :src="avatarBottom" alt="avatar">
        <h4> {{ bottomInNormal.username }} is your Teammate now!! </h4>
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

  props: {
    isActive: Boolean,
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
      return this.$store.state.helperPower?.name;
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
            title: 'Blocked Sword',
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
            title: 'The Bless of Devil',
          };
      }
      return infoObj;
    },

    helperImg() {
      return imgChoose.helperImgChoose(this.helperPowerName);
    },

    topInNormal() {
      const sortPlayers = [...this.$store.state.normalPlayer].sort((a, b) => b.score - a.score);
      return sortPlayers[0];
    },

    bottomInNormal() {
      const sortPlayers = [...this.$store.state.normalPlayer].sort((a, b) => b.score - a.score);
      return sortPlayers[sortPlayers.length - 1];
    },
  },

  components: {
    vModal,
  },
};
</script>
<style lang="scss" scoped>
.modal{
  &__helper {
    text-align: center;
    img {
      margin-bottom: 1rem;
      height: 3rem;
    }
  }
  &__player {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      height: 5rem;
      width: 5rem;
      border-radius: 50%;
      margin-right: 1.5rem;
      object-fit: cover;
    }
    h4 {
      color: rgb(30, 139, 202);
    }
  }
}
</style>
