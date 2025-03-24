<script setup>
import { onBeforeMount, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/user";
import { patchQuiz } from "@/api/quizsAPI";


const newComment = ref("");
const authStore = useAuthStore();

const { quiz } = defineProps({
  quiz: Object,
  closeModal: Function,
});

const handleSendComment = async () => {
  quiz.comments.push({
    user: authStore.authUser,
    text: newComment.value,
  });

  await patchQuiz(quiz.id, { comments: quiz.comments });

};

</script>

<template>
  <div
    class="fixed top-0 left-0 bg-black/80 w-full h-screen flex items-center justify-center">
    <div
      class="relative bg-white w-full max-w-2xl max-h-3/4 p-6 pr-10 rounded-xl flex flex-col">
      <div>
        <span class="absolute top-4 right-4 cursor-pointer" @click="closeModal"
          >X</span
        >
        <div class="font-bold text-2xl mb-3">comment</div>
      </div>
      <div class="flex flex-col gap-5 overflow-y-auto">
        <div
          class="flex items-center gap-5 bg-slate-100 p-3 rounded-xl relative"
          v-for="(comment, index) of quiz.comments"
          :key="index">
          <img
            :src="
              comment.user.profilePic ||
              'https://i1.sndcdn.com/artworks-9R6zUytOmPor6P2n-8tUdCw-t1080x1080.jpg'
            "
            alt=""
            class="w-12 h-12 rounded-full bg-gray-300 absolute top-2.5 left-3" />
          <div class="ml-16">
            <p class="font-bold">{{ comment.user.userName }}</p>
            <p class="text-sm text-gray-900 whitespace-pre-wrap break-words">
              {{ comment.text }}
            </p>
          </div>
        </div>
        <div class="flex gap-3">
          <input
            class="input"
            type="text"
            placeholder="Fill your comment"
            v-model="newComment" />
          <button
            class="px-4 py-2 font-bold rounded-xl text-white bg-green-500 active:bg-green-600 transition-all"
            @click="handleSendComment">
            send
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
