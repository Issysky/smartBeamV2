<!-- 生产线占用率图表 出现在大屏生产线使用率中 -->
<template>
  <div ref="chart" id="container"></div>
</template>

<script setup lang="js">
import { ref, onMounted, reactive } from 'vue'
import * as echarts from 'echarts'
import { useScreenStore } from '@renderer/stores/homeStore/screenStore/screen'
// 定义图表实例
const chart = ref(null)
let myChart
// 定义store
const screenStore = useScreenStore()

onMounted(() => {
  setTimeout(() => {
    myChart = echarts.init(chart.value)
    if(myChart) {
      screenStore.chartSetOption(myChart, screenStore.productionLineOption.option)
    }
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
