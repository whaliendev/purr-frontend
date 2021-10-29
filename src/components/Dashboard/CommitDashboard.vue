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
      <commit-heatmap
        :end-date="endDate"
        :max="contributionsMax"
        :values="contributionsList"
        :vertical="true"
      />
    </base-card>
  </div>
</template>

<script>
import BaseCard from '@/components/UI/BaseCard';
import PlainPagination from '@/components/Pagination/PlainPagination';
import { defineComponent, ref } from 'vue';
import CommitHeatmap from '@/components/Plot/CommitHeatmap';
import { useStore } from 'vuex';
export default defineComponent({
  components: { CommitHeatmap, PlainPagination, BaseCard },
  setup() {
    const store = useStore();
    const curPage = ref(1);
    const fetchNum = 100;
    const dateDelta = 90;
    const contributionsList = ref([]);
    const contributionsMax = 10;
    const endDate = ref(new Date());
    const beginDate = ref(new Date());

    const formatDate = (date) => {
      if (!(date instanceof Date))
        throw new Error('date must be an instance of Date');
      return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    };

    const fetchContributionsByPagination = () => {
      if (
        !(beginDate.value instanceof Date) ||
        !(endDate.value instanceof Date)
      ) {
        throw new Error('beginDate or endDate must be an instance of Date');
      }

      if (curPage.value > 1) return;
      endDate.value.setDate(
        new Date().getDate() - dateDelta * (1 - curPage.value)
      );
      beginDate.value.setDate(endDate.value.getDate() - fetchNum);
      store
        .dispatch('statistics/getArticleCommits', {
          beginDate: formatDate(beginDate.value),
          endDate: formatDate(endDate.value)
        })
        .then(() => {
          contributionsList.value =
            store.getters['statistics/commitStatistics'];
        })
        .catch(() => {
          // TODO
        });
    };

    fetchContributionsByPagination();

    const handlePageChange = (offset) => {
      if ((curPage.value === 1 && offset < 0) || curPage.value !== 1) {
        curPage.value = curPage.value + offset;
        fetchContributionsByPagination();
      }
    };

    return {
      curPage,
      contributionsMax,
      contributionsList,
      endDate,
      handlePageChange
    };
  }
});
</script>

<style lang="scss" scoped>
.commit-dashboard {
  width: 100%;
  height: 100%;
  max-height: 457px;
  overflow: visible;
}

.dashboard-title {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .article-title {
    font-weight: bold;
    font-size: 16px;
  }
}

.commit-dashboard-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
