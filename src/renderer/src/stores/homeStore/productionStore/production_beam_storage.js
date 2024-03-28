// 生产数据 存梁页面
import { defineStore } from 'pinia'
import axios from 'axios'
import { reactive, ref } from 'vue'
import { exportExcel } from '@renderer/utils/excelConfig.js'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js'

export const useProductionBeamStorageStore = defineStore('ProductionBeamStorage', () => {
  // 定义threejs变量
  let renderer = reactive({})
  let is_rendered = ref(false)
  let scene = new THREE.Scene()
  let camera = null
  let controls = null
  let raycaster = new THREE.Raycaster()
  //   归一化鼠标
  let mouse = new THREE.Vector2()
  //   窗口大小
  let sceneX = ref(1500)
  let sceneY = ref(500)
  //   模型材质
  let defaultMaterial = null

  //   请求存梁信息的接口
  const beamStorageUrl = '/beam/storage_pedstal/'

  // 存梁信息
  const beamStorageInfo = reactive({
    data: {}
  })
  //   表格数据
  const tableData = reactive({
    data: []
  })
  //   分页后的数据
  const pageData = reactive({})

  //   总页数
  const totalPage = ref(0)

  //   存梁信息表头
  const beamStorageColumns = [
    { name: '编号', width: '', key: 'id' },
    { name: '存梁场', width: '', key: 'area' },
    { name: '底座名称', width: '', key: 'name' },
    { name: '所在层', width: '', key: 'floor' },
    { name: '行序号', width: '', key: 'column' },
    { name: '列序号', width: '', key: 'row' },
    { name: '梁片名称', width: '', key: 'beam_name' },
    { name: '梁型', width: '', key: 'beam_type' },
    { name: '存梁时间', width: '', key: 'beam_storage_time' }
  ]

  // 图表数据的key
  const beamStorageDataKey = [
    'id',
    'area',
    'name',
    'floor',
    'column',
    'row',
    'beam_name',
    'beam_type',
    'beam_storage_time'
  ]
  //   请求存梁信息
  const getBeamStorage = async () => {
    try {
      let res = await axios.get(beamStorageUrl, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      beamStorageInfo.data = res.data
      getTableData()
    } catch (error) {
      console.error(error)
    }
  }
  //   获取表格数据,给下方图表用
  const getTableData = () => {
    let data = []
    console.log(beamStorageInfo.data['1#台座']['1'], 'beamStorageInfo.data')
    Object.keys(beamStorageInfo.data).forEach((key) => {
      // 处理一层二层数据
      if (beamStorageInfo.data[key]['1'].beam_name) {
        let item = {
          id: beamStorageInfo.data[key]['1'].id,
          name: key,
          row: beamStorageInfo.data[key].row,
          column: beamStorageInfo.data[key].column,
          area: beamStorageInfo.data[key].area,
          floor: 1,
          beam_name: beamStorageInfo.data[key]['1'].beam_name,
          //   如果存在时间,则拼接时间,不存在返回空
          beam_storage_time: beamStorageInfo.data[key]['1'].beam_storage_time
            ? beamStorageInfo.data[key]['1'].beam_storage_time.split('T')[0] +
              ' ' +
              ' ' +
              beamStorageInfo.data[key]['1'].beam_storage_time.split('T')[1]
            : '',
          beam_type: beamStorageInfo.data[key]['1'].beam_type
        }
        data.push(item)
      }
      if (beamStorageInfo.data[key]['2'].beam_name) {
        let item = {
          name: key,
          row: beamStorageInfo.data[key].row,
          column: beamStorageInfo.data[key].column,
          area: beamStorageInfo.data[key].area,
          floor: 2,
          beam_name: beamStorageInfo.data[key]['2'].beam_name,
          beam_storage_time: beamStorageInfo.data[key]['2'].beam_storage_time
            ? beamStorageInfo.data[key]['2'].beam_storage_time.split('T')[0] +
              ' ' +
              ' ' +
              beamStorageInfo.data[key]['2'].beam_storage_time.split('T')[1]
            : '',
          beam_type: beamStorageInfo.data[key]['2'].beam_type
        }
        data.push(item)
      }
    })
    console.log(data, 'tabledata')
    tableData.data = data
    getPageData(1)
  }
  //   获取分页后的数据
  const getPageData = (page) => {
    pageData.data = tableData.data.slice((page - 1) * 4, page * 4)
    totalPage.value = Math.ceil(tableData.data.length / 4)
  }

  //   获取threejs变量
  const getThreejs = async () => {
    //  如果已经渲染过，直接返回
    if (is_rendered.value) {
      console.log('rendered')
      return new Promise((resolve) =>
        resolve({ renderer, scene, camera, controls, raycaster, mouse })
      )
    }
    //  如果没有渲染过，先渲染
    is_rendered.value = true
    console.log('render')
    let loader = new GLTFLoader()
    // 获取模型路径
    const modelPath = await window.threeApi.getGlbPath('beamStorage.glb')
    // 返回promise对象
    return new Promise((resolve, reject) => {
      loader.load(
        modelPath,
        (gltf) => {
          // 遍历模型，开启阴影,设置灯光
          gltf.scene.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true
              child.receiveShadow = true
            }
            if (child.isLight) {
              child.castShadow = true
              child.receiveShadow = true
              child.intensity *= 0.001
              child.shadow.bias = -0.0001
            }
          })
          //   设置相机,添加模型
          camera = gltf.cameras[0]
          // 获取梁体
          let beam = gltf.scene.getObjectByName('立方体001_1')
          // 获取默认材质
          defaultMaterial = gltf.scene.children[0].material
          // 添加模型
          scene.add(gltf.scene, camera)

          renderer = new THREE.WebGLRenderer({ antialias: true })
          renderer.shadowMap.enabled = true
          renderer.setSize(sceneX.value, sceneY.value)
          // 加载控制器
          // controls = ahmThree.ahmControls(currentCamera, renderer.domElement)

          //   返回threejs变量
          resolve({ renderer, scene, camera, controls, raycaster, mouse })
        },
        undefined,
        (error) => {
          console.error(error)
          reject(error)
        }
      )
    })
  }

  return {
    getThreejs,
    getBeamStorage,
    getTableData,
    getPageData,
    sceneX,
    sceneY,
    beamStorageColumns,
    beamStorageDataKey,
    tableData,
    pageData,
    totalPage,
  }
})
