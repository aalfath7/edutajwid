<template>
  <div>
    <NuxtLink class="text-2xl" to="/">add subbab</NuxtLink>
    <form class="mt-20" @submit.prevent="">
      <div class="relative z-0 w-full mb-5 group">
        <input
          type="text"
          v-model="form.bab"
          id="floating_email"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          for="floating_email"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Bab</label
        >
      </div>

      <button
        type="submit"
        @click="() => addData()"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
const form = reactive({
  id: "",
  bab: "",
});

const router = useRouter();

const addData = async () => {
  await $fetch("/api/lesson", {
    method: "POST",
    body: form,
  });

  router.push("/dashboard");
};
</script>
