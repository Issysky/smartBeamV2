import { defineStore } from 'pinia'
import axios from 'axios'
import { reactive, ref } from 'vue'

export const useSettingScreenMenuStore = defineStore('settingScreenMenu', () => {
  // 是否展示设置菜单
  const currentPath = ref('')

  // 修改大屏概况信息的url
  const changeScreenInfoUrl = '/info/project/1/'

  // 大屏视频的地址
  const screenVideoUrl = ref('')

  // 获取大屏视频地址
  const getScreenVideoUrl = async (url) => {
    const src = await window.topBar.getVideoPath(url)
    screenVideoUrl.value = src
    localStorage.setItem('screenVideoUrl', screenVideoUrl.value)
    console.log('screenVideoUrl', screenVideoUrl.value)
  }
  // 从localStorage获取videoUrl
  const getVideoUrlFromLocalStorage = () => {
    if (localStorage.getItem('screenVideoUrl')) {
      screenVideoUrl.value = localStorage.getItem('screenVideoUrl')
    }
  }
  // 获取当前路由
  const getCurrentPath = (path) => {
    currentPath.value = path
  }

  // 修改大屏概况信息
  const changeScreenInfo = async (body) => {
    const res = await axios.patch(changeScreenInfoUrl, body, {
      headers: { Authorization: localStorage.getItem('token') }
    })
  }

  return {
    currentPath,
    getCurrentPath,
    changeScreenInfo,
    screenVideoUrl,
    getScreenVideoUrl,
    getVideoUrlFromLocalStorage
  }
})
