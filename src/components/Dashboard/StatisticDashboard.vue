<template>
  <div id="statistic-dashboard">
    <div class="widgets-container-wrapper">
      <div class="widgets-container">
        <base-card>
          <div class="icon">
            <font-awesome-icon :icon="['fas', 'eye']" />
          </div>
          <div>
            <div class="count">11.1k</div>
            <small>浏览量</small>
          </div>
        </base-card>
        <base-card>
          <div class="icon">
            <font-awesome-icon :icon="['fas', 'file-alt']" />
          </div>
          <div>
            <div class="count">28</div>
            <small>文章数</small>
          </div>
        </base-card>
        <base-card>
          <div class="icon">
            <font-awesome-icon :icon="['fas', 'heart']" />
          </div>
          <div>
            <div class="count">700</div>
            <small>点赞数</small>
          </div>
        </base-card>
        <base-card>
          <div class="icon">
            <font-awesome-icon :icon="['fas', 'comment-dots']" />
          </div>
          <div>
            <div class="count">132</div>
            <small>评论数</small>
          </div>
        </base-card>
      </div>
    </div>
    <div class="view-trending-plot">

    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import BaseCard from '../UI/BaseCard';
export default defineComponent({
  components: { BaseCard },
  setup() {
    // const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--el-color-primary');
    // const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--el-color-primary');
    // const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--el-color-primary');
    // const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--el-color-primary');
  }
});
</script>

<style lang="scss" scoped>
.widgets-container-wrapper {
  margin: -12px;
  max-width: max-content;
}

.widgets-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.base-card {
  width: max-content;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 40px 12px 16px;
  margin: 12px;

  .icon {
    width: 44px;
    height: 44px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: var(--el-border-radius-base);
  }

  .icon + div {
    display: inline-block;
    margin-left: 16px;

    small {
      display: inline-block;
      font-size: 0.8em;
      margin-top: 5px;
      color: var(--light-admin-text-color);
    }
  }

  .count {
    color: var(--light-admin-text-accent-color);
    font-weight: 700;
    font-size: 18px;
  }

  svg {
    width: 20px;
    height: 20px;
  }
}

.base-card:nth-of-type(1) .icon {
  color: var(--el-color-success);
  background-color: var(--el-color-success-light);
}

.base-card:nth-of-type(2) .icon {
  color: var(--el-color-warning);
  background-color: var(--el-color-warning-light);
}

.base-card:nth-of-type(3) .icon {
  color: var(--el-color-danger);
  background-color: var(--el-color-danger-light);
}

.base-card:nth-of-type(4) .icon {
  color: var(--el-color-primary);
  background-color: var(--el-color-primary-light-5);
}
</style>
