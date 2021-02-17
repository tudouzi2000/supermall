<template>
    <swiper>
       <swiper-item v-for="(item,id) in banners.list" :key="id">
           <a :href="item.link">
             <img :src="item.image" alt="轮播图" @load="HomeSwiperImageLoad">
           </a>
       </swiper-item>
     </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'
export default {
name:'HomeSwiper',
components:{
  Swiper,
  SwiperItem
},
props:{
   banners:{
     type:Object,
     default(){
     return {}
     }
   }
},
data(){
 return{
    imageIsLoad:true
 }
},
methods:{
  HomeSwiperImageLoad(){
    if(this.imageIsLoad){
      this.$emit("SwiperImageHasLoad")
      this.imageIsLoad =false;
    }
  }
}
}
</script>

<style>

</style>