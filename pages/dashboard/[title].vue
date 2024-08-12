<template>
  <div class="grid lg:grid-cols-3 gap-5">
    <div class="lg:col-span-2 ml-3 -mt-5">
      <Level :title="filter.bab" />
      <div v-for="(subbab, i) in filter.subbab" :key="i">
        <MaterialLink
          :materi="subbab.title"
          :enable="true"
          :link="'/dashboard/' + subbab.link"
        />
      </div>
      <!-- <ol
        class="lg:col-span-2 relative border-s border-gray-200 dark:border-gray-700"
      >
        <li class="ms-6">
          <span
            class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"
          >
            <BootstrapIcon class="text-2xl" name="journal-text" />
          </span>
          <Accordian
            class="slit-in"
            no="1"
            title="Definisi Al-Quran"
            :actived="true"
          >
            <div v-for="item in data" :key="item.id">
              <MaterialLink
                :enable="item.enable"
                :link="'/lesson-' + item.id + '/' + item.slug"
                :materi="item.subbab"
              />
            </div>
          </Accordian>
        </li>
        <li class="ms-6">
          <span
            class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"
          >
            <BootstrapIcon class="text-2xl" name="journal-text" />
          </span>
          <Accordian no="2" title="Mengenal Tanda Baca Huruf Hijaiyah">
            <MaterialLink materi="1 - Harokat Fathah" />
            <MaterialLink materi="2 - Harokat Kasroh" />
            <MaterialLink materi="3 - Harokat Dhommah" />
            <MaterialLink materi="4 - Sukun" />
          </Accordian>
        </li>
      </ol> -->
      <div class="flex justify-end mt-20">
        <NuxtLink to="/dashboard/medium-level">
          <button
            type="button"
            class="flex items-center py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Medium Level
            <BootstrapIcon class="ml-4 text-2xl" name="arrow-right-circle" />
          </button>
        </NuxtLink>
      </div>
    </div>
    <!-- <div class="hidden lg:block">
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
      </div> -->
  </div>
</template>

<script setup>
useHead({
  title: "Hijai - Belajar Tajwid Dengan Mudah",
});
definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});
import { initFlowbite } from "flowbite";
onMounted(() => {
  initFlowbite();
});

const route = useRoute();

const data = [
  {
    id: 0,
    bab: "Sekilas Tentang Al-Quran Al-Karim",
    slug: "sekilas-tentang-alquran-alkarim",
    subbab: [
      {
        title: "definisi al-quran",
        link: "definisi-alquran",
      },
      {
        title: "cara nabi menyampaikan al-quran kepada ummat",
        link: "definisi-alquran",
      },
      {
        title: "fase-fase kodifikasi al-quran",
        link: "definisi-alquran",
      },
      {
        title: "enyampaian al-quran melalui suara",
        link: "definisi-alquran",
      },
    ],
  },
];

const filter = data.filter((item) => item.slug === route.params.title)[0];
console.log(filter);

