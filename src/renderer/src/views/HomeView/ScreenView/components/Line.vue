<!-- 带装饰线的标题,出现于大屏页面组件中 -->
<template>
  <div class="label-wrapper" :style="{ width: width }">
    <p class="label">{{ label }}</p>
    <div class="line-wrapper">
      <div class="bold"></div>
      <div class="light"></div>
    </div>
  </div>
</template>

<script setup lang="js">
import { defineProps } from 'vue'

const props = defineProps({
  label: {
    default: '标题'
  },
  width: {
    default: '80%'
  }
})
</script>
<style scoped lang="less">
.label-wrapper {
  padding-left: 30px;
  p {
    width: 120px;
    font-size: 1em;
    font-weight: bold;
    margin: 0;
    margin-bottom: 10px;
    color: var(--font-level-1);
  }
  .line-wrapper {
    display: flex;
    align-items: center;
    .bold {
      width: 100px;
      height: 3px;
      background-color: #f7ea8e;
    }
    .light {
      flex: 1;
      height: 1px;
      background-color: #f7ea8e33;
    }
  }
}
</style>
