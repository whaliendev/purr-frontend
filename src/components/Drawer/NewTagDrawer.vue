<template>
  <el-drawer
    custom-class="new-tag-drawer"
    :size="drawerWidth"
    :before-close="handleClose"
    :lock-scroll="false"
    :destroy-on-close="true"
    :append-to-body="true"
  >
    <template #title>
      <div class="new-tag-title">新建标签</div>
      <el-divider class="title-divider" />
    </template>

    <div class="settings-item">
      <label class="settings-item-label required">标签名称</label>
      <el-input
        placeholder="请输入标签的名称，如小说·悬疑"
        v-model="tagToSave.name"
        size="medium"
        type="text"
        minlength="1"
        maxlength="60"
        :show-word-limit="true"
      ></el-input>
    </div>

    <div class="settings-item">
      <label class="settings-item-label required">标签短链名</label>
      <el-input
        placeholder="标签的短链名称，如小说标签: 输入 novel-suspense"
        v-model="tagToSave.linkName"
        size="medium"
        type="text"
        minlength="1"
        maxlength="128"
        :show-word-limit="true"
      ></el-input>
      <small class="hint">https://purr.group/tags/novel-suspense</small>
    </div>

    <div class="settings-item">
      <label class="settings-item-label">描述</label>
      <el-input
        placeholder="请输入对该标签的描述"
        v-model="tagToSave.description"
        size="medium"
        type="textarea"
        :rows="5"
      ></el-input>
    </div>

    <div class="settings-item">
      <div class="select-cover-settings">
        <label class="settings-item-label">标签背景图</label>
        <div class="cover-controls">
          <el-button class="btn-remove-cover" size="small" @click="removeCover"
            >移除</el-button
          >
          <el-button
            class="btn-show-gallery"
            size="small"
            @click="openGalleryDrawer"
            >从图库选择</el-button
          >
        </div>
      </div>
      <el-upload
        id="cover-upload"
        drag
        action=""
        :headers="uploadHeaders"
        :multiple="false"
        accept="image/*"
        :on-success="onUploadSuccessfully"
        v-if="!coverVisible"
      >
        <el-icon :size="64" class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          Drop file here or <em>click to upload</em>
        </div>
      </el-upload>
      <el-image
        v-else
        alt="cover preview"
        fit="cover"
        :src="tagToSave.backgroundUrl"
      />
      <el-input
        class="cover-url-input"
        placeholder="手动上传封面图，从图库选择或输入外部链接"
        v-model="tagToSave.backgroundUrl"
        size="medium"
        type="text"
        @blur="showCoverPreview"
      ></el-input>
    </div>

    <div class="settings-item">
      <label class="settings-item-label">标签颜色</label>
      <div class="color-picker-wrapper">
        <div class="color-picker-container" id="tag-color-picker-container">
          <input
            type="radio"
            v-for="color in predefinedColors"
            :key="color"
            :value="color"
            :style="`background-color: ${color}`"
            name="tag-color-cell"
            class="color-picker-radio"
            v-model="tagToSave.color"
          />
          <el-color-picker
            v-model="customColor"
            @change="syncTagColor"
            class="color-picker-radio"
            :predefine="customPredefinedColors"
          />
        </div>
      </div>
    </div>

    <div class="bottom-controls-container">
      <reactive-button
        text="保存标签"
        type="primary"
        size="medium"
      ></reactive-button>
    </div>
  </el-drawer>
</template>

