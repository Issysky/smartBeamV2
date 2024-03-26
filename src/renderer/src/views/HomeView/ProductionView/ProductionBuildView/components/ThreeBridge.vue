<!-- 梁场3d场景组件 -->

<template>
  <div class="three">
    <!-- 标题切换 -->
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
    <!-- 3d场景 -->
    <div ref="sceneRef" class="scene"></div>
    <!--横向位移滑块 -->
    <div class="slider-wrapper">
      <span class="demonstration">镜头位置</span>
      <el-slider
        v-model="valueZ"
        :max="productionBuildStore.maxDistance"
        :min="0"
        @input="changePosition('z', valueZ)"
      />
    </div>
    <!-- 点击弹窗 -->
    <div
      class="alert-wrapper"
      :style="{
        top: `${mousePosition.y}px`,
        left: `${mousePosition.x}px`
      }"
      v-if="is_show_detail"
    >
      <!-- 梁片信息  -->
      <div class="content-wrapper">
        <p class="label">{{ currentObj.userData.name }}</p>
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
import { nextTick, onMounted, reactive, ref, onBeforeUnmount } from 'vue'
import * as ahmThree from '@renderer/utils/ahmThree.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'
import { useProductionBuildStore } from '@renderer/stores/homeStore/productionStore/production_build'
import { gsap } from 'gsap'

let sceneRef = ref(null)
const productionBuildStore = useProductionBuildStore()

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

// 镜头位移滑块最大距离
const maxDistance = ref(0)

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

// 镜头位移滑块最大距离
const getMaxDistance = () => {
  if (!productionBuildStore.beamData.data.length) return 0
  maxDistance.value = (productionBuildStore.beamData.data.length / 5 - 2) * 30
}
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
  if (currentObj) beamHeight = currentObj.position.y-2
  is_show_detail.value = false
  currentObj.position.y = beamHeight
}
// 切换桥梁
const switchBridge = (index, item) => {
  event.stopPropagation()
  if (item.bridge === productionBuildStore.currentBridge.data.bridge) return
  productionBuildStore.changeBridge(index)
  is_show_detail.value = false
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
  productionBuildStore.changePosition(axis, value)
}
// 变为未架设状态
const toTransparent = (id) => {
  currentObj.material = transparentMaterial
  productionBuildStore.changeBeamStatus(id)
}
// 变为已架设状态
const toOpaque = (id) => {
  if (currentObj) {
    currentObj.material = defaultMaterial
  } else {
    console.error('currentObj is null or undefined')
  }
  const time = getCurrentTime()
  productionBuildStore.changeBeamStatus(id, time)
}
// 获取当前时间
const getCurrentTime = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1 // getMonth() 返回的月份从 0 开始
  const day = now.getDate()
  const hour = now.getHours()
  const minute = now.getMinutes()
  const second = now.getSeconds()

  // 使用 `padStart` 方法来确保月、日、时、分、秒总是两位数
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`
}

onMounted(async () => {
  productionBuildStore
    .getThreejs()
    .then(({ renderer, scene, camera, controls, raycaster, mouse, beamHeight }) => {
      sceneRef.value.appendChild(renderer.domElement)

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
        mouse.x = (x / 1500) * 2 - 1
        mouse.y = -(y / 360) * 2 + 1

        // 更新射线投射器的射线
        raycaster.setFromCamera(mouse, camera)
        let intersects = raycaster.intersectObjects(scene.children, true)

        if (intersects.length > 0) {
          if (!intersects[0].object.is_pillar) {
            changeAlertPosition(event.clientX, event.clientY)
            lastObj = currentObj
            currentObj = intersects[0].object
            console.log(currentObj, 'currentObj')
            // 点击下一个让上一个归位,如果点击同一个也归位
            if (lastObj) {
              lastObj.position.y = beamHeight
            }
            if (lastObj === currentObj && is_show_detail.value) {
              is_show_detail.value = false
              return
            }
            gsap.to(currentObj.position, {
              y: currentObj.position.y + 2,
              duration: 0.3,
              ease: 'power1.out'
            })
            is_show_detail.value = true
          }
        }
      })
      //   动画循环
      function animate() {
        requestAnimationFrame(animate)
        // 更新动画混合器
        renderer.render(scene, camera)
        if (controls) controls.update()
      }
      animate()
      // 镜头默认位置
      changePosition('z', valueZ.value)
    })
})

</script>

<style lang="less" scoped>
.three {
  width: 100%;
  height: 100%;
  position: relative;
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
    position: absolute;
    margin-top: 30px;
    color: var(--font-level-1);
    .label {
      font-size: 32px;
      font-weight: 600;
    }
    .down {
      line-height: 10px;
      margin-left: 10px;
      cursor: pointer;
    }
    .switch-bridge-wrapper {
      width: 140px;
      height: 150px;
      border-radius: 15px;
      position: absolute;
      top: 50px;
      left: 50%;
      overflow-y: auto;
      padding-top: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: #808080;
      .item {
        width: 90%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        margin-bottom: 10px;
        border-radius: 15px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        &:hover {
          background-color: #fff;
          color: var(--font-level-13);
        }
      }
      .active {
        background-color: #fff;
        color: var(--font-level-13);
      }
    }
  }

  .scene {
    width: 1500px;
    height: 300px;
    // transform: scaleX(-1);
  }
  .slider-wrapper {
    width: 100%;
    height: 20%;
    position: absolute;
    bottom: -30px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    color: var(--font-level-1);

    .demonstration {
      margin-right: 20px;
    }
    .el-slider {
      width: 300px;
    }
  }
  .alert-wrapper {
    width: 200px;
    height: 220px;
    position: fixed;
    border-radius: 10px;
    // background-color: var(--color-info);
    background-color: #fff;
    z-index: 2;
    border: 2px solid var(--color-info);
    padding-top: 20px;
    .content-wrapper {
      width: 150px;
      height: 140px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      padding: 0 20px;
      margin-bottom: 30px;

      p {
        width: 100%;
        font-size: 16px;
        margin-bottom: 10px;
        color: var(--font-level-13);
        letter-spacing: 2px;
        // border-bottom: 1px solid #f0f0f0;
        margin-bottom: 12px;
      }
      .label {
        font-size: 20px;
        font-weight: 600;
        display: flex;
        justify-content: center;
        border-bottom: none;
      }
    }
    .btn-wrapper {
      width: 100%;
      height: 40px;
      display: flex;
      //   flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      button {
        width: 90px;
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
