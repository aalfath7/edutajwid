<template>
  <div>
    <!-- notif tambah siswa-->
    <Notif
      :is-active="successAddNotif"
      text="Siswa Berhasil ditambah"
      type="success"
    />
    <Notif
      :is-active="registeredStudentNotif"
      text="Siswa sudah terdaftar"
      type="failed"
    />
    <Notif
      :is-active="failedAddNotif"
      text="User tidak ditemukan"
      type="failed"
    />

    <div class="slit-in grid lg:grid-cols-3 gap-5">
      <div class="lg:col-span-2 sm:ml-5">
        <div class="text-sm mb-10">
          <NuxtLink
            :to="'/dashboard/class/' + route.params.code"
            class="hover:bg-gray-100"
          >
            <BootstrapIcon name="arrow-left" />
            Kembali
          </NuxtLink>
        </div>
        <h1 class="font-bold mb-5">Cari Siswa</h1>
        <form
          @submit.prevent="getUser"
          class="flex w-full mb-10 max-w-md max-h-full"
        >
          <input
            v-model="emailNewStudent"
            type="email"
            class="mr-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="Masukkan Email"
            required
          />
          <button
            type="submit"
            class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Cari
          </button>
        </form>
        <div class="w-1/2">
          <span class="text-sm">Hasil</span>
        </div>
        <div
          v-if="user"
          class="shadow border p-2 rounded-lg my-2 flex justify-between items-center"
        >
          <p class="capitalize text-sm">{{ user.name }} - {{ user.role }}</p>
          <button
            @click="addStudent"
            type="button"
            class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Tambah Siswa
          </button>
        </div>
        <div v-else-if="user === undefined" class="text-sm italic my-4">
          User tidak ditemukan
        </div>
        <div v-else></div>
      </div>
      <div class="block"></div>
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
  "/api/joinclass/" + dataClass.value.results[0].id_class
);

const formStudent = ref({
  id: "",
  id_class: dataClass.value.results[0].id_class,
  id_user: "",
});

const emailNewStudent = ref();
const user = ref(false);

const getUser = async () => {
  const { results } = await $fetch("/api/users/email/" + emailNewStudent.value);
  user.value = results[0];
};

const duplicatedUser = ref(false);
const successAddNotif = ref(false);
const failedAddNotif = ref(false);
const registeredStudentNotif = ref(false);

const addStudent = async () => {
  if (user.value) {
    formStudent.value.id_user = user.value.id_user;
    if (
      allStudents.value.results.filter((e) => e.user_name === user.value.name)
        .length > 0
    ) {
      duplicatedUser.value = true;
    } else {
      duplicatedUser.value = false;
    }

    if (!duplicatedUser.value) {
      const { data } = await useFetch("/api/joinclass", {
        method: "POST",
        body: formStudent,
      });

      if (data.value.results.affectedRows === 1) {
        await useFetch("/api/class/update-students/" + route.params.code, {
          method: "PUT",
          body: {
            number_of_students: allStudents.value.results.length + 1,
          },
        });

        successAddNotif.value = true;
        setTimeout(() => {
          successAddNotif.value = false;
          router.push("/dashboard/class/" + route.params.code);
        }, 1000);
      } else {
        failedAddNotif.value = true;
      }
    } else {
      registeredStudentNotif.value = true;
      setTimeout(() => {
        registeredStudentNotif.value = false;
        router.push("/dashboard/class/" + route.params.code);
      }, 1000);
    }
  } else {
    failedAddNotif.value = true;
    setTimeout(() => {
      failedAddNotif.value = false;
      router.push("/dashboard/class/" + route.params.code);
    }, 1000);
  }
};
</script>
