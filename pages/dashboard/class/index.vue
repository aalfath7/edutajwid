<template>
  <div>
    <Notif
      :is-active="successNotif"
      text="Buat kelas berhasil"
      type="success"
    />
    <Notif
      :is-active="successRequestNotif"
      text="Permintaan Gabung Kelas terkirim"
      type="success"
    />
    <Notif :is-active="failedNotif" text="Buat Kelas gagal" type="failed" />
    <Notif
      :is-active="successJoinNotif"
      text="Berhasil bergabung dengan kelas"
      type="success"
    />
    <Notif
      :is-active="rejectedNotif"
      text="Permintaan gabung kelas ditolak"
      type="failed"
    />
    <Notif
      :is-active="failedRequestNotif"
      text="Permintaan gabung kelas tidak berhasil dikirim"
      type="failed"
    />
    <Notif
      :is-active="studentRequested"
      text="Permintaan gabung sudah terkirim"
      type="failed"
    />

    <!-- Main modal -->

    <div
      :class="{ 'hidden ': !modalIsOpen }"
      class="fixed top-0 left-0 overflow-y-auto overflow-x-hidden z-50 flex justify-center items-center w-full md:inset-0 h-full max-h-full"
    >
      <!-- overlay -->
      <div
        @click="toggleModal"
        :class="{ 'hidden ': !modalIsOpen }"
        class="overlay w-full h-screen absolute top-0 left-0 bg-gray-700 bg-opacity-50"
      ></div>
      <div class="relative p-4 w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div
            class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
          >
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Buat Kelas
            </h3>
            <button
              @click="toggleModal"
              type="button"
              class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>

          <div class="p-4 md:p-5">
            <form class="space-y-4" @submit.prevent="createClass">
              <div>
                <label
                  for="kelas"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Kelas</label
                >
                <input
                  v-model="form.name"
                  type="text"
                  name="kelas"
                  id="kelas"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="kelas 7"
                  required
                />
              </div>
              <div>
                <label
                  for="sekolah"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >Nama Sekolah</label
                >
                <input
                  v-model="form.school_name"
                  type="text"
                  name="sekolah"
                  id="sekolah"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="SMP N 2 Bandar Lampung"
                  required
                />
              </div>

              <button
                type="submit"
                class="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Buat
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="slit-in sm:pl-6">
      <div
        v-if="user.role === 'student'"
        class="w-full max-w-md max-h-full mb-10 grid grid-cols-3 gap-2"
      >
        <input
          v-model="classCode"
          type="text"
          name="kelas"
          id="kelas"
          class="col-span-2 mr-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 w-full p-2.5"
          placeholder="Masukkan Kode"
        />
        <button
          @click="searchClass"
          type="button"
          class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Cari Kelas
        </button>
      </div>

      <div v-if="user.role === 'student'">
        <div v-if="dataSearchClass !== undefined">
          <h2 v-if="dataSearchClass.length > 0">Kelas tersedia</h2>
          <div
            v-if="dataSearchClass.length > 0"
            class="grid grid-cols-1 lg:grid-cols-2 gap-5 md:pr-10 pt-5 mb-10"
          >
            <div
              v-for="(item, i) in dataSearchClass"
              :key="i"
              class="flex items-center bg-white border border-gray-200 rounded-lg shadow flex-row"
            >
              <img
                class="object-cover w-20 rounded-t-lg md:rounded-none md:rounded-s-lg"
                src="/src/class.jpg"
                alt=""
              />
              <div class="flex justify-between w-full p-2">
                <div>
                  <h5 class="text-xl font-bold">
                    {{ item.name }}
                  </h5>
                  <p class="font-normal">
                    {{ item.school_name }}
                  </p>
                </div>
                <div class="flex items-center">
                  <button
                    @click="requestJoinClass"
                    type="button"
                    class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    Gabung
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="mb-10">Kelas Tidak Tersedia</div>
        </div>
      </div>

      <div v-if="user.role === 'student'">
        <div v-if="requestClass !== undefined">
          <h2 v-if="requestClass.length > 0">Permintaan Bergabung</h2>
          <div
            v-if="requestClass.length > 0"
            class="grid grid-cols-1 lg:grid-cols-2 gap-5 md:pr-10 pt-5 mb-10"
          >
            <div
              v-for="(item, i) in requestClass"
              :key="i"
              class="flex items-center bg-white border border-gray-200 rounded-lg shadow flex-row"
            >
              <img
                class="object-cover w-20 rounded-t-lg md:rounded-none md:rounded-s-lg"
                src="/src/class.jpg"
                alt=""
              />
              <div
                class="flex flex-col sm:flex-row sm:justify-between w-full p-2 ml-5"
              >
                <div>
                  <h5 class="text-xl font-bold capitalize">
                    {{ item.class_name }}
                  </h5>
                  <p class="font-normal capitalize">
                    {{ item.school_name }}
                  </p>
                </div>
                <div class="flex items-center">
                  <button
                    @click="joinClass(item.id_joinclass)"
                    type="button"
                    class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    Gabung
                  </button>
                  <button
                    @click="rejectedClass(item.id_joinclass)"
                    type="button"
                    class="ml-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  >
                    Tolak
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal toggle -->
      <button
        v-if="user.role === 'teacher'"
        @click="toggleModal"
        class="mb-8 block text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        type="button"
      >
        Buat Kelas
      </button>

      <div v-if="user.role === 'student'">
        <div v-if="studentClass">
          <div
            v-if="studentClass.length > 0"
            class="grid grid-cols-1 lg:grid-cols-2 gap-5 md:pr-10 border-t pt-5"
          >
            <NuxtLink
              v-for="(item, i) in studentClass"
              :key="i"
              :to="'/dashboard/class/' + item.class_code"
              class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <img
                class="object-cover w-full rounded-t-lg h-44 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                src="/src/class.jpg"
                alt=""
              />
              <div
                class="flex flex-col justify-between p-4 leading-normal w-full h-full"
              >
                <h5
                  class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                >
                  {{ item.name }}
                </h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {{ item.school_name }}
                </p>
                <div class="w-full flex justify-between items-center">
                  <p class="text-gray-500 text-sm">
                    {{ item.number_of_students }} siswa
                  </p>
                  <img
                    class="w-8 h-8 rounded-full border border-gray-400 object-cover"
                    :src="BASEAPIURL + '/uploads/' + item.image"
                    alt="Neil image"
                  />
                </div>
              </div>
            </NuxtLink>
          </div>
          <div v-else class="border-t pt-5">
            Anda belum bergabung dengan kelas
          </div>
        </div>
      </div>

      <div v-if="user.role === 'teacher'">
        <div v-if="!isLoading">
          <div v-if="allClassTeacher.length > 0" class="md:pr-10 border-t pt-5">
            <h2 class="mb-5">Kelasmu</h2>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <NuxtLink
                v-for="(item, i) in allClassTeacher"
                :key="i"
                :to="'/dashboard/class/' + item.class_code"
                class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <img
                  class="object-cover w-full rounded-t-lg h-44 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                  src="/src/class.jpg"
                  alt=""
                />
                <div
                  class="flex flex-col justify-between p-4 leading-normal w-full h-full"
                >
                  <h5
                    class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                  >
                    {{ item.name }}
                  </h5>
                  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {{ item.school_name }}
                  </p>
                  <div class="w-full flex justify-between items-center">
                    <p class="text-gray-500 text-sm">
                      {{ item.number_of_students }} siswa
                    </p>
                    <img
                      class="w-8 h-8 rounded-full border border-gray-400 object-cover"
                      :src="BASEAPIURL + '/uploads/' + item.image"
                      alt="Neil image"
                    />
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>
          <div v-else class="border-t pt-5">Belum ada kelas</div>
        </div>
        <div v-else>
          <Loading :is-loading="true" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { initFlowbite } from "flowbite";
