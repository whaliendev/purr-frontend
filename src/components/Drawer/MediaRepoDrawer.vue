<template>
  <el-drawer
    custom-class="media-repo-drawer"
    :size="drawerWidth"
    :lock-scroll="false"
    :destroy-on-close="true"
    :append-to-body="true"
  >
    <template #title>
      <div class="media-repo-title">媒体库</div>
      <el-divider class="title-divider" />
    </template>

    <div class="searchbar-container">
      <el-input
        v-model="mediaFilter.keyword"
        placeholder="输入以搜索"
        class="media-searchbar"
        size="small"
      >
        <template #append>
          <el-button type="primary" size="small" @click="handleSearch">
            <el-icon :size="16">
              <search></search>
            </el-icon>
          </el-button>
        </template>
      </el-input>
    </div>

    <el-divider class="structure-divider" />

    <div class="media-repo-body">
      <div class="media-repo-content" v-loading="loadingData">
        <el-row :gutter="12">
          <el-col
            :lg="12"
            :sm="12"
            :md="12"
            v-for="media in mediaList"
            :key="media.id"
          >
            <media-preview-card
              :media="media"
              mode="normal"
              :title-length="20"
              :box-shadow="false"
              @preview-media="handlePreviewMedia"
            />
          </el-col>
        </el-row>
      </div>

      <div class="media-repo-footer">
        <el-pagination
          background
          layout="->, sizes, prev, pager, next"
          v-model:current-page="curPage"
          v-model:page-size="fetchNum"
          :default-page-size="8"
          :page-sizes="[8, 16, 24, 32, 40]"
          :default-current-page="1"
          :pager-count="5"
          :page-count="pageNum"
        ></el-pagination>
      </div>
    </div>

    <div class="bottom-controls-container">
      <el-button type="primary" size="medium" @click="handleUploadMedia">
        上传文件
      </el-button>
    </div>
  </el-drawer>
</template>

<script>
import { defineComponent, reactive, ref, watch } from 'vue';
import Search from '../Icon/Search';
import { useStore } from 'vuex';
import MediaPreviewCard from '@/components/Card/MediaPreviewCard';

export default defineComponent({
  name: 'MediaRepoDrawer',
  props: {
    categories: {
      type: Array,
      required: false,
      default() {
        return [];
      }
    }
  },
  components: { MediaPreviewCard, Search },
  setup(props) {
    const store = useStore();
    const drawerWidth = ref('28%');

    // filter相关变量
    const mediaFilter = reactive({
      keyword: '',
      locationList: [-1],
      categoriesList: props.categories,
      status: -1
    });

    // 获取数据API
    const curPage = ref(1);
    const fetchNum = ref(8);
    const pageNum = ref(1);
    const mediaList = ref([]);
    const loadingData = ref(false);
    const resetPageParams = () => {
      curPage.value = 1;
      fetchNum.value = 8;
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

    const handleSearch = () => {
      resetPageParams();
      fetchMediaByPagination(true);
    };

    (() => {
      fetchMediaByPagination(true);
    })();

    const handleUploadMedia = () => {};

    return {
      drawerWidth,
      mediaFilter,
      mediaList,
      loadingData,
      curPage,
      fetchNum,
      pageNum,
      handleUploadMedia,
      handleSearch
    };
  }
});
</script>

<style lang="scss" scoped>
.title-divider {
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  margin: 16px 0;
  z-index: 5000;
}

.searchbar-container {
  margin: 24px auto;
  width: 96%;
}

.media-repo-body {
  .media-repo-footer {
    margin-top: 24px;
    margin-bottom: 24px;
  }

  .el-row {
    margin-top: -6px;
    margin-bottom: -6px;
  }

  .el-col {
    margin-top: 6px;
    margin-bottom: 6px;
  }
}

.bottom-controls-container {
  border-top: var(--el-border-base);
  padding: 8px 16px;
  left: 0;
  bottom: 0;
  position: absolute;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  background-color: var(--el-color-white);
}
</style>
