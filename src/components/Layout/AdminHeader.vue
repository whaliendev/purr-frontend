<template>
  <div class="collapse-button-wrapper hidden-sm-and-up">
    <span class="round-icon-button" @click="expandNav">
      <font-awesome-icon :icon="['fas', 'bars']" />
    </span>
  </div>
  <div class="search-bar-wrapper">
    <search-bar />
  </div>
  <div class="user-profile-wrapper">
    <span class="round-icon-button" @click="openUploadDialog"
      ><font-awesome-icon :icon="['fas', 'plus-circle']"
    /></span>
    <el-badge
      :value="unapprovedCount"
      :max="99"
      type="danger"
      :hidden="isHidden"
    >
      <span
        class="round-icon-button"
        @click="router.push({ name: 'admin-comment' })"
        ><font-awesome-icon :icon="['fas', 'comment-dots']"
      /></span>
    </el-badge>
    <el-divider direction="vertical" />
    <span class="welcome-message hidden-xs-only"> 🌞 早上好呀，Whalien！</span>
    <el-avatar :size="40" :src="avatarUrl" fit="cover">{{
      username
    }}</el-avatar>
  </div>
  <el-dialog
    v-model="uploadDialogVisible"
    title="上传附件"
    width="40%"
    :append-to-body="true"
    :lock-scroll="false"
    custom-class="upload-dialog"
    top="20vh"
    @close="handleUploadMediaDialogClose"
  >
    <el-upload
      ref="mediaUploader"
      id="media-upload"
      drag
      :action="mediaUploadActionUrl"
      :headers="uploadHeaders"
      multiple
      class="media-upload"
      list-type="text"
      :on-error="handleUploadError"
      :before-upload="checkFileSize"
      :on-success="handleUploadedSuccess"
      :on-preview="copyLinkToClipboard"
    >
      <p>点击或拖拽以上传文件</p>
      <template #tip>
        <em class="upload-tip">上传的单个文件最大大小不能超过1024M</em>
        <em class="upload-tip">单击上传完成的文件以复制链接</em>
      </template>
    </el-upload>
  </el-dialog>
</template>

<script>
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  reactive,
  ref
} from 'vue';
import SearchBar from '../SearchBar/SearchBar';
import logger from '../../plugins/logger';
import commentApi from '../../api/comment';
import appConfig from '../../config/config';
import metaApi from '../../api/meta';
import mediaApi from '@/api/media';
import { useStore } from 'vuex';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router';
import { copyTextToClipboard } from '@/utils/util';

