<template>
  <div id="home-page">
    <header class="homepage-header" id="homepage-header">
      <div class="carousel-container container">
        <el-carousel
          class="fadeIn"
          height="360px"
          @change="changeHeaderBGColor"
          :interval="4500"
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
              <button class="reading-btn">阅读文章</button>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <!--    创意来源： https://velasx.com    -->
      <div class="disable-hover" id="disable-hover">
        <div
          class="header-bg header-bg-image"
          :style="`background-image: url(${article.backgroundUrl}); display: none`"
          v-for="article in recommendedArticles"
          :key="article.id"
        ></div>
      </div>
      <div class="header-bg header-bg-overlay"></div>
    </header>

    <main>
      <div class="focus-wrapper"></div>

      <div class="moment-wrapper"></div>

      <div class="article-wrapper"></div>
    </main>
  </div>
</template>

<script>
import { defineComponent, onMounted, onUpdated, ref } from 'vue';
import { useStore } from 'vuex';
import ColorThief from 'colorthief';
import isLightOrDark from '@/utils/util';
export default defineComponent({
  name: 'HomePage',
  setup() {
    const store = useStore();
    const recommendedArticles = ref([]);
    const getRecommendedArticles = () => {
      if (
        Date.now() -
          store.getters['articles/recommendedArticlesList'].timestamp / 1000 >
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

    // lifecycle created
    (() => {
      getRecommendedArticles();
    })();

    // 展示相关API
    let header,
      colorThief,
      headerBGImages = undefined;
    let carousel = ref(null);
    const isDarkColor = ref(true);
    onMounted(() => {
      header = document.querySelector('#homepage-header');
      colorThief = new ColorThief();
    });
    onUpdated(() => {
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
        const image = document.querySelector(
          '.el-carousel__item.is-active img'
        );
        const [r, g, b] = colorThief.getColor(image);
        isDarkColor.value = isLightOrDark([r, g, b]) === 'dark';
        header.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
      }, 100);
    };

    return {
      recommendedArticles,
      changeHeaderBGColor,
      carousel,
      initialChangeHeaderBG,
      isDarkColor
    };
  }
});
</script>

<style lang="scss" scoped>
#home-page {
  font-family: var(--site-font-family);
}

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
  }

  .article-meta-info {
    position: absolute;
    left: 50%;
    top: 44%;
    transform: translate(-50%, -50%);

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
</style>
