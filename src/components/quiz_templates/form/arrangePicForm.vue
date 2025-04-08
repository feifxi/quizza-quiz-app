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
      <label class="font-bold">Correct Image 1</label>
      <img v-if="levelData.choices[0].value" :src="levelData.choices[0].value"
        class="w-[300px] h-[200px] bg-neutral-200 rounded-xl object-center" alt="preview question image " />
      <input type="text" class="input p-3 border rounded-md" v-model="levelData.choices[0].value"
        placeholder="Enter URL Image 1" />
    </div>

    <div class="flex flex-col gap-4">
      <label class="font-bold">Correct Image 2</label>
      <img v-if="levelData.choices[1].value" :src="levelData.choices[1].value"
        class="w-[300px] h-[200px] bg-neutral-200 rounded-xl object-center" alt="preview question image " />
      <input type="text" class="input p-3 border rounded-md" v-model="levelData.choices[1].value"
        placeholder="Enter URL Image 2" />
    </div>

    <div class="flex flex-col gap-4">

      <label class="font-bold">Correct Image 3</label>
      <img v-if="levelData.choices[2].value" :src="levelData.choices[2].value"
        class="w-[300px] h-[200px] bg-neutral-200 rounded-xl object-center" alt="preview question image " />
      <input type="text" class="input p-3 border rounded-md" v-model="levelData.choices[2].value"
        placeholder="Enter URL Image 3" />
    </div>

    <div class="flex flex-col gap-4">

      <label class="font-bold">Correct Image 4</label>
      <img v-if="levelData.choices[3].value" :src="levelData.choices[3].value"
        class="w-[300px] h-[200px] bg-neutral-200 rounded-xl object-center" alt="preview question image " />
      <input type="text" class="input p-3 border rounded-md" v-model="levelData.choices[3].value"
        placeholder="Enter URL Image 4" />
    </div>

    <div class="flex flex-col gap-4">

      <label class="font-bold">Correct Image 5</label>
      <img v-if="levelData.choices[4].value" :src="levelData.choices[4].value"
        class="w-[300px] h-[200px] bg-neutral-200 rounded-xl object-center" alt="preview question image " />
      <input type="text" class="input p-3 border rounded-md" v-model="levelData.choices[4].value"
        placeholder="Enter URL Image 5" />
    </div>

    <div class="flex flex-col gap-4">

      <label class="font-bold">Correct Image 6</label>
      <img v-if="levelData.choices[5].value" :src="levelData.choices[5].value"
        class="w-[300px] h-[200px] bg-neutral-200 rounded-xl object-center" alt="preview question image " />
      <input type="text" class="input p-3 border rounded-md" v-model="levelData.choices[5].value"
        placeholder="Enter URL Image 6" />
    </div>

    <div class="flex flex-col gap-4">
      <label class="font-bold">Correct Image 7</label>
      <img v-if="levelData.choices[6].value" :src="levelData.choices[6].value"
        class="w-[300px] h-[200px] bg-neutral-200 rounded-xl object-center" alt="preview question image " />
      <input type="text" class="input p-3 border rounded-md" v-model="levelData.choices[6].value"
        placeholder="Enter URL Image 7" />
    </div>

    <div class="flex flex-col gap-4">
      <label class="font-bold">Correct Image 8</label>
      <img v-if="levelData.choices[7].value" :src="levelData.choices[7].value"
        class="w-[300px] h-[200px] bg-neutral-200 rounded-xl object-center" alt="preview question image " />
      <input type="text" class="input p-3 border rounded-md" v-model="levelData.choices[7].value"
        placeholder="Enter URL Image 8" />
    </div>
  </div>
</template>

<style scoped></style>
