<script setup>
import { ref } from 'vue';

const isShowChat = ref(false)
const messageInput = ref('')
const messages = ref([
    {
        from: "bot",
        text: "Hello Chanombude is very cool"
    }
])
const isLoading = ref(false)

const handleToggleChat = () => {
    isShowChat.value = !isShowChat.value
}

const handleSendMessage = async () => {
    isLoading.value = true

    messages.value.push({
        from: 'user',
        text: messageInput.value
    })
    const requsetMessage = {
        model: "tiiuae/falcon-7b-instruct",
        messages: [ { "role": "user", "content": "what is roblox" } ],
        temperature: 0.5,
        max_tokens: 2048,
        top_p: 0.7
    }
    try {
        const res = await fetch('https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct/v1/chat/completions', {
            method: "POST",
            headers: { 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(requsetMessage)
        })
        messages.value.push({
            from: 'bot',
            text: 'Chaonombude is cool!'
        })
        messageInput.value = ''
    } catch (error) {
        console.log(error)
    }
    isLoading.value = false
}
</script>
<template>
    <div class="fixed bottom-0 right-10 text-white">
        <div class="w-[400px] font-bold bg-neutral-800">
            <div class="p-4 font-bold cursor-pointer border-b border-neutral-600 flex items-center gap-3" @click="handleToggleChat">
                <img :src="'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrjVfM-36dfcntAoGw_Xguj2RdQ6MQFttDKw&s'" class="size-8 rounded-full" >
                <p>Sussy Ahh ChatBot </p>
            </div>

            <div v-if="isShowChat" class="h-[400px] flex flex-col">
                <div class="flex-1 flex flex-col  gap-1 py-3 px-5 overflow-y-scroll">
                    <div v-for="message of messages" :class="'flex gap-3 items-center ' + (message.from === 'user' ? 'self-end' : '')" >
                        <img v-if="message.from === 'bot'"
                            :src="'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrjVfM-36dfcntAoGw_Xguj2RdQ6MQFttDKw&s'"
                            class="size-10 rounded-full"
                        >
                        <p :class="'p-2 ' + (message.from === 'user' ? 'bg-neutral-900 rounded-xl' : '') ">
                            {{ message.text }}
                        </p>
                    </div>
                </div>
                <div class="p-2 flex gap-2">
                    <input type="text" class="input bg-white text-black flex-1" :disabled="isLoading" v-model="messageInput">
                    <button 
                        :class="messageInput ? 'cursor-pointer' : 'cursor-not-allowed'" 
                        @click="handleSendMessage" 
                        :disabled="isLoading"
                    >
                        {{  isLoading ? 'Loading...' : "Send" }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
