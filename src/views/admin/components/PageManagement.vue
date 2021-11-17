<template>
  <div id="page-management">
    <base-card style="padding: 20px" class="page-management-wrapper">
      <div class="page-management-header">
        <span class="page-management-title">页面管理</span>
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
          <div class="tag-select-container">
            <label class="tag-label">标签：</label>
            <el-select
              v-model="tagsFilterList"
              collapse-tags
              multiple
              filterable
              popper-class="page-tag-select-popper"
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
                  :style="'width: 94%; height: 88%'"
                />
              </el-option>
            </el-select>
          </div>
          <div class="btn-controls-container">
            <el-button type="primary" @click="handlePageSearch" size="small">
              <font-awesome-icon :icon="['fas', 'search']" /> &nbsp; 查询 &nbsp;
            </el-button>
            <el-button @click="handleUndoFilter" size="small">
              <font-awesome-icon :icon="['fas', 'undo-alt']" /> &nbsp; 重置
              &nbsp;
            </el-button>
            <el-button type="primary" @click="handleNewPage" size="small">
              <font-awesome-icon :icon="['fas', 'plus']" /> &nbsp; 添加页面
              &nbsp;
            </el-button>
          </div>
        </div>
      </div>

      <el-divider class="structure-divider" />

      <div class="page-management-body">
        <el-table
          :data="pageList"
          class="page-management-table"
          v-loading="loadingData"
        >
          <el-table-column
            label="序号"
            type="index"
            class-name="index-column"
          />
          <el-table-column
            label="页面"
            min-width="120"
            class-name="page-title-column"
          >
            <template #default="scope">
              <el-image
                alt="page cover"
                fit="cover"
                :src="scope.row.backgroundUrl"
              >
                <template #placeholder>
                  <div class="image-slot loading=text">
                    Loading<span class="dots">...</span>
                  </div>
                </template>

                <template #error>
                  <i class="el-icon-picture-outline"></i>
                </template>
              </el-image>

              <span class="page-title-cell" :title="scope.row.name">
                {{ ellipsisTitleFormat(scope.row.name, 15) }}
              </span>
            </template>
          </el-table-column>

          <el-table-column label="描述" class-name="page-description-column">
            <template #default="scope">
              <span
                class="page-description-cell"
                :title="scope.row.description"
              >
                {{ ellipsisTitleFormat(scope.row.description, 20) }}
              </span>
            </template>
          </el-table-column>

          <el-table-column label="状态" class-name="page-status-column">
            <template #default="scope">
              <span class="page-status-container">
                <span
                  class="page-status-indicator"
                  :class="[
                    statusToIndicator(scope.row.deleteTime, scope.row.status)
                  ]"
                >
                </span>
                <span class="page-status-msg">
                  {{ statusToMsg(scope.row.deleteTime, scope.row.status) }}
                </span>
              </span>
            </template>
          </el-table-column>

          <el-table-column label="操作时间" class-name="page-time-column">
            <template #default="scope">
              <span class="page-time-cell">
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

          <el-table-column label="评论" class-name="page-commentCount-column">
            <template #default="scope">
              <span class="page-commentCount-cell">
                {{ numFormat(scope.row.commentCount) }}
              </span>
            </template>
          </el-table-column>

          <el-table-column label="赞" class-name="page-thumbCount-column">
            <template #default="scope">
              <span class="page-thumbCount-cell">
                {{ numFormat(scope.row.thumbCount) }}
              </span>
            </template>
          </el-table-column>

          <el-table-column label="分享" class-name="page-shareCount-column">
            <template #default="scope">
              <span class="page-shareCount-cell">
                {{ numFormat(scope.row.shareCount) }}
              </span>
            </template>
          </el-table-column>

          <el-table-column label="浏览" class-name="page-viewCount-column">
            <template #default="scope">
              <span class="page-viewCount-cell">
                {{ numFormat(scope.row.viewCount) }}
              </span>
            </template>
          </el-table-column>

          <el-table-column label="操作" class-name="page-operation-column">
            <template #default="scope">
              <font-awesome-icon
                :icon="['fas', 'edit']"
                title="编辑"
                @click="handleEditPage(scope.row.id)"
              />
              <el-divider class="operation-divider" direction="vertical" />
              <font-awesome-icon
                :icon="['fas', 'trash-alt']"
                title="回收站"
                @click="handleMovePageToTrash(scope.row.id)"
              />
              <el-divider class="operation-divider" direction="vertical" />
              <font-awesome-icon
                :icon="['fas', 'cog']"
                title="设置"
                @click="handlePageSettings(scope.row.id)"
              />
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="page-management-footer">
        <el-pagination
          background
          layout="->, sizes, prev, pager, next, jumper"
          v-model:current-page="curPage"
          v-model:page-size="fetchNum"
          :default-page-size="10"
          :default-current-page="1"
          :pager-count="5"
          :page-count="pageNum"
        ></el-pagination>
      </div>
    </base-card>
  </div>
