<template>
  <el-card :class="{ info }" :shadow="shadow">
    <slot></slot>
  </el-card>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    shadow: String,
    info: Boolean
  }
});
</script>

<style scoped>
:deep(.el-card__body) {
  padding: 8px 8px 8px 14px;
  font-size: 14px;
}

.el-card.info :deep(.el-card__body) {
  color: var(--el-color-info);
}
</style>
