<!-- 月度生产统计图 出现在梁场大屏-->
<template>
  <div class="chart-wrapper">
    <!-- 月份选择器 -->
    <div ref="chart" id="container"></div>
  </div>
</template>

<script setup lang="js">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
import { useChartMonthStore } from '@renderer/stores/homeStore/screenStore/chartMonth.js'

// 定义图表和图表挂载实例对象
const chart = ref(null)
let myChart
// 定义date对象
const date = new Date()
//  定义月份
let month = date.getMonth() + 1
let monthValue = ref(month)
// 定义store
const chartMonthStore = useChartMonthStore()

// 修改月份
const changeMonth = (type) => {
  if (type === 'last') {
    monthValue.value--
  } else {
    monthValue.value++
  }
  chartMonthStore.getChartData(myChart, monthValue.value)
}

onMounted(() => {
  month = date.getMonth() + 1
  myChart = echarts.init(chart.value)
  setTimeout(() => {
    chartMonthStore.getChartData(myChart,'beam' )
  }, 1600)
  window.addEventListener('resize', () => {
    myChart.resize()
  })
})
</script>
<style scoped lang="less">
.chart-wrapper {
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;

  #container {
    width: 90%;
    height: 90%;
  }
}
</style>
