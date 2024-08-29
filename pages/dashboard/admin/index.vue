<template>
  <div>
    <h1>Selamat Datang Admin</h1>
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

onMounted(() => {
  initFlowbite();
});
</script>
