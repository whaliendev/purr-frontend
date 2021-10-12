<template>
  <base-card>
    <div class="icon">
      <slot name="icon"></slot>
    </div>
    <div>
      <div class="count">{{ itemCount }}</div>
      <small>{{ itemName }}</small>
    </div>
  </base-card>
</template>

<script>
import { defineComponent } from 'vue';
import BaseCard from '../UI/BaseCard';

export default defineComponent({
  components: { BaseCard },
  props: {
    style: {
      type: String,
      required: false,
      default: ''
    },
    itemName: {
      type: String,
      required: true
    },
    itemCount: {
      type: [Number, String],
      required: true
    }
  }
});
</script>

<style scoped lang="scss">
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
</style>
