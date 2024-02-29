<!-- 三级路由风险事件抓拍,属于二级路由安全事件 -->
<template>
  <div class="security-camera-wrapper">
    <LabelType1 label="风险事件抓拍" eng="RiskEvents" />
    <TableSecurity />
    <CardAlert v-if="securityStore.securityDetailData.data !== ''" />
  </div>
</template>

<script setup lang="js">
import { onMounted, ref } from 'vue'
import LabelType1 from '@renderer/components/LabelType1.vue'
import { useSecurityStore } from '@renderer/stores/homeStore/securityStore/security'
import CardAlert from './components/CardAlert.vue'
import TableSecurity from './components/TableSecurity.vue'
// 引入store
const securityStore = useSecurityStore()

onMounted(() => {})
</script>
<style scoped lang="less">
.security-camera-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
