<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
const { quizData, playingData } = defineProps({
    closeModal: Function,
    quizData: Object,
    playingData: Object,
});
</script>

<template>
    <div class="fixed top-0 left-0 bg-black/80 w-full h-screen flex items-center justify-center">
        <div class="relative bg-white w-full max-w-2xl max-h-3/4 p-6 pr-10 rounded-xl flex">
            <span class="absolute top-4 right-4 cursor-pointer" @click="closeModal">X</span>
            <!-- Quiz Info -->
            <div class="flex-1">
                <h2 class="text-2xl font-bold">{{ quizData.title }}</h2>
                <p class="border-b-2 border-neutral-200">
                    By : {{ quizData.createBy.userName }}
                </p>
                <p class="">
                    {{ "description..." }}
                </p>
            </div>
            <!-- Level -->
            <div class="flex-1 flex flex-col p-3 items-center gap-2 border border-black max-w-50 overflow-y-scroll">
                <div v-for="(level, index) of quizData.levels" :class="index % 2 == 0 ? 'self-end' : 'self-start'">
                    <RouterLink :to="playingData.currentLevel < index
                            ? ''
                            : {
                                name: 'quiz',
                                params: { quizId: quizData.id },
                                query: { level: index },
                            }
                        " :class="'text-3xl font-bold size-25 flex items-center justify-center rounded-full hover:scale-110 transition-all ' +
                (playingData.currentLevel < index
                    ? 'bg-neutral-200 cursor-not-allowed'
                    : 'bg-green-400 active:scale-95')
                ">
                        {{ index + 1 }}
                    </RouterLink>

                    <!-- <div v-if="(index != quizData.levels.length - 1) && (quizData.levels.length > 1)">
                        VVV
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
