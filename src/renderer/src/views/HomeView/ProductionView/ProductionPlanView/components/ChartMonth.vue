<!-- 月度生产统计图 出现在梁场大屏-->
<template>
  <div class="chart-wrapper">
    <p class="label">近15日生产曲线</p>
    <div class="chart-wrapper">
      <div ref="chart" id="container"></div>
    </div>
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
  setTimeout(() => {
    myChart = echarts.init(chart.value)
    chartMonthStore.getChartData(myChart, 'product')
  }, 1000)
})
</script>
<style scoped lang="less">
.chart-wrapper {
  width: 100%;
  height: 47%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  position: relative;
  .label {
    font-size: 28px;
    font-weight: 600;
    color: #000;
  }
  .chart-wrapper {
    width: 100%;
    height: 80%;
    background-color: #fff;
    box-shadow: 7px 7px 14px #00000029;
    border-radius: 15px;
    #container {
      width: 90%;
      height: 100%;
    }
  }
}
</style>
