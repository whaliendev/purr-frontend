<template>
  <el-container>
    <!--  小于640隐藏，640-768占用1列，768往上占4列 hidden-xs-only  -->
    <el-col class="nav-col">
      <el-aside><admin-nav></admin-nav></el-aside>
    </el-col>
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
.nav-col {
}
aside:nth-of-type(1) {
}
</style>
