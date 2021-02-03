<template>
  <div id="range" >
    <div v-for="(item,id) in ranges.list" :key="id" class="range-item">
    <a :href="item.link">
      <img :src="item.image" alt="图片">
    </a>
     <div>{{item.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
name:'HomeRange',
props:{
  ranges:{
    type:Object,
    default(){
      return {
        
      }
    }
  }
}
}
</script>

<style>
 #range{
   display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;

    padding: 10px 0 20px;
    border-bottom: 10px solid #eee;
 }
 .range-item{
   flex: 1;
 }
 .range-item img{
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
 }
</style>