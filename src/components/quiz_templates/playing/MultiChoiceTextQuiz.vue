<script setup>
import Button from '@/components/Button.vue';
  const { levelData, goNext, increaseScore } = defineProps({
    levelData: Object,
    goNext: Function, 
    increaseScore: Function,
  });

  console.log(levelData)
</script>
<template>
  <div class="border border-black p-3">
    <h2 class="">Multiple Choice Text Template</h2>
    <Button :label="'go next'" :click="goNext"></Button>
    <Button :label="'increaseScore'" :click="increaseScore"></Button>
  </div>
</template>

<style scoped></style>
