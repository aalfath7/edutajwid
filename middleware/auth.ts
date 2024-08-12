import { useAuthStore } from "~/store";
import { storeToRefs } from "pinia";

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();
  const { authenticated, token, user } = storeToRefs(authStore);

  if (token.value) {
    if (to.path === "/users/login" || to.path === "/users/register") {
      return navigateTo("/");
    }
  } else {
    if (to.path === "/class") {
      return navigateTo("/");
    }
  }
});
