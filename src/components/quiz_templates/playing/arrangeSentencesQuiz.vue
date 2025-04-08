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


onMounted(() => {
  choices.value = random(levelData.choices.filter(choice => choice.value !== ""));
});

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
    alert("incorrect Answer");
    alert("NOOB 👽");
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
</script>

<template>
  <div class="flex justify-center">
    <div
      class="flex flex-col p-10 border border-green-600 rounded-2xl bg-green-500 w-[85%]"
    >
      <div v-if="levelData.questionImage" class="w-full flex justify-center mb-4">
        <img
          :src="levelData.questionImage"
          alt="Question Image"
          class="max-h-60 rounded-xl shadow-md object-contain"
        />
      </div>
      <h2 class="p-3 border border-green-600 bg-white rounded-2xl font-bold text-3xl">
        {{ levelData.question }}
      </h2>
      <br />
      <div class="grid grid-cols-2 gap-3">
        <button
          v-for="(choice, index) in choices"
          :key="choice.order"
          class="p-3 border border-black rounded-2xl text-2xl font-bold cursor-pointer"
          :class="{
            'bg-white hover:bg-gray-200': choice.value,
            'opacity-50 cursor-not-allowed': usedIndexes.has(index),
          }"
          :disabled="usedIndexes.has(index)"
          @click="() => handleChooseChoice(choice, index)"
        >
          {{ choice.value }}
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="flex flex-col gap-4 mt-6">
        <input
          v-model="userAnswered"
          type="text"
          readonly
          class="border-2 border-gray-300 bg-gray-100 rounded-lg p-3 text-gray-700 font-bold tracking-wide focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Insert word..." />
        <div class="flex gap-2">
          <button
            type="button"
            @click="handleClear"
            class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:scale-105 transition duration-200">
            Clear
          </button>
          <input
            type="submit"
            class="bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:scale-105 transition duration-200"
            value="Submit" />
        </div>
      </form>
    </div>
  </div>
</template>
