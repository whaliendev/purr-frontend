<template>
  <div id="moment-management">
    <base-card style="padding: 20px" class="moment-management-wrapper">
      <div class="moment-management-header">
        <span class="moment-management-title">动态管理</span>
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

          <div class="btn-controls-container">
            <el-button type="primary" @click="handleMomentSearch" size="small">
              <font-awesome-icon :icon="['fas', 'search']" /> &nbsp; 查询 &nbsp;
            </el-button>
            <el-button @click="handleUndoFilter" size="small">
              <font-awesome-icon :icon="['fas', 'undo-alt']" />&nbsp; 重置
              &nbsp;
            </el-button>
          </div>
        </div>
      </div>

      <el-divider class="structure-divider" />

      <div class="moment-management-body">
        <el-table
          :data="momentsList"
          class="moment-management-table"
          v-loading="loadingData"
        >
          <el-table-column
            label="序号"
            type="index"
            class-name="index-column"
          />

          <el-table-column
            label="动态内容"
            min-width="120"
            class-name="moment-content-column"
          >
            <template #default="scope">
              <el-popover
                placement="right-end"
                :width="360"
                trigger="hover"
                popper-class="moment-popover"
              >
                <template #reference>
                  <span class="moment-content-cell">
                    {{ ellipsisTitleFormat(scope.row.content, 30) }}
                  </span>
                </template>
                <div
                  class="moment-content-wrapper"
                  :style="`background-image: linear-gradient(135deg, ${
                    scope.row.backgroundColor
                  } 15%, ${scope.row.backgroundColor + '99'} 75%)`"
                >
                  <div class="content-body">
                    <el-scrollbar max-height="370px">
                      <div
                        class="moment-content-container"
                        v-html="momentHtml(scope.row.content)"
                      ></div>
                    </el-scrollbar>
                  </div>
                </div>
              </el-popover>
            </template>
          </el-table-column>

          <el-table-column label="状态" class-name="moment-status-column">
            <template #default="scope">
              <span class="moment-status-container">
                <span
                  class="moment-status-indicator"
                  :class="[statusToIndicator(scope.row.visible)]"
                >
                </span>
                <span class="moment-status-msg">
                  {{ statusToMsg(scope.row.visible) }}
                </span>
              </span>
            </template>
          </el-table-column>

          <el-table-column label="作者" class-name="moment-annotation-column">
            <template #default="scope">
              <span class="moment-annotation-cell">
                {{ ellipsisTitleFormat(scope.row.annotation, 15) }}
              </span>
            </template>
          </el-table-column>

          <el-table-column label="操作时间" class-name="moment-time-column">
            <template #default="scope">
              <span class="moment-time-cell">
                {{ dateFormat(scope.row.updateTime, scope.row.createTime) }}
              </span>
            </template>
          </el-table-column>

          <el-table-column label="赞" class-name="moment-thumbCount-column">
            <template #default="scope">
              <span class="moment-thumbCount-cell">
                {{ numFormat(scope.row.thumbCount) }}
              </span>
            </template>
          </el-table-column>

          <el-table-column label="操作" class-name="moment-operation-column">
            <template #default="scope">
              <font-awesome-icon
                :icon="['fas', 'edit']"
                title="编辑"
                @click="handleEditMoment(scope.row.id)"
              />
              <el-divider class="operation-divider" direction="vertical" />
              <font-awesome-icon
                :icon="['fas', 'trash-alt']"
                title="回收站"
                @click="handleMoveMomentToTrash(scope.row.id)"
              />
              <el-divider class="operation-divider" direction="vertical" />
              <font-awesome-icon
                :icon="['fas', 'cog']"
                title="设置"
                @click="handleMomentSettings(scope.row.id)"
              />
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="moment-management-footer">
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
import { ref } from 'vue';
import BaseCard from '@/components/UI/BaseCard';
import { useStore } from 'vuex';
import { ellipsisFormat, normalizeNum } from '@/utils/util';
import VueMarkdownEditor, { xss } from '@kangc/v-md-editor';
import { datetimeFormat, timeAgo } from '@/utils/datetime';

export default {
  components: { BaseCard },
  setup() {
    const store = useStore();

    const keyword = ref('');
    const curPage = ref(1);
    const fetchNum = ref(10);
    const pageNum = ref(1);

    const momentsList = ref([]);
    const loadingData = ref(false);

    const visible = ref(true);

    const handleMomentSearch = () => {};

    const handleUndoFilter = () => {};

    const handleEditMoment = (momentId) => {
      console.log(momentId);
    };

    const handleMomentSettings = (momentId) => {
      console.log(momentId);
    };

    const handleMoveMomentToTrash = (momentId) => {
      console.log(momentId);
    };

    const momentHtml = (content) => {
      return xss.process(
        VueMarkdownEditor.vMdParser.themeConfig.markdownParser.render(content)
      );
    };

    const fetchMomentsByPagination = () => {
      loadingData.value = true;
      store
        .dispatch('moments/getLatestAdminMoments', {
          curPage: curPage.value,
          fetchNum: fetchNum.value
        })
        .then((response) => {
          const data = response.data;
          if (data && data.success) {
            momentsList.value = store.getters['moments/momentsList'];
            pageNum.value = store.getters['moments/pageParams'].pageNum;
          }
        })
        .catch(() => {})
        .finally(() => (loadingData.value = false));
    };

    fetchMomentsByPagination();

    const ellipsisTitleFormat = (title, length) =>
      ellipsisFormat(title, length);

    const dateFormat = (
      updateTime,
      createTime,
      pattern = 'HH:mm, DD MMM, YYYY'
    ) => {
      const datetime = updateTime ? updateTime : createTime;
      return timeAgo(datetimeFormat(datetime), pattern);
    };

    const numFormat = (num) => normalizeNum(num);

    const statusToIndicator = (visible) => {
      if (visible === 1) {
        console.log('visible');
        return 'public';
      }
      if (visible === 0) {
        return 'private';
      }
    };

    const statusToMsg = (visible) => {
      if (visible === 1) {
        return '公开';
      }
      if (visible === 0) {
        return '私人';
      }
    };

    return {
      keyword,
      curPage,
      fetchNum,
      pageNum,
      momentsList,
      loadingData,
      visible,
      momentHtml,
      handleMomentSearch,
      handleUndoFilter,
      fetchMomentsByPagination,
      ellipsisTitleFormat,
      dateFormat,
      numFormat,
      statusToIndicator,
      statusToMsg,
      handleEditMoment,
      handleMoveMomentToTrash,
      handleMomentSettings
    };
  }
};
</script>

<style lang="scss" scoped>
#moment-management {
  width: 100%;
  overflow: visible;
}

.moment-management-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.structure-divider {
  margin: 12px 0 0 0;
}

.moment-management-header {
  .moment-management-title {
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

:deep(.moment-management-table) {
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

  .moment-content-column {
    .cell {
      margin-left: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: flex-start;
    }

    .moment-description-cell {
      flex: 1;
    }
  }

  .moment-status-column {
    //.cell{
    //  margin-left: 12px;
    //  display: flex;
    //  flex-wrap: wrap;
    //  justify-content: flex-start;
    //  align-items: flex-start;
    //}

    span {
      display: inline-block;
    }

    .moment-status-indicator {
      width: 8px;
      height: 8px;
      vertical-align: middle;
      margin-right: 6px;
      border-radius: 50%;
      background-color: var(--el-color-success);

      &.public {
        background-color: var(--el-color-success);
      }

      &.private {
        background-color: var(--el-color-warning);
      }
    }

    .moment-status-msg {
      vertical-align: middle;
    }
  }

  .moment-operation-column {
    svg {
      color: var(--el-color-primary-light-1);
      cursor: pointer;
    }

    .operation-divider {
      margin: 0 8px;
    }
  }
}

.moment-management-footer {
  margin-top: 12px;
}
</style>

<style lang="scss">
.moment-popover.el-popper {
  padding: 0;
  overflow: hidden;
  font-size: 1.03em;
  box-shadow: 0 1px 20px -6px #666666aa;
  border-radius: var(--el-border-radius-base);
  color: white;

  img {
    margin: 8px auto;
    max-width: 100%;
    border-radius: var(--el-border-radius-base);
  }

  .moment-content-wrapper {
    width: 100%;
    height: 100%;
    .content-body{
      padding: 8px 5px 23px 15px;
      border-radius: var(--el-border-radius-base);

      .el-scrollbar{
        border-radius: var(--el-border-radius-base);
      }

      .moment-content-container {
        //border-radius: var(--el-border-radius-base);
        overflow: hidden;
        padding-right: 10px;
      }
    }
  }
}
</style>
