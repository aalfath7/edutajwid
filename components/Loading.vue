<template>
  <div
    class="fixed top-0 left-0 right-0 bottom-0 z-50 w-full h-screen bg-white flex justify-center items-center flex-col"
  >
    <div class="loader"></div>
    <img src="/src/logo-edutajwid.png" alt="" class="w-20" />
  </div>
</template>

<script setup lang="ts">
defineProps({
  isLoading: {
    type: Boolean,
    default: true,
  },
});
</script>

<style scoped>
.loader {
  width: 100px;
  aspect-ratio: 1;
  padding: 10px;
  box-sizing: border-box;
  display: grid;
  background: #fff;
  filter: blur(5px) contrast(10) hue-rotate(300deg);
  mix-blend-mode: darken;
}
.loader:before,
.loader:after {
  content: "";
  grid-area: 1/1;
  width: 40px;
  height: 40px;
  background: #ffff00;
  animation: l7 2s infinite;
}
.loader:after {
  animation-delay: -1s;
}
@keyframes l7 {
  0% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(100%, 0);
  }
  50% {
    transform: translate(100%, 100%);
  }
  75% {
    transform: translate(0, 100%);
  }
  100% {
    transform: translate(0, 0);
  }
}
</style>