</template>
<script>
import BaseCard from '@/components/UI/BaseCard';
import { useStore } from 'vuex';
import { ref } from 'vue';
import { ellipsisFormat, normalizeNum } from '@/utils/util';
import { datetimeFormat, timeAgo } from '@/utils/datetime';
export default {
  components: { BaseCard },
  setup() {
    const store = useStore();

    const keyword = ref('');
    const statusFilterList = ref(0);

    const tagOptions = ref([]);
    const tagsFilterList = ref([]);

    const curPage = ref(1);
    const fetchNum = ref(10);
    const pageNum = ref(1);

    const pageList = ref([]);
    const loadingData = ref(false);

    const handlePageSearch = () => {};

    const handleUndoFilter = () => {};

    const handleNewPage = () => {};

    const handleEditPage = (pageId) => {
      console.log(pageId);
    };

    const handleMovePageToTrash = (pageId) => {
      console.log(pageId);
    };

    const handlePageSettings = (pageId) => {
      console.log(pageId);
    };

    const fetchPagesByPagination = () => {
      loadingData.value = true;
      store
        .dispatch('pages/getLatestAdminPages', {
          curPage: curPage.value,
          fetchNum: fetchNum.value
        })
        .then((response) => {
          const data = response.data;
          if (data && data.success) {
            pageList.value = store.getters['pages/pagesList'];
            pageNum.value = store.getters['pages/pageParams'].pageNum;
          }
        })
        .catch(() => {})
        .finally(() => (loadingData.value = false));
    };

    fetchPagesByPagination();

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

    return {
      keyword,
      statusFilterList,
      tagOptions,
      tagsFilterList,
      curPage,
      fetchNum,
      pageNum,
      pageList,
      loadingData,
      handlePageSearch,
      handleUndoFilter,
      handleNewPage,
      fetchPagesByPagination,
      ellipsisTitleFormat,
      dateFormat,
      numFormat,
      statusToIndicator,
      statusToMsg,
      handleEditPage,
      handleMovePageToTrash,
      handlePageSettings
    };
  }
};
</script>
<style lang="scss" scoped>
#page-management {
  width: 100%;
  overflow: visible;
}

.page-management-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.page-management-header {
  .page-management-title {
    font-weight: bold;
    font-size: 16px;
  }

  .controls-container {
    margin-top: 12px;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
  }

  > div {
    display: inline-block;
  }

  .el-input {
    width: max-content;
  }
}

.structure-divider {
  margin: 12px 0 0 0;
}

.el-image {
  width: 40px;
  height: 40px;
  border-radius: var(--el-border-radius-base);
  overflow: visible;

  :deep(.el-image__inner) {
    border-radius: var(--el-border-radius-base);
  }
}

:deep(.page-management-table) {
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

  .page-title-column {
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

  .page-description-column {
    .cell {
      margin-left: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: flex-start;
    }
    .page-description-cell {
      flex: 1;
    }
  }

  .page-status-column {
    span {
      display: inline-block;
    }

    .page-status-indicator {
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

    .page-status-msg {
      vertical-align: middle;
    }
  }

  .page-operation-column {
    svg {
      color: var(--el-color-primary-light-1);
      cursor: pointer;
    }

    .operation-divider {
      margin: 0 8px;
    }
  }
}

.page-management-footer {
  margin-top: 12px;
}
</style>
