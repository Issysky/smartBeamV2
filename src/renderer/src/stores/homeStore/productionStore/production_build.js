// 生产数据 架设进度store
import { defineStore } from 'pinia'
import axios from 'axios'
import { reactive, ref } from 'vue'
import { exportExcel } from '@renderer/utils/excelConfig.js'

export const useProductionBuildStore = defineStore('ProductionBuild', () => {
  // 定义threejs变量
  let renderer = reactive({})
  let is_rendered = ref(false)
  let scene = new THREE.Scene()
  let camera = null
  let controls = null
  let raycaster = new THREE.Raycaster()
  let mouse = new THREE.Vector2()

  //定义请求架桥地址
  const bridgeUrl = '/beam/bridge/'
  //定义请求梁片地址
  const beamUrl = '/beam/beam/'
  //   定义请求修改梁片状态地址
  const beamStatusUrl = '/beam/beam_status/'
  // 点击对象名
  const currentObj = reactive({
    data: {
      name: '',
      straddle: ''
    }
  })
  // 请求得到的桥梁数据
  const bridgeData = reactive({
    data: []
  })
  //   当前选中的桥梁
  const currentBridge = reactive({
    data: {
      bridge: '黄河大桥'
    }
  })
  //   所有梁片信息
  const beamData = reactive({
    data: []
  })
  // 图表使用的数据
  const bridgeTableData = reactive({
    data: []
  })
  // 总页数
  const totalPage = ref(0)
  // 图表的表头
  const bridgeColumns = [
    { name: '序号', width: '', key: 'id' },
    { name: '梁体名称', width: '', key: 'name' },
    { name: '梁体编号', width: '', key: 'beam_code' },
    { name: '幅序号', width: '', key: 'x_index' },
    { name: '排序号', width: '', key: 'y_index' },
    { name: '架设状态', width: '', key: 'status' },
    { name: '架设时间', width: '', key: 'bridge_time' }
  ]
  // 图表数据的key
  const bridgeDataKey = ['id', 'name', 'beam_code', 'x_index', 'y_index', 'status', 'bridge_time']

  //   请求桥梁数据，渲染3d模型
  const getBridgeData = async () => {
    const res = await axios.get(bridgeUrl, {
      headers: { Authorization: localStorage.getItem('token') }
    })
    bridgeData.data = res.data
    currentBridge.data = bridgeData.data[0]
  }
  //   请求所有梁片信息,渲染3d模型用
  const getBeamData = async (callback) => {
    const res = await axios.get(beamUrl, {
      params: { bridge: currentBridge.data.bridge },
      headers: { Authorization: localStorage.getItem('token') }
    })
    beamData.data = res.data
    console.log(beamData.data, 'beamData.data')
    callback()
  }
  //   切换桥梁
  const changeBridge = (index) => {
    currentBridge.data = bridgeData.data[index]
  }
  //   修改梁片状态
  const changeBeamStatus = async (id, time) => {
    await axios
      .patch(
        beamStatusUrl + id + '/',
        { bridge_time: time ? time : null },
        {
          headers: { Authorization: localStorage.getItem('token') }
        }
      )
      .then((res) => {
        console.log(res, 'res')
      })
  }
  // 获取分页后的桥梁数据，下方图表用
  const getBridgeDataPage = async (params) => {
    const res = await axios.get(beamUrl, {
      params: { ...params, bridge: currentBridge.data.bridge },
      headers: { Authorization: localStorage.getItem('token') }
    })
    console.log(res.data, 'res.data')

    bridgeTableData.data = res.data.results.map((item) => {
      return {
        ...item,
        bridge_time: item.bridge_time
          ? item.bridge_time.split('T')[0] + item.bridge_time.split('T')[1].substring(0, 8)
          : ''
      }
    })
    totalPage.value = res.data.total_pages
  }

  //   点击获取当前对象的信息
  const clickObjName = (data) => {
    currentObj.data = data
  }

  //   获取threejs变量
  const getThreejs = async () => {
    if (is_rendered.value) {
      console.log('getRenderer222')
      return new Promise((resolve) =>
        resolve({ renderer, scene, camera, controls, raycaster, mouse })
      )
    }

    is_rendered.value = true
    console.log('getRenderer')
    let loader = new GLTFLoader()
    const modelPath = await window.api.getModelPath('beamStorage')
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

          scene.add(gltf.scene, camera)
          renderer = new THREE.WebGLRenderer({ antialias: true })
          renderer.shadowMap.enabled = true
          renderer.setSize(1500, 500)

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

  // 生成桥梁
const generateBridge = (objArr, scene, num) => {
    console.log(objArr, 'objArr')
    // 获取模型中的梁
    const middleBeam1 = objArr.getObjectByName('中梁')
    const middleBeam2 = objArr.getObjectByName('中梁001')
    const middleBeam3 = objArr.getObjectByName('中梁002')
    const leftBeam = objArr.getObjectByName('左边梁')
    const rightBeam = objArr.getObjectByName('右边梁')
    const pillar = objArr.getObjectByName('管桩')
    // 获取梁的z轴位置间距
    const beamZPosition = -(
      objArr.getObjectByName('中梁003').position.z - objArr.getObjectByName('中梁').position.z
    )
  
    // 获取梁的高度
    beamHeight = middleBeam1.position.y
    for (let i = 0; i < num; i++) {
      // 克隆桥墩
      const pillarClone = pillar.clone()
      // 桥墩添加标识
      pillarClone.is_pillar = true
      // 设置梁的位置
      pillarClone.position.z += i * beamZPosition
      // 每跨梁的标识
      pillarClone.userData.straddle = i + 1
      scene.add(pillarClone)
    }
    const pillarClone = pillar.clone()
    pillarClone.is_pillar = true
    pillarClone.position.z -= beamZPosition
    scene.add(pillarClone)
    // 遍历梁片数据生成梁片
    for (let k = 0; k < productionBuildStore.beamData.data.length; k++) {
      let beamClone = null
      if (productionBuildStore.beamData.data[k].y_index === 1) {
        beamClone = leftBeam.clone()
      } else if (productionBuildStore.beamData.data[k].y_index === 2) {
        beamClone = middleBeam1.clone()
      } else if (productionBuildStore.beamData.data[k].y_index === 3) {
        beamClone = middleBeam2.clone()
      } else if (productionBuildStore.beamData.data[k].y_index === 4) {
        beamClone = middleBeam3.clone()
      } else if (productionBuildStore.beamData.data[k].y_index === 5) {
        beamClone = rightBeam.clone()
      }
      // 默认为透明材质
      beamClone.material = transparentMaterial
      beamClone.position.z += (productionBuildStore.beamData.data[k].x_index - 1) * beamZPosition
      beamClone.userData = productionBuildStore.beamData.data[k]
      // 如果已经架设变为不透明
      if (beamClone.userData.status === 'in_bridge') {
        beamClone.material = defaultMaterial
      }
      scene.add(beamClone)
    }
  }

  return {
    clickObjName,
    bridgeData,
    getBeamData,
    beamData,
    getBridgeData,
    currentObj,
    currentBridge,
    totalPage,
    bridgeColumns,
    bridgeDataKey,
    bridgeTableData,
    changeBridge,
    changeBeamStatus,
    getBridgeDataPage
  }
})
