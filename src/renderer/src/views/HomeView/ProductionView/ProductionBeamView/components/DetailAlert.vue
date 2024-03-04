<!-- 图表详情弹窗 出现在生产数据 梁体数据图表页面 -->
<template>
  <div class="card-wrapper">
    <!-- 遮罩 -->
    <div class="mask"></div>
    <!-- 卡片 -->
    <div class="card">
      <!-- 标题 -->
      <div class="label-wrapper">
        <p class="label">梁体数据详情</p>
        <div class="close">
          <el-icon @click="productionBeamStore.showDetail"><CloseBold /></el-icon>
        </div>
      </div>
      <div class="content-wrapper">
        <!-- 内容区1 -->
        <div class="content1" v-for="(item, index) in productionBeamStore.detailContent" :key="index">
          <p class="label">{{ item.name }}</p>
          <p class="value">{{ productionBeamStore.detailData.data[item.key] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { useProductionBeamStore } from '@renderer/stores/homeStore/productionStore/production_beam_data.js'
import { onMounted, ref, defineProps } from 'vue'

// 引入store
const productionBeamStore = useProductionBeamStore()
onMounted(() => {
  console.log(productionBeamStore.detailData,'productionBeamStore.detailData')
})

</script>
<style scoped lang="less">
.card-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0%;
  display: flex;
  justify-content: center;
  align-items: center;

  .mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
  .card {
    width: 700px;
    height: 95%;
    background-color: #fff;
    z-index: 2;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);

    .label-wrapper {
      width: 90%;
      height: 7%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #ccc;
      margin-bottom: 15px;
      .label {
        width: 90%;
        font-size: 26px;
        font-weight: 600;
      }
      .close {
        width: 10%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        color: #000;
      }
    }
    .content-wrapper {
      width: 95%;
      height: 90%;
      padding-left: 5%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      overflow-y: auto;
      overflow-x: hidden;
      color: var(--font-level-9);

      .content1 {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: flex-start;
        margin-bottom: 15px;
        font-size: 14px;
        .label {
          margin-right: 10px;
        }
      }
      .table {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;

        .title {
          width: 100%;
          font-size: 22px;
          font-weight: 600;
          padding-bottom: 10px;
          border-bottom: 1px solid #ccc;
          margin-bottom: 5px;
        }
        .content2 {
          width: 100%;
          height: auto;
          display: flex;
          justify-content: flex-start;
          margin-bottom: 10px;
          font-size: 14px;
          .label {
            margin-right: 10px;
          }
        }
      }
    }
  }
}
</style>
