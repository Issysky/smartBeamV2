<!-- 用电折线图 -->
<template>
    <div class="chart-electric-line" ref="chartElectricLine"></div>
  </template>
  
  <script setup lang="js">
  import * as echarts from 'echarts'
  import { ref, onMounted } from 'vue'
  import { useEquipWaterElectricStore } from '@renderer/stores/homeStore/equipStore/equipWaterElectric'
  
  let chartElectricLine = ref(null)
  
  const equipWEStore = useEquipWaterElectricStore()
  
  onMounted(() => {
    setTimeout(() => {
      if (chartElectricLine.value) {
        let myChartElectricLine = echarts.init(chartElectricLine.value)
        equipWEStore.renderChart(myChartElectricLine, equipWEStore.electricLineOption.option)
      }
    }, 1000)
  })
  </script>
  <style scoped lang="less">
  .chart-electric-line {
    width: 45%;
    height: 100%;
  }
  </style>
  