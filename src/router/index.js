import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/install',
      name: 'install',
      meta: {
        title: '安装向导'
      },
      component: () => import('../views/system/Installation')
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录'
      },
      component: () => import('../views/user/Login')
    },
    {
      path: '/admin',
      name: 'admin',
      meta: {
        title: '首页'
      },
      component: () => import('../views/admin/Admin.vue'),
      alias: '/admin/dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          meta: {
            title: '首页'
          },
          component: () => import('../views/admin/Admin.vue')
        }
      ]
    }
  ]
});

export default router;
