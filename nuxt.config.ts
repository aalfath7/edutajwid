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
        }, // Ganti dengan URL gambar thumbnail
        { property: "og:url", content: "https://edutajwid.com" },
      ],
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
