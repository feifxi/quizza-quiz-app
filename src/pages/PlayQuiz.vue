<script setup>
import { getQuizById } from '@/api/quizsAPI';
import { useAuthStore } from '@/stores/user';
import { computed, onBeforeMount, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const { quizId } = route.params
const { level } = route.query

const quizData = ref(null)
const currentProgress = ref(null)
 
const fetchQuiz = async () => {
  try {
    const res = await getQuizById(quizId);
    quizData.value = res.data;
    currentProgress.value = res.data.playerProgress.find((history) => history.userId === authStore.authUser.id) 
    || {  userId: authStore.authUser.id, currentLevel: 0 }
    console.log(currentProgress.value)
  } catch (error) {
    console.log(`Something went wrong! T-T : ${error}`);
  }
}




onBeforeMount(async ()=>{
  await fetchQuiz()
  if (level < 0 || level > currentProgress.value.currentLevel) {
    router.push({ name:'home', query: { quizId:quizId } })
  }
});

</script>

<template>
  <section>
    <h1>Play Quiz : {{ quizId }}</h1>
    <h1>Level : {{ level }}</h1>
  </section>
</template>

<style scoped>
</style>