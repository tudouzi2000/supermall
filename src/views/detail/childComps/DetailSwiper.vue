<template>
  <div >
  <swiper class="DetailSwiper" v-if=" DetailSwiperImages.length"> 
    <swiper-item  v-for="(item,index) in  DetailSwiperImages" :key="index" >
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
  </div>
</template>

<script>
import Swiper from "components/common/swiper/Swiper.vue"
import SwiperItem from "components/common/swiper/SwiperItem"
export default {
name:"DetailSwiper",
components:{
  Swiper,
  SwiperItem
},
props:{
  DetailSwiperImages:{
    type:Array,
    default:[]
  }
}
}
</script>

<style scoped>
  .DetailSwiper{
    height: 300px;
    width: 100%;
     text-align: center;
  }
</style>