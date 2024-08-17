<template>
  <div class="lg:h-screen">
    <!-- confetti -->
    <Confetti :actived="finishedBab" />
    <!-- modal -->
    <div
      :class="finishedBab ? 'zoom' : 'hidden'"
      class="fixed top-0 left-0 overflow-y-auto overflow-x-hidden z-50 flex justify-center items-center w-full md:inset-0 h-full max-h-full"
    >
      <div
        @click=""
        class="absolute opacity-70 w-full h-full bg-gradient-to-b from-green-500 to-transparent"
      ></div>
      <div class="relative p-4 w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow-lg dark:bg-gray-700">
          <div
            class="text-center p-4 md:p-5 border-b rounded-t dark:border-gray-600"
          >
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Congratulation!
            </h3>
          </div>

          <div class="p-4 md:p-5 text-center">
            <div class="py-2">
              <BootstrapIcon class="text-8xl text-yellow-300" name="award" />
              <h2 class="mt-5 text-sm sm:text-base">
                Selamat Kamu telah menyelesaikan bab {{ results[0].bab }}
              </h2>
              <div class="border-t pt-2 mt-2">
                <p class="text-sm sm:text-base">
                  Kamu mendapatkan total {{ xp }} XP tambahan
                </p>
              </div>
            </div>
            <div class="mt-5 flex">
              <NuxtLink
                :to="results[0].nextLink"
                class="text-center flex items-center justify-center w-full text-black bg-white hover:bg-gray-100 focus:ring-4 border border-gray-200 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 mr-2"
              >
                Kembali
              </NuxtLink>
              <NuxtLink
                v-if="nextLesson.results[0]"
                :to="
                  '/lesson-' +
                  nextLesson.results[0].lesson +
                  '/' +
                  nextLesson.results[0].slug
                "
                class="text-center flex items-center justify-center w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Lanjut Belajar
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- nav -->
    <div
      class="bg-white w-full fixed grid grid-cols-3 p-4 md:px-20 border-b-2 border-gray-300 z-50"
    >
      <NuxtLink to="/dashboard" class="w-full">
        <BootstrapIcon
          class="text-2xl text-gray-700 hover:text-gray-600"
          name="house-door-fill"
        />
      </NuxtLink>
      <h1
        class="capitalize text-sm sm:text-xl text-center flex items-center justify-center"
      >
        {{ results[0].subbab }}
      </h1>
      <div class="w-full flex justify-end">
        <div v-if="dataUser" class="text-sm flex items-center">
          <span class="hidden sm:inline">Lesson : {{ results[0].lesson }}</span>
          <span
            class="ml-5 bg-green-500 text-white shadow rounded-full text-sm mx-1 w-5 h-5 flex justify-center items-center"
            >xp</span
          >
          :
          {{ XP }}
          <BootstrapIcon
            v-if="XP < dataUser.xp"
            name="arrow-up-short"
            class="text-green-500 text-xl"
          />
        </div>
      </div>
    </div>

    <!-- text and image -->
    <div
      v-if="results[0].type === 'text image'"
      class="relative flex flex-col justify-center items-center pt-20 pb-40 px-2"
    >
      <div class="flex w-full sm:w-2/3 mb-2 items-center text-blue-500">
        <BootstrapIcon name="clouds" class="text-2xl mr-2" />
        <span class="text-sm">Pelajari</span>
      </div>
      <div
        class="w-full sm:w-2/3 flex justify-center items-center flex-col rounded-lg border-2 border-green-500 shadow-lg p-5"
      >
        <img
          v-if="results[0].image"
          class="w-32 my-2"
          :src="results[0].image"
          alt=""
        />
        <div
          v-html="results[0].content"
          class="text-sm sm:text-lg leading-relaxed text-justify"
        ></div>
      </div>

      <div
        class="bg-white fixed w-full bottom-0 py-5 md:px-20 flex items-center justify-end px-4 border-y-2 border-gray-300"
      >
        <button
          @click="next"
          type="button"
          class="flex items-center py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Lanjutkan
          <BootstrapIcon class="ml-4 text-2xl" name="arrow-right-circle" />
        </button>
      </div>
    </div>

    <!-- video -->
    <div
      v-else-if="results[0].type === 'video'"
      class="p-5 lg:p-20 h-screen flex pt-56 items-start lg:items-center justify-center"
    >
      <video class="w-full lg:w-2/3 rounded-lg" controls>
        <source src="" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div
        class="fixed w-full bottom-0 py-5 md:px-20 flex items-center justify-end px-4 border-y-2 border-gray-300"
      >
        <button
          @click="next"
          type="button"
          class="flex items-center py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Lanjutkan
          <BootstrapIcon class="ml-4 text-2xl" name="arrow-right-circle" />
        </button>
      </div>
    </div>

    <!-- content question -->
    <div v-else>
      <div class="lg:h-full overflow-auto grid md:grid-rows-2 px-5">
        <!-- question -->
        <div
          class="flex justify-center items-center flex-col pt-20 lg:pt-5 pb-5"
        >
          <!-- tag -->
          <!-- pengatahuan tag-->
          <div
            v-if="results[0].type === 'multiple choice question'"
            class="flex text-blue-500 w-full w-4/5 lg:w-2/5 py-5 items-center"
          >
            <BootstrapIcon name="clouds" class="text-2xl mr-2" />
            <span class="text-sm">Pilih</span>
          </div>
          <!-- denger bacaan tag -->
          <div
            v-else-if="results[0].type === 'sound question'"
            class="flex text-blue-500 w-full w-4/5 lg:w-2/5 py-5 items-center"
          >
            <BootstrapIcon name="clouds" class="text-2xl mr-2" />
            <span class="text-sm">Dengar Bacaan</span>
          </div>
          <!-- search question tag -->
          <div
            v-else-if="results[0].type === 'search question'"
            class="flex text-blue-500 w-full w-4/5 lg:w-2/5 py-5 items-center"
          >
            <BootstrapIcon name="clouds" class="text-2xl mr-2" />
            <span class="text-sm">Cari</span>
          </div>
          <!-- pairing tag -->
          <div
            v-else
            class="flex text-blue-500 w-full w-4/5 lg:w-2/5 lg:pt-16 pb-2 items-center"
          >
            <BootstrapIcon name="puzzle" class="text-2xl mr-2" />
            <span class="text-sm">Pasangkan</span>
          </div>

          <!-- multiple choice question -->
          <div
            v-if="results[0].type === 'multiple choice question'"
            class="flex items-center w-4/5 lg:w-2/5"
          >
            <img :src="results[0].image" class="w-24 mr-4" alt="" />
            <div class="p-5 border rounded-lg">
              <p v-html="results[0].question" class="text-sm sm:text-base"></p>
            </div>
          </div>

          <!-- Search question -->
          <div
            v-else-if="results[0].type === 'search question'"
            class="flex flex-col justify-center w-4/5 lg:w-2/5"
          >
            <div class="flex items-center">
              <img :src="results[0].image" class="w-24 mr-4" alt="" />
              <div class="p-5 border rounded-lg">
                <p class="text-sm sm:text-base">{{ results[0].question }}</p>
              </div>
            </div>
            <div class="flex justify-center py-2 my-2 border-y-2 h-16">
              <button
                v-for="(letter, i) in letterChoice"
                :key="i"
                type="button"
                @click="getLetter(letter)"
                class="ml-1 bg-white border-gray-200 flex items-center justify-center rounded-lg border p-2 text-sm font-medium text-gray-900 focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:ring-gray-200"
              >
                <p class="text-2xl">
                  {{ letter }}
                </p>
              </button>
            </div>
          </div>

          <!-- pairing question -->
          <div
            v-else-if="results[0].type === 'pairing question'"
            class="flex flex-col justify-center w-4/5 lg:w-2/5"
          >
            <div class="p-5 border rounded-lg mb-2">
              <p class="text-sm sm:text-base">{{ results[0].question }}</p>
            </div>
            <div v-if="isMobile" class="select-none grid grid-cols-2 gap-2">
              <div>
                <div
                  v-for="(item, i) in questionArr"
                  :key="i"
                  class="text-center flex items-center justify-center cursor-pointer shadow border border-gray-200 w-full h-10 my-2"
                >
                  {{ item }}
                </div>
              </div>
              <div>
                <div
                  v-for="(item, i) in dropItem"
                  :key="i"
                  :class="pairingStyle(item)"
                  class="select-none cursor-pointer text-center flex items-center justify-center border-2 w-full h-10 my-2"
                  @click="chooseBlock(i)"
                >
                  <span>{{ item }}</span>
                  <span v-if="answerSubmit">
                    <BootstrapIcon
                      v-if="matchedItem[i]"
                      name="check"
                      class="text-3xl text-green-500"
                    />
                    <BootstrapIcon
                      v-else
                      name="x"
                      class="text-3xl text-red-500"
                    />
                  </span>
                </div>
              </div>
            </div>
            <div v-else class="select-none grid grid-cols-2 gap-2">
              <div>
                <div
                  v-for="(item, i) in questionArr"
                  :key="i"
                  class="text-center flex items-center justify-center cursor-pointer shadow border border-gray-200 w-full h-10 my-2"
                >
                  {{ item }}
                </div>
              </div>
              <div>
                <div
                  v-for="(item, i) in dropItem"
                  :key="i"
                  :class="{
                    'border-solid border-black-600 text-black':
                      item !== 'drop here',
                    'border-dashed border-gray-400 text-gray-400':
                      item === 'drop here',
                  }"
                  class="select-none cursor-pointer text-center flex items-center justify-center border-2 w-full h-10 my-2"
                  @dragover.prevent
                  @drop="onDrop(i, draggedItem)"
                  :draggable="item !== 'drop here' && answerSubmit === false"
                  @dragstart="dragStart(item)"
                  @dragleave="dragLeave(i)"
                >
                  <span>{{ item }}</span>
                  <span v-if="answerSubmit">
                    <BootstrapIcon
                      v-if="matchedItem[i]"
                      name="check"
                      class="text-3xl text-green-500"
                    />
                    <BootstrapIcon
                      v-else
                      name="x"
                      class="text-3xl text-red-500"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- sound question -->
          <div v-else class="flex flex-col justify-center w-4/5 lg:w-2/5">
            <div class="flex items-center">
              <img :src="results[0].image" class="w-24 mr-4" alt="" />
              <div class="p-5 border rounded-lg">
                <p class="text-sm sm:text-xl">Bunyi Huruf apa berikut ini?</p>
              </div>
            </div>
            <div class="flex justify-center">
              <button
                :class="{
                  'pointer-events-none': answerSubmit,
                }"
                @click="playSound(results[0].question)"
                type="button"
                class="border rounded-full w-20 h-20 flex items-center justify-center text-sm font-medium text-gray-900 focus:outline-none bg-white border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:ring-gray-200"
              >
                <BootstrapIcon name="volume-up-fill" class="text-3xl" />
              </button>
            </div>
          </div>
        </div>

        <!-- answer section -->

        <!-- multiple choice -->
        <div
          v-if="
            results[0].type === 'multiple choice question' ||
            results[0].type === 'sound question'
          "
          class="flex justify-center py-10 border-t-2"
        >
          <div class="grid grid-cols-3 gap-4 pb-20 p-2 overflow-hidden">
            <button
              v-for="answer in answerChoices"
              type="button"
              :class="{
                'pointer-events-none': answerSubmit,
                'ring-gray-200 ring-4': userAnswer === answer,
              }"
              class="h-32 sm:h-44 flex flex-col items-center justify-center p-5 mb-2 font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:ring-gray-200"
              @click="getAnswer(answer)"
            >
              <div
                class="w-44 text-sm sm:text-base capitalize"
                :class="arabic ? 'text-3xl' : 'text-base'"
              >
                {{ answer }}
              </div>
            </button>
          </div>
        </div>

        <!-- pairing answer -->
        <div
          v-else-if="results[0].type === 'pairing question'"
          class="flex justify-center items-center max-h-56 border-t-2"
        >
          <div
            v-if="isMobile"
            :class="
              'grid-cols-' +
              Math.trunc(answerGroup.length / 2) +
              ' ' +
              'md:grid-cols-' +
              answerGroup.length +
              ' '
            "
            class="pt-2 grid gap-1"
          >
            <div
              v-for="(item, i) in answerGroup"
              :key="i"
              :class="
                dropItem.filter((e) => e === item).length <= 0
                  ? 'cursor-pointer text-black'
                  : 'cursor-not-allowed text-gray-100'
              "
              class="text-sm sm:text-base select-none cursor-grab bg-white flex items-center justify-center border rounded-lg p-2"
              @click="chooseItem(item)"
            >
              {{ item }}
            </div>
          </div>
          <div
            v-else
            :class="
              'grid-cols-' +
              Math.trunc(answerGroup.length / 2) +
              ' ' +
              'md:grid-cols-' +
              answerGroup.length +
              ' '
            "
            class="pt-2 grid gap-1"
          >
            <div
              v-for="(item, i) in answerGroup"
              :key="i"
              :class="
                dropItem.filter((e) => e === item).length <= 0
                  ? 'cursor-grab text-black'
                  : 'cursor-not-allowed text-gray-100'
              "
              class="text-sm sm:text-base select-none cursor-grab bg-white flex items-center justify-center border rounded-lg p-2"
              :draggable="dropItem.filter((e) => e === item).length <= 0"
              @dragstart="dragStart(item)"
            >
              {{ item }}
            </div>
          </div>
        </div>

        <!-- search letter -->
        <div v-else class="flex justify-center py-5 border-t-2">
          <div class="pb-20">
            <div class="italic text-gray-300 text-center w-full capitalize">
              click on below
            </div>
            <div
              class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-1 pb-20 lg:h-72"
            >
              <button
                v-for="(letter, i) in hijaiyahLetter"
                :key="i"
                type="button"
                :class="{
                  'ring-gray-100': checkLetter(letter),
                }"
                class="bg-white border-gray-200 flex items-center justify-center rounded-lg border py-2 px-16 text-sm font-medium text-gray-900 focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:ring-gray-200"
                @click="getLetter(letter)"
              >
                <p
                  class="text-2xl"
                  :class="{ 'text-gray-100': checkLetter(letter) }"
                >
                  {{ letter }}
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- alert -->

      <div
        v-if="answerSubmit"
        :class="{
          'bg-red-100': !result,
          'bg-green-100': result,
          'bg-yellow-100': result === 'partly true',
        }"
        class="fixed w-full bottom-0 py-5 md:px-20 flex items-center justify-between px-4 border-y-2 border-gray-300"
      >
        <div
          v-if="result === true"
          class="text-sm flex items-center text-green-500"
        >
          <span>Jawaban Anda Benar</span>
          <BootstrapIcon class="ml-4 text-2xl" name="check2-circle" />
        </div>
        <div
          v-else-if="result === 'partly true'"
          class="text-sm flex items-center text-yellow-500"
        >
          <div>
            <span>Jawaban Anda Sebagian Benar</span
            ><BootstrapIcon class="ml-4 text-2xl" name="check2-circle" /><br />
            <span>Jawaban yang benar : {{ results[0].content }}</span>
          </div>
        </div>
        <div v-else class="text-sm flex items-center text-red-500 mr-2">
          <div>
            <span>Jawaban Anda Salah </span>
            <BootstrapIcon class="mx-4 text-2xl" name="x-circle" /><br />
            <span v-if="!results[0].content"
              >Jawaban yang benar : {{ answer }}</span
            >
            <span v-else>Jawaban yang benar : {{ results[0].content }}</span>
          </div>
        </div>
        <button
          @click="next"
          type="button"
          class="flex items-center py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Lanjutkan
          <BootstrapIcon class="ml-4 text-2xl" name="arrow-right-circle" />
        </button>
      </div>
      <div
        v-else
        class="fixed w-full bottom-0 py-5 md:px-20 bg-white flex items-center justify-end px-4 border-y-2 border-gray-300"
      >
        <!-- <div class="flex">
          <button
            @click=""
            type="button"
            class="ml-2 flex items-center py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Skip
          </button>
        </div> -->
        <button
          type="button"
          :class="{
            'pointer-events-none': userAnswer === false,
            'text-gray-800': userAnswer !== false,
          }"
          class="flex items-center py-2.5 px-5 mb-2 text-sm font-medium text-gray-100 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          @click="submit"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { initFlowbite } from "flowbite";

