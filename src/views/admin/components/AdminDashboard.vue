<template>
  <div id="admin-dashboard">
    <statistic-dashboard />
    <comment-dashboard />
  </div>
</template>

<script>
import StatisticDashboard from '../../../components/Dashboard/StatisticDashboard';
import CommentDashboard from '../../../components/Dashboard/CommentDashboard';
export default {
  components: { StatisticDashboard, CommentDashboard }
};
</script>

<style lang="scss" scoped></style>
