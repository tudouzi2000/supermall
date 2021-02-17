<template>
<div class="goodsList"> 
<goods-list-item v-for="(item,index) in goodsList" :key="index"  :goods="item"> </goods-list-item>
</div>
</template>

<script>
import GoodsListItem from "./GoodsListItem"
export default {
name:'GoodsList',
props:{
  goodsList:{
     type:Array,
      default:[]
  }
},
components:{
  GoodsListItem
}
}
</script>

<style scoped>
   .goodsList{
     display: flex;
     flex-wrap: wrap;
     justify-content: space-between;
     padding: 2px;
   }
</style>