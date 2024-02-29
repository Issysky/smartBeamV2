<!-- 实际方量图表 出现在设备管理 拌合站页面中 -->
<template>
  <div ref="chart" id="container"></div>
</template>

<script setup lang="js">
import { ref, onMounted, reactive } from 'vue'
import * as echarts from 'echarts'
import { useEquipMixStore } from '@renderer/stores/homeStore/equipStore/equipMix'

// 定义图表实例
const chart = ref(null)
let myChart
// 定义store

const equipMixStore = useEquipMixStore()

onMounted(() => {
  myChart = echarts.init(chart.value)
  equipMixStore.chartSetOption(myChart, equipMixStore.actualQuantityOption.option)
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
