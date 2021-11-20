<template>
  <div id="article-reading" v-if="!loadingData">
    <header class="article-reading-header">
      <el-image
        crossorigi="anonymous"
        :alt="`cover image of article ${article.name}`"
        :src="article.backgroundUrl"
        lazy
      >
        <template #placeholder>
          <div class="loading loading-meow" />
        </template>
      </el-image>
      <div class="content-mask"></div>
      <div class="content-container">
        <div class="container">
          <el-row>
            <el-col :lg="20">
              <div class="article-title">
                <h1>{{ article.name }}</h1>
                <div
                  class="badge-container"
                  v-if="article.isRecommended === 1 || article.isOriginal === 1"
                >
                  <span class="original-badge" v-if="article.isOriginal === 1"
                    >原创</span
                  >
                  <span
                    class="recommend-badge"
                    v-if="article.isRecommended === 1"
                    >推荐</span
                  >
                </div>
              </div>
              <div class="article-info">
                <span class="article-author">{{ article.author }}</span>
                <span class="article-view">
                  <font-awesome-icon :icon="['far', 'eye']" />&nbsp;{{
                    normalizeNum(article.viewCount)
                  }}次浏览
                </span>
                <span class="article-optime">
                  <span class="create-time"
                    >发表于{{ formatTimestamp(article.createTime) }}</span
                  >&nbsp;&nbsp;&nbsp;
                  <span
                    class="edit-time"
                    v-if="article.createTime !== article.updateTime"
                    :title="`编辑于${formatTimestamp(article.updateTime)}`"
                    >已编辑</span
                  >
                </span>
              </div>
              <div class="article-abstract-container">
                <p class="article-abstract">{{ article.articleAbstract }}</p>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </header>

    <main class="article-reading-body">
      <div class="container article-container">
        <el-row>
          <el-col :lg="20">
            <article class="article-content">
              <div class="markdown-body" v-html="articleContent"></div>
              <hr class="content-divider" />
              <div class="tags-container" v-if="article.tags.length !== 0">
                <a
                  class="tag-container"
                  v-for="tag in article.tags"
                  :key="tag.id"
                  :href="tag.linkName"
                  :target="tag.target"
                >
                  <el-icon color="orange" :size="16">
                    <collection-tag />
                  </el-icon>
                  <tag
                    :id="tag.id"
                    :name="tag.name"
                    :link-name="tag.linkName"
                    :target="tag.target"
                    :color="tag.color"
                    flat
                  />
                </a>
              </div>
              <div class="copyright-container"></div>
              <div class="connection-container"></div>
            </article>
          </el-col>
          <el-col :lg="4">
            <div class="article-toc"></div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :lg="20">
            <div class="related-articles"></div>
          </el-col>
        </el-row>
      </div>
    </main>

    <footer class="article-reading-footer">
      <div class="container comment-container">
        <el-row>
          <el-col :lg="20"> </el-col>
        </el-row>
      </div>
    </footer>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, onUnmounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ElNotification, ElMessage } from 'element-plus';
import logger from '@/plugins/logger';
import { normalizeNum } from '@/utils/util';
import { datetimeFormat, timeAgo } from '@/utils/datetime';
import CollectionTag from '@/components/Icon/CollectionTag';
import Tag from '@/components/Badge/Tag';
import VueMarkdownEditor, { xss } from '@kangc/v-md-editor';

