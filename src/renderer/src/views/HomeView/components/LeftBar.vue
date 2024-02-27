<!-- 左侧边栏 出现在绝大多数页面中 -->
<template>
  <div class="leftBar-wrapper" ref="leftBar">
    <div class="user-wrapper">
      <img src="/src/assets/img/logo/logo1.png" alt="" />
      <div class="split-line"></div>
    </div>
    <!-- 导航 -->
    <div class="nav-wrapper">
      <div
        class="leftnav"
        :class="{ active: index === userStore.secRouterActive }"
        @click="handleClick(index)"
        v-for="(item, index) in userStore.secRouter.children"
        :key="index"
      >
        <span class="iconfont" :class="`icon-${item.icon}`"></span>
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { onMounted } from 'vue'
import { useUserStore } from '@renderer/stores/loginStore/user.js'
import { useRouter } from 'vue-router'

// 定义路由
const router = useRouter()
// 引入store
const userStore = useUserStore()
// 点击跳转不同三级路由
const handleClick = async (index) => {
  userStore.changeSecActive(index)
  if (userStore.secRouter.children) {
    const path =
      '/home/' +
      userStore.secRouter.router_name +
      '/' +
      userStore.secRouter.children[index]?.router_name
    console.log('path', path)
    router.push({ path })
  }
}
onMounted(() => {
  handleClick(0)
})
</script>
<style scoped lang="less">
.leftBar-wrapper {
  width: 0;
  height: 90vh;
  border-radius: 15px;
  // background: var(--LeftNavBgColor);
  background-color: #1c1c1c;
  flex-direction: column;
  box-shadow: 8px 8px 16px #000;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  font-family: 'textFont';
  .user-wrapper {
    width: 100%;
    height: 14%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    img {
      width: 50%;
      height: 100%;
      object-fit: contain;
      margin-right: 3%;
      // background-color: #000;
    }
    p {
      font-size: 0.8em;
      color: var(--LeftNavFontColor);
      margin: 0;
      line-height: 1.5;
      white-space: nowrap;
    }
    .split-line {
      position: absolute;
      width: 60%;
      height: 3px;
      background-color: #fff;
      bottom: 10px;
      border-radius: 1.5px;
    }
  }
  .nav-wrapper {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    .leftnav {
      width: 70%;
      height: 3.5vh;
      margin-bottom: 4%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 0.8em;
      font-weight: 600;
      color: var(--font-level-1);
      letter-spacing: 2px;
      border-radius: 10px;
      white-space: nowrap;
      padding-left: 15px;
      transition: all 0.1s ease-in-out;
      cursor: pointer;
      &:hover {
        color: var(--font-level-3);
        // background-color: #b0ebff;
      }
      span {
        width: 20px;
        height: 20px;
        margin-right: 9px;
        line-height: 20px;
      }
    }
    .active {
      color: var(--font-level-1);
      background-color: #34b2f7;
      &:hover {
        color: var(--font-level-1);
        background-color: #34b2f7;
      }
    }
  }
}
</style>
