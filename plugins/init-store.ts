import { defineNuxtPlugin } from "#app";
import { useAuthStore } from "~/store/index";

export default defineNuxtPlugin(async (nuxtApp) => {
  const authStore = useAuthStore();
});
