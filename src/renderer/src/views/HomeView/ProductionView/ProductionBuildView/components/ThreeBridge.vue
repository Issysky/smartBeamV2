<!-- 梁场3d场景组件 -->

<template>
  <div class="three">
    <div class="label-switch-wrapper">
      <p class="label">{{ productionBuildStore.currentBridge.data.bridge }}</p>
      <span class="down" @click="switchShow()"
        ><el-icon
          ><ArrowDownBold v-if="is_show_switch" /> <ArrowUpBold v-if="!is_show_switch" /> </el-icon
      ></span>
      <div class="switch-bridge-wrapper" v-if="!is_show_switch">
        <div
          class="item"
          :class="{ active: item.bridge === productionBuildStore.currentBridge.data.bridge }"
          v-for="(item, index) in productionBuildStore.bridgeData.data"
          @click="switchBridge(index, item)"
        >
          {{ item.bridge }}
        </div>
      </div>
    </div>
    <div ref="sceneRef" class="scene"></div>
    <!-- <div class="slider-wrapper">
      <span class="demonstration">x位移</span>
      <el-slider v-model="valueX" max=" 400" show-input @input="changePosition('x', valueX)" />
    </div>
    <div class="slider-wrapper">
      <span class="demonstration">y位移</span>
      <el-slider v-model="valueY" max=" 400" show-input @input="changePosition('y', valueY)" />
    </div> -->
    <div class="slider-wrapper">
      <span class="demonstration">z位移</span>
      <el-slider v-model="valueZ" :max="400" show-input @input="changePosition('z', valueZ)" />
    </div>
    <div
      class="alert-wrapper"
      :style="{
        top: `${mousePosition.y}px`,
        left: `${mousePosition.x}px`
      }"
      v-if="is_show_detail"
    >
      <div class="content-wrapper">
        <p>{{ '名称:' + currentObj.userData.name }}</p>
        <p>{{ '梁号:' + currentObj.userData.beam_code }}</p>
        <p>{{ '梁型:' + currentObj.userData.beam_type }}</p>
        <p>{{ '状态:' + getBeamStatus(currentObj.userData.status) }}</p>
      </div>
      <div class="btn-wrapper">
        <button
          @click="toOpaque(currentObj.userData.id)"
          v-if="currentObj.userData.status !== 'in_bridge'"
        >
          设置为已架设
        </button>
        <button
          @click="toTransparent(currentObj.userData.id)"
          v-if="currentObj.userData.status === 'in_bridge'"
        >
          设置为未架设
        </button>
        <button @click="closeAlert" class="close-alert">关闭弹窗</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as THREE from 'three'
import { nextTick, onMounted, reactive, ref } from 'vue'
import * as ahmThree from '@renderer/utils/ahmThree.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import { useProductionBuildStore } from '@renderer/stores/homeStore/productionStore/production_build'
import { gsap } from 'gsap'

let sceneRef = ref(null)
const productionBuildStore = useProductionBuildStore()

// 定义摄像机位置
const valueX = ref(134)
const valueY = ref(100)
const valueZ = ref(0)
// 是否展示下拉框
const is_show_switch = ref(true)
// 是否展示弹窗
const is_show_detail = ref(false)
// 当前鼠标位置
const mousePosition = reactive({
  x: 0,
  y: 0
})

// 定义梁的高度
let beamHeight = null
// 定义当前选中对象
let currentObj = null
// 定义上次选中对象
let lastObj = null

// 初始化场景变量
let cameras = null
let renderer = null
let controls = null
let raycaster = new THREE.Raycaster()
let mouse = new THREE.Vector2()
// 定义当前摄像机
let currentCamera = null
// 定义场景
const scene = new THREE.Scene()

// 定义默认材质
let defaultMaterial = null
// 定义透明材质
let transparentMaterial = new THREE.MeshBasicMaterial({
  transparent: true,
  opacity: 0.5
})
// 打开/关闭下拉框
const switchShow = () => {
  is_show_switch.value = !is_show_switch.value
}
// 改变弹窗位置
const changeAlertPosition = (x, y) => {
  if (x > 1600) {
    mousePosition.x = x - 200
  } else {
    mousePosition.x = x
  }
  mousePosition.y = y
}
// 关闭弹窗
const closeAlert = () => {
  is_show_detail.value = false
}
// 切换桥梁
const switchBridge = (index, item) => {
  if (item.bridge === productionBuildStore.currentBridge.data.bridge) return
  productionBuildStore.changeBridge(index)
  clearScene()
  initThree()
}
// 获取梁片状态
const getBeamStatus = (status) => {
  if (status === 'in_bridge') {
    return '已架设'
  } else {
    return '未架设'
  }
}
// 改变摄像机位置
const changePosition = (axis, value) => {
  if (axis === 'z') {
    currentCamera.position[axis] = -(value + 26)
  } else {
    currentCamera.position[axis] = value
  }
}
// 变为未架设状态
const toTransparent = (id) => {
  currentObj.material = transparentMaterial
  productionBuildStore.changeBeamStatus(id, 'back')
}
// 变为已架设状态
const toOpaque = (id) => {
  currentObj.material = defaultMaterial
  productionBuildStore.changeBeamStatus(id, 'in_bridge')
}

