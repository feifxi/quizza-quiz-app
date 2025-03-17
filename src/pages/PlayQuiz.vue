<script setup>
import { getQuizById } from '@/api/quizsAPI';
import Button from '@/components/Button.vue';
import MultiChoiceImgQuiz from '@/components/quiz_templates/playing/MultiChoiceImgQuiz.vue';
import MultiChoiceTextQuiz from '@/components/quiz_templates/playing/MultiChoiceTextQuiz.vue';
import { useAuthStore } from '@/stores/user';
import { computed, onBeforeMount, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const { quizId } = route.params


const currentLevel = ref(0)
const isLoading = ref(false)
const currentScore = ref(0)
const quizData = ref(null)

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

const handleMoveToNextLevel = () => {
  currentLevel.value = currentLevel.value + 1

  if (currentLevel.value === quizData.value.levels.length) {
    console.log('active')
    alert('End Quiz Back to Home idiot!')
    router.push({ name: 'home', query:{ quizId: quizData.value.id }})
  } 
}

const increaseScore = () => {
  currentScore.value = currentScore.value + 1
}

onBeforeMount(async ()=>{
  await fetchQuiz()
});

</script>

<template>
  <div v-if="isLoading">
    Loading...
  </div>
  <section v-else>
    <h1 class="text-3xl font-bold">Play Quiz : {{ quizId }}</h1>
    <h1 class="font-bold">Level : {{ (currentLevel + 1) + "/" + quizData.levels.length }}</h1>
    <h1 class="font-bold">Score : {{ currentScore }}</h1>

    <div>

    </div>
    <MultiChoiceTextQuiz 
      :level-data="quizData?.levels[currentLevel]"
      :increase-score="increaseScore"
      :go-next="handleMoveToNextLevel"  
    />
    <!-- <MultiChoiceImgQuiz /> -->
  </section>
</template>

<style scoped>
</style>