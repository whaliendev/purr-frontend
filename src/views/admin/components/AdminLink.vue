<template>
  <div class="link-management">
    <el-row :gutter="24" class="link-management-row">
      <el-col class="link-edit-column" :lg="8" :md="24" :sm="24">
        <base-card class="link-edit-card">
          <div class="new-link-title">新建链接</div>
          <el-divider class="title-divider" />
          <div class="new-link-body">
            <div class="settings-item">
              <label class="settings-item-label required">链接名称</label>
              <el-input
                placeholder="请输入链接名称"
                v-model="linkToSave.name"
                size="medium"
                type="text"
                minlength="1"
                maxlength="60"
                :show-word-limit="true"
              ></el-input>
            </div>

            <div class="settings-item">
              <div class="select-category">
                <label class="settings-item-label required">链接种类</label>
                <el-select
                  v-model="linkToSave.category"
                  clearable
                  placeholder="请选择链接的种类"
                  class="select-box"
                >
                  <el-option
                    v-for="category in categoryOptions"
                    :key="category.value"
                    :label="category.label"
                    :value="category.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>

            <div class="settings-item">
              <label class="settings-item-label required">链接地址</label>
              <el-input
                placeholder="链接指向的地址"
                v-model="linkToSave.linkName"
                size="medium"
                type="text"
                minlength="1"
                maxlength="128"
                :show-word-limit="true"
              ></el-input>
              <small class="hint">https://purr.group/tags/novel-suspense</small>
            </div>

            <div class="settings-item">
              <label class="settings-item-label">描述</label>
              <el-input
                placeholder="请输入对该链接的描述"
                v-model="linkToSave.description"
                size="medium"
                type="textarea"
                :rows="5"
              ></el-input>
            </div>

            <div class="settings-item">
              <div class="select-cover-settings">
                <label class="settings-item-label">链接背景图</label>
                <div class="cover-controls">
                  <el-button
                    class="btn-remove-cover"
                    size="small"
                    @click="removeCover"
                    >移除</el-button
                  >
                  <el-button
                    class="btn-show-gallery"
                    size="small"
                    @click="openGalleryDrawer"
                    >从图库选择</el-button
                  >
                </div>
              </div>
              <el-upload
                id="cover-upload"
                drag
                action=""
                :headers="uploadHeaders"
                :multiple="false"
                accept="image/*"
                :on-success="onUploadSuccessfully"
                v-if="!coverVisible"
              >
                <el-icon :size="64" class="el-icon--upload"
                  ><upload-filled
                /></el-icon>
                <div class="el-upload__text">
                  Drop file here or <em>click to upload</em>
                </div>
              </el-upload>
              <el-image
                v-else
                alt="cover preview"
                fit="cover"
                :src="linkToSave.imageUrl"
              />
              <el-input
                class="cover-url-input"
                placeholder="手动上传封面图，从图库选择或输入外部链接"
                v-model="linkToSave.imageUrl"
                size="medium"
                type="text"
                @blur="showCoverPreview"
              ></el-input>
            </div>

            <div class="bottom-controls-container">
              <reactive-button
                text="保存链接"
                type="primary"
                size="medium"
                @click="handleSaveLink"
              ></reactive-button>
            </div>
          </div>
        </base-card>
      </el-col>

      <el-col class="link-display-column" :lg="16" :md="24" :sm="24">
        <base-card class="link-display-card">
          <div class="link-display-body">
            <div class="link-display-title">链接列表</div>
            <el-row
              :gutter="24"
              class="link-list-display"
            >
              <el-col
                class="link-column"
                v-for="link in linkList"
                :key="link.id"
                :lg="6"
                :md="12"
                :sm="24"
              >
                <link-card :link="link" @edit-link="handleEditLink"/>
              </el-col>
            </el-row>
          </div>
          <div class="link-management-footer">
            <el-pagination
              background
              layout="->, sizes, prev, pager, next, jumper"
              v-model:current-page="curPage"
              v-model:page-size="fetchNum"
              :default-page-size="10"
              :default-current-page="1"
              :pager-count="5"
              :page-count="pageNum"
            ></el-pagination>
          </div>
        </base-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import BaseCard from '../../../components/UI/BaseCard';
