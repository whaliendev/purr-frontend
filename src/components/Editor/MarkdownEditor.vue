<template>
  <v-md-editor
    :text="articleContent"
    @change="handleContentChange"
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
import { ElMessage } from 'element-plus';

export default defineComponent({
  name: 'MarkdownEditor',
  props: {
    articleContent: {
      type: String,
      required: false,
      default: ''
    }
  },
  emits: ['saveDraft', 'previewImage', 'update:articleContent'],
  methods: {
    handleContentChange(text) {
      this.$emit('update:articleContent', text);
    },
    handleAttachmentUpload(event, insertImage, files) {
      if (files[0].size / 1024 / 1024 >= 1024) {
        ElMessage.error({
          center: true,
          message: '上传图片大小不能超过1G'
        });
        return;
      }
      let formData = new FormData();
      formData.append('file', files[0]);
      this.$store
        .dispatch('medias/uploadSingleFile', {
          data: formData
        })
        .then((response) => {
          if (response.data && response.data.success) {
            insertImage({
              url: response.data.data.url,
              desc: response.data.data.originalName
            });
            ElMessage.success({
              center: true,
              message: '上传图片成功'
            });
          }
        })
        .catch((err) => {
          ElMessage.error({
            center: true,
            message: `上传图片失败, 失败原因: ${err.message}`
          });
        });
    },
    handleSaveDraft(text, html) {
      this.$emit('saveDraft', {
        text,
        html
      });
    },
    handleImageClick(images, currentIndex) {
      // images的数据类型是一个url的数组, currentIndex是0-based
      // TODO emit this event: open the media detail drawer
      this.$emit('previewImage', {
        images,
        currentIndex
      });
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
