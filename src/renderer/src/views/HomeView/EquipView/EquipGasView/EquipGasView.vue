<template>
  <div class="equip-gas-wrapper">
    <LabelType1 :label="'有害气体'" :eng="'Harmful Gas'"></LabelType1>
    <div class="form-wrapper">
      <FormGas />
    </div>
  </div>
</template>

<script setup lang="js">
import { ref, onMounted } from 'vue'
import LabelType1 from '@renderer/components/LabelType1.vue'
import FormGas from './components/FormGas.vue'
</script>
<style scoped lang="less">
.equip-gas-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .form-wrapper {
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
