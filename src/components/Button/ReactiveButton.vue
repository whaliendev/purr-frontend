<template>
  <el-button
    :data-block="block"
    :icon="computedIcon"
    :loading="loading"
    :size="size"
    :type="computedType"
    :native-type="nativeType"
    @click="handleClick"
    >{{ computedText }}
  </el-button>
</template>
<script>
import { ElButton } from 'element-plus';
export default {
  name: 'ReactiveButton',
  components: [ElButton],
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    icon: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: 'default'
    },
    block: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    errored: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ''
    },
    loadedText: {
      type: String,
      default: ''
    },
    erroredText: {
      type: String,
      default: ''
    },
    nativeType: {
      type: String,
      default: 'button'
    }
  },
  emits: ['callback', 'click'],
  data() {
    return {
      loaded: false,
      hasError: false
    };
  },
  watch: {
    loading(value) {
      if (!value) {
        this.loaded = true;
        if (this.errored) {
          this.hasError = true;
        }
        setTimeout(() => {
          this.loaded = false;
          this.hasError = false;
          this.$emit('callback');
        }, 400);
      }
    }
  },
  computed: {
    computedType() {
      if (this.loaded) {
        return this.hasError ? 'danger' : this.type;
      }
      return this.type;
    },
    computedIcon() {
      if (this.loaded) {
        return this.hasError ? 'circle-close' : 'circle-check';
      }
      return this.icon;
    },
    computedText() {
      if (this.loaded) {
        return this.hasError ? this.erroredText : this.loadedText;
      }
      return this.text;
    }
  },
  methods: {
    handleClick() {
      this.$emit('click');
    }
  }
};
</script>

<style scoped>
:deep(button[data-block]) {
  width: 100%;
}
</style>
