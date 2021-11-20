<template>
  <div id="article-compose" v-loading="draftSaving">
    <div class="article-compose-header">
      <base-card style="padding: 12px" class="article-controls-wrapper">
        <div class="article-tags-wrapper">
          <span class="compose-title">新文章</span>
          <span
            class="article-status-badge"
            :class="{ posted: articleStatus !== '草稿' }"
            >{{ articleStatus }}</span
          >
          <ul class="article-tags-container">
            <tag
              :id="tag.id"
              :name="tag.name"
              :color="tag.color"
              :link-name="tag.linkName"
              :target="tag.target"
              :deletable="true"
              v-for="tag in articleToPost.tags"
              :key="tag.id"
              @delete-tag="handleDeleteTag"
            ></tag>
          </ul>
          <el-select
            v-if="selectVisible"
            ref="addTagSelect"
            v-model="articleToPost.tags"
            collapse-tags
            multiple
            filterable
            remote
            reserve-keyword
            value-key="id"
            class="add-tag-select"
            placeholder="enter a keyword to filter"
            :remote-method="searchTags"
            :loading="searchingTags"
            @blur="handleSelectBlur"
            size="mini"
            :popper-append-to-body="true"
            popper-class="add-tag-select-popper"
          >
            <el-option
              v-for="tagOption in tagOptions"
              :key="tagOption.id"
              :label="tagOption.name"
              :value="tagOption"
            >
              <tag
                :id="tagOption.id"
                :name="tagOption.name"
                :link="false"
                :color="tagOption.color"
                :style="'height: 90%; width: 100%; '"
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
            @click="handleSaveDraft"
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
      <markdown-editor
        v-model="articleToPost.content"
        @save-draft="handleSaveDraft"
        @preview-image="handlePreviewImage"
      />
    </div>

    <article-settings-drawer
      v-model="showSettingsDrawer"
      :article-to-save="articleToPost"
      @sync-article-settings="handleSyncArticleSettings"
    />
    <new-tag-drawer v-model="newTagDrawerVisible" />
    <media-repo-drawer v-model="mediaRepoVisible" />
  </div>
</template>
<script>
import { computed, defineComponent, nextTick, reactive, ref } from 'vue';
import ReactiveButton from '@/components/Button/ReactiveButton';
import MarkdownEditor from '@/components/Editor/MarkdownEditor';
import BaseCard from '@/components/UI/BaseCard';
import Tag from '@/components/Badge/Tag';
import ArticleSettingsDrawer from '@/components/Drawer/ArticleSettingsDrawer';
import NewTagDrawer from '@/components/Drawer/NewTagDrawer';
import MediaRepoDrawer from '@/components/Drawer/MediaRepoDrawer';
import { debounce } from '@/utils/util';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';

