<script setup>
import { getQuizById, updateQuiz } from "@/api/quizsAPI";
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { QUIZ_TEMPLATES_TYPE } from "@/constants";
import MultiChoiceImgForm from "@/components/quiz_templates/form/MultiChoiceImgForm.vue";
import MultiChoiceTextForm from "@/components/quiz_templates/form/MultiChoiceTextForm.vue";
import MatchedForm from "@/components/quiz_templates/form/MatchedForm.vue";
import Icon from "@/components/Icon.vue";
import Button from "@/components/Button.vue";
import arrangeSentencesForm from "@/components/quiz_templates/form/arrangeSentencesForm.vue";
import arrangePicForm from "@/components/quiz_templates/form/arrangePicForm.vue";
import wordCheckForm from "@/components/quiz_templates/form/wordCheckForm.vue";

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
};

const handleRemoveLevel = (index) => {
  quizData.value.levels.splice(index, 1);
};

const addMoreQuiz = () => {
  quizData.value.levels.push(JSON.parse(JSON.stringify(QUIZ_TEMPLATES_TYPE[0].structure)));
};

const handleChangeTemplate = (templateType, levelIndex) => {
  for (const template of QUIZ_TEMPLATES_TYPE) {
    if (template.value === templateType) {
      quizData.value.levels[levelIndex] = JSON.parse(JSON.stringify(template.structure))
    }
  }
};

const handleUpdateGame = async () => {
  if (!isQuizDataValid()) return alert("Plase fill all the input");
  quizData.value.status = "pending";
  const res = await updateQuiz(quizData.value.id, quizData.value);
  if (res.success) {
    alert(res.message);
    router.push({ name: "workspace" });
  } else {
    alert(res.message);
  }
};

const isQuizDataValid = () => {
  // Check quiz field
  for (const key of Object.keys(quizData.value)) {
    if (!quizData.value[key] && key !== "thumbnail") {
      return false;
    }
  }

  for (const level of quizData.value.levels) {
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

const handleBackToWorkspace = () => {
  if (quizData.value.status === 'pending') {
    router.push({ name: 'workspace', query: { tab: "admin-review" } })
  } else {
    router.push({ name: 'workspace', query: { tab: "workspace" } })
  }
}

onBeforeMount(async () => {
  await getQuiz();
});
</script>

<template>
  <section class="p-4 relative" v-if="quizData">
    <Button
      :label="quizData.status === 'pending' ? 'Back to admin review' : 'Back to workspace'"
      class="absolute right-5 bg-red-500 border-red-600 active:bg-red-600"
      @click="handleBackToWorkspace">
    </Button>

    <div
      class="mx-auto flex flex-col gap-3 bg-white border border-neutral-300 p-4 rounded-xl shadow max-w-xl">
      <h1 class="text-4xl font-bold flex gap-3">
        <p>Update Quiz</p>
        <Icon name="quiz" class-name="fill-black size-10" />
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
        <img
          v-if="quizData.thumbnail"
          :src="quizData.thumbnail"
          alt="Quiz image"
          class="w-[300px] h-[200px] bg-neutral-200 rounded-xl object-center" />
        <input type="text" class="input" v-model="quizData.thumbnail" />
      </div>
    </div>

    <!-- Template -->
    <div class="mx-auto mt-5 flex flex-col max-w-xl gap-4">
      <div
        v-for="(level, index) in quizData.levels"
        class="relative bg-white border border-neutral-300 p-3 rounded-xl shadow">
        <span
          v-if="quizData.levels.length > 1"
          @click="() => handleRemoveLevel(index)"
          class="absolute right-0 top-0 cursor-pointer p-2 bg-red-500 rounded-tr-xl rounded-bl-xl">
          <Icon name="close" />
        </span>

        <h2
          class="text-2xl font-bold bg-green-500 border-3 border-green-600 py-1 px-2 rounded-full inline-block text-white">
          Level : {{ index + 1 }}
        </h2>
        <p class="text-2xl font-bold mt-2">
          {{ level.template }}
        </p>

        <!-- Template Options -->
        <div
          class="flex flex-col gap-2 mt-3 pb-4 border-b-2 border-neutral-300">
          <label class="font-bold">Choose Template :</label>
          <select
            class="bg-gray-50 border border-gray-300 p-2 rounded font-bold"
            @change="
              (e) => {
                handleChangeTemplate(e.target.value, index);
              }
            "
            >
            <option
              v-for="template in QUIZ_TEMPLATES_TYPE"
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
          <MultiChoiceTextForm
            v-if="level.template === 'Multiple-choice-text'"
            :level-data="level" />
          <MultiChoiceImgForm
            v-else-if="level.template === 'Multiple-choice-image'"
            :level-data="level" />
          <MatchedForm
            v-else-if="level.template === 'Matched'"
            :level-data="level" />
          <arrangeSentencesForm
            v-else-if="level.template === 'ArrangeSentences'"
            :level-data="level" />
          <arrangePicForm
            v-else-if="level.template === 'ArrangePic'"
            :level-data="level" />
          <wordCheckForm
            v-else-if="level.template === 'WordCheck'"
            :level-data="level" />
        </div>
      </div>

      <div class="flex gap-3 self-end">
        <Button
          label="Add More Levels"
          @click="addMoreQuiz"
          class-name="bg-sky-500 border-b-sky-600 active:bg-sky-600">
        </Button>
        <Button label="Update Quiz" @click="handleUpdateGame"></Button>
      </div>
    </div>
  </section>
  <section v-else>
    <div>
      <h1>Loading...</h1>
      <h2>Please Wait</h2>
    </div>
  </section>
</template>

<style scoped></style>
