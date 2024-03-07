// 梁场数字孪生
import { defineStore } from 'pinia'
import axios from 'axios'
import { reactive, ref } from 'vue'
import { exportExcel } from '@renderer/utils/excelConfig.js'

export const useDigitalTwinBeamStore = defineStore('digitalTwinBeam', () => {
  // 点击对象名
  const clickObjName = ref('')
  // 点击对象的userData
  const objData = reactive({
    userData: {
      name: ''
    }
  })
  // 弹窗的位置
  const dialogPosition = reactive({
    x: 0,
    y: 0
  })

  const changeClickObjName = (name) => {
    clickObjName.value = name
  }

  const changeObjData = (data) => {
    objData.userData = data
  }
  //   改变点击位置
  const changeDialogPosition = (x, y) => {
    dialogPosition.x = x+'px'
    dialogPosition.y = y+'px'
  }
  return {
    clickObjName,
    objData,
    dialogPosition,
    changeObjData,
    changeClickObjName,
    changeDialogPosition
  }
})