useHead({
  title: "Edutajwid - Belajar Tajwid Dengan Mudah",
});
definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});

const router = useRouter();
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/index";
const { authenticated, user, BASEAPIURL } = storeToRefs(useAuthStore());

const allClassTeacher = ref();

const form = ref({
  id_class: "",
  id_user: "",
  name: "",
  school_name: "",
  class_code: "",
});

const requestClass = ref();
const refreshData = ref();
const studentClass = ref([]);
const isLoading = ref(true);

watch(
  () => user.value.id_user,
  async (newId) => {
    if (newId) {
      form.value.id_user = newId;

      // teacher
      const { data } = await useFetch(
        BASEAPIURL.value + "/api/class/teacher/" + newId
      );
      allClassTeacher.value = data.value;
      if (allClassTeacher.value) {
        isLoading.value = false;
      }

      // student
      const { data: response } = await useFetch(
        BASEAPIURL.value + "/api/joinclass/get-teachers-request-user/" + newId
      );

      requestClass.value = response.value;

      const { data: dataClass, refresh: refreshClass } = await useFetch(
        BASEAPIURL.value + "/api/joinclass/student-class/" + newId
      );
      dataClass.value.forEach(async (e) => {
        const results = await useFetch(
          BASEAPIURL.value + "/api/class/" + e.class_code
        );
        studentClass.value.push(results.data.value[0]);
      });
    }
  },
  { immediate: true }
);

