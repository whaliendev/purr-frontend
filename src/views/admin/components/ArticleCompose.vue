<template>
  <div id="article-compose">
    <div class="article-compose-header">
      <base-card style="padding: 12px" class="article-controls-wrapper">
        <div class="article-tags-wrapper">
          <span class="compose-title">新文章</span>
          <ul class="article-tags-container">
            <tag
              :name="tag.name"
              :color="tag.color"
              :link-name="tag.linkName"
              :target="tag.target"
              :deletable="true"
              v-for="tag in articleToPost.tags"
              :key="tag.id"
            ></tag>
          </ul>
          <el-select
            v-if="selectVisible"
            ref="addTagSelect"
            v-model="tagsList"
            collapse-tags
            multiple
            filterable
            remote
            reserve-keyword
            class="add-tag-select"
            placeholder="enter a keyword to filter"
            :remote-method="searchTags"
            :loading="searchingTags"
            @blur="handleSelectBlur"
            size="mini"
          >
            <el-option
              v-for="tagOption in tagOptions"
              :key="tagOption.id"
              :label="tagOption.name"
              :value="tagOption"
            >
              <tag
                :name="tagOption.name"
                :link="false"
                :color="tagOption.color"
              />
            </el-option>
          </el-select>
          <el-button
            v-else
            class="button-new-tag"
            size="mini"
            @click="showSelect"
            >+ add existed tag</el-button
          >
        </div>
        <div class="controls-container">
          <reactive-button
            :errored="draftSavedErrored"
            :loading="draftSaving"
            errored-text="保存失败"
            loaded-text="保存成功"
            text="保存草稿"
            @callback="draftSavedErrored = false"
            @click="handleSaveDraft(false)"
            size="small"
          ></reactive-button>
          <el-button size="small">预览</el-button>
          <el-button size="small" @click="handlePostArticle">发布</el-button>
          <el-button size="small" @click="openMediaRepoDrawer"
            >媒体库</el-button
          >
          <el-button size="small" @click="handleCreateNewTag">新标签</el-button>
        </div>
      </base-card>
      <base-card style="padding: 12px" class="article-meta-info">
        <el-input
          type="text"
          v-model="articleToPost.title"
          class="article-title"
          minlength="1"
          maxlength="60"
          placeholder="请输入文章标题"
          size="small"
          :show-word-limit="true"
        />
        <el-input
          class="article-author"
          type="text"
          v-model="articleToPost.author"
          minlength="1"
          maxlength="40"
          placeholder="请输入文章阅读页面显示的作者名"
          size="small"
          :show-word-limit="true"
        />
      </base-card>
    </div>
    <div class="purr-editor">
      <markdown-editor :content="articleToPost.content" />
    </div>

    <article-settings-drawer v-model="showSettingsDrawer" />
    <new-tag-drawer v-model="newTagDrawerVisible" />
    <media-repo-drawer v-model="mediaRepoVisible" />
  </div>
</template>
<script>
import { defineComponent, nextTick, reactive, ref } from 'vue';
import ReactiveButton from '@/components/Button/ReactiveButton';
import MarkdownEditor from '@/components/Editor/MarkdownEditor';
import BaseCard from '@/components/UI/BaseCard';
import Tag from '@/components/Badge/Tag';
import ArticleSettingsDrawer from '@/components/Drawer/ArticleSettingsDrawer';
import NewTagDrawer from '@/components/Drawer/NewTagDrawer';
import MediaRepoDrawer from '@/components/Drawer/MediaRepoDrawer';
export default defineComponent({
  components: {
    MediaRepoDrawer,
    ArticleSettingsDrawer,
    Tag,
    MarkdownEditor,
    ReactiveButton,
    BaseCard,
    NewTagDrawer
  },
  setup() {
    const draftSavedErrored = ref(false);
    const draftSaving = ref(false);
    const articleToPost = reactive({
      id: -1,
      title: '',
      content: '',
      author: '',
      tags: []
    });

    // 右上角的控件相关功能
    const handleSaveDraft = (draftOnly = false) => {
      console.log('draftOnly', draftOnly);
      //TODO
    };

    const showSettingsDrawer = ref(false);
    const handlePostArticle = () => {
      showSettingsDrawer.value = true;
      // TODO check the validity of settings and post article
    };

    const mediaRepoVisible = ref(false);
    const openMediaRepoDrawer = () => {
      mediaRepoVisible.value = true;
    };

    const newTagDrawerVisible = ref(false);
    const handleCreateNewTag = () => {
      newTagDrawerVisible.value = true;
    };

    // 添加tag的待选tag集合
    const tagOptions = ref([]);
    // 用来显示el-select的loading状态
    const searchingTags = ref(false);
    // 控制el-select和el-input的显示与否
    const selectVisible = ref(false);
    // el-select对象
    const addTagSelect = ref({});
    const searchTags = (keyword) => {
      console.log(keyword);
    };
    const showSelect = async () => {
      selectVisible.value = true;
      await nextTick(() => {
        addTagSelect.value.input.focus();
      });
    };
    const handleSelectBlur = () => {
      selectVisible.value = false;
    };

    return {
      draftSavedErrored,
      draftSaving,
      handleSaveDraft,
      articleToPost,
      searchTags,
      searchingTags,
      tagOptions,
      selectVisible,
      addTagSelect,
      showSelect,
      handleSelectBlur,
      showSettingsDrawer,
      handlePostArticle,
      newTagDrawerVisible,
      handleCreateNewTag,
      openMediaRepoDrawer,
      mediaRepoVisible
    };
  }
});
</script>

<style lang="scss" scoped>
#article-compose {
  width: 100%;
  height: 100%;
}

.article-tags-container {
  display: inline-block;
  padding: 0;
  margin: 0 0 0 12px;
}

.article-controls-wrapper {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-between;
}

.article-meta-info {
  display: flex;
  flex-direction: column;
  margin: 12px 0 12px 0;
  align-items: flex-start;

  .article-author {
    margin-top: 8px;
  }
}
</style>
