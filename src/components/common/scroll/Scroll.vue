<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    // 封装返回顶部方法
    scrollTo(x, y, time = 500) {
     this.scroll && this.scroll.scrollTo(x, y*1, time);
    },
    // 封装betterscroll的刷新方法
    refresh(){
    this.scroll && this.scroll.refresh();
 
    },
    //  封装下拉请求方法
    finishPullUp() {
     this.scroll && this.scroll.finishPullUp();
    },
    // 封装记录当前模块Y的位置
    getScrollY(){
     return  this.scroll ? this.scroll.y : 0 
    }
  },
  mounted() {
    // ref如果是绑定在组件中的，那么通过this.$refs.refname获取到的是一个组件对象
    // ref如果是绑定在元素中的，那么通过this.$refs.refname获取到的是一个元素对象
    /* 创建BScroll对象 */
    (this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType, //设置监听触摸滚动的方式
      click: true, //div等元素的点击有效
      mouseWheel: true, //鼠标可以滑动的设置,
      pullUpLoad: this.pullUpLoad, //是否需要设置上拉
    })),
      //  监听滚动的位置
      this.scroll.on("scroll", (position) => {
        this.$emit("scroll", position);
      });
    //  监听上拉请求事件
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
  }, 
};
</script>

<style>
</style>