useHead({
  title: "EduTajwid - belajar tajwid dengan seru dan mudah",
});
definePageMeta({
  layout: "lesson",
  middleware: "auth",
});

import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/index";
const { authenticated, user, XP } = storeToRefs(useAuthStore());
const { loadTokenFromLocalStorage } = useAuthStore();

const route = useRoute();
const router = useRouter();
// window size
const windowWidth = ref(0);
const isMobile = ref();
const handleResize = () => {
  if (process.client) {
    windowWidth.value = window.innerWidth;
  }
};

const { results } = await $fetch("/api/lessons/" + route.params.subbab);

const id_user = ref();
const dataUser = ref();
const last_lesson = ref();
const totalGetXP = ref(0);

watch(
  () => user.value.id_user,
  async (newValue) => {
    if (newValue) {
      id_user.value = newValue;
      const { results } = await $fetch("/api/users/person/" + newValue);

      dataUser.value = results[0];

      setInterval(() => {
        if (XP.value < dataUser.value.xp) {
          if (dataUser.value.xp - XP.value > 100) {
            XP.value = XP.value + 100;
          } else if (dataUser.value.xp - XP.value > 50) {
            XP.value = XP.value + 10;
          } else {
            XP.value++;
          }
        }
      }, 0.1);

      const lesson = await $fetch("/api/lessons/" + results[0].last_lesson);

      last_lesson.value = lesson.results[0].id_lesson;

      // check this lesson enable
      const thisLesson = await $fetch("/api/lessons/" + route.params.subbab);

      if (lesson.results[0].id_lesson < thisLesson.results[0].id_lesson) {
        router.push("/dashboard");
      }

      totalGetXP.value = dataUser.value.xp - user.value.xp;
    }
  },
  { immediate: true }
);

