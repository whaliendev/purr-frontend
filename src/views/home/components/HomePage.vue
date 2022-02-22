<template>
  <div id="home-page">
    <header class="homepage-header" id="homepage-header">
      <div class="carousel-container container">
        <el-carousel
          class="fadeIn"
          height="360px"
          @change="changeHeaderBGColor"
          ref="carousel"
        >
          <el-carousel-item
            v-for="(article, index) in recommendedArticles"
            :key="article.id"
          >
            <el-image
              crossorigin="anonymous"
              fit="cover"
              :alt="`cover image of article ${article.name}`"
              :src="article.backgroundUrl"
              @load="initialChangeHeaderBG(index)"
            >
              <template #placeholder>
                <div class="placeholder loading" />
              </template>
            </el-image>
            <div
              class="article-meta-info shadow-text"
              :style="`color: ${isDarkColor ? '#fff' : '#222'}`"
            >
              <h1>{{ article.name }}</h1>
              <p class="article-info-container">
                <span class="article-author">{{ article.author }}</span>
                <span
                  class="article-tags-container"
                  v-if="article.tags.length > 0"
                >
                  <span class="info-separator">/</span>
                  <span class="article-tags">{{ article.tags[0].name }}</span>
                </span>
              </p>
              <button
                class="reading-btn"
                @click="router.push(article.linkName)"
              >
                阅读文章
              </button>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <!--    创意来源： https://velasx.com    -->
      <!--    背景图    -->
      <div class="disable-hover" id="disable-hover">
        <div
          class="header-bg header-bg-image"
          :style="`background-image: url(${article.backgroundUrl}); display: none`"
          v-for="article in recommendedArticles"
          :key="article.id"
        ></div>
      </div>
      <!--    背景图上的遮罩    -->
      <div class="header-bg header-bg-overlay"></div>
    </header>

    <main>
      <section class="focus-wrapper content-block">
        <div class="container">
          <div class="row title-block">
            <h1>
              <font-awesome-icon :icon="['fas', 'torii-gate']" />&nbsp;聚焦 !!
            </h1>
          </div>
          <div class="focus-container content-container only-row">
            <focus-card
              v-for="(focusLink, index) in focusList"
              :key="index"
              :background-url="focusLink.imageUrl"
              :link-name="focusLink.name"
              :link="focusLink.linkName || focusLink.url"
              :link-desc="focusLink.description"
              :target="focusLink.target"
            />
          </div>
        </div>
      </section>

      <section class="moment-wrapper content-block">
        <div class="container">
          <div class="row title-block">
            <h1><font-awesome-icon :icon="['fas', 'fan']" />&nbsp;宇宙漫游</h1>
            <button
              class="more-link load-more-btn"
              @click="router.push({ name: 'moment' })"
            >
              查看更多&nbsp;<font-awesome-icon :icon="['fas', 'caret-right']" />
            </button>
          </div>
          <div class="moment-container">
            <el-row :gutter="24">
              <el-col
                v-for="moment in momentsList"
                :key="moment.id"
                :lg="8"
                :md="12"
                :sm="24"
                class="moment-item"
              >
                <moment-card :moment="moment" />
              </el-col>
            </el-row>
          </div>
        </div>
      </section>

      <section class="article-wrapper content-block">
        <div class="container">
          <div class="row title-block">
            <h1>
              <font-awesome-icon :icon="['fas', 'quidditch']" />&nbsp;到处转转
            </h1>
          </div>
          <div class="article-container">
            <el-row :gutter="20">
              <el-col
                v-for="article in articlesList"
                :key="article.id"
                :lg="8"
                :md="12"
                :sm="24"
                class="article-item"
              >
                <post-card :article="article" />
              </el-col>
            </el-row>
          </div>
          <div class="load-more-block" v-if="!loadingArticles">
            <button
              class="load-more-btn more-link"
              v-if="!noMoreArticles"
              @click="loadMoreArticles"
            >
              加载更多&nbsp;<font-awesome-icon :icon="['fas', 'caret-down']" />
            </button>
            <p class="no-more-articles" v-else>真的已经被掏空了&lt;(ToT)&gt;</p>
          </div>
          <div class="loading-articles" v-else></div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
