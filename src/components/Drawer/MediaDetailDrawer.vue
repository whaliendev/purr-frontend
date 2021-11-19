<template>
  <el-drawer
    custom-class="media-detail-drawer"
    :size="drawerWidth"
    :lock-scroll="false"
    :destroy-on-close="true"
    :append-to-body="true"
  >
    <template #title>
      <div class="media-detail-title">媒体详情</div>
      <el-divider class="title-divider" />
    </template>

    <div class="media-detail-body">
      <div class="preview-container">
        <a
          :href="media.url"
          target="_blank"
          class="preview-wrapper"
          title="单击以下载"
        >
          <el-image
            :src="'https://purr.group' + media.url"
            :alt="`cover image of ${media.originalName}`"
            lazy
          >
            <template #error>
              <p class="error-hint">当前文件不支持预览</p>
            </template>
            <template #placeholder>
              <div
                class="loading-meow"
                v-if="
                  media.size > 1024 * 1024 && media.fileCategory === 'image'
                "
              />
            </template>
          </el-image>
        </a>
      </div>

      <el-divider class="structure-divider" />

      <div class="detail-item">
        <div class="detail-item-title media-name-title">
          <span class="detail-title">媒体名： </span>
          <font-awesome-icon
            :icon="['fas', 'pen']"
            title="编辑"
            @click="handleEditMediaTitle"
          />
        </div>
        <div
          class="media-title"
          v-if="!editTitleVisible && mediaTitle === media.originalName"
        >
          {{ media.originalName }}
        </div>
        <div
          class="media-title"
          v-else-if="!editTitleVisible && mediaTitle !== media.originalName"
        >
          {{ mediaTitle }}
        </div>
        <el-input
          v-else
          v-model="mediaTitle"
          size="small"
          type="text"
          minlength="1"
          maxlength="240"
          placeholder="输入文件名以修改"
          @blur="handleEditTitleBlur"
        />
      </div>

      <el-divider class="structure-divider" />

      <div class="detail-item">
        <div class="detail-item-title media-type-title">
          <span class="detail-title">媒体类型： </span>
        </div>
        <div class="media-type">
          {{ media.fileCategory + '/' + media.fileType }}
        </div>
      </div>

      <el-divider class="structure-divider" />

      <div class="detail-item">
        <div class="detail-item-title media-location-title">
          <span class="detail-title">存储位置： </span>
        </div>
        <div class="media-location">
          {{ transformToLocation(media.host) }}
        </div>
      </div>

      <el-divider class="structure-divider" />

      <div class="detail-item">
        <div class="detail-item-title media-size-title">
          <span class="detail-title">媒体大小： </span>
        </div>
        <div class="media-size">
          {{ formatMediaSize(media.size) }}
        </div>
      </div>

      <el-divider class="structure-divider" />

      <div class="detail-item" v-if="media.fileCategory === 'image'">
        <div class="detail-item-title media-dim-title">
          <span class="detail-title">图片尺寸： </span>
        </div>
        <div class="media-dim">
          {{ `${media.imageWidth} × ${media.imageHeight}` }}
        </div>
      </div>

      <el-divider
        class="structure-divider"
        v-if="media.fileCategory === 'image'"
      />

      <div class="detail-item">
        <div class="detail-item-title media-date-title">
          <span class="detail-title">上传日期： </span>
        </div>
        <div class="media-date">
          {{ formatUploadTime(media.createTime) }}
        </div>
      </div>

      <el-divider class="structure-divider" />

      <div class="detail-item">
        <div class="detail-item-title media-link-title">
          <span class="detail-title">普通链接： </span>
          <font-awesome-icon
            :icon="['fas', 'link']"
            @click="handleCopyLink"
            title="复制"
          />
        </div>
        <div class="media-link">
          {{ media.url }}
        </div>
      </div>

      <el-divider class="structure-divider" />

      <div class="detail-item">
        <div class="detail-item-title media-markdown-title">
          <span class="detail-title">Markdown链接： </span>
          <font-awesome-icon
            :icon="['fab', 'markdown']"
            @click="handleCopyMarkdownLink"
            title="复制"
          />
        </div>
        <div class="media-markdown">
          {{
            getMarkdownLink(media.fileCategory, media.originalName, media.url)
          }}
        </div>
      </div>

      <el-divider class="structure-divider" />
    </div>

    <div class="bottom-controls-container">
      <el-button type="danger" size="medium" @click="handleDeleteMedia">
        删除
      </el-button>
    </div>
  </el-drawer>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import { copyTextToClipboard, normalizeNum } from '@/utils/util';
