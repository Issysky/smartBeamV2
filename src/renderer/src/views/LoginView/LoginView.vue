<!-- 登陆页面 打开应用后的第一个页面-->
<template>
  <div class="login-wrapper" ref="loginWrapper">
    <div class="drag"></div>
    <div class="close" @click="topBarStore.handleClose()">
      <el-icon><Close /></el-icon>
    </div>
    <div class="minimize" @click="topBarStore.handleMini()">
      <el-icon><Minus /></el-icon>
    </div>
    <!-- 登陆卡片 -->
    <div class="card-wrapper">
      <!-- 标题框 -->
      <div class="label-wrapper">
        <img src="@renderer/assets/img/logo/logo1.png" alt="" />
        <!-- 标题 -->
        <p class="label">艾环梦智慧平台</p>
      </div>
      <!-- 账号密码框 -->
      <div class="input-wrapper">
        <input class="userInput" v-model="username" placeholder="请输入用户名" />
        <input
          class="pwdInput"
          v-model="pwd"
          :type="!isShowPwd ? 'password' : 'text'"
          placeholder="请输入密码"
        />
        <div class="show-hide-pwd" @click="showHidePwd">
          <el-icon v-if="isShowPwd"><View /></el-icon>
          <el-icon v-if="!isShowPwd"><Hide /></el-icon>
        </div>
        <!-- 记住密码 -->
        <div class="remember-pwd">
          <p class="outline-login" @click="outlineLogin()">离线登入</p>
          <div class="remember-wrapper">
            <input type="checkbox" id="remember" v-model="rememberPwd" />
            <label for="remember">记住密码</label>
          </div>
        </div>
      </div>
      <!-- 登陆 -->
      <button class="login-btn" @click="login(username, pwd)">登录</button>
      <el-alert
        class="login-err"
        v-if="alertPwd"
        title="用户名或密码错误"
        type="error"
        @close="alertPwd = false"
      />
      <el-alert
        class="login-err"
        v-if="alertOutline"
        title="网络连接错误"
        type="error"
        @close="alertOutline = false"
      />
      <span class="linkUs" @click="toAhmHome" title="www.ihmeng.cn">联系我们</span>
    </div>
  </div>
</template>

<script setup lang="js">
import { onMounted, ref } from 'vue'
import { useUserStore } from '@renderer/stores/loginStore/user.js'
import { useRouter } from 'vue-router'
import { usetopBarStore } from '@renderer/stores/homeStore/topBarStore/topBar.js'

// 定义记住密码参数
const rememberPwd = ref(false)
// 定义路由
const router = useRouter()
// 定义userstore
const userStore = useUserStore()
const topBarStore = usetopBarStore()
// 定义用户名和密码
const username = ref('')
const pwd = ref('')
// 错误提示框
const alertPwd = ref(false)
const alertOutline = ref(false)

// 定义登录框
const loginWrapper = ref(null)

let isShowPwd = ref(false)
// 登录方法
const login = (username, pwd) => {
  localStorage.setItem('online', 'online')
  // 调用userstore的login方法，因为是promise方法所以使用then去处理后续逻辑
  userStore.login(username, pwd).then(() => {
    // 使用pinginter方法判断是否离线
    window.topBar.pingInter().then((res) => {
      if (res === '离线') {
        alertOutline.value = true
      } else {
        // 状态码为200表示登录成功
        if (userStore.userData.status === 200) {
          // 登录成功
          // 判断是否记住密码
          if (rememberPwd.value) {
            // 记住密码
            localStorage.setItem('username', username)
            localStorage.setItem('pwd', pwd)
          } else {
            // 不记住密码
            localStorage.removeItem('username')
            localStorage.removeItem('pwd')
          }
          // 跳转到首页
          loginWrapper.value.style.display = 'none'
          window.topBar.max()
          localStorage.setItem('online', 'online')
          // router.push('/home/screen')
          router.push('/startVideo')
          // router.push('/home/AItalk/AI__production')
        } else {
          // 登录失败
          // 提示错误信息
          alertPwd.value = true
        }
      }
    })
  })
}

