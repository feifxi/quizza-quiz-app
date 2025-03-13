import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import SignUp from '@/pages/SignUp.vue'
import SignIn from '@/pages/SignIn.vue'
import LeaderBoard from '@/pages/LeaderBoard.vue'
import CreateGame from '@/pages/CreateQuiz.vue'
import EditGame from '@/pages/EditGame.vue'
import Workspace from '@/pages/Workspace.vue'
import Quiz from '@/pages/Quiz.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn,
    },
    {
      path: '/workspace',
      name: 'workspace',
      component: Workspace,
    },
    {
      path: '/create',
      name: 'create',
      component: CreateGame,
    },
    {
      path: '/update/:gameId',
      name: 'update',
      component: EditGame,
    },
    {
      path: '/quiz/:gameId',
      name: 'quiz',
      component: Quiz,
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: LeaderBoard,
    },
   
  ],
})

export default router
