import { defineStore } from 'pinia'
import axios from 'axios'
import { reactive, ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'vue-router'

export const useSettingEquipTemplateStore = defineStore('settingEquipTemplate', () => {
  // 展示的模板卡片
  const templateList = reactive({
    data: [
      {
        showName: '一号模板', //展示名称
        name: 'room2', //筛选棚号
        rtspUrl: 'rtsp://', //监控地址
        runningImg: '', //运行图片
        standbyImg: '', //待机图片
        is_monitor: true, //是否监控
        id: uuidv4()
      }
    ]
  })

  //   获取模板列表
  const getTemplateList = async () => {
    if (localStorage.getItem('templateList')) {
      templateList.data = JSON.parse(localStorage.getItem('templateList'))
    }
  }
  //   增加新的模板
  const addTemplate = (data) => {
    if (templateList.data.length >= 10) {
      return
    }
    // 添加一个空的模板卡片
    templateList.data.push({
      showName: '待定',
      name: '',
      rtspUrl: '',
      runningImg: '',
      standbyImg: '',
      is_monitor: true,
      id: uuidv4()
    })
    console.log(templateList.data, '添加后的数据')
    localStorage.setItem('templateList', JSON.stringify(templateList.data))
  }

  //   删除模板
  const deleteTemplate = (index) => {
    templateList.data = templateList.data.filter((item, i) => item.id !== index)
    console.log(templateList.data, '删除后的数据')
    localStorage.setItem('templateList', JSON.stringify(templateList.data))
  }

  // 修改模板信息
  const changeTemplate = (index, data) => {
    templateList.data[index] = data
    localStorage.setItem('templateList', JSON.stringify(templateList.data))
  }

  return {
    templateList,
    getTemplateList,
    addTemplate,
    deleteTemplate,
    changeTemplate
  }
})
