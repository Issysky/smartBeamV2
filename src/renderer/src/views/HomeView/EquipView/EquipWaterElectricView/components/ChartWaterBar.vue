<!-- 用水柱状图 -->
<template>
    <div class="chart-water-bar" ref="chartWaterBar"></div>
  </template>
  
  <script setup lang="js">
  import * as echarts from 'echarts'
  import { ref, onMounted } from 'vue'
  import { useEquipWaterElectricStore } from '@renderer/stores/homeStore/equipStore/equipWaterElectric'
  
  let chartWaterBar = ref(null)
  
  const equipWEStore = useEquipWaterElectricStore()
  
  onMounted(() => {
    setTimeout(() => {
      if (chartWaterBar.value) {
        let myChartWaterBar = echarts.init(chartWaterBar.value)
        equipWEStore.renderChart(myChartWaterBar, equipWEStore.waterBarOption.option)
      }
    }, 1000)
  })
  </script>
  <style scoped lang="less">
  .chart-water-bar {
    width: 45%;
    height: 100%;
  }
  </style>
  