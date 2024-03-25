<!-- 二级路由生产数据  -->
<template>
  <div class="production-wrapper">
    <RouterView v-slot="{Component}">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </RouterView>
  </div>
</template>

<script setup lang="js"></script>
<style scoped lang="less">
.production-wrapper {
  width: 100%;
  height: 100%;
  background-color: var(--MainContentBgColor);
  border-radius: 15px;
  // background-color: #bfc;
  display: flex;
  flex-direction: column;
  align-items: center;
} 
</style>
