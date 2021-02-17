<template>
  <div id="home">
    <nav-bar class="home-nav"
      ><template v-slot:center><div>购物街</div></template></nav-bar
    >
    <tab-controll
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControll1"
      class="tab-controll"
      v-show="TabControllFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="homeScroll"
      @pullingUp="imageLoad"
    >
      <home-swiper
        :banners="banners"
        @SwiperImageHasLoad="SwiperImageHasLoad"
      ></home-swiper>
      <home-range :ranges="recommends"></home-range>
      <home-feature />
      <tab-controll
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControll"
      />
      <goods-list :goodsList="currentTypes"></goods-list>
    </scroll>
    <back-top @click.native="backTopClick" v-show="isShow"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper.vue";
import HomeRange from "./childComps/HomeRange.vue";
import HomeFeature from "./childComps/HomeFeature.vue";

import NavBar from "components/common/navbar/NavBar.vue";
import TabControll from "components/content/TabControll.vue";
import GoodsList from "components/content/Goods/GoodsList.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import BackTop from "components/content/BackTop/BackTop.vue";

import { getHomeMultidata } from "network/home";
import { getHomeGoods } from "network/home";
import { debounce } from "common/Utils";
export default {
  name: "Home",
  components: {
    HomeSwiper,
    HomeRange,
    HomeFeature,
    NavBar,
    TabControll,
    GoodsList,
    Scroll,
    BackTop,
    debounce,
  },
  data() {
    return {
      banners: {},
      recommends: {},
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShow: false,
      TabControllTop: 0,
      TabControllFixed: false,
    };
  },
  computed: {
    currentTypes() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    /*
    事件监听相关的方法
  */
    /* 根据index点击不同的div,向静态服务器请求不同的数据进行加载(根据type) */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControll.currentIndex = index;
      this.$refs.tabControll1.currentIndex = index;
    },
    /* 返回顶部的方法 scrollTo被封装在了scroll实例内部 */
    backTopClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    homeScroll(position) {
      // 1.判断backtop的滚动距离是否大于1000
      this.isShow = -position.y > 1000;
      //  2.判断tabControll的滚动距离是否大于它的offsetTop
      this.TabControllFixed = -position.y > this.TabControllTop;
    },
    /* 监听是否需要下拉事件 并加载相关的数据 */
    imageLoad() {
      this.getHomeGoods(this.currentType);
    },
    /* 2.获取tabControll的offsetTop高度 */
    SwiperImageHasLoad() {
      this.TabControllTop = this.$refs.tabControll.$el.offsetTop;
      // console.log(this.$refs.tabControll.$el.offsetTop);
    },
    /*
  请求数据相关的访问
  */
    // 请求主页轮播图相关数据
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res)
        this.banners = res.data.banner;
        this.recommends = res.data.recommend;
      });
    },
    // 请求商品数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        /* 把从当前的type类型的goods中请求到的数据添加到list列表中 */
        const goods = res.data.list;
        this.goods[type].list.push(...goods);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
      });
    },
  },
  created() {
    /* 获取相关数据 */
    this.getHomeMultidata();
    this.getHomeGoods("sell");
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
  },
  mounted() {
    /* 1.监听事件总线  不要在created周期函数里拿DOM 可能还没渲染好*/
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    this.$bus.$on("BsRefresh",() => {
      // this.$refs.scroll.refresh();
      refresh();
    });
  },
  destroyed() {
    // console.log("home destroy")
  },
  /* 保留当前页面的状态 */
 activated() {
    this.$refs.scroll.scrollTo(0,this.saveY,0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    /* 保留离开页面时的状态 */
    this.saveY = this.$refs.scroll.getScrollY();
  },
};
</script>

<style scoped>
#home {
  /* viewport height 视口高度 vh  */
  height: 100vh;
}
.home-nav {
  background: var(--color-tint);
  color: #fff;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
/* .content{
   height: calc(100% - 44px);
   overflow: hidden;
} */
.tab-controll {
  position: relative;
  z-index: 9;
}
</style>