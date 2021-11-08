<template>
  <el-drawer
    custom-class="article-settings-drawer"
    :size="articleSettingsDrawerWidth"
    :before-close="handleClose"
    :lock-scroll="false"
    :destroy-on-close="true"
    :append-to-body="true"
  >
    <template #title>
      <div class="article-settings-title">文章设置</div>
      <el-divider class="title-divider" />
    </template>

    <!--    body -->
    <!--    start of basic settings-->
    <div class="article-basic-settings">
      <div class="settings-title">基本设置</div>
      <!--      start of setting article title-->
      <div class="settings-item">
        <label class="settings-item-label required">文章标题</label>
        <el-input
          placeholder="显示在文章阅读界面的题目"
          v-model="articleSettings.title"
          size="medium"
          type="text"
          minlength="1"
          maxlength="60"
          :show-word-limit="true"
        ></el-input>
      </div>
      <!--      end of setting article title-->
      <!--      start of setting article author-->
      <div class="settings-item">
        <label class="settings-item-label">文章作者</label>
        <el-input
          placeholder="显示在文章阅读界面的昵称"
          v-model="articleSettings.author"
          size="medium"
          type="text"
          minlength="1"
          maxlength="40"
          :show-word-limit="true"
        ></el-input>
      </div>
      <!--      end of setting article author-->
      <!--      start of setting article short link-->
      <div class="settings-item">
        <label class="settings-item-label">文章短链名</label>
        <el-input
          placeholder="文章短链接名，如：article-short-link-name"
          v-model="articleSettings.author"
          size="medium"
          type="text"
          minlength="1"
          maxlength="128"
          :show-word-limit="true"
        ></el-input>
        <small class="hint short-link-hint"
          >https://purr.group/articles/{article-short-link-name}</small
        >
      </div>
      <!--      end of setting article short link-->
      <!--      start of setting article public datetime-->
      <div class="settings-item">
        <label class="settings-item-label">公开时间</label>
        <el-date-picker
          v-model="articleSettings.postTime"
          type="datetime"
          placeholder="文章的公开时间"
          size="medium"
        ></el-date-picker>
      </div>
      <!--      end of setting article public datetime-->
      <!--      start of setting article original status-->
      <div class="settings-item">
        <label class="settings-item-label">是否原创</label>
        <div class="status-radio-group">
          <el-radio
            v-model="articleSettings.originalStatus"
            :label="1"
            size="medium"
            >是</el-radio
          >
          <el-radio
            v-model="articleSettings.originalStatus"
            :label="0"
            size="medium"
            >否</el-radio
          >
        </div>
      </div>
      <!--      end of setting article original status-->
      <!--      start of setting article comment status-->
      <div class="settings-item">
        <label class="settings-item-label">开启评论</label>
        <div class="status-radio-group">
          <el-radio
            v-model="articleSettings.commentStatus"
            :label="1"
            size="medium"
            >开启</el-radio
          >
          <el-radio
            v-model="articleSettings.commentStatus"
            :label="0"
            size="medium"
            >关闭</el-radio
          >
        </div>
      </div>
      <!--      end of setting article comment status-->
      <!--      start of setting article recommended status-->
      <div class="settings-item">
        <label class="settings-item-label">首页推荐</label>
        <div class="status-radio-group">
          <el-radio
            v-model="articleSettings.recommendedStatus"
            :label="1"
            size="medium"
            >开启</el-radio
          >
          <el-radio
            v-model="articleSettings.recommendedStatus"
            :label="0"
            size="medium"
            >关闭</el-radio
          >
        </div>
        <small class="hint recommend-status-hint"
          >开启推荐的文章将会出现在首页轮播图中</small
        >
      </div>
      <!--      end of setting article recommended status-->
      <!--      start of setting article pinned status-->
      <div class="settings-item">
        <label class="settings-item-label">首页置顶</label>
        <div class="status-radio-group">
          <el-radio
            v-model="articleSettings.pinnedStatus"
            :label="1"
            size="medium"
            >开启置顶</el-radio
          >
          <el-radio
            v-model="articleSettings.pinnedStatus"
            :label="0"
            size="medium"
            >关闭置顶</el-radio
          >
        </div>
        <small class="hint recommend-status-hint"
          >开启置顶的文章在首页文章展示页面将会优先展示</small
        >
      </div>
      <!--      end of setting article pinned status-->
      <!--      start of setting article target value-->
      <div class="settings-item">
        <label class="settings-item-label">文章打开方式</label>
        <div class="status-radio-group">
          <el-radio
            v-model="articleSettings.target"
            :label="'_blank'"
            size="medium"
            >新标签页打开</el-radio
          >
          <el-radio
            v-model="articleSettings.target"
            :label="'_self'"
            size="medium"
            >当前标签页打开</el-radio
          >
        </div>
        <small class="hint recommend-status-hint"
          >当前设置决定了文章在首页的打开方式</small
        >
      </div>
      <!--      end of setting article target value-->
      <!--      start of setting article ping status-->
      <div class="settings-item">
        <label class="settings-item-label">允许文章被Ping</label>
        <div class="status-radio-group">
          <el-radio v-model="articleSettings.allowPing" :label="1" size="medium"
            >允许</el-radio
          >
          <el-radio v-model="articleSettings.allowPing" :label="0" size="medium"
            >不允许</el-radio
          >
        </div>
        <small class="hint recommend-status-hint"
          >如果你不了解<a
            href="https://en.wikipedia.org/wiki/Ping_(blogging)"
            target="_blank"
            >Ping</a
          >，可以忽略本选项
        </small>
      </div>
      <!--      end of setting article ping status-->
    </div>
    <!--    end of basic settings-->

    <el-divider class="settings-divider" />

    <!--start of article copyright settings-->
    <div class="article-copyright-settings">
      <div class="settings-title">版权信息设置</div>
      <div class="settings-item">
        <label class="settings-item-label">读者复制时附加版权信息</label>
        <div class="status-radio-group">
          <el-radio
            v-model="articleSettings.attachCopyText"
            :label="1"
            size="medium"
            >是</el-radio
          >
          <el-radio
            v-model="articleSettings.attachCopyText"
            :label="0"
            size="medium"
            >否</el-radio
          >
        </div>
      </div>
      <div class="settings-item copyright-settings-item">
        <label
          class="settings-item-label"
          v-if="articleSettings.attachCopyText === 1"
          >版权信息</label
        >
        <el-radio-group
          v-model="articleSettings.ccLicense"
          v-if="
            articleSettings.originalStatus === 1 &&
            articleSettings.attachCopyText === 1
          "
        >
          <el-radio :label="1" size="medium">CC BY（署名）</el-radio>
          <el-radio :label="2" size="medium"
            >CC BY-SA（署名-相同方式共享）</el-radio
          >
          <el-radio :label="3" size="medium"
            >CC BY-ND（署名-禁止演绎）</el-radio
          >
          <el-radio :label="4" size="medium"
            >CC BY-NC（署名-非商业使用）</el-radio
          >
          <el-radio :label="5" size="medium"
            >CC BY-NC-SA（署名-非商业使用-相同方式共享）</el-radio
          >
          <el-radio :label="6" size="medium"
            >CC BY-NC-ND（署名-非商业使用-禁止演绎）</el-radio
          >
        </el-radio-group>
        <el-input
          v-if="
            articleSettings.originalStatus === 0 &&
            articleSettings.attachCopyText === 1
          "
          id="copyrightTextarea"
          size="medium"
          type="textarea"
          :rows="8"
          placeholder="请输入读者在复制粘贴时附加的内容"
          v-model="articleSettings.copyrightAttachText"
        />
      </div>
    </div>
    <el-divider class="settings-divider" />

    <!--    start of article tag settings-->
    <div class="article-tag-settings">
      <div class="settings-title">文章标签设置</div>
      <div class="settings-item">
        <div class="add-tag-settings">
          <label class="settings-item-label">添加现有标签</label>
          <el-button
            class="button-new-tag"
            size="small"
            @click="showNewTagDrawer"
            >新建标签</el-button
          >
        </div>
        <el-select
          v-model="articleSettings.tags"
          multiple
          collapse-tags
          placeholder="请选择现有标签或创建新标签"
          @visible-change="getAllTags"
          size="medium"
        >
          <el-option
            v-for="tag in tagsList"
            :key="tag.id"
            :label="tag.name"
            :value="tag.id"
          >
            <tag
              :id="tag.id"
              :name="tag.name"
              :color="tag.color"
              :target="tag.target"
              :deletable="false"
              :style="'width: 94%; height: 88%;'"
            ></tag>
          </el-option>
        </el-select>
      </div>
    </div>
    <!--    end of article tag settings-->

    <el-divider class="settings-divider" />

    <div class="article-abstract-settings">
      <div class="settings-title">文章摘要设置</div>
      <div class="settings-item">
        <label class="settings-item-label">摘要</label>
        <el-input
          type="textarea"
          size="medium"
          :rows="8"
          placeholder="如果不输入，将会由系统自动生成"
          v-model="articleSettings.abstract"
        />
      </div>
    </div>

    <el-divider class="settings-divider" />

    <div class="article-cover-settings">
      <div class="settings-title">文章封面图设置</div>
      <div class="settings-item">
        <div class="select-cover-settings">
          <label class="settings-item-label">文章背景图</label>
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
          :src="articleSettings.backgroundUrl"
        />
        <el-input
          class="cover-url-input"
          placeholder="手动上传封面图，从图库选择或输入外部链接"
          v-model="articleSettings.backgroundUrl"
          size="medium"
          type="text"
          @blur="showCoverPreview"
        ></el-input>
      </div>
    </div>

    <new-tag-drawer
      v-model="newTagDrawerVisible"
      @ready-to-close="hideNewTagDrawer"
    />

    <!--    end of body-->
    <div class="bottom-controls-container">
      <el-button type="danger" size="medium"> 高级设置 </el-button>
      <reactive-button
        text="保存草稿"
        type="primary"
        size="medium"
      ></reactive-button>
      <el-button type="primary" size="medium"> 发布 </el-button>
    </div>
  </el-drawer>
