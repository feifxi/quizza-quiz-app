<script setup>
import { computed, onBeforeMount, reactive, ref } from "vue";
import { getAllQuizs } from "@/api/quizsAPI";
import { getAllUsers } from "@/api/usersAPI";
import Button from '@/components/Button.vue';

let listQuizData = ref([]);
let listUser = ref([]);
let loading = ref(false);
let changeTab = ref(true);
let totalLike = ref([]);

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

const sortUsersByComment = computed(() =>
  totalLike.value.slice().sort((a, b) => b.like - a.like)
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

  listQuizData.value.forEach((quiz) =>
    totalLike.value.push({
      id: quiz.id,
      userName: quiz.createBy.userName,
      title: quiz.title,
      like: quiz.reactions.length,
    })
  );
});
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-green-100 to-white p-6">
    <header class="flex justify-center gap-4 mb-6 relative">
      <Button label="⭐ Star" :class="{ 'border-b-4 border-white': changeTab }" @click="changeTab = true" />
      <Button label="❤️ Like" class="bg-pink-400 border-b-4 border-pink-600 active:bg-pink-600" :class="{ 'border-b-4 border-white': !changeTab }" @click="changeTab = false" />

    </header>
    <!-- { 'border-b-4 border-white': !changeTab } -->
    <section class="max-w-3xl mx-auto">
      <h1 class="text-2xl font-extrabold text-center text-green-700 mb-4">
        🏆 Leaderboard
      </h1>

      <div v-if="changeTab" class="transition-all duration-300">
        <div
          v-for="(user, index) in sortUsersByStar"
          :key="user.id"
          class="bg-white shadow-md rounded-xl p-4 flex items-center gap-4 mb-3 transition hover:scale-105">
          <h1 class="text-xl">{{ index+1 }}</h1>
          <div class="w-12 h-12 rounded-full bg-gray-300"></div>
          <div class="flex-1">
            <h2 class="font-bold text-gray-800">{{ user.userName }}</h2>
          </div>
          <div class="text-yello-600 font-bold text-lg">⭐ {{ user.star }}</div>
        </div>
      </div>

      <div v-else class="transition-all duration-300">
        <div
          v-for="(quiz, index) in sortUsersByComment"
          :key="quiz.id"
          class="bg-white shadow-md rounded-xl p-4 flex items-center gap-4 mb-3 transition hover:scale-105">
          <h1 class="text-xl">{{ index+1 }}</h1>
          <div class="w-12 h-12 rounded-full bg-gray-300"></div>
          <div class="flex-1">
            <h2 class="font-bold text-gray-800">{{ quiz.title }}</h2>
            <p class="text-sm text-gray-500">Created by {{ quiz.userName }}</p>
          </div>
          <div class="text-pink-500 font-bold text-lg">❤️ {{ quiz.like }}</div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
