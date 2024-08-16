<template>
  <div>
    <div class="my-5" data-accordion="collapse">
      <h2 :id="'accordion-collapse-heading-' + no">
        <button
          @click="toggleAccordian"
          type="button"
          class="rounded-lg shadow-sm flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3 capitalize"
          :data-accordion-target="'#accordion-collapse-body-' + no"
          :aria-expanded="$props.actived"
          :aria-controls="'accordion-collapse-body-' + no"
        >
          <span>{{ title }}</span>
          <svg
            data-accordion-icon
            class="w-3 h-3 shrink-0"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div
        :id="'accordion-collapse-body-' + no"
        :class="{ 'hidden ': !isOpen }"
        :aria-labelledby="'accordion-collapse-heading-' + no"
      >
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
