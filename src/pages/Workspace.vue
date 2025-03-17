<script setup>
import { getAllQuizs, getQuizById, deleteQuiz } from '@/api/quizsAPI';
import { useAuthStore } from '@/stores/user';
import { onBeforeMount, ref , reactive} from 'vue';
import { RouterLink } from 'vue-router';
import QuizCard from '@/components/QuizCard.vue';
import CommentModal from '@/components/CommentModal.vue';


// quizz of admin and user
const authStore = useAuthStore()
const userQuizzes = ref([]);
const adminQuizzes = ref([])
const isLoading = ref(false)

const userObj = authStore.authUser

let UsedRole = userObj.role
let usedUser = ref(userObj.id)
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
let stateClass1  
let stateClass2 = 'border-red-300 border-1 px-1'
const headAdmin = (data) => {
  if(data === 'admin'){
    state.value = false
    stateClass1 = 'border-red-300 border-1 px-1'
    stateClass2 = ''
  }
  if(data === 'workspace'){
    state.value = true
    stateClass2 = 'border-red-300 border-1 px-1'
    stateClass1 = ''
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
    userQuizzes.value = userData.filter(quiz => quiz.createBy.id === usedUser.value)
  } catch (error) {
    console.error(error);
  }
  isLoading.value = false
});



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
    <div class=" p-2 m-2">
      <RouterLink to="/create" class="hover:underline cursor-pointer border-red-500 bg-green-400 border-1 p-2 rounded-xl">CreateGame</RouterLink>
    </div>
  <div v-if="isLoading">
    Loading...
  </div>
  <!-- head for Admin -->
   <section v-else-if="UsedRole === 'admin'">
    <div class="flex gap-3 p-3 border-b-2 border-neutral-300">
      <button :class="stateClass2"  @click="headAdmin('workspace')">WorkSpace</button>
      <button :class="stateClass1"  @click="headAdmin('admin')">AdminReview</button>
    </div>
   </section>
    <!-- Addmin Review -->  
<section v-if="!state && UsedRole === 'admin'">

  <h1>Game Review</h1>
  <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 p-3">
      <QuizCard 
        v-for="quiz of adminQuizzes" 
        :quiz="quiz"
        :show-comment-modal="() => { handleShowModal(quiz.id, 'COMMENT') }"
        :is-edit-mode="true"
      />
  </div>
</section>

  <!-- user workspace -->
  <section v-else-if="state">
    
    <h1>Workspace</h1>
    <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 p-3">
      <QuizCard 
        v-for="quiz of userQuizzes" 
        :quiz="quiz"
        :show-comment-modal="() => { handleShowModal(quiz.id, 'COMMENT') }"
        :is-edit-mode="true"
      />
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
