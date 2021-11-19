<template>
  <div class="tag-card">
    <el-image :src="tag.backgroundUrl">
      <template #error>
        <el-image :src="defaultPictureUrl"></el-image>
      </template>
    </el-image>

    <div class="tag-info">
      <div class="tag-name-wrapper">
        <h4 class="tag-name">{{ tag.name }}</h4>
        <span class="tag-operation-container">
          <font-awesome-icon
            :icon="['fas', 'times']"
            title="删除"
            @click="handleDeleteTag()"
          >
          </font-awesome-icon>
        </span>
      </div>

      <div class="tag-meta-wrapper">
        <span class="visit-count">
          <font-awesome-icon :icon="['far', 'eye']" />
          {{ normalizeNum(tag.visitCount) }}
        </span>
        <span class="cite-count">
          <font-awesome-icon :icon="['far', 'share-square']" />
          {{ normalizeNum(tag.citeCount) }}
        </span>
        <span>
          <font-awesome-icon
            :icon="['fas', 'edit']"
            title="编辑"
            @click="handleEditTag()"
          >
          </font-awesome-icon>
          编辑
        </span>
      </div>

      <div class="tag-description-wrapper">
        <p>{{ tag.description }}</p>
      </div>

      <div
        class="tag-color-wrapper"
        :style="`background-image: linear-gradient(135deg, ${tag.color} 15%, ${
          tag.color + '99'
        } 75%)`"
      ></div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';
import { normalizeNum } from '@/utils/util';

export default defineComponent({
  name: 'TagCard',
  props: {
    tag: {
      type: Object,
      required: true
    }
  },
  emits: ['editTag', 'deleteTag'],
  setup(props, context) {
    const defaultPictureUrl =
      'https://images.unsplash.com/photo-1637073698184-975f104eae11?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1171&q=80';
    const handleEditTag = () => {
      console.log(props.tag.id);
      context.emit('editTag', props.tag);
    };
    const handleDeleteTag = () => {
      context.emit('deleteTag', props.tag.id);
    };
    return {
      defaultPictureUrl,
      handleEditTag,
      handleDeleteTag,
      normalizeNum
    };
  }
});
</script>
<style lang="scss" scoped>
.tag-card {
  border-radius: var(--el-border-radius-base);
  box-shadow: 0 1px 20px -6px #666666aa;
  overflow: hidden;
  height: 100%;
  display: flex;
  //flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding-right: 5px;

  .el-image {
    width: 150px;
    height: 130px;
    border-radius: var(--el-border-radius-base);
    flex-shrink: 0;
    margin-right: 12px;
  }

  .tag-info {
    width: 100%;
    font-size: 0.84em;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-right: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    .tag-name-wrapper {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-between;
      margin-top: 5px;
      .tag-name {
        display: inline-block;
        margin: 0;
        font-size: 1.03em;
        color: #555555;
      }

      .tag-operation-container {
        svg {
          color: #888888;
          cursor: pointer;
          margin: 0 5px;
        }
      }
    }

    .tag-meta-wrapper {
      color: #888888;
      margin: 4px -12px 4px;
      font-size: 0.9em;

      > span {
        margin: 0 10px;
      }
    }

    .tag-description-wrapper {
      margin: 4px 0 0 0;
      color: rgba(0, 0, 0, 0.66);
      min-height: 58px;

      p {
        color: #888888;
        margin: 0;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
    }

    .tag-color-wrapper {
      height: 8px;
      width: 100%;
      border-radius: var(--el-border-radius-base);
      overflow: hidden;
      margin-top: 3px;
      margin-right: 4px;
    }
  }
}
</style>
