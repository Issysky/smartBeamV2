// 生产计划store
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import axios from 'axios'

export const useProductionPlanStore = defineStore('productionPlan', () => {
  // 定义是否显示弹窗
  const isShow = ref(false)
  // 定义时间
  let time = ref('2024-01-02')
  // 已计划生产列表
  const planedList = reactive({
    data: {
      rest_beam: {}
    }
  })
  // 已计划生产列表的请求地址
  const planedUrl = '/beam/plan/'
  // 本月计划生产片数
  const curMonthPlaned = ref(0)
  // 日历显示信息
  let calenderPlan = reactive({
    events: [
      {
        date: '2024-01-13',
        title: '计划值:100'
      },
      {}
    ]
  })
  // 获取已计划生产列表
  const getPlanedList = async () => {
    const res = await axios.get(planedUrl, {
      params: {
        that_day: time.value
      },
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
    planedList.data = res.data
    console.log(planedList.data)
  }
  // 获取本月计划生产片数
  const getCurMonthPlaned = async (month) => {
    const res = await axios.get(planedUrl, {
      params: {
        query_month: month
      },
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
    // 本月计划生产片数
    curMonthPlaned.value= res.data.total_count
  }
  // 删除已计划生产列表的数据
  const delPlanedList = async (id) => {
    await axios
      .delete(planedUrl + id + '/', {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      .then((res) => {
        console.log('删除已计划生产列表的数据成功')
        getPlanedList()
        getCalenderPlan()
      })
      .catch((error) => {
        console.error('删除已计划生产列表的数据失败', error.response)
      })
    planedList.data.results = planedList.data.results.filter((item) => {
      return item.id !== id
    })
  }
  // 新增生产列表数据
  const addPlanedList = async (data) => {
    await axios
      .post(planedUrl, data, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      .then((res) => {
        console.log('新增生产列表数据成功')
        getPlanedList()
        getCalenderPlan()
      })
      .catch((error) => {
        console.error('新增生产列表数据失败', error.response)
      })
  }
  // 修改显示
  const changeShow = (show) => {
    isShow.value = show
  }
  // 修改时间
  const changeTime = (newTime) => {
    time.value = newTime
  }
  // 返回日历信息
  const getCalenderPlan = async () => {
    return await axios
      .get(planedUrl, {
        params: {
          query_month: time.value.substring(0, 7)
        },
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      .then((res) => {
        let arr = []
        for (let key in res.data.day_count) {
          arr.push({
            date: key,
            title: '计划值' + res.data.day_count[key]
          })
        }
        calenderPlan.events = [...arr]
        return arr
      })
      .catch((error) => {
        console.error('获取日历信息失败', error.response)
      })
  }

  return {
    planedList,
    getPlanedList,
    delPlanedList,
    addPlanedList,
    time,
    isShow,
    changeShow,
    changeTime,
    calenderPlan,
    getCalenderPlan,
    curMonthPlaned,
    getCurMonthPlaned
  }
})
