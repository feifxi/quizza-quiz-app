<script setup>
const { levelData } = defineProps({
  levelData: Object,
});
</script>
<template>
  <div class="max-w-xl">
    <div>
      <div class="flex flex-col gap-2">
        <label class="font-bold">Question</label>
        <input type="text" class="input" v-model="levelData.question" />
      </div>

      <div class="flex flex-col gap-2">
        <label class="font-bold">Question image URL (optional)</label>
        <img v-if="levelData.questionImage" :src="levelData.questionImage"
          class="w-[300px] h-[200px] bg-neutral-200 rounded-xl object-center" alt="preview question image " />
        <input type="text" class="input" v-model="levelData.questionImage" />
      </div>
    </div>

    <div class="flex flex-col gap-2">
      <h2 class="font-bold text-green-600">Correct Choice</h2>
      <input type="text" class="input" v-model="levelData.choices[0].value" />
    </div>

    <div class="flex flex-col gap-2">
      <h2 class="font-bold">Incorrect Choice 1</h2>
      <input type="text" class="input" v-model="levelData.choices[1].value" />
    </div>

    <div class="flex flex-col gap-2">
      <h2 class="font-bold">Incorrect Choice 2</h2>
      <input type="text" class="input" v-model="levelData.choices[2].value" />
    </div>

    <div class="flex flex-col gap-2">
      <h2 class="font-bold">Incorrect Choice 3</h2>
      <input type="text" class="input" v-model="levelData.choices[3].value" />
    </div>
  </div>
</template>

<style scoped></style>
