import LoginForm from '@/LoginForm.vue'
import { createRouter, createWebHistory } from 'vue-router'

<<<<<<< HEAD
import RegisterForm from '@/RegisterForm.vue'
=======
>>>>>>> 577af4bf2bd578c942745edc7b947eb02decefb2

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
<<<<<<< HEAD
      path: '/regis',
      name: 'RegisterForm',
      component: RegisterForm,
    },
    {
      path: '/login',
      name: 'LoginForm',
      component: LoginForm,
    },
    {
=======
      path: '/login',
      name: 'LoginForm',
      component: LoginForm,
    },
    {
>>>>>>> 577af4bf2bd578c942745edc7b947eb02decefb2
      path: '/',
      redirect: '/login',
    },
  ],
})

export default router
