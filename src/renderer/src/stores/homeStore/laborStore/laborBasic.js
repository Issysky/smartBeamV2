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
    { name: '编号', width: '', key: 'numbering' }
  ]
  // 图表数据的key
  const laborBasicDataKey = ['id', 'name', 'numbering']
  //   表格顶部四个卡片的数据
  const cardData = reactive({
    data: []
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
            numbering: '001'
          },
          {
            id: 2,
            name: '李四',
            numbering: '002'
          },
          {
            id: 3,
            name: '王五',
            numbering: '003'
          },
          {
            id: 4,
            name: '赵六',
            numbering: '004'
          },
          {
            id: 5,
            name: '田七',
            numbering: '005'
          }
        ],
        total_pages: 1
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

  return {
    laborBasicData,
    totalPage,
    laborBasicColumns,
    laborBasicDataKey,
    cardData,
    getCardData,
    getLaborBasicData
  }
})
