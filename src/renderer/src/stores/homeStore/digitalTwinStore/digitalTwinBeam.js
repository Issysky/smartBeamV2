// 梁场数字孪生
import { defineStore } from 'pinia'
import axios from 'axios'
import { reactive, ref } from 'vue'
import { exportExcel } from '@renderer/utils/excelConfig.js'

export const useDigitalTwinBeamStore = defineStore('digitalTwinBeam', () => {
  const clickObjName = ref('')

  const changeClickObjName = (name) => {
    clickObjName.value = name
  }
  return {
    clickObjName,
    changeClickObjName
  }
})
