<script setup>
import { getAllQuizs, getQuizById, deleteQuiz } from '@/api/quizsAPI';
import { useAuthStore } from '@/stores/user';
import { onBeforeMount, ref, reactive, onMounted } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import QuizCard from '@/components/QuizCard.vue';
import CommentModal from '@/components/CommentModal.vue';
import Button from '@/components/Button.vue';

const router = useRouter()
const route = useRoute()

// quizz of admin and user
const authStore = useAuthStore()
const userQuizzes = ref([]);
const adminQuizzes = ref([])
const isLoading = ref(false)

const userObj = authStore.authUser

let UsedRole = userObj.role
let usedUser = ref(userObj.id)

const modal = reactive({
  isShowModal: false,
  type: '',
  quizData: null
})




// chage State By AdminRole
let state = ref(true);
let stateClass1 = 'px-1 pb-2'
let stateClass2 = 'border-green-500 border-b-3 px-1 pb-2 text-green-600'
const headAdmin = (data) => {
  if (data === 'admin') {
    state.value = false
    stateClass1 = 'border-green-500 border-b-3 px-1 pb-2 text-green-600'
    stateClass2 = 'px-1 pb-2'
    router.push({ name: 'workspace', query: { tab: "admin-review" } })
  }
  if (data === 'workspace') {
    state.value = true
    stateClass2 = 'border-green-500 border-b-3 px-1 pb-2 text-green-600'
    stateClass1 = 'px-1 pb-2'
    router.push({ name: 'workspace', query: { tab: "workspace" } })
  }
}



onBeforeMount(async () => {
  // navigate to selected tab
  const { tab } = route.query
  console.log(tab)
  if (!tab || tab === 'workspace') {
    headAdmin('workspace')
  } else if (tab === 'admin-review') {
    headAdmin('admin')
  }

  isLoading.value = true;
  try {
    const res = await getAllQuizs();
    const adminData = res.data;
    const userData = res.data;
    adminQuizzes.value = adminData.filter(quiz => quiz.status === 'pending');

    userQuizzes.value = userData.filter(quiz => {
      if (UsedRole === 'admin') {
        return quiz.status === 'publish';
      } else {
        return quiz.createBy.id === usedUser.value;
      }
    })
  } catch (error) {
    console.error(error);
  }
  isLoading.value = false;
});

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

</script>

<template>  
  <div v-if="isLoading">
    Loading...
  </div>
  <!-- head for Admin -->
  <section v-else-if="UsedRole === 'admin'">
    <div class="flex gap-3 text-3xl font-bold py-3 px-6 bg-white shadow">
      <button :class="stateClass2" @click="headAdmin('workspace')">WorkSpace</button>
      <button :class="stateClass1" @click="headAdmin('admin')">AdminReview</button>

      <RouterLink to="/create" class="ml-auto">
        <Button label="Create"></Button>
      </RouterLink>
    </div>
  </section>

  <!-- Addmin Review -->
  <section v-if="!state && UsedRole === 'admin'">

    <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 p-3">
      <QuizCard v-for="quiz of adminQuizzes" :quiz="quiz"
        :show-comment-modal="() => { handleShowModal(quiz.id, 'COMMENT') }" :is-edit-mode="true" :is-admin="true" />
    </div>
  </section>

  <!-- user workspace -->
  <section v-else-if="state">
    <h1 v-if="UsedRole ==='user'" class="flex items-center gap-3 text-3xl font-bold py-3 px-6 bg-white shadow">
      <p>Workspace</p>
      <RouterLink to="/create" class="ml-auto">
        <Button label="Create"></Button>
      </RouterLink>
    </h1>
    <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 p-3">
      <QuizCard v-for="quiz of userQuizzes" :quiz="quiz"
        :show-comment-modal="() => { handleShowModal(quiz.id, 'COMMENT') }" :is-edit-mode="true" />
    </div>
  </section>

   <!-- No Quiz -->
  <div v-if="(userQuizzes?.length === 0 && state) || (adminQuizzes?.length === 0 && !state)"  class="text-3xl font-bold text-neutral-400 text-center mt-10">
    There is no quizs
  </div>

  <CommentModal v-if="modal.quizData && modal.isShowModal && modal.type === 'COMMENT'" :quiz="modal.quizData"
    :close-modal="handleCloseModal" />
</template>
<style scoped></style>
