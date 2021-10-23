<template>
  <div id="comment-dashboard">
    <base-card style="padding: 20px">
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
export default defineComponent({
  name: 'CommentDashboard',
  components: {
    'comment-item': DashboardCommentItem
  },
  setup() {
    const store = useStore();
    const curPage = ref(1);
    const fetchNum = ref(5);
    const commentsList = ref([]);
    (() => {
      store
        .dispatch('comments/getLatestComments', {
          curPage: curPage.value,
          fetchNum: fetchNum.value
        })
        .then((response) => {
          const data = response.data;
          if (data && data.sucess) {
            commentsList.value = data.data;
          }
        })
        .catch(() => {
          // TODO
        });
    })();

    return {
      commentsList
    };
  }
});
</script>

<style lang="scss" scoped></style>
