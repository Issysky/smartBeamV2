<!-- 开屏动画一级路由 -->
<template>
  <div ref="videoWrapper" class="start-video-wrapper">
    <video autoplay ref="video" :src="videoPath"></video>
    <!-- <video autoplay ref="video" src="../../assets/video/startVideo.mp4"></video> -->
  </div>
</template>

<script setup lang="js">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const video = ref(null)
// 定义路由
const router = useRouter()
let videoPath = ref('')

onMounted(async () => {
  videoPath.value = await window.topBar.getVideoPath('startVideo')
  video.value.addEventListener('ended', () => {
    router.push('/home/screen')
  })
})
</script>
<style scoped lang="less">
.start-video-wrapper {
  position: fixed;
  background-color: #000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
  video {
    width: 100%;
    height: 100%;
  }
}
</style>
