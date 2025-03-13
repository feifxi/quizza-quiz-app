<script setup>
import { getAllQuizs, getQuizById, deleteQuiz } from '@/api/quizsAPI';
import { onBeforeMount, ref } from 'vue';

// quizz of admin and user
const userQuizzes = ref([]);
const adminQuizzes = ref([])

let CheckUser = localStorage.getItem('user');
const userObj = JSON.parse(CheckUser);

let UsedRole = userObj.role
let UsedUser = ref(userObj.id)
let testUser = userObj.userName

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
  try {
    const res = await getAllQuizs();
    const adminData = res.data; 
    const userData = res.data;
    adminQuizzes.value = adminData;
    userQuizzes.value = userData.filter(quiz => quiz.createBy.id === UsedUser.value)
  } catch (error) {
    console.error(error);
  }
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




</script>

<template>
  <!-- head for Admin -->
   <section v-if="UsedRole === 'admin'">
    <div class="flex flex-row">
      <button class="border-1 border-red-500 p-2 m-2" @click="headAdmin('workspace')">WorkSpace</button>
      <button class="border-1 border-red-500 p-2 m-2" @click="headAdmin('admin')">AdminReview</button>
    </div>
   </section>
    <!-- Addmin Review -->  
<section v-if="!state && UsedRole === 'admin'">
  <h1>Game Review</h1>
    <div class="m-1">
      <ul>
        <li v-for="(quiz, index) in adminQuizzes"
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
          <button class="px-1 absolute right-3 border border-black text-black bg-green-600
          cursor-pointer hover:text-gray-800 hover:bg-green-500">
            Approve
          </button>
        </li>
      </ul>
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
</template>
<style scoped>
</style>