<script setup>
import { random } from '@/libs';
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

const shuffleChoices = (levelData) => {
  return random(levelData.choices);
};
</script>
<template>
  <div class="p-3 border border-green-600 rounded-2xl bg-green-600">
    <h2 class="p-3 border border-green-600 bg-white rounded-2xl font-bold"> {{ levelData.question }}</h2>
    <br>
    <div class=" grid grid-cols-2 gap-3">
      <button v-for="choice of shuffleChoices(levelData)"
        class="p-3 border border-black rounded-2xl text-2xl font-bold cursor-pointer" :class="{
          'bg-white hover:bg-gray-200': choice.value
        }" @click="() => { handleChooseChoice(choice.isAns) }">
        <img :src="choice.value" alt="" class="max-w-[100px] w-full" />
      </button>
    </div>
  </div>
</template>

<style scoped></style>