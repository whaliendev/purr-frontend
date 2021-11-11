<template>
  <div class="footer-info-container">
    <p class="sakura-icon"></p>
    <p class="author-tag">
      Proudly crafted with
      <font-awesome-icon
        :icon="['fas', 'heart']"
        :style="{ color: '#e74c3c' }"
      />
      by Purr Group
    </p>
    <div class="copyright-container">
      <span class="developer-info"
        >&copy;2021&nbsp;<a href="https://whalien.space" target="_blank"
          >Whalien</a
        ></span
      >&nbsp;&nbsp;&nbsp;<span class="beian-info"
        ><a href="https://beian.miit.gov.cn/" target="_blank" rel="nofollow"
          >鄂ICP备2021013827</a
        >
      </span>
    </div>
    <div class="sponsor-container"></div>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
.footer-info-container {
  font-family: var(--site-font-family);
  color: #b9b9b9;
  font-size: 13px;
  max-width: 800px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  a {
    color: #bbbbbb;
    font-weight: 700;
  }

  .copyright-container {
    font-weight: bold;
  }
}

.author-tag {
  font-size: 14px;
  color: #aaa;
  font-weight: bold;
  letter-spacing: 1px;
}

.sakura-icon {
  width: 30px;
  height: 30px;
  //opacity: 0.3;
  margin: 0 auto;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-image: url('../../assets/sakura.svg');
  animation: rotating 5s infinite linear;
}
</style>
