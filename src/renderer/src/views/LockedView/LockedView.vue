<!-- 锁定页面 -->
<template>
  <div class="lock-wrapper">
    <div class="mask"></div>
    <div class="text">
        <p>locked</p>
        <p>解锁高级版</p>
    </div>
  </div>
</template>

<script setup lang="js"></script>
<style scoped lang="less">
.lock-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .mask {
    width: 100%;
    height: 100%;
    backdrop-filter: blur(10px); /* 添加毛玻璃效果 */
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
  .text {
    position: absolute;
    font-size: 3em;
    width: 40%;
    border-radius: 15px;
    color: var(--font-level-13);
    background-color: #ffffffdd;
    z-index: 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
