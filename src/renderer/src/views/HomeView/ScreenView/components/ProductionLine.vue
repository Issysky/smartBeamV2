<!--生产线使用率 大屏组件 -->
<template>
  <div class="product-line-wrapper" :style="{ right: show ? '2%' : '-40%' }">
    <Line :width="'80%'" :label="'生产线使用率'"></Line>
    <ChartProductionLine></ChartProductionLine>
  </div>
</template>

<script setup lang="js">
import { ref, onMounted, onBeforeMount, reactive } from 'vue'
import Line from './Line.vue'
import ChartProductionLine from './ChartProductionLine.vue'

// 定义是否展示
let show = ref(false)

onMounted(() => {
  setTimeout(() => {
    show.value = true
  }, 200)
})
</script>
<style scoped lang="less">
.product-line-wrapper {
  width: 23%;
  height: 30%;
  position: absolute;
  top: 38%;
  right: 2%;
  padding-top: 1%;
  background-color: var(--screen-card-color);
  box-shadow: var(--screen-card-shadow);
  color: var(--screen-font-color);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  transition: var(--screen-card-transition);
}
</style>
