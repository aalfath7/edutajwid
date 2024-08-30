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
          <!-- <button
            type="button"
            @click="searchForm = !searchForm"
            v-if="searchForm === true"
            class="kaca fixed left-0 top-0 h-full w-full opacity-75 bg-gray-600 cursor-default"
          ></button>
          <form
            v-if="searchForm"
            class="fixed w-full left-0 md:static top-5 px-6"
          >
            <label
              for="search"
              class="text-sm font-medium text-gray-900 sr-only dark:text-white"
              >Search</label
            >
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="search"
                class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
                required
              />
            </div>
          </form>
          <div v-else class="px-5 flex items-center">
            <button
              type="button"
              class="px-2 py-3 rounded-lg hover:bg-gray-100"
              @click="searchForm = !searchForm"
            >
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </button>
          </div> -->
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
              <p class="hidden sm:block mr-5 capitalize">{{ user.name }}</p>
              <img
                class="w-8 h-8 rounded-full object-cover border border-gray-800"
                :src="'/src/users/' + user.image"
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
              :class="{ 'hidden ': !accountDropdown }"
              class="z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 absolute right-0"
            >
              <div class="px-4 py-3">
                <span
                  class="block text-sm text-gray-900 dark:text-white"
                ></span>
                <span
                  class="block text-sm text-gray-500 truncate dark:text-gray-400"
                  >{{ user.email }}
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
          <!-- <button
            data-collapse-toggle="navbar-user"
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button> -->
        </div>
        <!-- <div
          class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul
            class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
          >
            <li>
              <a
                href="#"
                class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                aria-current="page"
                >Home</a
              >
            </li>
            <li>
              <a
                href="#"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >About</a
              >
            </li>
            <li>
              <a
                href="#"
                class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >Contact</a
              >
            </li>
          </ul>
        </div> -->
      </div>
    </nav>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { initFlowbite } from "flowbite";
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/index";

const { logUserOut, loadTokenFromLocalStorage } = useAuthStore();
const searchForm = ref(false);
const { authenticated, user } = storeToRefs(useAuthStore());
const notif = ref(false);
const accountDropdown = ref(false);

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