export default defineComponent({
  name: 'ArticleReading',
  components: { Tag, CollectionTag },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const curArticle = ref({ content: '' });
    const loadingData = ref(false);
    const getArticleDetailsByLinkName = () => {
      const linkName = route.path;
      const curArticleDetail =
        store.getters['articles/articleDetails'](linkName);
      // 如果本地有三分钟内的缓存，那么先不请求数据
      if (
        curArticleDetail == null ||
        (Date.now() - curArticleDetail.timestamp) / 1000 > 60
      ) {
        loadingData.value = true;
        store
          .dispatch('articles/getArticleDetailsByLinkName', {
            linkName: linkName
          })
          .then((response) => {
            const data = response.data;
            if (!data) {
              ElNotification.error({
                title: '出大问题',
                message: '服务器响应出错，请稍候刷新重试'
              });
              return;
            }
            if (data.success) {
              curArticle.value =
                store.getters['articles/articleDetails'](linkName).data;
              console.log(curArticle.value);
            } else {
              ElMessage.error({
                center: true,
                message: '当前文章已被删除，即将跳转到404页面'
              });
              router.replace({ name: 'not-found' });
            }
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            loadingData.value = false;
          });
      } else {
        logger.log(
          '文章阅读界面有一分钟的缓存，如果在调试文章效果，可以考虑删除缓存'
        );
        curArticle.value = curArticleDetail.data;
      }
    };

    // lifecycle hooks: created
    (() => {
      getArticleDetailsByLinkName();
    })();

    // 展示相关的API
    const formatTimestamp = (datetime) => {
      let timeVar = new Date(datetime);
      let timeVarString = datetimeFormat(datetime);
      if (timeVar.getFullYear() === new Date().getFullYear())
        return timeAgo(timeVarString, 'MM-DD HH:mm');
      else return timeAgo(timeVarString, 'YYYY-MM-DD');
    };

    const articleContent = computed(() => {
      return xss.process(
        VueMarkdownEditor.vMdParser.themeConfig.markdownParser.render(
          curArticle.value.content
        )
      );
    });

    let navContainer = null;
    onMounted(() => {
      navContainer = document.querySelector('#nav-container');
      navContainer.classList.add('leave-home');
    });

    onUnmounted(() => {
      navContainer.classList.remove('leave-home');
    });

    return {
      article: curArticle,
      normalizeNum,
      formatTimestamp,
      loadingData,
      articleContent
    };
  }
});
</script>

<style lang="scss" scoped>
header {
  height: 60vh;
  min-height: 480px;
  background-color: #777;
  margin: 0 auto;
  position: relative;
  z-index: 1;

  .el-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    :deep(img) {
      object-fit: cover;
      z-index: 0;
    }
  }

  .content-mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(86, 86, 86, 0.3);
    top: 0;
    left: 0;
    z-index: 2;
  }

  .content-container {
    position: absolute;
    bottom: 1em;
    left: 0;
    width: 100%;
    z-index: 3;
    color: #fff;
  }
}

.content-container {
  font-size: 16px;

  .article-title {
    > h1 {
      font-size: 2em;
      margin: 6px auto;
    }

    > h1,
    > div {
      display: inline-block;
    }

    > div {
      margin-left: 12px;

      :deep(span) {
        margin: 0 4px;
        padding: 3px 8px;
        border-radius: var(--el-border-radius-small);

        &:nth-of-type(1) {
          background-color: var(--el-color-error);
        }

        &:nth-of-type(2) {
          background-color: var(--el-color-warning);
        }
      }
    }
  }

  .article-info {
    font-size: 1.2em;
    margin: 0 -8px;

    > span {
      display: inline-block;
      margin: 4px 12px;
    }
  }

  .article-abstract-container {
    font-size: 1.2em;

    p {
      margin: 4px auto 8px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      word-break: break-all;
    }
  }
}

.article-reading-body {
  article.article-content {
    padding: 25px 50px 20px;
    overflow: hidden;
    margin-top: 10px;
    border-top-left-radius: var(--el-border-radius-small);
    border-top-right-radius: var(--el-border-radius-small);
  }

  .related-articles,
  article.article-content {
    position: relative;
    background-color: #fff;
  }

  .markdown-body {
    margin-bottom: 32px;
  }

  .content-divider {
    width: 80%;
    border: none;
    background-color: #ddd;
    height: 1px;
  }

  .tags-container {
    margin: 32px auto 24px;

    .tag-container {
      .el-icon {
        vertical-align: middle;
        margin-bottom: 2px;
      }
    }

    .tag-container :deep(a) {
      font-size: 16px;
    }
  }
}
</style>
