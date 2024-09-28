<template>
  <div>
    <!-- notif tambah pelajar-->
    <Notif
      :is-active="successAddNotif"
      text="Permintaan bergabung kelas telah dikirim"
      type="success"
    />
    <Notif
      :is-active="acceptStudentNotif"
      text="Pelajar sudah terdaftar"
      type="failed"
    />
    <Notif
      :is-active="teachersRequestNotif"
      text="Permintaan bergabung sudah terkirim"
      type="failed"
    />
    <Notif
      :is-active="studentsRequestNotif"
      text="Pelajar sudah meminta bergabung"
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
        <h1 class="font-bold mb-5">Cari Pelajar</h1>
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

        <div v-if="user">
          {{ user.length }}
          <div
            v-if="user.id_user === dataUser.id_user"
            class="text-sm italic my-4"
          >
            Guru sudah bergabung dengan kelas
          </div>
          <div v-else-if="user.role === 'teacher'" class="text-sm italic my-4">
            Guru tidak boleh bergabung
          </div>
          <div
            v-else
            class="shadow border p-2 rounded-lg my-2 flex justify-between items-center"
          >
            <p class="capitalize text-sm">{{ user.name }} - {{ user.role }}</p>
            <button
              @click="addStudent"
              type="button"
              class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Tambah pelajar
            </button>
          </div>
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
  htmlAttrs: {
    lang: "id",
  },
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
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/index";

const { user: dataUser, BASEAPIURL } = storeToRefs(useAuthStore());

watch(
  () => dataUser.value.id_user,
  async (newId) => {
    if (newId) {
      dataUser.value.id_user = newId;
    }
  },
  { immediate: true }
);

const { data: dataClass, refresh: classRefresh } = await useFetch(
  BASEAPIURL.value + "/api/class/" + route.params.code
);

const acceptStudent = ref();
const studentsRequest = ref();
const teachersRequest = ref();

if (dataClass) {
  const { data: accept } = await useFetch(
    BASEAPIURL.value + "/api/joinclass/" + dataClass.value[0].id_class
  );
  acceptStudent.value = accept.value;
  const { data: students } = await useFetch(
    BASEAPIURL.value +
      "/api/joinclass/get-students-request/" +
      dataClass.value[0].id_class
  );
  studentsRequest.value = students.value;
  const { data: teachers } = await useFetch(
    BASEAPIURL.value +
      "/api/joinclass/get-teachers-request/" +
      dataClass.value[0].id_class
  );
  teachersRequest.value = teachers.value;
}

const formStudent = ref({
  id: "",
  id_class: dataClass.value[0].id_class,
  id_user: "",
  status: "teachers request",
});

const emailNewStudent = ref();
const user = ref(false);

const getUser = async () => {
  const data = await $fetch(
    BASEAPIURL.value + "/api/users/email/" + emailNewStudent.value
  );
  user.value = data[0];
};

const duplicatedUser = ref(false);
const successAddNotif = ref(false);
const failedAddNotif = ref(false);
const registeredStudentNotif = ref(false);
const acceptStudentNotif = ref(false);
const teachersRequestNotif = ref(false);
const studentsRequestNotif = ref(false);

const addStudent = async () => {
  if (user.value) {
    formStudent.value.id_user = user.value.id_user;
    if (
      acceptStudent.value.filter((e) => e.user_name === user.value.name)
        .length > 0
    ) {
      acceptStudentNotif.value = true;
      setTimeout(() => {
        acceptStudentNotif.value = false;
        router.push("/dashboard/class/" + route.params.code);
      }, 1000);
    } else if (
      teachersRequest.value.filter((e) => e.user_name === user.value.name)
        .length > 0
    ) {
      teachersRequestNotif.value = true;
      setTimeout(() => {
        teachersRequestNotif.value = false;
        router.push("/dashboard/class/" + route.params.code);
      }, 1000);
    } else if (
      studentsRequest.value.filter((e) => e.user_name === user.value.name)
        .length > 0
    ) {
      studentsRequestNotif.value = true;
      setTimeout(() => {
        studentsRequestNotif.value = false;
        router.push("/dashboard/class/" + route.params.code);
      }, 1000);
    } else {
      const { data } = await useFetch(BASEAPIURL.value + "/api/joinclass", {
        method: "POST",
        body: formStudent.value,
      });

      if (data.value.affectedRows === 1) {
        successAddNotif.value = true;
        setTimeout(() => {
          successAddNotif.value = false;
          router.push("/dashboard/class/" + route.params.code);
        }, 1000);
      } else {
        failedAddNotif.value = true;
      }
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
