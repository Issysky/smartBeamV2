<!-- 弹窗卡片组件4 出现在风险安全事件三级路由中 -->
<template>
  <div class="card-wrapper">
    <div class="mask"></div>
    <div class="card">
      <button class="close" @click="closeCard()">×</button>
      <img :src="securityStore.securityDetailData.data.image_url" alt="" />
      <div class="state-wrapper">
        <div class="state" v-permission="['device_aiMonitor_detail_patch', 'remove']">
          <el-switch
            v-model="value5"
            inline-prompt
            style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
            active-text="已处理"
            inactive-text="未处理"
            @change="changeHandled"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { onMounted, ref } from 'vue'
import { useSecurityStore } from '@renderer/stores/homeStore/securityStore/security'
// 引入store
const securityStore = useSecurityStore()

const value5 = ref(true)

const changeHandled = () => {
  securityStore.changeHandled()
}
const closeCard = () => {
  securityStore.submitHandled()
  securityStore.resetSecurityDetailData()
}
onMounted(() => {
  value5.value = securityStore.securityDetailData.data.is_handled
})
</script>
<style scoped lang="less">
.card-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .card {
    width: 40%;
    height: 45%;
    background-color: var(--MainContentBgColor);
    border-radius: 15px;
    z-index: 2;
    position: relative;
    display: flex;
    justify-content: start;
    align-items: center;
    padding-top: 30px;
    flex-direction: column;

    .close {
      position: absolute;
      top: 0;
      right: 0;
      width: 30px;
      height: 30px;
      border: none;
      background-color: transparent;
      color: #000-;
      font-size: 1.5em;
      cursor: pointer;
      &:hover {
        color: var(--color-danger);
      }
    }
    img {
      width: 100%;
      height: 93%;
      object-fit: contain;
    }
    .state-wrapper {
      width: 100%;
      height: 20%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .state {
        width: 40%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .ml-2 {
          height: 100;
        }
      }
    }
  }
}
</style>
