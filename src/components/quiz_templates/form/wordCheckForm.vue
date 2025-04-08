<script setup>
const { levelData } = defineProps({
    levelData: Object
});
</script>
<template>
    <div>
        <div class="flex flex-col gap-2">
            <label class="font-bold">Question (place _ for letter you want to hide)</label>
            <input type="text" class="input" v-model="levelData.question" placeholder="Word that you want to hint." />
        </div>

        <div class="flex flex-col gap-2">
            <label class="font-bold">Answer</label>
            <input type="text" class="input" v-model="levelData.choices[0].value" placeholder="the Answer word" />
        </div>

        <div class="flex flex-col gap-2">
            <label class="font-bold">Question image URL (optional)</label>
            <img v-if="levelData.questionImage" :src="levelData.questionImage"
                class="w-[300px] h-[200px] bg-neutral-200 rounded-xl object-center" alt="preview question image " />
            <input type="text" class="input" v-model="levelData.questionImage" />
        </div>

    </div>
</template>
<style scoped></style>