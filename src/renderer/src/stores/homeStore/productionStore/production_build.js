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
    data: {
      bridge: '黄河大桥'
    }
  })
  //   所有梁片信息
  const beamData = reactive({
    data: []
  })
  // 图表使用的数据
  const bridgeTableData = reactive({
    data: []
  })
  // 总页数
  const totalPage = ref(0)
  // 图表的表头
  const bridgeColumns = [
    { name: '序号', width: '', key: 'id' },
    { name: '梁体名称', width: '', key: 'name' },
    { name: '梁体编号', width: '', key: 'beam_code' },
    { name: '幅序号', width: '', key: 'x_index' },
    { name: '排序号', width: '', key: 'y_index' },
    { name: '架设状态', width: '', key: 'status' },
    { name: '架设时间', width: '', key: 'bridge_time' }
  ]
  // 图表数据的key
  const bridgeDataKey = ['id', 'name', 'beam_code', 'x_index', 'y_index', 'status', 'bridge_time']

  //   请求桥梁数据，渲染3d模型
  const getBridgeData = async () => {
    const res = await axios.get(bridgeUrl, {
      headers: { Authorization: localStorage.getItem('token') }
    })
    bridgeData.data = res.data
    currentBridge.data = bridgeData.data[0]
  }
  //   请求所有梁片信息,渲染3d模型用
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
  // 获取分页后的桥梁数据，下方图表用
  const getBridgeDataPage = async (params) => {
    const res = await axios.get(beamUrl, {
      params: { ...params, bridge: currentBridge.data.bridge },
      headers: { Authorization: localStorage.getItem('token') }
    })
    console.log(res.data, 'res.data')

    bridgeTableData.data = res.data.results.map((item) => {
      return {
        ...item,
        bridge_time: item.bridge_time ? item.bridge_time.split('T')[0]+item.bridge_time.split('T')[1].substring(0,8) : ''
      }
    })
    totalPage.value = res.data.total_pages
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
    totalPage,
    bridgeColumns,
    bridgeDataKey,
    bridgeTableData,
    changeBridge,
    changeBeamStatus,
    getBridgeDataPage
  }
})
