<!-- 三级路由梁体数据 出现在生产数据二级路由下 -->
<template>
  <div class="production-beam-data-wrapper">
    <LabelType1 label="梁体数据" eng="ProductionBeam" />
    <FormBeamData />
  </div>
</template>

<script setup lang="js">
import { onMounted,ref,reactive } from 'vue'
import { useProductionBeamStore } from '@renderer/stores/homeStore/productionStore/production_beam_data.js'
import LabelType1 from '@renderer/components/LabelType1.vue'
import FormBeamData from './components/FormBeamData.vue';

const productionBeamStore = useProductionBeamStore()

onMounted(() => {
  productionBeamStore.getBeamData({
    page_size: 10,
  })
})
</script>
<style scoped lang="less">
.production-beam-data-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
