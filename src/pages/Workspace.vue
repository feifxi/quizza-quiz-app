<script setup>
import { getAllQuizs, getQuizById, deleteQuiz } from '@/api/quizsAPI';
import { useAuthStore } from '@/stores/user';
import { onBeforeMount, ref , reactive} from 'vue';
import {useRouter } from 'vue-router';
import QuizCard from '@/components/QuizCard.vue';
import CommentModal from '@/components/CommentModal.vue';


// quizz of admin and user
const authStore = useAuthStore()
const userQuizzes = ref([]);
const adminQuizzes = ref([])
const isLoading = ref(false)

const userObj = authStore.authUser

let UsedRole = userObj.role
let UsedUser = ref(userObj.id)
let testUser = userObj.userName

const modal = reactive({
  isShowModal: false,
  type: '',
  quizData: null
})

// check Username and Role
console.log("user : " + testUser + " role : " + UsedRole)

// chage State By AdminRole
let state = ref(true);
const headAdmin = (data) => {
  if(data === 'admin'){
    state.value = false

  }
  if(data === 'workspace'){
    state.value = true
  }
}


// GET
onBeforeMount(async () => {
  isLoading.value = true
  try {
    const res = await getAllQuizs();
    const adminData = res.data; 
    const userData = res.data;
    adminQuizzes.value = adminData.filter(quiz => quiz.createBy.role === 'admin' || quiz.status === 'pending');
    userQuizzes.value = userData.filter(quiz => quiz.createBy.id === UsedUser.value)
  } catch (error) {
    console.error(error);
  }
  isLoading.value = false
});

// DELETE
const deleteQuizById = async (quizId) => {
  try {
    const res = await getQuizById(quizId);
    const data = await res.data;
    if (data) {
      await deleteQuiz(quizId);
      quizzes.value.splice(removeId, 1);
      isSuccess.value = true;
    } else {
      throw new Error(`Cannot find the quiz's ID(${quizId}).`);
    }
  } catch (error) {
    console.log(`Something went wrong! (T-T)\n`, error);
  }
}


const handleShowModal = async (quizId, modalType = '') => {
  if (!authStore.isAuthenticated) return router.push('/signin')
  isLoading.value = true
  const res = await getQuizById(quizId)
  if (res.success) {
    if (modalType === 'LEVEL') router.push({ name:'home', query: { quizId:quizId } })
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
    <div class="flex gap-3 p-3 border-b-2 border-neutral-300">
      <button :class="'text-neutral-700 hover:text-neutral-900 ' + (state ? 'text-blue-500' : '')" @click="headAdmin('workspace')">WorkSpace</button>
      <button :class="'text-neutral-700 hover:text-neutral-900 ' +  (state ? '' : 'text-blue-500')" @click="headAdmin('admin')">AdminReview</button>
    </div>
   </section>
    <!-- Addmin Review -->  
<section v-if="!state && UsedRole === 'admin'">

  <h1>Game Review</h1>
  <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 p-3">
      <QuizCard 
        v-for="quiz of userQuizzes" 
        :quiz="quiz"
        :show-comment-modal="() => { handleShowModal(quiz.id, 'COMMENT') }"
        :is-edit-mode="true"
      />
  </div>
</section>

  <!-- user workspace -->
  <section v-else-if="state">
    <h1>Workspace</h1>
    <div class="m-1">
      <ul>
        <li v-for="(quiz, index) in userQuizzes"
          :key="index"
          class="shadow-md border border-black p-1"
        >
          <button class="mt-1 px-1 absolute right-10 border border-black text-black bg-amber-600
          cursor-pointer hover:text-gray-800 hover:bg-amber-500">
            Edit
          </button>
          <button class="mt-1 px-1 absolute right-3 border border-black text-black bg-red-600
          cursor-pointer hover:text-gray-800 hover:bg-red-500"
          @click="deleteQuizById(quiz.id)">
            X
          </button>

          <p>
            <span><img :src="quiz.thumbnail" alt="vue logo" class="max-w-40" /></span>
            <span>ID: </span>{{ quiz.id }}<br />
            <span>Title: </span>{{ quiz.title }}<br />
            <span>Created By: </span>{{ quiz.createdBy }}<br />
            <span>Status: </span>{{ quiz.status }}
          </p>
          <button class="px-1 border border-black text-white bg-blue-600
          cursor-pointer hover:text-gray-200 hover:bg-blue-500">
            Comment
          </button>
        </li>
      </ul>
    </div>
  </section>

  <CommentModal 
    v-if="modal.quizData && modal.isShowModal && modal.type === 'COMMENT'" 
    :quiz="modal.quizData"
    :close-modal="handleCloseModal"
  />
</template>
<style scoped>
</style>
