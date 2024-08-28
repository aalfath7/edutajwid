<template>
  <div class="flex justify-center items-center h-screen w-full flex-col">
    <img src="/src/logo-edutajwid.png" alt="" class="h-12" />
    <h1>{{ message }}</h1>
    <NuxtLink to="/dashboard" class="underline text-green-500"
      >ke Dashboard</NuxtLink
    >
  </div>
</template>

<script setup>
useHead({
  title: "Verification Email - EduTajwid",
});

definePageMeta({
  middleware: "auth",
});
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/index";
const { authenticatedUser } = useAuthStore();
const { authenticated } = storeToRefs(useAuthStore());
const route = useRoute();
const message = ref();

const dataUser = await $fetch("/api/users/token/" + route.params.token);

const { results } = await $fetch(
  "/api/users/email-verify/" + route.params.token,
  {
    method: "PUT",
    body: {
      email_verify: 1,
    },
  }
);
if (results.affectedRows === 1) {
  message.value = "Email has been verified";

  const user = ref({
    email: dataUser.results[0].email,
    password: dataUser.results[0].password,
  });

  await authenticatedUser(user.value);
} else {
  message.value = "Email not registered";
}
</script>
