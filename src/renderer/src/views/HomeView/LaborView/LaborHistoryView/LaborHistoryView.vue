<!-- 二级路由 原始记录页面 -->
<template>
  <div class="labor-history-wrapper">
    <LabelType1 :label="'原始记录'" :eng="'Labor History'"/>
    <div class="content">
      <TableHistory />
    </div>
  </div>
</template>

<script setup lang="js">
import LabelType1 from '@renderer/components/LabelType1.vue'
import TableHistory from './components/TableHistory.vue'
</script>
<style scoped lang="less">
.labor-history-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .content {
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
