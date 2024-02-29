// 监控弹窗store
import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

export const useMonitorStore = defineStore('monitor', () => {
  // 请求地址
  const url = 'http://127.0.0.1:5000/video_feed?rtsp_stream_url='
  // rtsp地址
  const rtsp_url = 'rtsp://admin:ly1029384756@192.168.31.100:554/h264/Streaming/Channels/1'
  // 监控是否出现
  const isShow = ref(false)

  function getImgurl() {
    return url + rtsp_url
  }
  const showMonitor = () => {
    isShow.value = true
  }
  const hideMonitor = () => {
    isShow.value = false
  }

  return {
    getImgurl,
    showMonitor,
    hideMonitor,
    isShow
  }
})
