<template>
  <div>
    <div>
      <!-- notif delete class -->
      <Notif
        :is-active="successNotif"
        text="Kelas Berhasil dihapus"
        type="success"
      />
      <Notif
        :is-active="failedNotif"
        text="Kelas Gagal dihapus"
        type="failed"
      />
      <!-- notif edit class -->
      <Notif
        :is-active="successEditNotif"
        text="Kelas Berhasil diubah"
        type="success"
      />
      <Notif
        :is-active="failedEditNotif"
        text="Kelas Gagal diubah"
        type="failed"
      />
      <!-- notif hapus pelajar-->
      <Notif
        :is-active="successRemoveNotif"
        text="pelajar Berhasil dihapus"
        type="success"
      />
      <Notif
        :is-active="failedRemoveNotif"
        text="pelajar gagal dihapus"
        type="failed"
      />
      <Notif
        :is-active="successJoinNotif"
        text="Belajar berhasil ditambahkan"
        type="success"
      />
      <Notif
        :is-active="rejectedNotif"
        text="Permintaan gabung kelas ditolak"
        type="failed"
      />
    </div>
    <!-- modal edit-->
    <div
      :class="editModal ? '' : 'hidden'"
      class="fixed top-0 left-0 overflow-y-auto overflow-x-hidden z-50 flex justify-center items-center w-full md:inset-0 h-full max-h-full"
    >
      <div
        @click="toggleEditModal"
        class="absolute opacity-70 bg-gray-900 w-full h-full"
      ></div>
      <div class="relative p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div
            class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
          >
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Ubah Kelas
            </h3>
            <button
              @click="toggleEditModal"
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
          <!-- Modal body -->
          <div class="p-4 md:p-5">
            <form class="space-y-4" @submit.prevent="editClass">
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
                Ubah
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- modal delete class-->
    <div
      :class="deleteModal ? '' : 'hidden'"
      class="fixed top-0 left-0 overflow-y-auto overflow-x-hidden z-50 flex justify-center items-center w-full md:inset-0 h-full max-h-full"
    >
      <div
        @click="toggleDeleteModal"
        class="absolute opacity-70 bg-gray-900 w-full h-full"
      ></div>
      <div class="relative p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div
            class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
          >
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Apakah kamu yakin ingin menghapus kelas?
            </h3>
            <button
              @click="toggleDeleteModal"
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
          <!-- Modal body -->
          <div class="p-4 md:p-5 grid grid-cols-2 gap-2">
            <button
              @click="toggleDeleteModal"
              type="button"
              class="w-full text-black font-medium rounded-lg text-sm px-5 py-2.5 text-center border hover:bg-gray-100"
            >
              Batal
            </button>
            <button
              @click="onDelete(dataClass[0].class_code)"
              type="button"
              class="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Hapus Kelas
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal delete pelajar-->
    <div
      :class="removeStudentModal ? '' : 'hidden'"
      class="fixed top-0 left-0 overflow-y-auto overflow-x-hidden z-50 flex justify-center items-center w-full md:inset-0 h-full max-h-full"
    >
      <div
        @click="toggleRemoveStudentModal"
        class="absolute opacity-70 bg-gray-900 w-full h-full"
      ></div>
      <div class="relative p-4 w-full max-w-md max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div
            class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
          >
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Apakah kamu yakin ingin menghapus pelajar?
            </h3>
            <button
              @click="toggleRemoveStudentModal"
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
          <!-- Modal body -->
          <div class="p-4 md:p-5 grid grid-cols-2 gap-2">
            <button
              @click="toggleRemoveStudentModal"
              type="button"
              class="w-full text-black font-medium rounded-lg text-sm px-5 py-2.5 text-center border hover:bg-gray-100"
            >
              Batal
            </button>
            <button
              @click="studentDelete"
              type="button"
              class="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Hapus pelajar
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="slit-in grid lg:grid-cols-3 gap-5">
      <div class="lg:col-span-2 sm:ml-5">
        <div class="relative border border-gray-300 rounded-lg">
          <div
            class="absolute bg-white bg-opacity-75 rounded-lg p-2 text-sm mb-10 z-10"
          >
            <NuxtLink to="/dashboard/class/">
              <BootstrapIcon name="arrow-left" />
              Kembali
            </NuxtLink>
          </div>
          <img
            src="/src/class.jpg"
            alt=""
            class="w-full h-20 object-cover border rounded-lg opacity-25"
          />
          <button
            v-if="user.role === 'teacher'"
            @click="toggleSettings"
            type="button"
            class="absolute top-2 right-2 rounded-full border w-8 h-8 bg-white hover:text-gray-500 flex items-center justify-center"
          >
            <BootstrapIcon class="text-2xl" name="gear-fill" />
          </button>

          <ul
            v-show="settings"
            class="z-30 absolute top-12 right-2 bg-white border px-2 rounded-lg shadow-lg"
          >
            <li class="flex justify-end">
              <button @click="toggleSettings" type="button">
                <BootstrapIcon class="text-2xl" name="x" />
              </button>
            </li>
            <li class="py-3 px-3 border-t">
              <button @click="toggleEditModal" type="button">Ubah Kelas</button>
            </li>
            <li class="py-3 px-3 border-t">
              <button @click="toggleDeleteModal" type="button">
                Hapus Kelas
              </button>
            </li>
          </ul>
        </div>
        <h1 class="p-4 text-lg border shadow rounded-lg my-2">
          {{ dataClass[0].name }} - {{ dataClass[0].school_name }} <br />
        </h1>
        <div>
          <div v-if="allStudents" class="my-10 text-lg border-t">
            <div
              class="my-5 flex flex-col sm:flex-row justify-between sm:items-center"
            >
              <p class="flex items-center mb-2">Pelajar</p>
              <div v-if="user.role === 'teacher'" class="flex justify-between">
                <NuxtLink
                  :to="
                    '/dashboard/class/students-progress-' + route.params.code
                  "
                  class="mr-2 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Lihat Pencapaian
                </NuxtLink>
                <NuxtLink
                  :to="'/dashboard/class/add-student-' + route.params.code"
                  class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Tambah pelajar
                </NuxtLink>
              </div>
            </div>
            <div
              v-for="(student, i) in allStudents"
              :key="i"
              class="capitalize my-2 text-sm font-light border p-3 rounded-lg flex justify-between items-center"
            >
              <p>{{ student.user_name }}</p>
              <button
                v-if="user.role === 'teacher'"
                @click="toggleRemoveStudentModal(student.id_joinclass)"
                type="button"
                class=""
              >
                <BootstrapIcon class="text-2xl" name="trash" />
              </button>
            </div>
          </div>
          <div v-else class="my-10 text-xl border-t">
            <div class="my-5 flex justify-between items-center">
              <p class="flex items-center">pelajar</p>
              <div>
                <NuxtLink
                  :to="'/dashboard/class/add-student-' + route.params.code"
                  class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Tambah pelajar
                </NuxtLink>
              </div>
            </div>
            <span class="text-sm italic">belum ada pelajar</span>
          </div>
        </div>
      </div>
      <div class="block">
        <div class="sticky top-20 sm:pl-2 sm:pl-5 lg:pl-0">
          <div
            class="block lg:max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow text-center"
          >
            <h2 class="mb-2 font-bold">Data Kelas</h2>
            <div class="mb-2 flex justify-center">
              <img
                :src="BASEAPIURL + '/uploads/' + dataClass[0].image"
                alt="teacher"
                class="w-20 h-20 rounded-full border border-gray-400 object-cover"
              />
            </div>
            <p class="mb-2 capitalize">Guru : {{ dataClass[0].teacher }}</p>
            <div class="mb-2 tracking-tight text-gray-900">
              Kode Kelas :
              <span class="">
                {{ dataClass[0].class_code }}
                <button @click="selectText" type="button" class="">
                  <BootstrapIcon class="text-sm" name="copy" />
                </button>
              </span>
              <div
                v-show="copySuccess"
                class="w-full bg-green-100 border border-green-300 rounded-lg my-2 p-1 text-sm"
              >
                <span>berhasil salin</span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="user.role === 'teacher'" class="mt-5">
          <div v-if="requestJoinClass !== undefined">
            <h2 v-if="requestJoinClass.length > 0">Permintaan Bergabung</h2>
            <div v-if="requestJoinClass.length > 0" class="md:pr-10 pt-5 mb-10">
              <div
                v-for="(item, i) in requestJoinClass"
                :key="i"
                class="flex items-center bg-white border border-gray-200 rounded-lg shadow flex-row"
              >
                <div class="flex justify-between w-full p-2">
                  <p class="font-normal flex items-center capitalize">
                    {{ item.user_name }}
                  </p>
                  <div class="flex items-center">
                    <button
                      @click="acceptJoinClass(item.id_joinclass)"
                      type="button"
                      class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      Terima
                    </button>
                    <button
                      @click="rejectedJoinClass(item.id_joinclass)"
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
      </div>
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

