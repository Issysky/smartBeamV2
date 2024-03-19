<!-- 存梁现场3D组件 -->
<template>
  <div class="three">
    <button @click="changeCamera()">清空</button>
    <!-- 3d场景 -->
    <div ref="sceneRef" class="scene"></div>
  </div>
</template>

<script setup lang="js">
import * as THREE from 'three'
import { nextTick, onMounted, reactive, ref, onBeforeUnmount } from 'vue'
import * as ahmThree from '@renderer/utils/ahmThree.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import { gsap } from 'gsap'

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

// 定义世界坐标
let worldPosition = new THREE.Vector3()

// 定义当前选中对象
let currentObj = null
// 定义上次选中对象
let lastObj = null
// 定义默认材质
let defaultMaterial = null
// 定义透明材质
let transparentMaterial = new THREE.MeshBasicMaterial({
  transparent: true,
  opacity: 0.5
})

// 添加梁体到台座上
const putBeam = (beam) => {
  if (currentObj.children.length >= 2) return
  const obj = beam.clone()
  currentObj.add(obj)
  let y = 0
  currentObj.children.forEach((item) => {
    y += 2
  })
  obj.position.set(0, y, 0)
}

// 切换摄像机
const changeCamera = () => {
  if (currentCamera === cameras[0]) {
    currentCamera = cameras[1]
  } else {
    currentCamera = cameras[0]
  }
}

// 初始化
const initThree = async () => {
  // 场景大小
  const scenex = 1500
  const sceney = 500
  // 通过主进程加载模型和贴图
  const modelUrl = await window.threeApi.getGlbPath('beamStorage.glb')
  // 自定义方法加载场景
  ahmThree.ahmLoadGlb(modelUrl).then(({ glb_scene, cameras_array, animations_array }) => {
    cameras = cameras_array
    currentCamera = cameras[0]
    scene.add(glb_scene, currentCamera)

    //   // 获取默认材质
    defaultMaterial = glb_scene.getObjectByName('立方体003_1').material
    // 获取梁体
    let beam = glb_scene.getObjectByName('立方体001_1')
    console.log(beam, 'beam')

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
      //   是否点击到底座
      let is_pedstal = false
      if (intersects.length > 0) {
        intersects.forEach((item) => {
          if (item.object.userData.is_pedstal && !is_pedstal) {
            console.log(item.object, 'item.object')
            // 如果当前选中对象存在
            if (currentObj) {
              lastObj = currentObj
              //   lastObj.material = defaultMaterial
            }
            currentObj = item.object
            // currentObj.material = transparentMaterial
            is_pedstal = true
            // currentObj.getWorldPosition(worldPosition)
            // console.log(currentObj,'currentObj')
            // console.log(worldPosition,'worldPosition')
            // 添加梁体到台座上
            putBeam(beam)
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
  initThree()
})
// 在组件卸载前清理 Three.js 对象
onBeforeUnmount(() => {
  // 销毁控制器
  if (controls) {
    controls.dispose()
    controls = null
  }

  // 销毁场景中的所有对象
  if (scene) {
    while (scene.children.length > 0) {
      const object = scene.children[0]
      while (object.children.length > 0) {
        const child = object.children[0]
        child.geometry?.dispose()
        child.material?.dispose()
        object.remove(child)
      }
      object.geometry?.dispose()
      object.material?.dispose()
      scene.remove(object)
    }
    scene = null
  }

  // 销毁渲染器
  if (renderer) {
    renderer.dispose()
    renderer = null
  }

  // 销毁相机
  cameras = null
  currentCamera = null

  // 销毁材质
  defaultMaterial = null
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
}
</style>
