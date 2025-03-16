import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import SignUp from '@/pages/SignUp.vue'
import SignIn from '@/pages/SignIn.vue'
import LeaderBoard from '@/pages/LeaderBoard.vue'
import CreateGame from '@/pages/CreateQuiz.vue'
import EditGame from '@/pages/UpdateQuiz.vue'
import Workspace from '@/pages/Workspace.vue'
import PlayQuiz from '@/pages/PlayQuiz.vue'
import { useAuthStore } from '@/stores/user'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: false }
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
      meta: { requiresAuth: false }
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn,
      meta: { requiresAuth: false }
    },
    {
      path: '/workspace',
      name: 'workspace',
      component: Workspace,
      meta: { requiresAuth: true }
    },
    {
      path: '/create',
      name: 'create',
      component: CreateGame,
      meta: { requiresAuth: true }
    },
    {
      path: '/update/:quizId',
      name: 'update',
      component: EditGame,
      meta: { requiresAuth: true }
    },
    {
      path: '/quiz/:quizId',
      name: 'quiz',
      component: PlayQuiz,
      meta: { requiresAuth: true }
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: LeaderBoard,
      meta: { requiresAuth: false }
    },
   
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/signin");
  }
  else {
    next(); 
  }
});

export default router