const finishedBab = ref(false);
const nextLesson = await $fetch(
  "/api/lessons/get-data/" + (results[0].id_lesson + 1)
);

// generate xp
const startTime = ref(0);
const resultGenXP = ref(0);

onMounted(() => {
  startTime.value = Date.now();
});

const generateXP = () => {
  const currentTime = Date.now();
  const timeElapsed = (currentTime - startTime.value) / 1000;

  const baseXP = 100;
  const multiplier = Math.max(0.5, (10 - timeElapsed) / 5);

  resultGenXP.value = Math.floor(baseXP * multiplier);
};

const next = async () => {
  if ((results[0].type = "text image")) {
    if (id_user.value) {
      if (results[0].id_lesson !== 95) {
        if (results[0].id_lesson === last_lesson.value) {
          generateXP();
          await $fetch("/api/users/update-lesson/" + id_user.value, {
            method: "PUT",
            body: {
              last_lesson: nextLesson.results[0].slug,
              xp: dataUser.value.xp + resultGenXP.value,
            },
          });
        }

        if (results[0].id_lesson < last_lesson.value) {
          router.push(results[0].nextLink);
        }

        if (results[0].id_lesson > last_lesson.value) {
          if (
            results[0].nextLink === "/dashboard/basic-level" ||
            results[0].nextLink === "/dashboard/medium-level" ||
            results[0].nextLink === "/dashboard/advanced-level"
          ) {
            startAnimation();
            finishedBab.value = true;
          } else {
            router.push(results[0].nextLink);
          }
        }
      }
    }
  }
};

