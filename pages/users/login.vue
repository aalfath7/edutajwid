<template>
  <div>
    <Notif
      :is-active="successNotif"
      text="login berhasil"
      type="success"
      link="/"
    />
    <Notif
      :is-active="failedNotif"
      text="Email atau password salah"
      type="failed"
      link="/users/login"
    />

    <div
      v-if="!loading"
      class="px-2 flex flex-col justify-center items-center h-screen lg:h-screen bg-cover bg-orange-300 bg-gradient-to-r from-orange-300 to-green-300"
    >
      <div
        class="glass z-50 flex flex-col justify-center items-center bg-white px-5 rounded-lg shadow-lg w-full sm:max-w-md py-5"
      >
        <div class="flex justify-start w-full">
          <NuxtLink to="/"> <BootstrapIcon name="arrow-left" />home</NuxtLink>
        </div>
        <h1 class="text-3xl mb-10 text-green-700 font-bold">Login</h1>
        <form class="w-full md:w-96" @submit.prevent="login">
          <div class="relative z-0 w-full mb-10 group">
            <input
              v-model="user.email"
              type="email"
              name="email"
              id="email"
              class="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-black appearance-none dark:text-white dark:border-black dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              for="email"
              class="peer-focus:font-medium absolute text-sm text-black dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Email</label
            >
          </div>
          <div class="relative z-0 w-full mb-10 group">
            <input
              v-model="user.password"
              :type="password"
              name="floating_password"
              id="floating_password"
              class="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-black appearance-none dark:text-white dark:border-black dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              for="floating_password"
              class="peer-focus:font-medium absolute text-sm text-black dark:text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Password</label
            >
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
          <div class="w-full mt-10">
            <button
              type="submit"
              class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Login
            </button>
          </div>
          <div class="pt-10 flex justify-center">
            Dont have an account?
            <NuxtLink
              to="/users/register"
              class="ml-2 text-green-700 underline"
            >
              Sign Up here
            </NuxtLink>
          </div>
        </form>
      </div>
    </div>
    <div v-else>
      <Loading :is-loading="true" />
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "login - EduTajwid",
  htmlAttrs: {
    lang: "id",
  },
});

definePageMeta({
  middleware: "auth",
});

import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/index";
const { authenticatedUser } = useAuthStore();
const { authenticated } = storeToRefs(useAuthStore());
const router = useRouter();

const user = ref({
  email: "",
  password: "",
});

const successNotif = ref(false);
const failedNotif = ref(false);
const loading = ref(false);

const login = async () => {
  await authenticatedUser(user.value);

  loading.value = true;

  if (authenticated.value === true) {
    loading.value = false;
    successNotif.value = true;

    setTimeout(() => {
      successNotif.value = false;
      router.push("/");
    }, 1000);
  } else {
    loading.value = false;
    failedNotif.value = true;
    user.value.name = "";
    user.value.password = "";

    setTimeout(() => {
      failedNotif.value = false;
    }, 1000);
  }
};

const password = ref("password");
const togglePassword = () => {
  password.value = password.value === "password" ? "text" : "password";
};
</script>

<style setup>
.glass {
  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.41);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(13.3px);
  -webkit-backdrop-filter: blur(13.3px);
  border: 1px solid rgba(255, 255, 255, 0.54);
}
</style>
