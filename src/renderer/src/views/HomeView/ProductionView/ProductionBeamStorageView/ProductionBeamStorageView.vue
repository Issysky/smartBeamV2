<!-- 生产数据 存梁信息 -->
<template>
  <div class="production-beam-storage-wrapper">
    <LabelType1 :label="'存梁信息'" :eng="'Production Beam Storage'" />
    <ThreeBeamStorage />
  </div>
</template>

<script setup lang="js">
import LabelType1 from '@renderer/components/LabelType1.vue'
import ThreeBeamStorage from './components/ThreeBeamStorage.vue';
</script>
<style scoped lang="less">
.production-beam-storage-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
</style>
