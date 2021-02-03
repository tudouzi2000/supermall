<template>
 <div id="home">
    <nav-bar class="home-nav"><template v-slot:center><div>购物街</div></template></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-range :ranges="recommends"></home-range>
 </div>

</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import HomeSwiper from './childComps/HomeSwiper.vue'
import HomeRange from './childComps/HomeRange.vue'

import {getHomeMultidata} from 'network/home'
export default {
name:"Home",
components:{
  NavBar,
  HomeSwiper,
  HomeRange
},
data(){
  return{
    banners:{},
    recommends:{}
  }
},
created() {
  getHomeMultidata().then(res=>{
    console.log(res)
    this.banners = res.data.banner;
    this.recommends =res.data.recommend;
  })
}
}

</script>

<style>
  .home-nav{
    background: var(--color-tint);
    color: #fff;
  }
</style>