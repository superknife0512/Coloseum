<template>
  <div>
    <player-control @chooseQuestion="questionEvent($event)"></player-control>
    <v-inform v-if="isInform" :color="color"></v-inform>
  </div>
</template>
<script>
import playerControl from '../components/playerController/playerControl';
import vInform from '../components/playerController/playerInform';

export default {
  data() {
    return {
      number: 0,
      color: '',
      isInform: false,
    };
  },
  methods: {
    questionEvent(infoObj) {
      this.number = infoObj.number;
      this.color = infoObj.color;
      this.isInform = true;
      setTimeout(() => {
        this.isInform = false;
      }, 3000);
    },
  },
  components: {
    playerControl,
    vInform,
  },
};
</script>
