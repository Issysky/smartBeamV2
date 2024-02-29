<!-- 二级路由页面显示的标题 -->
<template>
  <div class="label-wrapper">
    <div class="label">
      <p class="text">{{ label }}</p>
      <p class="eng">{{eng}}</p>
    </div>
  </div>
</template>

<script setup lang="js">
import { defineProps, ref, onMounted } from 'vue'

const props = defineProps({
  label: {
    default: '标题'
  },
  eng: {
    default: 'title'
  }
})

onMounted(() => {
  const text = document.querySelector('.text')
  const eng = document.querySelector('.eng')
  setTimeout(() => {
    text.style.width = '180px'
    eng.style.width = '180px'
  }, 100)
})
</script>
<style scoped lang="less">
.label-wrapper {
  width: 94%;
  height: 7%;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2% 0 0 0 ;
  .label {
    width: 100%;
    .text {
      width: 0;
      overflow: hidden;
      transition: all 0.9s;
      white-space: nowrap;
      font-weight: 600;
      font-size: 1.5em;
      font-family: 'alimamaFont';
      margin-bottom: 7px;
    }
    .eng {
      width: 0;
      font-size: 0.8em;
      color: #33333366;
      overflow: hidden;
      transition: all 0.9s;
      white-space: nowrap;
      font-family: 'impact';
    }
  }
  .line {
    width: 100%;
    height: 2px;
    background-color: #000;
  }
}
</style>
