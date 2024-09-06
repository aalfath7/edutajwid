<template>
  <div class="lg:h-screen">
    <div v-if="lesson">
      <!-- confetti -->
      <Confetti :actived="finishedExam && finalGrade >= 60" />

      <!-- modal -->
      <div
        :class="finishedExam ? 'zoom' : 'hidden'"
        class="fixed top-0 left-0 overflow-y-auto overflow-x-hidden z-50 flex justify-center items-center w-full md:inset-0 h-full max-h-full"
      >
        <div
          :class="
            finishedExam && finalGrade >= 60 ? 'from-green-500' : 'from-red-500'
          "
          class="absolute opacity-70 w-full h-full bg-gradient-to-b to-transparent"
        ></div>
        <div class="relative p-4 w-full max-w-md max-h-full">
          <div class="relative bg-white rounded-lg shadow-lg dark:bg-gray-700">
            <div
              class="text-center p-4 md:p-5 border-b rounded-t dark:border-gray-600"
            >
              <h3
                v-if="finalGrade >= 60"
                class="text-xl font-semibold text-gray-900 dark:text-white"
              >
                Congratulation!
              </h3>
              <h3
                v-else
                class="text-xl font-semibold text-gray-900 dark:text-white"
              >
                Oops
              </h3>
            </div>

            <div class="p-4 md:p-5 text-center">
              <div class="py-2">
                <BootstrapIcon class="text-8xl text-yellow-300" name="award" />
                <h2 class="mt-5 text-sm sm:text-base">
                  {{ message }}
                </h2>
                <div class="border-t pt-2 mt-2">
                  <p class="text-sm sm:text-base">
                    Nilaimu : {{ finalGrade }} <br /><br />
                    <!-- <span class="italic text-sm"
                      >Sistem akan menyimpan nilaimu yang terbesar</span
                    > -->
                  </p>
                </div>
              </div>
              <div class="mt-5 flex">
                <NuxtLink
                  :to="'/dashboard/' + route.params.level"
                  class="text-center flex items-center justify-center w-full text-black bg-white hover:bg-gray-100 focus:ring-4 border border-gray-200 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 mr-2"
                >
                  Kembali
                </NuxtLink>
                <NuxtLink
                  v-if="nextLesson !== ''"
                  :to="nextLesson"
                  class="ml-2 text-center flex items-center justify-center w-full text-black bg-white hover:bg-gray-100 focus:ring-4 border border-gray-200 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 mr-2 cursor-pointer"
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
        <div class="flex items-center justify-center">
          <h1
            class="capitalize text-sm sm:text-xl text-start sm:text-center whitespace-nowrap text-ellipsis overflow-hidden"
          >
            {{ lesson.subbab }}
          </h1>
        </div>
        <div class="w-full flex justify-end">
          <div v-if="dataUser" class="text-sm flex items-center">
            <span class="hidden sm:inline">Lesson : {{ lesson.lesson }}</span>
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

      <!-- content question -->
      <div>
        <div class="lg:h-full overflow-auto grid md:grid-rows-2 px-5">
          <div
            class="flex justify-center items-center flex-col pt-20 lg:pt-5 pb-5"
          >
            <div
              v-if="lesson.type === 'multiple choice question'"
              class="flex text-blue-500 w-full w-4/5 lg:w-2/5 py-5 items-center"
            >
              <BootstrapIcon name="clouds" class="text-2xl mr-2" />
              <span class="text-sm">Pilih</span>
            </div>
            <div
              v-else-if="lesson.type === 'sound question'"
              class="flex text-blue-500 w-full w-4/5 lg:w-2/5 py-5 items-center"
            >
              <BootstrapIcon name="clouds" class="text-2xl mr-2" />
              <span class="text-sm">Dengar Bacaan</span>
            </div>
            <div
              v-else-if="lesson.type === 'search question'"
              class="flex text-blue-500 w-full w-4/5 lg:w-2/5 py-5 items-center"
            >
              <BootstrapIcon name="clouds" class="text-2xl mr-2" />
              <span class="text-sm">Cari</span>
            </div>
            <div
              v-else
              class="flex text-blue-500 w-full w-4/5 lg:w-2/5 lg:pt-16 pb-2 items-center"
            >
              <BootstrapIcon name="puzzle" class="text-2xl mr-2" />
              <span class="text-sm">Pasangkan</span>
            </div>

            <div
              v-if="lesson.type === 'multiple choice question'"
              class="flex items-center w-4/5 lg:w-2/5"
            >
              <img :src="lesson.image" class="w-24 mr-4" alt="" />
              <div class="p-5 border rounded-lg">
                <p v-html="lesson.question" class="text-sm sm:text-base"></p>
              </div>
            </div>

            <div
              v-else-if="lesson.type === 'search question'"
              class="flex flex-col justify-center w-4/5 lg:w-2/5"
            >
              <div class="flex items-center">
                <img :src="lesson.image" class="w-24 mr-4" alt="" />
                <div class="p-5 border rounded-lg">
                  <p class="text-sm sm:text-base">{{ lesson.question }}</p>
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

            <div
              v-else-if="lesson.type === 'pairing question'"
              class="flex flex-col justify-center w-4/5 lg:w-2/5"
            >
              <div class="p-5 border rounded-lg mb-2">
                <p class="text-sm sm:text-base">{{ lesson.question }}</p>
              </div>
              <div v-if="isMobile" class="select-none grid grid-cols-2 gap-2">
                <div>
                  <div
                    v-for="(item, i) in questionArr"
                    :key="i"
                    class="inline-block text-center flex items-center justify-center cursor-pointer shadow border border-gray-200 w-full h-10 my-2 text-sm"
                  >
                    {{ item }}
                  </div>
                </div>
                <div>
                  <div
                    v-for="(item, i) in dropItem"
                    :key="i"
                    :class="pairingStyle(item)"
                    class="relative inline-block select-none cursor-pointer text-center flex items-center justify-center border-2 w-full h-10 my-2"
                    @click="chooseBlock(i)"
                  >
                    <span class="text-sm inline-block">{{ item }}</span>
                    <span v-if="answerSubmit" class="absolute right-0 bg-white">
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

            <div
              v-else-if="lesson.type === 'search question'"
              class="flex flex-col justify-center w-4/5 lg:w-2/5"
            >
              <div class="flex items-center">
                <img :src="lesson.image" class="w-24 mr-4" alt="" />
                <div class="p-5 border rounded-lg">
                  <p class="text-sm sm:text-xl">Bunyi Huruf apa berikut ini?</p>
                </div>
              </div>
              <div class="flex justify-center">
                <button
                  :class="{
                    'pointer-events-none': answerSubmit,
                  }"
                  @click="playSound(lesson.question)"
                  type="button"
                  class="border rounded-full w-20 h-20 flex items-center justify-center text-sm font-medium text-gray-900 focus:outline-none bg-white border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:ring-gray-200"
                >
                  <BootstrapIcon name="volume-up-fill" class="text-3xl" />
                </button>
              </div>
            </div>

            <div v-else>
              <Loading :is-loading="true" />
            </div>
          </div>

          <div
            v-if="
              lesson.type === 'multiple choice question' ||
              lesson.type === 'sound question'
            "
            class="flex w-full justify-center border-t-2"
          >
            <div class="flex justify-center py-10 w-full sm:max-w-xl">
              <div class="w-full grid grid-cols-3 gap-4 p-2 overflow-hidden">
                <button
                  v-for="answer in answerChoices"
                  type="button"
                  :class="{
                    'pointer-events-none': answerSubmit,
                    'ring-gray-200 ring-4': userAnswer === answer,
                  }"
                  class="p-2 h-24 sm:w-44 sm:h-44 mb-2 font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:ring-gray-200"
                  @click="getAnswer(answer)"
                >
                  <p
                    class="capitalize"
                    :class="arabic ? 'text-3xl' : 'text-sm sm:text-base'"
                  >
                    {{ answer }}
                  </p>
                </button>
              </div>
            </div>
          </div>

          <div
            v-else-if="lesson.type === 'pairing question'"
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
              class="pt-2 grid gap-1 mb-24"
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
                  class="bg-white border-gray-200 flex items-center justify-center rounded-lg border py-2 px-8 sm:px-16 text-sm font-medium text-gray-900 focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:ring-gray-200"
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

        <div
          v-if="answerSubmit"
          :class="{
            'bg-red-100': !result,
            'bg-green-100': result,
            'bg-yellow-100': result === 'partly true',
          }"
          class="fixed w-full bottom-0 py-5 md:px-20 flex flex-col sm:flex-row items-end sm:items-center justify-between px-4 border-y-2 border-gray-300"
        >
          <div
            v-if="result === true"
            class="text-sm flex items-center text-green-500"
          >
            <span>Jawaban Anda Benar.</span>
            <BootstrapIcon
              v-if="!isMobile"
              class="ml-4 text-2xl"
              name="check2-circle"
            />
          </div>
          <div
            v-else-if="result === 'partly true'"
            class="text-sm flex items-center text-yellow-500"
          >
            <div>
              <span>Jawaban Anda Sebagian Benar.</span
              ><BootstrapIcon
                v-if="!isMobile"
                class="ml-4 text-2xl"
                name="check2-circle"
              /><br />
              <span>Jawaban yang benar : {{ lesson.content }}</span>
            </div>
          </div>
          <div v-else class="text-sm flex items-center text-red-500 mr-2">
            <div>
              <span>Jawaban Anda Salah.</span>
              <BootstrapIcon
                v-if="!isMobile"
                class="mx-4 text-2xl"
                name="x-circle"
              /><br />
              <span v-if="!lesson.content"
                >Jawaban yang benar : {{ answer }}</span
              >
              <span v-else>Jawaban yang benar : {{ lesson.content }}</span>
            </div>
          </div>
          <button
            @click="next"
            type="button"
            class="mt-2 flex items-center py-2.5 px-5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-green-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
          >
            Lanjutkan
            <BootstrapIcon
              v-if="!isMobile"
              class="ml-4 text-2xl"
              name="arrow-right-circle"
            />
          </button>
        </div>
        <div
          v-else
          class="fixed w-full bottom-0 py-5 md:px-20 bg-white flex items-center justify-end px-4 border-y-2 border-gray-300"
        >
          <button
            type="button"
            :class="{
              'pointer-events-none': userAnswer === false,
              'text-gray-800': userAnswer !== false,
            }"
            class="flex items-center py-2.5 px-5 text-sm font-medium text-gray-100 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-green-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
            @click="submit"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <Loading :is-loading="true" />
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
const { authenticated, user, XP, BASEAPIURL, examQuestions, grade } =
  storeToRefs(useAuthStore());
