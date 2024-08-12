<template>
  <div class="p-24 bg-gray-200">
    <h1>update data</h1>
    <div v-for="item in data" :key="item.id">
      <p>{{ item.id }}</p>
      <p>{{ item.nama }}</p>
    </div>
    <form @submit.prevent="">
      <input type="nama" v-model="form.nama" />
      <button @click="updateData">submit</button>
    </form>
  </div>
</template>

<script setup lang="ts">
const form = reactive({
  id: "",
  nama: "",
});

type User = {
  id: number;
  nama: string;
};

const data = ref<User[]>([]);

const fetchData = async () => {
  data.value = await $fetch("/api/user/" + route.params.id);
};

onMounted(fetchData);

const route = useRoute();
const router = useRouter();

const updateData = async () => {
  await $fetch("/api/user/" + route.params.id, {
    method: "PUT",
    body: form,
  });

  router.push("/");
};
</script>