<script>
import { defineComponent, reactive, ref, toRef, watch } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import UploadFilled from '@/components/Icon/UploadFilled';
import logger from '@/plugins/logger';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'NewTagDrawer',
  components: { UploadFilled },
  props: {
    drawerWidth: {
      type: String,
      required: false,
      default: '24%'
    }
  },
  setup() {
    const store = useStore();

    const handleClose = (done) => {
      ElMessageBox.confirm('你确定退出当前设置页吗？', '小提示', {
        confirmButtonText: '确认并保存',
        cancelButtonText: '取消'
      })
        .then(() => {
          // TODO save current settings to localStorage
          done();
        })
        .catch(() => {
          logger.info('user cancelled close new-tag-drawer');
        });
    };

    const predefinedColors = [
      '#fe9600',
      '#f4e0e1',
      '#86dbd4',
      '#f6a9bd',
      '#fee4a7',
      '#d8d9ff',
      '#ff9898'
    ];
    const tagToSave = reactive({
      name: '',
      linkName: '',
      description: '',
      backgroundUrl: '',
      color: '#fe9600'
    });

    // cover相关的API
    const coverVisible = ref(tagToSave.backgroundUrl !== '');
    const uploadHeaders = reactive({
      'Access-Key': store.getters.accessToken
    });
    const showCoverPreview = () => {
      coverVisible.value = true;
    };
    const closeCoverPreview = () => {
      coverVisible.value = false;
    };
    const removeCover = () => {
      tagToSave.backgroundUrl = '';
      closeCoverPreview();
    };
    const openGalleryDrawer = () => {};
    const onUploadSuccessfully = () => {
      ElMessage.success({
        center: true,
        message: '上传成功',
        duration: 1000
      });
      showCoverPreview();
    };

    // tag color相关
    const customColor = ref('');
    const customPredefinedColors = predefinedColors.concat([
      '#FFAEBC',
      '#A0E7E5',
      '#B4F8C8',
      '#FBE7C6',
      '#F9F1F0',
      '#F79489',
      '#189AB4',
      '#05445E',
      '#75E6DA',
      '#D4F1F4',
      '#E7F2F8',
      '#74BDCB',
      '#FFA384'
    ]);
    const syncTagColor = (curColor) => {
      if (curColor) tagToSave.color = curColor;
    };
    const reactiveTagColor = toRef(tagToSave, 'color');
    watch(reactiveTagColor, (newColor) => {
      if (predefinedColors.includes(newColor)) {
        customColor.value = '';
      } else {
        customColor.value = newColor;
      }
    });

    return {
      handleClose,
      tagToSave,
      uploadHeaders,
      removeCover,
      openGalleryDrawer,
      onUploadSuccessfully,
      coverVisible,
      showCoverPreview,
      customColor,
      syncTagColor,
      predefinedColors,
      customPredefinedColors
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

// start of settings item
.settings-item {
  color: var(--light-admin-text-color);
  margin: 8px 0;

  .settings-item-label {
    font-size: 15px;
    margin: 4px 0 6px 4px;
    display: inline-block;
  }

  .settings-item-label.required::after {
    content: '*';
    margin-left: 4px;
    color: var(--el-color-danger);
  }

  .hint {
    display: inline-block;
    margin-top: 4px;
    margin-left: 4px;
  }

  .hint::before {
    content: '💡';
  }

  .color-picker-wrapper {
    margin: 0 -4px;
  }

  .color-picker-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-flow: row wrap;

    @supports (-webkit-appearance: none) or (-moz-appearance: none) {
      input[type='checkbox'],
      input[type='radio'] {
        -webkit-appearance: none;
        -moz-appearance: none;
      }

      .color-picker-radio {
        margin: 4px 8px;
        width: 32px;
        height: 32px;
        border-radius: var(--el-border-radius-base);

        &:checked {
          outline: #66666688 solid 1px;
          transform: scale(1.08);
        }
      }
    }

    :deep(.el-color-picker) {
      margin: 4px 8px;
      .el-color-picker__color {
        border-color: #66666688;
        border-radius: var(--el-border-radius-base);
      }

      .el-color-picker__color-inner {
        border-radius: var(--el-border-radius-base);
        width: 28px;
        height: 28px;
      }
    }
  }

  .select-cover-settings {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
  }

  .status-radio-group,
  .el-radio-group {
    padding-left: 4px;

    :deep(.el-radio__input) {
      .el-radio__inner {
        width: 16px;
        height: 16px;
      }

      .el-radio__inner::after {
        width: 6px;
        height: 6px;
      }
    }

    :deep(.el-radio__input.is-checked) {
      .el-radio__inner {
        background-color: var(--el-color-white);
      }

      .el-radio__inner::after {
        background-color: var(--el-color-primary);
      }
    }
  }

  :deep(.el-upload) {
    width: 100%;
    height: 225px;

    .el-upload-dragger {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  }

  :deep(.el-image) {
    width: 100%;
    overflow: visible;
    box-shadow: var(--el-box-shadow-base);

    img {
      width: 100%;
      height: 225px;
      border-radius: var(--el-border-radius-base);
    }

    .el-image__error {
      width: 100%;
      height: 225px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  :deep(.cover-url-input) {
    margin-top: 6px;
  }
}
// end of settings item

.new-tag-title {
  color: var(--light-admin-text-accent-color);
}

.settings-divider {
  margin: 16px 0;
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
