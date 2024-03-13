// 劳务系统，场内统计
import { defineStore } from 'pinia'
import axios from 'axios'
import { reactive, ref } from 'vue'
import { exportExcel } from '@renderer/utils/excelConfig.js'

export const useLaborBasicStore = defineStore('laborBasic', () => {
  // 请求地址
  const url = '/labor/labor_basic/'

  // 安全事件图表数据
  const laborBasicData = reactive({
    data: []
  })
  // 总页数
  const totalPage = ref(0)
  // 图表的表头
  const laborBasicColumns = [
    { name: '序号', width: '', key: 'id' },
    { name: '姓名', width: '', key: 'name' },
    { name: '编号', width: '', key: 'numbering' },
    { name: '所在项目', width: '', key: 'index4' },
    { name: '所在区域', width: '', key: 'index5' },
    { name: '班组名称', width: '', key: 'index6' },
    { name: '联系电话', width: '', key: 'index7' },
    { name: '工作时长', width: '', key: 'index8' },
    { name: '刷卡照片', width: '', key: 'index9' }
  ]
  // 图表数据的key
  const laborBasicDataKey = [
    'id',
    'name',
    'numbering',
    'index4',
    'index5',
    'index6',
    'index7',
    'index8',
    'index9'
  ]
  //   表格顶部四个卡片的数据
  const cardData = reactive({
    data: []
  })
  // echarts图表option1
  const laborBasicChartOption1 = reactive({
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
        text: '近7天出勤趋势(日/人)'
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          areaStyle: {}
        }
      ]
    }
  })
  // echarts图表option2
  const laborBasicChartOption2 = reactive({
    option: {
      title: {
        text: '场内人员统计(24h)'
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
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    }
  })
  // 获取劳务系统，场内统计数据
  const getLaborBasicData = async (params) => {
    // const res = await axios.get(url, {
    //   params: params,
    // })
    const res = {
      data: {
        data: [
          {
            id: 1,
            name: '张三',
            numbering: '001',
            index4: '项目1',
            index5: '区域1',
            index6: '班组1',
            index7: '123456789',
            index8: '8h',
            index9: '照片1'
          },
          {
            id: 2,
            name: '李四',
            numbering: '002',
            index4: '项目2',
            index5: '区域2',
            index6: '班组2',
            index7: '123456789',
            index8: '8h',
            index9: '照片2'
          },
          {
            id: 3,
            name: '王五',
            numbering: '003',
            index4: '项目3',
            index5: '区域3',
            index6: '班组3',
            index7: '123456789',
            index8: '8h',
            index9: '照片3'
          },
          {
            id: 4,
            name: '赵六',
            numbering: '004',
            index4: '项目4',
            index5: '区域4',
            index6: '班组4',
            index7: '123456789',
            index8: '8h',
            index9: '照片4'
          },
          {
            id: 5,
            name: '田七',
            numbering: '005',
            index4: '项目5',
            index5: '区域5',
            index6: '班组5',
            index7: '123456789',
            index8: '8h',
            index9: '照片5'
          },
          {
            id: 6,
            name: '王八',
            numbering: '006',
            index4: '项目6',
            index5: '区域6',
            index6: '班组6',
            index7: '123456789',
            index8: '8h',
            index9: '照片6'
          },
          {
            id: 7,
            name: '赵九',
            numbering: '007',
            index4: '项目7',
            index5: '区域7',
            index6: '班组7',
            index7: '123456789',
            index8: '8h',
            index9: '照片7'
          },
          {
            id: 8,
            name: '钱十',
            numbering: '008',
            index4: '项目8',
            index5: '区域8',
            index6: '班组8',
            index7: '123456789',
            index8: '8h',
            index9: '照片8'
          },
          {
            id: 9,
            name: '孙十一',
            numbering: '009',
            index4: '项目9',
            index5: '区域9',
            index6: '班组9',
            index7: '123456789',
            index8: '8h',
            index9: '照片9'
          },
          {
            id: 10,
            name: '李十二',
            numbering: '010',
            index4: '项目10',
            index5: '区域10',
            index6: '班组10',
            index7: '123456789',
            index8: '8h',
            index9: '照片10'
          },
          {
            id: 11,
            name: '张十三',
            numbering: '011',
            index4: '项目11',
            index5: '区域11',
            index6: '班组11',
            index7: '123456789',
            index8: '8h',
            index9: '照片11'
          },
          {
            id: 12,
            name: '王十四',
            numbering: '012',
            index4: '项目12',
            index5: '区域12',
            index6: '班组12',
            index7: '123456789',
            index8: '8h',
            index9: '照片12'
          },
          {
            id: 13,
            name: '赵十五',
            numbering: '013',
            index4: '项目13',
            index5: '区域13',
            index6: '班组13',
            index7: '123456789',
            index8: '8h',
            index9: '照片13'
          },
          {
            id: 14,
            name: '王十四',
            numbering: '012',
            index4: '项目12',
            index5: '区域12',
            index6: '班组12',
            index7: '123456789',
            index8: '8h',
            index9: '照片12'
          },
          {
            id: 15,
            name: '赵十五',
            numbering: '013',
            index4: '项目13',
            index5: '区域13',
            index6: '班组13',
            index7: '123456789',
            index8: '8h',
            index9: '照片13'
          }
        ],
        total_pages: 2
      }
    }
    laborBasicData.data = res.data.data
    totalPage.value = res.data.total_pages
    getCardData()
  }
  //   获取表格卡片数据
  const getCardData = async (params) => {
    const res = {
      data: [
        {
          label: '在册人车总数',
          value: 100,
          label1: '人员',
          value1: 50,
          label2: '车辆',
          value2: 50
        },
        {
          label: '场内人员总数',
          value: 100,
          unit: '人'
        },
        {
          label: '场内车辆总数',
          value: 100,
          unit: '辆'
        },
        {
          label: '今日出勤人车总数',
          value: 100,
          label1: '人员',
          value1: 50,
          label2: '车辆',
          value2: 50
        }
      ]
    }
    cardData.data = res.data
  }
  // 渲染图表
  const renderChart = (mychart, index) => {
    if (index === 1) {
      mychart.setOption(laborBasicChartOption1.option)
    } else if (index === 2) {
      mychart.setOption(laborBasicChartOption2.option)
    }
  }

  return {
    laborBasicData,
    totalPage,
    laborBasicColumns,
    laborBasicDataKey,
    cardData,
    laborBasicChartOption1,
    laborBasicChartOption2,
    renderChart,
    getCardData,
    getLaborBasicData
  }
})
