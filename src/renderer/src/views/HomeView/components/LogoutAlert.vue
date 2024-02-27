<!-- 断线登出页面 -->
<template>
  <div class="logout-wrapper">
    <div class="mask"></div>
    <div class="logout">
      <p>网络断开连接!点击登出</p>
      <el-button type="warning" round @click="logout">登出系统</el-button>
    </div>
  </div>
</template>

<script setup lang="js">
import { useRouter } from 'vue-router';

const router = useRouter()
const logout = ()=>{
    router.push('/')
    window.topBar.close()
}
</script>
<style scoped lang="less">
.logout-wrapper {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 100;
  .mask {
    width: 100%;
    height: 100%;
    backdrop-filter: blur(10px); /* 添加毛玻璃效果 */
    position: absolute;
    top: 0;
    left: 0;
  }
  .logout {
    width: 15%;
    height: 15%;
    background-color: transparent;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}
</style>
