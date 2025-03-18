<script setup>
import { getAllQuizs, getQuizById } from '@/api/quizsAPI';
import { getAllUsers, getUserById } from '@/api/usersAPI';
import Button from '@/components/Button.vue';
import Chatbot from '@/components/Chatbot.vue';
import CommentModal from '@/components/CommentModal.vue';
import QuizCard from '@/components/QuizCard.vue';
import QuizLevelModal from '@/components/QuizLevelModal.vue';
import { useAuthStore } from '@/stores/user';
import { onBeforeMount, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

const quizs = ref([])
const isLoading = ref(false)
const modal = reactive({
  isShowModal: false,
  type: '',
  quizData: null
})

const fetchAllQuizs = async () => {
  isLoading.value = true
  const res = await getAllQuizs([{ key: 'status', value: 'publish' }])
  quizs.value = res.data
  isLoading.value = false
}

const handleShowModal = async (quizId, modalType = '') => {
  if (!authStore.isAuthenticated) return router.push('/signin')
  isLoading.value = true
  const res = await getQuizById(quizId)
  if (res.success) {
    if (modalType === 'LEVEL') router.push({ name: 'home', query: { quizId: quizId } })
    modal.type = modalType
    modal.quizData = res.data
    modal.isShowModal = true
  }
  else {
    alert('Something went wrong')
  }
  isLoading.value = false
}

const handleCloseModal = () => {
  modal.isShowModal = false
  modal.quizData = null
  modal.type = ''
  router.replace({ path: route.path, query: {} });
}


onBeforeMount(() => {
  fetchAllQuizs()
  // Show Quiz Level Modal
  const { quizId } = route.query
  if (quizId) {
    handleShowModal(quizId, "LEVEL")
  }
})
</script>

<template>
  <div v-if="isLoading">
    Loading...
  </div>

  <div v-else-if="quizs.length === 0" class="text-3xl font-bold text-neutral-400 text-center mt-10">
    There is no quizs
  </div>

  <section v-else>
    <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 p-3">
      <QuizCard v-for="quiz of quizs" :quiz="quiz" :show-level-modal="() => { handleShowModal(quiz.id, 'LEVEL') }"
        :show-comment-modal="() => { handleShowModal(quiz.id, 'COMMENT') }" :is-edit-mode="false" />
    </div>

    <QuizLevelModal v-if="modal.quizData && modal.isShowModal && modal.type === 'LEVEL'" :quiz="modal.quizData"
      :close-modal="handleCloseModal" />
    <CommentModal v-if="modal.quizData && modal.isShowModal && modal.type === 'COMMENT'" :quiz="modal.quizData"
      :close-modal="handleCloseModal" />
  </section>
</template>

<style scoped></style>
