<script setup>
import Button from '@/components/Button.vue';
  const { levelData, goNext, increaseScore } = defineProps({
    levelData: Object,
    goNext: Function, 
    increaseScore: Function,
  });

  const handleChooseChoice = (isCorrect) => {
    if (isCorrect) {
      alert('Correct Ans! :DD')
      increaseScore()
      goNext()
    } else {
      alert('Incorrect Ans! :CC')
      goNext()
    }
  }
</script>
<template>
  <div class="border border-black p-3">
    <h2 class="font-bold"> {{ levelData.question }}</h2>

    <div class=" grid grid-cols-2 gap-3">
      <button
        v-for="choice of levelData.choices"
        class="border border-black p-3 cursor-pointer"
        @click="()=>{ handleChooseChoice(choice.isAns) }"
      >
      {{ choice.value }}
    </button>
    </div>
  </div>
</template>

<style scoped></style>
