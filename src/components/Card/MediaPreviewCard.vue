<template>
  <div
    class="media-preview-card"
    :class="{
      'select-mode': mode === 'batch',
      selected: selected,
      'box-shadow': boxShadow
    }"
    @click="handleClickCard"
  >
    <div class="media-preview-header" title="点击以查看详情">
      <el-image
        :src="'https://purr.group' + media.thumbnailPath"
        :alt="`cover image of ${media.originalName}`"
        lazy
      >
        <template #error>
          <font-awesome-icon
            :icon="
              getFileIconArr(
                media.fileCategory,
                media.fileType,
                media.originalName
              )
            "
          />
        </template>
        <template #placeholder>
          <div class="loading-meow" />
        </template>
      </el-image>
      <el-checkbox v-model="selected"></el-checkbox>
      <div class="content-mask"></div>
    </div>
    <div class="media-preview-body">
      <el-tooltip
        effect="dark"
        :content="media.originalName"
        placement="top"
        :visible-arrow="false"
        :disabled="
          mode === 'batch' ||
          ellipsisFormat(media.originalName, titleLength).length ===
            media.originalName.length
        "
      >
        <span class="media-name">{{
          ellipsisFormat(media.originalName, titleLength)
        }}</span>
      </el-tooltip>
      <span class="op-container">
        <font-awesome-icon
          :icon="['fab', 'markdown']"
          class="media-op"
          title="复制"
          @click.stop="handleCopyMarkdownLink"
        />
        <font-awesome-icon
          :icon="['fas', 'link']"
          class="media-op"
          title="复制"
          @click.stop="handleCopyLink"
        />
      </span>
    </div>
    <div class="card-content-mask" />
  </div>
</template>

<script>
import { computed, defineComponent, ref, watch } from 'vue';
import { copyTextToClipboard, ellipsisFormat } from '@/utils/util';
import { ElMessage } from 'element-plus';

export default defineComponent({
  name: 'MediaPreviewCard',
  props: {
    media: {
      type: Object,
      required: true
    },
    mode: {
      type: String,
      validator(mode) {
        return ['normal', 'batch'].includes(mode);
      },
      required: false,
      default: 'normal'
    },
    titleLength: {
      type: Number,
      validator(val) {
        if (typeof val !== 'number') return false;
        return val >= 13 && val <= 53;
      },
      required: false,
      default: 22
    },
    boxShadow: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  emits: ['previewMedia', 'isSelected'],
  setup(props, context) {
    const getFileIconArr = (category, type, fileName) => {
      const arr = ['far'];
      let defaultIconName = 'file-alt';
      if (category === 'image') return arr.concat(['file-image']);
      if (category === 'audio') return arr.concat(['file-audio']);
      const extensionType = fileName.split('.').pop();
      // eslint-disable-next-line
      if (
        ['doc', 'docm', 'docx', 'dot', 'dotm', 'dotx'].includes(type) ||
        ['doc', 'docm', 'docx', 'dot', 'dotm', 'dotx'].includes(extensionType)
      )
        return arr.concat(['file-word']);
      // eslint-disable-next-line
      if (['ppt', 'pptx'].includes(type)||['ppt', 'pptx'].includes(extensionType)) return arr.concat(['file-powerpoint']);
      if (type === 'pdf') return arr.concat(['file-pdf']);
      // eslint-disable-next-line
      if (['xls', 'xlsx'].includes(type) || ['xls', 'xlsx'].includes(extensionType)) return arr.concat(['file-excel']);
      // eslint-disable-next-line
      const codeList = ['html', 'css', 'js', 'cpp', 'c', 'java', 'go', 'kt', 'mat', 'py', 'rs', 'php'];
      if (codeList.includes(type) || codeList.includes(extensionType))
        return arr.concat(['file-code']);
      // eslint-disable-next-line
      if (['zip', 'gz', '7z', 'rar'].includes(type) || ['zip', 'gz', '7z', 'rar'].includes(extensionType)) return arr.concat(['file-archive']);
      return arr.concat([defaultIconName]);
    };

    const handleCopyMarkdownLink = () => {
      if (props.mode === 'batch') return;
      const copyText =
        props.media.fileCategory === 'image'
          ? `![${props.media.originalName}](${props.media.url})`
          : `[${props.media.originalName}](${props.media.url})`;
      copyTextToClipboard(copyText).then((res) => {
        if (res) {
          ElMessage.success({
            center: true,
            message: '复制markdown格式链接到剪贴板成功'
          });
        }
      });
    };

    const handleCopyLink = () => {
      if (props.mode === 'batch') return;
      copyTextToClipboard(props.media.url).then((res) => {
        if (res) {
          ElMessage.success({
            center: true,
            message: '复制链接到剪贴板成功'
          });
        }
      });
    };

    const selected = ref(false);
    const handleClickCard = () => {
      if (props.mode === 'batch') {
        selected.value = !selected.value;
        context.emit('isSelected', props.media.id);
      } else {
        context.emit('previewMedia', props.media);
      }
    };
    const mode = computed(() => {
      return props.mode;
    });
    watch(mode, (val) => {
      if (val === 'normal') {
        selected.value = false;
      }
    });

    return {
      getFileIconArr,
      ellipsisFormat,
      handleCopyMarkdownLink,
      handleCopyLink,
      handleClickCard,
      selected
    };
  }
});
</script>

<style scoped lang="scss">
.media-preview-card {
  width: 100%;
  height: 100%;
  border-radius: var(--el-border-radius-base);
  font-family: var(--site-font-family);
  overflow: hidden;
  border: 1px solid #ccc;
  color: #888;
  position: relative;
  box-sizing: border-box;

  .card-content-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: none;
  }

  &.selected {
    outline: 2px solid var(--el-color-danger);

    .card-content-mask {
      display: block;
      background-image: linear-gradient(135deg, #ff4d6144 5%, #ff4d6122 75%);
    }
  }

  &.select-mode {
    cursor: pointer;

    .el-checkbox {
      display: block;
    }
  }

  &.box-shadow {
    box-shadow: 3px 2px 4px #ccc;
  }
}

.media-preview-header {
  max-height: 8rem;
  overflow: hidden;
  position: relative;

  .el-image {
    width: 100%;
    height: 100%;
    min-height: 8rem;

    svg {
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      font-size: 3em;
      transform: translate(-50%, -50%);
    }

    .loading-meow {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) scale(0.8);
      background-image: url('../../assets/loading-meow.gif');
      background-position: center center;
    }
  }

  .el-image__inner {
    object-fit: cover;
  }

  .el-checkbox {
    position: absolute;
    left: 12px;
    top: 12px;
    height: 16px;
    width: 16px;
    display: none;

    :deep(.el-inner__input) {
      width: 16px;
      height: 16px;
    }

    :deep(.el-checkbox__inner) {
      width: 16px;
      height: 16px;
    }
  }

  .content-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(86, 86, 86, 0.01);
    z-index: 5;
  }
}

.media-preview-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #ccc;
  font-size: 0.8em;

  > span {
    margin: 12px 8px;
    display: inline-block;
  }

  .media-op {
    margin: auto 4px;
  }
}
</style>
