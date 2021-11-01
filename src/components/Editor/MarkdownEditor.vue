<template>
  <v-md-editor
    v-model="articleContent"
    mode="editable"
    :toc-nav-position-right="true"
    placeholder="markdown supported while <style/> forbidden, 请开始你的表演···"
    :include-level="[1, 2, 3, 4, 5, 6]"
    :disabled-menus="[]"
    @upload-image="handleAttachmentUpload"
    @save="handleSaveDraft"
    @image-click="handleImageClick"
    height="720px"
  >
  </v-md-editor>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MarkdownEditor',
  props: {
    content: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      articleContent: ''
    };
  },
  methods: {
    handleAttachmentUpload(event, insertImage, files) {
      // store to dispatch
      console.log(event, insertImage, files);
    },
    handleSaveDraft(text, html) {
      // store to dispatch
      console.log(text, html);
    },
    handleImageClick(images, currentIndex) {
      // images的数据类型是一个url的数组, currentIndex是0-based
      // TODO emit this event: open the media detail drawer
      console.log(images, currentIndex);
    }
  }
});
</script>

<style lang="scss" scoped>
.v-md-editor {
  box-shadow: 0 0 0;
  border-radius: var(--el-border-radius-base);
}

.v-md-editor__toolbar {
  border-bottom: var(--el-border-base);
}

.v-md-editor__editor-wrapper {
  border-right: var(--el-border-base);
}
</style>
