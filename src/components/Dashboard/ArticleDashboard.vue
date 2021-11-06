<template>
  <div id="article-dashboard">
    <base-card style="padding: 20px" class="article-dashboard-wrapper">
      <div class="dashboard-title">
        <span class="article-title">最近文章</span>
        <plain-pagination
          :show-disabled="false"
          :cur-page="curPage"
          @change-page="handlePageChange"
        />
      </div>
      <el-table :data="articlesList" class="article-table">
        <el-table-column label="序号" type="index" class-name="index-column" />
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
            <span class="article-title-cell">
              {{ ellipsisTitleFormat(scope.row.name, 15) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作日期" min-width="128">
          <template #default="scope">
            <span class="date-cell">{{
              dateFormat(scope.row.updateTime)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="评论">
          <template #default="scope">
            <span class="comment-count-cell">
              {{ numFormat(scope.row.commentCount) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="赞">
          <template #default="scope">
            <span class="thumb-count-cell">
              {{ numFormat(scope.row.thumbCount) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="浏览">
          <template #default="scope">
            <span class="view-count-cell">
              {{ numFormat(scope.row.viewCount) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="分享">
          <template #default="scope">
            <span class="share-count-cell">
              {{ numFormat(scope.row.shareCount) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="推荐">
          <template #default="scope">
            <liquid-toggle :on="scope.row.isRecommended === 1" />
          </template>
        </el-table-column>
        <el-table-column label="置顶">
          <template #default="scope">
            <liquid-toggle :on="scope.row.isPinned === 1" />
          </template>
        </el-table-column>
        <el-table-column label="评论">
          <template #default="scope">
            <liquid-toggle :on="scope.row.commentStatus === 1" />
          </template>
        </el-table-column>
      </el-table>
    </base-card>
  </div>
</template>

<script>
import BaseCard from '@/components/UI/BaseCard';
import PlainPagination from '@/components/Pagination/PlainPagination';
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { ellipsisFormat, normalizeNum } from '@/utils/util';
import { datetimeFormat, timeAgo } from '@/utils/datetime';
import LiquidToggle from '@/components/Toggle/LiquidToggle';
export default defineComponent({
  components: { LiquidToggle, PlainPagination, BaseCard },
  setup() {
    const store = useStore();
    const curPage = ref(1);
    const fetchNum = ref(5);
    const articlesList = ref([]);

    const fetchArticlesByPagination = () => {
      store
        .dispatch('articles/getLatestAdminArticles', {
          curPage: curPage.value,
          fetchNum: fetchNum.value
        })
        .then((response) => {
          const data = response.data;
          if (data && data.success) {
            articlesList.value = data.data.data;
          }
        })
        .catch(() => {
          // TODO
        });
    };

    // lifecycle hook: created
    fetchArticlesByPagination();

    const handlePageChange = (offset) => {
      if (curPage.value === 1 && offset < 0) {
        return;
      }

      curPage.value = curPage.value + offset;
      fetchArticlesByPagination();
    };

    const ellipsisTitleFormat = (str, length) => ellipsisFormat(str, length);
    const dateFormat = (datetime, pattern = 'HH:mm, DD MMM, YYYY') =>
      timeAgo(datetimeFormat(datetime), pattern);
    const numFormat = (num) => normalizeNum(num);

    return {
      curPage,
      articlesList,
      handlePageChange,
      ellipsisTitleFormat,
      dateFormat,
      numFormat
    };
  }
});
</script>

<style lang="scss" scoped>
#article-dashboard {
  //max-width: 100%;
  width: 100%;
  overflow: visible;
}

.article-dashboard-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.dashboard-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dashboard-title .article-title {
  font-weight: bold;
  font-size: 16px;
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

:deep(.article-table) {
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
}
</style>
