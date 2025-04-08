<script setup>
import { random } from "@/libs";
import { onMounted, ref } from "vue";

const { levelData, goNext, increaseScore } = defineProps({
  levelData: Object,
  goNext: Function,
  increaseScore: Function,
});

const result = ref([]);
const userAnswered = ref("");
const choices = ref([]);
const usedIndexes = ref(new Set());

const handleChooseChoice = (choice, index) => {
  if (usedIndexes.value.has(index)) return;

  usedIndexes.value.add(index);
  result.value.push(choice);
  userAnswered.value = result.value.map((c) => c.value).join(" ");
};

function handleSubmit() {
  const correct = [...levelData.choices]
    .filter(choice => choice.value !== "")
    .sort((a, b) => a.order - b.order)
    .map((x) => x.value)
    .join("");

  const user = result.value.map((x) => x.value).join("");

  if (user === correct) {
    alert("Correct Answer 😎😎");
    increaseScore();
  } else {
    alert("Incorrect Answer 👽👽, NOOB 👽");
  }
  goNext();
  resetState();
}

function handleClear() {
  resetState();
}

function resetState() {
  result.value = [];
  userAnswered.value = "";
  usedIndexes.value = new Set();
}

onMounted(() => {
  choices.value = random(levelData.choices.filter(choice => choice.value !== ""));
});
</script>

<template>
  <div class="flex justify-center">
    <div class="flex flex-col p-10 border border-green-600 rounded-2xl bg-green-500 w-[85%]">
      <div v-if="levelData.questionImage" class="w-full flex justify-center mb-4">
        <img :src="levelData.questionImage" alt="Question Image" class="max-h-60 rounded-xl shadow-md object-contain" />
      </div>

      <h2 class="p-3 border border-green-600 bg-white rounded-2xl font-bold text-3xl">
        {{ levelData.question }}
      </h2>
      <br />
      <div class="grid grid-cols-2 gap-3 mt-4">
        <button v-for="(choice, index) in choices" :key="choice.order"
          class="border border-black rounded-2xl cursor-pointer overflow-hidden" :class="{
            'bg-gray-500 border-gray-600 text-white cursor-not-allowed': usedIndexes.has(index),
            'bg-white hover:bg-gray-200': choice.value && !usedIndexes.has(index),
          }" :disabled="usedIndexes.has(index)" @click="() => handleChooseChoice(choice, index)">
          <img :src="choice.value" alt="" class="w-full h-28 object-contain" />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="flex flex-col gap-4 mt-6">
        <div class="flex gap-2 flex-wrap">
          <div v-for="(item, index) in result" :key="index"
            class="flex items-center gap-2 p-2 border-2 border-gray-300 rounded-lg bg-gray-100">
            <img :src="item.value" alt="result image" class="w-16 h-16 object-contain" />
          </div>
        </div>
        <div class="flex gap-2">
          <button type="button" @click="handleClear"
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg hover:scale-105 transition duration-200">
            Clear
          </button>
          <input type="submit"
            class="bg-green-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg hover:scale-105 transition duration-200"
            value="Submit" />
        </div>
      </form>
    </div>
  </div>
</template>
