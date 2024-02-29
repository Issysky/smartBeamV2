<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'


const router = useRouter()

onMounted(async () => {

})
</script>

<template>
  <main>

    <RouterView />
  </main>
</template>

<style scoped lang="less">
@font-face {
  font-family: 'textFont';
  src: url('./assets/font/微软雅黑.ttf') format('truetype');
}
@font-face {
  font-family: 'alimamaFont';
  src: url('./assets/font/阿里妈妈数黑体.ttf') format('truetype');
}
main {
  width: 100vw;
  height: 100vh;
  background-color: var(--BgColor);
  img {
    width: 50px;
    height: 50px;
    object-fit: contain;
  }
  /* 对所有元素的滚动条进行样式设置 */
  ::-webkit-scrollbar {
    width: 7px; /* 设置滚动条的宽度 */
    height: 5px; /* 设置滚动条的高度，对于横向滚动条 */
  }

  /* 滚动条轨道 */
  ::-webkit-scrollbar-track {
    background: #f1f1f1; /* 设置轨道的背景颜色 */
    border-radius: 10px;
  }

  /* 滚动条滑块 */
  ::-webkit-scrollbar-thumb {
    background: #888; /* 设置滑块的背景颜色 */
    border-radius: 10px;
  }

  /* 当鼠标悬停在滚动条上时，改变滑块的背景颜色 */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
}
</style>
