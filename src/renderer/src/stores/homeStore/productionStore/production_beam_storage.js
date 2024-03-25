// 生产数据 存梁页面
import { defineStore } from 'pinia'
import axios from 'axios'
import { reactive, ref } from 'vue'
import { exportExcel } from '@renderer/utils/excelConfig.js'
import * as THREE from 'three'

import * as ahmThree from '@renderer/utils/ahmThree.js'

export const useProductionBeamStorageStore = defineStore('ProductionBeamStorage', () => {
  // 初始化场景变量
  let renderer = null
  // 初始化数据
  const initRender = (x,y) => {
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.shadowMap.enabled = true
    renderer.setSize(x, y)
  }
  return {
    renderer,
    initRender,
  }
})
