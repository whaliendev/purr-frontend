<template>
  <div id="article-dashboard">
    <base-card style="padding: 20px" class="article-dashboard-wrapper">
      <div class="dashboard-title">
        <span class="article-title">最近文章</span>
        <plain-pagination
          :show-disabled="false"
          :cur-page="curPage"
          @change-page="handleChangePage"
        />
      </div>
      <el-table> </el-table>
    </base-card>
  </div>
</template>

<script>
import BaseCard from '@/components/UI/BaseCard';
import PlainPagination from '@/components/Pagination/PlainPagination';
import { defineComponent, ref } from 'vue';
import useStore from 'vuex/dist/vuex.mjs';
export default defineComponent({
  components: { PlainPagination, BaseCard },
  setup() {
    const store = useStore();
    const curPage = ref(1);
    const fetchNum = ref(5);
    const articlesList = ref([]);

    const fetchArticlesByPagination = () => {
      store
        .dispatch('articles/getLatestArticles', {
          curPage: curPage.value,
          fetchNum: fetchNum.value
        })
        .then((response) => {
          const data = response.data;
          if (data && data.success) {
            articlesList.value = data.data;
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

    return {
      curPage,
      handlePageChange
    };
  }
});
</script>

<style lang="scss" scoped>
#article-dashboard {
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
</style>
