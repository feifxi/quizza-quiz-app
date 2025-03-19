<script setup>
import { deleteQuiz, getQuizById, patchQuiz } from '@/api/quizsAPI';
import Button from './Button.vue';
import Icon from './Icon.vue';
const { quiz, approveQuiz, isAdmin } = defineProps({
    quiz: Object,
    showLevelModal: Function,
    showCommentModal: Function,
    isEditMode: Boolean,
    isAdmin: Boolean,
})

const handleDeleteQuiz = async () => {
    if (confirm("Are you sure to delete this quiz?")) {
        const res = await deleteQuiz(quiz.id)
        alert('Remove quiz success')
    }
}

const handleApproveQuiz = async () => {
    if (confirm("Are you sure to Approve this quiz?")) {
        const res = await patchQuiz(quiz.id, { status: 'publish' });
        // quizData.value = res.data;
        // const result = await patchQuiz(quizData.value.id)
        alert('Quiz approved!')

    }
}
</script>

<template>
    <div
        :class="'relative border-2 border-neutral-300 rounded-xl shadow-2xl transition-all ' + (isEditMode ? '' : 'hover:scale-105')">
        <div v-if="isEditMode" class="absolute right-3 top-3 flex flex-col items-end gap-2">
            <div class="flex gap-2">
                <RouterLink :to="{ name: 'update', params: { quizId: quiz.id } }">
                    <Button :label="isAdmin ? 'Preview' : 'Edit'" class-name="bg-blue-500 active:bg-blue-600"></Button>
                </RouterLink>
                <Button :label="'Delete'" class-name="bg-red-500 active:bg-red-600 border-b-3 border-red-600" :click="handleDeleteQuiz"></Button>
            </div>
            <Button v-if="isAdmin && quiz.status == 'pending'" 
                :label="'Approve'" class-name="bg-yellow-400 active:bg-yellow-500 w-1/2 border-b-3 border-yellow-500" 
                :click="handleApproveQuiz">
            </Button>        
        </div>
        <div @click="showLevelModal" :class="isEditMode ? '' : 'cursor-pointer'">
            <img :src="quiz.thumbnail || 'https://preview.redd.it/zozlzva328291.jpg?auto=webp&s=cc842e6ec98b8791639cbb5ec8890712bfb5f21c'"
                alt="quiz thumbnail" class="object-cover rounded-t-xl w-full h-[200px]" />
            <div class="p-3">
                <p class="text-xl font-bold text-wrap">
                    {{ quiz.title }}
                </p>
                <div class="flex items-end justify-between">
                    <p class="font-bold text-wrap truncate ">
                        By {{ quiz.createBy.userName }}
                    </p>
                    <p class="font-bold text-green-500 text-wrap shadow rounded-full p-1 px-2 flex gap-2 ">
                        <Icon name="like" class-name=" fill-green-500" />
                        {{ quiz.reactions.length > 999 ? "999+" : quiz.reactions.length }}
                    </p>
                </div>
            </div>
        </div>
        <p v-if="isEditMode"
            :class="'font-bold py-1 px-3 ' + (quiz.status === 'pending' ? 'bg-yellow-300 text-yellow-800' : 'bg-green-300 text-green-800')">
            {{ quiz.status === 'pending' ? 'Pending...' : 'Published' }}
        </p>
        <button
            class="bg-neutral-200 hover:bg-neutral-300 w-full p-3 rounded-b-xl cursor-pointer transition-all font-bold text-neutral-600"
            @click="showCommentModal">
            comment
        </button>
    </div>
</template>

<style scoped></style>
