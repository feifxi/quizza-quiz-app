<script setup>
import { onBeforeMount, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

    const route = useRoute();
    const { quizId } = route.params
    
  
</script>

<template>
  <section>
    <h1>Edit Page {{ quizId }}</h1>


  </section>
  
</template>

<style scoped>
</style>
