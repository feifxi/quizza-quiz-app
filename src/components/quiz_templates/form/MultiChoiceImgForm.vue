<script setup>
const { levelData } = defineProps({
  levelData: Object,
});

</script>
<template>
  <div class="max-w-xl">
    <div>
      <div class="flex flex-col gap-2">
        <label class="font-bold">Question Text</label>
        <input type="text" class="input" v-model="levelData.question" />
      </div>

      <div class="flex flex-col gap-2">
        <label class="font-bold">Question image url (optional)</label>
        <img v-if="levelData.questionImage" :src="levelData.questionImage" class="w-[300px] h-[200px] bg-neutral-200 rounded-xl object-center" alt="preview question image " />
        <input type="text" class="input" v-model="levelData.questionImage" />
      </div>
    </div>

    <div>
      <h2 class="font-bold text-green-600">Correct Choice image URL</h2>
      <div class="flex flex-col gap-2">
        <img v-if="levelData.choices[0].value" :src="levelData.choices[0].value"
          class="w-[300px] h-[200px] bg-neutral-200 rounded-xl object-center" alt="preview question image " />
        <input type="text" class="input" v-model="levelData.choices[0].value" />
      </div>
    </div>

    <div>
      <h2 class="font-bold">Incorrect Choice image URL 1</h2>
      <div class="flex flex-col gap-2">
        <img v-if="levelData.choices[1].value" :src="levelData.choices[1].value"
          class="w-[300px] h-[200px] bg-neutral-200 rounded-xl object-center" alt="preview question image " />
        <input type="text" class="input" v-model="levelData.choices[1].value" />
      </div>
    </div>

    <div>
      <h2 class="font-bold">Incorrect Choice image URL 2</h2>
      <div class="flex flex-col gap-2">
        <img v-if="levelData.choices[2].value" :src="levelData.choices[2].value"
          class="w-[300px] h-[200px] bg-neutral-200 rounded-xl object-center" alt="preview question image " />
        <input type="text" class="input" v-model="levelData.choices[2].value" />
      </div>
    </div>

    <div>
      <h2 class="font-bold">Incorrect Choice image URL 3</h2>
      <div class="flex flex-col gap-2">
        <img v-if="levelData.choices[3].value" :src="levelData.choices[3].value"
          class="w-[300px] h-[200px] bg-neutral-200 rounded-xl object-center" alt="preview question image " />
        <input type="text" class="input" v-model="levelData.choices[3].value" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
