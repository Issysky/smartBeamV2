<!-- 自定义的顶部栏 出现在绝大多数页面，登录页面的顶部栏不是这个 -->
<template>
  <div class="top-bar">
    <div class="label-wrapper">
      <img src="/src/assets/img/logo/logo4.png" alt="" />
      <p>山西路桥</p>
      <img src="/src/assets/img/logo/logo3.png" alt="" />
      <p>山西交控</p>
    </div>
    <!-- 点击拖拽窗口区域 下方两个都是-->
    <div class="nav-wrapper">
      <div
        class="nav"
        ref="nav"
        v-for="(item, index) in navArr"
        :key="item.sort"
        @click="changeActive(index, item.router_name)"
      >
        {{ item.name }}
      </div>
    </div>
    <!-- 功能按钮区域2 包含设置以及提醒信息按钮 -->
    <div class="function-wrapper2">
      <!-- 信息 -->
      <button class="message btn">
        <el-icon><Bell /></el-icon>
      </button>
      <!-- 设置 -->
      <button class="setting btn" @click="showSettingScreenMenu()">
        <el-icon><Tools /></el-icon>
      </button>
      <!-- 在线状态 -->
      <div
        class="online"
        v-html="online ? '在线' : '离线'"
        :style="{ backgroundColor: online ? '#67C23A' : '#F56C6C' }"
      ></div>
    </div>
    <!-- 功能按钮区域1 包含关闭，放大，回复，最小化按钮 -->
    <div class="function-wrapper">
      <!-- 最小化 -->
      <button class="min btn" @click="topBarStore.handleMini">
        <el-icon><Minus /></el-icon>
      </button>
      <!-- 关闭 -->
      <button class="close btn" @click="topBarStore.handleClose">
        <el-icon><Close /></el-icon>
      </button>
    </div>
  </div>
</template>

<script setup lang="js">
import { onMounted, ref } from 'vue'
import { usetopBarStore } from '@renderer/stores/homeStore/topBarStore/topBar.js'
import { useUserStore } from '@renderer/stores/loginStore/user.js'
import { useRouter,useRoute } from 'vue-router'
import {useSettingScreenMenuStore} from '@renderer/stores/homeStore/settingMenuStore/settingScreenMenu.js'

const router = useRouter()
const route = useRoute()

// 引入store，内含顶部栏的关闭，最小化，最大化，还原事件
const topBarStore = usetopBarStore()
const userStore = useUserStore()
const SettingScreenMenuStore = useSettingScreenMenuStore()

// 导航路由数组
let navArr = userStore.getFirstRouter()
// 获取顶部导航栏元素
let nav = []
// 获取可拖拽元素
const drag = ref(null)
const drag1 = ref(null)

// 定义是否联网
const online = ref(localStorage.getItem('online') === 'online' ? true : false)


// 改变顶部导航栏的激活状态
const changeActive = (index, router_name) => {
  nav.forEach((item) => {
    if (item) {
      item.classList.remove('active')
    }
  })
  if (nav[index]) {
    nav[index].classList.add('active')
  }
  if (router_name === 'screen') {
    hideLeftBar()
    router.push('/home/' + router_name)
  } else if (router_name === 'digital_twin') {
    hideLeftBar()
    userStore.changeSecondRouter(router_name)
    console.log(
      '/home/' + router_name + '/' + userStore.secRouter.children[0].router_name,
      '数字孪生'
    )
    router.push('/home/' + router_name + '/' + userStore.secRouter.children[0].router_name)
  } else {
    showLeftBar()
    userStore.changeSecondRouter(router_name)
    router.push('/home/' + router_name + '/' + userStore.secRouter.children[0].router_name)
  }
}

