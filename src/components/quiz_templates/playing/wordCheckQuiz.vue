<script setup>
import { ref } from 'vue';
const { levelData, goNext, increaseScore } = defineProps({
  levelData: Object,
  goNext: Function,
  increaseScore: Function,
});

let userAnswered = ref('')
function handleSubmit() {
    if(userAnswered.value === levelData.choices[0].value){
        alert('Correct Answer 😎😎')
        increaseScore()
        goNext()
        userAnswered.value = ''
    }else if(userAnswered.value != levelData.choices[0].value){
        alert('NOOB 👽')
        goNext()
        userAnswered.value = ''
    }
}





</script>
<template>
    <div class="w-full  flex justify-center items-center  p-6">
      <div class="w-full max-w-[50%]  rounded-xl p-6 space-y-5">

        <div class="text-center text-lg font-semibold text-gray-800 border-2 border-green-400 rounded-md p-4 bg-green-50 ">
          {{ levelData.question.split('').join(' ') }}
        </div>
  
        <div v-if="levelData.questionImage" class="flex justify-center">
          <img :src="levelData.questionImage" class="rounded-lg max-w-full w-100 h-100 object-fit border" />
        </div>
  
        <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
          <input
          v-model="userAnswered"
            type="text"
            class="border-2 border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="Insert word..."
          />
          <input
            type="submit"
            class="bg-green-400 hover:bg-green-500 text-white font-bold py-2 rounded-lg transition duration-200"
            value="Submit"
          />
        </form>
      </div>
    </div>
  </template>
  

<style scoped></style>