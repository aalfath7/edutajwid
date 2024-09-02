<template>
  <div>
    <div class="my-5" data-accordion="collapse">
      <h2 :id="'accordion-collapse-heading-' + no">
        <button
          @click="toggleAccordian"
          type="button"
          class="rounded-lg shadow-sm flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3 capitalize"
        >
          <span class="text-start text-sm sm:text-base">{{ title }}</span>
          <div class="flex items-center">
            <BootstrapIcon
              v-if="isOpen"
              name="chevron-down"
              class="text-xl font-bold"
            />
            <BootstrapIcon v-else name="chevron-up" class="text-xl font-bold" />
          </div>
        </button>
      </h2>
      <div :class="{ 'hidden ': !isOpen }">
        <div class="rounded-lg p-5 border border-gray-200 dark:border-gray-700">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  no: Number,
  title: String,
  actived: Boolean,
});

const isOpen = ref(false);

watch(
  () => props.actived,
  async (newValue) => {
    if (newValue) {
      isOpen.value = newValue;
    }
  },
  { immediate: true }
);

const toggleAccordian = () => {
  isOpen.value = !isOpen.value;
};
</script>
