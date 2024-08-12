<template>
  <div>
    <div class="mt-5 mb-10">
      <div>
        <h1
          :class="bg"
          class="capitalize sticky top-20 px-4 py-5 text-gray-700 border shadow-lg rounded-lg sm:flex sm:px-5"
        >
          {{ title }}
        </h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String,
});
let bg: string;
if (props.title === "Alif - Basic Level") {
  bg = "bg-blue-200 border-blue-200";
} else if (props.title === "Ba' - Medium Level") {
  bg = "bg-green-200 border-green-200";
} else {
  bg = "bg-yellow-200 border-yellow-200";
}
</script>
