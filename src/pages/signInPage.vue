<template>
  <form action="#" class="container" @submit.prevent="onSubmit()">
    <br>
    <h3>Sign in your face</h3>
    <hr>
    <div class="form-group">
      <label for="exampleInputEmail1">Player Name</label>
      <input type="text" class="form-control" v-model="name" >
    </div>
    <div class="form-group">
      <label> Choose your mascot </label>
      <select name="mascot" id="mascot" v-model="avatar" class="form-control">
        <option
          v-for="mascot in mascots"
          :key="mascot"
          :value="mascot"> {{ mascot }}
        </option>
      </select>
    </div>
    <button class="btn btn-primary" type="submit">
      Sign in!!
    </button>
  </form>
</template>
<script>
export default {
  created() {
    this.signInListener();
  },
  data() {
    return {
      name: '',
      avatar: '',
      mascots: ['cat', 'dog', 'eagle', 'goat', 'koala', 'rabbit'],
    };
  },
  methods: {
    onSubmit() {
      console.log('Submit');
      this.$emit('changePage', 'user');
      const randomScore = this.generateScore(110, 90);
      this.$store.commit('setCurrentPlayer', {
        username: this.name,
        img: this.avatar,
        score: randomScore,
      });
      this.$axios.post('/signIn', {
        username: this.currentPlayer.username,
        socketId: this.socket.id,
        img: this.avatar,
        score: randomScore,
      }).then((res) => {
        console.log(res);
      });
    },
    signInListener() {
      this.socket.on('globalAddPlayer', (playerData) => {
        playerData.forEach((player) => {
          this.mascots = this.mascots.filter((mascot) => mascot !== player.img);
        });
      });
    },
    generateScore(max, min) {
      return Math.floor(Math.random() * (max - min)) + min;
    },
  },
  computed: {
    socket() {
      return this.$store.state.socket;
    },
    currentPlayer() {
      return this.$store.state.currentPlayer;
    },
  },
};
</script>
<style lang="scss" scoped>
#mascot {
  option {
    text-transform: capitalize;
  }
}
</style>
