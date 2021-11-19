<template>
  <div id="admin-media">
    <base-card style="padding: 20px" class="media-admin-header">
      <span class="media-admin-title">媒体库</span>
      <div class="controls-wrapper">
        <div class="controls-container">
          <div class="keyword-control-container">
            <label class="keyword-label">关键词：</label>
            <el-input
              size="small"
              type="text"
              minlength="1"
              maxlength="240"
              v-model="mediaFilter.keyword"
              class="keyword-input"
              placeholder="输入关键词以搜索"
            />
          </div>
          <div class="location-control-container">
            <label class="location-label">存储位置：</label>
            <el-select
              v-model="mediaFilter.locationList"
              class="media-status-select"
              filterable
              placeholder="请选择存储位置"
              size="small"
              multiple
              popper-class="media-select-popper"
              :popper-append-to-body="true"
            >
              <el-option
                v-for="location in locationMapping"
                :key="location.label"
                :label="location.label"
                :value="location.value"
              />
            </el-select>
          </div>
          <div class="category-control-container">
            <label class="category-label">文件类型：</label>
            <el-select
              v-model="mediaFilter.categoriesList"
              class="media-category-select"
              filterable
              placeholder="请选择文件类型"
              size="small"
              multiple
              popper-class="media-select-popper"
              :popper-append-to-body="true"
            >
              <el-option
                v-for="category in categoryMapping"
                :key="category.label"
                :label="category.label"
                :value="category.value"
              />
            </el-select>
          </div>
          <div class="status-control-container">
            <label class="status-label">文件状态：</label>
            <el-select
              v-model="mediaFilter.status"
              class="media-status-select"
              filterable
              placeholder="请选择文件状态"
              size="small"
              popper-class="media-select-popper"
              :popper-append-to-body="true"
            >
              <el-option
                v-for="status in statusMapping"
                :key="status.label"
                :label="status.label"
                :value="status.value"
              />
            </el-select>
          </div>

          <div class="btn-controls-container">
            <el-button type="primary" @click="handleMediaSearch" size="small">
              <font-awesome-icon :icon="['fas', 'search']" /> &nbsp; 查询
            </el-button>
            <el-button
              @click="handleResetFilter"
              size="small"
              v-if="mediaPreviewMode === 'normal'"
            >
              <font-awesome-icon :icon="['fas', 'undo-alt']" />&nbsp; 重置/刷新
            </el-button>
            <el-button
              @click="handleDeleteBatch"
              size="small"
              type="danger"
              v-else
            >
              <font-awesome-icon :icon="['fas', 'trash-alt']" />&nbsp; 删除选中
            </el-button>
            <el-button
              type="primary"
              @click="handleBatchOperation"
              size="small"
              v-if="mediaPreviewMode === 'normal'"
            >
              <font-awesome-icon :icon="['fas', 'object-group']" />&nbsp;
              批量操作
            </el-button>
            <el-button @click="handleCancelDeleteBatch" size="small" v-else>
              <font-awesome-icon :icon="['fas', 'times']" />&nbsp; 取消操作
            </el-button>
          </div>
        </div>
      </div>
    </base-card>
    <base-card style="padding: 20px" class="media-admin-body">
      <div class="media-admin-content">
        <el-row :gutter="24" v-loading="loadingData">
          <el-col
            v-for="media in mediaList"
            :key="media.id"
            :lg="4"
            :md="12"
            :sm="24"
          >
            <media-preview-card
              :media="media"
              :mode="mediaPreviewMode"
              @preview-media="handlePreviewMedia"
              @is-selected="handleIsSelected"
          /></el-col>
        </el-row>
      </div>
      <div class="media-admin-footer">
        <el-pagination
          background
          layout="->, sizes, prev, pager, next, jumper"
          v-model:current-page="curPage"
          v-model:page-size="fetchNum"
          :default-page-size="24"
          :page-sizes="[18, 36, 54, 72, 90]"
          :default-current-page="1"
          :pager-count="5"
          :page-count="pageNum"
        ></el-pagination>
      </div>
    </base-card>

    <media-detail-drawer
      v-model="mediaDetailDrawerVisible"
      :media="previewMedia"
    ></media-detail-drawer>
  </div>
</template>

<script>
import {
  defineComponent,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  watch
} from 'vue';
import BaseCard from '@/components/UI/BaseCard';
import MediaPreviewCard from '@/components/Card/MediaPreviewCard';
import { useStore } from 'vuex';
import MediaDetailDrawer from '@/components/Drawer/MediaDetailDrawer';

