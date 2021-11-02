<template>
  <el-drawer
    custom-class="article-settings-drawer"
    size="24%"
    :before-close="handleClose"
    :lock-scroll="false"
    :destroy-on-close="true"
  >
    <template #title>
      <div class="article-settings-title">文章设置</div>
      <el-divider class="title-divider" />
    </template>
    <!--    body -->
    <el-scrollbar height="100%" :always="true">
      <!--    start of basic settings-->
      <div class="article-basic-settings">
        <div class="settings-title">基本设置</div>
        <!--      start of setting article title-->
        <div class="settings-item">
          <label class="settings-item-label required">文章题目</label>
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
          <label class="settings-item-label">首页推荐</label>
          <div class="status-radio-group">
            <el-radio
              v-model="articleSettings.pinnedStatus"
              :label="1"
              size="medium"
              >开启</el-radio
            >
            <el-radio
              v-model="articleSettings.pinnedStatus"
              :label="0"
              size="medium"
              >关闭</el-radio
            >
          </div>
          <small class="hint recommend-status-hint"
            >开启置顶的文章在首页文章展示页面将会优先展示</small
          >
        </div>
        <!--      end of setting article pinned status-->
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
      <div class="article-tag-settings"></div>
      <div class="article-abstract-settings"></div>
      <div class="article-cover-settings"></div>
    </el-scrollbar>
    <!--    end of body-->
    <div class="bottom-controls-container">
      <reactive-button
        text="高级设置"
        type="primary"
        size="medium"
      ></reactive-button>
      <el-button type="danger" size="medium"> 保存草稿 </el-button>
      <el-button type="primary" size="medium"> 发布 </el-button>
    </div>
  </el-drawer>
</template>
<script>
import { defineComponent, nextTick, reactive, ref, watchEffect } from 'vue';
import { ElMessageBox } from 'element-plus';
import logger from '@/plugins/logger';
import ReactiveButton from '@/components/Button/ReactiveButton';

export default defineComponent({
  name: 'ArticleSettingsDrawer',
  components: { ReactiveButton },
  setup: function () {
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
          logger.info('user cancelled close article-settings-drawer');
        });
    };

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
      copyrightAttachText: ''
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

    return {
      handleClose,
      articleSettings,
      copyrightAttachTextarea
    };
  }
});
</script>

<style lang="scss" scoped>
.title-divider {
  position: absolute;
  top: 100%;
  left: 0;
  margin: 12px 0;
  width: 100%;
}

.el-scrollbar {
  height: calc(100% - 54px);
  :deep(.el-scrollbar__wrap) {
    //height: calc(100% - 54px);
  }
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

  :deep(.el-date-editor) {
    display: block;
    width: 100%;
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
  bottom: 0;
  position: absolute;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 92%;
}
</style>
