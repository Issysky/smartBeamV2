import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader.js'
import * as THREE from 'three'

// glb加载
export function ahmLoadGlb(file_url,lightStrength = 0.001) {
  let loader = new GLTFLoader()
  return new Promise((resolve, reject) => {
    loader.load(
      file_url,
      (gltf) => {
        // 开启阴影
        gltf.scene.traverse(function (child) {
          if (child.isMesh) {
            child.castShadow = true
            child.receiveShadow = true
          }
          if (child.isLight) {
            child.castShadow = true
            child.receiveShadow = true
            child.intensity *= lightStrength
          }
        })
        console.log(gltf, 'gltf')
        resolve({
          glb_scene: gltf.scene,
          cameras_array: gltf.cameras,
          animations_array: gltf.animations
        })
      },
      undefined,
      (error) => {
        console.error(error)
        reject(error)
      }
    )
    loader = null
  })
}

// 创建控制器
export function ahmControls(camera, dom) {
  const controls = new OrbitControls(camera, dom)
  controls.enableZoom = true // 允许缩放
  controls.zoomSpeed = 1.0 // 设置缩放速度
  controls.minDistance = 1 // 设置最小距离
  controls.maxDistance = 200 // 设置最大距离

  return controls
}

// 加载环境贴图
export function ahmLoadEnv(file_url, scene) {
  new EXRLoader().load(file_url, function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping
    scene.background = texture
    scene.environment = texture
  })
}
