<script setup>
import { random } from '@/libs';
import { onMounted, reactive, ref, watch } from 'vue';
const { levelData, goNext, increaseScore } = defineProps({
    levelData: Object,
    goNext: Function,
    increaseScore: Function,
});

const selectedKey = ref(null);
const corrects = ref([]);
const matchedKeys = ref([]), matchedPairs = ref([]);
const randomKeys = ref([]), randomPairs = ref([]);
let level = 0;

// Get the selected key (left button)
const handleSelectedKey = (key) => {
    if (!matchedKeys.value.includes(key)) {
        selectedKey.value = key;
    }
}

// Get the selected pair (right button)
const handleSelectedPair = (pair) => {
    if (!matchedPairs.value.includes(pair)) {
        // Check if the selected key has already chosen
        if (!selectedKey.value) {
            alert("Please select one of the left button first.");
        }

        for (const keyPair of levelData.choices) {
            if (keyPair.key === selectedKey.value) {
                keyPair.selectedPair = pair;
                matchedKeys.value.push(selectedKey.value);
                selectedKey.value = null;
                matchedPairs.value.push(pair);
                handleCorrectPair(keyPair.pair, keyPair.selectedPair);
            }
        }
    }
}

// Check if the selected pair (right button) has the same value from pair in DB
const handleCorrectPair = (pair, selected) => {
    if (selected === pair) { corrects.value.push(true); }
    else { corrects.value.push(false); }

    if (corrects.value.length === 4) {
        let count = 0;
        for (const key of corrects.value) {
            if (!key) {
                alert("Incorrect Pair(s)!");
                goNext();
                break;
            } else {
                count++;
            }
        }
        if (count === 4) {
            alert("All Correct Pairs!");
            increaseScore();
            goNext();
        }
    }
}

const resetLevel = () => {
    level++;
    selectedKey.value = null;
    corrects.value = [];
    matchedKeys.value = [], matchedPairs.value = [];
}

const shuffleChoices = () => {
    randomKeys.value = random(levelData.choices);
    randomPairs.value = random(levelData.choices);
}

onMounted(shuffleChoices);

watch(() => { levelData }, () => {
    resetLevel();
    shuffleChoices();
}, { deep: true });
</script>
<template>
    <div class="border border-black p-3">
        <div class="grid grid-cols-2 gap-3">
            <div class="grid grid-cols-1 gap-3">
                <button v-for="choice of randomKeys" class="border border-black p-3 cursor-pointer text-2xl font-bold"
                    :class="{
                        'bg-blue-500 border-blue-600 text-white': selectedKey === choice.key,
                        'bg-green-500 border-green-600 text-white': matchedKeys.includes(choice.key)
                    }" :disabled="matchedKeys.includes(choice.key)" @click="() => { handleSelectedKey(choice.key) }">
                    {{ choice.key }}
                </button>
            </div>
            <div class="grid grid-cols-1 gap-3">
                <button v-for="choice of randomPairs" class="border border-black p-3 cursor-pointer text-2xl font-bold"
                    :class="{
                        'bg-green-500 border-green-600 text-white': matchedPairs.includes(choice.pair)
                    }" :disabled="matchedPairs.includes(choice.pair)"
                    @click="() => { handleSelectedPair(choice.pair) }">
                    {{ choice.pair }}
                </button>
            </div>
        </div>
    </div>
</template>
<style scoped></style>