import { useStore } from 'vuex';
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import ReactiveButton from '../../../components/Button/ReactiveButton';
import LinkCard from '../../../components/Card/LinkCard';
export default {
  components: { LinkCard, ReactiveButton, BaseCard },
  setup() {
    const store = useStore();

    const linkList = ref([]);
    const curPage = ref(1);
    const fetchNum = ref(9);
    const pageNum = ref(1);

    const categoryOptions = [
      {
        value: '外部链接',
        label: '外部链接'
      },
      {
        value: '页面',
        label: '页面'
      },
      {
        value: '聚焦',
        label: '聚焦'
      },
      {
        value: '标签',
        label: '标签'
      },
      {
        value: '文章',
        label: '文章'
      },
      {
        value: '友人链',
        label: '友人链'
      }
    ];

    const fetchLinkByPagination = () => {
      store
        .dispatch('links/getLatestAdminLinks', {
          curPage: curPage.value,
          fetchNum: fetchNum.value
        })
        .then((response) => {
          const data = response.data;
          if (data && data.success) {
            linkList.value = store.getters['links/linksList'];
            pageNum.value = store.getters['links/pageParams'].pageNum;
          }
        })
        .catch(() => {})
        .finally(() => {});
    };

    fetchLinkByPagination();

    const linkToSave = reactive({
      id: '',
      name: '',
      linkName: '',
      description: '',
      category: '',
      imageUrl: ''
    });

    const coverVisible = ref(linkToSave.imageUrl !== '');

    const removeCover = () => {
      linkToSave.imageUrl = '';
      closeCoverPreview();
    };

    const openGalleryDrawer = () => {};

    const uploadHeaders = () => {};

    const onUploadSuccessfully = () => {
      ElMessage.success({
        center: true,
        message: '上传成功',
        duration: 1000
      });
      showCoverPreview();
    };

    const showCoverPreview = () => {
      coverVisible.value = true;
    };

    const closeCoverPreview = () => {
      coverVisible.value = false;
    };

    const handleEditLink = (e) => {
      console.log(e.id);
      linkToSave.id = e.id;
      linkToSave.description = e.description;
      linkToSave.imageUrl = e.imageUrl;
      linkToSave.name = e.name;
      linkToSave.linkName = e.linkName;
      linkToSave.category = e.category;
    };

    const handleSaveLink = () => {
      console.log(linkToSave);
    };

    return {
      curPage,
      fetchNum,
      pageNum,
      linkList,
      linkToSave,
      coverVisible,
      categoryOptions,
      fetchLinkByPagination,
      removeCover,
      openGalleryDrawer,
      uploadHeaders,
      onUploadSuccessfully,
      showCoverPreview,
      closeCoverPreview,
      handleEditLink,
      handleSaveLink
    };
  }
};
</script>

<style lang="scss" scoped>
.link-management-row {
  display: flex;
  flex-wrap: wrap;
  .link-edit-card {
    border-radius: var(--el-border-radius-base);
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    .new-link-title {
      font-size: 16px;
      font-weight: bold;
    }
    .title-divider {
      position: absolute;
      left: 0;
      top: 100%;
      width: 100%;
      margin: 16px 0;
      z-index: 5000;
    }

    .new-link-body {
      width: 100%;
      height: 100%;
      overflow: hidden;

      .settings-item {
        color: var(--light-admin-text-color);
        margin: 8px 0;

        .settings-item-label {
          font-size: 15px;
          margin: 4px 0 6px 4px;
          display: inline-block;
        }

        .select-category {

          .select-box {
            width: 100%;
          }
        }

        .settings-item-label.required::after {
          content: '*';
          margin-left: 4px;
          color: var(--el-color-danger);
        }

        .hint {
          display: inline-block;
          margin-top: 4px;
          margin-left: 4px;
        }

        .hint::before {
          content: '💡';
        }

        .select-cover-settings {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }

        .status-radio-group,
        .el-radio-group {
          padding-left: 4px;

          :deep(.el-radio__input) {
            .el-radio__inner {
              width: 16px;
              height: 16px;
            }

            .el-radio__inner::after {
              width: 6px;
              height: 6px;
            }
          }

          :deep(.el-radio__input.is-checked) {
            .el-radio__inner {
              background-color: var(--el-color-white);
            }

            .el-radio__inner::after {
              background-color: var(--el-color-primary);
            }
          }
        }

        :deep(.el-upload) {
          width: 100%;
          height: 225px;

          .el-upload-dragger {
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          }
        }

        :deep(.el-image) {
          width: 100%;
          overflow: visible;
          box-shadow: var(--el-box-shadow-base);

          img {
            width: 100%;
            height: 225px;
            border-radius: var(--el-border-radius-base);
          }

          .el-image__error {
            width: 100%;
            height: 225px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }

        :deep(.cover-url-input) {
          margin-top: 6px;
        }
      }

      .new-link-title {
        color: var(--light-admin-text-accent-color);
      }

      .settings-divider {
        margin: 16px 0;
      }

      .bottom-controls-container {
        border-top: var(--el-border-base);
        padding: 8px 0px;
        left: 0;
        bottom: 0;
        //position: absolute;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
        background-color: var(--el-color-white);
      }
    }
  }

  .link-display-column {
    .link-display-card {
      border-radius: var(--el-border-radius-base);
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-top: 20px;

      .link-display-title {
        font-weight: bold;
        font-size: 16px;
        margin-left: 30px;
      }

      .link-display-body {
        padding-left: 30px;
        .link-display-title {
        }
        .link-list-display {
          .link-column {
            height: 230px;
            margin-left: 30px;
            margin-top: 16px;
          }
        }
      }

      .link-management-footer {
        align-items: flex-end;
        margin-top: 12px;
        margin-right: 10px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
