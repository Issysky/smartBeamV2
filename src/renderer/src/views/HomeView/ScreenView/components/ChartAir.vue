<!-- 空气污染指数图表 出现在大屏环境监测中 -->
<template>
  <div ref="chart" id="container"></div>
</template>

<script setup lang="js">
import { ref, onMounted, reactive } from 'vue'
import * as echarts from 'echarts'
import { useEnvStore } from '@renderer/stores/homeStore/screenStore/environment.js'
// 定义图表实例
const chart = ref(null)
let myChart
// 定义store
const envStore = useEnvStore()

onMounted(() => {
  setTimeout(() => {
    myChart = echarts.init(chart.value)
    envStore.getEnvData(myChart, 'air')
  }, 1700)
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