// get data
// const data = [
//   {
//     id: 1,
//     subbab: "1 - Pengenalan Huruf Hijayah",
//     slug: "pengenalan-huruf-hijaiyah",
//     type: "multiple question",
//     image: "/gif/muslim1.gif",
//     enable: true,
//     nextLink: "/lesson-2/huruf-hamzah-1",
//     question: "Huruf Hijaiyah adalah huruf-huruf dalam bahasa?",
//     answer: ["arab"],
//     choiceA: {
//       image: "/src/ha.png",
//       imageText: "",
//       text: "arab",
//     },
//     choiceB: {
//       image: "/src/a.png",
//       imageText: "",
//       text: "indonesia",
//     },
//     choiceC: {
//       image: "/src/ka.jpg",
//       imageText: "",
//       text: "lampung",
//     },
//     done: true,
//   },
//   {
//     id: 2,
//     subbab: "2 - Huruf alif dan hamzah",
//     slug: "huruf-hamzah-1",
//     type: "sound question",
//     image: "/gif/muslim4.gif",
//     enable: true,
//     nextLink: "/lesson-3/huruf-hamzah-2",
//     question: "/sound/hamzah.m4a",
//     answer: ["hamzah"],
//     choiceA: {
//       image: "",
//       imageText: "ب",
//       text: "ba",
//     },
//     choiceB: {
//       image: "",
//       imageText: "ء",
//       text: "hamzah",
//     },
//     choiceC: {
//       image: "",
//       imageText: "ت",
//       text: "ta",
//     },
//     done: false,
//   },
//   {
//     id: 3,
//     subbab: "3 - Huruf Hamzah",
//     slug: "huruf-hamzah-2",
//     type: "multiple question",
//     image: "/gif/muslim4.gif",
//     enable: true,
//     nextLink: "/lesson-4/mencocokan-huruf",
//     question: "ء adalah huruf?",
//     answer: ["hamzah"],
//     choiceA: {
//       image: "",
//       imageText: "",
//       text: "ba",
//     },
//     choiceB: {
//       image: "",
//       imageText: "",
//       text: "hamzah",
//     },
//     choiceC: {
//       image: "",
//       imageText: "",
//       text: "ta",
//     },
//     done: false,
//   },
//   {
//     id: 4,
//     subbab: "mencocokan huruf",
//     slug: "mencocokan-huruf",
//     type: "matching question",
//     enable: true,
//     nextLink: "/lesson-5/cari-huruf",
//     question: "hubungkan huruf hijaiyah berikut dan namanya dengan benar",
//     answer: ["hamzah", "ba", "ta"],
//     choiceA: {
//       image: "",
//       imageText: "ب",
//       text: "ba",
//     },
//     choiceB: {
//       image: "",
//       imageText: "ء",
//       text: "hamzah",
//     },
//     choiceC: {
//       image: "",
//       imageText: "ت",
//       text: "ta",
//     },
//     done: false,
//   },
//   {
//     id: 4,
//     subbab: "cari huruf",
//     slug: "cari-huruf",
//     type: "search question",
//     image: "/gif/muslim4.gif",
//     enable: true,
//     nextLink: "/dashboard/medium-level",
//     question: "Cari huruf qolqolah",
//     answer: ["ب", "ج", "د", "ط", "ق"],
//     choiceA: {
//       image: "",
//       imageText: "",
//       text: "",
//     },
//     choiceB: {
//       image: "",
//       imageText: "",
//       text: "",
//     },
//     choiceC: {
//       image: "",
//       imageText: "",
//       text: "",
//     },
//     done: false,
//   },
//   {
//     id: 5,
//     subbab: "mencocokan huruf 2",
//     slug: "mencocokan-huruf-2",
//     type: "matching question",
//     image: "/gif/muslim1.gif",
//     enable: true,
//     nextLink: "/dashboard/medium-level",
//     question: "hubungkan huruf hijaiyah berikut dan namanya dengan benar",
//     answer: ["ya", "ha", "lam"],
//     choiceA: {
//       image: "",
//       imageText: "ه",
//       text: "ha",
//     },
//     choiceB: {
//       image: "",
//       imageText: "ل",
//       text: "lam",
//     },
//     choiceC: {
//       image: "",
//       imageText: "ي",
//       text: "ya",
//     },
//     done: false,
//   },
//   {
//     id: 6,
//     subbab: "mengenal huruf hijaiyah",
//     slug: "mengenal-huruf-hijaiyah",
//     type: "video",
//     image: "/gif/muslim1.gif",
//     enable: true,
//     nextLink: "/dashboard/medium-level",
//     question: "hubungkan huruf hijaiyah berikut dan namanya dengan benar",
//     answer: ["ya", "ha", "lam"],
//     choiceA: {
//       image: "",
//       imageText: "ه",
//       text: "ha",
//     },
//     choiceB: {
//       image: "",
//       imageText: "ل",
//       text: "lam",
//     },
//     choiceC: {
//       image: "",
//       imageText: "ي",
//       text: "ya",
//     },
//     done: false,
//   },
// ];
</script>
