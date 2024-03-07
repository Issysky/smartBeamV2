<!-- 三级路由 梁场数字孪生 -->
<template>
  <div class="digital-twin-beam-wrapper">
    <div class="three-wrapper">
    </div>
  </div>
</template>

<script setup lang="js">
import { useDigitalTwinBeamStore } from '@renderer/stores/homeStore/digitalTwinStore/digitalTwinBeam'

const digitalTwinBeamStore = useDigitalTwinBeamStore()
</script>
<style scoped lang="less">
.digital-twin-beam-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  .three-wrapper {
    width: 900x;
    height: 800px;
  }
  .text {
    width: 300px;
    height: 100px;
    position: absolute;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
