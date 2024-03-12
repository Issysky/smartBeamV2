<!-- 生产数据 架桥页面 三级路由 -->
<template>
  <div class="production-bridge-view">
    <LabelType1 :label="'架桥地图'" :eng="'Production Build'" />
    <!-- 信息卡片区域 -->
    <div class="info-wrapper">
      <!-- 信息卡片 -->
      <div class="info-card">
        <p class="label">当前架设进度</p>
        <div class="value-wrapper">
          <div class="value">
            <div class="total">
              <p class="title">当前架设数：</p>
              <p class="num">12</p>
              <p class="unit">片</p>
            </div>
            <div class="complate">
              <p class="title">当前总数：</p>
              <p class="num">40</p>
              <p class="unit">片</p>
            </div>
          </div>
          <div class="progress">
            <el-progress
              :text-inside="true"
              :stroke-width="24"
              :percentage="30"
              status="success"
            />
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
    .info-card {
      width: 400px;
      height: 100%;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .label {
        font-size: 20px;
        color: var(--font-level-13);
        font-weight: 600;
      }
      .value-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .value {
          width: 200px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 14px;
          .total {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            .unit {
              font-size: 20px;
              color: #333;
            }
            .num {
              font-size: 22px;
              color: var(--color-success);
            }
          }
          .complate {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            .unit {
              font-size: 20px;
              color: #333;
            }
            .num {
              font-size: 22px;
              color: var(--color-primary);
            }
          }
        }
        .progress {
          width: 160px;
        }
      }
    }
  }
  .three-wrapper {
    width: 1500px;
    height: 40%;
  }
  .content {
    width: 100%;
    height: 60%;
  }
}
</style>
