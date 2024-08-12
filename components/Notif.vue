<template>
  <div
    :style="{ transform: translate }"
    class="notif fixed z-50 left-0 top-0 sm:px-12 pt-10 w-full h-screen flex justify-center duration-150 bg-gradient-to-b from-gray-100 to-transparent"
  >
    <div
      id="alert-1"
      :class="
        type == 'success'
          ? 'text-green-800 bg-green-100'
          : 'text-red-800 bg-red-100'
      "
      class="w-3/4 h-24 flex items-center px-4 py-8 mb-4 text-green-800 rounded-lg bg-green-100 shadow-xl"
      role="alert"
    >
      <svg
        class="flex-shrink-0 w-4 h-4"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
        />
      </svg>
      <span class="sr-only">Info</span>
      <div class="ms-3 text-sm font-medium">{{ props.text }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  isActive: {
    type: Boolean,
    default: true,
  },
  link: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "success",
  },
  text: {
    type: String,
    default: "Progress Success",
  },
});

const router = useRouter();
const translate = ref("translateY(-200%)");
const type = ref();
type.value = props.type;

watchEffect(() => {
  if (props.isActive) {
    translate.value = "translateY(0)";
    setTimeout(() => {
      translate.value = "translateY(-200%)";
      setTimeout(() => {
        router.push(props.link);
      }, 500);
    }, 1000);
  } else {
    translate.value = "translateY(-200%)";
  }
});
</script>

<style>
.notif {
  z-index: 100;
}
</style>
