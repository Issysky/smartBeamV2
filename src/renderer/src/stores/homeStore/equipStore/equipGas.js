// 有害气体store
import { defineStore } from 'pinia'
import axios from 'axios'
import { reactive, ref } from 'vue'
import { exportExcel } from '@renderer/utils/excelConfig.js'

export const useEquipGasStore = defineStore('equipGas', () => {
  // 请求地址
  const url = '/device/harmful_gas/'
  // 报警信息请求地址
  const alarmUrl = '/device/harmful_gas_alert/'
  // 左上区域警报数据
  const gasData = reactive({
    data: []
  })
  // 图表数据
  const gasFormData = reactive({
    data: []
  })
  // echart图表option
  let gasOption = reactive({
    title: {
      text: '近14日报警次数',
      left: 'center',
      textStyle: {
        fontSize: 28
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      show: false
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '近14日报警次数',
        type: 'bar',
        emphasis: {
          focus: 'series'
        },
        data: [320, 332, 301, 334, 390, 330, 320],
        label: {
          show: true,
          position: 'top', // 标签的位置
          // 可选：自定义标签的格式
          formatter: '{c}' // {c} 代表数据值
        },
        barWidth: 30,
        itemStyle: {
          color: '#fe4500'
        }
      }
    ]
  })

  // 总页数
  const totalPage = ref(0)
  // 图表的表头
  const gasColumns = [
    { name: '名称', width: '', key: 'name' },
    { name: '地点', width: '', key: 'area' },
    { name: '时间', width: '', key: 'time' },
    { name: '事件', width: '', key: 'sensor_category' },
    { name: '污染值', width: '', key: 'value' }
  ]
  // 图表数据的key
  const gasDataKey = ['name', 'area', 'time',  'sensor_category', 'value']

  // 导出excel的图表数据表头
  const gasExcelColumns = [
    "名称","地点","时间","事件","污染值"
  ]
  // 获取区域数据
  const getGasData = async (name) => {
    const res = await axios.get(url, {
      params: {
        name: name,
        is_latest: true
      },
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
    const data = []
    for (let key in res.data[0]) {
      if (key === 'co2') {
        data.push({ name: '二氧化碳(CO2)', value: res.data[0][key] })
      } else if (key === 'co') {
        data.push({ name: '一氧化碳(CO)', value: res.data[0][key] })
      } else if (key === 'ch4') {
        data.push({ name: '甲烷(CH4)', value: res.data[0][key] })
      } else if (key === 'h2s') {
        data.push({ name: '硫化氢(H2S)', value: res.data[0][key] })
      }
    }

    gasData.data = data
  }
  // 获取图表数据
  const getFormGasData = async (params) => {
    console.log(1111)
    const res = await axios.get(alarmUrl, {
      params: params,
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
    totalPage.value = res.data.total_pages
    gasFormData.data = res.data.results
    gasFormData.data = res.data.results.map((item, index) => {
      // 处理时间格式,加静态详情字段
      return {
        ...item,
        time: item.time?.split('T')[0] + ' ' + item.time?.split('T')[1],
      }
    })
  }
  // 获取警报数据
  const getGasAlarmData = async (chart, time_from, time_to) => {
    const timeRange = generateTimeRange(time_from, time_to)
    const optionData = { xAxis: timeRange.time, seriesData: [] }
    const res = await axios.get(alarmUrl, {
      params: {
        time_from: time_from,
        time_to: time_to
      },
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
    optionData.seriesData = getAlarmDataByDate(res.data, optionData.xAxis)
    getGasOption(chart, optionData)
  }
  // 获取图表option
  const getGasOption = async (chart, data) => {
    gasOption.series[0].data = data.seriesData
    gasOption.xAxis[0].data = data.xAxis
    chartSetOption(chart, gasOption)
  }
  // 渲染图表
  const chartSetOption = (chart, option) => {
    chart.setOption(option)
  }
  // 获取时间数组
  const generateTimeRange = (startTime, endTime) => {
    const startDate = new Date(startTime)
    const endDate = new Date(endTime)
    const result = { apiTime: [], time: [] }
    while (startDate < endDate) {
      const nextDate = new Date(startDate)
      nextDate.setDate(nextDate.getDate() + 1)
      result.apiTime.push({
        time_from: startDate.toISOString().split('T')[0],
        time_to: nextDate.toISOString().split('T')[0]
      })
      result.time.push(startDate.toISOString().split('T')[0])
      startDate.setDate(startDate.getDate() + 1)
    }
    return result
  }
  // 统计报警数据
  const getAlarmDataByDate = (data, dateArr) => {
    // 统计每个日期的出现次数
    const counts = data.reduce((acc, dateStr) => {
      // 确保日期格式为YYYY-MM-DD
      const date = dateStr.time.split('T')[0]
      acc[date] = (acc[date] || 0) + 1
      return acc
    }, {})
    // 将统计结果转换为数组格式
    const result = Object.keys(counts).map((date) => ({
      date: date,
      count: counts[date]
    }))
    let seriesData = []
    let i = result.length - 1
    // 处理date数据
    for (let flag = 0; flag < dateArr.length; flag++) {
      if (i >= 0 && result[i]?.date == dateArr[flag]) {
        seriesData.push(result[i].count)
        i--
      } else {
        seriesData.push(0)
      }
    }
    return seriesData
  }
  // 获取导出excel数据
  const getExportExcelData = (data) => {
    let excelData = []
    excelData =  data.map((item) => {
      return [item.name, item.area, item.time, item.sensor_category, item.value]
    })
    excelData.unshift(gasExcelColumns)
    console.log(excelData, 'excelData')
    return excelData
  }
  // 导出excel
  const exportGasExcel = () => {
    exportExcel('有害气体报警数据.xlsx', getExportExcelData(gasFormData.data))
  }

  return {
    gasData,
    getGasData,
    gasColumns,
    totalPage,
    gasOption,
    gasDataKey,
    gasFormData,
    getGasOption,
    generateTimeRange,
    getGasAlarmData,
    chartSetOption,
    getFormGasData,
    getExportExcelData,
    exportGasExcel
  }
})
