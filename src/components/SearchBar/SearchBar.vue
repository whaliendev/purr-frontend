<template>
  <div class="search-bar-container">
    <el-autocomplete
      placeholder="请输入搜索内容"
      :trigger-on-focus="false"
      v-model="queryString"
    >
      <template #suffix>
        <el-icon :size="24">
          <search></search>
        </el-icon>
      </template>
    </el-autocomplete>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import Search from '../Icon/Search';
export default defineComponent({
  components: {Search},
  setup() {
    const queryString = ref('');

    return {
      queryString
    };
  }
});
</script>

<style lang="scss">
.search-bar-container {
  width: 100%;

  .el-autocomplete {
    width: 100%;
  }

  .el-input__inner {
    border-width: 0;
  }

  .el-input__suffix {
    right: 10px;
    top: 8px;
  }
}
</style>
