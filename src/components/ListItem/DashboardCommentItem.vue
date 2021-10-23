<template>
  <li class="dashboard-comment-item">
    something like comment
<!--    <el-image alt="guest avatar" fit="cover" :src="guestAvatar">-->
<!--      <template #placeholder>-->
<!--        <div class="image-slot">Loading<span class="dot">...</span></div>-->
<!--      </template>-->
<!--      <template #error>-->
<!--        <div class="image-slot">-->
<!--          <i class="el-icon-picture-outline"></i>-->
<!--        </div>-->
<!--      </template>-->
<!--    </el-image>-->
<!--    <p class="comment-content">-->
<!--      {{ guestName }}于{{ commentTime-->
<!--      }}<a :href="commentOnUrl" target="_blank">{{ commentOn }}</a-->
<!--      >上评论了{{ commentContent }}, {{ commentApproved }}-->
<!--    </p>-->
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
      commentOnUrl: this.commentItem.commentOnUrl
    };
  },
  computed: {
    guestName() {
      return ellipsisFormat(this.commentItem.authorName);
    },
    commentTime() {
      return timeAgo(datetimeFormat(this.commentItem.date));
    },
    commentOn() {
      return ellipsisFormat(this.commentItem.postName);
    },
    commentContent() {
      return ellipsisFormat(this.commentItem.content);
    },
    commentApproved() {
      return this.commentItem.approved ? '已经被通过' : '尚未被通过';
    }
  },
  mounted() {
    console.log('comment list item');
    console.log(this.commentItem);
  }
});
</script>

<style lang="scss" scoped></style>
