<!-- 用水折线图 -->
<template>
  <div class="chart-water-line" ref="chartWaterLine"></div>
</template>

<script setup lang="js">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
import { useEquipWaterElectricStore } from '@renderer/stores/homeStore/equipStore/equipWaterElectric'

let chartWaterLine = ref(null)

const equipWEStore = useEquipWaterElectricStore()

onMounted(() => {
  setTimeout(() => {
    if (chartWaterLine.value) {
      let myChartWaterLine = echarts.init(chartWaterLine.value)
      equipWEStore.renderChart(myChartWaterLine, equipWEStore.waterLineOption.option)
    }
  }, 1000)
})
</script>
<style scoped lang="less">
.chart-water-line {
  width: 45%;
  height: 100%;
}
</style>