export default defineComponent({
  components: { MediaDetailDrawer, MediaPreviewCard, BaseCard },
  setup() {
    const store = useStore();

    const locationMapping = [
      { label: '全部', value: -1 },
      { label: '服务器', value: 0 }
    ];
    let categoryMapping = [];
    const statusMapping = [
      { label: '全部', value: -1 },
      { label: '回收站', value: 0 },
      { label: '未删除', value: 1 }
    ];

    // filter相关变量
    const mediaFilter = reactive({
      keyword: '',
      locationList: [-1],
      categoriesList: [],
      status: -1
    });

    // header里的控制按钮
    const mediaPreviewMode = ref('normal');
    const mediaBatchOpList = ref([]);
    const handleMediaSearch = () => {
      resetPageParams();
      fetchMediaByPagination(true);
    };
    const handleResetFilter = () => {
      mediaFilter.keyword = '';
      mediaFilter.locationList = [-1];
      mediaFilter.categoriesList = [];
      mediaFilter.status = -1;
      resetPageParams();
      fetchMediaByPagination(true);
    };
    const handleBatchOperation = () => {
      mediaPreviewMode.value = 'batch';
      mediaBatchOpList.value = [];
    };
    const handleDeleteBatch = () => {
      // TODO add api for batch delete
      fetchMediaByPagination(true);
    };
    const handleCancelDeleteBatch = () => {
      mediaPreviewMode.value = 'normal';
    };
    const handleIsSelected = (e) => {
      if (mediaBatchOpList.value.indexOf(e) !== -1) {
        mediaBatchOpList.value = mediaBatchOpList.value.filter(
          (id) => id !== e
        );
      } else {
        mediaBatchOpList.value.push(e);
      }
    };

    // 获取数据API
    const curPage = ref(1);
    const fetchNum = ref(18);
    const pageNum = ref(1);
    const mediaList = ref([]);
    const loadingData = ref(false);
    const resetPageParams = () => {
      curPage.value = 1;
      fetchNum.value = 18;
      pageNum.value = 1;
    };
    const fetchMediaByPagination = (force = false) => {
      const adminPageParams = store.getters['medias/adminPageParams'];
      if (
        !force &&
        adminPageParams.curPage === curPage.value &&
        adminPageParams.pageNum === pageNum.value &&
        adminPageParams.pageSize === fetchNum.value &&
        (store.getters['medias/adminMediaListTimestamp'] - Date.now()) / 1000 <=
          30
      ) {
        mediaList.value = store.getters['medias/adminMediaList'];
        const localPageParams = store.getters['medias/adminPageParams'];
        curPage.value = localPageParams.curPage;
        fetchNum.value = localPageParams.pageSize;
        pageNum.value = localPageParams.pageNum;
      } else {
        loadingData.value = true;
        store
          .dispatch('medias/getAdminMediasByPaginationWithCondition', {
            status: mediaFilter.status,
            categories: mediaFilter.categoriesList,
            locations: mediaFilter.locationList,
            curPage: curPage.value,
            pageSize: fetchNum.value
          })
          .then((response) => {
            if (response.data && response.data.success) {
              const localMediaList = store.getters['medias/adminMediaList'];
              if (mediaFilter.keyword !== '') {
                mediaList.value = localMediaList.filter(
                  (media) =>
                    media.originalName.indexOf(mediaFilter.keyword) !== -1
                );
              } else {
                mediaList.value = localMediaList;
              }
              const localPageParams = store.getters['medias/adminPageParams'];
              curPage.value = localPageParams.curPage;
              fetchNum.value = localPageParams.pageSize;
              pageNum.value = localPageParams.pageNum;
            }
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            loadingData.value = false;
          });
      }
    };
    watch([curPage, fetchNum], () => {
      fetchMediaByPagination();
    });

    const refreshMediaCategories = () => {
      if (
        (store.getters['medias/adminCategoriesTimestamp'] - Date.now()) / 1000 >
          300 ||
        store.getters['medias/adminCategories'].length === 0
      ) {
        store.dispatch('medias/getAdminAllCategories').then((response) => {
          if (response.data && response.data.success) {
            categoryMapping = store.getters['medias/adminCategories'];
          }
        });
      } else {
        categoryMapping = store.getters['medias/adminCategories'];
      }
    };

    (() => {
      refreshMediaCategories();
      fetchMediaByPagination();
    })();

    let categoryInterval = -1;
    onMounted(() => {
      categoryInterval = setInterval(refreshMediaCategories, 360);
    });
    onUnmounted(() => {
      clearInterval(categoryInterval);
    });

    // 预览媒体详情相关
    const mediaDetailDrawerVisible = ref(false);
    const previewMedia = ref({});
    const handlePreviewMedia = (e) => {
      mediaDetailDrawerVisible.value = true;
      previewMedia.value = e;
    };

    return {
      statusMapping,
      locationMapping,
      mediaFilter,
      categoryMapping,
      handleMediaSearch,
      handleResetFilter,
      handleBatchOperation,
      curPage,
      fetchNum,
      pageNum,
      mediaList,
      loadingData,
      mediaPreviewMode,
      handlePreviewMedia,
      handleDeleteBatch,
      handleCancelDeleteBatch,
      handleIsSelected,
      mediaDetailDrawerVisible,
      previewMedia
    };
  }
});
</script>

<style lang="scss" scoped>
.media-admin-header {
  .media-admin-title {
    font-weight: bold;
    font-size: 16px;
  }

  .controls-wrapper {
    margin-left: -8px;
    margin-right: -8px;
  }

  .controls-container {
    margin-top: 12px;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;

    > div {
      display: inline-block;
      margin: 8px;
    }

    .el-input {
      width: max-content;
    }
  }
}

.media-admin-body {
  margin-top: 24px;
  .media-admin-footer {
    margin-top: 12px;
  }

  .el-col {
    margin-top: 12px;
    margin-bottom: 12px;
  }
}
</style>
