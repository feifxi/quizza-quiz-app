<script setup>
import Button from '@/components/Button.vue';
import { createUser, getAllUsers } from '@/api/usersAPI';
import { reactive } from 'vue';

const userData = reactive({
  email: '',
  userName: '',
  password: '',
})

const signUp = async (e) => {
  e.preventDefault()
  if (!userData.email || !userData.userName || !userData.password) {
    return alert('fill all input')
  }
  const existUser = await getAllUsers([{
    key: 'email',
    value: userData.email
  }])
  const user = existUser.data[0]
  if (user) return alert('This email is belong to existing account')

  const res = await createUser({
    ...userData,
    role: 'user',
    profilePic: '',
  })
  alert('Create Account Success!')
}
</script>

<template>
  <section class="max-w-xl mx-auto bg-white p-3 mt-5 rounded-xl shadow">
    <h1 class="text-3xl font-bold text-center">Sign Up</h1>
    <div class="max-w-3xl p-3">
      <form @submit="signUp" class="flex flex-col gap-3">
        <div class="flex flex-col">
          <label class="text-gray-900 font-bold">User Name</label>
          <input type="text" class="input" v-model="userData.userName" />
        </div>

        <div class="flex flex-col">
          <label class="text-gray-900 font-bold">Email</label>
          <input type="text" class="input" v-model="userData.email" />
        </div>

        <div class="flex flex-col">
          <label class="text-gray-900 font-bold">Password</label>
          <input type="password" class="input" v-model="userData.password" />
        </div>

        <Button label="Create Account" :click="signUp"></Button>
      </form>
    </div>
  </section>
</template>

<style scoped></style>