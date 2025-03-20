<script setup>
import Button from '@/components/Button.vue';
import { useAuthStore } from '@/stores/user';
import { ref } from 'vue';

const authStore = useAuthStore()
const userUsed = ref(authStore.authUser)
console.log(userUsed)
</script>

<template>
    <section class="max-w-xl mx-auto bg-white p-3 mt-5 rounded-xl shadow">
    <div class="w-full text-center justify-items-center mb-5">
        <img
        class="rounded-full w-65 border-2"  
        src="https://t3.ftcdn.net/jpg/07/24/59/76/360_F_724597608_pmo5BsVumFcFyHJKlASG2Y2KpkkfiYUU.jpg" alt="">
    </div>
    <div class="max-w-3xl p-3 ">
      <div  class="grid grid-cols-2 gap-3 w-full px-[10%] ">
        <div class="flex flex-row items-center ">
          <label class="text-gray-900 font-bold ">Username :</label>
          <p class=" mx-3">{{ userUsed.userName }}</p>
        </div>

        <div class="flex flex-row float-end">
          <label class="text-gray-900 font-bold ">Email :</label>
          <p class=" mx-3">{{ userUsed.email}}</p>
        </div>

        <div class="flex flex-row">
          <label class="text-gray-900 font-bold">Id :</label>
          <p class=" mx-3">{{ userUsed.id }}</p>
        </div>

        <div class="flex flex-row">
          <label class="text-gray-900 font-bold">Role :</label>
          <p class=" mx-3">{{ userUsed.role }}</p>
        </div>

        <div class="flex flex-row">
          <label class="text-gray-900 font-bold">Star :</label>
          <p class=" mx-3">{{ userUsed.star }}</p>
        </div>
        
    </div>
    </div>
  </section>
</template>