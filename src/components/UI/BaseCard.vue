<template>
  <div
    class="base-card"
    :class="[radius, shadow ? 'shadow' : '']"
    :style="style"
  >
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'BaseCard',
  props: {
    shadow: {
      type: Boolean,
      required: false,
      default: false
    },
    radius: {
      type: String,
      required: false,
      default: 'base',
      validator: (val) => {
        return ['base', 'small', 'round'].includes(val);
      }
    },
    style: {
      type: String,
      required: false,
      default: ''
    }
  },
  setup() {}
});
</script>

<style lang="scss" scoped>
.base-card {
  background-color: var(--el-color-white);
}

.base-card.shadow {
  box-shadow: var(--el-box-shadow-base);
}

.base-card.base {
  border-radius: var(--el-border-radius-base);
}

.base-card.small {
  border-radius: var(--el-border-radius-small);
}

.base-card.round {
  border-radius: var(--el-border-radius-round);
}
</style>
