<script setup>
import { reactive, watch } from "vue";

    const { levelIndex } = defineProps({
        levelIndex: Number
    })
    const emit = defineEmits(['handleInputChange'])

    const handleChange = (field ,value) => {
        emit('handleInputChange', levelIndex, field, value)
    }

    const choices = reactive([
        { label: "" , isAns: true},
        { label: "" , isAns: false},
        { label: "" , isAns: false},
        { label: "" , isAns: false},
    ])

    watch(choices, (newValue, oldValue) => {
        emit('handleInputChange', levelIndex, 'choices', choices)
    });
</script>
<template>
  <div class="max-w-xl">
    <div>
        <div class="flex flex-col">
            <label class="font-bold">Question Text</label>
            <input type="text" class="input" @change="(e) => handleChange('question', e.target.value)" />
        </div>
        <div class="flex flex-col">
            <label class="font-bold">Question Image url (optional)</label>
            <input type="text" class="input" @change="(e) => handleChange('questionImage', e.target.value)" />
        </div>
    </div>

    <div>
        <h2 class="font-bold text-green-600">Correct Image URL Choice</h2>
        <div class="flex flex-col">
            <input type="text" class="input" v-model="choices[0].label" />
        </div>
    </div>

    <div>
        <h2 class="font-bold">Incorrect Image URL Choice 1</h2>
        <div class="flex flex-col">
            <input type="text" class="input" v-model="choices[1].label" />
        </div>
    </div>

    <div>
        <h2 class="font-bold">Incorrect Image URL Choice 2</h2>
        <div class="flex flex-col">
            <input type="text" class="input" v-model="choices[2].label" />
        </div>
    </div>

    <div>
        <h2 class="font-bold">Incorrect Image URL Choice 3</h2>
        <div class="flex flex-col">
            <input type="text" class="input" v-model="choices[3].label" />
        </div>
    </div>
  </div>
</template>

<style scoped></style>
