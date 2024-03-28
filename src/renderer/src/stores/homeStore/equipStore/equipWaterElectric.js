// 设备数据 临水临电监测的store
import { defineStore } from 'pinia'
import axios from 'axios'
import { reactive, ref } from 'vue'

export const useEquipWaterElectricStore = defineStore('equipWaterElectric', () => {
  // 用水折线图
  const waterLineOption = reactive({
    option: {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      title: {
        text: '用水量统计'
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          color: '#409EFF',
          areaStyle: {}
        }
      ]
    }
  })
  //   用电折线图
  const electricLineOption = reactive({
    option: {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      title: {
        text: '用电量统计'
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          color: '#f5bc16',
          areaStyle: {}
        }
      ]
    }
  })
  // 用水柱状图
  const waterBarOption = reactive({
    option: {
      title: {
        text: ''
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
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
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          itemStyle: {
            color: '#1aaf8b'
          },
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    }
  })
  //   用电柱状图
  const electricBarOption = reactive({
    option: {
      title: {
        text: ''
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
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
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          itemStyle: {
            color: '#1aaf8b'
          },
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    }
  })

  // 渲染图表
  const renderChart = (mychart, option) => {
    mychart.setOption(option)
  }

  return {
    waterLineOption,
    electricLineOption,
    waterBarOption,
    electricBarOption,
    renderChart
  }
})