// import ColorThief from 'colorthief';
// import isLightOrDark from '@/utils/util';
import FocusCard from '@/components/Card/FocusCard';
import { useRouter } from 'vue-router';
import MomentCard from '@/components/Card/MomentCard';
import PostCard from '@/components/Card/PostCard';
export default defineComponent({
  name: 'HomePage',
  components: { PostCard, MomentCard, FocusCard },
  setup() {
    const store = useStore();
    const router = useRouter();

    // 获取推荐文章
    const recommendedArticles = ref([]);
    const getRecommendedArticles = () => {
      if (
        (Date.now() -
          store.getters['articles/recommendedArticlesList'].timestamp) /
          1000 >
        30
      ) {
        store
          .dispatch('articles/getRecommendedArticles')
          .then((response) => {
            const data = response.data;
            if (data && data.success) {
              recommendedArticles.value =
                store.getters['articles/recommendedArticlesList'].data;
            }
          })
          .catch((error) => {
            console.log(error);
            // TODO enrich ux
          });
      } else {
        recommendedArticles.value =
          store.getters['articles/recommendedArticlesList'].data;
      }
    };

    // 获取focus List
    const focusList = ref([]);
    const getFocusList = () => {
      if (
        (Date.now() - store.getters['links/focusList'].timestamp) / 1000 >
        30
      ) {
        store
          .dispatch('links/getFocusList')
          .then((response) => {
            const data = response.data;
            if (data && data.success) {
              focusList.value = store.getters['links/focusList'].data;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        focusList.value = store.getters['links/focusList'].data;
      }
    };

    const momentCurPage = ref(1);
    const momentFetchNum = ref(12);
    const momentsList = ref([]); // 注意，这里的momentsList是一个总list
    const getMomentsListByPagination = () => {
      store
        .dispatch('moments/getMomentsByPagination', {
          curPage: momentCurPage.value,
          fetchNum: momentFetchNum.value
        })
        .then((response) => {
          const data = response.data;
          if (data && data.success) {
            momentsList.value.push(...store.getters['moments/momentsList']);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    const articleCurPage = ref(1);
    const articleFetchNum = ref(6);
    const articlesList = ref([]);
    const loadingArticles = ref(false);
    const noMoreArticles = ref(false);
    const getArticlesByPagination = () => {
      loadingArticles.value = true;
      store
        .dispatch('articles/getArticlesByPagination', {
          curPage: articleCurPage.value,
          fetchNum: articleFetchNum.value
        })
        .then((response) => {
          const data = response.data;
          if (data && data.success) {
            articlesList.value.push(
              ...store.getters['articles/fgArticlesList']
            );
            const pageParams = store.getters['articles/fgPageParams'];

            if (pageParams.curPage >= pageParams.pageNum) {
              noMoreArticles.value = true;
            } else if (pageParams.curPage < pageParams.pageNum) {
              noMoreArticles.value = false;
            }
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          loadingArticles.value = false;
        });
    };

    const loadMoreArticles = () => {
      articleCurPage.value = articleCurPage.value + 1;
      getArticlesByPagination();
    };

    // lifecycle created
    (() => {
      getRecommendedArticles();
      getFocusList();
      getMomentsListByPagination();
      getArticlesByPagination();
    })();

    // 展示相关API
    let header,
      // colorThief,
      headerBGImages = undefined;
    let carousel = ref(null);
    const isDarkColor = ref(true);
    onMounted(() => {
      if (!header) header = document.querySelector('#homepage-header');
      // if (!colorThief) colorThief = new ColorThief();
      carousel.value.setActiveItem(
        Math.floor(Math.random() * recommendedArticles.value.length)
      );
    });
    watch(recommendedArticles, () => {
      // Actually, this is a bug of element-plus
      carousel.value.setActiveItem(0);
    });
    const initialChangeHeaderBG = (carouselItemIndex) => {
      if (carouselItemIndex !== 0) return;
      setTimeout(() => {
        if (headerBGImages === undefined) {
          headerBGImages = document.querySelectorAll(
            '#disable-hover .header-bg'
          );
        }
        if (headerBGImages !== null) headerBGImages[0].style.display = 'block';
      });
    };
    const changeHeaderBGColor = (carouselIndex) => {
      setTimeout(() => {
        if (headerBGImages === undefined) {
          headerBGImages = document.querySelectorAll(
            '#disable-hover .header-bg'
          );
        }
        headerBGImages.forEach((headerBGImage, index) => {
          if (carouselIndex === index) headerBGImage.style.display = 'block';
          else headerBGImage.style.display = 'none';
        });
        // const image = document.querySelector(
        //   '.el-carousel__item.is-active img'
        // );
        // const [r, g, b] = colorThief.getColor(image);
        // isDarkColor.value = isLightOrDark([r, g, b]) === 'dark';
        // header.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
      }, 100);
    };

    return {
      recommendedArticles,
      changeHeaderBGColor,
      carousel,
      initialChangeHeaderBG,
      isDarkColor,
      focusList,
      router,
      momentsList,
      articlesList,
      loadingArticles,
      noMoreArticles,
      loadMoreArticles
    };
  }
});
</script>

<style lang="scss" scoped>
.homepage-header {
  position: relative;
  width: 100%;
  height: 525px;
  overflow: hidden;
  transition: background-color 0.5s ease-out;

  .carousel-container {
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    padding: 90px 15px 0;
  }

  .el-carousel {
    position: relative;
    width: 100%;
    height: 360px;
    border-radius: var(--el-border-radius-base);
    box-shadow: var(--el-box-shadow-base);

    :deep(.el-carousel__arrow) {
      background-color: transparent;

      i {
        font-size: 24px;
        font-weight: bold;
      }
    }
  }

  .shadow-text {
    text-shadow: rgba(68, 68, 68, 0.75) 1px 1px 1px;
  }

  .el-image {
    width: 100%;
    height: 100%;

    .placeholder {
      background-image: url('../../../assets/loading.gif');
      background-position: center center;
      background-size: cover;
      background-repeat: no-repeat;
      position: absolute;
      top: 36%;
      left: 50%;
      transform: translateX(-50%);
      margin: auto;
      width: 120px;
      height: 120px;
    }
  }

  .article-meta-info {
    position: absolute;
    left: 50%;
    top: 48%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      font-size: 1.6em;
      letter-spacing: 1px;
      margin: 0;
    }

    .article-info-container {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.1em;
      letter-spacing: 1px;
    }

    .reading-btn {
      margin-top: 4px;
      padding: 4px 8px;
      background-color: transparent;
      color: #fff;
      border: 1px solid #fff;
      border-radius: var(--el-border-radius-small);
      outline: 0;
      cursor: pointer;

      &:hover {
        background-color: #fff;
        color: #333;
      }
    }
  }
}

.disable-hover,
.disable-hover * {
  pointer-events: none !important;
}

.header-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.header-bg-image {
  background-size: cover;
  background-position: center top 5%;
  background-repeat: no-repeat;
  filter: blur(30px);
  z-index: 1;
}

.header-bg-overlay {
  background-color: #eee;
  background-image: linear-gradient(135deg, #fdfcfb, #e2d1c3);
  opacity: 0.7;
  z-index: 2;
}

.content-block {
  position: relative;
  width: 100%;
  padding: 30px 0 0;
}

.title-block {
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: baseline;
  -ms-flex-align: baseline;
  align-items: center;
  padding: 0 15px;
  font-family: 'Ubuntu', sans-serif;
  color: #666;
  border-bottom: 1px dashed #ececec;
  margin-bottom: 30px;

  h1 {
    margin-bottom: 12px;
  }

  button {
    margin-bottom: -4px;
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-left: -15px;
  margin-right: -15px;
}

button.load-more-btn {
  cursor: pointer;
  opacity: 0.7;
  background-color: rgba(0, 0, 0, 0);
  font-size: 0.75em;

  &:hover {
    opacity: 0.5;
  }
}

.more-link {
  display: inline-block;
  padding: 4px 8px;
  border: 2px solid #888;
  border-radius: var(--el-border-radius-small);
  vertical-align: middle;
  line-height: 1.2em;
  opacity: 0.5;
  transition: all 0.15s ease-out;
}

.content-container {
  display: flex;
  flex-wrap: wrap;
}

.only-row {
  justify-content: space-between;
  align-items: center;

  > div {
    margin: 12px 0;
  }
}

.moment-container,
.article-container {
  margin-top: -12px;
  margin-bottom: -12px;

  .el-col {
    margin-top: 12px;
    margin-bottom: 12px;
  }
}

.load-more-block {
  color: #888;
  padding: 36px 0;
  text-align: center;

  .no-more-articles {
    font-size: 0.8em;
  }
}

.loading-articles {
  margin: 50px auto 0 auto;
  width: 48px;
  height: 48px;
  background-image: url('../../../assets/loading.gif');
  background-repeat: no-repeat;
  background-position: center center;
}
</style>
