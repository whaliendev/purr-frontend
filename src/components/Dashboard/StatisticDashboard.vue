<!--suppress JSValidateTypes -->
<template>
  <div id="statistic-dashboard">
    <div class="widgets-container-wrapper">
      <div class="widgets-container">
        <statistic-widget :item-count="statistics.viewCount" item-name="浏览量">
          <template #icon>
            <font-awesome-icon :icon="['fas', 'eye']" />
          </template>
        </statistic-widget>
        <statistic-widget
          :item-count="statistics.articleCount"
          item-name="文章数"
        >
          <template #icon>
            <font-awesome-icon :icon="['fas', 'file-alt']" />
          </template>
        </statistic-widget>
        <statistic-widget
          :item-count="statistics.thumbCount"
          item-name="点赞数"
        >
          <template #icon>
            <font-awesome-icon :icon="['fas', 'heart']" />
          </template>
        </statistic-widget>
        <statistic-widget
          :item-count="statistics.commentCount"
          item-name="评论数"
        >
          <template #icon>
            <font-awesome-icon :icon="['fas', 'comment-dots']" />
          </template>
        </statistic-widget>
      </div>
    </div>
    <div class="view-trending-plot">
      <base-card>
        <view-trending-plot :data="statistics.latestViewCount" />
      </base-card>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import statisticApi from '../../api/statistic';
import logger from '../../plugins/logger';
import appConfig from '../../config/config';
import StatisticWidget from '../Widget/StatisticWidget';
import { normalizeNum } from '../../utils/util';
import ViewTrendingPlot from '../Plot/ViewTrending';
import BaseCard from '../UI/BaseCard';

export default defineComponent({
  name: 'StatisticDashboard',
  components: { BaseCard, ViewTrendingPlot, StatisticWidget },
  setup() {
    const statistics = reactive({
      commentCount: '',
      articleCount: '',
      viewCount: '',
      thumbCount: '',
      latestViewCount: []
    });
    const fetchStatisticData = () => {
      statisticApi.getSummary().then((response) => {
        logger.info(response);
        const success = response.data.success;
        if (success) {
          const data = response.data.data;
          statistics.commentCount = normalizeNum(data.commentCount);
          statistics.articleCount = normalizeNum(data.articleCount);
          statistics.viewCount = normalizeNum(data.viewCount);
          statistics.thumbCount = normalizeNum(data.thumbCount);
          statistics.latestViewCount = data.latestViewCount;
        } else {
          statistics.commentCount = '---';
          statistics.articleCount = '---';
          statistics.viewCount = '---';
          statistics.thumbCount = '---';
          statistics.latestViewCount = null;
        }
      });
    };

    // lifecycle hooks
    fetchStatisticData();
    setTimeout(fetchStatisticData, appConfig.statisticRefetchDuration);

    return {
      statistics
    };
  }
});
</script>

<style lang="scss" scoped>
.widgets-container-wrapper {
  margin: -12px;
  max-width: max-content;
}

.widgets-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

:deep(.base-card:nth-of-type(1) .icon) {
  color: var(--el-color-success);
  background-color: var(--el-color-success-light);
}

:deep(.base-card:nth-of-type(2) .icon) {
  color: var(--el-color-warning);
  background-color: var(--el-color-warning-light);
}

:deep(.base-card:nth-of-type(3) .icon) {
  color: var(--el-color-danger);
  background-color: var(--el-color-danger-light);
}

:deep(.base-card:nth-of-type(4) .icon) {
  color: var(--el-color-primary);
  background-color: var(--el-color-primary-light-5);
}

.view-trending-plot {
  margin-top: 24px;

  .base-card {
    width: max-content;
    height: 400px;
    padding: 20px;
  }
}
</style>
