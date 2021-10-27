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
    <span class="round-icon-button"
      ><font-awesome-icon :icon="['fas', 'plus-circle']"
    /></span>
    <el-badge
      :value="unapprovedCount"
      :max="99"
      type="danger"
      :hidden="isHidden"
    >
      <span class="round-icon-button"
        ><font-awesome-icon :icon="['fas', 'comment-dots']"
      /></span>
    </el-badge>
    <el-divider direction="vertical" />
    <span class="welcome-message hidden-xs-only"> 🌞 早上好呀，Whalien！</span>
    <el-avatar :size="40" :src="avatarUrl" fit="cover">{{
      username
    }}</el-avatar>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, onUnmounted, ref } from "vue";
import SearchBar from '../SearchBar/SearchBar';
import logger from '../../plugins/logger';
import commentApi from '../../api/comment';
import appConfig from '../../config/config';
import metaApi from '../../api/meta';
export default defineComponent({
  name: 'AdminHeader',
  emits: ['showNav'],
  components: { SearchBar },
  setup(props, { emit }) {
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
    let taskId = setInterval(fetchUnapprovedCount, appConfig.unapprovedRefetchDuration);
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

    return {
      expandNav,
      unapprovedCount,
      isHidden,
      username,
      avatarUrl
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

  &:hover svg{
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
