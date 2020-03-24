<template>
  <transition name="fade">
    <slot></slot>
  </transition>
</template>
<style lang="scss" scoped>
  .fade-enter-active {
    animation: fade .4s ease;
  }
  .fade-leave-active {
    animation: fade .4s ease reverse;
  }
  @keyframes fade {
    0% {
      opacity: 0.1;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
</style>
