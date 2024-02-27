// 环境监测store
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import axiox from 'axios'

export const useEnvStore = defineStore('env', () => {
  // 定义空气质量option
  const airOption = reactive({
    option: {
      series: [
        {
          type: 'gauge',
          startAngle: 225,
          endAngle: -45,
          min: 0,
          max: 250,
          axisLine: {
            lineStyle: {
              width: 15,
              // color: [
              //   [0.14, '#aefdae'],
              //   [0.3, '#b0edef'],
              //   [0.7, '#f7ea8e'],
              //   [1, '#F1B2B2']
              // ]
              color: [
                [0.14, '#1aaf8b'],
                [0.3, '#34b2f7'],
                [0.7, '#f5bc16'],
                [1, '#fe4500']
              ]
            }
          },
          pointer: {
            itemStyle: {
              color: 'auto'
            }
          },
          axisTick: {
            distance: -15,
            length: 0,
            lineStyle: {
              color: '#fff',
              width: 2
            }
          },
          splitLine: {
            distance: -15,
            length: 7,
            lineStyle: {
              color: '#fff',
              width: 3
            }
          },
          axisLabel: {
            color: '#fafafadd',
            distance: -8,
            fontSize: 12,
            rotate: 'tangential',
            formatter: function (value) {
              if (value === 25) {
                return '优'
              } else if (value === 75) {
                return '良'
              } else if (value === 175) {
                return '轻'
              } else if (value == 225) {
                return '重'
              }
              return ''
            }
          },

          data: [
            {
              name: '',
              title: {
                show: true,
                fontSize: 8,
                offsetCenter: [0, '45%'],
                color: '#fafafadd'
              },
              value: 60,
              detail: {
                distance: -60,
                valueAnimation: true,
                formatter: '{value} μg/m3',
                color: '#fafafadd',
                offsetCenter: [0, '60%'],
                fontSize: 8
              }
            }
          ]
        }
      ]
    }
  })
  // 定义噪音option
  const noiseOption = reactive({
    option: {
      series: [
        {
          type: 'gauge',
          startAngle: 225,
          endAngle: -45,
          min: 30,
          max: 60,
          axisLine: {
            lineStyle: {
              width: 15,
              color: [
                [0.33, '#1aaf8b'],
                [0.66, '#f5bc16'],
                [1, '#fe4500']
              ]
            }
          },
          pointer: {
            itemStyle: {
              color: 'auto'
            }
          },
          axisTick: {
            distance: -15,
            length: 0,
            lineStyle: {
              color: '#fff',
              width: 2
            }
          },
          splitLine: {
            distance: -15,
            length: 7,
            lineStyle: {
              color: '#fff',
              width: 3
            }
          },
          axisLabel: {
            color: '#fafafadd',
            distance: -8,
            fontSize: 12,
            rotate: 'tangential',
            formatter: function (value) {
              if (value === 36) {
                return '优'
              } else if (value === 54) {
                return '重'
              }
              return ''
            }
          },

          data: [
            {
              name: '',
              title: {
                show: true,
                fontSize: 8,
                offsetCenter: [0, '45%'],
                color: '#fafafadd'
              },
              value: 60,
              detail: {
                distance: -60,
                valueAnimation: true,
                formatter: '{value} 分贝',
                color: '#fafafadd',
                offsetCenter: [0, '60%'],
                fontSize: 8
              }
            }
          ]
        }
      ]
    }
  })
  // 在线状态
  const online = localStorage.getItem('online') === 'online'
  // 环境数据
  const envData = reactive({
    data: {
      humidity: 0,
      wind_speed: 0,
      temperature: 0
    }
  })
  // 环境监测请求参数
  const envParams = reactive({
    name: '测试一号机',
    type: 'latest_data'
  })
  const url = 'device/environment/'
  //   获取环境数据
  const getEnvData = async (chart, type) => {
    getEnvDataFromLocalStorage(chart, type)
    // console.log(envParams, 'envParams')
    // 在线状态存储数据
    if (online) {
      const res = await axiox.get(url, {
        params: { name:envParams.name,type: envParams.type },
        headers: { Authorization: localStorage.getItem('token') }
      })
      // console.log(res,'envres')
      getOption(res.data[0])
      if (type == 'air') {
        chartSetOption(chart, airOption.option)
        resetOption(chart, airOption.option)
      } else if (type == 'noise') {
        chartSetOption(chart, noiseOption.option)
        resetOption(chart, noiseOption.option)
      }
      envData.data = res.data[0]
      localStorage.setItem('envData', JSON.stringify(envData.data))
    }
  }
  // 修改环境数据请求参数
  const changeEnvParams = (name) => {
    envParams.name = name
  }
  //   图表渲染
  const chartSetOption = (chart, option) => {
    // console.log('渲染图表')
    chart.setOption(option)
  }
  // 更改图表option
  const getOption = (data) => {
    airOption.option.series[0].data[0].value = data.pm2_5
    noiseOption.option.series[0].data[0].value = data.noise
  }
  // 图表重绘
  const resetOption = (myChart, option) => {
    setInterval(() => {
      myChart.clear()
      myChart.setOption(option)
    }, 5000)
  }
  // 离线状态从localStorage中获取数据
  const getEnvDataFromLocalStorage = (chart, type) => {
    if (!online) {
      console.log('env离线')
      const data = localStorage.getItem('envData')
      envData.data = JSON.parse(data)
      if (envData.data) {
        getOption(envData.data)
      }
      if (type == 'air') {
        chartSetOption(chart, airOption.option)
        resetOption(chart, airOption.option)
      } else if (type == 'noise') {
        chartSetOption(chart, noiseOption.option)
        resetOption(chart, noiseOption.option)
      }
    }
  }

  return { getEnvData, envData,changeEnvParams }
})