import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/index";

const { authenticated, user, BASEAPIURL } = storeToRefs(useAuthStore());

const route = useRoute();
const router = useRouter();
const { data: dataClass, refresh: classRefresh } = await useFetch(
  BASEAPIURL.value + "/api/class/" + route.params.code
);

const { data: allStudents, refresh: studentsRefresh } = await useFetch(
  BASEAPIURL.value + "/api/joinclass/" + dataClass.value[0].id_class
);

const { data: requestJoinClass, refresh: requestRefresh } = await useFetch(
  BASEAPIURL.value +
    "/api/joinclass/get-students-request/" +
    dataClass.value[0].id_class
);

const successNotif = ref(false);
const failedNotif = ref(false);

const onDelete = async (code) => {
  const data = await $fetch(BASEAPIURL.value + "/api/class/" + code, {
    method: "DELETE",
  });

  toggleDeleteModal();

  if (data.affectedRows === 1) {
    successNotif.value = true;
  } else {
    failedNotif.value = true;
  }

  setTimeout(() => {
    router.push("/dashboard/class");
  }, 1000);
};

const successRemoveNotif = ref(false);
const failedRemoveNotif = ref(false);

const idRemove = ref();
const studentDelete = async () => {
  const data = await $fetch(
    BASEAPIURL.value + "/api/joinclass/" + idRemove.value,
    {
      method: "DELETE",
    }
  );

  if (data.affectedRows === 1) {
    successRemoveNotif.value = true;

    await useFetch(
      BASEAPIURL.value + "/api/class/update-students/" + route.params.code,
      {
        method: "PUT",
        body: {
          number_of_students: allStudents.value.length - 1,
        },
      }
    );

    setTimeout(() => {
      successRemoveNotif.value = false;
    }, 1000);
  } else {
    failedRemoveNotif.value = true;
  }

  studentsRefresh();
  toggleRemoveStudentModal();
};

