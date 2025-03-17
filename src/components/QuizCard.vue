<script setup>
import { deleteQuiz } from '@/api/quizsAPI';

    const { quiz } = defineProps({
        quiz: Object,
        showLevelModal: Function,
        showCommentModal: Function,
        isEditMode: Boolean,
    })

    const handleDeleteQuiz = async () => {
        if (confirm("Are you sure to delete this quiz?")) {
            const res = await deleteQuiz(quiz.id)
            alert('Remove quiz success')
        }
    }
</script>

<template>
    <div class="relative border border-black rounded-xl shadow-2xl hover:scale-105 transition-all">
        <div v-if="isEditMode" class="absolute right-3 top-3 flex gap-2">
            <RouterLink :to="{ name: 'update', params: { quizId: quiz.id } }"  class="bg-green-500 p-2 cursor-pointer" >
                Edit
            </RouterLink>
            <button class="bg-red-500 p-2 cursor-pointer" @click="handleDeleteQuiz">Delete</button>
        </div>
        <div @click="showLevelModal" :class="isEditMode ? '' : 'cursor-pointer' ">
            <img 
                :src="quiz.thumbnail || 'https://preview.redd.it/zozlzva328291.jpg?auto=webp&s=cc842e6ec98b8791639cbb5ec8890712bfb5f21c'" 
                alt="quiz thumbnail" 
                class="object-cover rounded-t-xl w-full h-[200px]" 
            />
            <div class="p-3">
                <p class="text-xl font-bold text-wrap">
                    {{ quiz.title }}
                </p>
                <p class="font-bold text-wrap">
                    👍 {{ quiz.reactions.length > 999 ? "999+" : quiz.reactions.length }}
                </p>
            </div>
        </div>
        <p v-if="isEditMode" :class="'py-1 px-3 ' + ( quiz.status === 'pending' ? 'bg-yellow-300' : 'bg-green-300')">
            {{ quiz.status === 'pending' ? 'Pending...' : 'Publish' }}
        </p>
        <button class="bg-neutral-300 hover:bg-neutral-400 w-full p-3 rounded-b-xl cursor-pointer transition-all"  @click="showCommentModal" >
            comment
        </button>
    </div>
</template>

<style scoped></style>
