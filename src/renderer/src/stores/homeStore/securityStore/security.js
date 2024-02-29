// 安全事件store
import { defineStore } from 'pinia'
import axios from 'axios'
import { reactive, ref } from 'vue'
import { exportExcel } from '@renderer/utils/excelConfig.js'

export const useSecurityStore = defineStore('security', () => {
  // 请求地址
  const url = '/device/ai_monitor/'
  //详情弹窗的数据
  const securityDetailData = reactive({
    data: ''
  })
  // 详情弹窗下方图表数据
  const securityDetailTableData = reactive({
    data: []
  })
  // 安全事件图表数据
  const securityData = reactive({
    data: []
  })
  // 安全事件图表数据
  const chartSecurityOption = reactive({
    option: {
      title: {
        text: '近十五天风险事件'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: []
      },
      toolbox: {},
      grid: {
        left: '3%',
        right: '3%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: []
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '风险事件',
          type: 'line',
          stack: 'Total',
          smooth: true,
          areaStyle: {
            color: '#fe4500'
          },
          lineStyle: {
            color: '#fe4500'
          },
          itemStyle: {
            color: '#fe4500'
          },
          data: []
        }
      ]
    }
  })
  // 总页数
  const totalPage = ref(0)
  // 图表的表头
  const securityColumns = [
    { name: '地点名称', width: '', key: 'name' },
    { name: '事件类型', width: '', key: 'event_type' },

    { name: '时间', width: '', key: 'upload_time' },
    { name: '处理状态', width: '', key: 'is_handled' },
    { name: '预览图', width: '', key: 'image_url' },
    { name: '详情', width: '', key: 'detail' }
  ]
  // 图表数据的key
  const securityDataKey = ['name', 'event_type', 'upload_time', 'is_handled', 'image_url', 'detail']

  // 导出excel的图表数据表头
  const exportExcelColumns = reactive({
    data: ['地点名称', '事件类型', '预览图', '时间', '处理状态']
  })

  // 获取安全事件数据
  const getSecurityData = async (params) => {
    const res = await axios.get(url, {
      params: params,
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
    totalPage.value = res.data.total_pages

    securityData.data = res.data.results.map((item, index) => {
      // 处理时间格式,加静态详情字段
      return {
        ...item,
        upload_time:
          item.upload_time?.split('T')[0] + ' ' + item.upload_time?.split('T')[1].split('.')[0],
        is_handled: item.is_handled ? '已处理' : '待处理',
        detail: ''
      }
    })
    console.log(securityData.data, 'securityData.data')
  }

  // 获取详情弹窗数据
  const getSecurityDetailData = (data) => {
    securityDetailData.data = JSON.parse(JSON.stringify(data))
    securityDetailData.data.is_handled =
      securityDetailData.data.is_handled === '已处理' ? true : false
    console.log(securityDetailData.data, 'securityDetailData.data')
  }
  // 重置详情弹窗数据
  const resetSecurityDetailData = () => {
    securityDetailData.data = ''
  }
  // 修改详情处理状态
  const changeHandled = () => {
    securityDetailData.data.is_handled = !securityDetailData.data.is_handled
  }
  // 提交处理结果
  const submitHandled = () => {
    // 定义路径
    const patchUrl = url + securityDetailData.data.id + '/'
    console.log(patchUrl, 'patchUrl')
    axios
      .patch(
        patchUrl,
        { is_handled: securityDetailData.data.is_handled },
        { headers: { Authorization: localStorage.getItem('token') } }
      )
      .then((res) => {
        // 更新数据
        getSecurityData({ page_size: 10, ordering: '-time' })
      })
  }



  // 渲染图表
  const chartSetOption = (chart, option) => {
    // 生成最近十五天的数组
    let dates = []
    for (let i = 0; i < 15; i++) {
      let date = new Date()
      date.setDate(date.getDate() - i)
      dates.unshift(date.toISOString().split('T')[0])
    }
    option.xAxis[0].data = dates
    // 生成十五天内的数据
    let numbers = []
    for (let i = 0; i < 15; i++) {
      let number = Math.floor(Math.random() * 20)
      numbers.push(number)
    }
    option.series[0].data = numbers
    chart.setOption(option)
    resetOption(chart, option)
  }
  // 图表重绘
  const resetOption = (myChart, option) => {
    setInterval(() => {
      myChart.clear()
      myChart.setOption(option)
    }, 4000)
  }
  // 获取导出excel的数据
  const getExportExcelData = (data) => {
    console.log(data, 'excleData')
    let arr = []
    arr = data.map((item, index) => {
      return [
        item.name,
        item.event_type,
        item.image_url,
        item.upload_time,
        item.is_handled
      ]
    })
    arr.unshift(exportExcelColumns.data)
    return arr
  }
  // 导出excel
  const exportExcelData = () => {
    exportExcel('风险事件抓拍数据', getExportExcelData(securityData.data))
  }

  return {
    securityData,
    securityDetailData,
    securityDetailTableData,
    securityColumns,
    securityDataKey,
    totalPage,
    chartSecurityOption,
    getSecurityData,
    chartSetOption,
    getExportExcelData,
    exportExcelData,
    getSecurityDetailData,
    resetSecurityDetailData,
    changeHandled,
    submitHandled
  }
})
