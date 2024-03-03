<!-- 监控弹窗组件 出现在蒸养棚 -->
<template>
  <div class="monitor-alert-wrapper">
    <div class="mask"></div>
    <div class="video">
      <button class="close" @click="monitorStore.hideMonitor()">关闭</button>
      <img :src="monitorStore.getImgurl()" alt="" />
    </div>
  </div>
</template>

<script setup lang="js">
import axios from 'axios'
import { onMounted } from 'vue'
import { useMonitorStore } from '@renderer/stores/homeStore/equipStore/monitor.js'

const monitorStore = useMonitorStore()

// rtsp地址
const rtsp_url = 'rtsp://admin:ly1029384756@192.168.31.100:554/h264/Streaming/Channels/1'
// 请求地址
const url = 'http://127.0.0.1:5000/video_feed'

onMounted(() => {
})
</script>
<style scoped lang="less">
.monitor-alert-wrapper {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  z-index: 3;
  .mask {
    width: 100%;
    height: 100%;
    backdrop-filter: blur(10px); /* 添加毛玻璃效果 */
    position: absolute;
    top: 0;
    left: 0;
  }
  .video {
    width: 60%;
    height: 60%;
    background-color: transparent;
    position: absolute;
    top: 40%;
    left: 55%;
    transform: translate(-50%, -50%);
    .close {
      width: 80px;
      height: 30px;
      position: absolute;
      background-color: var(--color-danger);
      right: 50%;
      bottom: -40px;
      cursor: pointer;
      border: none;
      color: var(--font-level-1);
      letter-spacing: 2px;
      border-radius: 5px;
      transform: translateX(50%);
      &:hover {
        background-color: var(--color-danger-hover);
      }
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
