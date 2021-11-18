<template>
  <div id="admin-media">
    <base-card style="padding: 20px" class="media-admin-header">
      <span class="media-admin-title">媒体库</span>
      <div class="controls-container">
        <div class="keyword-control-container">
          <label class="keyword-label">关键词：</label>
          <el-input
            size="small"
            type="text"
            minlength="1"
            maxlength="240"
            v-model="keyword"
            class="keyword-input"
            placeholder="输入关键词以搜索"
          />
        </div>
      </div>
    </base-card>

    <base-card style="padding: 20px" class="media-admin-body"> </base-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import BaseCard from '@/components/UI/BaseCard';

export default defineComponent({
  components: { BaseCard }
});
</script>

<style lang="scss" scoped></style>
