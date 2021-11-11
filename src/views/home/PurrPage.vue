<template>
  <el-container class="purr-main-wrapper">
    <el-aside class="purr-statistic-aside">
      <statistic-drawer />
    </el-aside>
    <el-container class="purr-main-container">
      <el-header><purr-header /></el-header>
      <el-main><router-view></router-view></el-main>
      <el-footer><purr-footer /></el-footer>
    </el-container>
  </el-container>
</template>
<script>
import StatisticDrawer from '@/components/Drawer/StatisticDrawer';
import PurrHeader from '@/components/Layout/PurrHeader';
import PurrFooter from '@/components/Layout/PurrFooter';
export default {
  components: { PurrFooter, PurrHeader, StatisticDrawer }
};
</script>
<style lang="scss" scoped>
.purr-main-wrapper {
  width: 100%;
  height: 100%;

  .purr-statistic-aside {
    display: none;
  }

  .purr-main-container {
    width: 100%;
    height: 100%;

    .el-header,
    .el-footer {
      padding: 0;
    }
  }
}
</style>
