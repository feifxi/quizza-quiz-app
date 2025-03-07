<script setup>
import { RouterLink } from 'vue-router';

    const isLoggedin = false
        
</script>

<template>
    <header class="flex justify-between items-center bg-black text-white px-10 py-3">        
        <RouterLink to="/">
            <h2 class="text-2xl font-bold cursor-pointer">Roblox but better</h2>
        </RouterLink>
        <nav v-if="isLoggedin" class="flex gap-5">
            <RouterLink to="/dashboard" class="hover:underline cursor-pointer">Dashboard</RouterLink>
            <RouterLink to="/dashboard" class="hover:underline cursor-pointer">Logout</RouterLink>
        </nav>
        <nav v-else class="flex gap-5">
            <RouterLink to="/signin" class="hover:underline cursor-pointer">Login</RouterLink>
            <RouterLink to="/signup" class="hover:underline cursor-pointer">SignUp</RouterLink>
        </nav>
    </header>
</template>

<style scoped>
</style>