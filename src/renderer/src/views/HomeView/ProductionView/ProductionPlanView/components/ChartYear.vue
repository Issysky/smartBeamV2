<!-- 年度生产计划统计图 出现在梁场大屏-->
<template>
  <div class="chart-wrapper">
    <p class="label">年度生产曲线</p>
    <!-- 年份选择器 -->
    <div class="year-select">
      <button class="last-year" @click="changeYear('last')">
        <el-icon><ArrowLeftBold /></el-icon>
      </button>
      <p class="year">{{ yearValue + '年' }}</p>
      <button class="last-year" @click="changeYear('next')">
        <el-icon><ArrowRightBold /></el-icon>
      </button>
    </div>
    <div class="chart-wrapper">
      <div ref="chart" id="container"></div>
    </div>
  </div>
</template>

<script setup lang="js">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
import { useChartYearStore } from '@renderer/stores/homeStore/productionStore/chartYear.js'

// 定义图表和图表挂载实例对象
const chart = ref(null)
let myChart
// 定义date对象
const date = new Date()
let year = date.getFullYear()
let yearValue = ref(year)
// 修改年份
const changeYear = (type) => {
  if (type === 'last') {
    yearValue.value--
  } else {
    yearValue.value++
  }
  chartYearStore.getChartData(myChart, yearValue.value)
}

// 定义store
const chartYearStore = useChartYearStore()
onMounted(() => {
  year = date.getFullYear()
  setTimeout(() => {
    myChart = echarts.init(chart.value)
    chartYearStore.getChartData(myChart, yearValue.value)
  }, 500)
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
  .year-select {
    position: absolute;
    right: 4%;
    top: 28%;
    z-index: 3;
    width: 20%;
    height: 10%;
    font-size: 20px;
    font-weight: 600;
    color: #000;
    display: flex;
    justify-content: space-around;
    align-items: center;
    button {
      border: 1px solid #333;
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 7px;
      background-color: #fff;
      cursor: pointer;
      line-height: 20%;
      &:hover {
        color: #fff;
        background-color: #33333366;
      }
    }
    p {
      margin: 0;
    }
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
