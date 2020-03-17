<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand" href="#">Colloseum</a>
      <button class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item" :class="{'active': activePage === 'battle'}">
            <a class="nav-link" @click="changePage('battle')">Battle</a>
          </li>
          <li class="nav-item" :class="{'active': activePage === 'user'}">
            <a class="nav-link" @click="changePage('user')">User</a>
          </li>
          <li class="nav-item" :class="{'active': activePage === 'signIn'}">
            <a class="nav-link" @click="changePage('signIn')">Sign In</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  props: {
    activePage: String,
  },
  methods: {
    changePage(pageName) {
      this.$emit('changePage', pageName);
    },
  },
};
</script>
<style lang="scss" scoped>
.navbar-nav{
  .nav-item {
    cursor: pointer !important;
  }
}
</style>
