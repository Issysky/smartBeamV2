<template>
  <div class="chart" ref="chart"></div>
</template>

<script setup lang="js">
import * as echarts from 'echarts'
import { ref ,onMounted} from 'vue'
import { useLaborAttendanceStore } from '@renderer/stores/homeStore/laborStore/laborAttendance'

const laborAttendanceStore = useLaborAttendanceStore()

let chart = ref(null)

onMounted(()=>{
    setTimeout(() => {
        const myChart = echarts.init(chart.value)
        laborAttendanceStore.renderChart(myChart)
    }, 1000);
})
</script>
<style scoped lang="less">
.chart {
  width: 100%;
  height: 100%;
}
</style>
