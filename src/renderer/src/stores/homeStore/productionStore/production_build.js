// 生产数据 架设进度store
import { defineStore } from 'pinia'
import axios from 'axios'
import { reactive, ref } from 'vue'
import { exportExcel } from '@renderer/utils/excelConfig.js'

export const useProductionBuildStore = defineStore('ProductionBuild', () => {
  //定义请求架桥地址
  const bridgeUrl = '/beam/bridge/'

  //定义请求梁片地址
  const beamUrl = '/beam/beam/'

  //   定义请求修改梁片状态地址
  const beamStatusUrl = '/beam/beam_status/'

  // 点击对象名
  const currentObj = reactive({
    data: {
      name: '',
      straddle: ''
    }
  })

  // 请求得到的桥梁数据
  const bridgeData = reactive({
    data: []
  })
  //   当前选中的桥梁
  const currentBridge = reactive({
    data: {}
  })

  //   所有梁片信息
  const beamData = reactive({
    data: []
  })

  //   请求桥梁数据
  const getBridgeData = async () => {
    const res = await axios.get(bridgeUrl, {
      headers: { Authorization: localStorage.getItem('token') }
    })
    bridgeData.data = res.data
    currentBridge.data = bridgeData.data[0]
  }
  //   请求所有梁片信息
  const getBeamData = async (callback) => {
    const res = await axios.get(beamUrl, {
      params: { bridge: currentBridge.data.bridge },
      headers: { Authorization: localStorage.getItem('token') }
    })
    beamData.data = res.data
    callback()
  }

  //   切换桥梁
  const changeBridge = (index) => {
    currentBridge.data = bridgeData.data[index]
  }
  //   修改梁片状态
  const changeBeamStatus = async (id, status) => {
    await axios.patch(
      beamStatusUrl + id + '/',
      { status: status },
      {
        headers: { Authorization: localStorage.getItem('token') }
      }
    )
  }
  //   点击获取当前对象的信息
  const clickObjName = (data) => {
    currentObj.data = data
  }

  return {
    clickObjName,
    bridgeData,
    getBeamData,
    beamData,
    getBridgeData,
    currentObj,
    currentBridge,
    changeBridge,
    changeBeamStatus
  }
})
