<template>
  <nav>
    <div class="purr-logo">
      <router-link :to="{ name: 'dashboard' }"><span>PURR</span></router-link>
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
      <li class="menu-item is-active nav-item">
        <el-tooltip
          placement="right"
          content="首页"
          :disabled="!isCollapsed"
          :offset="25"
          :show-after="150"
          :visible-arrow="false"
        >
          <router-link :to="{ name: 'dashboard' }">
            <font-awesome-icon :icon="['fas', 'th-large']" />
            <span>首页</span>
          </router-link>
        </el-tooltip>
      </li>
      <!--  submenu of articles  -->
      <li class="menu-item sub-menu close">
        <div class="popover-ref-wrapper">
          <div class="sub-menu__title" data-popover-template="article-menu">
            <router-link :to="{ name: 'article-manage' }">
              <font-awesome-icon :icon="['fas', 'pen']" />
              <span>文章</span>
            </router-link>
            <!--          <font-awesome-icon :icon="['fas', 'chevron-down']" />-->
          </div>
        </div>
        <ul class="menu" id="article-menu">
          <li class="menu-item nav-item">
            <router-link :to="{ name: 'article-manage' }">
              <span>管理文章</span>
            </router-link>
          </li>
          <li class="menu-item nav-item">
            <router-link :to="{ name: 'article-compose' }">
              <span>写作文章</span>
            </router-link>
          </li>
          <li class="menu-item nav-item">
            <router-link :to="{ name: 'article-tag' }">
              <span>标签</span>
            </router-link>
          </li>
        </ul>
      </li>
      <!-- end of sub menu of articles -->
      <li class="menu-item nav-item">
        <el-tooltip
          placement="right"
          content="评论"
          :disabled="!isCollapsed"
          :offset="25"
          :show-after="150"
          :visible-arrow="false"
        >
          <router-link :to="{ name: 'comment' }">
            <font-awesome-icon :icon="['fas', 'comment-dots']" />
            <span>评论</span>
          </router-link>
        </el-tooltip>
      </li>
      <li class="menu-item nav-item">
        <el-tooltip
          placement="right"
          content="动态"
          :disabled="!isCollapsed"
          :offset="25"
          :show-after="150"
          :visible-arrow="false"
        >
          <router-link :to="{ name: 'moment' }">
            <font-awesome-icon :icon="['fas', 'paper-plane']" />
            <span>动态</span>
          </router-link>
        </el-tooltip>
      </li>
      <!-- pages -->
      <li class="menu-item sub-menu close">
        <div class="popover-ref-wrapper">
          <div class="sub-menu__title" data-popover-template="page-menu">
            <router-link :to="{ name: 'page' }">
              <font-awesome-icon :icon="['fas', 'file-alt']" />
              <span>页面</span>
            </router-link>
            <!--          <font-awesome-icon :icon="['fas', 'chevron-down']" />-->
          </div>
        </div>
        <ul class="menu" id="page-menu">
          <li class="menu-item nav-item">
            <router-link :to="{ name: 'page-manage' }">
              <span>管理页面</span>
            </router-link>
          </li>
          <li class="menu-item nav-item">
            <router-link :to="{ name: 'page-design' }">
              <span>设计页面</span>
            </router-link>
          </li>
        </ul>
      </li>
      <!-- end of pages -->
      <li class="menu-item nav-item">
        <el-tooltip
          placement="right"
          content="多媒体库"
          :disabled="!isCollapsed"
          :offset="25"
          :show-after="150"
          :visible-arrow="false"
        >
          <router-link :to="{ name: 'media' }">
            <font-awesome-icon :icon="['fas', 'music']" />
            <span>多媒体库</span>
          </router-link>
        </el-tooltip>
      </li>
      <li class="menu-item nav-item">
        <el-tooltip
          placement="right"
          content="链接"
          :disabled="!isCollapsed"
          :offset="25"
          :show-after="150"
          :visible-arrow="false"
        >
          <router-link :to="{ name: 'link' }">
            <font-awesome-icon :icon="['fas', 'link']" />
            <span>链接</span>
          </router-link>
        </el-tooltip>
      </li>
      <!-- settings -->
      <li class="menu-item sub-menu close">
        <div class="popover-ref-wrapper">
          <div class="sub-menu__title" data-popover-template="settings-menu">
            <router-link :to="{ name: 'settings' }">
              <font-awesome-icon :icon="['fas', 'wrench']" />
              <span>设置</span>
            </router-link>
            <!--          <font-awesome-icon :icon="['fas', 'chevron-down']" />-->
          </div>
        </div>
        <ul class="menu" id="settings-menu">
          <li class="menu-item nav-item">
            <router-link :to="{ name: 'settings-menu' }">
              <span>菜单设置</span>
            </router-link>
          </li>
          <li class="menu-item nav-item">
            <router-link :to="{ name: 'settings-user' }">
              <span>用户设置</span>
            </router-link>
          </li>
          <li class="menu-item nav-item">
            <router-link :to="{ name: 'settings-app' }">
              <span>系统设置</span>
            </router-link>
          </li>
        </ul>
      </li>
      <!-- end of settings -->
    </ul>
  </nav>
