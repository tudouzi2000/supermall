<template>
  <div>
    <nav-bar>
      <template v-slot:left>
        <div @click="backClick" class="image">
          <img src="~assets/img/common/back.svg" alt="" />
        </div>
      </template>
      <template v-slot:center >
        <div class="title">
        <div v-for="(item, index) in titles" 
        :key="index"
         class="titleItem" 
         :class="{active:currentIndex===index}"
        @click="titleItemClick(index)">
        {{ item }}
        </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
export default {
  name: "DetailNavbar",
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex:0
    };
  },
  methods: {
    backClick() {
      this.$router.back();
    },
    titleItemClick(index){
      this.currentIndex = index
    }
  },
};
</script>

<style scoped>
.title {
  display: flex;
  font-size: 13px;
}
.titleItem {
  flex: 1;
}
.active{
  color: var(--color-high-text);
}
.image{
  margin-top: 5px;
}
</style>