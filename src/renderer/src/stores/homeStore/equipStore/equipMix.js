// 设备管理 拌合站数据store
import { defineStore } from 'pinia'
import axios from 'axios'
import { reactive, ref } from 'vue'
import { exportExcel } from '@renderer/utils/excelConfig.js'

export const useEquipMixStore = defineStore('equipMix', () => {
  // 请求地址
  const url = '/device/mix_station/'
  // 详情弹窗是否展示
  const detailDialogVisible = ref(false)
  // 弹窗的内容区1表头
  const mixDetailContent1 = [
    { name: '超标等级:', key: 'ExcessGrade' },
    { name: '混凝土强度等级:', key: 'StrengthGrade ' },
    { name: '拌合站:', key: 'MixingstationCode ' },
    { name: '水胶比:', key: 'WaterCementRatio' },
    { name: '砂率:', key: 'SandRatio' },
    { name: '出料时间:', key: 'DischargeTime' },
    { name: '上传时间:', key: 'UploadTime' },
    { name: '车牌号:', key: 'CarNo' },
    { name: '任务工单好:', key: 'TaskId' },
    { name: '配合比编号:', key: 'ProportionoperId' },
    { name: '操作人:', key: 'Operator' }
  ]
  // 弹窗的内容区2表头
  const mixDetailContent2 = [
    { name: '拌时:', key: 'MixingDuration ' },
    { name: '方量:', key: 'QuanityActual' }
  ]
  //详情弹窗的数据
  const mixDetailData = reactive({
    data: {}
  })
  // 详情弹窗下方图表数据
  const mixDetailTableData = reactive({
    data: []
  })
  // 拌合站图表数据
  const mixData = reactive({
    data: []
  })
  // 总页数
  const totalPage = ref(0)
  // 图表的表头
  const mixColumns = [
    { name: '机器编号', width: '', key: 'MixingStationCode' },
    { name: '任务工单号', width: '', key: 'TaskId' },
    { name: '浇筑部位', width: '', key: 'PouringPosition' },
    { name: '强度等级', width: '', key: 'StrengthGrade' },
    { name: '实际方量', width: '', key: 'QuanityActual' },
    { name: '出料时间', width: '', key: 'time' },
    { name: '超标等级', width: '', key: 'ExcessGrade' },
    { name: '详情', width: '', key: 'Detail' }
  ]
  // 图表数据的key
  const mixDataKey = [
    'MixingStationCode',
    'TaskId',
    'PouringPosition',
    'StrengthGrade',
    'QuanityActual',
    'time',
    'ExcessGrade',
    'Detail'
  ]

  // 导出excel的图表数据表头
  const exportExcelColumns = reactive({
    data: [
      '机器编号',
      '任务工单号',
      '浇筑部位',
      '强度等级',
      '实际方量',
      '出料时间',
      '超标等级',
      '拌合站',
      '水胶比',
      '砂率',
      '上传时间',
      '车牌号',
      '配合比编号',
      '操作人',
      '拌时',
      '水1',
      '水2',
      '水泥1',
      '水泥2',
      '水泥3',
      '砂1',
      '砂2',
      '碎石1',
      '碎石2',
      '碎石3',
      '碎石4',
      '矿粉',
      '粉煤灰',
      '外加剂'
    ]
  })

  // 超标等级饼状图option
  const excessGradeOption = reactive({
    option: {
      title: {
        text: '超标等级'
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '70%',
          left: '0%',
          data: [
            {
              value: 1000,
              name: '不超标',
              itemStyle: { color: '#1aaf8b' }
              // itemStyle: { color: '#7CFFB2' }
            },
            {
              value: 30,
              name: '一级超标',
              itemStyle: { color: '#406c85' }
              // itemStyle: { color: '#58D9F9' }
            },
            {
              value: 50,
              name: '二级超标',
              itemStyle: { color: '#f5bc16' }
              // itemStyle: { color: '#FDDD60' }
            },
            {
              value: 10,
              name: '三级超标',
              itemStyle: { color: '#fe4500' }
              // itemStyle: { color: '#FF6E76' }
            }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  })
  // 实际方量折线图option
  const actualQuantityOption = reactive({
    option: {
      title: {
        text: '出方量统计'
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
      grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
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
          name: 'Email',
          type: 'line',
          stack: 'Total1',
          areaStyle: {
            color: '#f5bc16'
          },
          emphasis: {
            focus: 'series'
          },
          data: [120, 132, 101, 134, 90, 230, 210],
          lineStyle: {
            color: '#f5bc16'
          },
          itemStyle: {
            color: '#f5bc16'
          }
        }
      ]
    }
  })

  // 获取拌合站数据
  const getMixData = async (params) => {
    const res = await axios.get(url, {
      params: params,
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
    totalPage.value = res.data.total_pages
    mixData.data = res.data.results.map((item, index) => {
      // 处理时间格式,加静态详情字段
      return {
        ...item,
        time: item.time?.split('T')[0] + ' ' + item.time?.split('T')[1],
        Detail: ''
      }
    })
    console.log(mixData.data, 'mixData.data')
  }
  // 展示\收起详情弹窗
  const showDetailDialog = (item) => {
    detailDialogVisible.value = !detailDialogVisible.value
    // 获取这一条的详情数据
    mixDetailData.data = item
    // 获取下方的表格数据
    mixDetailTableData.data = [
      {
        name: '水1',
        design: mixDetailData.data.WaterDesign1 ? mixDetailData.data.WaterDesign1 : 0,
        actual: mixDetailData.data.WaterActual1 ? mixDetailData.data.WaterActual1 : 0,
        warning: mixDetailData.data.WaterExcess1 ? mixDetailData.data.WaterExcess1 : 0
      },
      {
        name: '水2',
        design: mixDetailData.data.WaterDesign2 ? mixDetailData.data.WaterDesign2 : 0,
        actual: mixDetailData.data.WaterActual2 ? mixDetailData.data.WaterActual2 : 0,
        warning: mixDetailData.data.WaterExcess2 ? mixDetailData.data.WaterExcess2 : 0
      },
      {
        name: '水泥1',
        design: mixDetailData.data.CementDesign1 ? mixDetailData.data.CementDesign1 : 0,
        actual: mixDetailData.data.CementActual1 ? mixDetailData.data.CementActual1 : 0,
        warning: mixDetailData.data.CementExcess1 ? mixDetailData.data.CementExcess1 : 0
      },
      {
        name: '水泥2',
        design: mixDetailData.data.CementDesign2 ? mixDetailData.data.CementDesign2 : 0,
        actual: mixDetailData.data.CementActual2 ? mixDetailData.data.CementActual2 : 0,
        warning: mixDetailData.data.CementExcess2 ? mixDetailData.data.CementExcess2 : 0
      },
      {
        name: '水泥3',
        design: mixDetailData.data.CementDesign3 ? mixDetailData.data.CementDesign3 : 0,
        actual: mixDetailData.data.CementActual3 ? mixDetailData.data.CementActual3 : 0,
        warning: mixDetailData.data.CementExcess3 ? mixDetailData.data.CementExcess3 : 0
      },
      {
        name: '砂1',
        design: mixDetailData.data.SandDesign1 ? mixDetailData.data.SandDesign1 : 0,
        actual: mixDetailData.data.SandActual1 ? mixDetailData.data.SandActual1 : 0,
        warning: mixDetailData.data.SandExcess1 ? mixDetailData.data.SandExcess1 : 0
      },
      {
        name: '砂2',
        design: mixDetailData.data.SandDesign2 ? mixDetailData.data.SandDesign2 : 0,
        actual: mixDetailData.data.SandActual2 ? mixDetailData.data.SandActual2 : 0,
        warning: mixDetailData.data.SandExcess2 ? mixDetailData.data.SandExcess2 : 0
      },
      {
        name: '碎石1',
        design: mixDetailData.data.GravelDesign1 ? mixDetailData.data.GravelDesign1 : 0,
        actual: mixDetailData.data.GravelActual1 ? mixDetailData.data.GravelActual1 : 0,
        warning: mixDetailData.data.GravelExcess1 ? mixDetailData.data.GravelExcess1 : 0
      },
      {
        name: '碎石2',
        design: mixDetailData.data.GravelDesign2 ? mixDetailData.data.GravelDesign2 : 0,
        actual: mixDetailData.data.GravelActual2 ? mixDetailData.data.GravelActual2 : 0,
        warning: mixDetailData.data.GravelExcess2 ? mixDetailData.data.GravelExcess2 : 0
      },
      {
        name: '碎石3',
        design: mixDetailData.data.GravelDesign3 ? mixDetailData.data.GravelDesign3 : 0,
        actual: mixDetailData.data.GravelActual3 ? mixDetailData.data.GravelActual3 : 0,
        warning: mixDetailData.data.GravelExcess3 ? mixDetailData.data.GravelExcess3 : 0
      },
      {
        name: '碎石4',
        design: mixDetailData.data.GravelDesign4 ? mixDetailData.data.GravelDesign4 : 0,
        actual: mixDetailData.data.GravelActual4 ? mixDetailData.data.GravelActual4 : 0,
        warning: mixDetailData.data.GravelExcess4 ? mixDetailData.data.GravelExcess4 : 0
      },
      {
        name: '矿粉',
        design: mixDetailData.data.MineralPowderDesign ? mixDetailData.data.MineralPowderDesign : 0,
        actual: mixDetailData.data.MineralPowderActual ? mixDetailData.data.MineralPowderActual : 0,
        warning: mixDetailData.data.MineralPowderExcess ? mixDetailData.data.MineralPowderExcess : 0
      },
      {
        name: '粉煤灰',
        design: mixDetailData.data.FlyAshDesign ? mixDetailData.data.FlyAshDesign : 0,
        actual: mixDetailData.data.FlyAshActual ? mixDetailData.data.FlyAshActual : 0,
        warning: mixDetailData.data.FlyAshExcess ? mixDetailData.data.FlyAshExcess : 0
      },
      {
        name: '外加剂',
        design: mixDetailData.data.WaterReduceDesign ? mixDetailData.data.WaterReduceDesign : 0,
        actual: mixDetailData.data.WaterReduceActual ? mixDetailData.data.WaterReduceActual : 0,
        warning: mixDetailData.data.WaterReduceExcess ? mixDetailData.data.WaterReduceExcess : 0
      }
    ]
    console.log(mixDetailData, 'mixDetailData')
  }
  // 获取详情卡片的表格数据
  const getDetailTableData = async () => {
    let data = [
      {
        name: '水1',
        design: mixDetailData.data.WaterDesign1 ? mixDetailData.data.WaterDesign1 : 0,
        actual: mixDetailData.data.WaterActual1 ? mixDetailData.data.WaterActual1 : 0,
        warning: mixDetailData.data.WaterExcess1 ? mixDetailData.data.WaterExcess1 : 0
      },
      {
        name: '水2',
        design: mixDetailData.data.WaterDesign2 ? mixDetailData.data.WaterDesign2 : 0,
        actual: mixDetailData.data.WaterActual2 ? mixDetailData.data.WaterActual2 : 0,
        warning: mixDetailData.data.WaterExcess2 ? mixDetailData.data.WaterExcess2 : 0
      },
      {
        name: '水泥1',
        design: mixDetailData.data.CementDesign1 ? mixDetailData.data.CementDesign1 : 0,
        actual: mixDetailData.data.CementActual1 ? mixDetailData.data.CementActual1 : 0,
        warning: mixDetailData.data.CementExcess1 ? mixDetailData.data.CementExcess1 : 0
      },
      {
        name: '水泥2',
        design: mixDetailData.data.CementDesign2 ? mixDetailData.data.CementDesign2 : 0,
        actual: mixDetailData.data.CementActual2 ? mixDetailData.data.CementActual2 : 0,
        warning: mixDetailData.data.CementExcess2 ? mixDetailData.data.CementExcess2 : 0
      },
      {
        name: '水泥3',
        design: mixDetailData.data.CementDesign3 ? mixDetailData.data.CementDesign3 : 0,
        actual: mixDetailData.data.CementActual3 ? mixDetailData.data.CementActual3 : 0,
        warning: mixDetailData.data.CementExcess3 ? mixDetailData.data.CementExcess3 : 0
      },
      {
        name: '砂1',
        design: mixDetailData.data.SandDesign1 ? mixDetailData.data.SandDesign1 : 0,
        actual: mixDetailData.data.SandActual1 ? mixDetailData.data.SandActual1 : 0,
        warning: mixDetailData.data.SandExcess1 ? mixDetailData.data.SandExcess1 : 0
      },
      {
        name: '砂2',
        design: mixDetailData.data.SandDesign2 ? mixDetailData.data.SandDesign2 : 0,
        actual: mixDetailData.data.SandActual2 ? mixDetailData.data.SandActual2 : 0,
        warning: mixDetailData.data.SandExcess2 ? mixDetailData.data.SandExcess2 : 0
      },
      {
        name: '碎石1',
        design: mixDetailData.data.GravelDesign1 ? mixDetailData.data.GravelDesign1 : 0,
        actual: mixDetailData.data.GravelActual1 ? mixDetailData.data.GravelActual1 : 0,
        warning: mixDetailData.data.GravelExcess1 ? mixDetailData.data.GravelExcess1 : 0
      },
      {
        name: '碎石2',
        design: mixDetailData.data.GravelDesign2 ? mixDetailData.data.GravelDesign2 : 0,
        actual: mixDetailData.data.GravelActual2 ? mixDetailData.data.GravelActual2 : 0,
        warning: mixDetailData.data.GravelExcess2 ? mixDetailData.data.GravelExcess2 : 0
      },
      {
        name: '碎石3',
        design: mixDetailData.data.GravelDesign3 ? mixDetailData.data.GravelDesign3 : 0,
        actual: mixDetailData.data.GravelActual3 ? mixDetailData.data.GravelActual3 : 0,
        warning: mixDetailData.data.GravelExcess3 ? mixDetailData.data.GravelExcess3 : 0
      },
      {
        name: '碎石4',
        design: mixDetailData.data.GravelDesign4 ? mixDetailData.data.GravelDesign4 : 0,
        actual: mixDetailData.data.GravelActual4 ? mixDetailData.data.GravelActual4 : 0,
        warning: mixDetailData.data.GravelExcess4 ? mixDetailData.data.GravelExcess4 : 0
      },
      {
        name: '矿粉',
        design: mixDetailData.data.MineralPowderDesign ? mixDetailData.data.MineralPowderDesign : 0,
        actual: mixDetailData.data.MineralPowderActual ? mixDetailData.data.MineralPowderActual : 0,
        warning: mixDetailData.data.MineralPowderExcess ? mixDetailData.data.MineralPowderExcess : 0
      },
      {
        name: '粉煤灰',
        design: mixDetailData.data.FlyAshDesign ? mixDetailData.data.FlyAshDesign : 0,
        actual: mixDetailData.data.FlyAshActual ? mixDetailData.data.FlyAshActual : 0,
        warning: mixDetailData.data.FlyAshExcess ? mixDetailData.data.FlyAshExcess : 0
      },
      {
        name: '外加剂',
        design: mixDetailData.data.WaterReduceDesign ? mixDetailData.data.WaterReduceDesign : 0,
        actual: mixDetailData.data.WaterReduceActual ? mixDetailData.data.WaterReduceActual : 0,
        warning: mixDetailData.data.WaterReduceExcess ? mixDetailData.data.WaterReduceExcess : 0
      }
    ]
    console.log(data, 'data')
    return data
  }
  //获取option的value
  const getChartOtion = () => {
    let excess = {
      zero: 0,
      one: 0,
      two: 0,
      three: 0
    }
    mixData.data.forEach((item, index) => {
      if (item.ExcessGrade === 0) {
        excess.zero++
      } else if (item.ExcessGrade === 1) {
        excess.one++
      } else if (item.ExcessGrade === 2) {
        excess.two++
      } else if (item.ExcessGrade === 3) {
        excess.three++
      }
    })
    // 超标等级饼状图option
    excessGradeOption.option.series[0].data[0].value = excess.zero
    excessGradeOption.option.series[0].data[1].value = excess.one
    excessGradeOption.option.series[0].data[2].value = excess.two
    excessGradeOption.option.series[0].data[3].value = excess.three
  }

  // 渲染图表
  const chartSetOption = (chart, option) => {
    // console.log('渲染图表')
    chart.setOption(option)
    resetOption(chart, option)
  }
  // 图表重绘
  const resetOption = (myChart, option) => {
    setInterval(() => {
      getChartOtion()
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
        item.MixingStationCode,
        item.TaskId,
        item.PouringPosition,
        item.StrengthGrade,
        item.QuanityActual,
        item.DischargeTime,
        item.ExcessGrade,
        item.MixingstationCode,
        item.WaterCementRatio,
        item.SandRatio,
        item.UploadTime,
        item.CarNo,
        item.ProportionoperId,
        item.Operator,
        item.MixingDuration,
        item.WaterActual1,
        item.WaterActual2,
        item.CementActual1,
        item.CementActual2,
        item.CementActual3,
        item.SandActual1,
        item.SandActual2,
        item.GravelActual1,
        item.GravelActual2,
        item.GravelActual3,
        item.GravelActual4,
        item.MineralPowderActual,
        item.FlyAshActual,
        item.WaterReduceActual
      ]
    })
    arr.unshift(exportExcelColumns.data)
    return arr
  }
  // 导出excel
  const exportExcelData = () => {
    exportExcel('拌合站数据', getExportExcelData(mixData.data))
  }

  return {
    mixData,
    getMixData,
    mixColumns,
    mixDataKey,
    totalPage,
    mixDetailContent1,
    detailDialogVisible,
    mixDetailData,
    showDetailDialog,
    mixDetailContent2,
    getDetailTableData,
    mixDetailTableData,
    chartSetOption,
    excessGradeOption,
    actualQuantityOption,
    exportExcelData
  }
})
