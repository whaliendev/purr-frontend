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
    <span class="round-icon-button"
      ><font-awesome-icon :icon="['fas', 'comment-dots']"
    /></span>
    <el-divider direction="vertical" />
    <span class="welcome-message hidden-xs-only"> 🌞 早上好呀，Whalien！</span>
    <el-avatar
      :size="40"
      src="https://www.gravatar.com/avatar/d228a2e7267ca35e7c754583ae9b6f36"
      fit="cover"
    ></el-avatar>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import SearchBar from '../SearchBar/SearchBar';
export default defineComponent({
  name: 'AdminHeader',
  emits: ['showNav'],
  components: { SearchBar },
  setup(props, { emit }) {
    const expandNav = () => {
      emit('showNav');
    };

    return {
      expandNav
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
