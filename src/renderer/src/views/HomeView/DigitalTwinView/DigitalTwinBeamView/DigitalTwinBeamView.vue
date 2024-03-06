<!-- 三级路由 梁场数字孪生 -->
<template>
  <div class="digital-twin-beam-wrapper">
    <div class="three-wrapper">
      <ThreeScene />
    </div>
    <div class="text">
      {{ digitalTwinStore.clickObjName }}
    </div>
  </div>
</template>

<script setup lang="js">
import ThreeScene from './components/ThreeScene.vue'
import { useDigitalTwinBeamStore } from '@renderer/stores/homeStore/digitalTwinStore/digitalTwinBeam'

const digitalTwinStore = useDigitalTwinBeamStore()
</script>
<style scoped lang="less">
.digital-twin-beam-wrapper {
  width: 100%;
  height: 100%;
  .three-wrapper {
    width: 1000px;
    height: 800px;
  }
  .text{
    width: 100px;
    height: 100px;
    background-color: #fff;
    text-align: center;
    line-height: 100px;
  }
}
</style>
