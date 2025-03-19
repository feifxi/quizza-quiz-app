<script setup>
import { computed, onBeforeMount, reactive, ref } from "vue";
import { getAllQuizs } from "@/api/quizsAPI";
import { getAllUsers } from "@/api/usersAPI";

let listQuizData = ref([]);
let listUser = ref([]);
let loading = ref(false);

const fetchAllQuizsAndUsers = async () => {
  loading.value = true;
  const resQ = await getAllQuizs([{ key: "status", value: "publish" }]);
  const resU = await getAllUsers();
  listQuizData.value = resQ.data;
  listUser.value = resU.data;
  loading.value = false;
};

const sortUsersByStar = computed(() =>
  listUser.value.slice().sort((a, b) => b.star - a.star)
);

onBeforeMount(async () => {
  await fetchAllQuizsAndUsers();

  let prog = listQuizData.value.flatMap((quiz) => quiz.playerProgress || []);
  console.log("prog : ", prog);

  const userStar = new Map();
  prog.forEach(({ userId, star }) => {
    const getStar = userStar.get(userId) || 0;
    userStar.set(userId, getStar + star);
  });

  listUser.value = listUser.value.map((user) => ({
    ...user,
    star: userStar.get(user.id) || 0,
  }));
});
</script>

<template>
  <div v-if="loading">Loading...</div>
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
        <tr v-for="(user, index) in sortUsersByStar" :key="user.id">
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
