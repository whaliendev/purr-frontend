<template>
  <div
    class="moment-card-container"
    :style="`background-image: linear-gradient(135deg, ${
      moment.backgroundColor
    } 15%, ${moment.backgroundColor + '99'} 75%)`"
  >
    <div class="content-container">
      <div class="moment-title">
        <span class="moment-timestamp">{{
          formatTimestamp(moment.updateTime, moment.createTime)
        }}</span>
        <font-awesome-icon
          :icon="['fas', 'ellipsis-h']"
          @click="router.push({ name: 'moment' })"
        />
      </div>

      <div class="moment-content">
        <el-scrollbar max-height="300px">
          <div class="moment-content-container" v-html="momentHtml" />
        </el-scrollbar>
      </div>

      <div class="moment-footer">
        <div class="like-container">
          <span class="like-heart" ref="likeHeart"></span>
          <span class="thumb-count">{{ numFormat(moment.thumbCount) }}</span>
        </div>
        <div class="author-info">
          By&nbsp;{{ ellipsisFormat(moment.annotation, 20) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted, onUnmounted, ref } from 'vue';
import { datetimeFormat, timeAgo } from '@/utils/datetime';
import VueMarkdownEditor, { xss } from '@kangc/v-md-editor';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ellipsisFormat, normalizeNum } from '@/utils/util';

export default defineComponent({
  props: {
    moment: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const router = useRouter();
    const store = useStore();

    const formatTimestamp = (updateTime, createTime) => {
      let timeToFormat = updateTime ? updateTime : createTime;
      let timeVar = new Date(timeToFormat);
      let timeVarString = datetimeFormat(timeToFormat);
      if (timeVar.getFullYear() === new Date().getFullYear())
        return timeAgo(timeVarString, 'MM/DD HH:mm');
      else return timeAgo(timeVarString, 'YYYY/MM/DD');
    };

    const momentHtml = computed(() => {
      return xss.process(
        VueMarkdownEditor.vMdParser.themeConfig.markdownParser.render(
          props.moment.content
        )
      );
    });

    const likeHeart = ref(null);
    onMounted(() => {
      const isThumbed = store.getters['moments/likeMomentsList'].includes(
        props.moment.id
      );
      if (isThumbed) {
        likeHeart.value.style.backgroundPosition = 'right';
      }
      likeHeart.value.addEventListener('click', () => {
        if (!store.getters['moments/likeMomentsList'].includes(props.moment.id))
          likeHeart.value.classList.add('liking-heart');
        else {
          likeHeart.value.style.backgroundPosition = 'left';
          store.commit('moments/removeMomentLikes', { id: props.moment.id });
        }
      });
      likeHeart.value.addEventListener('touchstart', () => {
        if (!store.getters['moments/likeMomentsList'].includes(props.moment.id))
          likeHeart.value.classList.add('liking-heart');
        else {
          likeHeart.value.style.backgroundPosition = 'left';
          store.commit('moments/removeMomentLikes', { id: props.moment.id });
        }
      });
      likeHeart.value.addEventListener('animationend', () => {
        likeHeart.value.style.backgroundPosition = 'right';
        store.commit('moments/storeMomentLikes', { id: props.moment.id });
      });
    });

    onUnmounted(() => {
      likeHeart.value.removeEventListener('click');
      likeHeart.value.removeEventListener('touchstart');
      likeHeart.value.removeEventListener('animationend');
    });

    const numFormat = (num) => normalizeNum(num);

    return {
      formatTimestamp,
      momentHtml,
      router,
      likeHeart,
      numFormat,
      ellipsisFormat
    };
  }
});
</script>

<style lang="scss" scoped>
.moment-card-container {
  width: 100%;
  box-shadow: 2px 3px 4px #666666aa;
  border-radius: var(--el-border-radius-base);
  padding: 24px 20px;
}

.content-container {
  width: 100%;
  background-color: hsla(0, 0%, 100%, 0.16);
  //background-color: rgba(0, 0, 0, 0.06);
  //border: 1px solid #fff;
  backdrop-filter: blur(4px);
  border-radius: var(--el-border-radius-base);
  color: #fff;
  padding: 16px 16px;
  min-height: 320px;

  .moment-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-style: italic;
    font-weight: 500;

    .moment-timestamp {
      font-size: 1.5em;
    }

    svg {
      font-size: 1.2em;

      &:hover {
        color: #fe9600bb;
      }
    }
  }

  :deep(.moment-content) {
    font-size: 0.88em;
    letter-spacing: 1px;
    font-weight: 500;

    .el-scrollbar {
      padding-left: 0;
      padding-right: 12px;
      border-radius: var(--el-border-radius-base);
    }

    img {
      max-width: 100%;
      object-fit: cover;
      margin: 10px auto;
      border-radius: var(--el-border-radius-base);
    }
  }

  .moment-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.92em;
    margin-right: 12px;
    margin-top: 8px;
    font-weight: 500;

    .author-info {
      text-align: right;
      padding: 6px 4px 6px 0;
    }

    .like-container {
      display: flex;
      align-items: center;
      span {
        display: inline-block;
      }
    }

    .like-heart {
      cursor: pointer;
      height: 32px;
      width: 32px;
      transform: scale(2);
      background-image: url('https://gallery-1259614029.cos.ap-chengdu.myqcloud.com/img/web_heart_animation.png');
      background-position: left;
      background-repeat: no-repeat;
      background-size: 2900%;
    }

    .like-heart:hover {
      background-position: right;
    }

    .liking-heart {
      animation: heart-burst 0.8s steps(28) 1;
    }

    .disliking-heart {
      animation: heart-burst 0.8s steps(28) 1;
      animation-direction: reverse;
    }
  }
}

@keyframes heart-burst {
  from {
    background-position: left;
  }
  to {
    background-position: right;
  }
}
</style>
