<template>
  <span
    class="tag-wrapper"
    :class="[round, flatClass]"
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
    <el-icon
      :size="16"
      @click="handleDeleteTag"
      class="delete-tag"
      v-if="deletable"
      ><close-bold
    /></el-icon>
  </span>
</template>

<script>
import { defineComponent } from 'vue';
import CloseBold from '@/components/Icon/CloseBold';

export default defineComponent({
  components: { CloseBold },
  emits: ['deleteTag'],
  props: {
    id: {
      type: Number,
      required: true
    },
    name: {
      validator(val) {
        return typeof val === 'string' || val instanceof String;
      },
      required: true
    },
    deletable: {
      type: Boolean,
      required: false,
      default: false
    },
    linkName: {
      validator(val) {
        return typeof val === 'string' || val instanceof String;
      },
      required: false,
      default: ''
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
    flat: {
      type: Boolean,
      required: false,
      default: false
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
    },
    link() {
      return this.linkName.length !== 0;
    },
    flatClass() {
      return this.flat ? 'flat' : '';
    }
  },
  methods: {
    handleDeleteTag() {
      this.$emit('deleteTag', this.id);
    }
  }
});
</script>

<style lang="scss" scoped>
.tag-wrapper {
  display: inline-flex;
  padding: 2px 6px;
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
  margin-top: 2px;
  vertical-align: middle;

  &.black {
    color: var(--el-color-black);
  }

  &.href:visited {
    color: coral;
  }

  &.href:focus {
    color: var(--el-color-warning);
  }

  &.href:hover {
    color: orange;
  }

  &.href:active {
    color: orange;
  }
}

.delete-tag {
  color: var(--el-color-white);
  vertical-align: middle;
  margin-left: 4px;

  &:hover {
    color: var(--el-color-danger);
  }

  &.black {
    color: var(--el-color-black);
  }
}

.tag-wrapper.flat {
  background-color: transparent !important;
  background-image: none !important;

  .tag-name {
    color: #999 !important;

    &.black {
      color: var(--el-color-black) !important;
    }

    &.href:visited {
      color: coral !important;
    }

    &.href:focus {
      color: var(--el-color-warning) !important;
    }

    &.href:hover {
      color: orange !important;
    }

    &.href:active {
      color: orange !important;
    }
  }
}
</style>
