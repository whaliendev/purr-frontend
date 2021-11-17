<template>
  <div class="post-card post-card-show">
    <div class="post-thumb">
      <a :href="article.linkName" :target="article.target">
        <el-image
          crossorigin="anonymous"
          :alt="`cover of article ${article.name}`"
          :src="article.backgroundUrl"
          lazy
        >
          <template #placeholder>
            <div class="loading-gif" />
          </template>
        </el-image>
        <div class="post-title">
          <h3>{{ article.name }}</h3>
        </div>
      </a>
    </div>

    <div class="post-content-wrapper">
      <div class="post-content">
        <div class="post-tags">
          <span v-if="article.isOriginal === 1" class="post-badge">原创</span>
          <span v-if="article.isRecommended === 1" class="post-badge"
            >推荐</span
          >
          <el-divider
            v-if="article.isOriginal === 1 && article.tags.length !== 0"
            direction="vertical"
          />
          <ul class="tags-list">
            <li v-for="tag in article.tags" :key="tag.id">
              <tag
                :id="tag.id"
                :name="tag.name"
                :link-name="tag.linkName"
                :target="tag.target"
                :color="tag.color"
                :style="'padding-bottom: 4px'"
              />
            </li>
          </ul>
        </div>

        <div class="post-meta">
          <span class="view-count"
            ><font-awesome-icon :icon="['far', 'eye']" />&nbsp;{{
              normalizeNum(article.viewCount)
            }}</span
          >
          <span class="thumb-count"
            ><font-awesome-icon :icon="['far', 'thumbs-up']" />&nbsp;{{
              normalizeNum(article.thumbCount)
            }}</span
          >
          <span class="share-count"
            ><font-awesome-icon :icon="['far', 'share-square']" />&nbsp;{{
              normalizeNum(article.shareCount)
            }}</span
          >
          <span class="comment-count"
            ><a href="#" target="_blank"
              ><font-awesome-icon :icon="['far', 'comment-dots']" />&nbsp;{{
                normalizeNum(article.commentCount)
              }}</a
            ></span
          >
        </div>

        <div class="post-abstract">
          <p>{{ article.articleAbstract }}</p>
        </div>

        <div class="post-info">
          <span class="post-date">
            <font-awesome-icon :icon="['far', 'clock']" />&nbsp;{{
              timeFormat(article.updateTime, article.createTime)
            }}</span
          >
          <a :href="article.linkName" :target="article.target">
            <font-awesome-icon :icon="['fas', 'ellipsis-h']" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { datetimeFormat, timeAgo } from '@/utils/datetime';
import { normalizeNum } from '@/utils/util';
import Tag from '@/components/Badge/Tag';

export default defineComponent({
  name: 'PostCard',
  components: { Tag },
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  setup() {
    const timeFormat = (updateTime, createTime) => {
      let modifier = '编辑于 ';
      if (updateTime) {
        return modifier + timeAgo(datetimeFormat(updateTime), 'YYYY-MM-DD');
      }
      modifier = '发布于 ';
      return modifier + timeAgo(datetimeFormat(createTime), 'YYYY-MM-DD');
    };

    return {
      timeFormat,
      normalizeNum
    };
  }
});
</script>

<style lang="scss" scoped>
.post-card {
  background-color: var(--el-color-white);
  border-radius: var(--el-border-radius-base);
  box-shadow: 0 1px 20px -6px #666666aa;
  overflow: hidden;
  height: 100%;

  a {
    color: #888;

    &:focus {
      color: var(--el-color-warning);
    }

    &:hover {
      color: orange;
    }

    &:active {
      color: orange;
    }
  }
}

.post-thumb {
  height: 12rem;
  position: relative;

  a {
    display: block;
    height: 100%;
  }

  .el-image {
    height: 100%;
    width: 100%;

    :deep(img) {
      height: 100%;
      object-fit: cover;
    }
  }

  .post-title {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    color: #fff;
    background-color: #333333aa;
    padding: 6px 12px 6px;
    font-family: var(--georgia-font-family);
    letter-spacing: 1px;

    h3 {
      margin: 0;
    }
  }
}

.post-content {
  color: #888;
  padding: 12px;
  font-size: 0.84em;

  .post-tags {
    display: flex;
    align-items: center;
    min-height: 32px;
    margin: 0 -4px;

    .post-badge {
      margin: 0 4px;
      padding: 1px 8px;
      color: #fff;
      background-color: var(--el-color-error);
      border-radius: var(--el-border-radius-small);
    }

    .post-badge:nth-of-type(2) {
      background-color: orange;
    }

    .el-divider {
      height: 1.5em;
    }

    .tags-list {
      display: inline-flex;
      flex-wrap: wrap;
      padding: 0;
      margin: 0;
      align-items: center;

      li {
        margin: 4px;
      }
    }
  }

  .post-meta {
    margin: 8px -12px 8px;
    font-size: 1em;

    > span {
      margin: 0 12px;
    }
  }

  .post-abstract {
    margin: 12px 0;
    color: rgba(0, 0, 0, 0.66);
    min-height: 64px;

    p {
      margin: 0;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
  }

  .post-info,
  .post-abstract {
    font-size: 1.12em;
  }

  .post-info {
    display: flex;
    justify-content: space-between;
    align-items: center;

    :deep(svg) {
      font-size: 1.2em;
    }
  }
}
</style>

<style>
.post-card-show {
  animation: post-card-show 0.5s;
  opacity: 1;
}

@keyframes post-card-show {
  0% {
    opacity: 0;
    transform: translateY(80px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
