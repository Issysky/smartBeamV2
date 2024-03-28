<!-- 临水临电三级路由 -->
<template>
  <div class="equip-water-electric-wrapper">
    <LabelType1 :label="'临水临电监测'" :eng="'Water Electric'"></LabelType1>
    <div class="card-wrapper">
      <div class="card" v-for="(item, index) in cardArr">
        <div class="label">{{ item.label }}</div>
        <div class="value" :class="index % 2 == 0 ? 'color1' : 'color2'">
          {{ item.value }}
          <p class="unit">{{ index % 2 == 0 ? 'kw/h' : 'm³' }}</p>
        </div>
      </div>
    </div>
    <div class="chart-wrapper-1">
      <ChartWaterLine />
      <ChartWaterBar />
    </div>
    <div class="chart-wrapper-2">
      <ChartElectricLine />
      <ChartElectricBar />
    </div>
  </div>
</template>

<script setup lang="js">
import { ref, onMounted } from 'vue'
import LabelType1 from '@renderer/components/LabelType1.vue'
import ChartWaterLine from './components/ChartWaterLine.vue'
import ChartElectricLine from './components/ChartElectricLine.vue'
import ChartElectricBar from './components/ChartElectricBar.vue'
import ChartWaterBar from './components/ChartWaterBar.vue'

const cardArr = [
  {
    label: '总临电用电量',
    value: '1000'
  },
  {
    label: '总临水用水量',
    value: '500'
  },
  {
    label: '当前节点用电量',
    value: '200'
  },
  {
    label: '当前节点用水量',
    value: '30'
  }
]
</script>
<style scoped lang="less">
.equip-water-electric-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .card-wrapper {
    width: 60%;
    height: 10%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 20px;
    margin-top: 20px;
    .card {
      width: 200px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      border-radius: 15px;
      box-shadow: 7px 7px 15px 0px rgba(0, 0, 0, 0.1);
      .label {
        width: 80%;
        height: 40%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 20px;
        color: var(--font-level-13);
        font-weight: 600;
      }
      .value {
        width: 100%;
        height: 60%;
        display: flex;
        justify-content: center;
        font-size: 24px;
        color: var(--font-level-13);
        display: flex;
        align-items: center;
        .unit {
          margin-left: 5px;
          font-size: 16px;
          color: var(--font-level-13);
        }
      }
      .color1 {
        color: var(--color-warning);
      }
      .color2 {
        color: var(--color-primary);
      }
    }
  }
  .chart-wrapper-1 {
    width: 100%;
    height: 35%;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .chart-wrapper-2 {
    width: 100%;
    height: 35%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>
