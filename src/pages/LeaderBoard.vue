<script setup>
import { computed, onBeforeMount, reactive, ref } from "vue";

let listUsersData = ref([]);
async function listByMostLike() {
  try {
    const responseData = await fetch("http://localhost:5000/users");
    listUsersData.value = await responseData.json();
  } catch (error) {
    console.error("Error muhaha:", error);
  }
}

const sortUsersByLike = computed(() =>
  listUsersData.value.slice().sort((a, b) => b.star - a.star)
);

onBeforeMount(() => {
  listByMostLike();
});
</script>

<template>
  <section>
    <h1>Leader Board</h1>
    <table>
      <thead>
        <tr>
          <td>No.</td>
          <td>ID</td>
          <td>Username</td>
          <td>Star</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in sortUsersByLike" :key="user.id">
          <td>{{ index + 1 }}</td>
          <td>{{ user.id }}</td>
          <td>{{ user.userName }}</td>
          <td>{{ user.star }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped></style>
