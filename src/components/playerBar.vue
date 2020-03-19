<template>
  <div>
    <div class="bar">
      <normal-player-avatar
        v-for="player in normalPlayers"
        :key="player.username"
        :name="player.username"
        :img="player.img"
        :score="player.score"
        @changeChallenger="onChangeChallenger($event)" />
      <challenge-player-avatar></challenge-player-avatar>
    </div>
  </div>
</template>
<script>
import challengePlayerAvatar from './battle/challenger/challengePlayerAvatar';
import normalPlayerAvatar from './battle/challenger/normalPlayerAvatar';

export default {
  components: {
    challengePlayerAvatar,
    normalPlayerAvatar,
  },
  computed: {
    normalPlayers() {
      return this.$store.state.normalPlayer;
    },
  },
  methods: {
    onChangeChallenger(playerName) {
      console.log(playerName);
      this.$store.commit('changeChallenger', playerName);
    },
  },
};
</script>
<style lang="scss" scoped>
  .bar {
    background-color: rgb(175, 0, 52);
    display: flex;
    border-radius: 40rem;
    padding-left: 2.5rem;
    margin-top: 3rem;
    height: 10rem;
  }
</style>