const { loadTokenFromLocalStorage, setGrade } = useAuthStore();

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

const lesson = ref();
if (examQuestions.value[route.params.no - 1]) {
  lesson.value = examQuestions.value[route.params.no - 1];
} else {
  lesson.value = {
    id_lesson: 0,
    lesson: 0,
    bab: "",
    subbab: "",
    slug: "",
    type: "",
    image: "",
    nextLink: "",
    content: "",
    question: "",
    questionArr: `[""]`,
    answer: `[""]`,
    answerChoices: `[]`,
  };
  router.push("/dashboard/" + route.params.level);
}

// if (lesson.value.id_lesson === 0) {
//   router.push("/dashboard/" + route.params.level);
// }

const id_user = ref();
const dataUser = ref();
const totalGetXP = ref(0);

watch(
  () => user.value.id_user,
  async (newValue) => {
    if (newValue) {
      id_user.value = newValue;
      const { data } = await useFetch(
        BASEAPIURL.value + "/api/users/" + newValue
      );

      dataUser.value = data.value[0];
    }
  },
  { immediate: true }
);

const finishedBab = ref(false);
const nextLesson = ref("");
const message = ref("");

const next = async () => {
  if (route.params.no == 5) {
    if (
      dataUser.value.last_lesson === "makhroj-alkhoisyum-review" ||
      dataUser.value.last_lesson === "mad-layyin-review"
    ) {
      let slug;
      if (route.params.level === "basic-level") {
        slug = "pengenalan-sifatul-huruf";
        nextLesson.value = "/lesson-16/" + slug;
      }
      if (route.params.level === "medium-level") {
        slug = "kesempurnaan-harokat";
        nextLesson.value = "/lesson-38/" + slug;
      }
      if (route.params.level === "advanced-level") {
        slug = "pengenalan-waqaf-dan-ibtida";
        nextLesson.value = "";
      }

      if (finalGrade.value >= 60) {
        message.value = "Selamat kamu telah lulus ujian " + route.params.level;
        await $fetch(
          BASEAPIURL.value + "/api/users/update-lesson/" + id_user.value,
          {
            method: "PUT",
            body: {
              last_lesson: slug,
              xp: dataUser.value.xp,
            },
          }
        );
      } else {
        message.value =
          "Maaf nilaimu belum mencukupi. Silahkan kerjakan kembali.";
      }
    }
    finishedExam.value = true;
    // router.push("/dashboard/" + route.params.level);
  }

  if (route.params.no < 5) {
    router.push(
      "/dashboard/exam/" +
        route.params.level +
        "-question-" +
        (Number(route.params.no) + 1)
    );
  }
};

