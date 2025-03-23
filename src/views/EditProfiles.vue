<script setup>
import { reactive, onMounted } from 'vue';
import { useAuthStore } from '@/stores/user';
import { updateUser } from '@/api/usersAPI';
import { useRouter } from "vue-router";

const router = useRouter();


const authStore = useAuthStore();


const newUserData = reactive({
  userName: '',
  profilePic: ''
});


onMounted(() => {
  if (authStore.authUser) {
    Object.assign(newUserData, authStore.authUser); 
  }
});

const updateProfile = async () => {
  try {
    await updateUser(newUserData.id, newUserData);
    alert('Profile updated successfully!');
    authStore.authUser = { ...newUserData };
    router.push('/profile');
  } catch (error) {
    console.error('Update failed:', error);
    alert('Failed to update profile.');
  }
};
</script>

<template>
  <div class="max-w-md mx-auto p-6 bg-white shadow-lg border border-gray-200 rounded-2xl mt-[3%] ">
    <h2 class="text-3xl font-semibold text-center mb-4">Update Profile</h2>
    <form @submit.prevent="updateProfile" class="space-y-4 mb-[5%]">
      <div>
        <label class="block text-2sm font-medium">Email:</label>
        <input v-model="newUserData.email" type="text" disabled class="w-full px-3 py-2 border rounded-lg" />
      </div>

      <div>
        <label class="block text-2sm font-medium">Username:</label>
        <input v-model="newUserData.userName" type="text" required class="w-full px-3 py-2 border rounded-lg" />
      </div>


      <div>
        <label class="block text-2sm font-medium">Profile Picture URL:</label>
        <input v-model="newUserData.profilePic" type="text" class="w-full px-3 py-2 border rounded-lg" />
      </div>
      
      <div class="w-full text-center pt-2">
        <button type="submit"
        class="p-3 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
        Update
       </button>
     </div>
      
    </form>
  </div>
</template>
