<template>
  <div class="slit-in sm:pl-4 pt-2">
    <div
      v-if="!isLoading"
      class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:px-8 dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="flex items-center justify-between mb-4">
        <div
          class="flex text-sm lg:text-lg font-bold leading-none text-gray-900 dark:text-white"
        >
          <span class="mr-5">No</span>
          <h5>Leaderboard</h5>
        </div>
        <div class="text-sm lg:text-lg font-medium text-black">
          <span> XP </span>
        </div>
      </div>
      <div class="flow-root">
        <ul
          v-for="(item, i) in users"
          :key="i"
          role="list"
          class="divide-y divide-gray-200 dark:divide-gray-700"
        >
          <li v-if="item" class="py-4 sm:py-5 border-t">
            <div class="flex items-center">
              <div
                class="rounded-full relative w-5 h-5 flex justify-center items-center mr-8 w-3 text-sm lg:text-base"
              >
                <span class="z-10">{{ i + 1 }}</span>
                <BootstrapIcon
                  v-if="i + 1 === 1"
                  class="text-3xl text-yellow-200 absolute -top-1"
                  name="award-fill"
                />
                <BootstrapIcon
                  v-if="i + 1 === 2"
                  class="text-3xl text-yellow-300 absolute -top-1"
                  name="award-fill"
                />
                <BootstrapIcon
                  v-if="i + 1 === 3"
                  class="text-3xl text-yellow-400 absolute -top-1"
                  name="award-fill"
                />
              </div>
              <div class="flex-shrink-0">
                <img
                  class="w-8 h-8 rounded-full border border-gray-400 object-cover"
                  :src="BASEAPIURL + '/uploads/' + item.image"
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
                class="w-10 text-center inline-flex justify-end items-center text-sm lg:text-base text-gray-900 dark:text-white"
              >
                {{ item.xp }}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div v-else>
      <Loading :is-loading="true" />
    </div>
    <span class="block mt-6 italic text-sm text-gray-500"
      >The leaderboard will be reset after {{ timeRemaining }}</span
    >
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

const isLoading = ref(true);
const users = ref();

try {
  const { data } = await useFetch(BASEAPIURL.value + "/api/leaderboard");
  users.value = data.value;
  if (data.value) {
    isLoading.value = false;
  }
} catch (error) {
  console.log(error);
}

const timeRemaining = ref("");

const calculateTimeRemaining = () => {
  const now = new Date();
  const currentDay = now.getDay();

  let daysUntilMonday = (1 - currentDay + 7) % 7;
  if (daysUntilMonday === 0) {
    daysUntilMonday = 7;
  }

  let nextMonday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + daysUntilMonday
  );
  nextMonday.setHours(0, 0, 0, 0);

  let difference = nextMonday - now;

  let days = Math.floor(difference / (1000 * 60 * 60 * 24));
  let hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((difference % (1000 * 60)) / 1000);

  timeRemaining.value = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
};

onMounted(() => {
  calculateTimeRemaining();
  const interval = setInterval(calculateTimeRemaining, 1000);

  onBeforeUnmount(() => {
    clearInterval(interval);
  });
});
</script>
