<template>
  <div @click="btnClick()" class="tab-bar-item">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>

    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script> 
export default {
  name: "TabBarItem",
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'red'
    }
  },
  data() {
    return {
      // isActive: true,
    };
  },
  computed:{
 isActive(){
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle(){
     return this.isActive ? {color:this.activeColor}:{ };
    }
  },
  methods:{
    btnClick(){
      // 后缀用来抛出错误
     return this.$router.push(this.path).catch(err=>{});
  
    }, 
   
  }
};
</script>

<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  font-size: 14px;
  height: 49px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
}
.active {
  color: red;
}
</style>