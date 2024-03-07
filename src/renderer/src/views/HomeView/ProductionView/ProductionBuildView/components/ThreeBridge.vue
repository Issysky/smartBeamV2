<!-- 梁场3d场景组件 -->

<template>
  <div class="three">
    <div ref="sceneRef"></div>
    <div class="change-color">
      <button @click="toTransparent">变透明</button>
      <button @click="toOpaque">变不透明</button>
    </div>
  </div>
</template>

<script setup>
import * as THREE from 'three'
import { onMounted, ref } from 'vue'
import * as ahmThree from '@renderer/utils/ahmThree.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import { useDigitalTwinBeamStore } from '@renderer/stores/homeStore/digitalTwinStore/digitalTwinBeam'
import { gsap } from 'gsap'

let sceneRef = ref(null)

const digitalTwinBeamStore = useDigitalTwinBeamStore()

// 定义梁的高度
let beamHeight = null

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

// 变透明
const toTransparent = () => {
  currentObj.material = transparentMaterial
}
// 变不透明
const toOpaque = () => {
  currentObj.material = defaultMaterial
}

// 摄像头右侧平移
const moveRight = (camera) => {
  // 创建一个新的向量代表摄像头的前方向
  var cameraDirection = new THREE.Vector3()
  camera.getWorldDirection(cameraDirection)

  // 计算右侧向量，它是up向量和方向向量的叉积
  var right = new THREE.Vector3()
  right.crossVectors(camera.up, cameraDirection).normalize()

  // 设置你想要沿右侧方向平移的距离
  var distance = 5 // 例如，向右平移5个单位

  // 计算平移后的位置
  var translation = right.multiplyScalar(distance)

  // 更新摄像头的位置
  camera.position.add(translation)
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
    const middleBeam1Clone = middleBeam1.clone()
    const middleBeam2Clone = middleBeam2.clone()
    const middleBeam3Clone = middleBeam3.clone()
    const leftBeamClone = leftBeam.clone()
    const rightBeamClone = rightBeam.clone()
    const pillarClone = pillar.clone()
    pillarClone.is_pillar = true
    middleBeam1Clone.position.z += i * beamZPosition
    middleBeam2Clone.position.z += i * beamZPosition
    middleBeam3Clone.position.z += i * beamZPosition
    leftBeamClone.position.z += i * beamZPosition
    rightBeamClone.position.z += i * beamZPosition
    pillarClone.position.z += i * beamZPosition
    scene.add(
      middleBeam1Clone,
      middleBeam2Clone,
      middleBeam3Clone,
      leftBeamClone,
      rightBeamClone,
      pillarClone
    )
  }
  const pillarClone = pillar.clone()
  pillarClone.is_pillar = true
  pillarClone.position.z += num * beamZPosition
  scene.add(pillarClone)
}

// 初始化
const initThree = async () => {
  // 初始化变量
  let currentCamera = null
  let cameras = null
  let renderer = null
  let controls = null
  let raycaster = new THREE.Raycaster()
  let mouse = new THREE.Vector2()

  const scenex = 1500
  const sceney = 300
  // 通过主进程加载模型和贴图
  const modelUrl = await window.threeApi.getGlbPath('beam.glb')
  const exr = await window.threeApi.getHdrPath('a.exr')
  // 自定义方法加载场景
  ahmThree.ahmLoadGlb(modelUrl).then(({ glb_scene, cameras_array, animations_array }) => {
    const scene = new THREE.Scene()
    cameras = cameras_array
    currentCamera = cameras[0]
    currentCamera.position.set(100, 300, 0)

    // moveRight(currentCamera)

    // 默认材质
    defaultMaterial = glb_scene.getObjectByName('中梁').material

    // 默认的东西
    const test_light = glb_scene.getObjectByName('日光')
    const test_beam = glb_scene.getObjectByName('中梁')
    scene.add(test_light, currentCamera)
    // 生成桥梁
    generateBridge(glb_scene, scene, 5)

    // 创建渲染器
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.shadowMap.enabled = true
    renderer.setSize(scenex, sceney)

    // 加载场景
    sceneRef.value.appendChild(renderer.domElement)

    // 加载控制器
    controls = ahmThree.ahmControls(currentCamera, renderer.domElement)

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
      // 获取场景中的所有对象
      if (lastObj) {
        lastObj.position.y = beamHeight
      }
      if (intersects.length > 0) {
        if (!intersects[0].object.is_pillar) {
          lastObj = currentObj
          currentObj = intersects[0].object
          if (lastObj === currentObj) return
          gsap.to(intersects[0].object.position, {
            y: intersects[0].object.position.y + 2,
            duration: 0.3,
            ease: 'power1.out'
          })
        }
      }
    })

    // 渲染循环
    function animate() {
      requestAnimationFrame(animate)
      // 更新动画混合器
      renderer.render(scene, currentCamera)
      controls.update()
    }
    animate()
  })
}

onMounted(async () => {
  initThree()
})
</script>

<style lang="less" scoped>
.three {
  width: 1500px;
  height: 300px;
  position: relative;
  background-color: aqua;
  div {
    width: 100%;
    height: 100%;
  }
}
</style>
