<template>
  <div id="article-management">
    <base-card style="padding: 20px" class="article-management-wrapper">
      <div class="article-management-header">
        <span class="article-management-title">文章管理</span>
        <div class="controls-container">
          <div class="keyword-control-container">
            <label class="keyword-label">关键词：</label>
            <el-input
              size="small"
              type="text"
              minlength="1"
              maxlength="240"
              v-model="keyword"
              class="keyword-input"
              placeholder="输入关键词以搜索"
            />
          </div>
          <div class="status-select-container">
            <label class="status-label">文章状态：</label>
            <el-select
              v-model="statusFilterList"
              class="article-status-select"
              filterable
              placeholder="请选择文章状态"
              size="small"
              popper-class="article-status-select-popper"
              :popper-append-to-body="true"
            >
              <el-option
                v-for="status in statusMapping"
                :key="status.label"
                :label="status.label"
                :value="status.value"
              />
            </el-select>
          </div>
          <div class="tag-select-container">
            <label class="tag-label">标签：</label>
            <el-select
              v-model="tagsFilterList"
              collapse-tags
              multiple
              filterable
              popper-class="article-tag-select-popper"
              placeholder="输入标签名以过滤"
              size="small"
              :popper-append-to-body="true"
            >
              <el-option
                v-for="tagOption in tagOptions"
                :key="tagOption.id"
                :label="tagOption.name"
                :value="tagOption.id"
              >
                <tag
                  :id="tagOption.id"
                  :name="tagOption.name"
                  :link="false"
                  :color="tagOption.color"
                  :style="'width: 94%; height: 88%;'"
                />
              </el-option>
            </el-select>
          </div>
          <div class="btn-controls-container">
            <el-button type="primary" @click="handleArticleSearch" size="small">
              <font-awesome-icon :icon="['fas', 'search']" /> &nbsp; 查询
            </el-button>
            <el-button @click="handleUndoFilter" size="small">
              <font-awesome-icon :icon="['fas', 'undo-alt']" />&nbsp; 重置
            </el-button>
            <el-button type="primary" @click="handleNewArticle" size="small">
              <font-awesome-icon :icon="['fas', 'plus']" />&nbsp; 写文章
            </el-button>
          </div>
        </div>
      </div>

      <el-divider class="structure-divider" />

      <div class="article-management-body">
        <el-table :data="articlesList" class="article-management-table">
          <el-table-column
            label="序号"
            type="index"
            class-name="index-column"
          />
          <el-table-column
            label="文章"
            min-width="120"
            class-name="article-title-column"
          >
            <template #default="scope">
              <el-image
                alt="article cover"
                fit="cover"
                :src="scope.row.backgroundUrl"
              >
                <template #placeholder>
                  <div class="image-slot loading-text">
                    Loading<span class="dots">···</span>
                  </div>
                </template>
                <template #error>
                  <i class="el-icon-picture-outline"></i>
                </template>
              </el-image>
              <span class="article-title-cell" :title="scope.row.name">
                {{ ellipsisTitleFormat(scope.row.name, 15) }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="状态" class-name="article-status-column">
            <template #default="scope">
              <span class="article-status-container">
                <span
                  class="article-status-indicator"
                  :class="[
                    statusToIndicator(scope.row.deleteTime, scope.row.status)
                  ]"
                >
                </span>
                <span class="article-status-msg">
                  {{ statusToMsg(scope.row.deleteTime, scope.row.status) }}
                </span>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="标签" class-name="article-tag-column">
            <template #default="scope">
              <span class="tags-container" v-if="scope.row.tags.length !== 0">
                <tag
                  :name="tag.name"
                  :id="tag.id"
                  v-for="tag in scope.row.tags"
                  :key="tag.id"
                  :color="tag.color"
                  :link-name="tag.linkName"
                  :deletable="true"
                  @delete-tag="handleDeleteTag($event, scope.row.id)"
                  :style="'padding-top: 0; padding-bottom: 0; border-radius: 6px;'"
                />
              </span>
              <span class="no-tags-hint" v-else> 暂无标签 </span>
            </template>
          </el-table-column>
          <el-table-column label="操作时间" class-name="article-time-column">
            <template #default="scope">
              <span class="article-time-cell">
                {{
                  dateFormat(
                    scope.row.deleteTime,
                    scope.row.updateTime,
                    scope.row.createTime
                  )
                }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="评论"
            class-name="article-commentCount-column"
          >
            <template #default="scope">
              <span class="article-commentCount-cell">
                {{ numFormat(scope.row.commentCount) }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="赞" class-name="article-thumbCount-column">
            <template #default="scope">
              <span class="article-thumbCount-cell">
                {{ numFormat(scope.row.thumbCount) }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="分享" class-name="article-shareCount-column">
            <template #default="scope">
              <span class="article-shareCount-cell">
                {{ numFormat(scope.row.shareCount) }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="浏览" class-name="article-viewCount-column">
            <template #default="scope">
              <span class="article-viewCount-cell">
                {{ numFormat(scope.row.viewCount) }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="操作" class-name="article-operation-column">
            <template #default="scope">
              <font-awesome-icon
                :icon="['fas', 'edit']"
                title="编辑"
                @click="handleEditArticle(scope.row.id)"
              />
              <el-divider class="operation-divider" direction="vertical" />
              <font-awesome-icon
                :icon="['fas', 'trash-alt']"
                title="回收站"
                @click="handleMoveArticleToTrash(scope.row.id)"
              />
              <el-divider class="operation-divider" direction="vertical" />
              <font-awesome-icon
                :icon="['fas', 'cog']"
                title="设置"
                @click="handleArticleSettings(scope.row.id)"
              />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--      end of article management body -->

      <div class="article-management-footer">
        <el-pagination
          background
          layout="->, sizes, prev, pager, next, jumper"
          v-model:current-page="curPage"
          v-model:page-size="fetchNum"
          :default-page-size="10"
          :default-current-page="1"
          :page-sizes="[10, 20, 50]"
          :pager-count="5"
          :total="fetchNum * pageNum"
        ></el-pagination>
      </div>
    </base-card>
  </div>
</template>
<script>
import BaseCard from '@/components/UI/BaseCard';
import Tag from '@/components/Badge/Tag';
import { ref } from 'vue';
import { useStore } from 'vuex';
import { ellipsisFormat, normalizeNum } from '@/utils/util';
import { datetimeFormat, timeAgo } from '@/utils/datetime';
export default {
  components: { BaseCard, Tag },
  setup() {
    const store = useStore();

    // 控件相关功能
    const keyword = ref('');
    const statusFilterList = ref(0);
    const statusMapping = [
      { label: '全部', value: 0 },
      { label: '已发布', value: 1 },
      { label: '草稿', value: 2 },
      { label: '回收站', value: 3 }
    ];
    const tagOptions = ref([]);
    const tagsFilterList = ref([]);
    const handleArticleSearch = () => {
      // TODO add logic to search article
    };
    const handleUndoFilter = () => {
      // TODO add logic to reset filter
    };
    const handleNewArticle = () => {
      // TODO add logic to edit new article
    };

    const curPage = ref(1);
    const fetchNum = ref(10);
    const pageNum = ref(1);
    const articlesList = ref([]);
    const loadingData = ref(false);

    const fetchArticlesByPagination = () => {
      loadingData.value = true;
      store
        .dispatch('articles/getLatestAdminArticles', {
          curPage: curPage.value,
          fetchNum: fetchNum.value
        })
        .then((response) => {
          const data = response.data;
          if (data && data.success) {
            articlesList.value = store.getters['articles/articlesList'];
            pageNum.value = store.getters['articles/pageNum'];
          }
        })
        .catch(() => {
          // TODO
        })
        .finally(() => (loadingData.value = false));
    };

    // lifecycle hook: created
    fetchArticlesByPagination();

    // 展示相关的API
    const ellipsisTitleFormat = (title, length) =>
      ellipsisFormat(title, length);
    const dateFormat = (
      deleteTime,
      updateTime,
      createTime,
      pattern = 'HH:mm, DD MMM, YYYY'
    ) => {
      const datetime = deleteTime
        ? deleteTime
        : updateTime
        ? updateTime
        : createTime;
      return timeAgo(datetimeFormat(datetime), pattern);
    };
    const numFormat = (num) => normalizeNum(num);
    const statusToIndicator = (deleteTime, status) => {
      if (deleteTime !== null) {
        return 'trash';
      }
      if (status === 1) {
        return 'public';
      }
      if (status === 0) {
        return 'draft';
      }
    };
    const statusToMsg = (deleteTime, status) => {
      if (deleteTime !== null) {
        return '回收站';
      }
      if (status === 1) {
        return '公开';
      }
      if (status === 0) {
        return '草稿';
      }
    };
    const handleDeleteTag = (tagId, rowId) => {
      console.log(tagId, rowId);
    };
    const handleEditArticle = (articleId) => {
      // TODO add logic to edit article
      console.log(articleId);
    };
    const handleMoveArticleToTrash = (articleId) => {
      // TODO add logic to move article to trash
      console.log(articleId);
    };
    const handleArticleSettings = (articleId) => {
      // TODO add logic to change article settings
      console.log(articleId);
    };

    return {
      keyword,
      statusFilterList,
      statusMapping,
      tagOptions,
      tagsFilterList,
      handleArticleSearch,
      handleUndoFilter,
      handleNewArticle,
      curPage,
      fetchNum,
      articlesList,
      loadingData,
      ellipsisTitleFormat,
      dateFormat,
      numFormat,
      statusToIndicator,
      statusToMsg,
      handleDeleteTag,
      handleEditArticle,
      handleMoveArticleToTrash,
      handleArticleSettings,
      pageNum,
      fetchArticlesByPagination
    };
  }
};
</script>

<style lang="scss" scoped>
#article-management {
  width: 100%;
  overflow: visible;
}

.article-management-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.article-management-header {
  .article-management-title {
    font-weight: bold;
    font-size: 16px;
  }

  .controls-container {
    margin-top: 12px;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;

    > div {
      display: inline-block;
    }

    .el-input {
      width: max-content;
    }
  }
}

.structure-divider {
  margin: 12px 0 0 0;
}

.el-image {
  width: 40px;
  height: 40px;
  //border: var(--el-border-base);
  border-radius: var(--el-border-radius-base);
  overflow: visible;

  :deep(.el-image__inner) {
    border-radius: var(--el-border-radius-base);
  }
}

:deep(.article-management-table) {
  th .cell {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .cell {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  tbody .index-column {
    .cell {
      width: 16px;
      height: 16px;
      padding: 0;
      margin: auto;
      border-radius: var(--el-border-radius-small);
      background-color: var(--el-color-primary);
      color: var(--el-color-white);
    }
  }

  .article-title-column {
    .cell {
      margin-left: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: flex-start;
    }

    .article-title-cell {
      flex: 1;
    }

    .el-image {
      flex-shrink: 0;
      margin-right: 12px;
    }
  }

  .article-status-column {
    span {
      display: inline-block;
    }

    .article-status-indicator {
      width: 8px;
      height: 8px;
      vertical-align: middle;
      margin-right: 6px;
      border-radius: 50%;
      background-color: var(--el-color-success);

      &.trash {
        background-color: var(--el-color-danger);
      }

      &.draft {
        background-color: var(--el-color-warning);
      }

      &.public {
        background-color: var(--el-color-success);
      }
    }

    .article-status-msg {
      vertical-align: middle;
    }
  }

  .article-tag-column {
    .tags-container {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-flow: row wrap;

      span {
        margin: 4px;
      }
    }
  }

  .article-operation-column {
    svg {
      color: var(--el-color-primary-light-1);
      cursor: pointer;
    }

    .operation-divider {
      margin: 0 8px;
    }
  }
}

.article-management-footer {
  margin-top: 12px;
}
</style>

<style>
.article-status-select-popper,
.article-tag-select-popper {
  top: 162px !important;
}
</style>
