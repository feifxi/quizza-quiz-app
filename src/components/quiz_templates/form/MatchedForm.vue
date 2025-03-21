<script setup>
const { levelData } = defineProps({
    levelData: Object
});
</script>
<template>
    <div class="grid grid-cols-2">
        <div class="max-w-md mr-1">
            <h2 class="font-bold">Pair 1</h2>
            <div class="flex flex-col">
                <input type="text" class="input" v-model="levelData.choices[0].key" />
            </div>
        </div>

        <div class="max-w-md ml-1">
            <h2 class="font-bold">Pair 1</h2>
            <div class="flex flex-col">
                <input type="text" class="input" v-model="levelData.choices[0].pair" />
            </div>
        </div>

        <div class="max-w-md mr-1">
            <h2 class="font-bold">Pair 2</h2>
            <div class="flex flex-col">
                <input type="text" class="input" v-model="levelData.choices[1].key" />
            </div>
        </div>

        <div class="max-w-md ml-1">
            <h2 class="font-bold">Pair 2</h2>
            <div class="flex flex-col">
                <input type="text" class="input" v-model="levelData.choices[1].pair" />
            </div>
        </div>

        <div class="max-w-md mr-1">
            <h2 class="font-bold">Pair 3</h2>
            <div class="flex flex-col">
                <input type="text" class="input" v-model="levelData.choices[2].key" />
            </div>
        </div>

        <div class="max-w-md ml-1">
            <h2 class="font-bold">Pair 3</h2>
            <div class="flex flex-col">
                <input type="text" class="input" v-model="levelData.choices[2].pair" />
            </div>
        </div>

        <div class="max-w-md mr-1">
            <h2 class="font-bold">Pair 4</h2>
            <div class="flex flex-col">
                <input type="text" class="input" v-model="levelData.choices[3].key" />
            </div>
        </div>

        <div class="max-w-md ml-1">
            <h2 class="font-bold">Pair 4</h2>
            <div class="flex flex-col">
                <input type="text" class="input" v-model="levelData.choices[3].pair" />
            </div>
        </div>
    </div>
</template>
<style scoped></style>