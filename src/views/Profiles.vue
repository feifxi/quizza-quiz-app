<script setup>
import QuizCard from '@/components/QuizCard.vue';
import Button from '@/components/Button.vue';
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/user';
import { getAllQuizs } from '@/api/quizsAPI';
import { RouterLink } from 'vue-router';

const authStore = useAuthStore();
const userUsed = ref(authStore.authUser);
const gameHasPlayed = ref(0);
const allGameInPlatform = ref(0);
const quizs = ref([])

const handleUserProfileImg = (imgLink) => {
  if (!imgLink) {
    return 'https://img.myloview.com/posters/default-avatar-profile-icon-vector-social-media-user-photo-700-205577532.jpg';
  } else {
    return imgLink;
  }
}

onMounted(async () => {
  try {
    const res = await getAllQuizs();
    const allGameData = res.data;
    quizs.value = allGameData.filter(gameowned => gameowned.createBy.id === userUsed.value.id)
    allGameInPlatform.value = allGameData.length;

    if (Array.isArray(allGameData) && userUsed.value) {
      gameHasPlayed.value = allGameData.reduce((total, game) => {
        if (Array.isArray(game.playerProgress)) {
          return total + game.playerProgress.filter(player => player.userId === userUsed.value.id).length;
        }
        return total;
      }, 0);
    }

    let prog = quizs.value.flatMap((quiz) => quiz.playerProgress || []);
    const userStar = new Map();

    prog.forEach(({ userId, star }) => {
      const getStar = userStar.get(userId) || 0;
      userStar.set(userId, getStar + star);
    });
    userUsed.value.star = userStar.get(authStore.authUser.id)
  } catch (error) {
    console.error("Error fetching quiz data:", error);
  }
});
</script>

<template>
  <section class="max-w-lg mx-auto bg-white p-6 mt-10 rounded-2xl shadow-lg border border-gray-200">
    <div class="text-center mb-6">
      <div :class="'relative w-35 h-35 mx-auto flex items-center justify-center border-2 border-black rounded-full '"
        :style="{
          backgroundImage: 'linear-gradient(to ' + (userUsed.profileFrame?.selectedMode || 'top') + ','
            + (userUsed.profileFrame?.color1 || 'lime') + ',' + (userUsed.profileFrame?.color2 || 'lime')
            + ',' + (userUsed.profileFrame?.color3 || 'lime') + ',' + (userUsed.profileFrame?.color4 || 'lime') + ',' + (userUsed.profileFrame?.color5 || 'lime') + ')'
        }">
        <img class="border-2 w-30 h-30 rounded-full  object-cover" :src="handleUserProfileImg(userUsed.profilePic)"
          alt="Profile Picture" />

      </div>
      <h2 class="text-2xl font-semibold mt-3">{{ userUsed?.userName || "Guest" }}</h2>
      <p class="text-gray-600">{{ userUsed?.email || "No email provided" }}</p>
    </div>

    <div class="bg-gray-100 p-4 rounded-lg">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <p class="text-gray-500 text-sm">User ID</p>
          <p class="font-medium">{{ userUsed?.id || "N/A" }}</p>
        </div>
        <div>
          <p class="text-gray-500 text-sm">Role</p>
          <p class="font-medium">{{ userUsed?.role || "N/A" }}</p>
        </div>
        <div>
          <p class="text-gray-500 text-sm">Stars</p>
          <p class="font-medium text-yellow-500">⭐ {{ userUsed?.star || 0 }}</p>
        </div>
        <div>
          <p class="text-gray-500 text-sm">Games Played</p>
          <p class="font-medium">{{ gameHasPlayed }} / {{ allGameInPlatform }}</p>
        </div>
      </div>
    </div>

    <div class="mt-6 text-center">
      <RouterLink to="/editProfile">
        <Button label="Edit Profile"></Button>
      </RouterLink>

    </div>
  </section>
  <section class="max-w-[80%] mx-auto bg-white p-6 mt-10 rounded-2xl shadow-lg border border-gray-200 mb-10">
    <div>
      <p class="text-center text-3xl font-bold my-5">Games Owned</p>
      <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-5 p-3">
        <QuizCard v-for="quiz of quizs" :quiz="quiz" />
      </div>
    </div>
  </section>
</template>
