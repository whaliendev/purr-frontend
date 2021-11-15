<template>
  <nav id="purr-header" class="navbar-full ontop">
    <svg class="nav-shade"></svg>
    <div class="nav-container">
      <div role="navigation" class="container nav-content content-item">
        <div class="logo">
          <router-link :to="{ name: 'homepage' }">
            Whalien的小星球
          </router-link>
        </div>

        <div class="menu-wrapper">
          <div class="menu-container">
            <div
              class="menu-item menu-item-container"
              v-for="menuItem in menuList"
              :key="menuItem.id"
            >
              <div class="popover-ref-wrapper">
                <div
                  class="menu-item-link-container"
                  :class="{ parent: menuItem.isParent === 1 }"
                  :data-popover-template="menuItem.url"
                >
                  <router-link
                    :to="menuItem.url"
                    :target="menuItem.target"
                    class="menu-item-nav"
                    exact
                  >
                    <font-awesome-icon
                      aria-hidden="true"
                      :icon="menuItem.iconList"
                    ></font-awesome-icon>
                    <span>{{ menuItem.name }}</span>
                    <font-awesome-icon
                      :icon="['fas', 'caret-down']"
                      v-if="menuItem.isParent === 1"
                    ></font-awesome-icon>
                    <div class="touch-ripple"></div>
                  </router-link>
                </div>
              </div>
              <ul
                class="submenu"
                :id="menuItem.url"
                v-if="menuItem.isParent === 1"
              >
                <li
                  class="submenu-item"
                  v-for="submenuItem in menuItem.subMenuItems"
                  :key="submenuItem.id"
                >
                  <router-link
                    :to="submenuItem.url"
                    :target="submenuItem.target"
                  >
                    <font-awesome-icon
                      aria-hidden="true"
                      :icon="submenuItem.iconList"
                    />
                    <span>{{ submenuItem.name }}</span>
                  </router-link>
                </li>
              </ul>
            </div>
            <span class="tab-indicator"></span>
          </div>
        </div>
      </div>
      <div class="nav-controls-container">
        <font-awesome-icon
          :icon="['fas', 'search']"
          aria-hidden="false"
          role="searchbox"
          class="search-box"
        ></font-awesome-icon>
        <el-popover
          placement="bottom-end"
          :width="120"
          popper-class="login-nav-popper"
          trigger="hover"
        >
          <template #reference>
            <font-awesome-icon
              :icon="['fas', 'user']"
              aria-hidden="false"
              class="login-nav"
            ></font-awesome-icon>
          </template>
          要不先<router-link :to="{ name: 'login' }" target="_self"
            >登录</router-link
          >一下？
        </el-popover>
      </div>
    </div>
  </nav>
</template>

<script>
import { defineComponent, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import tippy from 'tippy.js';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'PurrHeader',
  setup() {
    const store = useStore();
    const route = useRoute();

    // 获取Menu
    const menuList = ref([]);
    const getHomePageMenu = () => {
      if (store.getters['menus/menuList'].length !== 0) {
        // when make changes to menu item, pay attention to clear menuList locally.
        menuList.value = store.getters['menus/menuList'];
      } else {
        store
          .dispatch('menus/getHomePageMenu')
          .then((response) => {
            const data = response.data;
            if (data && data.success) {
              menuList.value = store.getters['menus/menuList'];
            }
          })
          .catch((error) => {
            console.log(error);
            // TODO enrich ux
          });
      }
    };
    // lifecycle created
    getHomePageMenu();

    // tab indicator相关API
    const menuItemNavs = [];
    let tabIndicator = null;
    onMounted(() => {
      const menuList = store.getters['menus/menuList'];
      menuList.forEach((menuItem) => {
        menuItemNavs.push(menuItem.url);
      });
      tabIndicator = document.querySelector('.tab-indicator');
    });
    watch(
      () => route.path,
      (newVal) => {
        if (menuItemNavs.indexOf(newVal) !== -1) {
          tabIndicator.style.visibility = 'visible';
          tabIndicator.style.left = `${
            22.5 + menuItemNavs.indexOf(newVal) * 105
          }px`;
        } else {
          tabIndicator.style.visibility = 'hidden';
        }
      }
    );

    // submenu popover
    onMounted(() => {
      tippy('.menu-item-link-container.parent', {
        content(reference) {
          const id = reference.getAttribute('data-popover-template');
          const template = document.getElementById(id);
          return template.innerHTML;
        },
        allowHTML: true,
        placement: 'bottom',
        interactive: true,
        theme: 'submenu',
        appendTo: () => document.body,
        offset: [0, -6]
      });
    });

    // when navbar is not at top, add a mask to navbar
    let navbar;
    let lastKnownScrollPosition = 0;
    let ticking = false;
    onMounted(() => {
      if (!navbar) navbar = document.querySelector('#purr-header');
    });
    document.addEventListener('scroll', () => {
      lastKnownScrollPosition = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (lastKnownScrollPosition === 0) {
            navbar.classList.add('ontop');
          } else {
            navbar.classList.remove('ontop');
          }
          ticking = false;
        });

        ticking = true;
      }
    });

    return {
      menuList
    };
  }
});
</script>

