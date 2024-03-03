import { defineStore } from 'pinia'
import axios from 'axios'
import { reactive, ref } from 'vue'
import { exportExcel } from '@renderer/utils/excelConfig.js'

export const useProductionBeamStore = defineStore('productionBeam', () => {
  // 请求地址
  const url = '/beam/beam/'
  // 梁体数据图表数据
  const beamData = reactive({
    data: []
  })
  // 总页数
  const totalPage = ref(0)
  // 图表的表头
  const beamDataColumns = [
    { name: '桥梁名称', width: '', key: 'bridge' },
    { name: '梁片名称', width: '', key: 'name' },
    { name: '梁号', width: '', key: 'beam_code' },
    { name: '梁型', width: '', key: 'beam_type' },
    { name: '状态', width: '', key: 'status' },
    { name: '开始生产时间', width: '', key: 'start_time' },
    { name: '结束生产时间', width: '', key: 'end_time' },
    { name: '混凝土详情', width: '', key: 'detail' },
    { name: '养生详情', width: '', key: 'detail' },
    { name: '张拉详情', width: '', key: 'detail' },
    { name: '压浆详情', width: '', key: 'detail' },
    { name: '梁体评分', width: '', key: 'beam_grade' },
    { name: '存放台座', width: '', key: 'storage_pedestal' }
  ]
  //   图表数据的key
  const beamDataKeys = [
    'bridge',
    'name',
    'beam_code',
    'beam_type',
    'status',
    'start_time',
    'end_time',
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
      '混凝土详情',
      '养生详情',
      '张拉详情',
      '压浆详情',
      '梁体评分',
      '存放台座'
    ]
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
          : '',
        end_time: item.end_time
          ? item.end_time.split('T')[0] + ' ' + item.end_time?.split('T')[1]
          : ''
      }
    })
    console.log(beamData.data, 'beamData.data')
  }

  return {
    beamData,
    totalPage,
    beamDataColumns,
    beamDataKeys,
    exportExcelColumns,
    getBeamData
  }
})