// 显隐密码
const showHidePwd = () => {
  isShowPwd.value = !isShowPwd.value
  if (isShowPwd.value) {
    pwd.type = 'text'
  } else {
    pwd.type = 'password'
  }
}

// 跳转首页
const toAhmHome = () => {
  window.topBar.openExternal('http://www.ihmeng.cn/')
}

// 离线登录
const outlineLogin = () => {
  // 处理静态数据存入localstorage
  userStore.login()
  // 跳转到首页
  loginWrapper.value.style.display = 'none'
  window.topBar.max()
  localStorage.setItem('online', 'outline')
  userStore.changeLogoutAlert(false)
  router.push('/startVideo')
}
// 页面加载时判断是否记住密码
onMounted(() => {
  // 判断是否记住密码
  if (localStorage.getItem('username') && localStorage.getItem('pwd')) {
    // 记住密码
    rememberPwd.value = true
    // 设置用户名和密码
    username.value = localStorage.getItem('username')
    pwd.value = localStorage.getItem('pwd')
  }
})
</script>
<style scoped lang="less">
.login-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: var(--BgColor);
  font-size: 20px;

  .drag {
    width: 100%;
    height: 10%;
    position: absolute;
    z-index: 1;
    -webkit-app-region: drag;
  }
  .close {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 2;
    color: var(--label-font-color);
    -webkit-app-region: no-drag;
    cursor: pointer;
  }
  .minimize {
    position: absolute;
    right: 40px;
    top: 0;
    color: var(--label-font-color);
    z-index: 2;
    -webkit-app-region: no-drag;
    cursor: pointer;
  }
  .card-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-top: 15%;
    .label-wrapper {
      width: 100%;
      height: 30%;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        object-fit: contain;
        width: 22%;
        margin-bottom: 15px;
      }
      p {
        margin: 0;
      }
      .label {
        font-size: 1.3em;
        font-weight: 600;
        color: var(--label-font-color);
      }
      .eng {
        font-size: 1em;
        margin-top: 3%;
        color: var(--label-font-color);
      }
    }

    .input-wrapper {
      position: relative;
      width: 100%;
      height: 33%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      input {
        height: 30px;
        width: 60%;
        border-radius: 30px;
        padding-left: 5%;
        border: none;
        outline: none;
        font-size: 0.8em;
        color: var(--font-level-7);
        &:hover {
          box-shadow: 0 0 10px 0 #ffffff77;
        }
      }
      .userInput {
        margin-bottom: 4%;
      }

      .show-hide-pwd {
        position: absolute;
        right: 20%;
        top: 53px;
        color: var(--font-level-7);
        background-color: #fff;
        transition: all 0.2s;
        &:hover {
          cursor: pointer;
          color: var(--font-level-13);
        }
      }
      .remember-pwd {
        width: 60%;
        font-size: 1em;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .outline-login {
          margin: 0;
          font-size: 0.6em;
          color: var(--font-level-7);
          &:hover {
            cursor: pointer;
            color: var(--font-level-2);
          }
        }
        .remember-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          input {
            width: 15px;
            height: 15px;
            margin: 0;
            margin-right: 5px;
          }
          label {
            margin: 0;
            font-size: 0.6em;
            color: var(--font-level-7);
          }
        }
      }
    }

    .login-btn {
      width: 60%;
      height: 30px;
      font-size: 0.7em;
      letter-spacing: 1px;
      background-color: #337ecc;
      border: none;
      color: var(--font-level-1);
      border-radius: 30px;

      &:hover {
        cursor: pointer;
        background-color: #409eff;
      }
    }
    .linkUs {
      position: absolute;
      bottom: 80px;
      font-size: 0.6em;
      color: var(--font-level-3);
      cursor: pointer;
      &:hover {
        color: var(--font-level-1);
      }
    }
  }
}
</style>
