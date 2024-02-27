<!-- 拌合站信息 大屏组件 -->
<template>
  <div class="mix-station-wrapper" :style="{ right: show ? '2%' : '-40%' }">
    <Line class="line" :width="'80%'" :label="'拌合站信息'"></Line>
    <FormMix></FormMix>
  </div>
</template>

<script setup lang="js">
import { ref, onMounted, onBeforeMount, reactive } from 'vue'
import Line from './Line.vue'
import FormMix from './FormMix.vue'

let show = ref(false)
onMounted(() => {
  setTimeout(() => {
    show.value = true
  }, 300)
})
</script>
<style scoped lang="less">
.mix-station-wrapper {
  width: 23%;
  height: 25%;
  position: absolute;
  right: 2%;
  top: 10%;
  background-color: var(--screen-card-color);
  border-radius: 15px;
  box-shadow: var(--screen-card-shadow);
  display: flex;
  flex-direction: column;
  color: var(--screen-font-color);
  padding-top: 1%;
  transition: var(--screen-card-transition);
  .line {
    margin-bottom: 2%;
  }
}
</style>
