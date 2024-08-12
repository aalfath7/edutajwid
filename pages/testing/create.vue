<template>
  <div class="p-24">
    <NuxtLink class="text-2xl" to="/"
      ><BootstrapIcon class="text-3xl" name="arrow-left-circle"
    /></NuxtLink>
    <form class="mt-20" @submit.prevent="">
      <label
        for="first_name"
        class="block mb-2 text-sm font-medium text-gray-900"
        >First name</label
      >
      <input
        type="text"
        id="first_name"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
        placeholder="John"
        v-model="form.nama"
        required
      />
      <button
        type="submit"
        @click="() => addData()"
        class="ml-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
const form = reactive({
  id: "",
  nama: "",
});

const router = useRouter();

const addData = async () => {
  await $fetch("/api/user", {
    method: "POST",
    body: form,
  });

  router.push("/");
};
</script>
