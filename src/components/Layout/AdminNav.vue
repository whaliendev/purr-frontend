<template>
  <nav>
    <div class="purr-logo">Purr</div>
    <ul class="menu">
      <li class="menu-item">
        <router-link :to="{ name: 'dashboard' }">
          <font-awesome-icon :icon="['fas', 'th-large']" />
          首页
        </router-link>
      </li>
      <!--  submenu of articles  -->
      <li class="sub-menu">
        <div class="sub-menu__title">
          <font-awesome-icon :icon="['fas', 'pen']" />
          <span>文章</span>
          <font-awesome-icon :icon="['fas', 'chevron-down']" />
        </div>
        <ul class="menu">
          <li class="menu-item">
            <router-link :to="{ name: 'article-manage' }">
              管理文章
            </router-link>
          </li>
          <li class="menu-item">
            <router-link :to="{ name: 'article-compose' }">
              写作文章
            </router-link>
          </li>
          <li class="menu-item">
            <router-link :to="{ name: 'article-tag' }"> 标签 </router-link>
          </li>
        </ul>
      </li>
      <!-- end of sub menu of articles -->
      <li class="menu-item">
        <router-link :to="{ name: 'comment' }">
          <font-awesome-icon :icon="['fas', 'comment-dots']" />
          评论
        </router-link>
      </li>
      <li class="menu-item">
        <router-link :to="{ name: 'moment' }">
          <font-awesome-icon :icon="['fas', 'paper-plane']" />
          动态
        </router-link>
      </li>
      <!-- pages -->
      <li class="sub-menu">
        <div class="sub-menu__title">
          <font-awesome-icon :icon="['fas', 'file-alt']" />
          <span>页面</span>
          <font-awesome-icon :icon="['fas', 'chevron-down']" />
        </div>
        <ul class="menu">
          <li class="menu-item">
            <router-link :to="{ name: 'page-manage' }"> 管理页面 </router-link>
          </li>
          <li class="menu-item">
            <router-link :to="{ name: 'page-design' }"> 设计页面 </router-link>
          </li>
        </ul>
      </li>
      <!-- end of pages -->
      <li class="menu-item">
        <router-link :to="{ name: 'media' }">
          <font-awesome-icon :icon="['fas', 'music']" />
          多媒体库
        </router-link>
      </li>
      <li class="menu-item">
        <router-link :to="{ name: 'link' }">
          <font-awesome-icon :icon="['fas', 'link']" />
          链接
        </router-link>
      </li>
      <!-- settings -->
      <li class="sub-menu">
        <div class="sub-menu__title">
          <font-awesome-icon :icon="['fas', 'wrench']" />
          <span>设置</span>
          <font-awesome-icon :icon="['fas', 'chevron-down']" />
        </div>
        <ul class="menu">
          <li class="menu-item">
            <router-link :to="{ name: 'settings-menu' }">
              菜单设置
            </router-link>
          </li>
          <li class="menu-item">
            <router-link :to="{ name: 'settings-user' }">
              用户设置
            </router-link>
          </li>
          <li class="menu-item">
            <router-link :to="{ name: 'settings-app' }"> 系统设置 </router-link>
          </li>
        </ul>
      </li>
      <!-- end of settings -->
    </ul>
  </nav>
</template>

<script></script>

<style lang="scss" scoped></style>
