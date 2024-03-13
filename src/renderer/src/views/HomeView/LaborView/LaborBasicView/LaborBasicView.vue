<template>
  <div class="labour-basic-wrapper">
    <LabelType1 :label="'场内统计'" :eng="'Labour Basic'" />
    <div class="content">
      <div class="left">
        <ChartLaborBasic />
      </div>
      <div class="right">
        <TableBasic />
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import LabelType1 from '@renderer/components/LabelType1.vue'
import TableBasic from './components/TableBasic.vue'
import ChartLaborBasic from './components/ChartLaborBasic.vue';
</script>
<style scoped lang="less">
.labour-basic-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  .content {
    width: 100%;
    height: 92%;
    display: flex;
    .left {
      width: 30%;
      height: 100%;
      border-radius: 15px;
    }
    .right {
      width: 67%;
      height: 95%;
      border-radius: 15px;
      box-shadow: 0 0 15px 0px rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