let answer = ref();
let userAnswer = ref(false);
let result = ref();
let answerSubmit = ref(false);
const answerChoices = ref();
const manyAnswer = ref();
const questionArr = ref();
// get answer

manyAnswer.value = JSON.parse(results[0].answer);
answer.value = manyAnswer.value[0];
answerChoices.value = JSON.parse(results[0].answerChoices);
questionArr.value = JSON.parse(results[0].questionArr);

// multiple choice and sound question
const getAnswer = (res) => {
  userAnswer.value = res;
};
const submit = async () => {
  answerSubmit.value = true;
  if (userAnswer.value === answer.value || resultPair.value == true) {
    new Audio("/sound/correct.mp3").play();
    result.value = true;
  } else if (resultPair.value == "partly true") {
    new Audio("/sound/correct.mp3").play();
    result.value = "partly true";
  } else {
    new Audio("/sound/wrong.mp3").play();
    result.value = false;
  }

  if (id_user.value) {
    if (results[0].id_lesson !== 95) {
      if (results[0].id_lesson === last_lesson.value) {
        generateXP();
        await $fetch("/api/users/update-lesson/" + id_user.value, {
          method: "PUT",
          body: {
            last_lesson: nextLesson.results[0].slug,
            xp: dataUser.value.xp + resultGenXP.value,
          },
        });

        XP.value = dataUser.value.xp;
      }
    } else {
      startAnimation();
      finishedBab.value = true;
    }
  }
};
const playSound = (sound) => {
  new Audio("/" + sound).play();
};

