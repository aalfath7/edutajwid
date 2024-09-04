<template>
  <div v-if="results" class="grid lg:grid-cols-3 gap-5">
    <div v-if="title_last_lesson" class="lg:order-last lg:block">
      <div
        v-if="
          slug !== '/lesson-48/perbedaan-waqaf-saktah-dan-qathi-review' &&
          last_lesson !== 75
        "
        class="sticky top-20"
      >
        <NuxtLink
          :to="slug"
          class="block lg:max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5
            class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            Lanjut Belajar
          </h5>
          <p class="capitalize font-normal text-gray-700 dark:text-gray-400">
            {{ title_last_lesson }}
          </p>
        </NuxtLink>
      </div>
    </div>
    <div class="lg:col-span-2 -mt-5">
      <Level class="lg:ml-10" title="Ba' - Medium Level" />
      <ol
        class="lg:col-span-2 relative border-s border-gray-200 dark:border-gray-700 ml-4"
      >
        <li :id="bab.title" v-for="(bab, i) in filter" :key="i" class="ms-6">
          <span
            class="absolute flex items-center justify-center w-6 h-6 bg-lime-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-lime-900"
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
      <div id="exam" class="pl-10">
        <button
          @click="exam"
          type="button"
          :class="
            last_lesson < 75 || !authenticated
              ? 'cursor-not-allowed pointer-events-none'
              : ''
          "
          class="mb-5 rounded-lg shadow-sm flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3 capitalize"
        >
          <span class="text-start text-sm sm:text-base"
            >Medium Level Exam
            <span v-if="last_lesson > 29 && grade !== 0">
              - Grade : {{ grade }}</span
            ></span
          >
          <div class="flex items-center">
            <BootstrapIcon
              v-if="grade >= 60 && last_lesson > 75"
              class="text-2xl text-green-700"
              name="shield-check"
            />
            <BootstrapIcon
              v-if="last_lesson < 75 || !authenticated"
              class="text-2xl"
              name="lock-fill"
            />
          </div>
        </button>
      </div>
      <div class="flex justify-between">
        <NuxtLink to="/dashboard/basic-level" class="ml-2">
          <button
            type="button"
            class="flex items-center py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            <BootstrapIcon
              class="hidden sm:inline mr-4 text-2xl"
              name="arrow-left-circle"
            />
            Basic Level
          </button>
        </NuxtLink>
        <NuxtLink to="/dashboard/advanced-level">
          <button
            v-if="last_lesson > 75"
            type="button"
            class="flex items-center py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Advanced Level
            <BootstrapIcon
              class="hidden sm:inline ml-4 text-2xl"
              name="arrow-right-circle"
            />
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
  title: "Edutajwid - Belajar Tajwid Dengan Mudah",
});
definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});
import { initFlowbite } from "flowbite";
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/index";
const {
  authenticated,
  user,
  BASEAPIURL,
  grade: gradeExamBefore,
} = storeToRefs(useAuthStore());
const { setExamQuestions, setGrade } = useAuthStore();
const router = useRouter();

// const { results } = await $fetch("/api/lessons/medium-level");
const results = ref();
try {
  results.value = await $fetch(BASEAPIURL.value + "/api/lessons/medium-level");
} catch (error) {
  // console.log(error);
}

const filter = ref([
  {
    title: "sifatul huruf",
    lesson: [],
    actived: false,
  },
  {
    title: "dua huruf yang saling bertemu",
    lesson: [],
    actived: false,
  },
  {
    title: "hukum mim dan nun",
    lesson: [],
    actived: false,
  },
  {
    title: "hukum mad",
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
const dataUser = ref();
const grade = ref();

watch(
  () => user.value.id_user,
  async (newId) => {
    if (newId) {
      const { data } = await useFetch(BASEAPIURL.value + "/api/users/" + newId);

      dataUser.value = data.value[0];

      const lesson = await $fetch(
        BASEAPIURL.value + "/api/lessons/" + data.value[0].last_lesson
      );

      last_lesson.value = lesson[0].id_lesson;
      last_bab.value = lesson[0].bab;
      if (lesson[0].id_lesson !== 1) {
        title_last_lesson.value = lesson[0].subbab + " - " + lesson[0].bab;
        slug.value = "/lesson-" + lesson[0].lesson + "/" + lesson[0].slug;
      }

      filter.value.forEach((e) => {
        e.lesson.forEach((item, i) => {
          if (item.id_lesson <= last_lesson.value) {
            e.actived = true;
          }
        });
      });

      grade.value = JSON.parse(dataUser.value.exam)[1];
      // if (gradeExamBefore.value[1] > grade.value) {
      //   await useFetch(
      //     BASEAPIURL.value + "/api/users/update-exam/" + dataUser.value.id_user,
      //     {
      //       method: "PUT",
      //       body: {
      //         exam:
      //           "[" +
      //           JSON.parse(dataUser.value.exam)[0] +
      //           "," +
      //           gradeExamBefore.value[1] +
      //           "," +
      //           JSON.parse(dataUser.value.exam)[2] +
      //           "]",
      //       },
      //     }
      //   );
      //   grade.value = gradeExamBefore.value[1];
      // }
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

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const randomLesson = shuffle([
  ...results.value.filter((e) => e.type !== "text image"),
]);

const examQuestions = randomLesson.slice(0, 5);

const exam = async () => {
  setExamQuestions(examQuestions);
  router.push("/dashboard/exam/medium-level-question-1");
};

onMounted(() => {
  initFlowbite();
  setTimeout(() => {
    if (last_lesson.value !== 29) {
      scrollIntoSection(last_bab.value);
    } else {
      scrollIntoSection("exam");
    }
  }, 500);
});
</script>
