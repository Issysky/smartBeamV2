// 年度生产曲线store
import { defineStore } from 'pinia'
import axios from 'axios'
import { reactive, ref } from 'vue'

export const useChartYearStore = defineStore('chartYear', () => {
  const option = reactive({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function (params) {
        return (
          params[0].name +
          '<br/>' +
          params[0].marker +
          params[0].seriesName +
          ' : ' +
          params[0].value +
          '<br/>' +
          params[1].marker +
          params[1].seriesName +
          ' : ' +
          params[1].value
        )
      }
    },
    legend: {
      top: 30, // 将图例放在底部
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
        data: [],
        minInterval: 4
      },
      {
        type: 'value',
        show: false
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '未完成',
        type: 'bar',
        emphasis: {
          focus: 'series'
        },
        lineStyle: {
          color: '#34b2f7'
        },
        itemStyle: {
          color: '#34b2f7'
        },
        data: []
      },
      {
        name: '未完成',
        type: 'line',
        data: [],
        xAxisIndex: 1,
        emphasis: {
          focus: 'series'
        },
        lineStyle: {
          color: '#34b2f7'
        },
        itemStyle: {
          color: '#34b2f7'
        },
        smooth: true
      },
      {
        name: '已完成',
        type: 'bar',
        data: [],
        lineStyle: {
          color: '#f5bc16'
        },
        itemStyle: {
          color: '#f5bc16'
        },
        emphasis: {
          focus: 'series'
        }
      },
      {
        name: '已完成',
        type: 'line',
        data: [],
        xAxisIndex: 1,
        emphasis: {
          focus: 'series'
        },
        lineStyle: {
          color: '#f5bc16'
        },
        itemStyle: {
          color: '#f5bc16'
        },
        smooth: true
      }
    ]
  })

  const url = '/beam/plan/'
  //   重新渲染图表
  const chartSetOption = (myChart) => {
    myChart.setOption(option)
  }

  // 模拟已完成数据
  const resData = {
    一月: 12,
    二月: 3,
    三月: 2,
    四月: 3,
    五月: 5,
    六月: 6,
    七月: 13,
    八月: 23,
    九月: 22,
    十月: 12,
    十一月: 9,
    十二月: 10
  }
  //   获取图表数据
  const getChartData = async (myChart, year, type) => {
    await axios
      .get(url, {
        params: {
          monthly_plan: year
        },
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      .then((res) => {
        getSeriesData(res.data)
        getxAxisData(res.data)
        chartSetOption(myChart, type)
      })
      .catch((err) => {
        console.log(err, '请求错误')
      })
  }

  // 获取option的xAxis数据
  const getxAxisData = (data) => {
    let arr = []
    for (let key in data) {
      arr.push(key)
    }
    option.xAxis[0].data = arr
  }
  const getSeriesData = (data) => {
    let arr = []
    for (let key in data) {
      arr.push(data[key])
    }
    option.series[0].data = arr
    option.series[1].data = arr
    arr = []
    for (let key in resData) {
      arr.push(resData[key])
    }
    option.series[2].data = arr
    option.series[3].data = arr
    // 为了让折线图和柱状图顶点重合
    option.series[1].data = option.series[1].data.map((item, index) => [index * 100 + 30, item])
    option.series[3].data = option.series[3].data.map((item, index) => [index * 100 + 70, item])
  }
  return {
    option,
    chartSetOption,
    getChartData
  }
})
