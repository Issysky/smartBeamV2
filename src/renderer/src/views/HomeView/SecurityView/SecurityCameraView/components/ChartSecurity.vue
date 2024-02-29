<!-- 安全事件图表 出现在安全事件页面 -->
<template>
    <div ref="chart" id="container"></div>
  </template>
  
  <script setup lang="js">
  import { ref, onMounted, reactive } from 'vue'
  import * as echarts from 'echarts'
  import { useSecurityStore } from '@renderer/stores/homeStore/securityStore/security'
  
  // 定义图表实例
  const chart = ref(null)
  let myChart
  // 定义store
  const securityStore = useSecurityStore()
  
  onMounted(() => {
    myChart = echarts.init(chart.value)
    securityStore.chartSetOption(myChart, securityStore.chartSecurityOption.option)
    window.addEventListener('resize', () => {
      myChart.resize()
    })
  })
  </script>
  <style scoped lang="less">
  #container {
    width: 100%;
    height: 100%;
  }
  </style>
  