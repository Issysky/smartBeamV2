<!-- 有害气体报警表 出现在设备管理 有害气体 -->
<template>
  <div ref="chart" id="container"></div>
</template>

<script setup lang="js">
import { ref, onMounted, reactive } from 'vue'
import * as echarts from 'echarts'
import { useEquipGasStore } from '@renderer/stores/homeStore/equipStore/equipGas.js'

// 定义图表实例
const chart = ref(null)
let myChart
// 定义store
const equipGasStore = useEquipGasStore()

// 获取最近14天的日期
const getLastSevenDays = () => {
  const endDate = new Date()
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - 14)
  return [startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]]
}

onMounted(() => {
  const timeRange = getLastSevenDays()
  myChart = echarts.init(chart.value)
  equipGasStore.getGasAlarmData(myChart, timeRange[0], timeRange[1])
})
</script>
<style scoped lang="less">
#container {
  width: 100%;
  height: 100%;
}
</style>
