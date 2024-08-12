<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { initFlowbite } from "flowbite";
onMounted(() => {
  initFlowbite();
});
</script>
