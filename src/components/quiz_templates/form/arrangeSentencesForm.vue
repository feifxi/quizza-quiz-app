<script setup>
const { levelData } = defineProps({
    levelData: Object
});
</script>

<template>
    <div class="grid grid-cols-2 gap-4">
        <div class="max-w-md mr-1">
            <h2 class="font-bold">Word 1</h2>
            <div class="flex flex-col">
                <input type="text" class="input" v-model="levelData.words[0]" placeholder="Enter word 1" />
            </div>
        </div>

        <div class="max-w-md ml-1">
            <h2 class="font-bold">Word 2</h2>
            <div class="flex flex-col">
                <input type="text" class="input" v-model="levelData.words[1]" placeholder="Enter word 2" />
            </div>
        </div>

        <div class="max-w-md mr-1">
            <h2 class="font-bold">Word 3</h2>
            <div class="flex flex-col">
                <input type="text" class="input" v-model="levelData.words[2]" placeholder="Enter word 3" />
            </div>
        </div>

        <div class="max-w-md ml-1">
            <h2 class="font-bold">Word 4</h2>
            <div class="flex flex-col">
                <input type="text" class="input" v-model="levelData.words[3]" placeholder="Enter word 4" />
            </div>
        </div>

        <div class="max-w-md mr-1">
            <h2 class="font-bold">Word 5</h2>
            <div class="flex flex-col">
                <input type="text" class="input" v-model="levelData.words[4]" placeholder="Enter word 5" />
            </div>
        </div>

        <div class="max-w-md ml-1">
            <h2 class="font-bold">Word 6</h2>
            <div class="flex flex-col">
                <input type="text" class="input" v-model="levelData.words[5]" placeholder="Enter word 6" />
            </div>
        </div>
        <div class="max-w-md ml-1">
            <h2 class="font-bold">Word 7</h2>
            <div class="flex flex-col">
                <input type="text" class="input" v-model="levelData.words[6]" placeholder="Enter word 7" />
            </div>
        </div>
        <div class="max-w-md ml-1">
            <h2 class="font-bold">Word 8</h2>
            <div class="flex flex-col">
                <input type="text" class="input" v-model="levelData.words[7]" placeholder="Enter word 8" />
            </div>
        </div>
    </div>
</template>


<style scoped>

</style>
