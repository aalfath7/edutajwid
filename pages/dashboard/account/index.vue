<template>
  <div>
    <Notif
      :is-active="successImageNotif"
      text="Gambar berhasil di ubah"
      type="success"
    />
    <Notif
      :is-active="successFileNotif"
      text="Permintaan menjadi Guru sudah terkirim"
      type="success"
    />
    <Notif
      :is-active="successNotif"
      text="Berhasil ubah data akun"
      type="success"
    />
    <Notif :is-active="failedNotif" text="Ubah data gagal" type="failed" />

    <!-- modal Image-->
    <div
      :class="imageModal ? '' : 'hidden'"
      class="fixed top-0 left-0 overflow-y-auto overflow-x-hidden z-50 flex justify-center items-center w-full md:inset-0 h-full max-h-full"
    >
      <div
        @click="toggleImageModal"
        class="absolute opacity-70 bg-gray-900 w-full h-full"
      ></div>
      <div class="relative p-4 w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div
            class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
          >
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Upload Gambar
            </h3>
            <button
              @click="toggleImageModal"
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
          <form @submit.prevent="uploadImage">
            <div class="px-4 pt-10">
              <!-- <img :src="'/src/users/' + dataUser.image" alt="" /> -->
              <input
                class="block w-full text-sm text-green-900 border border-green-300 rounded-lg cursor-pointer bg-green-50 dark:text-green-400 focus:outline-none"
                type="file"
                @change="onFileChange"
                accept="image/*"
              />
            </div>
            <div class="text-center px-4">
              {{ message }}
            </div>
            <div class="p-4">
              <button
                type="submit"
                class="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- modal Request to be Teacher-->
    <div
      :class="requestChangeRole ? '' : 'hidden'"
      class="fixed top-0 left-0 overflow-y-auto overflow-x-hidden z-50 flex justify-center items-center w-full md:inset-0 h-full max-h-full"
    >
      <div
        @click="toggleRequestChangeRole"
        class="absolute opacity-70 bg-gray-900 w-full h-full"
      ></div>
      <div class="relative p-4 w-full max-w-md max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div
            class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
          >
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Request to be Teacher
            </h3>
            <button
              @click="toggleRequestChangeRole"
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
          <p class="p-4">
            Lampirkan tanda pengenal, sertifikat, atau surat keterangan yang
            menandakan anda adalah guru.
          </p>
          <form @submit.prevent="uploadFile">
            <div class="px-4">
              <!-- <img :src="'/src/users/' + dataUser.image" alt="" /> -->
              <input
                class="block w-full text-sm text-green-900 border border-green-300 rounded-lg cursor-pointer bg-green-50 dark:text-green-400 focus:outline-none"
                type="file"
                @change="onFileChange"
              />
            </div>
            <div class="text-center px-4">
              {{ message }}
            </div>
            <div class="p-4">
              <button
                type="submit"
                class="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Kirim Permintaan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div v-if="dataUser" class="slit-in sm:ml-10 sm:mt-5 sm:max-w-md">
      <div class="flex items-center mb-10 relative">
        <div class="relative w-12 sm:w-32">
          <img
            :src="BASEAPIURL + '/uploads/' + dataUser.image"
            alt=""
            class="rounded-full border w-12 h-12 sm:h-32 sm:w-32 object-cover"
          />
          <BootstrapIcon
            @click="toggleImageModal"
            name="pencil-square"
            class="text-sm sm:text-2xl absolute bottom-0 right-0 sm:right-2 bg-white hover:text-gray-500 cursor-pointer"
          />
        </div>
        <div class="ml-10">
          <h1 class="text-sm font-bold">Profil</h1>
          <p class="capitalize font-bold text-xl sm:text-2xl">
            {{ dataUser.name }}
          </p>
          <p class="capitalize">{{ dataUser.role }}</p>
        </div>
        <button
          v-if="!changeRole && dataUser.role !== 'teacher'"
          @click="toggleSettings"
          type="button"
          class="absolute top-0 right-0 w-8 h-8 bg-white hover:text-gray-500 flex items-center justify-center"
        >
          <BootstrapIcon name="three-dots" class="text-2xl" />
        </button>

        <ul
          v-show="settings"
          class="z-30 absolute top-0 right-0 bg-white border px-2 rounded-lg shadow-lg"
        >
          <li class="flex justify-end">
            <button @click="toggleSettings" type="button">
              <BootstrapIcon class="text-2xl" name="x" />
            </button>
          </li>
          <li class="py-3 px-3 border-t hover:text-gray-500">
            <button @click="toggleRequestChangeRole" type="button">
              Request to be Teacher
            </button>
          </li>
        </ul>
      </div>
      <div v-if="updateForm">
        <div class="mb-5">
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Nama</label
          >
          <input
            v-model="updateForm.name"
            type="text"
            id="name"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 dark:shadow-sm-light"
            required
          />
        </div>
        <div class="mb-5">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Email</label
          >
          <input
            v-model="updateForm.email"
            type="email"
            id="email"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 dark:shadow-sm-light"
            required
          />
        </div>
        <div class="mb-5 relative">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Password</label
          >
          <input
            v-model="updateForm.password"
            :type="password"
            id="password"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 dark:shadow-sm-light"
            required
          />
          <BootstrapIcon
            v-if="password === 'password'"
            @click="togglePassword"
            name="eye-slash"
            class="text-2xl absolute bottom-1 right-2 cursor-pointer"
          />
          <BootstrapIcon
            v-else
            @click="togglePassword"
            name="eye"
            class="text-2xl absolute bottom-1 right-2 cursor-pointer"
          />
        </div>
        <button
          @click="update"
          type="button"
          class="mt-5 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Update Akun
        </button>
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
const { authenticated, user, changeRole, BASEAPIURL } = storeToRefs(
  useAuthStore()
);
const { setRequestChangeRole } = useAuthStore();

