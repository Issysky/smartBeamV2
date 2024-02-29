<template>
  <div class="AI-wrapper">
    <router-view></router-view>
  </div>
</template>

<script setup lang="js"></script>
<style scoped lang="less">
.AI-wrapper {
  width: 100%;
  height: 100%;
  background-color: var(--MainContentBgColor);
  box-shadow: 7px 7px 15px #000000;
  border-radius: 15px;
  overflow: hidden;
}
</style>
