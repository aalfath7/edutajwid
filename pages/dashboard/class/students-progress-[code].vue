<template>
  <div class="sm:pl-5">
    <h1 class="mb-2 font-bold">Students Progress</h1>
    <div
      class="overflow-x-auto relative shadow-md border border-gray-200 rounded-lg"
    >
      <div class="sticky left-0 z-50 flex justify-center w-full px-6 py-3">
        <p class="text-sm uppercase">Lesson</p>
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
              v-for="i in 95"
              :key="i"
              scope="col"
              :class="i % 2 === 0 ? 'bg-gray-50' : ''"
              class="px-6 py-3"
            >
              {{ i }}
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
              :class="i % 2 !== 0 ? 'bg-gray-50' : ''"
              class="px-6 py-4"
            >
              <BootstrapIcon
                v-if="item"
                class="text-green-500"
                name="check-circle-fill"
              />
              <BootstrapIcon v-else class="text-red-500" name="x-circle-fill" />
            </td>
            <td
              v-for="(item, i) in 95 - student.lesson_passed.length"
              :key="i"
              :class="i % 2 === 0 ? 'bg-gray-50' : ''"
              class="px-6 py-4"
            >
              <BootstrapIcon class="text-yellow-200" name="circle-fill" />
            </td>
          </tr>
        </tbody>
      </table>
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
onMounted(() => {
  initFlowbite();
});

const route = useRoute();
const router = useRouter();

const { data: dataClass, refresh: classRefresh } = await useFetch(
  "/api/class/" + route.params.code
);

const { data: allStudents, refresh: studentsRefresh } = await useFetch(
  "/api/joinclass/students-progress/" + dataClass.value.results[0].id_class
);

const data = ref();

data.value = allStudents.value.results.map((i) => {
  let student = {
    name: i.name,
    lesson_passed: JSON.parse(i.lesson_passed),
  };
  return student;
});
</script>
