<script>
import {
  getAllQuizs,
  getQuizById,
  patchQuiz
} from '@/api/quizsAPI';
import Button from '@/components/Button.vue';
import MultiChoiceImgQuiz from '@/components/quiz_templates/playing/MultiChoiceImgQuiz.vue';
import MultiChoiceTextQuiz from '@/components/quiz_templates/playing/MultiChoiceTextQuiz.vue';
import {
  useAuthStore
} from '@/stores/user';
import {
  computed,
  onBeforeMount,
  onBeforeUnmount,
  reactive,
  ref
} from 'vue';
import {
  useRoute,
  useRouter
} from 'vue-router';
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const {
  quizId
} = route.params

const quizData = ref(null)
const isLoading = ref(false)
const currentLevel = ref(0)
const currentScore = ref(0)
const isDone = ref(false)

const fetchQuiz = async () => {
  try {
    isLoading.value = true
    const res = await getQuizById(quizId);
    quizData.value = res.data;
    isLoading.value = false
  } catch (error) {
    console.log(`Something went wrong! T-T : ${error}`);
  }
}

const handleMoveToNextLevel = async () => {
  

  if (currentLevel.value + 1 === quizData.value.levels.length) {
    // Get the latest quiz data
    const res = await getQuizById(quizData.value.id)
    if (res.success) {
      const latestProgess = res.data.playerProgress
      // If progress of player is existed update the existed data but if not push the new data
      const progressIdx = latestProgess.findIndex((progress) => progress.userId === authStore.authUser.id)
      const newProgress = {
        userId: authStore.authUser.id,
        star: currentScore.value
      }
      if (progressIdx >= 0) {
        // console.log('replace')
        latestProgess[progressIdx] = newProgress
      } else {
        // console.log('add new')
        latestProgess.push(newProgress)
        // console.log(latestProgess)
      }
      const result = await patchQuiz(quizData.value.id, { playerProgress: latestProgess })
      alert('End Game!! - You achive ' + currentScore.value + ' Star! ⭐')
      router.push({ name: 'home', query: { quizId: quizData.value.id } })
    }
  } else {
    currentLevel.value = currentLevel.value + 1
  }
}

const increaseScore = () => {
  currentScore.value = currentScore.value + 1
}

onBeforeMount(async () => {
  await fetchQuiz()
});
</script>

<template>
  <div v-if="isLoading">
    Loading...
  </div>

  <section v-else class="p-3">
    <div>
      <h2 class="text-2xl font-bold">Question : {{ (currentLevel + 1) + " / " + quizData.levels.length }}</h2>
      <h2 class="font-bold">Current Score : {{ currentScore + '⭐'}}</h2>
    </div>

    <div class="mt-2">
      <MultiChoiceTextQuiz v-if="quizData.levels[currentLevel]?.template === 'Multiple-choice-text'"
        :level-data="quizData.levels[currentLevel]" :increase-score="increaseScore" :go-next="handleMoveToNextLevel" />
    </div>
    <div>
      <MultiChoiceImgQuiz v-if="quizData.levels[currentLevel]?.template === 'Multiple-choice-image'"
        :level-data="quizData.levels[currentLevel]" :increase-score="increaseScore" :go-next="handleMoveToNextLevel" />
    </div>
  </section>
</template>

<style scoped></style>
