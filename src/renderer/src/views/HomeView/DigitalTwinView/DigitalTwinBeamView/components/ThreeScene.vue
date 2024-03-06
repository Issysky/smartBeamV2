<!-- 梁场3d场景组件 -->

<template>
  <div class="three">
    <div ref="sceneRef"></div>
  </div>
</template>

<script setup>
import * as THREE from 'three'
import { onMounted, ref } from 'vue'
import * as ahmThree from '@renderer/utils/ahmThree.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import { useDigitalTwinBeamStore } from '@renderer/stores/homeStore/digitalTwinStore/digitalTwinBeam'

let sceneRef = ref(null)

const digitalTwinBeamStore = useDigitalTwinBeamStore()

onMounted(async () => {
  // 初始化变量
  let currentCamera = null
  let cameras = null
  let renderer = null
  let controls = null
  let raycaster = new THREE.Raycaster()
  let mouse = new THREE.Vector2()
  // 通过主进程加载模型和贴图
  const modelUrl = await window.threeApi.getGlbPath('beam.glb')
  const exr = await window.threeApi.getHdrPath('a.exr')
  // 自定义方法加载场景
  ahmThree.ahmLoadGlb(modelUrl).then(({ glb_scene, cameras_array, animations_array }) => {
    const scene = new THREE.Scene()
    cameras = cameras_array
    currentCamera = cameras[0]
    currentCamera.position.set(28, 70, 0)
    currentCamera.lookAt(2, 24, 15)
    scene.add(glb_scene, currentCamera)

    for (let i = 0; i < 2; i++) {
      const middleBeam = glb_scene.children[1].clone()
      middleBeam.position.x = -0.5 + 5 * i
      scene.add(middleBeam)
    }

    // 创建渲染器
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.shadowMap.enabled = true
    renderer.setSize(800, 450)

    // 加载场景
    sceneRef.value.appendChild(renderer.domElement)

    // 加载控制器
    // controls = ahmThree.ahmControls(currentCamera, renderer.domElement)

    // 加载.exr文件并设置为环境贴图
    ahmThree.ahmLoadEnv(exr, scene)

    const getRaycaster = (event, callback) => {
      // 获取场景元素的边界框
      const rect = sceneRef.value.getBoundingClientRect()
      // 计算鼠标位置相对于场景元素的坐标
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      // 将鼠标位置转换为标准化设备坐标
      mouse.x = (x / 800) * 2 - 1
      mouse.y = -(y / 600) * 2 + 1

      // 更新射线投射器的射线
      raycaster.setFromCamera(mouse, currentCamera)
      callback()
    }
    // 添加鼠标点击事件
    window.addEventListener('click', (event) => {
      // 获取场景元素的边界框
      if (!sceneRef.value) return
      const rect = sceneRef.value.getBoundingClientRect()

      // 计算鼠标位置相对于场景元素的坐标
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      // 将鼠标位置转换为标准化设备坐标
      mouse.x = (x / 800) * 2 - 1
      mouse.y = -(y / 450) * 2 + 1

      // 更新射线投射器的射线
      raycaster.setFromCamera(mouse, currentCamera)

      // 计算物体和射线的交点
      let intersects = raycaster.intersectObjects(scene.children, true)
      if (intersects.length > 0) {
        console.log(currentCamera.position)
        digitalTwinBeamStore.changeClickObjName(intersects[0].object.name)
        digitalTwinBeamStore.changeObjData(intersects[0].object.userData)
        digitalTwinBeamStore.changeDialogPosition(event.clientX, event.clientY)
      }
    })

    const guiObj = {
      changeCameraLookAt: (x, y, z) => {
        currentCamera.lookAt(x, y, z)
      }
    }
    if (window.gui) {
      gui.destroy()
    }
    const gui = new GUI()
    gui.add(currentCamera.position, 'x', -100, 100).name('x')
    gui.add(currentCamera.position, 'y', -100, 100).name('y')
    gui.add(currentCamera.position, 'z', -100, 100).name('z')

    // 渲染循环
    function animate() {
      requestAnimationFrame(animate)
      // 更新动画混合器
      renderer.render(scene, currentCamera)
      // controls.update()
    }
    animate()
  })
})
</script>

<style lang="less" scoped>
.three {
  width: 800px;
  height: 450px;
  position: relative;
  background-color: aqua;
  div {
    width: 100%;
    height: 100%;
  }
}
</style>
