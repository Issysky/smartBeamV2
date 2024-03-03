<!-- 遮罩 -->
<template>
  <div class="mask-wrapper">
    <div class="mask"></div>
  </div>
</template>

<script setup lang="js"></script>
<style scoped lang="less">
.mask-wrapper {
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  position: absolute;
  z-index: 100;
  .mask {
    width: 100%;
    height: 100%;
    backdrop-filter: blur(10px); /* 添加毛玻璃效果 */
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
