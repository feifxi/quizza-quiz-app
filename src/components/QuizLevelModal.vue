<script setup>
import Icon from "./Icon.vue";
import { useAuthStore } from "@/stores/user";
import { ref } from "vue";
import { patchQuiz } from "@/api/quizsAPI";

const { quiz } = defineProps({
  quiz: Object,
  closeModal: Function,
});
const authStore = useAuthStore();

const playerProgress = quiz.playerProgress.find(
  (history) => history.userId === authStore.authUser.id
) || { userId: authStore.authUser.id, star: 0 };

const isLiked = ref(quiz.reactions.includes(authStore.authUser.id));

const checkIsLike = () => {
  if (isLiked.value) {
    quiz.reactions = quiz.reactions.filter(uid => uid !== authStore.authUser.id)
  } else {
    quiz.reactions.push(authStore.authUser.id)
  }
}

const handleLike = async () => {
  checkIsLike()
  await patchQuiz(quiz.id, { reactions: quiz.reactions })
};
</script>

<template>
  <div class="fixed top-0 left-0 bg-black/80 w-full h-screen flex items-center justify-center">
    <div class="relative bg-white w-full max-w-2xl max-h-3/4 p-6 pr-15 rounded-xl flex min-h-100">
      <span class="absolute top-4 right-4 cursor-pointer" @click="closeModal">
        <Icon name="close" class-name="fill-black"></Icon>
      </span>
      <!-- Quiz Info -->
      <div class="flex-1">
        <span class="shadow p-2 font-bold text-xl rounded-full transition-all hover:scale-105">
          {{ playerProgress.star + "/" + quiz.levels.length + "⭐" }}
        </span>

        <h2 class="mt-2 text-3xl font-bold">{{ quiz.title }}</h2>

        <p class="font-bold border-b-3 border-neutral-200 py-2">
          By : {{ quiz.createBy.userName }}
        </p>

        <p class="mt-2">
          {{ quiz.description }}
        </p>

        <p class="flex justify-center items-center size-10 rounded-full border-2 absolute left-3 bottom-3 hover:scale-105 active:scale-120 active:bg-green-500 transition-all"
          :class="isLiked ? 'border-green-500' : 'border-slate-500'" @click="handleLike">
          <Icon name="like" :class-name="isLiked ? 'fill-green-500' : 'fill-slate-500'" />
        </p>
      </div>
      <!-- Level -->
      <div class="flex-1 flex flex-col p-3 items-center gap-2 border-l-3 border-neutral-300 max-w-55 overflow-y-scroll">
        <div v-for="(level, index) of quiz.levels" :class="index % 2 == 0 ? 'self-end' : 'self-start'">
          <RouterLink :to="index > 0
            ? { name: 'home', query: { quizId: quiz.id } }
            : { name: 'quiz', params: { quizId: quiz.id } }
            " :class="'border-3 text-3xl font-bold size-25 flex items-center justify-center rounded-full hover:scale-110 transition-all ' +
              (index > 0
                ? 'text-neutral-600 bg-neutral-200 cursor-not-allowed border-neutral-300'
                : 'text-green-900 bg-green-400 active:scale-95 border-green-500')
              ">
            {{ index + 1 }}
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
