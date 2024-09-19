<template>
  <div>
    <Notif :is-active="notif" text="logout berhasil" color="green" />

    <nav class="border-gray-200 shadow fixed z-10 w-full bg-white">
      <div
        class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
      >
        <a href="" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="/src/logo-edutajwid.png"
            class="h-10"
            alt="EduTajwid Logo"
          />
        </a>
        <div
          class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse"
        >
          <div
            @click="toggleAccountDropdown"
            :class="{ 'hidden ': !accountDropdown }"
            class="w-full h-screen absolute top-0 left-0"
          ></div>
          <div class="relative">
            <button
              @click="toggleAccountDropdown"
              v-if="authenticated"
              type="button"
              class="ms-10 flex items-center text-sm rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            >
              <span class="sr-only">Open user menu</span>
              <p v-if="_user" class="hidden sm:block mr-5 capitalize">
                {{ _user.name }}
              </p>
              <img
                v-if="_user"
                class="w-8 h-8 rounded-full object-cover border border-gray-800"
                :src="BASEAPIURL + '/uploads/' + _user.image"
                alt="user photo"
              />
            </button>
            <span v-else>
              <div class="hidden sm:block">
                <NuxtLink class="mr-4" to="/users/login">Login</NuxtLink>
                |
                <NuxtLink class="ml-4" to="/users/register">Sign Up</NuxtLink>
              </div>
              <div class="sm:hidden">
                <NuxtLink class="mr-4" to="/users/login">Login</NuxtLink>
              </div>
            </span>
            <!-- Dropdown menu -->
            <div
              v-if="_user"
              :class="{ 'hidden ': !accountDropdown }"
              class="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute right-0"
            >
              <div class="px-4 py-3">
                <span
                  class="block text-sm text-gray-900 dark:text-white"
                ></span>
                <span
                  class="block text-sm text-gray-500 truncate dark:text-gray-400"
                  >{{ _user.email }}
                </span>
              </div>
              <ul class="py-2" aria-labelledby="user-menu-button">
                <li>
                  <NuxtLink
                    to="/dashboard/account"
                    class="w-full block text-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    <button @click="accountDropdown = false" type="button">
                      Kelola Akun
                    </button>
                  </NuxtLink>
                </li>
                <li>
                  <button
                    type="button"
                    @click="logout"
                    class="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Keluar
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <slot />
  </div>
</template>

<script setup>
import { initFlowbite } from "flowbite";
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/index";

const { logUserOut, loadTokenFromLocalStorage } = useAuthStore();
const { authenticated, user, BASEAPIURL } = storeToRefs(useAuthStore());
const notif = ref(false);
const accountDropdown = ref(false);

const _user = ref();

watch(
  () => user.value.id_user,
  async (newId) => {
    if (newId) {
      const { data } = await useFetch(BASEAPIURL.value + "/api/users/" + newId);
      _user.value = data.value[0];
    }
  },
  { immediate: true }
);

const toggleAccountDropdown = () => {
  accountDropdown.value = !accountDropdown.value;
};

const logout = () => {
  accountDropdown.value = false;
  notif.value = true;
  logUserOut();
};

onMounted(() => {
  initFlowbite();
  loadTokenFromLocalStorage();
});
</script>

<style></style>
