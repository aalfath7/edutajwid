<template>
  <div class="slit-in grid lg:grid-cols-3 gap-5">
    <div class="lg:col-span-2 ml-3 -mt-5">
      <ol class="mt-5 items-start xl:flex">
        <li v-for="item in data" class="relative mb-6 xl:mb-0">
          <div class="flex items-center">
            <div
              :class="item.style"
              class="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0"
            >
              {{ item.symbol }}
            </div>
            <div
              class="hidden xl:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"
            ></div>
          </div>
          <div
            :class="{ 'cursor-not-allowed': item.visible === false }"
            class="mt-3 sm:pe-8 p-1"
          >
            <div
              :class="item.style"
              class="block md:max-w-sm p-6 border rounded-lg shadow dark:bg-blue-800 dark:border-blue-700 dark:hover:bg-blue-700 overflow-hidden"
            >
              <NuxtLink
                :to="item.link"
                :class="{
                  'pointer-events-none cursor-not-allowed':
                    item.visible === false,
                }"
                class="select-none relative"
              >
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  {{ item.title }}
                </h3>
                <p
                  class="text-sm sm:text-base font-normal text-gray-500 dark:text-gray-400"
                >
                  {{ item.desc }}
                </p>
                <div class="flex justify-end">
                  <BootstrapIcon
                    v-if="item.visible === true"
                    class="ml-4 text-2xl text-gray-400"
                    name="arrow-right-circle"
                  />
                  <BootstrapIcon
                    v-else
                    class="ml-4 text-2xl text-gray-400"
                    name="lock-fill"
                  />
                </div>
                <img
                  src="/src/icon.png"
                  alt=""
                  class="w-44 h-44 opacity-5 absolute -right-20 -bottom-16 -rotate-12 saturate-100"
                />
              </NuxtLink>
            </div>
          </div>
        </li>
      </ol>
    </div>
    <div class="hidden lg:block">
      <div class="sticky top-20">
        <a
          href="#"
          class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5
            class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            Misi Harian
          </h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">
            Selesaikan misi harian untuk mendapatkan exp tambahan
          </p>

          <div class="flex justify-between mt-5 mb-1">
            <span class="text-base font-medium text-blue-700 dark:text-white"
              >Progress</span
            >
            <span class="text-sm font-medium text-blue-700 dark:text-white"
              >45%</span
            >
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              class="bg-blue-600 h-2.5 rounded-full"
              style="width: 45%"
            ></div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "EduTajwid - Belajar Tajwid Dengan Mudah",
});
definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});
import { initFlowbite } from "flowbite";

onMounted(() => {
  initFlowbite();
});

const data = [
  {
    title: "Alif - Basic Level",
    desc: "Mempelajari tentang definisi Al-Quran, Ilmu Tajwid, Huruf Hijaiyah, dan Makhorijul Huruf",
    link: "/dashboard/basic-level",
    symbol: "ا",
    style: "bg-blue-200 border-blue-200 hover:bg-blue-100",
    visible: true,
  },
  {
    title: "Ba ' - Medium Level",
    desc: "Mempelajari tentang Sifatul Huruf, dua huruf yang saling bertemu, hukum Mim dan nun, dan Mad",
    link: "/dashboard/medium-level",
    symbol: "ب",
    style: "bg-green-200 border-green-200 hover:bg-green-100",
    visible: true,
  },
  {
    title: "Ta ' - Advanced Level",
    desc: "Mempelajari tentang kesempurnaan harokat, Immalah, Tashil, Isymam, Waqaf dan Ibtida",
    link: "/dashboard/advanced-level",
    symbol: "ت",
    style: "bg-yellow-200 border-yellow-200 hover:bg-yellow-100",
    visible: true,
  },
];
</script>
