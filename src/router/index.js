import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/install',
      name: 'install',
      meta: {
        title: '安装向导',
      },
      component: () => import('../views/system/Installation'),
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录',
      },
      component: () => import('../views/user/Login'),
    },
  ],
});

export default router;
