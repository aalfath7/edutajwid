// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      meta: [
        {
          name: "description",
          content:
            "Jadilah salah satu Keluarga Allah SWT dengan mempelajari Ilmu Tajwid Al-Quran.",
        },
        {
          property: "og:title",
          content: "Belajar Ilmu Tajwid Al-Quran",
        },
        {
          property: "og:description",
          content:
            "Jadilah salah satu Keluarga Allah SWT dengan mempelajari Ilmu Tajwid Al-Quran.",
        },
        {
          property: "og:image",
          content: "https://edutajwid.com/src/logo-edutajwid.png",
        },
        { property: "og:url", content: "https://edutajwid.com" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-bootstrap-icons",
    "@nuxtjs/google-fonts",
    "@pinia/nuxt",
  ],
  googleFonts: {
    families: {
      "Signika+Negative": true,
      Amiri: true,
    },
    display: "swap",
  },
  bootstrapIcons: {
    renderType: "inline",
  },
  css: ["~/assets/css/main.css"],
});