import { datetimeFormat, timeAgo } from '@/utils/datetime';
import { ElMessage } from 'element-plus';

export default defineComponent({
  name: 'MediaDetailDrawer',
  props: {
    media: {
      type: Object,
      required: true
    },
    drawerWidth: {
      type: String,
      required: false,
      default: '24%'
    }
  },
  emits: ['editMediaDetail'],
  setup(props, context) {
    //TODO add video preview support
    const handleDeleteMedia = () => {};
    const mediaTitle = ref(props.media.originalName);
    const editTitleVisible = ref(false);

    watch(
      () => props.media.originalName,
      () => {
        mediaTitle.value = props.media.originalName;
      }
    );

    const transformToLocation = (loc) => {
      if (loc === 0) return '本地';
      else return '不能确定';
    };

    const formatMediaSize = (size) => normalizeNum(size);

    const formatUploadTime = (time) => {
      return timeAgo(datetimeFormat(time), 'YYYY-MM-DD HH:mm');
    };

    const getMarkdownLink = (category, name, url) => {
      if (category === 'image') return `![${name}](${url})`;
      return `[${name}](${url})`;
    };

    const handleCopyLink = () => {
      copyTextToClipboard(props.media.url).then((res) => {
        if (res) {
          ElMessage.success({
            center: true,
            message: '复制链接到剪贴板成功'
          });
        }
      });
    };

    const handleCopyMarkdownLink = () => {
      const copyText = getMarkdownLink(
        props.media.fileCategory,
        props.media.originalName,
        props.media.url
      );
      copyTextToClipboard(copyText).then((res) => {
        if (res) {
          ElMessage.success({
            center: true,
            message: '复制markdown格式链接到剪贴板成功'
          });
        }
      });
    };

    const handleEditMediaTitle = () => {
      editTitleVisible.value = true;
    };
    const handleEditTitleBlur = () => {
      if (mediaTitle.value.trim().length === 0) return;
      editTitleVisible.value = false;
      // TODO add logic to handle media title edited
      context.emits('editMediaDetail', props.media.id, mediaTitle.value);
    };

    return {
      handleDeleteMedia,
      mediaTitle,
      editTitleVisible,
      transformToLocation,
      formatMediaSize,
      formatUploadTime,
      getMarkdownLink,
      handleCopyLink,
      handleCopyMarkdownLink,
      handleEditMediaTitle,
      handleEditTitleBlur
    };
  }
});
</script>

<style lang="scss" scoped>
.title-divider {
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  margin: 16px 0;
  z-index: 5000;
}

.structure-divider {
  margin: 12px 0;
}

.preview-container {
  margin-top: 24px;
  margin-bottom: 24px;

  .preview-wrapper {
    display: block;
  }

  .el-image {
    width: 100%;
    border-radius: var(--el-border-radius-base);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    :deep(.loading-meow) {
      // eslint-disable-next-line
      background-image: url('../../assets/loading-meow.gif');
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
      width: 360px;
      height: 360px;
    }

    :deep(img) {
      object-fit: cover;
    }

    .error-hint {
      font-size: 0.9em;
      color: #ababab;
      margin: 0;
    }
  }
}

.media-detail-body {
  font-family: var(--site-font-family);

  .detail-item {
    .detail-item-title {
      margin-bottom: 8px;

      .detail-title {
        color: #333;
        margin-right: 6px;
        font-size: 0.9em;

        & + svg {
          color: #333333aa;
          font-size: 14px;
          cursor: pointer;
        }
      }

      & + div {
        color: #999;
        word-break: break-all;
        word-spacing: 2px;
      }
    }
  }
}

.bottom-controls-container {
  border-top: var(--el-border-base);
  padding: 8px 16px;
  left: 0;
  bottom: 0;
  position: absolute;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  background-color: var(--el-color-white);
}
</style>
