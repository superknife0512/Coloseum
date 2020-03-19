<template>
  <v-modal @close="onClose()">
    <h4>
      Everyone has submitted their answer, <br>
      Let's see the correct one!
    </h4>
  </v-modal>
</template>
<script>
import vModal from './modal';

export default {
  components: {
    vModal,
  },
  methods: {
    onClose() {
      this.$emit('onClose');
    },
  },
};
</script>
<style lang="scss" scoped>
  h4 {
    text-align: center;
  }
</style>
