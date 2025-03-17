<script setup>
const { levelData } = defineProps({
  levelData: Object,
});

</script>
<template>
  <div class="max-w-xl">
    <div>
      <div class="flex flex-col">
        <label class="font-bold">Question Text</label>
        <input type="text" class="input" v-model="levelData.question" />
      </div>
      <div class="flex flex-col">
        <label class="font-bold">Question Image url (optional)</label>
        <img
          v-if="levelData.questionImage"
          :src="levelData.questionImage"
          class="w-[300px] h-[100px] bg-neutral-200"
          alt="preview question image "
        />
        <input type="text" class="input" v-model="levelData.questionImage" />
      </div>
    </div>

    <div>
      <h2 class="font-bold text-green-600">Correct Choice Image URL</h2>
      <div class="flex flex-col">
        <img
          v-if="levelData.choices[0].value"
          :src="levelData.choices[0].value"
          class="w-[300px] h-[100px] bg-neutral-200"
          alt="preview question image "
        />
        <input type="text" class="input" v-model="levelData.choices[0].value" />
      </div>
    </div>

    <div>
      <h2 class="font-bold">Incorrect Choice Image URL 1</h2>
      <div class="flex flex-col">
        <img
          v-if="levelData.choices[1].value"
          :src="levelData.choices[1].value"
          class="w-[300px] h-[100px] bg-neutral-200"
          alt="preview question image "
        />
        <input type="text" class="input" v-model="levelData.choices[1].value" />
      </div>
    </div>

    <div>
      <h2 class="font-bold">Incorrect Choice Image URL 2</h2>
      <div class="flex flex-col">
        <img
          v-if="levelData.choices[2].value"
          :src="levelData.choices[2].value"
          class="w-[300px] h-[100px] bg-neutral-200"
          alt="preview question image "
        />
        <input type="text" class="input" v-model="levelData.choices[2].value" />
      </div>
    </div>

    <div>
      <h2 class="font-bold">Incorrect Choice Image URL 3</h2>
      <div class="flex flex-col">
        <img
          v-if="levelData.choices[3].value"
          :src="levelData.choices[3].value"
          class="w-[300px] h-[100px] bg-neutral-200"
          alt="preview question image "
        />
        <input type="text" class="input" v-model="levelData.choices[3].value" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