const textBlock = ref(dataClass.value[0].class_code);
const copySuccess = ref(false);

const selectText = () => {
  navigator.clipboard.writeText(textBlock.value);
  copySuccess.value = true;

  setTimeout(() => {
    copySuccess.value = false;
  }, 3000);
};

const settings = ref(false);
const editModal = ref(false);
const deleteModal = ref(false);
const addModal = ref(false);
const removeStudentModal = ref(false);

const toggleSettings = () => {
  settings.value = !settings.value;
};

const toggleEditModal = () => {
  settings.value = false;
  editModal.value = !editModal.value;
};

const toggleAddModal = () => {
  addModal.value = !addModal.value;
};

const toggleDeleteModal = () => {
  deleteModal.value = !deleteModal.value;
};

const toggleRemoveStudentModal = (id) => {
  removeStudentModal.value = !removeStudentModal.value;
  idRemove.value = id;
};

const form = ref({
  name: dataClass.value[0].name,
  school_name: dataClass.value[0].school_name,
});

if (authenticated) {
  form.value.teacher = user.value.name;
}

const successEditNotif = ref(false);
const failedEditNotif = ref(false);

const editClass = async () => {
  try {
    const { data } = await useFetch(
      BASEAPIURL.value + "/api/class/" + route.params.code,
      {
        method: "PUT",
        body: form,
      }
    );

    toggleEditModal();

    if (data.value.affectedRows === 1) {
      successEditNotif.value = true;

      setTimeout(() => {
        successEditNotif.value = false;
      }, 1000);
    } else {
      failedEditNotif.value = true;
    }

    classRefresh();
  } catch (err) {
    console.error("Error:", err);
  }
};

const successJoinNotif = ref(false);

const acceptJoinClass = async (id) => {
  const response = await useFetch(BASEAPIURL.value + "/api/joinclass/" + id, {
    method: "PUT",
    body: {
      status: "accepted",
    },
  });

  if (response.data.value.affectedRows === 1) {
    successJoinNotif.value = true;
    setTimeout(() => {
      successJoinNotif.value = false;
    }, 1000);

    const { data: allStudents } = await useFetch(
      BASEAPIURL.value + "/api/joinclass/" + dataClass.value[0].id_class
    );

    if (allStudents) {
      await useFetch(
        BASEAPIURL.value + "/api/class/update-students/" + route.params.code,
        {
          method: "PUT",
          body: {
            number_of_students: allStudents.value.length,
          },
        }
      );
    }

    requestRefresh();
    studentsRefresh();
  }
};

const rejectedNotif = ref(false);

const rejectedJoinClass = async (id) => {
  const response = await useFetch(BASEAPIURL.value + "/api/joinclass/" + id, {
    method: "DELETE",
  });

  if (response.data.value.affectedRows === 1) {
    rejectedNotif.value = true;
    setTimeout(() => {
      rejectedNotif.value = false;
    }, 1000);
  }

  requestRefresh();
  studentsRefresh();
};

onMounted(() => {
  initFlowbite();
});
</script>

<style setup></style>
