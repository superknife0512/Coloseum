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
        <option value="cat">cat</option>
        <option value="dog">dog</option>
        <option value="eagle">eagle</option>
        <option value="goat">goat</option>
        <option value="koala">koala</option>
        <option value="rabbit">rabbit</option>
      </select>
    </div>
    <button class="btn btn-primary" type="submit">
      Sign in!!
    </button>
  </form>
</template>
<script>
export default {
  data() {
    return {
      name: '',
      avatar: '',
    };
  },
  methods: {
    onSubmit() {
      console.log('Submit');
      this.$emit('changePage', 'user');
      this.$store.commit('setCurrentPlayer', {
        username: this.name,
        img: this.avatar,
        score: 100,
      });
      this.$axios.post('/signIn', {
        username: this.currentPlayer.username,
        socketId: this.socket.id,
        img: this.avatar,
        score: 100,
      }).then((res) => {
        console.log(res);
      });
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
