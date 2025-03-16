<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
const { quiz } = defineProps({
    quiz: Object,
    closeModal: Function,
});

console.log(quiz)
</script>

<template>
    <div class="fixed top-0 left-0 bg-black/80 w-full h-screen flex items-center justify-center">
        <div class="relative bg-white w-full max-w-2xl max-h-3/4 p-6 pr-10 rounded-xl flex">
            <span class="absolute top-4 right-4 cursor-pointer" @click="closeModal">X</span>
            <div>
                comment
            </div>
        </div>
    </div>
</template>

<style scoped></style>
