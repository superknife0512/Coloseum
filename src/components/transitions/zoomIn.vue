<template>
  <transition name="zoomIn">
    <slot></slot>
  </transition>
</template>
<style lang="scss" scoped>
  .zoomIn-enter-active {
    animation: zoomIn .4s ease;
  }
  .zoomIn-leave-active {
    animation: zoomIn .4s ease reverse;
  }
  @keyframes zoomIn {
    0% {
      transform: scale(1.3);
      opacity: 0.4;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
</style>
