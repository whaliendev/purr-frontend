<template>
  <div class="commit-dashboard">
    <base-card style="padding: 20px" class="commit-dashboard-wrapper">
      <div class="dashboard-title">
        <span class="commit-title">最近活动</span>
        <plain-pagination
          :show-disabled="false"
          :cur-page="curPage"
          @change-page="handlePageChange"
        />
      </div>
    </base-card>
  </div>
</template>

<script>
import BaseCard from '@/components/UI/BaseCard';
import PlainPagination from '@/components/Pagination/PlainPagination';
import { defineComponent, ref } from 'vue';
// import { useStore } from 'vuex';
export default defineComponent({
  components: { PlainPagination, BaseCard },
  setup() {
    // const store = useStore();
    const curPage = ref(1);
    // const fetchNum = ref(30);
    const contributionsList = ref([]);

    const fetchContributionsByPagination = () => {};
    fetchContributionsByPagination();

    return {
      curPage,
      contributionsList
    };
  }
});
</script>

<style lang="scss" scoped>
#comment-dashboard {
  width: 100%;
  height: 100%;
  overflow: visible;
}
</style>
