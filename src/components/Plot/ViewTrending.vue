<template>
  <v-chart class="view-trending" :option="options" />
</template>

<script>
import { use } from 'echarts/core';
import { SVGRenderer } from 'echarts/renderers';
import { BarChart, LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, defineComponent, computed } from 'vue';
import logger from '../../plugins/logger';
import { normalizeNum } from '../../utils/util';

use([
  SVGRenderer,
  BarChart,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
]);

export default defineComponent({
  name: 'ViewTrendingPlot',
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  components: {
    VChart
  },
  provide: {
    [THEME_KEY]: 'light'
  },
  setup(props) {
    const purrColorPrimary = getComputedStyle(
      document.documentElement
    ).getPropertyValue('--el-color-primary');
    // const purrColorDanger = getComputedStyle(
    //   document.documentElement
    // ).getPropertyValue('--el-color-danger');
    const purrLightAdminTextColor = getComputedStyle(
      document.documentElement
    ).getPropertyValue('--light-admin-text-color');
    const data = computed(() => {
      logger.debug(props.data);
      return props.data;
    });
    const options = ref({
      animationDuration: 1500,
      title: {
        text: '近七天阅读量趋势图',
        left: 'left',
        textStyle: {
          fontSize: 16
        }
      },
      // tooltip: {
      //   trigger: 'axis'
      // },
      xAxis: {
        type: 'category',
        name: '日期（天）',
        nameLocation: 'center',
        nameGap: 42,
        data: (function () {
          let results = [];
          for (let i = 6; i >= 0; i--) {
            let date = new Date();
            date.setDate(date.getDate() - i);
            const [, month, day] = date.toLocaleDateString('zh-cn').split('/');
            results.push(month + '-' + day);
          }
          return results;
        })(),
        axisTick: {
          alignWithLabel: true
        }
      },
      yAxis: {
        name: '浏览量',
        nameLocation: 'center',
        nameGap: 56,
        axisLabel: {
          formatter: (value) => {
            return normalizeNum(value, false);
          }
        }
      },
      series: [
        {
          type: 'line',
          name: '浏览数',
          data: data,
          label: {
            show: true,
            color: purrLightAdminTextColor
          }
        },
        {
          type: 'bar',
          name: '浏览数',
          data: data,
          itemStyle: {
            color: purrColorPrimary
          },
          tooltip: {
            show: false
          }
        }
      ]
    });

    return {
      options
    };
  }
});
</script>

<style lang="scss" scoped>
.view-trending {
  width: 840px;
}
</style>
