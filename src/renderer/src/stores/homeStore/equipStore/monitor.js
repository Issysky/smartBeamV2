// 监控弹窗store
import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

export const useMonitorStore = defineStore('monitor', () => {
  // 请求地址
  const url = 'http://127.0.0.1:5000/video_feed?rtsp_stream_url='
  // rtsp地址
  const rtsp_url = ref('')
  // 监控是否出现
  const isShow = ref(false)

  function getImgurl() {
    return url + rtsp_url.value
  }
  const showMonitor = (monitorUrl) => {
    if (monitorUrl) {
      rtsp_url.value = monitorUrl
      isShow.value = true
    }
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
