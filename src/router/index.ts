import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/useUser'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/homePage.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/registerPage.vue'),
    meta: { requiresGuest: true},
  },
  {
    path: '/verification/:token',
    name: 'verification',
    component: () => import('@/views/VerificationPage.vue'),
    meta: { requiresGuest: true},
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/loginPage.vue'),
    meta: { requiresGuest: true,},
  },
  {
    path: '/verification',
    name: 'verification',
    component: () => import('@/views/VerificationPage.vue'),
    meta: { requiresGuest: true, },
  },
  {
    path: '/verification/:token',
    component: () => import('@/views/tokenVerified.vue'),
    meta: { requiresGuest: true, },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/auth/dashboardPage.vue'),
    meta: { requiresAuth: true, requiresVerified: true}
  },
  // {
  //   path: '/historical',
  //   name: 'historical',
  //   component: () => import('@/views/auth/user/historicalData.vue'),
  //   meta: { requiresAuth: true, requiresVerified: true }
  // },
  // {
  //   path: '/PpAndMap',
  //   name: 'PpAndMap',
  //   component: () => import('@/views/auth/user/PpAndMap.vue'),
  //   meta: { requiresAuth: true, requiresVerified: true }
  // },
  {
    path: '/anomaly',
    name: 'anomaly',
    component: () => import('@/views/auth/user/ZScore.vue'),
    meta: { requiresAuth: true, requiresVerified: true }
  },
  {
    path: '/alerts',
    name: 'alerts',
    component: () => import('@/views/auth/user/alerts.vue'),
    meta: { requiresAuth: true, requiresVerified: true }
  },
  {
    path: '/activiy-user',
    name: 'activiy-user',
    component: () => import('@/views/auth/activityLogs.vue'),
    meta: { requiresAuth: true, requiresVerified: true }
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/auth/profileSettings.vue'),
    meta: { requiresAuth: true, requiresVerified: true }
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@/views/auth/admin/dashboard.vue'),
    meta: { requiresAuth: true, requiresAdmin: true, requiresVerified: true }
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('@/views/auth/admin/users.vue'),
    meta: { requiresAuth: true, requiresAdmin: true, requiresVerified: true }
  },
  {
    path: '/admin-list',
    name: 'admin-list',
    component: () => import('@/views/auth/admin/admins.vue'),
    meta: { requiresAuth: true, requiresAdmin: true, requiresVerified: true }
  },
  {
    path: '/historical-admin',
    name: 'historical-admin',
    component: () => import('@/views/auth/admin/analytics/HistoricalData.vue'),
    meta: { requiresAuth: true, requiresAdmin: true, requiresVerified: true }
  },
  {
    path: '/z-score-admin',
    name: 'z-score-admin',
    component: () => import('@/views/auth/admin/analytics/ZscroesData.vue'),
    meta: { requiresAuth: true, requiresAdmin: true, requiresVerified: true }
  },
  {
    path: '/users-alerts',
    name: 'users-alerts',
    component: () => import('@/views/auth/admin/alerts.vue'),
    meta: { requiresAuth: true, requiresAdmin: true, requiresVerified: true }
  },
  {
    path: '/Activity-logs',
    name: 'Activity-logs',
    component: () => import('@/views/auth/admin/ActivityLogs.vue'),
    meta: { requiresAuth: true, requiresAdmin: true, requiresVerified: true }
  },
  {
    path: '/forbidden',
    name: 'forbidden',
    component: () => import('@/views/forbidden.vue'),
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/404.vue') },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to) => {
  const Auth = useUserStore()

  if (Auth.auth === null) {
    await Auth.verify();
  }

  const isAuthenticated = Auth.auth;
  const isVerified = Auth.auth?.isVerified;
  const isAdmin = Auth.auth?.role === 'admin';
  // Not authenticated
  if (to.meta.requiresAuth && !isAuthenticated) {
    return { path: '/login' }
  }

  if (to.meta.requiresVerified && !isVerified) {
    return { name: 'verification' }
  }

  // Prevent authenticated users from accessing guest-only routes
  if (to.meta.requiresGuest && isAuthenticated && isVerified ) {
    if (isAdmin) return { path: '/admin' }
    return { path: '/dashboard' }
  }

  // Prevent non-admins from accessing admin routes
  if (to.meta.requiresAdmin && !isAdmin && isVerified ) {
    return { path: '/forbidden' }
  }

  // Prevent admin users from accessing regular dashboard
  if (to.path === '/dashboard' && isAdmin && isVerified) {
    return { path: '/admin' }
  }
})


export default router