export default defineComponent({
  props: {
    query: {
      validator(val) {
        return (
          typeof val === 'undefined' ||
          (typeof parseInt(val, 10) === 'number' && parseInt(val, 10) > 0)
        );
      },
      required: true
    }
  },
  components: {
    MediaRepoDrawer,
    ArticleSettingsDrawer,
    Tag,
    MarkdownEditor,
    ReactiveButton,
    BaseCard,
    NewTagDrawer
  },
  setup(props) {
    const store = useStore();

    const articleStatus = computed(() => {
      return articleToPost.status === 0 ? '草稿' : '已发布';
    });

    // from backend to front end
    const transformBEArticle = (article) => {
      articleToPost.id = article.id;
      articleToPost.abstract = article.articleAbstract;
      articleToPost.author = article.author;
      articleToPost.backgroundUrl = article.backgroundUrl;
      articleToPost.commentStatus = article.commentStatus;
      articleToPost.content = article.content;
      articleToPost.ccLicense = article.contract;
      articleToPost.attachCopyText = article.copyright; // 是否要附加版权信息,
      articleToPost.copyrightAttachText = article.copyrightInfo;
      // articleToPost.postTime = new Date(
      //   article.updateTime ? article.updateTime : article.createTime
      // );
      articleToPost.originalStatus = article.isOriginal;
      articleToPost.pinnedStatus = article.isPinned;
      articleToPost.recommendedStatus = article.isRecommended;
      articleToPost.linkName = article.linkName;
      articleToPost.title = article.name;
      articleToPost.allowPing = parseInt(article.pingStatus, 10);
      articleToPost.tags = article.tags;
      articleToPost.target = article.target;
      articleToPost.status = article.status;
    };

    // from drawer to editor
    const handleSyncArticleSettings = (articleSettings) => {
      // console.log('articleSettings', articleSettings);
      articleToPost.id = articleSettings.id;
      articleToPost.abstract = articleSettings.abstract;
      articleToPost.author = articleSettings.author;
      articleToPost.backgroundUrl = articleSettings.backgroundUrl;
      articleToPost.commentStatus = articleSettings.commentStatus;
      articleToPost.content = articleSettings.content;
      articleToPost.ccLicense = articleSettings.ccLicense;
      articleToPost.attachCopyText = articleSettings.attachCopyText; // 是否要附加版权信息,
      articleToPost.copyrightAttachText = articleSettings.copyrightAttachText;
      articleToPost.postTime = articleSettings.postTime;
      articleToPost.originalStatus = articleSettings.originalStatus;
      articleToPost.pinnedStatus = articleSettings.pinnedStatus;
      articleToPost.recommendedStatus = articleSettings.recommendedStatus;
      articleToPost.linkName = articleSettings.linkName;
      articleToPost.title = articleSettings.title;
      articleToPost.allowPing = articleSettings.allowPing;
      articleToPost.tags = articleSettings.tags;
      articleToPost.target = articleSettings.target;
      articleToPost.status = articleSettings.status;
    };

    (() => {
      if (typeof props.query !== 'undefined') {
        store
          .dispatch('articles/getAdminArticleDetailsById', {
            id: parseInt(props.query, 10)
          })
          .then((response) => {
            if (response.data && response.data.success) {
              transformBEArticle(response.data.data);
            }
          })
          .catch((err) => {
            ElMessage.error({
              center: true,
              message: `获取文章失败，失败原因可能是${err.message}`
            });
          });
      }
    })();

    const draftSavedErrored = ref(false);
    const draftSaving = ref(false);
    const articleToPost = reactive({
      id: -1,
      title: '',
      content: '',
      author: '',
      linkName: '',
      // postTime: '',
      // 是否开启评论
      commentStatus: 1,
      recommendedStatus: 0,
      pinnedStatus: 0,
      // 是否原创
      originalStatus: 1,
      // 是否需要在复制时自动添加版权信息
      attachCopyText: 1,
      // 选择的CC License
      ccLicense: 1,
      // 当非原创时选择添加的附加信息
      copyrightAttachText: '',
      target: '_blank',
      allowPing: 1,
      tags: [], // 存放id
      abstract: '',
      backgroundUrl: '',
      status: 0
    });

    // 右上角的控件相关功能
    const handleSaveDraft = () => {
      draftSaving.value = true;
      store
        .dispatch('articles/editOrSaveArticleDraft', articleToPost)
        .then((res) => {
          if (res) {
            ElMessage.success({
              center: true,
              message: '保存草稿成功'
            });
            articleToPost.status = 0;
          } else {
            draftSavedErrored.value = true;
            ElMessage.error({
              center: true,
              message: '保存草稿失败'
            });
          }
        })
        .catch((err) => {
          draftSavedErrored.value = true;
          console.log(err);
        })
        .finally(() => {
          draftSaving.value = false;
        });
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
      debounce(() => {
        searchingTags.value = true;
        store
          .dispatch('tags/searchAdminTagsByKeyword', {
            keyword: keyword
          })
          .then((response) => {
            if (response.data && response.data.success) {
              tagOptions.value = response.data.data;
            }
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            searchingTags.value = false;
          });
      }, 1000);
    };
    const showSelect = async () => {
      selectVisible.value = true;
      await nextTick(() => {
        addTagSelect.value.input.focus();
      });
    };
    const handleSelectBlur = () => {
      // TODO fix select lose focus
      // if (articleToPost.tags.length === 0) return;
      // selectVisible.value = false;
    };
    const handleDeleteTag = (id) => {
      console.log(id);
      articleToPost.tags = articleToPost.tags.filter((tag) => tag.id !== id);
    };

    // 文章内的图片预览
    const handlePreviewImage = () => {};

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
      mediaRepoVisible,
      handleDeleteTag,
      handlePreviewImage,
      handleSyncArticleSettings,
      articleStatus
    };
  }
});
</script>

<style lang="scss" scoped>
#article-compose {
  width: 100%;
  height: 100%;
}

.article-status-badge {
  display: inline-block;
  font-size: 0.8em;
  margin: 4px 2px 4px 8px;
  padding: 2px 12px 4px;
  color: var(--el-color-white);
  background-color: var(--el-color-danger);
  border-radius: var(--el-border-radius-small);

  &.posted {
    background-color: var(--el-color-success);
  }
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

<style>
.add-tag-select-popper {
  top: 118px !important;
}
</style>
