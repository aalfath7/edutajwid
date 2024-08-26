<template>
  <div class="sm:pl-4 pt-2">
    <div
      v-show="!leaderboard"
      class="fixed top-0 left-0 right-0 bottom-0 z-50 w-full h-screen bg-white flex justify-center items-center"
    >
      <div class="loader"></div>
    </div>
    <div
      v-if="leaderboard"
      class="slit-in w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:px-8 dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="flex items-center justify-between mb-4">
        <div
          class="flex text-sm lg:text-lg font-bold leading-none text-gray-900 dark:text-white"
        >
          <span class="mr-5">No</span>
          <h5>Leaderboard</h5>
        </div>
        <div class="text-sm lg:text-lg font-medium text-black">
          <span class="mr-5 sm:mr-16"> Lesson </span>
          <span> XP </span>
        </div>
      </div>
      <div class="flow-root">
        <ul
          v-for="(item, i) in leaderboard"
          :key="i"
          role="list"
          class="divide-y divide-gray-200 dark:divide-gray-700"
        >
          <li v-if="item" class="py-4 sm:py-5 border-t">
            <div class="flex items-center">
              <div class="mr-8 w-3 text-sm lg:text-base">
                {{ i + 1 }}
              </div>
              <div class="flex-shrink-0">
                <img
                  class="w-8 h-8 rounded-full border border-gray-400 object-cover"
                  :src="'/src/users/' + item.image"
                  alt="Neil image"
                />
              </div>
              <div class="flex-1 min-w-0 ms-4">
                <p
                  class="capitalize text-sm lg:text-base font-medium text-gray-900 truncate dark:text-white"
                >
                  {{ item.name }}
                </p>
              </div>
              <div
                class="mr-6 sm:mr-16 md:mr-20 inline-flex items-center text-sm lg:text-base text-gray-900 dark:text-white"
              >
                {{ item.last_lesson }}
              </div>
              <div
                class="w-10 text-center inline-flex justify-end items-center text-sm lg:text-base text-gray-900 dark:text-white"
              >
                {{ item.xp }}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "EduTajwid - Belajar Tajwid Dengan Mudah",
});
definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});

import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/index";
const { BASEAPIURL } = storeToRefs(useAuthStore());

// const { results } = await $fetch("/api/users/leaderboard");
const users = ref();
try {
  users.value = await $fetch(BASEAPIURL.value + "/leaderboard");
} catch (error) {
  // console.log(error);
}

const leaderboard = ref();

if (users.value) {
  leaderboard.value = await Promise.all(
    users.value.map(async (user) => {
      const lesson = await $fetch(
        BASEAPIURL.value + "/lessons/" + user.last_lesson
      );
      if (lesson[0]) {
        return { ...user, last_lesson: lesson[0].id_lesson };
      }
    })
  );
}
</script>

<style>
/* HTML: <div class="loader"></div> */
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
