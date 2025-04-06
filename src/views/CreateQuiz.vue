<script setup>
import { createQuiz } from "@/api/quizsAPI";
import Button from "@/components/Button.vue";
import Icon from "@/components/Icon.vue";
import MultiChoiceImgForm from "@/components/quiz_templates/form/MultiChoiceImgForm.vue";
import MultiChoiceTextForm from "@/components/quiz_templates/form/MultiChoiceTextForm.vue";
import MatchedForm from "@/components/quiz_templates/form/MatchedForm.vue";
import { QUIZ_TEMPLATES_TYPE } from "@/constants";
import { useAuthStore } from "@/stores/user";
import { reactive , ref} from "vue";
import { useRouter } from "vue-router";
import arrangeSentencesForm from "@/components/quiz_templates/form/arrangeSentencesForm.vue";
import arrangePicForm from "@/components/quiz_templates/form/arrangePicForm.vue";
import wordCheckForm from "@/components/quiz_templates/form/wordCheckForm.vue";

const router = useRouter();
const authStore = useAuthStore();

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
      template: QUIZ_TEMPLATES_TYPE[0].value,
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
  quizData.levels.splice(index, 1)
};

const addMoreQuiz = () => {
  quizData.levels.push(JSON.parse(JSON.stringify(QUIZ_TEMPLATES_TYPE[0].structure)));
};

const handleChangeTemplate = (templateType, levelIndex) => {
  for (const template of QUIZ_TEMPLATES_TYPE) {
    if (template.value === templateType) {
      quizData.levels[levelIndex] = JSON.parse(JSON.stringify(template.structure))
    }
  }
};

const handleCreateGame = async () => {
  if (!isQuizDataValid()) return alert("Plase fill all the input");

  const res = await createQuiz(quizData);
  if (res.success) {
    alert(res.message);
    router.push({ name: "workspace" });
  } else {
    alert(res.message);
  }
};

const isQuizDataValid = () => {
  // Check quiz field
  for (const key of Object.keys(quizData)) {
    if (!quizData[key] && key !== "thumbnail") {
      return false;
    }
  }

  for (const level of quizData.levels) {
    // Check each level field
    for (const key of Object.keys(level)) {
      if (!level[key] && key !== "questionImage") {
        if (level.template === "Matched") {
          if (key === "question") {
            level[key] = "Match all pairs by pairing a left-sided button to a right-sided button.";
            continue;
          }
        }
        return false;
      }
      if (level[key] === "Matched") {
        for (const keyPair of level.choices) {
          if (!keyPair.pair || !keyPair.key) {
            return false;
          }
        }
      }
    }
  }

  return true;
};
</script>

<template>
  <section class="p-4">
    <div class="mx-auto flex flex-col gap-3 bg-white border border-neutral-300 p-4 rounded-xl shadow max-w-xl">
      <h1 class="text-4xl font-bold flex gap-3">
        <p>Create Quiz</p>
        <Icon name="quiz" class-name="fill-black size-10"></Icon>
      </h1>

      <div class="flex flex-col gap-2">
        <label class="text-xl font-bold">Quiz Title</label>
        <input type="text" class="input" v-model="quizData.title" />
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-xl font-bold">Description</label>
        <input type="text" class="input" v-model="quizData.description" />
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-xl font-bold">Quiz Thumbnail</label>
        <img v-if="quizData.thumbnail" :src="quizData.thumbnail"
          class="w-[300px] h-[200px] bg-neutral-200 rounded-xl object-center" alt="preview question image " />
        <input type="text" class="input" v-model="quizData.thumbnail" />
      </div>
    </div>

    <!-- Template -->
    <div class="mx-auto mt-5 flex flex-col max-w-xl gap-4">
      <div v-for="(level, index) of quizData.levels"
        class="relative bg-white border border-neutral-300 p-3 rounded-xl shadow">
        <span v-if="quizData.levels.length > 1" @click="() => handleRemoveLevel(index)"
          class="absolute right-0 top-0 cursor-pointer p-2 bg-red-500 rounded-tr-xl rounded-bl-xl">
          <Icon name="close"></Icon>
        </span>

        <h2
          class="text-2xl font-bold bg-green-500 border-3 border-green-600 py-1 px-2 rounded-full inline-block text-white">
          Level : {{ index + 1 }}
        </h2>
        <p class="text-2xl font-bold mt-2">
          {{ level.template }}
        </p>

        <!-- Template options -->
        <div class="flex flex-col gap-2 mt-3 pb-4 border-b-2 border-neutral-300">
          <label class="font-bold">Choose Template :</label>
          <select class="bg-gray-50 border border-gray-300 p-2 rounded font-bold" 
          @change="
            (e) => {
              handleChangeTemplate(e.target.value, index);
            }
            ">
            <option v-for="template in QUIZ_TEMPLATES_TYPE" 
              :value="template.value" 
              :key="template.value"
              :selected="template.value === level.template"
              class="font-bold"
            >
              {{ template.label }}
            </option>
          </select>
        </div>

        <!-- Render Template -->
        <div class="mt-4 w-full">
          <MultiChoiceTextForm v-if="level.template === 'Multiple-choice-text'" :level-data="level" />
          <MultiChoiceImgForm v-else-if="level.template === 'Multiple-choice-image'" :level-data="level" />
          <MatchedForm v-else-if="level.template === 'Matched'" :level-data="level" />
          <arrangeSentencesForm v-else-if="level.template === 'Word-Shuffle'" :level-data="level" />
          <arrangePicForm v-else-if="level.template === 'Image-Shuffle'" :level-data="level" />
          <wordCheckForm v-else-if="level.template === 'WordCheck'" :level-data="level" />
        </div>
      </div>

      <div class="flex gap-3 self-end">
        <Button label="Add More Levels" :click="addMoreQuiz"
          class-name="bg-sky-500 border-b-sky-600 active:bg-sky-600"></Button>
        <Button label="Create Quiz" :click="handleCreateGame"></Button>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
