import Home from "@/views/Home.vue";
import SignUp from "@/views/SignUp.vue";
import SignIn from "@/views/SignIn.vue";
import LeaderBoard from "@/views/LeaderBoard.vue";
import CreateGame from "@/views/CreateQuiz.vue";
import EditGame from "@/views/UpdateQuiz.vue";
import Workspace from "@/views/Workspace.vue";
import PlayQuiz from "@/views/PlayQuiz.vue";
import Profiles from "@/views/Profiles.vue";
import EditProfiles from "@/views/EditProfiles.vue";
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: { requiresAuth: false },
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp,
      meta: { requiresAuth: false },
    },
    {
      path: "/signin",
      name: "signin",
      component: SignIn,
      meta: { requiresAuth: false },
    },
    {
      path: "/workspace",
      name: "workspace",
      component: Workspace,
      meta: { requiresAuth: true },
    },
    {
      path: "/create",
      name: "create",
      component: CreateGame,
      meta: { requiresAuth: true },
    },
    {
      path: "/update/:quizId",
      name: "update",
      component: EditGame,
      meta: { requiresAuth: true },
    },
    {
      path: "/quiz/:quizId",
      name: "quiz",
      component: PlayQuiz,
      meta: { requiresAuth: true },
    },
    {
      path: "/leaderboard",
      name: "leaderboard",
      component: LeaderBoard,
      meta: { requiresAuth: true },
    },
    {
      path: "/profile",
      name: "profile",
      component: Profiles,
      meta: { requiresAuth: true },
    },
    {
      path: "/editprofile",
      name: "editprofile",
      component: EditProfiles,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  await authStore.checkAuth();
  if (
    !authStore.isAuthenticated &&
    to.meta.requiresAuth &&
    to.name !== "signin"
  ) {
    return next({ name: "signin" });
  } else {
    return next();
  }
});

export default router;
