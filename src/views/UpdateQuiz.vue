<script setup>
import { getQuizById, updateQuiz } from '@/api/quizsAPI';
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { QUiZ_TEMPLATES_TYPE } from "@/constants";
import MultiChoiceImgForm from "@/components/quiz_templates/form/MultiChoiceImgForm.vue";
import MultiChoiceTextForm from "@/components/quiz_templates/form/MultiChoiceTextForm.vue";

const router = useRouter();
const route = useRoute();
const id = route.params.quizId;
const quizData = ref(null);

const getQuiz = async () => {
  try {
    const res = await getQuizById(id);
    quizData.value = res.data;
  } catch (error) {
    console.log(`Something went wrong! T-T\n${error}`);
  }
}

const handleRemoveLevel = (index) => {
  quizData.value.levels.splice(index, 1);
};

const addMoreQuiz = () => {
  const newLevel = {
    template: QUiZ_TEMPLATES_TYPE[0].value,
    question: "",
    questionImage: "",
    choices: [
      { value: "", isAns: true },
      { value: "", isAns: false },
      { value: "", isAns: false },
      { value: "", isAns: false },
    ],
  };

  quizData.value.levels.push(newLevel);
};

const handleUpdateGame = async () => {
  if (!isQuizDataValid()) return alert("Plase fill all the input");
  quizData.value.status = 'pending'
  const res = await updateQuiz(quizData.value.id, quizData.value);
  if (res.success) {
    alert(res.message);
    router.push({ name: 'workspace' });
  } else {
    alert(res.message);
  }
};

const isQuizDataValid = () => {
  // Check quiz field
  for (const key of Object.keys(quizData.value)) {
    if (!quizData.value[key] && key !== 'thumbnail') {
      return false;
    }
  }

  for (const level of quizData.value.levels) {
    // Check each level field
    for (const key of Object.keys(level)) {
      if (!level[key] && key !== 'questionImage') {
        return false;
      }
    }
    // Check choices of each level
    for (const choice of level.choices) {
      if (!choice.value) {
        return false;
      }
    }
  }

  return true;
};

onBeforeMount(getQuiz);
</script>

<template>
  <section class="m-10">
    <h1 class="text-4xl font-bold">Update Quiz</h1>
    <div v-if="quizData">
      <div class="flex flex-col">
        <label class="text-xl font-bold">Quiz Title</label>
        <input type="text" class="input" v-model="quizData.title" />
      </div>
      <div class="flex flex-col">
        <label class="text-xl font-bold">Description</label>
        <input type="text" class="input" v-model="quizData.description" />
      </div>
      <div class="flex flex-col">
        <span class="text-xl font-bold">Quiz Thumbnail</span>
        <img v-if="quizData.thumbnail" :src="quizData.thumbnail" alt="Quiz image"
          class="w-[300px] h-[100px] bg-neutral-200" />
        <input type="text" class="input" v-model="quizData.thumbnail" />
      </div>
      <div class="mt-5 flex flex-col gap-4">
        <div v-for="(level, index) in quizData.levels" class="relative border border-black p-3">
          <span v-if="quizData.levels.length > 1" @click="() => handleRemoveLevel(level)"
            class="absolute right-0 top-0 cursor-pointer p-2 bg-red-500">
            X
          </span>
          <h2 class="text-2xl font-bold">Level : {{ index + 1 }}</h2>
          <p class="text-2xl font-bold">Template : {{ level.template }}</p>
          <div class="flex flex-col">
            <label>Choose Template :</label>
            <select class="border" @change="(e) => level.template = e.target.value" v-model="level.template">
              <option v-for="template in QUiZ_TEMPLATES_TYPE" :value="template.value" :key="template.value">
                {{ template.label }}
              </option>
            </select>
          </div>
          <div class="mt-4">
            <MultiChoiceTextForm v-if="level.template === 'Multiple-choice-text'" :level-data="level" />
            <MultiChoiceImgForm v-else-if="level.template === 'Multiple-choice-image'" :level-data="level" />
          </div>
        </div>
        <div class="flex gap-3">
          <button class="border border-black p-3 cursor-pointer mt-5 w-full" @click="addMoreQuiz">
            Add more quiz
          </button>

          <button class="'border border-black p-3 mt-5 w-full bg-green-400 cursor-pointer" @click="handleUpdateGame"
            :disabled="false">
            Update Game
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
