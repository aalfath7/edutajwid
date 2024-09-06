<template>
  <div class="sm:pl-5">
    <div>
      <h1 class="mb-2 font-bold">Pencapaian Belajar Siswa</h1>
      <div
        class="overflow-x-auto relative shadow-md border border-gray-200 rounded-lg"
      >
        <div class="sticky left-0 z-40 flex justify-end w-full px-6 py-3">
          <p class="text-xs uppercase font-bold">Lesson</p>
        </div>
        <table
          class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
        >
          <thead
            class="border-b border-gray-200 text-xs text-gray-700 uppercase dark:text-gray-400"
          >
            <tr>
              <th
                scope="col"
                class="sticky left-0 z-10 px-6 py-3 bg-gray-50 dark:bg-gray-800 shadow"
              >
                Pelajar
              </th>
              <th
                v-for="(item, i) in lessons"
                :key="i"
                scope="col"
                :class="i % 2 === 0 ? 'bg-gray-50' : ''"
                class="border border-gray-100 relative"
                @mouseover="showTooltip(i)"
                @mouseout="closeTooltop(i)"
              >
                <NuxtLink
                  :to="
                    '/lesson-' +
                    item.lesson +
                    '/' +
                    route.params.code +
                    '-review-' +
                    item.slug
                  "
                  class="px-6 py-3"
                >
                  {{ item.id_lesson }}
                  <div
                    v-show="tooltip[i]"
                    class="absolute inline-block z-50 right-0 top-0 bg-white hover:shadow-lg border p-2 break-words min-w-full"
                  >
                    {{ item.subbab }}
                  </div>
                </NuxtLink>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="student in data"
              :key="student.id_user"
              class="border-b border-gray-200 dark:border-gray-700"
            >
              <th
                scope="row"
                class="sticky left-0 z-10 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800 shadow"
              >
                {{ student.name }}
              </th>
              <td
                v-for="(item, i) in student.lesson_passed"
                :key="i"
                class="px-6 py-4 border border-gray-100"
              >
                <BootstrapIcon
                  v-if="item"
                  class="text-green-500"
                  name="check-circle-fill"
                />
                <BootstrapIcon
                  v-else
                  class="text-red-500"
                  name="x-circle-fill"
                />
              </td>
              <td
                v-for="(item, i) in 95 - student.lesson_passed.length"
                :key="i"
                class="px-6 py-4 border border-gray-100"
              >
                <BootstrapIcon class="text-yellow-200" name="circle-fill" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="mt-10">
      <h1 class="mb-2 font-bold">Hasil Ujian Level</h1>
      <div class="overflow-x-auto rounded-lg">
        <table
          class="text-sm text-left text-gray-500 shadow-md border border-gray-200 rounded-lg"
        >
          <thead
            class="border-b border-gray-200 text-xs text-gray-700 uppercase"
          >
            <tr>
              <th
                scope="col"
                class="sticky left-0 z-10 px-6 py-3 bg-gray-50 dark:bg-gray-800 shadow"
              >
                Pelajar
              </th>
              <th scope="col" class="px-6 py-3">Basic Level</th>
              <th scope="col" class="px-6 py-3 bg-gray-50">Medium Level</th>
              <th scope="col" class="px-6 py-3">Advanced Level</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="student in data"
              :key="student.id_user"
              class="border-b border-gray-200 dark:border-gray-700"
            >
              <th
                scope="row"
                class="sticky left-0 z-10 px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white shadow"
              >
                {{ student.name }}
              </th>
              <td
                v-for="grade in student.exam"
                class="px-6 py-4 border border-gray-100"
              >
                {{ grade }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { initFlowbite } from "flowbite";
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

const route = useRoute();
const router = useRouter();

const showTooltip = (i) => {
  tooltip.value[i] = true;
};

const closeTooltop = (i) => {
  tooltip.value[i] = false;
};

const tooltip = ref([]);

for (let i = 0; i < 95; i++) {
  tooltip.value.push(false);
}

const { data: lessons } = await useFetch(BASEAPIURL.value + "/api/lessons");

const { data: dataClass, refresh: classRefresh } = await useFetch(
  BASEAPIURL.value + "/api/class/" + route.params.code
);

const { data: allStudents, refresh: studentsRefresh } = await useFetch(
  BASEAPIURL.value +
    "/api/joinclass/students-progress/" +
    dataClass.value[0].id_class
);

const data = ref();

data.value = allStudents.value.map((i) => {
  let student = {
    name: i.name,
    lesson_passed: JSON.parse(i.lesson_passed),
    exam: JSON.parse(i.exam),
  };
  return student;
});
onMounted(() => {
  initFlowbite();
});
</script>
