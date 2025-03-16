<script setup>
    defineProps({
        quiz: Object,
        showLevelModal: Function,
        showCommentModal: Function,
        isEditMode: Boolean,
        deleteQuiz: Function,
    })
</script>

<template>
    <div class="relative border border-black cursor-pointer rounded-xl shadow-2xl hover:scale-105 transition-all">
        <div v-if="isEditMode" class="absolute right-3 top-3 flex gap-2">
            <RouterLink :to="{ name: 'update', params: { quizId: quiz.id } }" 
                class="bg-green-500 p-2 cursor-pointer"
            >
                Edit
            </RouterLink>
            <button class="bg-red-500 p-2 cursor-pointer" @click="deleteQuiz">Delete</button>
        </div>
        <RouterLink :to="{ name: 'home', query: { quizId: quiz.id } }" @click="showLevelModal">
            <img 
                v-if="quiz.thumbnail" 
                :src="quiz.thumbnail" 
                alt="quiz thumbnail" 
                class="" 
            />
            <div class="p-3">
                <p class="text-xl font-bold text-wrap">{{ quiz.title }}</p>
                <p class="font-bold text-wrap">
                    👍 {{ quiz.reactions.length > 999 ? "999+" : quiz.reactions.length }}
                </p>
            </div>
        </RouterLink>
        <button class="bg-neutral-300 w-full p-3 rounded-b-xl cursor-pointer"  @click="showCommentModal" >
            comment
        </button>
    </div>
</template>

<style scoped></style>