// letter question
const hijaiyahLetter = [
  "ا",
  "ب",
  "ت",
  "ث",
  "ج",
  "ح",
  "خ",
  "د",
  "ذ",
  "ر",
  "ز",
  "س",
  "ش",
  "ص",
  "ض",
  "ط",
  "ظ",
  "ع",
  "غ",
  "ف",
  "ق",
  "ك",
  "ل",
  "م",
  "ن",
  "و",
  "ه",
  "ء",
  "ي",
];

// check multiple choices is arabic
const arabic = ref(false);
hijaiyahLetter.forEach((e) => {
  if (e == answerChoices.value) {
    arabic.value = true;
  }
});

let letterChoice = ref([]);

const getLetter = (letter) => {
  if (letterChoice.value.length > 0) {
    let index;

    letterChoice.value.map((e, i) => {
      if (e === letter) {
        index = i;
      }
    });

    if (index === undefined) {
      letterChoice.value.push(letter);
    } else {
      letterChoice.value.splice(index, 1);
    }
  } else {
    letterChoice.value.push(letter);
  }

  if (JSON.parse(results[0].answer).length === letterChoice.value.length) {
    userAnswer.value = true;
  }
};

const checkLetter = (letter) => {
  let stat;
  stat = false;
  letterChoice.value.forEach((e) => {
    if (e === letter) {
      stat = true;
    }
  });
  return stat;
};

