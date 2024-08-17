<template>
  <div class="confetti-container" v-if="showConfetti">
    <div
      v-for="n in 100"
      :key="n"
      class="confetti"
      :style="generateConfettiStyle()"
    ></div>
  </div>
</template>

<script setup>
const props = defineProps({
  actived: Boolean,
});

const showConfetti = ref(false);

const startConfetti = () => {
  showConfetti.value = true;
  setTimeout(() => {
    showConfetti.value = false;
  }, 5000); // Animasi confetti selama 5 detik
};

const generateConfettiStyle = () => {
  const left = Math.random() * 100;
  const duration = Math.random() * 3 + 2; // Durasi antara 2 sampai 5 detik
  const delay = Math.random() * 2; // Penundaan sebelum mulai
  const size = Math.random() * 0.7 + 0.5; // Ukuran bervariasi, lebih besar agar terlihat seperti pita
  const colors = ["#f87171", "#34d399", "#60a5fa", "#fbbf24", "#a78bfa"];
  const color = colors[Math.floor(Math.random() * colors.length)];

  return {
    left: `${left}vw`,
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
    width: `${size}rem`,
    height: `${size}rem`,
    backgroundColor: color,
  };
};
const actived = ref(false);

watch(
  () => props.actived,
  async (newValue) => {
    if (newValue) {
      actived.value = newValue;
      if (actived.value) {
        startConfetti();
      }
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.confetti-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 100;
}

.confetti {
  position: absolute;
  top: -2rem;
  border-radius: 0.25rem; /* Membuat bentuk confetti menjadi kotak */
  animation: fallAndDrift linear infinite;
  transform: translate3d(0, -100vh, 0);
}

@keyframes fallAndDrift {
  0% {
    transform: translate3d(0, -100vh, 0) rotate(0deg);
  }
  100% {
    transform: translate3d(0, 100vh, 0) rotate(180deg);
  }
}
</style>
