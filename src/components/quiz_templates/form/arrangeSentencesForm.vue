<script setup>
const { levelData } = defineProps({
  levelData: Object,
});
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    
    <div class="flex flex-col gap-2">
        <label class="font-bold">Question</label>
        <input type="text" class="input" v-model="levelData.question"
            placeholder="" />
    </div>

    <div class="flex flex-col gap-2">
        <label class="font-bold">Question image URL (optional)</label>
        <img v-if="levelData.questionImage" :src="levelData.questionImage"
            class="w-[300px] h-[200px] bg-neutral-200 rounded-xl object-center" alt="preview question image " />
        <input type="text" class="input" v-model="levelData.questionImage" />
    </div>

    <section>
      <div class="max-w-md mr-1">
        <h2 class="font-bold">Word 1</h2>
        <div class="flex flex-col">
          <input
            type="text"
            class="input"
            v-model="levelData.choices[0].value"
            placeholder="Enter word 1" />
        </div>
      </div>

      <div class="max-w-md ml-1">
        <h2 class="font-bold">Word 2</h2>
        <div class="flex flex-col">
          <input
            type="text"
            class="input"
            v-model="levelData.choices[1].value"
            placeholder="Enter word 2" />
        </div>
      </div>

      <div class="max-w-md mr-1">
        <h2 class="font-bold">Word 3</h2>
        <div class="flex flex-col">
          <input
            type="text"
            class="input"
            v-model="levelData.choices[2].value"
            placeholder="Enter word 3" />
        </div>
      </div>

      <div class="max-w-md ml-1">
        <h2 class="font-bold">Word 4</h2>
        <div class="flex flex-col">
          <input
            type="text"
            class="input"
            v-model="levelData.choices[3].value"
            placeholder="Enter word 4" />
        </div>
      </div>

      <div class="max-w-md mr-1">
        <h2 class="font-bold">Word 5</h2>
        <div class="flex flex-col">
          <input
            type="text"
            class="input"
            v-model="levelData.choices[4].value"
            placeholder="Enter word 5" />
        </div>
      </div>

      <div class="max-w-md ml-1">
        <h2 class="font-bold">Word 6</h2>
        <div class="flex flex-col">
          <input
            type="text"
            class="input"
            v-model="levelData.choices[5].value"
            placeholder="Enter word 6" />
        </div>
      </div>
      <div class="max-w-md ml-1">
        <h2 class="font-bold">Word 7</h2>
        <div class="flex flex-col">
          <input
            type="text"
            class="input"
            v-model="levelData.choices[6].value"
            placeholder="Enter word 7" />
        </div>
      </div>
      <div class="max-w-md ml-1">
        <h2 class="font-bold">Word 8</h2>
        <div class="flex flex-col">
          <input
            type="text"
            class="input"
            v-model="levelData.choices[7].value"
            placeholder="Enter word 8" />
        </div>
      </div>
    </section>
    <section>
      <div class="max-w-md mr-1">
        <h2 class="font-bold">Correct Word 1</h2>
        <div class="flex flex-col">
          <input
            type="text"
            class="input"
            v-model="levelData.choices[0].order"
            placeholder="Enter word 1" />
        </div>
      </div>

      <div class="max-w-md ml-1">
        <h2 class="font-bold">Correct Word 2</h2>
        <div class="flex flex-col">
          <input
            type="text"
            class="input"
            v-model="levelData.choices[1].order"
            placeholder="Enter word 2" />
        </div>
      </div>

      <div class="max-w-md mr-1">
        <h2 class="font-bold">Correct Word 3</h2>
        <div class="flex flex-col">
          <input
            type="text"
            class="input"
            v-model="levelData.choices[2].order"
            placeholder="Enter word 3" />
        </div>
      </div>

      <div class="max-w-md ml-1">
        <h2 class="font-bold">Correct Word 4</h2>
        <div class="flex flex-col">
          <input
            type="text"
            class="input"
            v-model="levelData.choices[3].order"
            placeholder="Enter word 4" />
        </div>
      </div>

      <div class="max-w-md mr-1">
        <h2 class="font-bold">Correct Word 5</h2>
        <div class="flex flex-col">
          <input
            type="text"
            class="input"
            v-model="levelData.choices[4].order"
            placeholder="Enter word 5" />
        </div>
      </div>

      <div class="max-w-md ml-1">
        <h2 class="font-bold">Correct Word 6</h2>
        <div class="flex flex-col">
          <input
            type="text"
            class="input"
            v-model="levelData.choices[5].order"
            placeholder="Enter word 6" />
        </div>
      </div>
      <div class="max-w-md ml-1">
        <h2 class="font-bold">Correct Word 7</h2>
        <div class="flex flex-col">
          <input
            type="text"
            class="input"
            v-model="levelData.choices[6].order"
            placeholder="Enter word 7" />
        </div>
      </div>
      <div class="max-w-md ml-1">
        <h2 class="font-bold">Correct Word 8</h2>
        <div class="flex flex-col">
          <input
            type="text"
            class="input"
            v-model="levelData.choices[7].order"
            placeholder="Enter word 8" />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