// pairing question
const draggedItem = ref("");
const dropItem = ref([]);
const matchedItem = ref([]);
const answerGroup = ref([...manyAnswer.value]);
const resultPair = ref("");

// for pairing mobile
const chooseBlock = (i) => {
  dropItem.value.forEach((e, index) => {
    if (i == index) {
      dropItem.value[index] = "choose answer";
    } else {
      if (dropItem.value[index] === "choose answer") {
        dropItem.value[index] = "click here";
      }
    }
  });
};

const chooseItem = (item) => {
  dropItem.value.forEach((e, index) => {
    if (e === "choose answer") {
      dropItem.value[index] = item;
      if (manyAnswer.value[index] == item) {
        matchedItem.value[index] = true;
      } else {
        matchedItem.value[index] = false;
      }
    }
  });

  if (dropItem.value.filter((e) => e === "click here").length === 0) {
    userAnswer.value = true;
  } else {
    userAnswer.value = false;
  }

  if (matchedItem.value.filter((e) => e === false).length === 0) {
    resultPair.value = true;
  } else if (
    matchedItem.value.filter((e) => e === false).length > 0 &&
    matchedItem.value.filter((e) => e === true).length > 0
  ) {
    resultPair.value = "partly true";
  } else {
    resultPair.value = false;
  }
};

