<template>
  <nav>
    <ul class="menu">
      <li>
        <div class="menu-item">
          <router-link :to="{ name: 'dashboard' }">
            <font-awesome-icon :icon="['fas', 'th-large']" />
            首页
          </router-link>
        </div>
      </li>
      <li>
        <div class="sub-menu">
          <div class="sub-menu__title">
            <font-awesome-icon :icon="['fas', 'pen']" />
            <span>文章</span>
            <font-awesome-icon :icon="['fas', 'chevron-down']" />
          </div>
          <ul class="menu">
            <li>
              <div class="menu-item">
                <router-link :to="{ name: 'article-tag' }"> 标签 </router-link>
              </div>
            </li>
            <div class="menu-item">
              <router-link :to="{ name: 'article-manage' }">
                管理文章
              </router-link>
            </div>
            <div class="menu-item">
              <router-link :to="{ name: 'article-compose' }">
                写作文章
              </router-link>
            </div>
          </ul>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script></script>

<style lang="scss"></style>
