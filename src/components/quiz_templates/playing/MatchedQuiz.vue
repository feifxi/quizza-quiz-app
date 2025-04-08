<script setup>
import { random } from '@/libs';
import { onMounted, ref, watch } from 'vue';
const { levelData, goNext, increaseScore } = defineProps({
    levelData: Object,
    goNext: Function,
    increaseScore: Function,
});

const selectedKey = ref(null);
const corrects = ref([]);
const matchedKeys = ref([]), matchedPairs = ref([]);
const randomKeys = ref([]), randomPairs = ref([]);

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
                alert("Incorrect Answer 👽👽, NOOB 👽");
                goNext();
                break;
            } else {
                count++;
            }
        }
        if (count === 4) {
            alert("Correct Answer 😎😎");
            increaseScore();
            goNext();
        }
    }
}

const resetLevel = () => {
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
    <div class="p-3 border border-green-600 rounded-2xl bg-green-600">
        <h2 class="p-3 border border-green-600 bg-white rounded-2xl font-bold text-3xl">{{ levelData.question }}
        </h2>
        <br>
        <div class="grid grid-cols-2 gap-3">
            <div class="grid grid-cols-1 gap-3">
                <button v-for="choice of randomKeys" class="p-3 border border-black rounded-2xl text-2xl font-bold"
                    :class="{
                        'bg-blue-500 border-blue-600 text-white cursor-default': selectedKey === choice.key,
                        'bg-gray-500 border-gray-600 text-white cursor-not-allowed': matchedKeys.includes(choice.key),
                        'bg-white hover:bg-gray-200 cursor-pointer': selectedKey !== choice.key && !matchedKeys.includes(choice.key)
                    }" :disabled="matchedKeys.includes(choice.key)" @click="() => { handleSelectedKey(choice.key) }">
                    {{ choice.key }}
                </button>
            </div>
            <div class="grid grid-cols-1 gap-3">
                <button v-for="choice of randomPairs" class="p-3 border border-black rounded-2xl text-2xl font-bold"
                    :class="{
                        'bg-white hover:bg-gray-200 cursor-pointer': !matchedPairs.includes(choice.pair),
                        'bg-gray-500 border-gray-600 text-white cursor-not-allowed': matchedPairs.includes(choice.pair)
                    }" :disabled="matchedPairs.includes(choice.pair)"
                    @click="() => { handleSelectedPair(choice.pair) }">
                    {{ choice.pair }}
                </button>
            </div>
        </div>
    </div>
</template>
<style scoped></style>