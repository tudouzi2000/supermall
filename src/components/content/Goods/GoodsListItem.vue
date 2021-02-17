<template>
  <div class="goods" @click="itemClick">
    <img :src="Imageget" alt="" @load="imageLoad"/>
    <div class="goods-info">
      <p>{{ goods.title }}</p>
      <span class="price">{{goods.price}}</span>
      <span class="collect">{{goods.cfav}}</span>
    </div>
  </div>
</template>

<script >
export default {
  props: {
    goods: {
      type: Object,
      default: {},
    },
  },
  computed:{
   Imageget(){
     return this.goods.image || this.goods.show.img
   }
  },
  methods:{
    imageLoad(){
      this.$bus.$emit("BsRefresh");
    },
    itemClick(){
       this.$router.push('/detail/' + this.goods.iid);
    }
  }
};
</script>

<style scoped>
 .goods {
   /* 将文字和价钱等放在padding-bottom里 */
    padding-bottom: 40px; 
     position: relative;
       width: 48%;
  }
  .goods img {
   width: 100%;
   border-radius: 5px;

  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
   text-overflow: ellipsis; 
    white-space: nowrap;
    margin-bottom: 3px;
    color: var(--color-text);
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    /* 第一个0 background是背景颜色  第二个0是position定位 后面两个14px 14px 前面的是设置宽度，后面的是设置高度*/
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px; 
  }
</style>