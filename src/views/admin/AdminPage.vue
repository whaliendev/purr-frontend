<template>
  <el-container>
    <div class="mask"></div>
    <el-aside>
      <admin-nav />
    </el-aside>
    <el-container>
      <el-header><admin-header @showNav="showNav" /></el-header>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>
<script>
import AdminNav from '../../components/Layout/AdminNav';
import AdminHeader from '../../components/Layout/AdminHeader';
import { onMounted } from 'vue';
export default {
  components: { AdminHeader, AdminNav },
  setup() {
    let aside;
    let mask;

    const showNav = () => {
      aside.classList.add('show-nav');
      mask.classList.add('show-nav');
    };

    onMounted(() => {
      aside = document.querySelector('.el-aside');
      mask = document.querySelector('.mask');
      const navItems = document.querySelectorAll('.nav-item');
      navItems.forEach((navItem) => {
        navItem.addEventListener('click', () => {
          aside.classList.remove('show-nav');
          mask.classList.remove('show-nav');
        });
      });
      mask.addEventListener('click', () => {
        aside.classList.remove('show-nav');
        mask.classList.remove('show-nav');
      });
    });

    return {
      showNav
    };
  }
};
</script>
<style lang="scss" scoped>
.el-container:nth-of-type(1) {
  width: 100%;
  height: 100%;
}

.el-aside {
  width: max-content;
  background-color: white;
  overflow: visible;
}

.mask {
  position: fixed;
  z-index: 900;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  background-color: rgba(0, 0, 0, 0.15);
}

.el-header {
  height: 64px;
  display: flex;
  align-items: center;
}

.el-container.is-vertical {
  height: 100vh;
  background-color: var(--light-admin-background-color);
}

@media screen and (max-width: 640px) {
  .el-aside {
    overflow: hidden;

    nav {
      width: 0;
    }
  }
}

.el-aside.show-nav {
  box-shadow: var(--el-box-shadow-base);
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  overflow: visible;
  z-index: 1000;

  nav {
    width: 240px;
  }

  :deep(.collapse-button) {
    display: none;
  }
}

.mask.show-nav {
  width: 100%;
  height: 100%;
}
</style>
