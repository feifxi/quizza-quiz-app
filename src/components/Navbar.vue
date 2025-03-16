<script setup>
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/user';
    const authStore = useAuthStore()

    const logout = () => {
        authStore.setAuthUser(null)
        localStorage.removeItem('userId')
    }
</script>

<template>
    <header class="flex justify-between items-center bg-black text-white px-10 py-3">        
        <RouterLink to="/">
            <h2 class="text-2xl font-bold cursor-pointer">Roblox but better</h2>
        </RouterLink>
        <nav v-if="authStore.isAuthenticated" class="flex items-center gap-5">
            <RouterLink to="/workspace" class="hover:underline cursor-pointer">Workspace</RouterLink>
            <RouterLink to="/leaderboard" class="hover:underline cursor-pointer">Leaderboard</RouterLink>
            <p class="p-1 border border-white">{{ authStore.authUser.userName }}</p>
            <button @click="logout" class="hover:underline cursor-pointer">Logout</button>
        </nav>
        <nav v-else class="flex gap-5">
            <RouterLink to="/signin" class="hover:underline cursor-pointer">SignIn</RouterLink>
            <RouterLink to="/signup" class="hover:underline cursor-pointer">SignUp</RouterLink>
        </nav>
    </header>
</template>

<style scoped>
</style>