<template>
  <div class="admin-dashboard-wrapper">
    <div id="admin-dashboard">
      <statistic-dashboard />
      <comment-dashboard />
    </div>
  </div>
</template>

<script>
import StatisticDashboard from '../../../components/Dashboard/StatisticDashboard';
import CommentDashboard from '../../../components/Dashboard/CommentDashboard';
export default {
  components: { StatisticDashboard, CommentDashboard }
};
</script>

<style lang="scss" scoped>
.admin-dashboard-wrapper {
  margin: -12px;
}

#admin-dashboard {
  display: flex;
}

#admin-dashboard div {
  margin: 12px;
}

#comment-dashboard {
  width: 360px;
  height: 492px;
}
</style>
