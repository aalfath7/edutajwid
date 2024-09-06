<template>
  <div class="sm:ml-5">
    <div class="flex flex-col items-center p-4">
      <div
        id="certificate"
        class="p-2 md:p-6 shadow-lg relative overflow-hidden certificate"
      >
        <div class="text-center z-50">
          <img
            src="/src/logo-edutajwid.png"
            alt=""
            class="h-5 md:h-10 mx-auto"
          />
          <h1 class="text-xl md:text-5xl font-bold mb-1 md:mb-4">Sertifikat</h1>
          <p class="text-xs md:text-base mb-1 md:mb-4">Diberikan kepada :</p>
          <h2
            class="text-base md:text-2xl font-semibold mb-1 md:mb-4 capitalize"
          >
            {{ userName }}
          </h2>
          <div class="flex justify-center">
            <p class="text-xs md:text-base mb-1 sm:mb-2 max-w-md">
              Telah berhasil menyelesaikan pembelajaran Tajwid Alquran dengan
              nilai akhir : {{ average }}, predikat : {{ predicate }}.
            </p>
          </div>
          <div class="flex justify-center">
            <table>
              <tr>
                <td class="border border-gray-400 p-1 text-xs">Basic Level</td>
                <td class="border border-gray-400 p-1 text-xs">Medium Level</td>
                <td class="border border-gray-400 p-1 text-xs">
                  Advanced Level
                </td>
              </tr>
              <tr>
                <td class="border border-gray-400 p-1 text-xs">
                  {{ gradeBasic }}
                </td>
                <td class="border border-gray-400 p-1 text-xs">
                  {{ gradeMedium }}
                </td>
                <td class="border border-gray-400 p-1 text-xs">
                  {{ gradeAdvanced }}
                </td>
              </tr>
            </table>
          </div>
        </div>
        <img
          src="/src/certificate-background.jpg"
          alt=""
          class="absolute top-0 left-0 bg h-full object-cover opacity-30 md:opacity-100"
        />
      </div>
      <div class="mt-6">
        <button
          @click="downloadCertificate"
          class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Unduh Sertifikat
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "EduTajwid - Belajar Tajwid Dengan Mudah",
});

definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});

import { initFlowbite } from "flowbite";
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/index";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
const { authenticated, user, BASEAPIURL } = storeToRefs(useAuthStore());
const {} = useAuthStore();
const router = useRouter();

const userName = ref(user.value.name);
const gradeMedium = ref();
const gradeBasic = ref();
const gradeAdvanced = ref();
const average = ref();
const predicate = ref();

watch(
  () => user.value.id_user,
  async (newId) => {
    if (newId) {
      const { data } = await useFetch(BASEAPIURL.value + "/api/users/" + newId);

      gradeBasic.value = JSON.parse(data.value[0].exam)[0];
      gradeMedium.value = JSON.parse(data.value[0].exam)[1];
      gradeAdvanced.value = JSON.parse(data.value[0].exam)[2];

      average.value = Math.floor(
        (gradeBasic.value + gradeMedium.value + gradeAdvanced.value) / 3
      );
      if (average.value >= 60) {
        predicate.value = "Baik";
      } else if (average.value >= 80) {
        predicate.value = "Baik Sekali";
      } else {
        predicate.value = "cukup";
      }
    }
  },
  { immediate: true }
);

const downloadCertificate = async () => {
  const element = document.getElementById("certificate");
  const canvas = await html2canvas(element, {
    scale: 4,
  });
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("l", "mm", "a4");
  const margin = 1;
  const imgWidth = 297 - 1 * margin;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  const pageHeight = 220 - 1 * margin;
  let heightLeft = imgHeight;

  let position = margin;
  pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft >= 0) {
    position = heightLeft - imgHeight + margin;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save("sertifikat.pdf");
};

onMounted(() => {
  initFlowbite();
});
</script>

<style setup>
.certificate {
  height: 420px;
  width: 590px;
}

@media only screen and (max-width: 775px) {
  .certificate {
    height: 210px;
    width: 295px;
  }
}

.bg {
  z-index: -1;
}
</style>
