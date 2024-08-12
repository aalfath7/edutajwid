<template>
  <div>
    <NuxtLink
      to="/dashboard/"
      class="inline-flex justify-center items-center py-2.5 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
    >
      +
    </NuxtLink>
    <div v-for="item in allData" :key="item.id">
      <Accordian :no="item.id" :title="item.bab">
        <Accordian :no="'-' + item.id" title="subbab">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam amet
          sapiente quaerat, eligendi laboriosam officia ducimus neque hic maxime
          debitis? Ducimus repudiandae sed id excepturi optio enim a magnam
          repellat.
        </Accordian>
        <Accordian :no="'--' + item.id" title="subbab">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam amet
          sapiente quaerat, eligendi laboriosam officia ducimus neque hic maxime
          debitis? Ducimus repudiandae sed id excepturi optio enim a magnam
          repellat.
        </Accordian>
        <button
          class="ml-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          @click="() => onDelete(item.id)"
        >
          <BootstrapIcon name="trash3-fill" />
        </button>
      </Accordian>
    </div>
  </div>
</template>

<script setup lang="ts">
import { initFlowbite } from "flowbite";
useHead({
  title: "Learn | BelajarTajwid",
});

const { data: allData, refresh: allRefresh } = await useFetch("/api/lesson");

const onDelete = async (id: number) => {
  await $fetch("/api/lesson/" + id, {
    method: "DELETE",
  });

  allRefresh();
};

onMounted(() => {
  initFlowbite();
});
</script>
