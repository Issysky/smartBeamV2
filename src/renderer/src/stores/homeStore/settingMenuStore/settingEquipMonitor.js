import { defineStore } from 'pinia'
import axios from 'axios'
import { reactive, ref } from 'vue'
import {v4 as uuidv4} from 'uuid'
import { useRouter } from 'vue-router'

export const useSettingEquipMonitorStore = defineStore('settingEquipMonitor', () => {

  const router = useRouter()
  // 展示的监控卡片
  const monitorList = reactive({
    data: [
      {
        name: '厂区1', //展示名称
        position: '位置', //筛选棚号
        rtspUrl: '', //监控地址
        id: uuidv4(),
      }
    ]
  })
  //   获取监控列表
  const getMonitorList = async () => {
    if (localStorage.getItem('monitorList')) {
      steamList.data = JSON.parse(localStorage.getItem('monitorList'))
    }
  }
  //   增加新的监控
  const addMonitor = (data) => {
    if (steamList.data.length >= 10) {
      return
    }
    // 添加一个空的监控卡片
    steamList.data.push({
      showName: '待定',
      name: '',
      rtspUrl: '',
      runningImg: '',
      standbyImg: '',
      is_monitor: true,
      id: uuidv4()
    })
    console.log(steamList.data,'添加后的数据')
    localStorage.setItem('steamList', JSON.stringify(steamList.data))
  }

  //   删除监控
  const deleteMonitor = (index) => {
    // console.log(index,'删除的index')
    // steamList.data.splice(index, 1)
    
    console.log(index,'收到的id')
   steamList.data = steamList.data.filter((item, i) => item.id !== index)
    console.log(steamList.data,'删除后的数据')
    localStorage.setItem('steamList', JSON.stringify(steamList.data))
  }

  // 修改监控信息
  const changeMonitor = (index, data) => {
    steamList.data[index] = data
    localStorage.setItem('MmnitorList', JSON.stringify(steamList.data))
  }
  
  return {
    steamList,
    addSteam,
    deleteSteam,
    getSteamList,
    changeSteam
  }
})
