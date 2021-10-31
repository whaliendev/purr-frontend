<template>
  <span
    class="tag-wrapper"
    :class="[round]"
    :style="
      `background-color: ${color}; background-image: radial-gradient(${color}, ${edgeColor});` +
      style
    "
  >
    <a
      v-if="link"
      :href="linkName"
      :target="target"
      :class="{ black: black }"
      class="tag-name href"
      >{{ name }}</a
    >
    <span class="tag-name" :class="{ black: black }" v-else>{{ name }}</span>
    <el-icon :size="16" @click="handleDeleteTag" class="delete-tag"
      ><close-bold
    /></el-icon>
  </span>
</template>

<script>
import { defineComponent } from 'vue';
import CloseBold from '@/components/Icon/CloseBold';

export default defineComponent({
  components: { CloseBold },
  props: {
    name: {
      validator(val) {
        return typeof val === 'string' || val instanceof String;
      },
      required: true
    },
    link: {
      type: Boolean,
      required: false,
      default: true
    },
    linkName: {
      validator(val) {
        return typeof val === 'string' || val instanceof String;
      },
      required: false,
      default: '#'
    },
    target: {
      validator(val) {
        return typeof val === 'string' || val instanceof String;
      },
      required: false,
      default: '_blank'
    },
    color: {
      validator(val) {
        return typeof val === 'string' || val instanceof String;
      },
      required: false,
      default: '#aeddef'
    },
    black: {
      type: Boolean,
      required: false,
      default: false
    },
    round: {
      validator(val) {
        return ['mini', 'medium', 'large', 'round', 'circle'].includes(val);
      },
      required: false,
      default: 'medium'
    },
    style: {
      validator(val) {
        return typeof val === 'string' || val instanceof String;
      },
      required: false,
      default: 'margin: 0 4px 0 4px;'
    }
  },
  computed: {
    edgeColor() {
      return this.color + 'aa';
    }
  },
  methods: {
    handleDeleteTag() {}
  }
});
</script>

<style lang="scss" scoped>
.tag-wrapper {
  display: inline-flex;
  padding: 2px 4px;
  justify-content: center;
  align-items: center;

  &.mini {
    border-radius: 2px;
  }

  &.medium {
    border-radius: 4px;
  }

  &.large {
    border-radius: 8px;
  }

  &.round {
    border-radius: 20px;
  }

  &.circle {
    border-radius: 50%;
  }
}

.tag-name {
  color: var(--el-color-white);
  font-size: 12px;

  &.black {
    color: var(--el-color-black);
  }

  &.href:visited {
    color: var(--el-color-white);
  }

  &.href:hover {
    color: var(--el-color-primary-light-1);
  }
}

.delete-tag {
  color: var(--el-color-white);
  vertical-align: center;
  margin-left: 4px;

  &:hover {
    color: var(--el-color-danger);
  }

  &.black {
    color: var(--el-color-black);
  }
}
</style>