</template>
<script>
import {
  defineComponent,
  nextTick,
  onMounted,
  reactive,
  ref,
  watchEffect
} from 'vue';
import logger from '@/plugins/logger';
import ReactiveButton from '@/components/Button/ReactiveButton';
import Tag from '@/components/Badge/Tag';
import UploadFilled from '@/components/Icon/UploadFilled';
import { useStore } from 'vuex';
import NewTagDrawer from '@/components/Drawer/NewTagDrawer';
import { ElMessage, ElMessageBox } from 'element-plus';

export default defineComponent({
  name: 'ArticleSettingsDrawer',
  components: { NewTagDrawer, UploadFilled, ReactiveButton, Tag },
  setup: function () {
    const store = useStore();

    const articleSettingsDrawerWidth = ref('24%');
    const handleClose = (done) => {
      ElMessageBox.confirm('你确定退出当前设置页吗？', '小提示', {
        confirmButtonText: '确认并保存',
        cancelButtonText: '取消'
      })
        .then(() => {
          // TODO save current settings to localStorage
          done();
        })
        .catch(() => {
          logger.info('user closed article-settings-drawer');
        });
    };

    onMounted(() => {
      hideNewTagDrawer();
    });

    const articleSettings = reactive({
      // 是否开启评论
      commentStatus: 1,
      recommendedStatus: 0,
      pinnedStatus: 0,
      // 是否原创
      originalStatus: 1,
      // 是否需要在复制时自动添加版权信息
      attachCopyText: 1,
      // 选择的CC License
      ccLicense: 1,
      // 当非原创时选择添加的附加信息
      copyrightAttachText: '',
      target: '_blank',
      allowPing: 1,
      tags: [], // 存放id
      abstract: '',
      backgroundUrl: ''
    });
    const copyrightAttachTextarea = ref({});
    watchEffect(async () => {
      if (
        articleSettings.attachCopyText === 1 &&
        articleSettings.originalStatus === 0
      ) {
        await nextTick(() => {
          document.querySelector('#copyrightTextarea').focus();
        });
      }
    });

    // 存放完整tag对象
    const tagsList = ref([]);
    const newTagDrawerVisible = ref(false);
    const getAllTags = () => {};
    const showNewTagDrawer = () => {
      newTagDrawerVisible.value = true;
      articleSettingsDrawerWidth.value = '30%';
    };
    const hideNewTagDrawer = () => {
      newTagDrawerVisible.value = false;
      articleSettingsDrawerWidth.value = '24%';
    };

    // cover相关的API
    const coverVisible = ref(articleSettings.backgroundUrl !== '');
    const uploadHeaders = reactive({
      'Access-Key': store.getters.accessToken
    });
    const showCoverPreview = () => {
      coverVisible.value = true;
    };
    const closeCoverPreview = () => {
      coverVisible.value = false;
    };
    const removeCover = () => {
      articleSettings.backgroundUrl = '';
      closeCoverPreview();
    };
    const openGalleryDrawer = () => {};
    const onUploadSuccessfully = () => {
      ElMessage.success({
        center: true,
        message: '上传成功',
        duration: 1000
      });
      showCoverPreview();
    };

    return {
      handleClose,
      articleSettings,
      copyrightAttachTextarea,
      getAllTags,
      tagsList,
      showCoverPreview,
      removeCover,
      coverVisible,
      openGalleryDrawer,
      showNewTagDrawer,
      uploadHeaders,
      onUploadSuccessfully,
      newTagDrawerVisible,
      articleSettingsDrawerWidth,
      hideNewTagDrawer
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

.article-basic-settings {
  margin-top: 16px;
}

.article-settings-title,
.settings-title {
  color: var(--light-admin-text-accent-color);
}

.settings-item {
  color: var(--light-admin-text-color);
  margin: 8px 0;

  .settings-item-label {
    font-size: 15px;
    margin: 4px 0 6px 4px;
    display: inline-block;
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

  :deep(.el-date-editor) {
    display: block;
    width: 100%;
  }

  :deep(.el-select) {
    display: block;
    width: 100%;
  }

  .add-tag-settings {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
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

.settings-divider {
  margin: 16px 0;
}

.article-copyright-settings {
  .copyright-settings-item .el-radio {
    display: flex;
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
