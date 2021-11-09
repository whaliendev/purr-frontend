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

        <div class="nav-group">
          <div class="nav-container">
            <div
              class="menu-item menu-item-container"
              v-for="menuItem in menuList"
              :key="menuItem.id"
            >
              <div class="menu-item" :data-popover-template="menuItem.url">
                <router-link :to="menuItem.url" :target="menuItem.target">
                  <i aria-hidden="true" :class="menuItem.icon"></i>
                  <span>{{ menuItem.name }}</span>
                  <i aria-hidden="true" class="expand icon"></i>
                  <div class="touch-ripple"></div>
                </router-link>
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
                    <i aria-hidden="true" :class="submenuItem.icon"></i>
                    <span>{{ submenuItem.name }}</span>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="controls-container">
          <i class=""></i>
          <i class=""></i>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'PurrHeader',
  setup() {
    const store = useStore();

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
      console.log(menuList.value);
    };
    // lifecycle created
    getHomePageMenu();

    return {
      menuList
    };
  }
});
</script>

<style lang="scss" scoped>
.navbar-full.ontop {
  box-shadow: none;
  padding-top: 8px;
  background-color: rgba(0, 0, 0, 0);
  backdrop-filter: saturate(100%) blur(0);
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
  -webkit-box-shadow: 0 0 2px rgba(57, 70, 78, 0.2);
  box-shadow: 0 0 2px rgba(57, 70, 78, 0.2);
  opacity: 1;
  transition: background-color 0.3s ease-out, opacity 0.3s ease-out,
    padding 0.3s ease-out, backdrop-filter 0s ease-out, box-shadow 0.3s ease-out;
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
</style>
