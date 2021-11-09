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
      component: () => import('../views/admin/AdminPage'),
      redirect: '/admin/dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          meta: {
            title: '首页'
          },
          component: () => import('../views/admin/components/AdminDashboard')
        },
        {
          path: 'article',
          name: 'article',
          redirect: { name: 'article-manage' }
        },
        {
          path: 'article/manage',
          name: 'article-manage',
          meta: {
            title: '管理'
          },
          component: () => import('../views/admin/components/ArticleManagement')
        },
        {
          path: 'article/compose',
          name: 'article-compose',
          meta: {
            title: '🖊 写作'
          },
          component: () => import('../views/admin/components/ArticleCompose')
        },
        {
          path: 'article/tag',
          name: 'article-tag',
          meta: {
            title: '标签'
          },
          component: () => import('../views/admin/components/ArticleTag')
        },
        {
          path: 'comment',
          name: 'comment',
          meta: {
            title: '评论管理'
          },
          component: () => import('../views/admin/components/AdminComment')
        },
        {
          path: 'moment',
          name: 'moment',
          meta: {
            title: '动态管理'
          },
          component: () => import('../views/admin/components/AdminMoment')
        },
        {
          path: 'page',
          name: 'page',
          redirect: { name: 'page-manage' }
        },
        {
          path: 'page/design',
          name: 'page-design',
          meta: {
            title: '❀ 设计页面'
          },
          component: () => import('../views/admin/components/PageCompose')
        },
        {
          path: 'page/manage',
          name: 'page-manage',
          meta: {
            title: '管理页面'
          },
          component: () => import('../views/admin/components/PageManagement')
        },
        {
          path: 'media',
          name: 'media',
          meta: {
            title: '多媒体库'
          },
          component: () => import('../views/admin/components/AdminMedia')
        },
        {
          path: 'link',
          name: 'link',
          meta: {
            title: '链接'
          },
          component: () => import('../views/admin/components/AdminLink')
        },
        {
          path: 'settings',
          name: 'settings',
          redirect: { name: 'settings-app' }
        },
        {
          path: 'settings/menu',
          name: 'settings-menu',
          meta: {
            title: '菜单设置'
          },
          component: () => import('../views/admin/components/SettingsMenu')
        },
        {
          path: 'settings/user',
          name: 'settings-user',
          meta: {
            title: '用户设置'
          },
          component: () => import('../views/admin/components/SettingsUser')
        },
        {
          path: 'settings/app',
          name: 'settings-app',
          meta: {
            title: '系统设置'
          },
          component: () => import('../views/admin/components/SettingsApp')
        }
      ]
    },
    {
      path: '',
      name: 'home',
      component: () => import('../views/home/PurrPage'),
      redirect: '/',
      children: [
        {
          path: '',
          name: 'homepage',
          meta: {
            title: '首页'
          },
          component: () => import('../views/home/components/HomePage')
        }
      ]
    }
  ]
});

export default router;
