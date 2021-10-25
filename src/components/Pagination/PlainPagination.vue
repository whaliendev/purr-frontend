<template>
  <div class="plain-pagination">
    <span
      class="page-button"
      @click="previousPage"
      :class="{ disabled: isFirstPage }"
      ><font-awesome-icon :icon="['fas', 'chevron-left']"
    /></span>
    <span
      class="page-button"
      @click="nextPage"
      :class="{ disabled: isLastPage }"
      ><font-awesome-icon :icon="['fas', 'chevron-right']"
    /></span>
  </div>
</template>

<script>
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'PlainPagination',
  props: {
    showDisabled: {
      type: Boolean,
      required: false,
      default: false
    },
    curPage: {
      type: Number,
      required: true
    },
    lastPage: {
      type: Number,
      required: false,
      default: 999
    }
  },
  emits: ['changePage'],
  setup(props, { emit }) {
    const previousPage = () => {
      emit('changePage', -1);
    };
    const nextPage = () => {
      emit('changePage', +1);
    };

    const isFirstPage = computed(() => {
      return props.curPage === 1 && props.showDisabled;
    });

    const isLastPage = computed(() => {
      return props.curPage === props.lastPage && props.showDisabled;
    });

    return {
      previousPage,
      nextPage,
      isFirstPage,
      isLastPage
    };
  }
});
</script>

<style lang="scss" scoped>
.plain-pagination {
  display: inline-block;
}

.page-button {
  display: inline-flex;
  width: 32px;
  height: 32px;
  border-radius: var(--el-border-radius-base);
  background-color: var(--light-admin-background-color);
  color: var(--el-color-primary-light-1);
  justify-content: center;
  align-items: center;
}

.page-button.disabled {
  color: var(--el-disabled-color-base);
}

.page-button:active,
.page-button:hover {
  background-color: var(--light-admin-background-accent-color);
}

.page-button:active {
  color: var(--el-color-primary);
}

.page-button:nth-of-type(1) {
  margin-right: 12px;
}
</style>
