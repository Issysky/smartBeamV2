<!-- 张拉数据三级路由,从属二级路由生产数据 -->
<template>
  <div class="production-tension-wrapper">
    <LabelType1 label="张拉数据" eng="MixStation" />
    <TableTension />
    <AlertType1 v-if="tensionStore.is_showDetail" />
  </div>
</template>

<script setup lang="js">
import { onMounted, ref } from 'vue'
import LabelType1 from '@renderer/components/LabelType1.vue'
import TableTension from './components/TableTension.vue'
import AlertType1 from '@renderer/components/AlertType1.vue'
import { useProductionTensionStore } from '@renderer/stores/homeStore/productionStore/production_tension'

const tensionStore = useProductionTensionStore()
</script>
<style scoped lang="less">
.production-tension-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