export default defineComponent({
  name: 'AdminHeader',
  emits: ['showNav'],
  components: { SearchBar },
  setup(props, { emit }) {
    const store = useStore();
    const router = useRouter();

    const unapprovedCount = ref(0);
    const isHidden = computed(() => {
      return unapprovedCount.value === -1 || unapprovedCount.value === 0;
    });
    const fetchUnapprovedCount = () => {
      commentApi
        .getUnapprovedCommentCount()
        .then((response) => {
          const success = response.data.success;
          if (success) {
            unapprovedCount.value = response.data.data;
          } else {
            unapprovedCount.value = -1;
          }
        })
        .catch((error) => {
          logger.error(error);
          unapprovedCount.value = -1;
        });
    };
    let taskId = setInterval(
      fetchUnapprovedCount,
      appConfig.unapprovedRefetchDuration
    );
    onUnmounted(() => {
      clearInterval(taskId);
    });

    const username = ref('站长');
    const avatarUrl = ref('');
    const fetchUserProfile = () => {
      metaApi.getUserProfile().then((response) => {
        const success = response.data.success;
        if (success) {
          const data = response.data.data;
          username.value = data.username;
          avatarUrl.value = data.qq || data.avatar;
        } else {
          username.value = '站长';
          avatarUrl.value = '';
        }
      });
    };

    onMounted(() => {
      fetchUnapprovedCount();
      fetchUserProfile();
    });

    const expandNav = () => {
      emit('showNav');
    };

    const uploadDialogVisible = ref(false);
    const openUploadDialog = () => {
      uploadDialogVisible.value = true;
    };
    const uploadHeaders = reactive({
      'Access-Token': store.getters.accessToken
    });
    const handleUploadError = (err, file) => {
      ElMessage.error({
        center: true,
        dangerouslyUseHTMLString: true,
        message: `上传文件${file.name}失败, 失败原因：${err.message}`
      });
    };
    const mediaUploader = ref({});
    const handleUploadMediaDialogClose = (done) => {
      if (uploadingFiles.value.length !== 0) {
        ElMessageBox.confirm('当前还有文件正在上传，关闭窗口将会取消文件上传')
          .then(() => {
            uploadingFiles.value.forEach((uploadingFile) => {
              mediaUploader.value.abort(uploadingFile);
            });
            done();
          })
          .catch(() => {});
      }
      mediaUploader.value.clearFiles();
      uploadedSuccessFiles.value = [];
    };
    const checkFileSize = (file) => {
      const isLt1G = file.size / 1024 / 1024 < 1024;
      if (!isLt1G) {
        ElMessage.error({
          center: true,
          message: '上传文件最大大小不能超过1G'
        });
      }
      return isLt1G;
    };
    const uploadedSuccessFiles = ref([]);
    const uploadingFiles = ref([]);
    const handleUploadedSuccess = (response, file, fileList) => {
      uploadedSuccessFiles.value.push(response.data);
      uploadingFiles.value = fileList.filter((file) => file.percentage < 100);
    };
    const copyLinkToClipboard = (file) => {
      console.log(uploadedSuccessFiles.value);
      const uploadedSuccessFile = uploadedSuccessFiles.value.filter(
        (uploadedFile) => uploadedFile.originalName === file.name
      )[0];
      const copyText =
        file.fileCategory === 'image'
          ? `![${uploadedSuccessFile.originalName}](${uploadedSuccessFile.url})`
          : `[${uploadedSuccessFile.originalName}](${uploadedSuccessFile.url})`;
      copyTextToClipboard(copyText).then((res) => {
        if (res) {
          ElMessage.success({
            center: true,
            message: `文件${uploadedSuccessFile.originalName}的Markdown链接已粘贴到剪贴板`
          });
        }
      });
    };

    return {
      expandNav,
      unapprovedCount,
      isHidden,
      username,
      avatarUrl,
      uploadDialogVisible,
      openUploadDialog,
      mediaUploadActionUrl: mediaApi.uploadMediaActionUrl,
      uploadHeaders,
      handleUploadError,
      mediaUploader,
      handleUploadMediaDialogClose,
      router,
      checkFileSize,
      handleUploadedSuccess,
      copyLinkToClipboard
    };
  }
});
</script>

<style lang="scss" scoped>
.search-bar-wrapper,
.user-profile-wrapper {
  display: inline-block;
}

.search-bar-wrapper {
  width: auto;
  flex-grow: 1;
  padding-right: 12px;
}

.user-profile-wrapper {
  width: auto;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-left: auto;
}

.round-icon-button {
  background-color: var(--el-color-white);
  border-radius: var(--el-border-radius-base);
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto 8px;

  svg {
    color: var(--el-color-primary);
    font-size: 20px;
  }

  &:hover svg {
    color: var(--el-color-primary-light-1);
  }
}

.collapse-button-wrapper {
  margin-left: 0;
  margin-right: 16px;

  .round-icon-button {
    margin: 0;
  }
}

.user-profile-wrapper {
  .round-icon-button:nth-of-type(1) {
    margin-left: 12px;
  }

  :deep(.el-badge__content) {
    border-radius: 50%;
    width: 20px;
    height: 20px;
    right: 20px;
    top: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .el-divider--vertical {
    height: 24px;
  }

  .welcome-message {
    font-size: 14px;
    color: var(--light-admin-text-accent-color);
    margin: 8px;
    font-weight: 700;
  }

  .el-avatar--circle {
    margin-left: auto;
    margin-right: 0;
    border-width: 2px solid var(--el-color-white);
  }
}

@media screen and (max-width: 640px) {
  .user-profile-wrapper {
    margin-right: 0;
    margin-left: auto;

    .el-avatar--circle {
      margin-left: 8px;
    }
  }
}
</style>

<style lang="scss">
.upload-dialog {
  .el-dialog__header {
    border-bottom: 1px solid #ccc;
  }

  .el-upload,
  .el-upload-dragger {
    width: 100%;
    height: 100%;
  }

  .el-upload-dragger {
    height: 120px;
    background-color: #efefef;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2em;
    color: #4f4f4f;
  }

  .el-upload-list {
    li {
      font-size: 1.2em;
    }

    .el-icon-close {
      display: none;
    }
  }

  .upload-tip {
    display: block;
    margin-top: 8px;
    margin-left: 8px;
    font-style: normal;
    color: var(--el-color-primary);

    &::before {
      content: '*';
      color: var(--el-color-danger);
    }
  }

  .el-icon-close-tip {
    display: none;
  }
}
</style>
