<!-- 存梁现场3D组件 -->
<template>
  <div class="three">
    <button @click="changeCamera()">切换镜头</button>
    <!-- 3d场景 -->
    <div ref="sceneRef" class="scene"></div>
    <!-- 点击弹窗 -->
    <div
      class="alert-wrapper"
      :style="{
        top: `${mousePosition.y}px`,
        left: `${mousePosition.x}px`
      }"
      v-if="is_show_detail"
      @click="stopPropagation()"
    >
      <div class="info-wrapper">
        <p class="label">当前存梁</p>
        <div class="beam">
          <p class="item">一层:黄河大桥1-3</p>
          <p class="time">时间:2024-3-22 12:35:33</p>
          <p class="beamType">梁型:T梁</p>
        </div>
        <div class="beam">
          <p class="item">二层:黄河大桥1-3</p>
          <p class="time">时间:2024-3-23 14:22:01</p>
          <p class="beamType">梁型:T梁</p>
        </div>
      </div>
      <div class="btn-wrapper">
        <button @click="putBeam()">添加梁体</button>
        <button @click="removeBeam()">移除梁体</button>
        <button @click="closeAlert" class="close-alert">关闭弹窗</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import * as THREE from 'three'
import { nextTick, onMounted, reactive, ref, onBeforeUnmount } from 'vue'
import * as ahmThree from '@renderer/utils/ahmThree.js'
import { useProductionBeamStorageStore } from '@renderer/stores/homeStore/productionStore/production_beam_storage'

const beamStorageStore = useProductionBeamStorageStore()

let sceneRef = ref(null)

// 初始化场景变量
let cameras = null
let renderer = null
let controls = null
let raycaster = new THREE.Raycaster()
let mouse = new THREE.Vector2()
// 定义当前摄像机
let currentCamera = null
// 定义场景
let scene = new THREE.Scene()

// 是否展示弹窗
const is_show_detail = ref(false)
// 当前鼠标位置
const mousePosition = reactive({
  x: 0,
  y: 0
})

// 定义当前选中对象
let currentObj = null
// 定义上次选中对象
let lastObj = null
// 定义基础梁体模型
let beam = null
// 定义默认材质
let defaultMaterial = null
// 定义透明材质
let transparentMaterial = new THREE.MeshBasicMaterial({
  transparent: true,
  opacity: 0.5
})
const putBeam = () => {
  if (currentObj.children.length >= 2) return
  const obj = beam.clone()
  currentObj.add(obj)
  let y = 0
  currentObj.children.forEach((item) => {
    y += 2
  })
  obj.position.set(0, y, 0)
}
// 移除梁体
const removeBeam = () => {
  if (currentObj.children.length <= 0) return
  currentObj.remove(currentObj.children[currentObj.children.length - 1])
}

// 切换摄像机
const changeCamera = () => {
  if (currentCamera === cameras[0]) {
    currentCamera = cameras[1]
  } else {
    currentCamera = cameras[0]
  }
}
// 改变弹窗位置
const changeAlertPosition = (x, y) => {
  if (x > 1600) {
    mousePosition.x = x - 200
  } else {
    mousePosition.x = x
  }
  mousePosition.y = y + 10
}
// 关闭弹窗
const closeAlert = () => {
  is_show_detail.value = false
}
// 弹窗点击事件,组织事件冒泡
const stopPropagation = () => {
  event.stopPropagation()
}
// 初始化
const initThree = async () => {
  // 场景大小
  const scenex = 1500
  const sceney = 500
  // 通过主进程加载模型和贴图
  const modelUrl = await window.threeApi.getGlbPath('beamStorage.glb')
  // 自定义方法加载场景
  ahmThree.ahmLoadGlb(modelUrl, 0.005).then(({ glb_scene, cameras_array, animations_array }) => {
    cameras = cameras_array
    currentCamera = cameras[0]
    scene.add(glb_scene, currentCamera)

    // 获取梁体
    beam = glb_scene.getObjectByName('立方体001_1')
    // 获取默认材质
    defaultMaterial = glb_scene.children[0].material
    // 创建渲染器
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.shadowMap.enabled = true
    renderer.setSize(scenex, sceney)
    // 加载场景
    sceneRef.value.appendChild(renderer.domElement)

    // 加载控制器
    // controls = ahmThree.ahmControls(currentCamera, renderer.domElement)
    // 添加鼠标点击事件
    window.addEventListener('click', (event) => {
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
      //   是否点击到底座
      let is_pedstal = false
      if (intersects.length > 0) {
        intersects.forEach((item) => {
          if (item.object.userData.is_pedstal && !is_pedstal) {
            // 展示弹窗
            changeAlertPosition(event.clientX, event.clientY)
            // 如果当前选中对象存在
            if (currentObj) {
              lastObj = currentObj
            }
            currentObj = item.object

            is_pedstal = true
            // 如果点击同一个也归位
            if (lastObj === currentObj && is_show_detail.value) {
              is_show_detail.value = false
            } else {
              is_show_detail.value = true
            }

            return
          }
        })
      }
    })

    // 渲染循环
    function animate() {
      if (!renderer) return
      requestAnimationFrame(animate)
      // 更新动画混合器
      renderer.render(scene, currentCamera)
      if (controls) controls.update()
    }
    animate()
  })
}

