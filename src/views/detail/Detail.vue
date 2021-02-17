<template >
  <div id="detail">
    <detail-nav-bar class="detail-nav" />

    <scroll class="content" ref="scroll1">
      <detail-swiper :DetailSwiperImages="DetailSwiperImages" ></detail-swiper>
      <detail-base-info :goods="goods" ></detail-base-info>
      <detail-shop-info :shop="shop" ></detail-shop-info>
      <detail-g-info :gInfo="gInfo" @goodsImgLoad="goodsImgLoad" ></detail-g-info>
      <detail-param-info :params="goodsParams"></detail-param-info>
      <detail-comment-info :comment="comment"></detail-comment-info>
      <goods-list :goodsList="recommend"></goods-list>>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGInfo from "./childComps/DetailGInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue"
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import GoodsList from "components/content/Goods/GoodsList.vue";
import { getDetails, getRecommend,Goods, Shop ,Params} from "network/detail.js";


import Scroll from "components/common/scroll/Scroll.vue";
import BackTop from "components/content/BackTop/BackTop.vue";

export default {
  name: "Detail",
  data() {
    return {
      iid: " ",
      DetailSwiperImages: [],
      goods: {},
      shop: {},
      gInfo: {},
      goodsParams:{},
      comment:{},
      recommend:[]
    };
  },
  components: {
    getDetails,
    getRecommend,
    Goods,
    Shop,
    Scroll,
    BackTop,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGInfo,
   DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
  },
created() {
    // 1.保存传入的iid
    const iid= this.$route.params.iid;
     this.iid = iid
    // 根据iid请求详细的数据
    getDetails(this.iid).then((res) => {

      const data = res.result;
      console.log(data)
      // console.log(data);
      // 2.1 获取轮播图数据
      this.DetailSwiperImages = data.itemInfo.topImages;

      // 2.2获取商品信息数据
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 2.3获取店铺的信息
      this.shop = new Shop(data.shopInfo);

      //2.4 获取商品图片的数据
      this.gInfo = data.detailInfo;
      
      //2.5获取商品的参数数据
     this.goodsParams = new Params(data.itemParams.info,data.itemParams.rule);
      // 2.6获取评论的数据
      if (data.rate.cRate !== 0) {
            this.comment = data.rate.list[0];
          }
    });
     /* 获取详情数据 */
     getRecommend().then(res=>{
       const recommendData = res.data.list
       this.recommend = recommendData;
     })
  },
  methods: {
    goodsImgLoad() {
      this.$refs.scroll1.refresh();
    },
  },
};
</script>

<style scoped>
#detail {
 position: relative;
  z-index: 1;
  background-color: #fff;
  height: 100vh;
}
.detail-nav{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px);
  
}
</style>