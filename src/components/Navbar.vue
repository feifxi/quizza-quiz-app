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
    <header class="font-extrabold flex justify-between items-center text-white px-10 py-3 bg-green-500 border-b-3 border-green-600">
        <RouterLink to="/">
            <h2 class="text-2xl font-bold cursor-pointer">Roblox but better</h2>
        </RouterLink>
        <nav v-if="authStore.isAuthenticated" class="flex items-center gap-5">
            <RouterLink to="/workspace" class="hover:underline cursor-pointer">Workspace</RouterLink>
            <RouterLink to="/leaderboard" class="hover:underline cursor-pointer">Leaderboard</RouterLink>
            <RouterLink to="/profile">
                <div class="flex items-center gap-1">
                    <!-- <p class="text-black">{{ authStore.authUser.userName }}</p> -->
                    <img 
                        :src="authStore.authUser.profilePic || 'https://img.myloview.com/posters/default-avatar-profile-icon-vector-social-media-user-photo-700-205577532.jpg'" 
                        alt="profilepic"
                        class="border-white border-2 size-10 rounded-full"
                    >
                </div>
            </RouterLink>
            <button @click="logout" class="hover:underline cursor-pointer">Logout</button>
        </nav>
        <nav v-else class="flex gap-5">
            <RouterLink to="/signin" class="hover:underline cursor-pointer">SignIn</RouterLink>
            <RouterLink to="/signup" class="hover:underline cursor-pointer">SignUp</RouterLink>
        </nav>
    </header>
</template>

<style scoped></style>