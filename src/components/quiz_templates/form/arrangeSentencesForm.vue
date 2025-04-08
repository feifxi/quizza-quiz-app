<script setup>
const { levelData } = defineProps({
  levelData: Object,
});
</script>
<template>
  <div class="grid grid-cols-2 gap-6">

    <div class="flex flex-col gap-4">
      <label class="font-bold">Question</label>
      <input type="text" class="input p-3 border rounded-md" v-model="levelData.question"
        placeholder="Enter your question" />
    </div>

    <div class="flex flex-col gap-4">
      <label class="font-bold">Question image URL (optional)</label>
      <img v-if="levelData.questionImage" :src="levelData.questionImage"
        class="w-[300px] h-[200px] bg-neutral-200 rounded-xl object-center" alt="preview question image" />
      <input type="text" class="input p-3 border rounded-md" v-model="levelData.questionImage"
        placeholder="Enter image URL" />
    </div>


    <div class="flex flex-col gap-4">
      <label class="font-bold">Correct Word 1</label>
      <input type="text" class="input p-3 border rounded-md" v-model="levelData.choices[0].value"
        placeholder="Enter word 1" />
    </div>

    <div class="flex flex-col gap-4">
      <label class="font-bold">Correct Word 2</label>
      <input type="text" class="input p-3 border rounded-md" v-model="levelData.choices[1].value"
        placeholder="Enter word 2" />
    </div>

    <div class="flex flex-col gap-4">
      <label class="font-bold">Correct Word 3</label>
      <input type="text" class="input p-3 border rounded-md" v-model="levelData.choices[2].value"
        placeholder="Enter word 3" />
    </div>

    <div class="flex flex-col gap-4">
      <label class="font-bold">Correct Word 4</label>
      <input type="text" class="input p-3 border rounded-md" v-model="levelData.choices[3].value"
        placeholder="Enter word 4" />
    </div>

    <div class="flex flex-col gap-4">
      <label class="font-bold">Correct Word 5</label>
      <input type="text" class="input p-3 border rounded-md" v-model="levelData.choices[4].value"
        placeholder="Enter word 5" />
    </div>

    <div class="flex flex-col gap-4">
      <label class="font-bold">Correct Word 6</label>
      <input type="text" class="input p-3 border rounded-md" v-model="levelData.choices[5].value"
        placeholder="Enter word 6" />
    </div>

    <div class="flex flex-col gap-4">
      <label class="font-bold">Correct Word 7</label>
      <input type="text" class="input p-3 border rounded-md" v-model="levelData.choices[6].value"
        placeholder="Enter word 7" />
    </div>

    <div class="flex flex-col gap-4">
      <label class="font-bold">Correct Word 8</label>
      <input type="text" class="input p-3 border rounded-md" v-model="levelData.choices[7].value"
        placeholder="Enter word 8" />
    </div>
  </div>
</template>

<style scoped></style>
