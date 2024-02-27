<!-- 主要内容页面 -->
<template>
  <div class="main-wrapper">
    <slot></slot>
  </div>
</template>

<script setup lang="js"></script>
<style scoped lang="less">
.main-wrapper {
  height: 90%;
  flex: 1;
  background-size: contain;
  background-repeat:no-repeat ;
  display: flex;
  border-radius: 15px;
  // box-shadow: 7px 7px 15px #000000;
  transition: all 0.3s linear;
  margin-right: 2vw;
}
</style>
