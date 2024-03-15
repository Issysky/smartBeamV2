<!-- 生产数据 架桥页面 三级路由 -->
<template>
  <div class="production-bridge-view">
    <LabelType1 :label="'架桥地图'" :eng="'Production Build'" />
    <!-- 信息卡片区域 -->
    <div class="info-wrapper">
      <!-- 信息卡片 -->
      <div class="info-card">
        <!-- <p class="label">当前架设进度</p> -->
        <div class="value-wrapper">
          <div class="total">
            <p class="title">当前桥梁架梁数：</p>
            <p class="num">12</p>
            <p class="unit">片</p>
          </div>
          <div class="complate">
            <p class="title">当前桥梁梁体总数：</p>
            <p class="num">40</p>
            <p class="unit">片</p>
          </div>
          <div class="progress-wrapper">
            <span>当前桥梁架设进度:</span>
            <div class="progress">
              <el-progress
                :text-inside="true"
                :stroke-width="16"
                :percentage="30"
                status="success"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="three-wrapper">
      <ThreeBridge />
    </div>
    <div class="content">
      <TableBridge />
    </div>
  </div>
</template>

<script setup lang="js">
import ThreeBridge from './components/ThreeBridge.vue'
import LabelType1 from '@renderer/components/LabelType1.vue'
import TableBridge from './components/TableBridge.vue'
import { useProductionBuildStore } from '@renderer/stores/homeStore/productionStore/production_build'
import { onMounted, ref } from 'vue'

const productionBuildStore = useProductionBuildStore()

onMounted(() => {
  productionBuildStore.getBridgeData()
})
</script>
<style scoped lang="less">
.production-bridge-view {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .info-wrapper {
    width: 80%;
    height: 10%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: absolute;
    top: 120px;
    left: 70px;
    color: var(--font-level-1);
    .info-card {
      width: 400px;
      height: 100%;
      // background-color: #fff;
      border-radius: 10px;
      // box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      .value-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        font-size: 16px;
        .title{
          width: 150px;
        }
        .total {
          width: 100%;
          flex: 1;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .unit {
            margin-left: 3px;
            font-size: 14px;
          }
          .num {
            font-size: 22px;
            color: var(--color-success);
          }
        }
        .complate {
          width: 100%;
          display: flex;
          flex: 1;
          justify-content: flex-start;
          align-items: center;
          .unit {
            margin-left: 3px;
            font-size: 14px;
          }
          .num {
            
            font-size: 22px;
            color: var(--color-primary);
          }
        }
        .progress-wrapper {
          width: 100%;
          display: flex;
          flex: 1;
          align-items: center;
          .progress {
            margin-left: 10px;
            width: 160px;
          }
        }
      }
    }
  }
  .three-wrapper {
    width: 1500px;
    height: 40%;
    margin-top: 30px;
  }
  .content {
    width: 100%;
    height: 60%;
  }
}
</style>
