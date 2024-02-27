<!-- 制梁数据 -->
<template>
  <div class="beam-data-wrapper" :style="{ bottom: show ? '4%' : '-40%' }">
    <Line class="line" :width="'60%'" :label="'制梁数据'"></Line>
    <FormBeam></FormBeam>
  </div>
</template>

<script setup lang="js">
import { ref, onMounted, onBeforeMount, reactive } from 'vue'
import Line from './Line.vue'
import FormBeam from './FormBeam.vue'

let show = ref(false)
onMounted(() => {
  setTimeout(() => {
    show.value = true
  }, 100)
})
</script>
<style scoped lang="less">
.beam-data-wrapper {
  width: 48%;
  height: 22%;
  position: absolute;
  right: 26.1%;
  padding-top: 1%;
  background-color: var(--screen-card-color);
  color: var(--screen-font-color);
  border-radius: 15px;
  box-shadow: var(--screen-card-shadow);
  display: flex;
  flex-direction: column;
  transition: var(--screen-card-transition);
  .line {
    margin-left: 3%;
  }
}
</style>
