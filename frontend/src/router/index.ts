import LoginForm from '@/LoginForm.vue'
import { createRouter, createWebHistory } from 'vue-router'

import RegisterForm from '@/RegisterForm.vue'
import UserLayout from '@/components/UserLayout.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
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
      path: '/login',
      name: 'LoginForm',
      component: LoginForm,
    },
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/Staff',
      component: UserLayout,
      children: [
        {
          path: '/Staff',
          name: 'Staff Dashboard',
          component: LoginForm,
        },
      ]
    },
  ],
})

export default router
