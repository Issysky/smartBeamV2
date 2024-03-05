import { defineStore } from 'pinia'
import axios from 'axios'
import { reactive, ref } from 'vue'
import { exportExcel } from '@renderer/utils/excelConfig.js'

export const useProductionBeamStore = defineStore('productionBeam', () => {
  // 请求地址
  const url = '/beam/beam/'
  // 详情信息
  const detailUrl = '/beam/process/'
  // 梁体数据图表数据
  const beamData = reactive({
    data: []
  })
  // 总页数
  const totalPage = ref(0)
  // 图表的表头
  const beamDataColumns = [
    { name: '桥梁名称', width: '140px', key: 'bridge' },
    { name: '梁片名称', width: '140px', key: 'name' },
    { name: '梁号', width: '140px', key: 'beam_code' },
    { name: '梁型', width: '140px', key: 'beam_type' },
    { name: '状态', width: '140px', key: 'status' },
    { name: '生产结束时间', width: '160px', key: 'end_time' },
    { name: '时间', width: '80px', key: 'detail' },
    { name: '混凝土', width: '80px', key: 'detail' },
    { name: '养生', width: '80px', key: 'detail' },
    { name: '张拉', width: '80px', key: 'detail' },
    { name: '压浆', width: '80px', key: 'detail' },
    { name: '评分', width: '100px', key: 'beam_grade' },
    { name: '存梁台座', width: '100px', key: 'storage_pedestal' }
  ]
  //   图表数据的key
  const beamDataKeys = [
    'bridge',
    'name',
    'beam_code',
    'beam_type',
    'status',
    'end_time',
    'detail',
    'detail',
    'detail',
    'detail',
    'detail',
    'beam_grade',
    'storage_pedestal'
  ]
  // 导出excel的图表数据表头
  const exportExcelColumns = reactive({
    data: [
      '桥梁名称',
      '梁片名称',
      '梁号',
      '状态',
      '开始生产时间',
      '结束生产时间',
      '梁体评分',
      '存放台座'
    ]
  })
  // 是否展示详情弹窗
  const is_showDetail = ref(false)
  // 详情弹窗表头
  const detailContent = [
    { name: '梁号：', key: 'beam_name' },
    { name: '梁型：', key: 'beam_type' },
    { name: '开始架设时间：', key: 'bind_start_time' },
    { name: '结束架设时间：', key: 'bind_end_time' },
    { name: '开始浇筑时间：', key: 'pour_start_time' },
    { name: '结束浇筑时间：', key: 'pour_end_time' },
    { name: '开始蒸养时间：', key: 'steam_start_time' },
    { name: '结束蒸养时间：', key: 'steam_end_time' },
    { name: '开始张拉时间：', key: 'tension_start_time' },
    { name: '结束张拉时间：', key: 'tension_end_time' },
    { name: '开始压浆时间：', key: 'grouting_start_time' },
    { name: '结束压浆时间：', key: 'grouting_end_time' },
    { name: '存放台座：', key: 'storage_pedestal' },
    { name: '梁体评分：', key: 'beam_grade' }
  ]
  //  详情弹窗数据
  const detailData = reactive({
    data: []
  })
  //   获取梁体数据
  const getBeamData = async (params) => {
    const res = await axios.get(url, {
      params: params,
      headers: { Authorization: localStorage.getItem('token') }
    })
    totalPage.value = res.data.total_pages
    beamData.data = res.data.results.map((item, index) => {
      // 处理时间格式,加静态详情字段
      return {
        ...item,
        start_time: item.start_time
          ? item.start_time.split('T')[0] + ' ' + item.start_time?.split('T')[1]
          : '暂无',
        end_time: item.end_time
          ? item.end_time.split('T')[0] + ' ' + item.end_time?.split('T')[1]
          : '暂无',
        beam_grade: 100,
        storage_pedestal: item.storage_pedestal ? item.storage_pedestal : '暂无'
      }
    })
    console.log(beamData.data, 'beamData.data')
  }
  //  获取详情数据
  const getDetailData = async (beam_name) => {
    const res = await axios.get(detailUrl, {
      params: {
        beam_name: beam_name
      },
      headers: { Authorization: localStorage.getItem('token') }
    })
    detailData.data = res.data[0]
  }
  //  获取导出excel的图表数据
  const getExportExcelData = (data) => {
    let arr = []
    arr = data.map((item, index) => {
      return [
        item.bridge,
        item.name,
        item.beam_code,
        item.status,
        item.start_time,
        item.end_time,
        item.beam_grade,
        item.storage_pedestal
      ]
    })
    arr.unshift(exportExcelColumns.data)
    return arr
  }

  //   导出excel
  const exportExcelData = () => {
    exportExcel('梁体数据', getExportExcelData(beamData.data))
  }
  // 展示/关闭弹窗
  const showDetail = () => {
    is_showDetail.value = !is_showDetail.value
  }

  return {
    beamData,
    totalPage,
    beamDataColumns,
    beamDataKeys,
    exportExcelColumns,
    is_showDetail,
    detailContent,
    detailData,
    getDetailData,
    showDetail,
    getBeamData,
    exportExcelData,
    getDetailData
  }
})
