<template>
  <div class="modal">
    <div class="modal__content">
      <slot>
        <h3>Some thing here</h3>
      </slot>
      <hr>
      <button class="btn btn-secondary" @click="close()">
        OK!
      </button>
    </div>
    <div class="modal__backdrop" @click="close()"></div>
  </div>
</template>

<script>
export default {
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1400;

    &__content{
      background-color: #fff;
      padding: 2rem;
      z-index: 2;
      border-radius: 8px;
      max-width: 40rem;
      margin: 0 1.5rem;
      .btn {
        float: right;
      }
    }

    &__backdrop{
      position: absolute;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100vw;
      background-color: rgba($color: #000000, $alpha: .5);
    }
  }
</style>
