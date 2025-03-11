<script setup>
import { createUser, getAllUsers } from '@/api/usersAPI';
import { reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

    const router = useRouter();
    
    const userData = reactive({
        email: '',
        password: '',
    })
    
    const validateDate = () => {
      
    }

    const signIn = async (e) => {
      e.preventDefault()
      if (!userData.email || !userData.password) {
        return alert('fill all input')
      }
      const existUser = await getAllUsers({
        key: 'email',
        value: userData.email
      })
      const user = existUser.data[0]
      if (!user) return alert('This email is not registered')
      
      if (userData.password === user.password) {
        localStorage.setItem('user', JSON.stringify(user))
        router.push("/");
      }
      else alert('Password is incorrect')  
    }
</script>

<template>
  <section class="">
    <h1 class="text-3xl font-bold">Sign In</h1>

    <div class="max-w-3xl p-3 bg-neutral-100">
      <form @submit="signIn">
        <div class="gap-3">
          <div class="flex flex-col">
            <label for="">Email</label>
            <input type="text" class="input" v-model="userData.email">
          </div>
          <div class="flex flex-col">
            <label for="">Password</label>
            <input type="text" class="input" v-model="userData.password">
          </div>
        </div>

        <button class="bg-black text-white p-3" @click="signIn">create account</button>
      </form>
    </div>
  </section>
</template>

<style scoped>
</style>