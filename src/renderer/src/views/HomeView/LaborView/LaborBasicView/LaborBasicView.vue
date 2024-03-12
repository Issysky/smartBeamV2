<template>
  <div class="labour-basic-wrapper">
    <LabelType1 :label="'场内统计'" :eng="'Labour Basic'" />
    <div class="content">
      <div class="left"></div>
      <div class="right">
        <TableBasic />
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import LabelType1 from '@renderer/components/LabelType1.vue'
import TableBasic from './components/TableBasic.vue'
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
      background-color: #bfc;
      border-radius: 15px;
    }
    .right {
      width: 70%;
      height: 100%;
      background-color: #bfc885;
      border-radius: 15px;
    }
  }
}
</style>