<style lang="scss" scoped>
#purr-header {
  font-family: var(--site-font-family);
}

.navbar-full.ontop {
  box-shadow: none;
  padding-top: 8px;
  background-color: rgba(0, 0, 0, 0);
  backdrop-filter: saturate(100%) blur(0);

  .nav-content .tab-indicator {
    background-color: #777;
  }
}

.navbar-full,
.navbar-full.expanded {
  background-color: hsla(0, 0%, 100%, 0.8);
  backdrop-filter: saturate(180%) blur(15px);
}

.navbar-full {
  position: fixed;
  width: 100%;
  background-color: hsla(0, 0%, 100%, 0.95);
  z-index: 600;
  min-height: 56px;
  box-shadow: 0 0 2px rgba(57, 70, 78, 0.2);
  opacity: 1;
  transition: background-color 0.3s ease-out, opacity 0.3s ease-out,
    padding 0.3s ease-out, backdrop-filter 0s ease-out, box-shadow 0.3s ease-out;

  .nav-content .tab-indicator {
    background-color: var(--el-color-primary-light-2);
  }
}

.nav-shade {
  display: block;
  pointer-events: none;
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  opacity: 0;
  background-color: #f5f5f5;
  transition: opacity 0.5s ease, background-color 0.5s ease;
  z-index: 10;
}

.nav-container {
  position: relative;
  min-height: 56px;
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
}

.content-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-content {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;

  .logo {
    padding: 12px 0;
    font-size: 21px;
    font-weight: 500;
    letter-spacing: 1px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
      'Lucida Sans', Arial, sans-serif;

    a {
      color: #333;
      text-transform: uppercase;
      line-height: 30px;
      text-decoration: none;
      display: inline-block;
      padding: 0 20px;

      &:hover {
        color: #555;
      }
    }
  }

  .menu-wrapper {
    display: flex;
    justify-content: flex-start;
    position: relative;
  }

  .menu-container {
    display: flex;
    align-items: center;
    position: relative;
    right: 10px;
  }

  .menu-item-container {
    position: relative;
    display: inline-block;

    a {
      color: #888;
      position: relative;
      text-decoration: none;
      display: inline-block;
      padding: 12px 0;
      line-height: 30px;
      text-align: center;
      width: 105px;
      transition: all 0.15s ease-out;

      &:hover {
        color: var(--el-color-primary);
      }
    }

    svg:nth-of-type(1) {
      margin-right: 0.5em;
    }

    svg:nth-of-type(2) {
      margin-left: 0.4em;
    }

    a.router-link-exact-active {
      color: var(--el-color-primary);
    }
  }

  .tab-indicator {
    position: absolute;
    left: 22.5px;
    bottom: 0;
    height: 2px;
    width: 60px;
    border-radius: 2px;
    transition: left 0.3s ease, width 0.3s ease, background-color 0.3s ease;
  }

  .submenu {
    padding: 0;
    display: none;
    flex-direction: column;
    list-style: none;
  }
}

.nav-controls-container {
  color: #888;
  position: absolute;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);

  .search-box:hover {
    animation: heartBeat;
    animation-duration: 1.5s;
  }

  .login-nav:hover {
    animation: tada;
    animation-duration: 1.5s;
  }

  svg {
    width: 22px;
    height: 22px;

    &:nth-of-type(1) {
      margin-right: 24px;
    }

    &:hover {
      color: var(--el-color-primary-light-2);
    }
  }
}
</style>

<style lang="scss">
.tippy-box[data-theme='submenu'] {
  font-family: var(--article-font-family);
  background-color: hsla(0, 0%, 100%, 0.95);
  color: white;
  border-radius: 8px;
  width: 125px;
  padding: 15px 10px;
  box-shadow: var(--el-box-shadow-light);
  text-transform: uppercase;

  .tippy-content {
    width: 105px;

    li {
      list-style: none;
      padding: 8px 0;

      svg {
        margin-right: 6px;
        vertical-align: center;
      }

      a {
        color: #666;
        padding: 6px 5px;
        vertical-align: center;
      }

      a:hover {
        color: var(--el-color-primary);
      }
    }
  }
}

.el-popover.el-popper.login-nav-popper {
  font-size: 12px;
}
</style>
