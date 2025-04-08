<script setup>
import Button from "@/components/Button.vue";
import { getAllUsers } from "@/api/usersAPI";
import { useAuthStore } from "@/stores/user";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const userData = reactive({
  email: "",
  password: "",
});

const signIn = async (e) => {
  e.preventDefault();
  if (!userData.email || !userData.password) {
    return alert("fill all input");
  }
  const existUser = await getAllUsers([{
    key: "email",
    value: userData.email,
  }]);
  const user = existUser.data[0];
  if (!user) return alert("This email is not registered");

  if (userData.password === user.password) {
    authStore.setAuthUser(user)
    localStorage.setItem("userId", user.id);
    router.push("/");
  } else alert("Password is incorrect");
};
</script>

<template>
  <section class="max-w-xl mx-auto bg-white p-3 mt-5 rounded-xl shadow">
    <h1 class="text-3xl font-bold text-center">Sign In</h1>
    <div class="max-w-3xl p-3">
      <form @submit="signIn" class="flex flex-col gap-3">
        <div class="flex flex-col">
          <label class="text-gray-900 font-bold">Email</label>
          <input type="text" class="input" v-model="userData.email" />
        </div>

        <div class="flex flex-col">
          <label class="text-gray-900 font-bold">Password</label>
          <input type="text" class="input" v-model="userData.password" />
        </div>

        <Button label="Sign In" :click="signIn"></Button>
      </form>
    </div>
  </section>
</template>

<style scoped></style>
