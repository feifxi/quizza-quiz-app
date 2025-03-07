<script setup>
import { createUser, getAllUsers } from '@/api/usersAPI';
import { reactive, ref, watch } from 'vue';

    const userData = reactive({
        email: '',
        userName: '',
        password: '',
    })


    const validateDate = () => {
      
    }

    const signUp = async (e) => {
      e.preventDefault()
      if (!userData.email || !userData.userName || !userData.password) {
        return alert('fill all input')
      }
      const existUser = await getAllUsers({
        key: 'email',
        value: userData.email
      })
      const user = existUser.data[0]
      if (user) return alert('This email is belong to existing account')
      
      userData.role = 'user'
      const res = await createUser(userData)      
      console.log(res)
    }
</script>

<template>
  <section class="">
    <h1 class="text-3xl font-bold">Sign Up</h1>

    <div class="max-w-3xl p-3 bg-neutral-100">
      <form @submit="signUp">
        <div class="gap-3">
          <div class="flex flex-col">
            <label for="">Email</label>
            <input type="text" class="input" v-model="userData.email">
          </div>
          <div class="flex flex-col">
            <label for="">User Name</label>
            <input type="text" class="input" v-model="userData.userName">
          </div>
          <div class="flex flex-col">
            <label for="">Password</label>
            <input type="text" class="input" v-model="userData.password">
          </div>
        </div>

        <button class="bg-black text-white p-3" @click="signUp">create account</button>
      </form>
    </div>
  </section>
</template>

<style scoped>
</style>