const successNotif = ref(false);
const failedNotif = ref(false);

const createClass = async () => {
  let code = generateRandomCode();
  form.value.class_code = code;
  try {
    const { data: response, error } = await useFetch(
      BASEAPIURL.value + "/api/class",
      {
        method: "POST",
        body: form,
      }
    );

    if (response.value.affectedRows === 1) {
      successNotif.value = true;
    } else {
      failedNotif.value = true;
    }

    modalIsOpen.value = false;

    const { data } = await useFetch(
      BASEAPIURL.value + "/api/class/teacher/" + form.value.id_user
    );
    allClassTeacher.value = data.value;

    setTimeout(() => {
      router.push("/dashboard/class/" + code);
    }, 1000);
  } catch (err) {
    console.error("Error:", err);
  }
};

const generateRandomCode = () => {
  const length = 6;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

const modalIsOpen = ref(false);
const toggleModal = () => {
  modalIsOpen.value = !modalIsOpen.value;
};

const successJoinNotif = ref(false);

const joinClass = async (id) => {
  const { data } = await useFetch(BASEAPIURL.value + "/api/joinclass/" + id, {
    method: "PUT",
    body: {
      status: "accepted",
    },
  });

  if (data.value.affectedRows === 1) {
    successJoinNotif.value = true;
    setTimeout(() => {
      successJoinNotif.value = false;
    }, 1000);

    const { data: allStudents } = await useFetch(
      BASEAPIURL.value + "/api/joinclass/" + requestClass.value[0].id_class
    );

    if (allStudents) {
      await useFetch(
        BASEAPIURL.value +
          "/api/class/update-students/" +
          requestClass.value[0].class_code,
        {
          method: "PUT",
          body: {
            number_of_students: allStudents.value.length,
          },
        }
      );
    }

    const { data: dataClass, refresh: refreshClass } = await useFetch(
      BASEAPIURL.value + "/api/joinclass/student-class/" + form.value.id_user
    );
    studentClass.value = [];
    dataClass.value.forEach(async (e) => {
      const results = await useFetch(
        BASEAPIURL.value + "/api/class/" + e.class_code
      );
      studentClass.value.push(results.data.value[0]);
    });
  }

  const { data: dataRequest } = await useFetch(
    BASEAPIURL.value +
      "/api/joinclass/get-teachers-request-user/" +
      user.id_user
  );

  requestClass.value = dataRequest.value;
};

const rejectedNotif = ref(false);

const rejectedClass = async (id) => {
  const { data } = await useFetch(BASEAPIURL.value + "/api/joinclass/" + id, {
    method: "DELETE",
  });

  if (data.value.affectedRows === 1) {
    rejectedNotif.value = true;
    setTimeout(() => {
      rejectedNotif.value = false;
    }, 1000);
  }

  const { data: dataRequest } = await useFetch(
    BASEAPIURL.value +
      "/api/joinclass/get-teachers-request-user/" +
      user.id_user
  );

  requestClass.value = dataRequest.value;
};

const classCode = ref();
const formStudent = ref({
  id: "",
  id_class: "",
  id_user: "",
  status: "students request",
});

const successRequestNotif = ref(false);
const failedRequestNotif = ref(false);
const studentRequested = ref(false);
const dataSearchClass = ref();

const searchClass = async () => {
  const { data: dataClass, refresh: classRefresh } = await useFetch(
    BASEAPIURL.value + "/api/class/" + classCode.value
  );
  dataSearchClass.value = dataClass.value;
  if (dataClass.value.length > 0) {
    formStudent.value.id_class = dataClass.value[0].id_class;
  }
};

const requestJoinClass = async () => {
  const { data: students } = await useFetch(
    BASEAPIURL.value +
      "/api/joinclass/get-students-request-user/" +
      form.value.id_user
  );

  formStudent.value.id_user = form.value.id_user;

  if (students.value.length > 0) {
    studentRequested.value = true;
    setTimeout(() => {
      studentRequested.value = false;
    }, 1000);
  } else {
    const { data } = await useFetch(BASEAPIURL.value + "/api/joinclass", {
      method: "POST",
      body: formStudent.value,
    });

    if (data.value !== null) {
      if (data.value.affectedRows === 1) {
        successRequestNotif.value = true;
        setTimeout(() => {
          successRequestNotif.value = false;
        }, 1000);
      }
    } else {
      failedRequestNotif.value = true;
      setTimeout(() => {
        failedRequestNotif.value = false;
      }, 1000);
    }
  }

  dataSearchClass.value = [];
};

onMounted(() => {
  initFlowbite();
});
</script>

<style setup></style>