const pairingStyle = (item) => {
  if (item === "click here") {
    return "border-dashed bg-white text-gray-400";
  } else if (item === "choose answer") {
    return "border-dashed bg-gray-200 text-gray-500";
  } else {
    return "border-solid bg-white text-black shadow";
  }
};

// for pairing desktop
if (questionArr.value) {
  questionArr.value.forEach((e) => {
    if (isMobile.value) {
      dropItem.value.push("click here");
    } else {
      dropItem.value.push("drop here");
    }
    matchedItem.value.push(false);
  });
}

watch(windowWidth, (newWidth) => {
  if (newWidth <= 768) {
    isMobile.value = true;
  } else {
    isMobile.value = false;
  }
  if (questionArr.value) {
    questionArr.value.forEach((e, i) => {
      if (isMobile.value) {
        dropItem.value[i] = "click here";
      } else {
        dropItem.value[i] = "drop here";
      }
    });
  }
});

const dragStart = (item) => {
  draggedItem.value = item;
};

const onDrop = (index, draggedItem) => {
  if (draggedItem === manyAnswer.value[index]) {
    matchedItem.value[index] = true;
  } else {
    matchedItem.value[index] = false;
  }
  dropItem.value[index] = draggedItem;

  if (dropItem.value.filter((e) => e === "drop here").length === 0) {
    userAnswer.value = true;
  } else {
    userAnswer.value = false;
  }

  if (matchedItem.value.filter((e) => e === false).length === 0) {
    resultPair.value = true;
  } else if (
    matchedItem.value.filter((e) => e === false).length > 0 &&
    matchedItem.value.filter((e) => e === true).length > 0
  ) {
    resultPair.value = "partly true";
  } else {
    resultPair.value = false;
  }
};

const dragLeave = (index) => {
  dropItem.value[index] = "drop here";
};

onMounted(async () => {
  initFlowbite();
  loadTokenFromLocalStorage();

  // pairing question random answer
  answerGroup.value.sort(() => Math.random() - 0.5);

  // window size
  if (process.client) {
    windowWidth.value = window.innerWidth;
    window.addEventListener("resize", handleResize);
  }
});
onUnmounted(() => {
  if (process.client) {
    window.removeEventListener("resize", handleResize);
  }
});

const xp = ref(0);
let interval;

const startAnimation = () => {
  interval = setInterval(() => {
    if (xp.value < totalGetXP.value) {
      xp.value++;
    }
  }, 10);
};

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<style setup>
.zoom {
  animation: bounce 2s;
}

@keyframes bounce {
  0% {
    transform: scale(1);
  }
  10% {
    transform: scale(1.5);
  }
  20% {
    transform: scale(1);
  }
  30% {
    transform: scale(1.1);
  }
  40%,
  100% {
    transform: scale(1);
  }
}
</style>
