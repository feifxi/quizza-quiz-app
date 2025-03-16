<script setup>
import { getAllQuizs, getQuizById } from '@/api/quizsAPI';
import { getAllUsers, getUserById } from '@/api/usersAPI';
import Button from '@/components/Button.vue';
import QuizLevelModal from '@/components/QuizLevelModal.vue';
import { useAuthStore } from '@/stores/user';
import { computed, onBeforeMount, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

const quizs = ref([])
const isLoading = ref(false)
const selectedQuiz = reactive({
  quizData: null,
  playingData: null,
})

const fetchAllQuizs = async () => {
  isLoading.value = true
  const res = await getAllQuizs()
  quizs.value = res.data
  isLoading.value = false
}

const handleShowLevelModal = async (quizId) => {
  if (!authStore.isAuthenticated) return router.push('/signin')
  isLoading.value = true

  const quizRes = await getQuizById(quizId)
  // const playingRes = await g(quizId)
  const playingRes = {
    success: true,
    data: null
  };
  if (quizRes.success && playingRes.success) {
    selectedQuiz.quizData = quizRes.data
    selectedQuiz.playingData = playingRes.data != null
      ? playingRes.data
      : {
        userId: authStore.authUser.id,
        quizId: quizId,
        currentLevel: 0,
      }
  } else {
    alert('Something went wrong')
  }
  isLoading.value = false
}

const handleCloseLevelModal = () => {
  selectedQuiz.quizData = null
  selectedQuiz.playingData = null
  router.replace({ path: route.path, query: {} });
}

onBeforeMount(() => {
  // All QUiz
  fetchAllQuizs()
  // Quiz Level Modal
  const { quizId } = route.query
  if (quizId) {
    handleShowLevelModal(quizId)
  }
})


</script>

<template>
  <div v-if="isLoading">
    Loading...
  </div>
  <section v-else>
    <h1>HOME</h1>
    <div class="grid grid-cols-5 gap-3 p-3">
      <RouterLink v-for="quiz of quizs" :to="{ name: 'home', query: { quizId: quiz.id } }"
        class="border border-black p-5 cursor-pointer rounded-xl shadow-2xl"
        @click="() => { handleShowLevelModal(quiz.id) }"
      >
        <div>
          <img v-if="quiz.thumbnail" :src="quiz.thumbnail" alt="quiz thumbnail" class="">
          <p class="text-xl"> {{ quiz.title }}</p>
        </div>
      </RouterLink>
    </div>
  </section>

  <QuizLevelModal v-if="selectedQuiz.quizData != null" :quiz-data="selectedQuiz.quizData"
    :playing-data="selectedQuiz.playingData" :close-modal="handleCloseLevelModal" />
</template>

<style scoped></style>
