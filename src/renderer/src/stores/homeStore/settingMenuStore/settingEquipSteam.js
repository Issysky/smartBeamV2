import { defineStore } from 'pinia'
import axios from 'axios'
import { reactive, ref } from 'vue'
import {v4 as uuidv4} from 'uuid'
import { useRouter } from 'vue-router'

export const useSettingEquipSteamStore = defineStore('settingEquipSteam', () => {

  const router = useRouter()
  // 展示的蒸养棚卡片
  const steamList = reactive({
    data: [
      {
        showName: '一号棚', //展示名称
        name: 'room2', //筛选棚号
        rtspUrl: 'rtsp://', //监控地址
        runningImg: '', //运行图片
        standbyImg: '', //待机图片
        is_monitor: true ,//是否监控
        id: uuidv4(),
      }
    ]
  })
  //   获取蒸养棚列表
  const getSteamList = async () => {
    if (localStorage.getItem('steamList')) {
      steamList.data = JSON.parse(localStorage.getItem('steamList'))
    }
  }
  //   增加新的蒸养棚
  const addSteam = (data) => {
    if (steamList.data.length >= 10) {
      return
    }
    // 添加一个空的蒸养棚卡片
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

  //   删除蒸养棚
  const deleteSteam = (index) => {
    // console.log(index,'删除的index')
    // steamList.data.splice(index, 1)
    
    console.log(index,'收到的id')
   steamList.data = steamList.data.filter((item, i) => item.id !== index)
    console.log(steamList.data,'删除后的数据')
    localStorage.setItem('steamList', JSON.stringify(steamList.data))
  }

  // 修改蒸养棚信息
  const changeSteam = (index, data) => {
    steamList.data[index] = data
    localStorage.setItem('steamList', JSON.stringify(steamList.data))
  }
  
  return {
    steamList,
    addSteam,
    deleteSteam,
    getSteamList,
    changeSteam
  }
})
