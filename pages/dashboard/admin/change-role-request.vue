<template>
  <div>
    <Notif
      :is-active="acceptedNotif"
      text="Permintaan ubah role diterima"
      type="success"
    />
    <Notif
      :is-active="rejectedNotif"
      text="Permintaan ubah role ditolak"
      type="success"
    />
    <!-- modal Image-->
    <div
      :class="modal ? '' : 'hidden'"
      class="fixed top-0 left-0 overflow-y-auto overflow-x-hidden z-50 flex justify-center items-center w-full md:inset-0 h-full max-h-full"
    >
      <div
        @click="toggleModal"
        class="absolute opacity-70 bg-gray-900 w-full h-full"
      ></div>
      <div class="relative p-4 w-full w-full lg:w-2/3 h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div
            class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
          >
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Dokumen
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
          <div v-if="file" class="p-4">
            <embed
              :src="BASEAPIURL + '/uploads/' + file"
              width="100%"
              height="600px"
              style="border: none"
            />
          </div>
        </div>
      </div>
    </div>
    <h1 class="mb-5">Permintaan Ubah Role menjadi Guru</h1>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3 w-3">No</th>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Email</th>
            <th scope="col" class="px-6 py-3">Document</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody v-if="allData.length > 0">
          <tr
            v-for="(user, i) in allData"
            :key="i"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <td class="px-6 py-4">{{ i + 1 }}</td>
            <td class="px-6 py-4 capitalize">{{ user.name }}</td>
            <td class="px-6 py-4">{{ user.email }}</td>
            <td class="pl-10 py-4 capitalize">
              <button
                @click="toggleModal(user.file)"
                type="button"
                class="font-medium text-yellow-600 dark:text-yellow-500 hover:underline"
              >
                File
              </button>
            </td>
            <td class="px-6 py-4 capitalize">
              <div class="flex">
                <button
                  type="button"
                  @click="acceptedUser(user.id_user)"
                  class="font-medium text-green-600 dark:text-green-500 hover:underline"
                >
                  Setujui
                </button>
                <button
                  type="button"
                  @click="rejectedUser(user.id_user)"
                  class="ml-5 font-medium text-red-600 dark:text-red-500 hover:underline"
                >
                  Tolak
                </button>
              </div>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="5" class="p-4">Belum ada permintaan</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "EduTajwid - Admin",
});
definePageMeta({
  layout: "admin",
});
import { initFlowbite } from "flowbite";
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/index";
const { BASEAPIURL } = storeToRefs(useAuthStore());

const { data: allData, refresh: refreshData } = await useFetch(
  BASEAPIURL.value + "/api/request-change-role"
);

const acceptedNotif = ref(false);
const rejectedNotif = ref(false);

const acceptedUser = async (id) => {
  const response = await $fetch(
    BASEAPIURL.value + "/api/users/change-role/" + id,
    {
      method: "PUT",
    }
  );
  if (response.affectedRows === 1) {
    acceptedNotif.value = true;
    setTimeout(() => {
      acceptedNotif.value = false;
    }, 1000);
    refreshData();
  }
};

const rejectedUser = async (id) => {
  const response = await $fetch(
    BASEAPIURL.value + "/api/users/rejected/" + id,
    {
      method: "PUT",
    }
  );
  if (response.affectedRows === 1) {
    rejectedNotif.value = true;
    setTimeout(() => {
      rejectedNotif.value = false;
    }, 1000);
    refreshData();
  }
};

const modal = ref(false);

const toggleModal = (filename) => {
  modal.value = !modal.value;
  file.value = filename;
};

const file = ref("");

onMounted(() => {
  initFlowbite();
});
</script>
