<template>
  <div class="app-drag" :style="style">
    <div class="background" />
    <div class="text" id="sv-text">
      <slot name="content">
        {{ content }}
      </slot>
    </div>
    <div class="slider" :style="{ height, width: sliderWidth }">
      <slot v-if="icon" name="icon">
        {{ icon }}
      </slot>
      <slot v-else name="icon"> &gt;&gt; </slot>
    </div>
  </div>
</template>
<script>
const debounce = (function () {
  let timer = 0;
  return function (callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback, ms);
  };
})();
export default {
  name: 'SliderVerification',
  props: {
    isLocked: {
      // 解锁状态
      type: [String, Boolean, Number, Object],
      required: true,
      default: false
    },
    isSuccessful: {
      type: [String, Boolean, Number, Object],
      default: false
    },
    icon: {
      // 滑块的文本样式，如果使用slot的方式，则可以不传该属性
      type: [String],
      default: null
    },
    activeValue: {
      // 验证成功后的值
      type: [String, Boolean, Number, Object],
      default: true
    },
    inactiveValue: {
      // 验证成功前的值
      type: [String, Boolean, Number, Object],
      default: false
    },
    content: {
      // 验证成功前的提示文字
      type: [String],
      default: `请拖动滑块验证`
    },
    successContent: {
      // 验证成功后的提示文字
      type: [String],
      default: `验证通过`
    },
    contentColor: {
      // 初始提示文字的颜色
      type: [String],
      default: `#c0c4cc`
    },
    successColor: {
      // 滑动后提示文字的颜色
      type: [String],
      default: `#fff`
    },
    height: {
      // 默认高度
      type: [String],
      default: `40px`
    },
    sliderWidth: {
      // 默认宽度
      type: [String],
      default: `16%`
    },
    background: {
      // 初始背景颜色
      type: [String],
      default: `#fff`
    },
    textColor: {
      // 初始滑块的文字颜色
      type: [String],
      default: `#fff`
    },
    sliderBg: {
      // 滑动后背景颜色
      type: [String],
      default: `#fff`
    },
    sliderColor: {
      // 滑动后的文字颜色
      type: [String],
      default: `#fff`
    },
    sliderSuccessColor: {
      // 验证成功后的文字颜色
      type: [String],
      default: `#fff`
    },
    successBg: {
      // 验证成功的背景颜色
      type: [String],
      default: `lightgreen`
    }
  },
  emits: ['update:isSuccessful'],
  watch: {
    isLocked(v) {
      // 重置样式
      !v && this.init();
    }
  },
  computed: {
    style() {
      const { height, background } = this;
      return { height, 'line-height': height, background };
    },
    resize() {
      return document.body.clientWidth;
    }
  },
  mounted() {
    this.init();
    if (window) {
      window.onresize = () => {
        debounce(() => {
          this.init();
        }, 120);
      };
    }
    this.selector('#sv-text').addEventListener('selectstart', () => false);
  },
  methods: {
    /**
     * 定义一个获取DOM元素的方法-选择器
     */
    selector(selector) {
      return document.querySelector(selector);
    },
    /**
     * 初始化
     */
    init() {
      if (this.isSuccessful) return;

      const box = this.selector('.app-drag'); // 容器
      const background = this.selector('.background'); // 背景
      const text = this.selector('.text'); // 文字
      const slider = this.selector('.slider'); // 滑块
      const distance =
        box.offsetWidth && slider.offsetWidth
          ? box.offsetWidth - slider.offsetWidth
          : 0; // 滑动成功的宽度（距离）

      // 初始化的时候 清除所有属性
      slider.style.transition = null;
      if (this.icon) slider.innerHTML = this.icon;
      background.style.transition = null;
      background.style.background = this.sliderBg;
      slider.style.left = 0 + 'px';
      background.style.width = 0 + 'px';
      text.innerHTML = this.content;
      text.style.color = this.contentColor;
      slider.style.color = this.sliderColor;

      // 二、给滑块注册鼠标按下事件
      slider.onmousedown = (event) => {
        // 1. 设置滑动后提示文字属性
        text.style.color = this.successColor;
        // 2.鼠标按下之前必须清除掉后面设置的过渡属性
        slider.style.transition = null;
        background.style.transition = null;
        // 说明：clientX 事件属性会返回当事件被触发时，鼠标指针向对于浏览器页面(或客户区)的水平坐标。
        // 3.当滑块位于初始位置时，得到鼠标按下时的水平位置
        const ev = event || window.event;
        const downX = ev.clientX;
        // 三、给文档注册鼠标移动事件
        document.onmousemove = (e) => {
          const evt = e || window.event; //是为了更好的兼容IE浏览器和非ie浏览器。在ie浏览器中,window.event是全局变量,在非ie中，就需要自己传入一个参数来获取event啦，所以就有了var e = e||window.event
          // 1.获取鼠标移动后的水平位置
          const moveX = evt.clientX;
          // 2.得到鼠标水平位置的偏移量（鼠标移动时的位置 - 鼠标按下时的位置）
          let offsetX = moveX - downX;
          // 3.在这里判断一下：鼠标水平移动的距离 与 滑动成功的距离 之间的关系
          if (offsetX > distance) {
            offsetX = distance; // 如果滑过了终点，就将它停留在终点位置
          } else if (offsetX < 0) {
            offsetX = 0; // 如果滑到了起点的左侧，就将它重置为起点位置
          }
          // 4.根据鼠标移动的距离来动态设置滑块的偏移量和背景颜色的宽度
          slider.style.left = offsetX + 'px';
          background.style.width = offsetX + 'px';
          // 如果鼠标的水平移动距离 = 滑动成功的宽度
          if (offsetX === distance) {
            // 1.设置滑动成功后的样式
            text.innerHTML = this.successContent;
            text.style.color = this.successColor;
            slider.style.color = this.sliderSuccessColor;
            background.style.background = this.successBg;

            // 成功后，清除掉鼠标按下事件和移动事件（因为移动时并不会涉及到鼠标松开事件）
            slider.onmousedown = null;
            document.onmousemove = null;
            // 更新isSuccessful的状态
            this.$emit('update:isSuccessful', this.activeValue);
          }
        };
        //四、给文档注册鼠标松开事件
        document.onmouseup = () => {
          // 如果鼠标松开时，滑到了终点，则验证通过
          if (this.isSuccessful === this.activeValue) return true;
          // 反之，则将滑块复位（设置了1s的属性过渡效果）
          text.style.color = this.contentColor;
          slider.style.left = 0;
          background.style.width = 0;
          slider.style.transition = 'left 1s ease';
          background.style.transition = 'width 1s ease';
          // 只要鼠标松开了，说明此时不需要拖动滑块了，那么就清除鼠标移动和松开事件。
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
      /* 移动端  */
      // 二、给滑块注册鼠标按下事件
      slider.ontouchstart = (event) => {
        const touch = event.changedTouches[0];
        // 1. 设置滑动后提示消息的样式
        text.style.color = this.successColor;
        // 2.鼠标按下之前必须清除掉后面设置的过渡属性
        slider.style.transition = null;
        background.style.transition = null;
        // 说明：clientX 事件属性会返回当事件被触发时，鼠标指针向对于浏览器页面(或客户区)的水平坐标。
        // 3.当滑块位于初始位置时，得到鼠标按下时的水平位置
        const downX = touch.pageX;
        // console.log(`downX`,downX);
        // 三、给文档注册鼠标移动事件
        document.ontouchmove = (e) => {
          const tev = e.changedTouches[0];
          // 1.获取鼠标移动后的水平位置
          const moveX = tev.pageX;
          // 2.得到鼠标水平位置的偏移量（鼠标移动时的位置 - 鼠标按下时的位置）
          let offsetX = moveX - downX;
          // 3.在这里判断一下：鼠标水平移动的距离 与 滑动成功的距离 之间的关系
          if (offsetX > distance) {
            offsetX = distance; // 如果滑过了终点，就将它停留在终点位置
          } else if (offsetX < 0) {
            offsetX = 0; // 如果滑到了起点的左侧，就将它重置为起点位置
          }
          // 4.根据鼠标移动的距离来动态设置滑块的偏移量和背景颜色的宽度
          slider.style.left = offsetX + 'px';
          background.style.width = offsetX + 'px';
          // 如果鼠标的水平移动距离 = 滑动成功的宽度
          if (offsetX === distance) {
            // 1.设置滑动成功后的样式
            text.innerHTML = this.successContent;
            text.style.color = this.successColor;
            slider.style.color = this.sliderSuccessColor;
            background.style.background = this.successBg;

            // 成功后，清除掉鼠标按下事件和移动事件（因为移动时并不会涉及到鼠标松开事件）
            slider.ontouchstart = null;
            document.ontouchmove = null;
            // 3.更新isSuccessful的状态
            this.$emit('update:isSuccessful', this.activeValue);
          }
        };
        // 四、给文档注册鼠标松开事件
        document.ontouchend = () => {
          // 如果鼠标松开时，滑到了终点，则验证通过
          if (this.isSuccessful === this.activeValue) return true;
          // 反之，则将滑块复位（设置了1s的属性过渡效果）
          text.style.color = this.contentColor;
          slider.style.left = 0;
          background.style.width = 0;
          slider.style.transition = 'left 1s ease';
          background.style.transition = 'width 1s ease';
          // 只要鼠标松开了，说明此时不需要拖动滑块了，那么就清除鼠标移动和松开事件。
          document.ontouchmove = null;
          document.ontouchend = null;
        };
      };
    }
  }
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.app-drag {
  height: 2.5rem;
  line-height: 2.5rem;
  background-color: #e8e8e8;
  position: relative;
  margin: 0 auto;
  border-radius: var(--el-border-radius-base);
  overflow: hidden;
}
.background {
  width: 2.5rem;
  height: 100%;
  position: absolute;
  opacity: 0.98;
  /*border-radius: var(--el-border-radius-base);*/
}
.text {
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;
  user-select: none;
}
.slider {
  width: 2.5rem;
  height: 100%;
  position: absolute;
  border-top-right-radius: var(--el-border-radius-base);
  border-bottom-right-radius: var(--el-border-radius-base);
  /*border: 1px solid #ccc;*/
  text-align: center;
  background-color: var(--el-color-danger);
  user-select: none;
  color: var(--el-color-white);
  cursor: pointer;
}
</style>
