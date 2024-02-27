// 大屏项目信息组件的store
import { defineStore } from 'pinia'
import axios from 'axios'
import { ref, reactive } from 'vue'

export const useOverviewStore = defineStore('overview', () => {
  const projectInfo = reactive({
    data: []
  })
  //   项目制梁计划
  const planInfo = reactive({
    data: []
  })

  const online = localStorage.getItem('online') === 'online'
  //   项目信息
  const infoUrl = '/info/project/1/'
  //   项目制梁计划
  const planUrl = '/beam/base_beam/'
  //   获取项目基础信息
  const getProjectInfo = async () => {
    getProjectInfoFromLocalStorage()
    // 在线情况
    if (online) {
      console.log('overview在线',online)
      const res = await axios.get(infoUrl, {
        headers: { Authorization: localStorage.getItem('token') }
      })
      let tempdata = []
      for (let i = 1; i <= 5; i++) {
        if (
          res.data[`info${i}_title`] &&
          res.data[`info${i}_content`] &&
          res.data[`info${i}_img`]
        ) {
          tempdata.push({
            title: res.data[`info${i}_title`],
            content: res.data[`info${i}_content`],
            icon: res.data[`info${i}_img`]
          })
        }
      }
      projectInfo.data = tempdata
      localStorage.setItem('projectInfo', JSON.stringify(projectInfo.data))
    }
  }
  //   获取项目制梁计划
  const getProjectPlan = async () => {
    getProjectPlanFromLocalStorage()
    // 在线情况
    if (online) {
      console.log('overview在线')
      const res = await axios.get(planUrl, {
        headers: { Authorization: localStorage.getItem('token') }
      })
      let data = {
        title: '制梁任务',
        total: res.data.beamDataCount,
        beamValue: res.data.beamDataUnfinishedCount,
        bridgeValue: res.data.beamDataBridgeCount,
        iconBeam: 'icon-beam_progress',
        iconBridge: 'icon-bridge_progress'
      }
      planInfo.data = data
      localStorage.setItem('planInfo', JSON.stringify(planInfo.data))
    }
  }
  // 获取存储在localStorage中的信息,如果有网就存入,没网就获取
  const getProjectInfoFromLocalStorage = () => {
    if (!online) {
      console.log('overview离线')
      const data = localStorage.getItem('projectInfo')
      if (data) {
        projectInfo.data = JSON.parse(data)
      }
    }
  }
  const getProjectPlanFromLocalStorage = () => {
    if (!online) {
      const data = localStorage.getItem('planInfo')
      if (data) {
        planInfo.data = JSON.parse(data)
      }
    }
  }
  return { projectInfo, getProjectInfo, getProjectPlan, planInfo }
})
