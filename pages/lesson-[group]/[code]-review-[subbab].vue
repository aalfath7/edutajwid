<template>
  <div class="lg:h-screen">
    <div v-if="data">
      <!-- nav -->
      <div
        class="bg-white w-full fixed grid grid-cols-3 p-4 md:px-20 border-b-2 border-gray-300 z-50"
      >
        <div class="flex items-center text-sm">
          <NuxtLink
            :to="'/dashboard/class/students-progress-' + route.params.code"
          >
            <BootstrapIcon name="arrow-left" />
            Kembali
          </NuxtLink>
        </div>
        <div class="flex items-center justify-center">
          <h1
            class="capitalize text-sm sm:text-xl text-start sm:text-center whitespace-nowrap text-ellipsis overflow-hidden"
          >
            {{ lesson.subbab }}
          </h1>
        </div>
      </div>

      <!-- text and image -->
      <div v-if="lesson.type === 'text image'">
        <div
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
              v-if="lesson.image"
              class="w-32 my-2"
              :src="lesson.image"
              alt=""
            />
            <div
              v-html="lesson.content"
              class="text-sm sm:text-lg leading-relaxed text-justify"
            ></div>
          </div>
        </div>
      </div>

      <!-- content question -->
      <div v-else>
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
                  v-for="(letter, i) in manyAnswer"
                  :key="i"
                  type="button"
                  class="ml-1 bg-white border-gray-200 flex items-center justify-center rounded-lg border p-2 text-sm font-medium text-gray-900"
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
                    v-for="(item, i) in manyAnswer"
                    :key="i"
                    :class="pairingStyle(item)"
                    class="relative inline-block select-none cursor-pointer text-center flex items-center justify-center border-2 w-full h-10 my-2"
                  >
                    <span class="text-sm inline-block">{{ item }}</span>
                    <span class="absolute right-0 bg-white">
                      <BootstrapIcon
                        name="check"
                        class="text-3xl text-green-500"
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
                    v-for="(item, i) in manyAnswer"
                    :key="i"
                    :class="{
                      'border-solid border-black-600 text-black':
                        item !== 'drop here',
                      'border-dashed border-gray-400 text-gray-400':
                        item === 'drop here',
                    }"
                    class="select-none cursor-pointer text-center flex items-center justify-center border-2 w-full h-10 my-2"
                  >
                    <span>{{ item }}</span>
                    <span>
                      <BootstrapIcon
                        name="check"
                        class="text-3xl text-green-500"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div v-else class="flex flex-col justify-center w-4/5 lg:w-2/5">
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
                  v-for="item in answerChoices"
                  type="button"
                  :class="item === answer ? 'bg-green-100' : 'bg-red-100'"
                  class="p-2 h-24 sm:w-44 sm:h-44 mb-2 font-medium text-gray-900 rounded-lg border border-gray-200"
                >
                  <p
                    class="capitalize"
                    :class="arabic ? 'text-3xl' : 'text-sm sm:text-base'"
                  >
                    {{ item }}
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
              <div
                class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-1 pb-20 lg:h-72"
              >
                <button
                  v-for="(letter, i) in hijaiyahLetter"
                  :key="i"
                  type="button"
                  :class="{ 'bg-green-100': checkLetter(letter) }"
                  class="border-gray-200 flex items-center justify-center rounded-lg border py-2 px-8 sm:px-16 text-sm font-medium text-gray-900"
                >
                  <p class="text-2xl">
                    {{ letter }}
                  </p>
                </button>
              </div>
            </div>
          </div>
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
const { authenticated, user, BASEAPIURL } = storeToRefs(useAuthStore());
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

const { data } = await useFetch(
  BASEAPIURL.value + "/api/lessons/" + route.params.subbab
);
const lesson = ref(data.value[0]);

const id_user = ref();
const dataUser = ref();

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

let answer = ref();
let userAnswer = ref(false);
let answerSubmit = ref(false);
const answerChoices = ref();
const manyAnswer = ref();
const questionArr = ref();
// get answer

manyAnswer.value = JSON.parse(lesson.value.answer);
answer.value = manyAnswer.value[0];
answerChoices.value = JSON.parse(lesson.value.answerChoices);
questionArr.value = JSON.parse(lesson.value.questionArr);

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
  manyAnswer.value.forEach((e) => {
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
</script>

<style setup></style>