</template>

<script>
import { defineComponent } from 'vue';
import tippy from 'tippy.js';

export default defineComponent({
  data() {
    return {
      isCollapsed: false
    };
  },
  mounted() {
    const that = this;

    // add event listener for collapse button
    const aside = document.querySelector('nav');
    const collapseBtn = document.querySelector('.collapse-button');
    if (this.isCollapsed) aside.classList.add('is-collapsed');
    collapseBtn.addEventListener('click', () => {
      this.isCollapsed = !this.isCollapsed;
      aside.classList.toggle('is-collapsed');
    });

    // add click event listener of list nav item
    const menuItems = document.querySelectorAll('.main-nav > li');
    menuItems.forEach((menuItem) => {
      menuItem.addEventListener('click', function () {
        const that = this;
        menuItems.forEach((menuItem) => {
          menuItem.classList.remove('is-active');
          if (menuItem !== that) menuItem.classList.add('close');
        });
        menuItem.classList.add('is-active');
        menuItem.classList.toggle('close');
      });
    });
    // disable default propagation to prevent close the dropdown menu
    const submenus = document.querySelectorAll('.sub-menu ul');
    submenus.forEach((submenu) => {
      submenu.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    });

    // add popover for submenu
    tippy('.sub-menu__title', {
      content(reference) {
        const id = reference.getAttribute('data-popover-template');
        const template = document.getElementById(id);
        return template.innerHTML;
      },
      allowHTML: true,
      placement: 'right-start',
      interactive: true,
      offset: [-10, 25],
      onShow(instance) {
        const navs = instance.popper.querySelectorAll('a');
        navs.forEach((nav) => {
          nav.addEventListener('click', (e) => {
            navs.forEach((nav) => nav.classList.remove('highlight'));
            nav.classList.add('highlight');
            e.preventDefault(); // prevent reloading whole page
            that.$router.push(nav.pathname);
          });
        });
      }
    });

    // activate dashboard nav item initially
    const pathname = window.location.pathname;
    const firstClassNav = /\/\w+\/\w+/;
    const matches = pathname.match(firstClassNav);
    const curNav = document.querySelector(`a[href="${matches[0]}"]`);
    curNav.parentElement.parentElement.parentElement.classList.add('is-active');
    // curNav.classList.add('is-active');
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
  align-items: center;
  font-size: 20px;
  font-weight: 900;
  position: relative;
  overflow: visible;
  height: 64px;

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

:deep(div[data-tippy-root]) {
  background-color: var(--el-color-white);
  box-shadow: var(--el-box-shadow-base);
  border-radius: var(--el-border-radius-base);
  padding: 0 8px;

  // add specificity
  .menu-item a {
    padding: 10px 70px 10px 14px;
  }

  .highlight {
    background-color: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
  }
}

nav {
  width: 240px;
  overflow: visible;
  transition: width ease-out 0.5s;

  :deep(div[data-tippy-root]) {
    display: none;
  }
}

.main-nav {
  margin: -4px 0;

  li {
    border-radius: var(--el-border-radius-base);
    overflow: hidden;
    margin: 10px 0;
    cursor: pointer;

    // menu item nested in nav item
    li:hover {
      background-color: var(--light-admin-nav-hover-color);
    }
  }

  // it's a must, as the background of ul nested in nav item is white
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
    margin-left: 24px;
    width: 16px;
    height: 16px;
  }

  span {
    font-size: 14px;
    user-select: none;
    display: inline-block;
  }

  svg + span {
    margin-left: 24px;
    vertical-align: text-bottom;
  }

  > li {
    margin-left: 24px;
    margin-right: 24px;
    -webkit-tap-highlight-color: transparent;
  }

  // nav items nested in outer nav item
  ul.menu > li {
    margin-left: 32px;

    span {
      margin-left: 32px;
    }
  }

  > li.is-active {
    > .router-link-exact-active {
      background-color: var(--el-color-primary);
      color: var(--el-color-white);
    }

    .sub-menu__title a {
      background-color: var(--el-color-primary);
      color: var(--el-color-white);
    }

    .menu .router-link-exact-active {
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

nav.is-collapsed {
  width: 76px;
  transition: width ease-out 0.5s;

  .purr-logo {
    font-size: 16px;
    transition: all ease-out 0.5s;
  }

  :deep(div[data-tippy-root]) {
    display: block;
  }

  a {
    transition: width ease-out 0.5s;
    height: 36px;
    padding: 10px;
  }

  .main-nav > li {
    margin: 10px 20px;

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
