<script setup>
import { useAuthStore } from "@/stores/user";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
const { quiz } = defineProps({
    quiz: Object,
    closeModal: Function,
});
const authStore = useAuthStore()

const playerProgress = quiz.playerProgress.find((history) => history.userId === authStore.authUser.id)
    || { userId: authStore.authUser.id, star: 0 }

</script>

<template>
    <div class="fixed top-0 left-0 bg-black/80 w-full h-screen flex items-center justify-center">
        <div class="relative bg-white w-full max-w-2xl max-h-3/4 p-6 pr-10 rounded-xl flex">
            <span class="absolute top-4 right-4 cursor-pointer" @click="closeModal">X</span>
            <!-- Quiz Info -->
            <div class="flex-1 relative">
                <span class="absolute right-3 shadow p-2 font-bold rounded-full transition-all hover:scale-105">
                    {{ playerProgress.star + '/' + quiz.levels.length + "⭐" }}
                </span>

                <h2 class="text-3xl font-bold">{{ quiz.title }}</h2>

                <p class="font-bold border-b-3 border-neutral-200 py-2">
                    By : {{ quiz.createBy.userName }}
                </p>

                <p class="mt-2">
                    {{ quiz.description }}
                </p>
            </div>
            <!-- Level -->
            <div class="flex-1 flex flex-col p-3 items-center gap-2 border-l-3 border-neutral-300 max-w-50 overflow-y-scroll">
                <div v-for="(level, index) of quiz.levels" :class="index % 2 == 0 ? 'self-end' : 'self-start'">
                    <RouterLink :to="index > 0
                        ? { name: 'home', query: { quizId: quiz.id } }
                        : { name: 'quiz', params: { quizId: quiz.id } }
                        " :class="'border-3 text-3xl font-bold size-25 flex items-center justify-center rounded-full hover:scale-110 transition-all ' +
                            (index > 0
                                ? 'text-neutral-600 bg-neutral-200 cursor-not-allowed border-neutral-300'
                                : 'text-green-900 bg-green-400 active:scale-95 border-green-500')
                            ">
                        {{ index + 1 }}
                    </RouterLink>

                    <!-- <div v-if="(index != quiz.levels.length - 1) && (quiz.levels.length > 1)">
                        VVV
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
