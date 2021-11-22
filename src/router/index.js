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
      component: () =>
        import(/* webpackChunkName: "install" */ '../views/system/Installation')
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录'
      },
      component: () =>
        import(/* webpackChunkName: "login" */ '../views/user/Login')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () =>
        import(/* webpackChunkName: "admin-page" */ '../views/admin/AdminPage'),
      redirect: '/admin/dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'admin-dashboard',
          meta: {
            title: '首页'
          },
          component: () =>
            import(
              /* webpackChunkName: "admin-dashboard" */ '../views/admin/components/AdminDashboard'
            )
        },
        {
          path: 'article',
          name: 'admin-article',
          redirect: { name: 'article-manage' }
        },
        {
          path: 'article/manage',
          name: 'article-manage',
          meta: {
            title: '管理'
          },
          component: () =>
            import(
              /* webpackChunkName: "article-management" */ '../views/admin/components/ArticleManagement'
            )
        },
        {
          path: 'article/compose',
          name: 'article-compose',
          meta: {
            title: '🖊 写作'
          },
          props: (route) => ({ query: route.query.id }),
          component: () =>
            import(
              /* webpackChunkName: "article-compose" */ '../views/admin/components/ArticleCompose'
            )
        },
        {
          path: 'article/tag',
          name: 'article-tag',
          meta: {
            title: '标签'
          },
          component: () =>
            import(
              /* webpackChunkName: "article-tag" */ '../views/admin/components/ArticleTag'
            )
        },
        {
          path: 'comment',
          name: 'admin-comment',
          meta: {
            title: '评论管理'
          },
          component: () =>
            import(
              /* webpackChunkName: "admin-comment" */ '../views/admin/components/AdminComment'
            )
        },
        {
          path: 'moment',
          name: 'admin-moment',
          meta: {
            title: '动态管理'
          },
          component: () =>
            import(
              /* webpackChunkName: "admin-moment" */ '../views/admin/components/AdminMoment'
            )
        },
        {
          path: 'page',
          name: 'admin-page',
          redirect: { name: 'page-manage' }
        },
        {
          path: 'page/design',
          name: 'page-design',
          meta: {
            title: '❀ 设计页面'
          },
          component: () =>
            import(
              /* webpackChunkName: "page-compose" */ '../views/admin/components/PageCompose'
            )
        },
        {
          path: 'page/manage',
          name: 'page-manage',
          meta: {
            title: '管理页面'
          },
          component: () =>
            import(
              /* webpackChunkName: "page-manage" */ '../views/admin/components/PageManagement'
            )
        },
        {
          path: 'media',
          name: 'admin-media',
          meta: {
            title: '多媒体库'
          },
          component: () =>
            import(
              /* webpackChunkName: "admin-media" */ '../views/admin/components/AdminMedia'
            )
        },
        {
          path: 'link',
          name: 'admin-link',
          meta: {
            title: '链接'
          },
          component: () =>
            import(
              /* webpackChunkName: "admin-link" */ '../views/admin/components/AdminLink'
            )
        },
        {
          path: 'settings',
          name: 'admin-settings',
          redirect: { name: 'settings-app' }
        },
        {
          path: 'settings/menu',
          name: 'settings-menu',
          meta: {
            title: '菜单设置'
          },
          component: () =>
            import(
              /* webpackChunkName: "settings-menu" */ '../views/admin/components/SettingsMenu'
            )
        },
        {
          path: 'settings/user',
          name: 'settings-user',
          meta: {
            title: '用户设置'
          },
          component: () =>
            import(
              /* webpackChunkName: "settings-user" */ '../views/admin/components/SettingsUser'
            )
        },
        {
          path: 'settings/app',
          name: 'settings-app',
          meta: {
            title: '系统设置'
          },
          component: () =>
            import(
              /* webpackChunkName: "settings-app" */ '../views/admin/components/SettingsApp'
            )
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
        },
        {
          path: 'archives',
          name: 'article-archives',
          meta: {
            title: '归档'
          },
          component: () => import('../views/home/components/ArticleArchive')
        },
        {
          path: 'moment',
          name: 'moment',
          meta: {
            title: '动态'
          },
          component: () => import('../views/home/components/PurrMoment')
        },
        {
          path: 'comment',
          name: 'comment',
          meta: {
            title: '留言板'
          },
          component: () => import('../views/home/components/CommentBoard')
        },
        {
          path: 'friends',
          name: 'friends',
          meta: {
            title: 'friends'
          },
          component: () => import('../views/home/components/PurrFriends')
        },
        {
          path: 'about',
          name: 'about',
          meta: {
            title: '关于'
          },
          component: () => import('../views/home/components/PageSheet')
        },
        {
          path: 'me',
          name: 'me',
          meta: {
            title: '关于我'
          },
          component: () => import('../views/home/components/PageSheet')
        },
        {
          path: 'sitemap',
          name: 'sitemap',
          meta: {
            title: '站点地图'
          },
          component: () => import('../views/home/components/PageSheet')
        },
        {
          path: 'rss',
          name: 'rss',
          meta: {
            title: 'RSS'
          },
          component: () => import('../views/home/components/PageSheet')
        },
        {
          path: 'articles/:articleName',
          name: 'article-reading',
          component: () => import('../views/home/components/ArticleReading')
        }
      ]
    },
    {
      // 不要在这个路由后面写路由啊
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      meta: {
        title: '没有这个页面啊喂(-o-)／'
      },
      component: () =>
        import(/* webpackChunkName: "not-found" */ '../views/system/NotFound')
    }
  ]
});

export default router;
