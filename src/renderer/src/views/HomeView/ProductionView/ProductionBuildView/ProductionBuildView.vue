<!-- 生产数据 架桥页面 三级路由 -->
<template>
  <div class="production-bridge-view">
    <LabelType1 :label="'架桥地图'" :eng="'Production Build'" />
    <div class="three-wrapper">
      <ThreeBridge />
      
    </div>
    <div class="content"></div>
  </div>
</template>

<script setup lang="js">
import ThreeBridge from './components/ThreeBridge.vue'
import LabelType1 from '@renderer/components/LabelType1.vue'
import { useProductionBuildStore } from '@renderer/stores/homeStore/productionStore/production_build'
import { onMounted,ref } from 'vue'

const productionBuildStore = useProductionBuildStore()


onMounted(() => {
  productionBuildStore.getBridgeData()
})
</script>
<style scoped lang="less">
.production-bridge-view {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .three-wrapper {
    width: 1500px;
    height: 40%;
    background-color: #bfc;
    
  }
  .content {
    width: 100%;
    height: 50%;
  }
}
</style>
