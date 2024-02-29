<!-- 二级路由 设备数据 -->
<template>
  <div class="equip-wrapper">
    <!-- <h1>设备数据</h1> -->
    <router-view></router-view>
  </div>
</template>

<script setup lang="js"></script>
<style scoped lang="less">
.equip-wrapper {
  width: 100%;
  height: 100%;
  background-color: var(--MainContentBgColor);
  border-radius: 15px;
  h1{
    height: 8%;
    margin: 0;
  }
}
</style>
