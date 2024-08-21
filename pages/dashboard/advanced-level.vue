<template>
  <div v-if="results" class="grid lg:grid-cols-3 gap-5">
    <div v-if="title_last_lesson" class="lg:order-last lg:block">
      <div class="sticky top-20">
        <NuxtLink
          :to="slug"
          class="block lg:max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5
            class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            Lanjut Belajar
          </h5>
          <p
            class="capitalize font-normal text-gray-700 dark:text-gray-400 italic"
          >
            {{ title_last_lesson }}
          </p>
        </NuxtLink>
      </div>
    </div>
    <div class="lg:col-span-2 -mt-5">
      <Level class="lg:ml-10" title="Ta' - Advanced Level" />
      <ol
        class="lg:col-span-2 relative border-s border-gray-200 dark:border-gray-700 ml-4"
      >
        <li :id="bab.title" v-for="(bab, i) in filter" :key="i" class="ms-6">
          <span
            class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"
          >
            <BootstrapIcon class="text-2xl" name="journal-text" />
          </span>
          <Accordian
            class="slit-in"
            :no="i"
            :title="bab.title"
            :actived="bab.actived"
          >
            <div v-for="subbab in bab.lesson" :key="subbab.id_lesson">
              <MaterialLink
                :status="status(subbab.id_lesson)"
                :link="'/lesson-' + subbab.lesson + '/' + subbab.slug"
                :materi="subbab.subbab"
              />
            </div>
          </Accordian>
        </li>
      </ol>
      <div class="flex mt-20">
        <NuxtLink to="/dashboard/medium-level">
          <button
            type="button"
            class="flex items-center py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            <BootstrapIcon
              class="hidden sm:inline mr-4 text-2xl"
              name="arrow-left-circle"
            />
            Medium Level
          </button>
        </NuxtLink>
      </div>
    </div>
  </div>
  <div v-else>
    <Loading :is-loading="true" />
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
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/index";
const { authenticated, user, BASEAPIURL } = storeToRefs(useAuthStore());

// const { results } = await $fetch("/api/lessons/advanced-level");
const results = ref();
try {
  results.value = await $fetch(BASEAPIURL.value + "/lessons/advanced-level");
} catch (error) {
  // console.log(error);
}

const filter = ref([
  {
    title: "kesempurnaan harokat",
    lesson: [],
    actived: false,
  },
  {
    title: "immalah tashil dan isymam",
    lesson: [],
    actived: false,
  },
  {
    title: "waqaf dan ibtida",
    lesson: [],
    actived: false,
  },
]);

if (results.value) {
  results.value.forEach((e, i) => {
    filter.value.forEach((item) => {
      if (e.bab === item.title) {
        if (i > 0) {
          if (e.subbab !== results.value[i - 1].subbab) {
            item.lesson.push(e);
          }
        } else {
          item.lesson.push(e);
        }
      }
    });
  });
}

const last_lesson = ref();
const title_last_lesson = ref();
const slug = ref();

const status = (id_lesson) => {
  if (id_lesson < last_lesson.value) {
    return "done";
  } else if (id_lesson === last_lesson.value) {
    return "ongoing";
  } else {
    return "upcoming";
  }
};

const last_bab = ref();

watch(
  () => user.value.id_user,
  async (newId) => {
    if (newId) {
      const { data } = await useFetch("/api/users/person/" + newId);

      const lesson = await $fetch(
        "/api/lessons/" + data.value.results[0].last_lesson
      );

      last_lesson.value = lesson.results[0].id_lesson;
      last_bab.value = lesson.results[0].bab;
      if (lesson.results[0].id_lesson !== 1) {
        title_last_lesson.value =
          lesson.results[0].subbab + " - " + lesson.results[0].bab;
        slug.value =
          "/lesson-" + lesson.results[0].lesson + "/" + lesson.results[0].slug;
      }

      filter.value.forEach((e) => {
        e.lesson.forEach((item, i) => {
          if (item.id_lesson <= last_lesson.value) {
            e.actived = true;
          }
        });
      });
    }
  },
  { immediate: true }
);

const scrollIntoSection = (section) => {
  const element = document.getElementById(section);
  if (element) {
    const offset = 100;
    const elementPosition =
      element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

onMounted(() => {
  initFlowbite();
  setTimeout(() => {
    scrollIntoSection(last_bab.value);
  }, 500);
});
</script>
