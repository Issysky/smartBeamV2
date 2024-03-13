<!-- 劳务管理场内统计 左侧图表区域 -->
<template>
  <div class="chart-labor-basic-wrapper">
    <div class="chart1" ref="chart1"></div>
    <div class="chart2" ref="chart2"></div>
  </div>
</template>

<script setup lang="js">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
import { useLaborBasicStore } from '@renderer/stores/homeStore/laborStore/laborBasic'

let chart1 = ref(null)
let chart2 = ref(null)

const laborBasicStore = useLaborBasicStore()
onMounted(() => {
  setTimeout(() => {
    if (chart1.value) {
      let myChart1 = echarts.init(chart1.value)
      laborBasicStore.renderChart(myChart1, 1)
    }
    if (chart2.value) {
      let myChart2 = echarts.init(chart2.value)
      laborBasicStore.renderChart(myChart2, 2)
    }
  }, 1000)
})
</script>
<style scoped lang="less">
.chart-labor-basic-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .chart1 {
    width: 90%;
    height: 45%;
    border-radius: 15px;
    background-color: #fff;
    padding-top: 10px;
  }
  .chart2 {
    width: 90%;
    height: 45%;
    margin-top: 20px;
    border-radius: 15px;
    background-color: #fff;
    padding-top: 10px;

  }
}
</style>
