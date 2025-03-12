<script setup>
import { getAllQuizs, getQuizById, deleteQuiz } from '@/api/quizsAPI';
import { onBeforeMount, onUpdated, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const userQuizzes = ref([]);
const adminQuizzes = ref([])


let Check = localStorage.getItem('user');
let UsedUser 
let UsedRole


if (Check) {
  const userObj = JSON.parse(Check);
  UsedUser = userObj.userName;
  UsedRole = userObj.role;
  console.log(UsedRole)  
  console.log(UsedUser);
} else {
  alert('ยังไม่ได้Login กรุณาloginก่อน');
  router.push("/")
}

// GET
onBeforeMount(async () => {
  try {
    const res = await getAllQuizs();
    const adminData = await res.data;
    const userData = await res.data;
    adminQuizzes.value = adminData;
    userQuizzes.value = userData;
    console.log(userQuizzes)
  } catch (error) {
    console.log(error);
  }
});

// DELETE
const deleteQuizById = async (quizId) => {
  try {
    const res = await getQuizById(quizId);
    const data = await res.data;
    if (data) {
      await deleteQuiz(quizId);
      const removeIndex = quizzes.value.findIndex((quiz) => quiz.id = quizId);
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
    <!-- Addmin Review -->  
<section v-if="UsedRole === 'admin'">
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
  <section v-else-if="UsedRole === 'user'">
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

</template>

<style scoped>
</style>