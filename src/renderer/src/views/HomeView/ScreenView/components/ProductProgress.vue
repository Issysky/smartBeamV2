<!-- 工程进度 -->
<template>
  <div class="product-process-wrapper" :style="{ left: show ? '2%' : '-40%' }">
    <Line class="line" :width="'80%'" :label="'制梁进度'"></Line>
    <div class="chart-wrapper">
      <ChartBeam class="chart"></ChartBeam>
    </div>
  </div>
</template>

<script setup lang="js">
import { ref, onMounted, onBeforeMount, reactive } from 'vue'
import Line from './Line.vue'
import ChartBeam from './ChartBeam.vue'

let show = ref(false)
onMounted(() => {
  setTimeout(() => {
    
  }, 100);
  show.value = true
})
</script>
<style scoped lang="less">
.product-process-wrapper {
  width: 22%;
  height: 22%;
  position: absolute;
  top: 72%;
  padding-top: 1%;
  background-color: var(--screen-card-color);
  color: var(--screen-font-color);
  border-radius: 15px;
  box-shadow: var(--screen-card-shadow);
  display: flex;
  flex-direction: column;
  transition: var(--screen-card-transition);
  .chart-wrapper {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    .chart {
      height: 100%;
    }
  }
}
</style>
