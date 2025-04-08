import { ref } from "vue";
import { defineStore, acceptHMRUpdate } from "pinia";
import { getUserById } from "@/api/usersAPI";

export const useAuthStore = defineStore("auth", () => {
  const authUser = ref(null);
  const isAuthenticated = ref(false);

  const checkAuth = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    const res = await getUserById(userId);
    if (res.success) {
      authUser.value = res.data;
      isAuthenticated.value = true;
    }
  };

  const setAuthUser = (userData) => {
    if (userData) {
      authUser.value = userData;
      isAuthenticated.value = true;
    } else {
      authUser.value = null;
      isAuthenticated.value = false;
    }
  };

  return { authUser, isAuthenticated, checkAuth, setAuthUser };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
