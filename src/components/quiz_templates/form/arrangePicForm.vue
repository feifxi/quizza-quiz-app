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
        <h2 class="font-bold">Image 1</h2>
        <div class="flex flex-col">
          <input
            type="text"
            class="input"
            v-model="levelData.choices[0].value"
            placeholder="Enter URL Image 1" />
        </div>
      </div>

      <div class="max-w-md ml-1">
        <h2 class="font-bold">Image 2</h2>
        <div class="flex flex-col">
          <input
            type="text"
            class="input"
            v-model="levelData.choices[1].value"
            placeholder="Enter URL Image 2" />
        </div>
      </div>

      <div class="max-w-md mr-1">
        <h2 class="font-bold">Image 3</h2>
        <div class="flex flex-col">
          <input
            type="text"
            class="input"
            v-model="levelData.choices[2].value"
            placeholder="Enter URL Image 3" />
        </div>
      </div>

      <div class="max-w-md ml-1">
        <h2 class="font-bold">Image 4</h2>
        <div class="flex flex-col">
          <input
            type="text"
            class="input"
            v-model="levelData.choices[3].value"
            placeholder="Enter URL Image 4" />
        </div>
      </div>

      <div class="max-w-md mr-1">
        <h2 class="font-bold">Image 5</h2>
        <div class="flex flex-col">
          <input
            type="text"
            class="input"
            v-model="levelData.choices[4].value"
            placeholder="Enter URL Image 5" />
        </div>
      </div>

      <div class="max-w-md ml-1">
        <h2 class="font-bold">Image 6</h2>
        <div class="flex flex-col">
          <input
            type="text"
            class="input"
            v-model="levelData.choices[5].value"
            placeholder="Enter URL Image 6" />
        </div>
      </div>
      <div class="max-w-md ml-1">
        <h2 class="font-bold">Image 7</h2>
        <div class="flex flex-col">
          <input
            type="text"
            class="input"
            v-model="levelData.choices[6].value"
            placeholder="Enter URL Image 7" />
        </div>
      </div>
      <div class="max-w-md ml-1">
        <h2 class="font-bold">Image 8</h2>
        <div class="flex flex-col">
          <input
            type="text"
            class="input"
            v-model="levelData.choices[7].value"
            placeholder="Enter URL Image 8" />
        </div>
      </div>
    </section>
    <section>
      <div class="max-w-md mr-1">
        <h2 class="font-bold">Correct Image 1</h2>
        <div class="flex flex-col">
          <input
            type="text"
            class="input"
            v-model="levelData.choices[0].order"
            placeholder="Enter URL Image 1" />
        </div>
      </div>

      <div class="max-w-md ml-1">
        <h2 class="font-bold">Correct Image 2</h2>
        <div class="flex flex-col">
          <input
            type="text"
            class="input"
            v-model="levelData.choices[1].order"
            placeholder="Enter URL Image 2" />
        </div>
      </div>

      <div class="max-w-md mr-1">
        <h2 class="font-bold">Correct Image 3</h2>
        <div class="flex flex-col">
          <input
            type="text"
            class="input"
            v-model="levelData.choices[2].order"
            placeholder="Enter URL Image 3" />
        </div>
      </div>

      <div class="max-w-md ml-1">
        <h2 class="font-bold">Correct Image 4</h2>
        <div class="flex flex-col">
          <input
            type="text"
            class="input"
            v-model="levelData.choices[3].order"
            placeholder="Enter URL Image 4" />
        </div>
      </div>

      <div class="max-w-md mr-1">
        <h2 class="font-bold">Correct Image 5</h2>
        <div class="flex flex-col">
          <input
            type="text"
            class="input"
            v-model="levelData.choices[4].order"
            placeholder="Enter URL Image 5" />
        </div>
      </div>

      <div class="max-w-md ml-1">
        <h2 class="font-bold">Correct Image 6</h2>
        <div class="flex flex-col">
          <input
            type="text"
            class="input"
            v-model="levelData.choices[5].order"
            placeholder="Enter URL Image 6" />
        </div>
      </div>
      <div class="max-w-md ml-1">
        <h2 class="font-bold">Correct Image 7</h2>
        <div class="flex flex-col">
          <input
            type="text"
            class="input"
            v-model="levelData.choices[6].order"
            placeholder="Enter URL Image 7" />
        </div>
      </div>
      <div class="max-w-md ml-1">
        <h2 class="font-bold">Correct Image 8</h2>
        <div class="flex flex-col">
          <input
            type="text"
            class="input"
            v-model="levelData.choices[7].order"
            placeholder="Enter URL Image 8" />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
