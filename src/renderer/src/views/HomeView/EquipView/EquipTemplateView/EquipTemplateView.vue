<!-- 三级路由 模板页面 从属于二级路由设备数据 -->
<template>
  <div class="equip-template-wrapper">
    <LabelType1 :label="'模板'" :eng="'Template'"> </LabelType1>
  </div>
</template>

<script setup lang="js">
import LabelType1 from '@renderer/components/LabelType1.vue'
</script>
<style scoped lang="less">
.equip-template-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
