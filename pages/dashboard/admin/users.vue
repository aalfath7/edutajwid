<template>
  <div>
    <Notif
      :is-active="successNotif"
      text="Hapus Pengguna Berhasil"
      type="success"
    />
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
            <th scope="col" class="px-6 py-3">Role</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(user, i) in allData"
            :key="i"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <td class="px-6 py-4">{{ i + 1 }}</td>
            <td class="px-6 py-4 capitalize">{{ user.name }}</td>
            <td class="px-6 py-4">{{ user.email }}</td>
            <td class="px-6 py-4 capitalize">{{ user.role }}</td>
            <td class="px-6 py-4 capitalize">
              <button
                v-if="user.role !== 'admin'"
                type="button"
                @click="deleteUser(user.id_user)"
                class="font-medium text-red-600 dark:text-red-500 hover:underline"
              >
                Hapus
              </button>
            </td>
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
  BASEAPIURL.value + "/api/users"
);

const successNotif = ref(false);

const deleteUser = async (id) => {
  const { data } = await useFetch(BASEAPIURL.value + "/api/users/" + id, {
    method: "DELETE",
  });
  if (data.value.affectedRows === 1) {
    successNotif.value = true;
    setTimeout(() => {
      successNotif.value = false;
    }, 1000);
    refreshData();
  }
};

onMounted(() => {
  initFlowbite();
});
</script>
