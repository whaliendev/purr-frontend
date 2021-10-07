<template>
  <nav>
    <div class="purr-logo">
      <router-link :to="{ name: 'dashboard' }"><span>Purr</span></router-link>
      <div class="collapse-button">
        <font-awesome-icon
          :icon="['fas', 'chevron-right']"
          v-if="isCollapsed"
        ></font-awesome-icon>
        <font-awesome-icon
          :icon="['fas', 'chevron-left']"
          v-else
        ></font-awesome-icon>
      </div>
    </div>
    <ul class="menu main-nav">
      <li class="menu-item is-active">
        <el-tooltip
          placement="right"
          content="首页"
          effect="light"
          :disabled="!isCollapsed"
        >
          <router-link :to="{ name: 'dashboard' }">
            <font-awesome-icon :icon="['fas', 'th-large']" />
            <span>首页</span>
          </router-link>
        </el-tooltip>
      </li>
      <!--  submenu of articles  -->
      <li class="menu-item sub-menu close">
        <el-popover
          placement="right"
          trigger="hover"
          :show-arrow="false"
          :disabled="!isCollapsed"
        >
          <template #reference>
            <div class="sub-menu__title">
              <router-link :to="{ name: 'article' }">
                <font-awesome-icon :icon="['fas', 'pen']" />
                <span>文章</span>
              </router-link>
              <!--          <font-awesome-icon :icon="['fas', 'chevron-down']" />-->
            </div>
          </template>
          <ul class="menu">
            <li class="menu-item">
              <router-link :to="{ name: 'article-manage' }">
                <span>管理文章</span>
              </router-link>
            </li>
            <li class="menu-item">
              <router-link :to="{ name: 'article-compose' }">
                <span>写作文章</span>
              </router-link>
            </li>
            <li class="menu-item">
              <router-link :to="{ name: 'article-tag' }">
                <span>标签</span>
              </router-link>
            </li>
          </ul>
        </el-popover>
      </li>
      <!-- end of sub menu of articles -->
      <li class="menu-item">
        <el-tooltip
          placement="right"
          content="评论"
          :disabled="!isCollapsed"
          effect="light"
        >
          <router-link :to="{ name: 'comment' }">
            <font-awesome-icon :icon="['fas', 'comment-dots']" />
            <span>评论</span>
          </router-link>
        </el-tooltip>
      </li>
      <li class="menu-item">
        <el-tooltip
          placement="right"
          content="动态"
          :disabled="!isCollapsed"
          effect="light"
        >
          <router-link :to="{ name: 'moment' }">
            <font-awesome-icon :icon="['fas', 'paper-plane']" />
            <span>动态</span>
          </router-link>
        </el-tooltip>
      </li>
      <!-- pages -->
      <li class="menu-item sub-menu close">
        <el-popover
          placement="right"
          trigger="hover"
          :show-arrow="false"
          :disabled="!isCollapsed"
        >
          <template #reference>
            <div class="sub-menu__title">
              <router-link :to="{ name: 'page' }">
                <font-awesome-icon :icon="['fas', 'file-alt']" />
                <span>页面</span>
              </router-link>
              <!--          <font-awesome-icon :icon="['fas', 'chevron-down']" />-->
            </div>
          </template>
          <ul class="menu">
            <li class="menu-item">
              <router-link :to="{ name: 'page-manage' }">
                <span>管理页面</span>
              </router-link>
            </li>
            <li class="menu-item">
              <router-link :to="{ name: 'page-design' }">
                <span>设计页面</span>
              </router-link>
            </li>
          </ul>
        </el-popover>
      </li>
      <!-- end of pages -->
      <li class="menu-item">
        <el-tooltip
          placement="right"
          content="多媒体库"
          :disabled="!isCollapsed"
          effect="light"
        >
          <router-link :to="{ name: 'media' }">
            <font-awesome-icon :icon="['fas', 'music']" />
            <span>多媒体库</span>
          </router-link>
        </el-tooltip>
      </li>
      <li class="menu-item">
        <el-tooltip
          placement="right"
          content="链接"
          :disabled="!isCollapsed"
          effect="light"
        >
          <router-link :to="{ name: 'link' }">
            <font-awesome-icon :icon="['fas', 'link']" />
            <span>链接</span>
          </router-link>
        </el-tooltip>
      </li>
      <!-- settings -->
      <li class="menu-item sub-menu close">
        <el-popover
          placement="right"
          trigger="hover"
          :show-arrow="false"
          :disabled="!isCollapsed"
        >
          <template #reference>
            <div class="sub-menu__title">
              <router-link :to="{ name: 'settings' }">
                <font-awesome-icon :icon="['fas', 'wrench']" />
                <span>设置</span>
              </router-link>
              <!--          <font-awesome-icon :icon="['fas', 'chevron-down']" />-->
            </div>
          </template>
          <ul class="menu">
            <li class="menu-item">
              <router-link :to="{ name: 'settings-menu' }">
                <span>菜单设置</span>
              </router-link>
            </li>
            <li class="menu-item">
              <router-link :to="{ name: 'settings-user' }">
                <span>用户设置</span>
              </router-link>
            </li>
            <li class="menu-item">
              <router-link :to="{ name: 'settings-app' }">
                <span>系统设置</span>
              </router-link>
            </li>
          </ul>
        </el-popover>
      </li>
      <!-- end of settings -->
    </ul>
  </nav>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      isCollapsed: false
    };
  },
  mounted() {
    // expand or collapse of navigation menu
    const menuItems = document.querySelectorAll('.main-nav > li');
    menuItems.forEach((menuItem) => {
      menuItem.addEventListener('click', function() {
        const that = this;
        menuItems.forEach((menuItem) => {
          menuItem.classList.remove('is-active');
          if (menuItem !== that) menuItem.classList.add('close');
        });
        menuItem.classList.add('is-active');
        menuItem.classList.toggle('close');
      });
    });
    const submenuItems = document.querySelectorAll('.sub-menu li');
    submenuItems.forEach((submenuItem) => {
      submenuItem.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    });

    // add event listener of nav
    const aside = document.querySelector('nav');
    const collapseBtn = document.querySelector('.collapse-button');
    collapseBtn.addEventListener('click', () => {
      this.isCollapsed = !this.isCollapsed;
      aside.classList.toggle('is-collapsed');
    });
  }
});
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}