const dataUser = ref();

const updateForm = ref({
  name: "",
  email: "",
  password: "",
});

watch(
  () => user.value.id_user,
  async (newId) => {
    if (newId) {
      const { data } = await useFetch(BASEAPIURL.value + "/api/users/" + newId);
      dataUser.value = data.value[0];

      updateForm.value.name = dataUser.value.name;
      updateForm.value.email = dataUser.value.email;
      updateForm.value.password = dataUser.value.password;
    }
  },
  { immediate: true }
);

const password = ref("password");
const togglePassword = () => {
  password.value = password.value === "password" ? "text" : "password";
};

const successNotif = ref(false);
const failedNotif = ref(false);

const update = async () => {
  const { data } = await useFetch(
    BASEAPIURL.value + "/api/users/" + dataUser.value.id_user,
    {
      method: "PUT",
      body: updateForm,
    }
  );
  if (data.value.affectedRows === 1) {
    successNotif.value = true;
    setTimeout(() => {
      successNotif.value = false;
    }, 1000);

    const { data: updateData } = await useFetch(
      BASEAPIURL.value + "/api/users/" + dataUser.value.id_user
    );
    dataUser.value = updateData.value[0];
    console.log(dataUser.value);
  } else {
    failedNotif.value = true;
    setTimeout(() => {
      failedNotif.value = false;
    }, 1000);
  }
};

const imageModal = ref(false);

const toggleImageModal = () => {
  imageModal.value = !imageModal.value;
  settings.value = false;
};

const selectedFile = ref();
const message = ref("");

function onFileChange(event) {
  const target = event.target;
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0];
  }
}

const successImageNotif = ref(false);

const uploadImage = async () => {
  if (!selectedFile.value) {
    message.value = "Masukkan file terlebih dahulu!";
    return;
  }

  const formData = new FormData();
  formData.append("file", selectedFile.value);

  const response = await $fetch(
    BASEAPIURL.value + "/api/upload/" + dataUser.value.id_user,
    {
      method: "PUT",
      body: formData,
    }
  );

  successImageNotif.value = true;
  setTimeout(() => {
    successImageNotif.value = false;
  }, 1000);

  imageModal.value = false;
};

const successFileNotif = ref(false);

const uploadFile = async () => {
  console.log(selectedFile.value);
  if (!selectedFile.value) {
    message.value = "Masukkan file terlebih dahulu!";
    return;
  }

  const formData = new FormData();
  formData.append("file", selectedFile.value);

  const response = await $fetch(
    BASEAPIURL.value + "/api/upload-file/" + dataUser.value.id_user,
    {
      method: "PUT",
      body: formData,
    }
  );

  successFileNotif.value = true;
  setTimeout(() => {
    successFileNotif.value = false;
  }, 1000);

  setRequestChangeRole();
  requestChangeRole.value = false;
};

const settings = ref(false);

const toggleSettings = () => {
  settings.value = !settings.value;
};

const requestChangeRole = ref(false);

const toggleRequestChangeRole = () => {
  requestChangeRole.value = !requestChangeRole.value;
  settings.value = false;
};

onMounted(() => {
  initFlowbite();
});
</script>
