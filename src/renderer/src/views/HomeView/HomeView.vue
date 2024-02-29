<!-- 主页 -->
<template>
  <div class="home-wrapper">
    <!-- 背景视频 -->
    <div ref="BgVideoWrapper" class="bg-video-wrapper">
      <video autoplay loop src="/src/assets/video/bgVideo8.mp4"></video>
    </div>
    <!-- 离线弹窗 -->
    <!-- <LogoutAlert v-if="userStore.logoutAlert"></LogoutAlert> -->
    <!-- 顶部栏 -->
    <div class="header"><TopBar></TopBar></div>
    <!-- 设置弹窗 -->
    <div ref="container" class="container">
      <LeftBar></LeftBar>
      <MainContent>
        <router-view></router-view>
      </MainContent>
    </div>
  </div>
</template>

<script setup >
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import LeftBar from './components/LeftBar.vue'
import MainContent from './components/MainContent.vue'
import TopBar from './components/TopBar.vue'
import LogoutAlert from './components/LogoutAlert.vue'
import { useUserStore } from '@renderer/stores/loginStore/user.js'

// 定义路由
const router = useRouter()

// 引入store
const userStore = useUserStore()
</script>
<style scoped lang="less">
.home-wrapper {
  position: relative;
  .container {
    position: relative;
    width: 100vw;
    height: 100vh;
    padding-left: 1vw;
    padding-right: 5vw;
    display: flex;
    z-index: 2;
  }

  .bg-video-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    overflow: hidden;
    video {
      width: 112%;
      height: 110%;
    }
  }
}
</style>
