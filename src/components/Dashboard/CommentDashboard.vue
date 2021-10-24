<template>
  <div id="comment-dashboard">
    <base-card style="padding: 20px" class="comment-dashboard-wrapper">
      <div class="dashboard-title">
        <span class="comment-title">最近评论</span>
        <plain-pagination
          :show-disabled="false"
          :cur-page="curPage"
          @change-page="handleChangePage"
        />
      </div>
      <ul class="comment-container">
        <comment-item
          v-for="commentItem in commentsList"
          :comment-item="commentItem"
          :key="commentItem.id"
        ></comment-item>
      </ul>
    </base-card>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import DashboardCommentItem from '@/components/ListItem/DashboardCommentItem';
import PlainPagination from '../Pagination/PlainPagination';
export default defineComponent({
  name: 'CommentDashboard',
  components: {
    PlainPagination,
    'comment-item': DashboardCommentItem
  },
  setup() {
    const store = useStore();
    const curPage = ref(1);
    const fetchNum = ref(5);
    const commentsList = ref([]);
    const fetchCommentsByPagination = () => {
      store
        .dispatch('comments/getLatestComments', {
          curPage: curPage.value,
          fetchNum: fetchNum.value
        })
        .then((response) => {
          const data = response.data;
          if (data && data.success) {
            commentsList.value = data.data;
          }
        })
        .catch(() => {
          // TODO
        });
    };

    // lifecycle hook created
    fetchCommentsByPagination();

    const handleChangePage = (offset) => {
      if (curPage.value === 1 && offset < 0) {
        return;
      }
      curPage.value = curPage.value + offset;
      fetchCommentsByPagination();
    };

    return {
      commentsList,
      curPage,
      handleChangePage
    };
  }
});
</script>

<style lang="scss" scoped>
.comment-dashboard-wrapper {
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

.dashboard-title .comment-title {
  font-weight: bold;
  font-size: 16px;
}

.comment-container {
  padding: 0;
  margin: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>