let answer = ref();
let userAnswer = ref(false);
let result = ref();
let answerSubmit = ref(false);
const answerChoices = ref();
const manyAnswer = ref();
const questionArr = ref();

manyAnswer.value = JSON.parse(lesson.value.answer);
answer.value = manyAnswer.value[0];
answerChoices.value = JSON.parse(lesson.value.answerChoices);
questionArr.value = JSON.parse(lesson.value.questionArr);

// multiple choice and sound question
const getAnswer = (res) => {
  userAnswer.value = res;
};

const finishedExam = ref(false);
const finalGrade = ref(0);

const submit = async () => {
  let gradeBasic = JSON.parse(dataUser.value.exam)[0];
  let gradeMedium = JSON.parse(dataUser.value.exam)[1];
  let gradeAdvanced = JSON.parse(dataUser.value.exam)[2];

  if (gradeBasic == undefined) {
    gradeBasic = 0;
  }
  if (gradeMedium == undefined) {
    gradeMedium = 0;
  }
  if (gradeAdvanced == undefined) {
    gradeAdvanced = 0;
  }

  if (route.params.level === "basic-level") {
    finalGrade.value = JSON.parse(dataUser.value.exam)[0];
  }
  if (route.params.level === "medium-level") {
    finalGrade.value = JSON.parse(dataUser.value.exam)[1];
  }
  if (route.params.level === "advanced-level") {
    finalGrade.value = JSON.parse(dataUser.value.exam)[2];
  }

  if (route.params.no == 1) {
    if (route.params.level === "basic-level") {
      setGrade(JSON.parse(dataUser.value.exam)[0], 0);
      gradeBasic = 0;
    }
    if (route.params.level === "medium-level") {
      setGrade(JSON.parse(dataUser.value.exam)[1], 1);
      gradeMedium = 0;
    }
    if (route.params.level === "advanced-level") {
      setGrade(JSON.parse(dataUser.value.exam)[0], 2);
      gradeAdvanced = 0;
    }

    await useFetch(
      BASEAPIURL.value + "/api/users/update-exam/" + id_user.value,
      {
        method: "PUT",
        body: {
          exam:
            "[" + gradeBasic + "," + gradeMedium + "," + gradeAdvanced + "]",
        },
      }
    );
  }

  answerSubmit.value = true;
  if (
    userAnswer.value === answer.value ||
    resultPair.value == true ||
    correctLetter(letterChoice.value, JSON.parse(lesson.value.answer))
  ) {
    new Audio("/sound/correct.mp3").play();
    result.value = true;

    if (route.params.level === "basic-level") {
      gradeBasic = gradeBasic + 20;
      finalGrade.value = gradeBasic;
    }
    if (route.params.level === "medium-level") {
      gradeMedium = gradeMedium + 20;
      finalGrade.value = gradeMedium;
    }
    if (route.params.level === "advanced-level") {
      gradeAdvanced = gradeAdvanced + 20;
      finalGrade.value = gradeAdvanced;
    }

    await useFetch(
      BASEAPIURL.value + "/api/users/update-exam/" + id_user.value,
      {
        method: "PUT",
        body: {
          exam:
            "[" + gradeBasic + "," + gradeMedium + "," + gradeAdvanced + "]",
        },
      }
    );
  } else if (resultPair.value == "partly true") {
    new Audio("/sound/correct.mp3").play();
    result.value = "partly true";

    if (route.params.level === "basic-level") {
      gradeBasic = gradeBasic + 10;
      finalGrade.value = gradeBasic;
    }
    if (route.params.level === "medium-level") {
      gradeMedium = gradeMedium + 10;
      finalGrade.value = gradeMedium;
    }
    if (route.params.level === "advanced-level") {
      gradeAdvanced = gradeAdvanced + 10;
      finalGrade.value = gradeAdvanced;
    }

    await useFetch(
      BASEAPIURL.value + "/api/users/update-exam/" + id_user.value,
      {
        method: "PUT",
        body: {
          exam:
            "[" + gradeBasic + "," + gradeMedium + "," + gradeAdvanced + "]",
        },
      }
    );
  } else {
    new Audio("/sound/wrong.mp3").play();
    result.value = false;
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
  answerChoices.value.forEach((i) => {
    if (e == i) {
      arabic.value = true;
    }
  });
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

  if (JSON.parse(lesson.value.answer).length === letterChoice.value.length) {
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

const correctLetter = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
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
