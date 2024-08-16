<template>
  <div>
    <Notif :is-active="notifSuccess" text="Buat Akun Berhasil" />
    <Notif
      :is-active="notifDuplicate"
      text="Email sudah terdaftar"
      type="not success"
    />
    <Notif
      :is-active="notifNotSuccess"
      text="Buat Akun Gagal"
      type="not success"
    />
    <div
      class="flex flex-col justify-center items-center px-2 h-screen lg:h-screen bg-cover bg-orange-300 bg-[url('/src/bg_login.jpg')]"
    >
      <div
        class="bg-gradient-to-r from-orange-300 to-green-300 opacity-80 w-full h-full absolute z-10"
      ></div>
      <img
        src="/src/icon.png"
        alt=""
        class="w-96 h-96 opacity-90 fixed -right-32 -bottom-20 -rotate-12 saturate-100"
      />
      <div
        class="glass z-50 flex flex-col justify-center items-center bg-white rounded-lg shadow-lg w-full sm:max-w-md py-5 px-5"
      >
        <div class="flex justify-start w-full">
          <NuxtLink to="/"> <BootstrapIcon name="arrow-left" />home</NuxtLink>
        </div>
        <h1 class="text-3xl mb-10 font-bold text-green-700">Sign Up</h1>

        <form class="w-full sm:w-96" @submit.prevent="addData">
          <div class="relative z-0 w-full mb-5 group">
            <input
              v-model="form.name"
              type="text"
              name="name"
              id="name"
              class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-500 appearance-none dark:text-white dark:border-gray-500 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              for="name"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Name</label
            >
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <input
              v-model="form.email"
              type="email"
              name="floating_email"
              id="floating_email"
              class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-500 appearance-none dark:text-white dark:border-gray-500 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              for="floating_email"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Email address</label
            >
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <label for="underline_select" class="sr-only"
              >Underline select</label
            >
            <select
              v-model="form.role"
              id="underline_select"
              class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-500 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-500 peer cursor-pointer"
            >
              <option value="" selected disabled>Role</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <input
              v-model="form.password"
              type="password"
              name="floating_password"
              id="floating_password"
              class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-500 appearance-none dark:text-white dark:border-gray-500 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              for="floating_password"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Password</label
            >
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <input
              v-model="confirmPass"
              type="password"
              name="repeat_password"
              id="floating_repeat_password"
              class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-500 appearance-none dark:text-white dark:border-gray-500 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
              required
            />
            <label
              for="floating_repeat_password"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Confirm password</label
            >
          </div>
          <div v-show="passwordNotSame" class="text-sm italic text-red-800">
            Password tidak sesuai
          </div>
          <div class="pt-8">
            <button
              type="submit"
              class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Sign Up
            </button>
          </div>
          <div class="flex py-5 justify-center">
            Already have an account?
            <NuxtLink to="/users/login" class="ml-2 underline text-green-700"
              >Login</NuxtLink
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "Register - Hijai",
});

definePageMeta({
  middleware: "auth",
});

import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/index";
const { authenticatedUser } = useAuthStore();
const { authenticated } = storeToRefs(useAuthStore());
const router = useRouter();
const confirmPass = ref();
const notifSuccess = ref(false);
const notifDuplicate = ref(false);
const notifNotSuccess = ref(false);
const passwordNotSame = ref(false);

const form = reactive({
  id: "",
  name: "",
  email: "",
  password: "",
  role: "",
});

const addData = async () => {
  if (form.password === confirmPass.value) {
    passwordNotSame.value = false;
    try {
      const { results, error } = await $fetch("/api/users", {
        method: "POST",
        body: form,
      });

      if (results) {
        notifSuccess.value = true;

        setTimeout(() => {
          login();
        }, 1000);
      } else if (error.code === "ER_DUP_ENTRY") {
        notifDuplicate.value = true;

        setTimeout(() => {
          notifDuplicate.value = false;
        }, 1000);
      } else {
        notifNotSuccess.value = true;

        setTimeout(() => {
          notifNotSuccess.value = false;
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    passwordNotSame.value = true;
  }
};

const login = async () => {
  await authenticatedUser({
    email: form.email,
    password: form.password,
  });

  if (authenticated) {
    router.push("/");
  }
};

import { initFlowbite } from "flowbite";
onMounted(() => {
  initFlowbite();
});
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
