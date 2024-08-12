<template>
  <div class="px-2 pt-20 bg-animate sm:h-screen relative">
    <section class="dark:bg-gray-900">
      <div class="py-8 px-4 mx-auto max-w-screen-xl">
        <div
          class="flex flex-col sm:flex-row justify-between slit-in bg-gray-50 bg-opacity-80 dark:bg-gray-800 border border-gray-200 rounded-lg p-8 md:p-12 mb-8"
        >
          <div class="mb-10 sm:mb-0">
            <h1 class="text-3xl font-bold text-black mb-6">
              Cara Seru dan Mudah Belajar Tajwid
            </h1>
            <p class="font-normal text-xl mb-6">
              Jadilah salah satu Keluarga Allah SWT dengan mempelajari Ilmu
              Tajwid Al-Quran.
            </p>
            <button class="btn-3d">
              <NuxtLink
                to="/dashboard"
                class="inline-flex justify-center items-center py-2.5 px-5 text-base font-medium text-center text-white rounded-lg bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300"
              >
                Mulai Belajar
                <svg
                  class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </NuxtLink>
            </button>
          </div>
          <Quran />
        </div>

        <div
          class="text-black slit-in w-full p-4 text-center bg-gray-50 bg-opacity-80 border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
        >
          <h5 class="mb-2 text-xl md:text-2xl font-bold">
            خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ
          </h5>
          <p>
            “Sebaik-baik kalian adalah orang yang belajar Al-Qur`an dan
            mengajarkannya.” (H.R. At-Tirmidzi)
          </p>
        </div>
      </div>
    </section>
    <div class="area">
      <ul class="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Home - EduTajwid",
});
definePageMeta({
  layout: "home",
  middleware: "auth",
});

import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/index";
const { logUserOut } = useAuthStore();
const { authenticated } = storeToRefs(useAuthStore());

const logout = () => {
  logUserOut();
};
</script>

<style scoped>
body {
  background-image: url("/src/bg.png");
  background-size: cover;
}

.btn-3d {
  transform: perspective(800px) rotateY(10deg) scale(0.94) rotateX(10deg);
  filter: blur(0.01px);
  opacity: 0.8;
  transition: 0.3s ease all;
}
.btn-3d:hover {
  transform: perspective(800px) rotateY(-15deg) translateY(-10px) rotateX(10deg)
    scale(1);
  filter: blur(0);
  opacity: 1;
}

@keyframes gradient {
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0% 0%;
  }
}

.neu {
  border-radius: 25px;
  background: linear-gradient(145deg, #e6e6e6, #ffffff);
  box-shadow: 7px 7px 14px #d1d1d1, -7px -7px 14px #ffffff;
}

.area {
  background: #f69f3c;
  background: -webkit-linear-gradient(to left, #8f94fb, #4e54c8);
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
}

.circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.circles li {
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  animation: animate 25s linear infinite;
  bottom: -150px;
}

.circles li:nth-child(1) {
  left: 25%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
}

.circles li:nth-child(2) {
  left: 10%;
  width: 20px;
  height: 20px;
  animation-delay: 2s;
  animation-duration: 12s;
}

.circles li:nth-child(3) {
  left: 70%;
  width: 20px;
  height: 20px;
  animation-delay: 4s;
}

.circles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  animation-delay: 0s;
  animation-duration: 18s;
}

.circles li:nth-child(5) {
  left: 65%;
  width: 20px;
  height: 20px;
  animation-delay: 0s;
}

.circles li:nth-child(6) {
  left: 75%;
  width: 110px;
  height: 110px;
  animation-delay: 3s;
}

.circles li:nth-child(7) {
  left: 35%;
  width: 150px;
  height: 150px;
  animation-delay: 7s;
}

.circles li:nth-child(8) {
  left: 50%;
  width: 25px;
  height: 25px;
  animation-delay: 15s;
  animation-duration: 45s;
}

.circles li:nth-child(9) {
  left: 20%;
  width: 15px;
  height: 15px;
  animation-delay: 2s;
  animation-duration: 35s;
}

.circles li:nth-child(10) {
  left: 85%;
  width: 150px;
  height: 150px;
  animation-delay: 0s;
  animation-duration: 11s;
}

@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 0;
  }

  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 50%;
  }
}
</style>
