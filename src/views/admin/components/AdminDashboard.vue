<template>
  <div class="admin-dashboard-wrapper">
    <div id="admin-dashboard">
      <div class="row first-row">
        <div class="col first-col"><statistic-dashboard /></div>
        <div class="col second-col"><comment-dashboard /></div>
      </div>
      <div class="row second-row">
        <div class="col first-col"><article-dashboard /></div>
        <div class="col second-col"><commit-dashboard /></div>
      </div>
    </div>
  </div>
</template>

<script>
import StatisticDashboard from '../../../components/Dashboard/StatisticDashboard';
import CommentDashboard from '../../../components/Dashboard/CommentDashboard';
import ArticleDashboard from '@/components/Dashboard/ArticleDashboard';
import CommitDashboard from '../../../components/Dashboard/CommitDashboard';
export default {
  components: {
    ArticleDashboard,
    StatisticDashboard,
    CommentDashboard,
    CommitDashboard
  }
};
</script>

<style lang="scss" scoped>
#admin-dashboard{
  width: 100%;
}

.row {
  display: flex;
  width: 100%;
}

.first-col {
  width: max-content;
  flex-grow: 1;
  flex-shrink: 1;
  padding-right: 12px;
}

.second-col {
  width: 348px;
  flex-shrink: 0;
  padding-left: 12px;
}

.second-row {
  margin-top: 24px;
}
</style>
