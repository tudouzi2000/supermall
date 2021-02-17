<template>
  <div v-if="Object.keys(params).length !== 0" class="param-info">
    <!-- table是一个数组 table里面存放着数组,因此每一个tr又是一个数组，而td则是数组中的元素 -->
    <table v-for="(table, index) in params.rules" :key="index">
      <tr v-for="(tr, index1) in table" :key="index1">
        <td v-for="(td, index2) in tr" :key="index2">
          {{ td }}
        </td>
      </tr>
    </table>
    <table>
      <tr v-for="(info,index) in params.infos" :key="index" >
         <td class="info-param-key">{{info.key}}</td>
        <td class="param-value">{{info.value}}</td>
      </tr>
    </table>
     <div class="info-img" v-if="params.images.length !== 0">
      <img :src="params.images" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParamInfo",
  props: {
    params: {
      type: Object,
      default: {},
    },
  },
};
</script>

<style  scoped>
.param-info {
    padding: 20px 15px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
  }

  .param-info table {
    width: 100%;
    border-collapse: collapse;
  }

  .param-info table tr {
    height: 42px;
  }

  .param-info table tr td {
    border-bottom: 1px solid rgba(100,100,100,.1);
  }

  .info-param-key {
    /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
    width: 95px;
  }

  .info-param {
    border-top: 1px solid rgba(0,0,0,.1);
  }

  .param-value {
    color: #eb4868
  }

  .info-img img {
    width: 100%;
  }
</style>