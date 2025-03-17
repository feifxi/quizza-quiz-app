<script setup>
import { createQuiz } from "@/api/quizsAPI";
import MultiChoiceImgForm from "@/components/quiz_templates/form/MultiChoiceImgForm.vue";
import MultiChoiceTextForm from "@/components/quiz_templates/form/MultiChoiceTextForm.vue";
import { QUiZ_TEMPLATES_TYPE } from "@/constants";
import { useAuthStore } from "@/stores/user";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore()

const quizData = reactive({
  title: "",
  thumbnail: "",
  description: "",
  createBy: { ...authStore.authUser, star: undefined }, // get all field except star
  status: "pending",
  reactions: [],
  comments: [],
  adminComments: [],
  playerProgress: [],
  levels: [
    {
      template: QUiZ_TEMPLATES_TYPE[0].value,
      question: "",
      questionImage: "",
      choices: [
        { value: "", isAns: true },
        { value: "", isAns: false },
        { value: "", isAns: false },
        { value: "", isAns: false },
      ],
    },
  ],
});

const handleRemoveLevel = (index) => {
  quizData.levels.splice(index, 1);
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

  quizData.levels.push(newLevel);
};

const handleCreateGame = async () => {
  if (!isQuizDataValid()) return alert("Plase fill all the input");

  const res = await createQuiz(quizData);
  if (res.success) {
    alert(res.message);
    router.push("/");
  } else {
    alert(res.message);
  }
};

const isQuizDataValid = () => {
  // Check quiz field
  for (const key of Object.keys(quizData)) {
    if (!quizData[key] && key !== 'thumbnail') {
      return false;
    }
  }

  for (const level of quizData.levels) {
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
</script>

<template>
  <section class="p-4">
    <h1 class="text-4xl font-bold">Create Quiz</h1>

    <div class="flex flex-col">
      <label class="text-xl font-bold">Quiz Title</label>
      <input type="text" class="input" v-model="quizData.title" />
    </div>
    <div class="flex flex-col">
      <label class="text-xl font-bold">Description</label>
      <input type="text" class="input" v-model="quizData.description" />
    </div>
    <div class="flex flex-col">
      <label class="text-xl font-bold">Quiz Thumbnail</label>
      <img 
          v-if="quizData.thumbnail"
          :src="quizData.thumbnail" 
          class="w-[300px] h-[100px] bg-neutral-200 "
          alt="preview question image " 
        />
      <input type="text" class="input" v-model="quizData.thumbnail" />
    </div>

    <!-- Template -->
    <div class="mt-5 flex flex-col gap-4">
      <div v-for="(level, index) of quizData.levels"
        class="relative border border-black p-3"
      >
        <span v-if="quizData.levels.length > 1"
          @click="() => handleRemoveLevel(level)"
          class="absolute right-0 top-0 cursor-pointer p-2 bg-red-500"
        >
          X
        </span>

        <h2 class="text-2xl font-bold">Level : {{ index + 1 }}</h2>
        <p class="text-2xl font-bold">Template : {{ level.template }}</p>

        <!-- Template options -->
        <div class="flex flex-col">
          <label>Choose Template :</label>
          <select
            class="border"
            @change="
              (e) => level['template'] = e.target.value
            "
          >
            <option
              v-for="template in QUiZ_TEMPLATES_TYPE"
              :value="template.value"
              :key="template.value"
            >
              {{ template.label }}
            </option>
          </select>
        </div>

        <!-- Render Template -->
        <div class="mt-4">
          <MultiChoiceTextForm
            v-if="level.template === 'Multiple-choice-text'"
            :level-data="level"
          />
          <MultiChoiceImgForm
            v-else-if="level.template === 'Multiple-choice-image'"
            :level-data="level"
          />
        </div>
      </div>

      <div class="flex gap-3">
        <button
          class="border border-black p-3 cursor-pointer mt-5 w-full"
          @click="addMoreQuiz"
        >
          Add more quiz
        </button>

        <button
          class="'border border-black p-3 mt-5 w-full bg-green-400 cursor-pointer"
          @click="handleCreateGame"
          :disabled="false"
        >
          Create Game
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
