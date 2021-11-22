<template>
  <base-card class="focus-card">
    <!--    创意来源：https://2heng.xin    -->
    <div class="the-focus square from_left_and_right">
      <a :href="link || '#'" :target="target || '_blank'">
        <div class="img">
          <img :src="backgroundUrl || defaultBGUrl" />
        </div>
        <div class="info">
          <h3>{{ linkName || 'Focus' }}</h3>
          <p>{{ linkDesc || defaultLinkDesc }}</p>
        </div>
      </a>
    </div>
  </base-card>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FocusCard',
  props: {
    backgroundUrl: {
      type: String,
      required: false,
      default:
        'https://images.unsplash.com/photo-1488188840666-e2308741a62f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80'
    },
    linkName: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    },
    linkDesc: {
      type: String,
      required: false,
      default: '这个人太懒了，什么都没有写诶'
    },
    target: {
      type: String,
      required: false,
      default: '_blank'
    }
  },
  setup() {
    const defaultBGUrl =
      'https://images.unsplash.com/photo-1446435210126-bfa18ee3b7a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1646&q=80';
    const defaultLinkDesc = '这个人太懒了，什么都没有写诶';
    return {
      defaultBGUrl,
      defaultLinkDesc
    };
  }
});
</script>

<style lang="scss" scoped>
.focus-card {
  display: inline-block;
  overflow: hidden;
  box-shadow: 2px 3px 4px #666666aa;
}

.the-focus.from_left_and_right {
  position: relative;
  height: 160px;
  width: 256px;
  overflow: hidden;
  border-radius: var(--el-border-radius-base);

  .img {
    transition: all 0.35s ease-in-out;
    transform: scale(1);
  }

  .info {
    font-family: var(--georgia-font-family);
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    backface-visibility: hidden;
    background: #333333aa;
    visibility: hidden;
    opacity: 0;
    transition: all 0.35s ease-in-out;

    h3 {
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #fff;
      text-align: center;
      font-size: 17px;
      padding: 10px;
      background: #222222cc;
      margin: 30px 0 0;
      transition: all 0.35s ease-in-out;
      transform: translateX(-100%);
    }

    p {
      font-style: italic;
      font-size: 12px;
      position: relative;
      color: #bbb;
      padding: 20px;
      text-align: center;
      transition: all 0.35s 0.1s linear;
      transform: translateX(100%);
    }
  }

  a:hover {
    .img {
      transform: scale(1.2);
    }

    .info {
      visibility: visible;
      opacity: 1;

      h3,
      p {
        transform: translateX(0);
      }
    }
  }
}

.the-focus {
  position: relative;
  transition: all 0.35s ease-in-out;

  a {
    color: #333;
    outline: 0;
    transition: color 0.2s ease-out, border 0.2s ease-out, opacity 0.2s ease-out;
    background-color: transparent;
  }

  img {
    object-fit: cover;
    max-width: 100%;
    width: 256px;
    height: 160px;
    border: 0;
  }
}
</style>
