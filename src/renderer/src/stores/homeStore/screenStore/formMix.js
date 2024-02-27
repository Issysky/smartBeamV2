// 大屏拌合站信息表格store
import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import axios from 'axios'

export const useFormMixStore = defineStore('form', () => {
  const tableData = reactive({
    label: [
      {
        label: '工单号',
        prop: 'TaskId'
      },
      {
        label: '浇筑部位',
        prop: 'PouringPosition'
      },
      {
        label: '超标等级',
        prop: 'ExcessGrade'
      }
    ],
    data: [
      {
        TaskId: 'sjdhsfjhsf23890',
        PouringPosition: 'Tom',
        ExcessGrade: 0
      },
      {
        TaskId: 'sjdhsfjhsf238903',
        PouringPosition: 'Tom',
        ExcessGrade: 1
      },
      {
        TaskId: 'sjdhsfjhsf23890',
        PouringPosition: 'Tom',
        ExcessGrade: 0
      },
      {
        TaskId: 'sjdhsfjhsf23890',
        PouringPosition: 'Tom',
        ExcessGrade: 2
      }
    ],
    width: ['30%', '45%', '20%']
  })
  // 在线状态
  const online = localStorage.getItem('online') === 'online' ? true : false
  const url = '/device/mix_station/'
  // 获取最新数据
  const getTableData = async () => {
    if (!online) {
      console.log('拌合站离线状态')
      tableData.data = JSON.parse(localStorage.getItem('formMixData'))
    } else {
      console.log('拌合站在线状态')
      const res = await axios.get(url, {
        headers: { Authorization: localStorage.getItem('token') }
      })
      tableData.data = res.data
      
      localStorage.setItem('formMixData', JSON.stringify(res.data))
    }
  }
  return { tableData, getTableData }
})
