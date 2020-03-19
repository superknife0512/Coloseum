<template>
  <div>
    <player-control @chooseQuestion="questionEvent($event)"></player-control>
    <v-inform v-if="isInform" :color="color"></v-inform>
    <player-modal v-if="isActivePlayerModal" @onClose="isActivePlayerModal = false"></player-modal>
  </div>
</template>
<script>
import playerControl from '../components/playerController/playerControl';
import vInform from '../components/playerController/playerInform';
import playerModal from '../components/modals/playerModal';

export default {
  created() {
    this.socket.on('allAnswersSubmitted', () => {
      this.isInform = false;
      this.isActivePlayerModal = true;
    });
  },
  data() {
    return {
      number: 0,
      color: '',
      isInform: false,
      isActivePlayerModal: false,
    };
  },
  methods: {
    questionEvent(infoObj) {
      this.number = infoObj.number;
      this.color = infoObj.color;
      this.isInform = true;
    },
  },
  components: {
    playerControl,
    vInform,
    playerModal,
  },
  computed: {
    socket() {
      return this.$store.state.socket;
    },
  },
};
</script>
