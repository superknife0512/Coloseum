<template>
  <transition name="slide" mode="out-in">
    <slot></slot>
  </transition>
</template>
<style lang="scss" scoped>
  .slide-enter-active {
    animation: slide .4s ease;
  }
  .slide-leave-active {
    animation: slide .4s ease reverse;
  }
  @keyframes slide {
    0% {
      transform: translateX(-70%);
      opacity: 0.2;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
</style>