// 左侧边栏的显示隐藏
const showLeftBar = () => {
  // 获取左侧边栏元素和主要内容区域元素
  const leftBar = document.querySelector('.leftBar-wrapper')
  const mainWrapper = document.querySelector('.main-wrapper')
  leftBar.style.width = '12%'
  leftBar.style.marginLeft = '1%'
  // 把主要内容区域设置为占据右侧
  mainWrapper.style.width = ''
  mainWrapper.style.marginRight = '30px'
  mainWrapper.style.marginLeft = '20px'
}
const hideLeftBar = () => {
  // 获取左侧边栏元素和主要内容区域元素
  const leftBar = document.querySelector('.leftBar-wrapper')
  const mainWrapper = document.querySelector('.main-wrapper')
  if(leftBar) {
    leftBar.style.width = '0'
    // 把主要内容区域设置为占满全屏
    mainWrapper.style.flex = '1'
    mainWrapper.style.marginRight = '2%'
    mainWrapper.style.marginLeft = '0'
  }

}

// 测试是否联网
const pingInter = async () => {
  if (online.value) {
    setInterval(async () => {
      window.topBar.pingInter().then((res) => {
        online.value = res === '在线' ? true : false
        // 监测到离线就登出
        if (!online.value) {
          userStore.changeLogoutAlert(true)
          console.log('logoutAlert', userStore.logoutAlert.value)
        }
        console.log('在线状态', online.value)
      })
    }, 10000)
  }
}

// 展示设置弹窗
const showSettingScreenMenu = () => {
  SettingScreenMenuStore.getCurrentPath(route.path)
  router.push('/home/setting_menu')
}
onMounted(() => {
  nav = Array.from(document.querySelectorAll('.nav'))
  changeActive(0, 'screen')
  // showLeftBar()
  pingInter()
})
</script>
<style scoped lang="less">
.top-bar {
  position: relative;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 0;
  // box-shadow: var(--screen-card-shadow);
  // display: none;
  // background-color: #67C23A;
  margin-bottom: 20px;
  .label-wrapper {
    width: 31%;
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 2%;
    img {
      height: 80%;
      object-fit: contain;
      margin-right: 2%;
    }
    p {
      color: var(--HeaderFontColor);
      font-size: 1.2em;
      font-weight: bold;
      margin: 0;
      margin-right: 30px;
    }
  }
  .drag {
    flex: 1;
    height: 100%;
    // -webkit-app-region: drag;
  }
  .box {
    position: absolute;
    top: 0;
    width: 52vw;
    left: 28vw;
    height: 2vh;
    // background-color: azure;
    // -webkit-app-region: drag;
  }
  .nav-wrapper {
    width: 80%;
    height: 70%;
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-wrap: wrap;
    color: var(--font-level-3);
    .nav {
      height: 100%;
      width: auto;
      padding: 0 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1em;
      font-weight: bold;
      transition: all 0.2s;
      border-radius: 10px;
      margin-right: 5px;
      cursor: pointer;
      &:hover {
        color: var(--font-level-1);
      }
    }
    .active {
      // background-color: #a9ded8;
      background-color: #34b2f7;
      // background-color: #fff;
      color: var(--font-level-1);

    }
  }
  .function-wrapper2 {
    width: 120px;
    height: 30px;
    // padding-bottom: 25px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: var(--HeaderFontColor);
    margin-right: 15px;
    .btn {
      width: 30px;
      height: 30px;
      font-size: 18px;
      background-color: transparent;
      border: none;
      line-height: 35px;
      color: var(--HeaderFontColor);
      cursor: pointer;
    }
    .message {
      transition: all 0.1s;
      &:hover {
        transform: scale(1.1);
      }
    }
    .setting {
      transition: all 0.3s;
      &:hover {
        transform: rotate(180deg);
      }
    }
    .online {
      width: 40px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      border-radius: 10px;
      background-color: #67c23a;
      font-size: 0.6em;
      cursor: default;
    }
  }
  .function-wrapper {
    width: 60px;
    height: 80%;
    margin-right: 15px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    // background-color: #ff4d4f;
    .btn {
      width: 30px;
      height: 30px;
      font-size: 18px;
      background-color: transparent;
      border: none;
      line-height: 35px;
      transition: all 0.2s;
      color: var(--HeaderFontColor);
      &:hover {
        background-color: #dadada;
      }
    }

    .close {
      &:hover {
        background-color: #ff4d4f;
      }
    }
  }
}

.dragable {
  -webkit-app-region: drag;
}
</style>
