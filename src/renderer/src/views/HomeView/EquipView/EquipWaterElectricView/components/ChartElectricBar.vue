<!-- 用电柱状图 -->
<template>
    <div class="chart-electric-bar" ref="chartElectricBar"></div>
  </template>
  
  <script setup lang="js">
  import * as echarts from 'echarts'
  import { ref, onMounted } from 'vue'
  import { useEquipWaterElectricStore } from '@renderer/stores/homeStore/equipStore/equipWaterElectric'
  
  let chartElectricBar = ref(null)
  
  const equipWEStore = useEquipWaterElectricStore()
  
  onMounted(() => {
    setTimeout(() => {
      if (chartElectricBar.value) {
        let myChartElectricBar = echarts.init(chartElectricBar.value)
        equipWEStore.renderChart(myChartElectricBar, equipWEStore.electricBarOption.option)
      }
    }, 1000)
  })
  </script>
  <style scoped lang="less">
  .chart-electric-bar {
    width: 45%;
    height: 100%;
  }
  </style>
  