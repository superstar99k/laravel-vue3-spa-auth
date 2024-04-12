import qs from 'qs'
import { createRouter, createWebHistory } from 'vue-router'
import { store } from '@/store'

const router = createRouter({
  history: createWebHistory(),
  parseQuery: qs.parse,
  stringifyQuery: qs.stringify,
  routes: [
    {
      name: 'auth-login',
      path: '/auth/login',
      component: () => import('@/views/pages/auth/Login.vue'),
    },
    {
      name: 'auth-forgot_password',
      path: '/auth/forgot_password',
      component: () => import('@/views/pages/auth/forgot-password/Index.vue'),
    },
    {
      name: 'auth-forgot_password-sent',
      path: '/auth/forgot_password/sent',
      component: () => import('@/views/pages/auth/forgot-password/Sent.vue'),
    },
    {
      name: 'auth-reset_password',
      path: '/auth/reset_password',
      component: () => import('@/views/pages/auth/ResetPassword.vue'),
    },
    {
      name: 'auth-verify',
      path: '/auth/verify',
      component: () => import('@/views/pages/auth/Verify.vue'),
    },
    {
      name: 'admin',
      path: '/admin',
      component: () => import('@/views/pages/app/admin/Index.vue'),
      children: [
        {
          name: 'admin-dashboard',
          path: 'dashboard',
          component: () => import('@/views/pages/app/admin/Dashboard.vue'),
          meta: { auth: true },
        },
        {
          name: 'admin-users',
          path: 'users',
          component: () => import('@/views/pages/app/admin/users/Index.vue'),
          meta: { auth: true },
        },
      ],
    },
  ],
})

const redirectMap = {
  '/': 'admin-dashboard',
  '/admin': 'admin-dashboard',
}

router.beforeEach((to, from, next) => {
  const normalizedPath = to.path.replace(/(.)\/$/, '$1')

  if (redirectMap[normalizedPath]) {
    return router.push(
      Object.assign({}, to, { name: redirectMap[normalizedPath] })
    )
  }

  if (to.meta.auth && !store.getters['auth/loggedIn']) {
    return router.push({ name: 'auth-login' })
  }

  next()
})

export default router