ul,
li {
  padding: 0;
  margin: 0;
}

.purr-logo {
  display: flex;
  justify-content: center;
  font-size: 32px;
  font-weight: 900;
  //margin-bottom: 10px;
  padding: 16px;
  position: relative;
  overflow: visible;
  height: 70px;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  span {
    display: inline-block;
    color: var(--el-color-primary);
    background-image: linear-gradient(315deg, #0acffe 0%, #495affaa 100%);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
  }

  .collapse-button {
    position: absolute;
    top: 50%;
    left: 100%;
    width: 24px;
    height: 24px;
    transform: translate(-50%, -50%);
    color: var(--light-admin-text-color);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    box-shadow: var(--el-box-shadow-base);
    cursor: pointer;

    svg {
      width: 16px;
      height: 16px;
    }

    &:hover {
      color: var(--el-color-primary-light-3);
    }
  }
}

nav {
  width: 240px;
  overflow: visible;
  transition: width ease-out 0.5s;

  .main-nav {
    margin: -4px 0;

    li {
      border-radius: var(--el-border-radius-base);
      overflow: hidden;
      margin: 10px 0;
      cursor: pointer;

      li:hover {
        background-color: var(--light-admin-nav-hover-color);
      }
    }

    li:hover .sub-menu__title {
      background-color: var(--light-admin-nav-hover-color);
    }

    li:not(.sub-menu):hover {
      background-color: var(--light-admin-nav-hover-color);
    }

    .sub-menu__title {
      border-radius: var(--el-border-radius-base);
      overflow: hidden;
    }

    a {
      display: block;
      width: 100%;
      height: 100%;
      padding: 8px 0;
      color: var(--light-admin-text-color);
      overflow: hidden;
      white-space: nowrap;
    }

    svg {
      margin-left: 20px;
      width: 16px;
      height: 16px;
    }

    span {
      font-size: 14px;
      user-select: none;
      display: inline-block;
    }

    svg + span {
      margin-left: 18px;
      vertical-align: text-bottom;
    }

    > li {
      margin-left: 20px;
      margin-right: 20px;

      .menu > li {
        margin-left: 32px;

        span {
          margin-left: 20px;
        }
      }
    }

    > li.is-active {
      .sub-menu__title a {
        background-color: var(--el-color-primary);
        color: var(--el-color-white);
      }

      .router-link-exact-active {
        background-color: var(--el-color-primary);
        color: var(--el-color-white);
      }

      .menu {
        display: block;
      }
    }

    > li.sub-menu.close {
      .menu {
        display: none;
      }
    }
  }
}

nav.is-collapsed {
  width: 76px;
  transition: width ease-out 0.5s;

  .purr-logo {
    font-size: 20px;
    transition: all ease-out 0.5s;
  }

  .main-nav > li {
    margin: 10px 20px;

    a {
      transition: width ease-out 0.5s;
      height: 36px;
      padding: 10px;
    }

    .menu {
      display: none;
    }
  }

  svg {
    margin: 0;
    transition: all ease-out 0.5s;
  }

  svg + span {
    display: none;
  }
}
</style>
