<template>
  <div class="link-card" @click="handleEditLink">
    <div class="link-background">
      <el-image :src="link.linkName" :alt="`cover image of ${link.name}`" lazy>
        <template #error>
          <el-image :src="defaultPictureUrl"></el-image>
        </template>
      </el-image>
    </div>

    <div class="link-card-body">
      <div class="link-name-wrapper">
        <h4 class="link-name">{{ link.name }}</h4>
        <span
          class="link-badge"
          :style="`background-color: ${categoryToColor()}`"
          >{{ link.category }}</span
        >
      </div>

      <div class="link-url-wrapper" :title="formatUrl(link.linkName)">
        <p>{{ formatUrl(link.linkName) }}</p>
      </div>

      <div class="link-meta-wrapper">
        <span class="visit-count">
          <font-awesome-icon :icon="['far', 'eye']" />
          {{ normalizeNum(link.visitCount) }}
        </span>
        <span class="cite-count">
          <font-awesome-icon :icon="['far', 'share-square']" />
          {{ normalizeNum(link.citeCount) }}
        </span>
        <span class="delete-tag" @click="handleDeleteLink">
          <font-awesome-icon :icon="['fas', 'trash-alt']" title="删除">
          </font-awesome-icon>
          删除
        </span>
      </div>

      <div class="link-description-wrapper">
        <p>{{ link.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { normalizeNum } from '@/utils/util';

export default defineComponent({
  name: 'ListCard',
  props: {
    link: {
      type: Object,
      required: true
    }
  },
  emits: ['editLink', 'deleteLink'],
  setup(props, context) {
    const defaultPictureUrl =
      'https://images.unsplash.com/photo-1637221615119-f43356ae336d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';

    const handleEditLink = () => {
      context.emit('editLink', props.link);
    };
    const handleDeleteLink = () => {
      context.emit('deleteLink', props.link.id);
    };
    const formatUrl = (url) => {
      if (url.startsWith('/')) return 'https://purr.group' + url;
      return url;
    };

    const predefinedColor = [
      '#fe9600',
      '#189AB4',
      '#86dbd4',
      '#f6a9bd',
      '#e7c77b',
      '#05445E',
      '#ff9898'
    ];

    const categoryToColor = () => {
      switch (props.link.category) {
        case '外部链接':
          return predefinedColor[0];
        case '页面':
          return predefinedColor[1];
        case '聚焦':
          return predefinedColor[2];
        case '标签':
          return predefinedColor[3];
        case '文章':
          return predefinedColor[4];
        case '友人链':
          return predefinedColor[5];
        default:
          return predefinedColor[0];
      }
    };

    return {
      defaultPictureUrl,
      predefinedColor,
      handleEditLink,
      handleDeleteLink,
      normalizeNum,
      formatUrl,
      categoryToColor
    };
  }
});
</script>

<style lang="scss" scoped>
.link-card {
  border-radius: var(--el-border-radius-base);
  box-shadow: 0 1px 20px -6px #666666aa;
  overflow: hidden;
  height: 100%;

  .el-image {
    height: 6.5rem;
    width: 100%;

    :deep(img) {
      height: 100%;
      object-fit: cover;
    }
  }

  .link-card-body {
    padding-top: 5px;
    padding-left: 9px;
    padding-right: 9px;
    font-size: 0.84em;
    .link-name-wrapper {
      margin-top: 0;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
      .link-name {
        display: inline-block;
        margin: 0;
        font-size: 1.03em;
        color: #555555;
      }
      .link-badge {
        margin: 0 4px;
        padding: 1px 4px;
        color: white;
        border-radius: var(--el-border-radius-small);
        font-size: 0.84em;
      }
    }

    .link-url-wrapper {
      margin-top: 5px;
      font-size: 0.7em;
      color: #888888;
      p {
        margin: 0;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
    }

    .link-meta-wrapper {
      color: #888888;
      margin: 6px -10px 4px;
      font-size: 0.81em;

      > span {
        margin: 0 8px;
      }
    }

    .link-description-wrapper {
      margin: 15px 0 0 0;
      color: rgba(0, 0, 0, 0.66);
      min-height: 25px;
      font-size: 1.03em;
      p {
        color: #888888;
        margin: 0;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
    }
  }
}
</style>
