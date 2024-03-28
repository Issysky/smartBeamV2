// 张拉数据store
import { defineStore } from 'pinia'
import axios from 'axios'
import { reactive, ref } from 'vue'
import { exportExcel } from '@renderer/utils/excelConfig.js'

export const useProductionTensionStore = defineStore('productionTension', () => {
  // 请求图表数据的接口
  const formUrl = '/beam/strech/'
  //   请求详情数据的接口
  const detailUrl = '/beam/strech/'
  //  请求echarts数据的接口
  const chartUrl = '/beam/strech/graph/count/'
  // 图表数据
  const formData = reactive({
    data: []
  })
  //   详情数据
  const detailData = reactive({
    data: []
  })
  // 总页数
  const totalPage = ref(0)
  //   是否展示详情弹窗
  const is_showDetail = ref(false)
  // 图表的表头
  const tensionColumns = [
    { name: '编号', width: '', key: 'id' },
    { name: '梁片名称', width: '', key: 'beamNo' },
    { name: '梁型', width: '', key: 'unitengineering' },
    { name: '孔洞数', width: '', key: 'componentholes' },
    { name: '张拉顺序', width: '', key: 'tensionsort' },
    { name: '操作员', width: '', key: 'oper' },
    { name: '张拉日期', width: '', key: 'stretchingdate' },
    { name: '质量', width: '', key: 'qualityZL' },
    { name: '详情', width: '', key: 'detail' }
  ]

  // 图表数据的key
  const tensionDataKey = [
    'id',
    'beamNo',
    'unitengineering',
    'componentholes',
    'tensionsort',
    'oper',
    'stretchingdate',
    'qualityZL',
    'detail'
  ]

  //   echart图表
  const tensionChartOption = reactive({
    option: {
      title: {
        text: '近15日张拉数量统计'
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          barWidth: 20,
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ]
    }
  })

  //   获取张拉数据
  const getTensionData = async (params) => {
    try {
      const res = await axios.get(formUrl, {
        params,
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      formData.data = res.data.results
      totalPage.value = res.data.totalPage
      console.log(formData.data, 'formData.data')
    } catch (error) {
      console.error(error)
      // Handle error here
    }
  }
  //   获取张拉详情数据
  const getTensionDetailData = async (id) => {
    try {
      const res = await axios.get(detailUrl + id + '/', {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      detailData.data = res.data
      console.log(res.data, 'res.data')
    } catch (error) {
      console.error(error)
      // Handle error here
    }
  }

  //   点击展示详情弹窗
  const showDetail = () => {
    is_showDetail.value = !is_showDetail.value
    // getTensionDetailData(data)
  }
  //   导出excel

  return {
    formData,
    totalPage,
    tensionColumns,
    tensionDataKey,
    is_showDetail,
    showDetail,
    getTensionData,
    getTensionDetailData
  }
})
