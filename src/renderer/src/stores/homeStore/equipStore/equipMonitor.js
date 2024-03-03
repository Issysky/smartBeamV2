// 监控弹窗store
import { defineStore } from 'pinia'
import axios from 'axios'
import { reactive, ref } from 'vue'

export const useEquipMonitorStore = defineStore('equipMonitor', () => {
  // 请求监控地址
  const monitorUrl = 'http://127.0.0.1:5000/video_feed?rtsp_stream_url='
  // rtsp地址
  const rtsp_url = 'rtsp://admin:ly1029384756@192.168.31.100:554/h264/Streaming/Channels/1'
  // 请求卡片数组地址
  const url = '/device/monitor/'
  // 监控是否出现
  const isShow = ref(false)
  // 监控卡片数组
  const monitorList = reactive({
    data: [
      {
        id: 7,
        name: '下料区',
        area: '钢筋加工场',
        rtsp_url: 'rtsp://admin:ly1029384756@192.168.31.100:554/h264/Streaming/Channels/1'
      }
    ]
  })
  // 总页数
  const totalPage = ref(0)

  // 获取监控卡片数组
  const getMonitorList = async (params) => {
    const res = await axios.get(url, {
      params:params,
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
    monitorList.data = res.data.results
    totalPage.value = res.data.total_pages
    console.log(res, 'monitorres')
  }

  // 获取监控地址
  const getImgurl = () => {
    console.log(monitorUrl + rtsp_url, 'url + rtsp_url')
    // axios.get(url + rtsp_url).then((res) => {
    //   console.log(res.data, 'res.data')
    // }).catch((err) => {
    //   console.log(err, 'err')
    // })

    return url + rtsp_url
  }



  // 展示隐藏监控
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
    getMonitorList,
    isShow,
    monitorList,
    totalPage
  }
})
