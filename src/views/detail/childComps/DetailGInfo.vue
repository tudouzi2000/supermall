<template>
  <div v-if="Object.keys(gInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{ gInfo.desc }}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{ gInfo.detailImage[0].key }}</div>
    <div class="info-list">
      <img
        v-for="(item, index) in gInfo.detailImage[0].list"
        :key="index"
        :src="item"
        alt=""
        @load="goodsImgLoad"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGInfo",
  props: {
    gInfo: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      imagesLength: 0,
      counter: 0,
    };
  },
  methods: {
    goodsImgLoad() {
      // 判断，所有的图片都加载完了，那么进行一次回调就可以了
      if (++this.counter === this.imagesLength) {
        this.$emit("goodsImgLoad");
      }
    },
  },
  watch: {
    detailInfo() {
      // 获取图片的个数
      this.imagesLength = this.detailInfo.detailImage[0].list.length;
    },
  },
};
</script>

<style scoped>
.goods-info {
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;
}

.info-desc {
  padding: 0 15px;
}

.info-desc .start,
.info-desc .end {
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
  position: relative;
}

.info-desc .start {
  float: left;
}

.info-desc .end {
  float: right;
}

.info-desc .start::before,
.info-desc .end::after {
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #333;
  bottom: 0;
}

.info-desc .end::after {
  right: 0;
}

.info-desc .desc {
  padding: 15px 0;
  font-size: 14px;
}

.info-key {
  margin: 10px 0 10px 15px;
  color: #333;
  font-size: 15px;
}

.info-list img {
  width: 100%;
}
</style>
