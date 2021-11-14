<template>
  <div class="article-card"></div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ArticleCard',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  setup() {}
});
</script>

<style lang="scss" scoped></style>
