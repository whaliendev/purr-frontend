<template>
  <div class="toggle-body">
    <div class="toggle-btn"></div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  props: {
    on: {
      type: Boolean,
      required: true
    }
  },
  setup() {
    onMounted(() => {
      const toggleBody = document.querySelector('.toggle-body');
      const toggleBtns = document.querySelectorAll('.toggle-btn');
      toggleBtns.forEach((toggleBtn) => {
        toggleBtn.addEventListener('click', () => {
          toggleBody.classList.toggle('toggle-body--on');
          toggleBtn.classList.toggle('toggle-btn--on');
          toggleBtn.classList.toggle('toggle-btn--scale');
        });
      });
    });
  }
});
</script>

<style lang="scss" scoped>
$green: var(--el-color-success);
$red: var(--el-color-danger);

$animateTime: 1.5s;
$easing: cubic-bezier(0.68, -0.15, 0.265, 1.35);
$iteration: 1;

.toggle-body {
  width: 48px;
  height: 30px;
  position: absolute;
  top: calc(50% - 30px / 2);
  left: calc(50% - 48px / 2);
  background: var(--light-admin-background-color);
  border: var(--el-border-base);
  border-radius: 20px;
  transform: rotate(0deg);
  transition: $animateTime $easing;
}

.toggle-body--on {
  transform: rotate(180deg);
  transition: $animateTime $easing;
}

.toggle-btn {
  width: 20px;
  height: 20px;
  position: absolute;
  top: calc(50% - 20px / 2);
  left: calc(27% - 20px / 2);
  background: white;
  border-radius: 50%;
  background: $red;
  cursor: pointer;
  transform: rotate(0deg);
  transform-origin: 130% 115%;
  transition: $animateTime $easing;
}
.toggle-btn--on {
  transition: $animateTime $easing;
  transform: rotate(-357deg);
  background: $green;
  transform-origin: 130% 150%;
}
</style>