onMounted(() => {
  beamStorageStore.getBeamStorage()
  beamStorageStore.getThreejs().then(({ renderer, scene, camera, controls, raycaster, mouse }) => {
    sceneRef.value.appendChild(renderer.domElement)
    console.log(scene,'scene')
    window.addEventListener('click', (event) => {
      // 获取场景元素的边界框
      if (!sceneRef.value) return
      const rect = sceneRef.value.getBoundingClientRect()
      // 计算鼠标位置相对于场景元素的坐标
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      // 将鼠标位置转换为标准化设备坐标
      mouse.x = (x / beamStorageStore.sceneX) * 2 - 1
      mouse.y = -(y / beamStorageStore.sceneY) * 2 + 1

      // 更新射线投射器的射线
      raycaster.setFromCamera(mouse, camera)
      let intersects = raycaster.intersectObjects(scene.children, true)
      //   是否点击到底座
      let is_pedstal = false
      if (intersects.length > 0) {
        intersects.forEach((item) => {
          if (item.object.userData.is_pedstal && !is_pedstal) {
            // 展示弹窗
            changeAlertPosition(event.clientX, event.clientY)
            // 如果当前选中对象存在
            if (currentObj) {
              lastObj = currentObj
            }
            currentObj = item.object

            is_pedstal = true
            // 如果点击同一个也归位
            if (lastObj === currentObj && is_show_detail.value) {
              is_show_detail.value = false
            } else {
              is_show_detail.value = true
            }

            return
          }
        })
      }
    })
    // 开启动画循环
    function animate() {
      if (!renderer) return
      requestAnimationFrame(animate)
      // 更新动画混合器
      renderer.render(scene, camera)
    }
    animate()
  })
})
</script>
<style scoped lang="less">
.three {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  .scene {
    width: 1500px;
    height: 300px;
  }
  .alert-wrapper {
    width: 300px;
    height: 340px;
    position: fixed;
    border-radius: 10px;
    background-color: #fff;
    z-index: 2;
    .info-wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      margin-top: 20px;
      .label {
        width: 100%;
        text-align: center;
        font-size: 22px;
        font-weight: 600;
        color: #333;
        margin-bottom: 5px;
      }
      .beam {
        width: 80%;
        height: 100px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        border: #33333355 solid 2px;
        border-radius: 10px;
        margin-bottom: 20px;
        p {
          width: 80%;
          display: flex;
          align-items: center;
          font-size: 16px;
          justify-content: flex-start;
        }
        .item {
          text-align: center;
          color: #333;
        }
      }
    }
    .btn-wrapper {
      width: 100%;
      height: 40px;
      display: flex;
      //   flex-direction: column;
      align-items: center;
      justify-content: space-around;
      button {
        width: 80px;
        height: 30px;
        border-radius: 5px;
        background-color: var(--color-primary);
        color: #fff;
        border: none;
        cursor: pointer;
        font-size: 12px;
        margin-bottom: 10px;
      }
      .close-alert {
        background-color: var(--color-danger);
      }
    }
  }
}
</style>
