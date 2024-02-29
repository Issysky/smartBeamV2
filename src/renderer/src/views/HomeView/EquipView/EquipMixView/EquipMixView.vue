<!-- 拌合站数据三级路由,从属二级路由设备管理 -->
<template>
  <div class="equip-mix-wrapper">
    <LabelType1 label="拌合站数据" eng="MixStation" />
    <TableMix />
    <!-- 图表的详情弹窗 -->
    <CardAlert v-if="equipMixStore.detailDialogVisible" :detailData="equipMixStore.mixDetailData.data"/>
  </div>
</template>

<script setup lang="js">
import { ref } from 'vue'
import TableMix from './components/TableMix.vue'
import LabelType1 from '@renderer/components/LabelType1.vue'
import CardAlert from './components/CardAlert.vue'
import { useEquipMixStore } from '@renderer/stores/homeStore/equipStore/equipMix'

const equipMixStore = useEquipMixStore()
</script>
<style scoped lang="less">
.equip-mix-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
