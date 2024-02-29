<!-- 点击设置按钮弹出 二级路由设置页面 -->
<template>
  <div class="setting-menu-wrapper">
    <!-- 遮罩 -->
    <div class="mask"></div>
    <div class="setting-menu">
      <!-- 顶部栏 -->
      <div class="header">
        <div
          class="nav"
          v-for="(item, index) in userStore.getSettingFirstRouter()"
          :key="index"
          :class="{ active: index === activeIndex }"
          @click="changeNavActive(index, item.router_name)"
        >
          {{ item.name }}
        </div>
        <button class="close" @click="close()"><el-icon><CloseBold /></el-icon></button>
      </div>
      <!-- 下方内容 -->
      <div class="content-wrapper">
        <!-- 左侧边栏 -->
        <div class="leftbar">
          <div
            class="nav"
            v-for="(item, index) in userStore.settingSecRouter.children"
            :key="index"
            @click="changeLeftActive(index, item.router_name)"
            :class="{ active: index === leftActiveIndex }"
          >
            {{ item.name }}
          </div>
        </div>
        <!-- 主要内容区 -->
        <div class="main-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { useRouter } from 'vue-router'
import { useSettingScreenMenuStore } from '@renderer/stores/homeStore/settingMenuStore/settingScreenMenu.js'
import { useUserStore } from '@renderer/stores/loginStore/user.js'
import { ref, onMounted } from 'vue'

// 引入store
const settingScreenMenuStore = useSettingScreenMenuStore()
const userStore = useUserStore()
//  定义路由
const router = useRouter()

// 定义激活状态
const activeIndex = ref(0)
const leftActiveIndex = ref(0)
// 关闭设置弹窗
const close = () => {
  router.push(settingScreenMenuStore.currentPath)
}
// 改变顶部导航激活状态
const changeNavActive = (index, routerName) => {
  activeIndex.value = index
  userStore.changeSettingSecondRouter(routerName)

  changeLeftActive(0, userStore.settingSecRouter.children[0].router_name)
}
// 改变左侧边栏激活状态
const changeLeftActive = (index, routerName) => {
  console.log(routerName)
  leftActiveIndex.value = index
  let path = '/home/setting_menu/' + routerName
  router.push({ path })
}

onMounted(() => {
  // 初始化激活状态
  // console.log(userStore.getSettingFirstRouter())
  changeNavActive(0, userStore.getSettingFirstRouter()[0].router_name)
})
</script>
<style scoped lang="less">
.setting-menu-wrapper {
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  position: absolute;
  z-index: 100;
  .mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* 黑色半透明遮罩 */
    position: absolute;
    top: 0;
    left: 0;
  }
  .setting-menu {
    width: 50%;
    height: 60%;
    background-color: #2a2d34;
    position: absolute;
    top: 40%;
    left: 55%;
    border-radius: 15px;
    overflow: hidden;
    transform: translate(-50%, -50%);
    color: var(--font-level-1);
    .header {
      display: flex;
      justify-content: space-around;
      height: 7%;
      position: relative;
      margin-bottom: 10px;
      padding-top: 10px;
      align-items: center;
      .nav {
        width: 14%;
        height: 85%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border-radius: 10px;
        font-weight: 600;
        &:hover {
          background-color: #f0f0f0;
          color: var(--font-level-13);
        }
      }
      .active {
        background-color: var(--color-primary);
        color: var(--font-level-1);

        &:hover {
          background-color: var(--color-primary);
          color: var(--font-level-1);

        }
      }
      .close {
        width: 30px;
        height: 30px;
        position: absolute;
        top: 5px;
        right: 5px;
        cursor: pointer;
        background-color: transparent;
        border: none;
        color: var(--font-level-1);
        border-radius: 15px;
        font-size: .8em;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover {
          background-color: var(--color-danger);
          // color: var(--color-danger);
        }
      }
    }
    .content-wrapper {
      height: 93%;
      display: flex;
      .leftbar {
        width: 15%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 20px;
        .nav {
          width: 100%;
          height: 5%;
          padding: 5px 0;
          display: flex;
          justify-content: center;
          align-items: center;
          color: var(--font-level-1);
          font-weight: 600;
          font-size: .8em;
          cursor: pointer;
          &:hover {
            background-color: #f0f0f0;
            color: var(--font-level-13);
          }
        }
        .active {
          // background-color: var(--color-primary);
          background-color: #dcdedf;
          color: var(--font-level-9);
        }
      }
      .main-content {
        width: 81%;
        height: 87%;
        border-radius: 15px;
        background-color: #171d25;
        // box-shadow: 3px 3px 5px #88888899;
        padding: 10px ;
        padding-top: 30px;
      }
    }
  }
}
</style>
