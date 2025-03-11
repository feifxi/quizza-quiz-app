<script setup>
import { getAllQuizs } from '@/api/quizsAPI';
import { getAllUsers, getUserById } from '@/api/usersAPI';
import { useCounterStore } from '@/stores/counter';
import { onBeforeMount, reactive, ref } from 'vue';

  const quizs = ref([])
  
  const fetchAllQuizs = async () => {
    const res = await getAllQuizs()
    quizs.value = res.data    
  }

  onBeforeMount(()=>{
    fetchAllQuizs()
  })
</script>

<template>
  <div>HOME</div>
  <div class="flex">
    <div 
      v-for="quiz of quizs" 
      class="border border-black p-5"
    >
      <p> Tittle : {{ quiz.title }}</p>
      <p> by : {{ quiz.createBy.userName }}</p>
    </div>  
  </div>

  

</template>

<style scoped>
</style>
