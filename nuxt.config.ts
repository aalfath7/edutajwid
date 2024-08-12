// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-bootstrap-icons",
    "@nuxtjs/google-fonts",
    "@pinia/nuxt",
  ],
  googleFonts: {
    families: {
      // "Signika+Negative": [400, 700],
    },
    display: "swap",
  },
  bootstrapIcons: {
    renderType: "inline", // or 'inline' (which is the default)
  },
  css: ["~/assets/css/main.css"],
  plugins: ["~/plugins/init-store.ts"],
});
