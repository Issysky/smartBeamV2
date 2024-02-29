<!-- 温湿度图表组件,出现在蒸养棚三极路由 -->
<template>
  <div class="chart" ref="chart" :id="`container${index}`"></div>
</template>

<script setup lang="js">
import { onMounted, reactive, ref, watch, defineProps } from 'vue'
import { useEquipSteamStore } from '@renderer/stores/homeStore/equipStore/equipSteam.js'
import * as echarts from 'echarts'

const equipSteamStore = useEquipSteamStore()

const props = defineProps({
  index: {
    default: 0
  },
  name: {
    default: 'room1'
  }
})

// 定义图表dom
const chart = ref(null)
// 定义图表dom
let myChart

// 获取过去24小时的时间
const getPast24Hours = () => {
  let now = new Date()
  let past = new Date()
  past.setHours(now.getHours() - 24)

  return {
    time_to: now,
    time_from: past
  }
}

onMounted(() => {
  // 获取图表dom
  myChart = echarts.init(document.getElementById(`container${props.index}`))
  const requestData = {
    type: 'tem_hum',
    name: props.name,
    time_from: '2024-01-01 12:30:00',
    time_to: '2024-01-02 12:30:00',
    simplify: 50
  }
  // 发送请求
  equipSteamStore.getEquipTempData(requestData, myChart)
  // 窗口变化时图表自适应
  window.addEventListener('resize', () => {
    myChart.resize()
  })
})
</script>
<style scoped lang="less">
.chart {
  width: 100%;
  height: 100%;
}
</style>
