<template>
  <li class="dashboard-comment-item">
    <el-image alt="guest avatar" fit="cover" :src="guestAvatar">
      <template #placeholder>
        <div class="image-slot loading-text">Loading<span class="dot">...</span></div>
      </template>
      <template #error>
        <div class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </template>
    </el-image>
    <p class="comment-content">
      <span class="guest-name">{{ guestName }}</span
      >&nbsp;于&nbsp;<span class="comment-time">{{ commentTime }}</span
      >&nbsp; 在&nbsp;<span class="comment-on"
        ><a :href="commentOnUrl" target="_blank">{{ commentOn }}</a></span
      >&nbsp;上评论了&nbsp;<span class="comment-content-span">{{
        commentContent
      }}</span
      >,
      <span class="comment-approved" :class="{ approved: isApproved }">{{
        commentApproved
      }}</span>
    </p>
  </li>
</template>

<script>
import { defineComponent } from 'vue';
import { ellipsisFormat, isObject } from '@/utils/util';
import { datetimeFormat, timeAgo } from '@/utils/datetime';
export default defineComponent({
  name: 'CommentItem',
  props: {
    commentItem: {
      required: true,
      type: Object,
      validator: isObject
    }
  },
  data() {
    return {
      guestAvatar: this.commentItem.avatarUrl,
      commentOnUrl: this.commentItem.postUrl,
      isApproved: this.commentItem.approved
    };
  },
  computed: {
    guestName() {
      return ellipsisFormat(this.commentItem.authorName, 15);
    },
    commentTime() {
      return timeAgo(datetimeFormat(this.commentItem.date));
    },
    commentOn() {
      return ellipsisFormat(this.commentItem.postName, 15);
    },
    commentContent() {
      return ellipsisFormat(this.commentItem.content, 25);
    },
    commentApproved() {
      return this.commentItem.approved ? '已经被通过' : '尚未被通过';
    }
  }
});
</script>

<style lang="scss" scoped>
.el-image {
  display: inline-flex;
  position: static;
  width: 40px;
  height: 40px;
  margin-right: 12px;
  border-radius: var(--el-border-radius-base);
  border: var(--el-border-base);
  font-size: 8px;
  color: var(--light-admin-text-color);
  justify-content: center;
  align-items: center;
}

:deep(.comment-content) {
  display: inline-block;
  width: 264px;
  margin: 0;
  font-size: 14px;
  vertical-align: top;
  word-break: break-all;
  line-height: 1.5;
  word-spacing: 2.5px;
  color: var(--light-admin-text-color);

  .guest-name {
    color: var(--el-color-primary);
    font-weight: bold;
  }

  .comment-on {
    a:link {
      color: var(--el-color-warning);
      font-weight: bold;
    }

    a:visited {
      color: var(--el-color-info);
      font-weight: bold;
    }
  }

  .comment-time {
    //color: var(--light-admin-text-accent-color);
    //color: var(--el-color-black);
    font-weight: bold;
  }

  .comment-content-span {
    color: var(--el-color-warning);
    //font-weight: bold;
  }

  .comment-approved.approved {
    color: var(--el-color-success);
  }

  .comment-approved {
    color: var(--el-color-danger);
    //font-weight: bold;
  }
}
</style>
