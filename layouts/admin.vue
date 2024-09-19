<template>
  <div>
    <Notif
      :is-active="notif"
      text="logout berhasil"
      color="green"
      link="/dashboard"
    />
    <div>
      <nav
        class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="px-3 py-3 lg:px-5 lg:pl-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center justify-start rtl:justify-end">
              <button
                @click="toggleSidebar"
                type="button"
                class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span class="sr-only">Open sidebar</span>
                <svg
                  class="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <NuxtLink to="/" class="flex ms-2 md:me-24">
                <img
                  src="/src/logo-edutajwid.png"
                  class="h-10"
                  alt="EduTajwid Logo"
                />
              </NuxtLink>
            </div>
            <div class="flex items-center">
              <div class="flex items-center ms-3">
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
                    <p class="hidden sm:block mr-5 capitalize">
                      {{ user.name }}
                    </p>
                    <img
                      class="w-8 h-8 rounded-full object-cover border border-gray-800"
                      :src="BASEAPIURL + '/uploads/' + user.image"
                      alt="user photo"
                    />
                  </button>
                  <span v-else>
                    <div class="hidden sm:block">
                      <NuxtLink class="mr-4" to="/users/login">Login</NuxtLink>
                      |
                      <NuxtLink class="ml-4" to="/users/register"
                        >Sign Up</NuxtLink
                      >
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
                        >{{ user.email }}</span
                      >
                    </div>
                    <ul class="py-2" aria-labelledby="user-menu-button">
                      <li>
                        <button
                          type="button"
                          @click="logout"
                          class="w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div
        v-if="isMobile"
        @click="toggleSidebar"
        :class="{ 'hidden ': !sidebarIsOpen }"
        class="w-full h-screen absolute top-0 left-0 bg-gray-700 bg-opacity-80 z-10"
      ></div>

      <aside
        id="logo-sidebar"
        :class="{ '-translate-x-full': !sidebarIsOpen }"
        class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul class="space-y-2 font-medium">
            <li>
              <NuxtLink
                to="/dashboard/admin"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                active-class="active-link"
              >
                <BootstrapIcon class="text-2xl" name="house-door" />
                <span class="ms-3">Home</span>
              </NuxtLink>
            </li>
            <li></li>
            <li>
              <NuxtLink
                to="/dashboard/admin/users"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                active-class="active-link"
              >
                <BootstrapIcon class="text-2xl" name="people" />
                <span class="ms-3">Pengguna</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/dashboard/admin/change-role-request"
                class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                active-class="active-link"
              >
                <BootstrapIcon class="text-2xl" name="brilliance" />
                <span class="ms-3">Permintaan Ubah Role</span>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </aside>

      <div class="p-4 sm:pl-72 lg:pl-72 pt-20 lg:pr-10">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store";
const route = useRoute();

const { logUserOut, loadTokenFromLocalStorage } = useAuthStore();
const { authenticated, user, BASEAPIURL } = storeToRefs(useAuthStore());
const notif = ref(false);
const accountDropdown = ref(false);

const toggleAccountDropdown = () => {
  accountDropdown.value = !accountDropdown.value;
};

const logout = () => {
  toggleAccountDropdown();
  notif.value = true;
  logUserOut();
};

// window size
const windowWidth = ref(0);
const isMobile = ref();
const handleResize = () => {
  if (process.client) {
    windowWidth.value = window.innerWidth;
  }
};

const sidebarIsOpen = ref(false);
const toggleSidebar = () => {
  sidebarIsOpen.value = !sidebarIsOpen.value;
};

watch(windowWidth, (newWidth) => {
  if (newWidth <= 768) {
    sidebarIsOpen.value = false;
    isMobile.value = true;
  } else {
    sidebarIsOpen.value = true;
    isMobile.value = false;
  }
});

watch(
  () => route.fullPath,
  (newPath, oldPath) => {
    if (newPath !== oldPath) {
      if (isMobile) {
        sidebarIsOpen.value = false;
      }
    }
  }
);

onMounted(() => {
  // window size
  if (process.client) {
    windowWidth.value = window.innerWidth;
    window.addEventListener("resize", handleResize);
  }
  loadTokenFromLocalStorage();
});
</script>

<style>
.active-link {
  background-color: rgb(243, 242, 242);
}
</style>
