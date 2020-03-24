<template>
  <div class="modal" :style="{'z-index': zIndex}">
    <zoom-in-trans>
      <div class="modal__content" v-if="isActive">
        <slot>
          <h3>Some thing here</h3>
        </slot>
        <hr>
        <button class="btn btn-secondary" @click="close()">
          OK!
        </button>
      </div>
    </zoom-in-trans>
  <fade-trans>
    <div class="modal__backdrop" @click="close()" v-if="isActive"></div>
  </fade-trans>
  </div>
</template>

<script>
import zoomInTrans from '../transitions/zoomIn';
import fadeTrans from '../transitions/fade';

export default {
  data() {
    return {
      zIndex: -1,
    };
  },
  props: {
    isActive: Boolean,
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
  components: {
    zoomInTrans,
    fadeTrans,
  },
  watch: {
    isActive(val) {
      if (val === false) {
        setTimeout(() => {
          this.zIndex = '-1';
        }, 500);
      } else {
        this.zIndex = '1400';
      }
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
