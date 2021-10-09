<template>
  <el-container>
    <el-aside><admin-nav></admin-nav></el-aside>
    <el-container>
      <el-header></el-header>
      <el-main></el-main>
    </el-container>
  </el-container>
</template>
<script>
import AdminNav from '../../components/Layout/AdminNav';
export default {
  components: { AdminNav }
};
</script>
<style lang="scss">
.el-container {
  width: 100vw;
  height: 100vh;
}

.el-aside {
  width: max-content;
  background-color: white;
  overflow: visible;
}

.el-container.is-vertical {
  background-color: var(--light-admin-background-color);
}
</style>