// 生成桥梁
const generateBridge = (objArr, scene, num) => {
  // 获取模型中的梁
  const middleBeam1 = objArr.getObjectByName('中梁')
  const middleBeam2 = objArr.getObjectByName('中梁001')
  const middleBeam3 = objArr.getObjectByName('中梁002')
  const leftBeam = objArr.getObjectByName('左边梁')
  const rightBeam = objArr.getObjectByName('右边梁')
  const pillar = objArr.getObjectByName('管桩')
  // 获取梁的z轴位置间距
  const beamZPosition = objArr.getObjectByName('中梁003').position.z
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
  pillarClone.position.z += num * beamZPosition
  scene.add(pillarClone)
  // 遍历梁片数据生成梁片
  for (let k = 0; k < productionBuildStore.beamData.data.length; k++) {
    let beamClone = null
    // 默认为透明材质
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
    beamClone.material = transparentMaterial

    beamClone.position.z += (productionBuildStore.beamData.data[k].x_index - 1) * beamZPosition
    beamClone.userData = productionBuildStore.beamData.data[k]
    // 如果已经假设变为不透明
    if (beamClone.userData.status === 'in_bridge') {
      beamClone.material = defaultMaterial
    }
    scene.add(beamClone)
  }
}

// 初始化
const initThree = async () => {
  // 场景大小
  const scenex = 1500
  const sceney = 300
  // 通过主进程加载模型和贴图
  const modelUrl = await window.threeApi.getGlbPath('beam.glb')
  const exr = await window.threeApi.getHdrPath('a.exr')
  // 自定义方法加载场景
  ahmThree.ahmLoadGlb(modelUrl).then(({ glb_scene, cameras_array, animations_array }) => {
    cameras = cameras_array
    currentCamera = cameras[0]
    currentCamera.position.set(valueX.value, valueY.value, valueZ.value)
    changePosition('z', valueZ.value)

    // 默认材质
    defaultMaterial = glb_scene.getObjectByName('中梁').material

    // 默认的东西
    const test_light = glb_scene.getObjectByName('日光')
    scene.add(test_light, currentCamera)
    // 生成桥梁
    productionBuildStore.getBeamData(() => {
      generateBridge(glb_scene, scene, productionBuildStore.bridgeData.data[0].count / 5)
    })

    // 创建渲染器
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.shadowMap.enabled = true
    renderer.setSize(scenex, sceney)

    // 加载场景
    sceneRef.value.appendChild(renderer.domElement)

    // 加载控制器
    // controls = ahmThree.ahmControls(currentCamera, renderer.domElement)

    // 加载.exr文件并设置为环境贴图
    ahmThree.ahmLoadEnv(exr, scene)

    // 添加鼠标点击事件
    window.addEventListener('click', (event) => {
      // getRaycaster(event, click1())
      // 获取场景元素的边界框
      if (!sceneRef.value) return
      const rect = sceneRef.value.getBoundingClientRect()

      // 计算鼠标位置相对于场景元素的坐标
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      // 将鼠标位置转换为标准化设备坐标
      mouse.x = (x / scenex) * 2 - 1
      mouse.y = -(y / sceney) * 2 + 1

      // 更新射线投射器的射线
      raycaster.setFromCamera(mouse, currentCamera)
      let intersects = raycaster.intersectObjects(scene.children, true)

      if (intersects.length > 0) {
        if (!intersects[0].object.is_pillar) {
          changeAlertPosition(event.clientX, event.clientY)
          lastObj = currentObj
          currentObj = intersects[0].object
          // 点击下一个让上一个归位,如果点击同一个也归位
          if (lastObj) {
            lastObj.position.y = beamHeight
          }
          if (lastObj === currentObj && is_show_detail.value) {
            is_show_detail.value = false
            return
          }
          productionBuildStore.clickObjName(currentObj.userData)
          gsap.to(intersects[0].object.position, {
            y: intersects[0].object.position.y + 2,
            duration: 0.3,
            ease: 'power1.out'
          })
          is_show_detail.value = true
        }
      }
    })

    // 渲染循环
    function animate() {
      requestAnimationFrame(animate)
      // 更新动画混合器
      renderer.render(scene, currentCamera)
      if (controls) controls.update()
    }
    animate()
  })
}
// 清除场景元素
const clearScene = () => {
  while (scene.children.length > 0) {
    scene.remove(scene.children[0])
  }
  sceneRef.value.removeChild(renderer.domElement)
}

onMounted(async () => {
  // 延迟加载
  // nextTick(() => {
  //   initThree()
  // })
  setTimeout(() => {
    initThree()
  }, 1000)
})
</script>

<style lang="less" scoped>
.three {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  .label-switch-wrapper {
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    // background-color: red;
    position: relative;
    .label {
      font-size: 28px;
      font-weight: 600;
    }
    .down {
      line-height: 10px;
      margin-left: 10px;
      cursor: pointer;
    }
    .switch-bridge-wrapper {
      width: 200px;
      height: 150px;
      border-radius: 15px;
      position: absolute;
      top: 50px;
      left: 50%;
      background-color: #fff;
      overflow-y: auto;
      .item {
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
        &:hover {
          background-color: #f0f0f0;
        }
      }
      .active {
        background-color: #f0f0f0;
      }
    }
  }

  .scene {
    width: 1500px;
    height: 300px;
  }
  .slider-wrapper {
    width: 100%;
    height: 20%;
    position: absolute;
    bottom: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    .demonstration {
      margin-right: 20px;
    }
    .el-slider {
      width: 300px;
    }
  }
  .alert-wrapper {
    width: 200px;
    height: 300px;
    position: fixed;
    border-radius: 10px;
    background-color: #fff;
    z-index: 2;
    .content-wrapper {
      width: 180;
      height: 140px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      padding: 10px 20px;
      p {
        font-size: 18px;
        margin-bottom: 10px;
      }
    }
    .btn-wrapper {
      width: 100%;
      height: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      button {
        width: 100px;
        height: 30px;
        border-radius: 5px;
        background-color: var(--color-primary);
        color: #fff;
        border: none;
        cursor: pointer;
        font-size: 12px;
      }
      .close-alert {
        background-color: var(--color-danger);
      }
    }
  }
}
</style>
