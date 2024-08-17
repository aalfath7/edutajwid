<template>
  <div
    :class="
      status === 'upcoming' ? 'cursor-not-allowed pointer-events-none' : ''
    "
  >
    <NuxtLink :to="link">
      <button
        :id="materi"
        type="button"
        class="rounded-lg shadow-sm flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3 mb-3"
      >
        <span class="capitalize text-start text-sm sm:text-base">{{
          materi
        }}</span>
        <BootstrapIcon
          v-if="status === 'done'"
          class="text-2xl text-green-700"
          name="shield-check"
        />
        <BootstrapIcon
          v-if="status === 'upcoming'"
          class="text-2xl"
          name="lock-fill"
        />
      </button>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps({
  materi: String,
  link: String,
  enable: {
    type: Boolean,
    default: false,
  },
  status: String,
});
</script>
