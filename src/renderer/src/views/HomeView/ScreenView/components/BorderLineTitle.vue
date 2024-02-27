<!-- 大屏标题带边框线 -->
<template>
  <div class="border-wrapper" :style="{ opacity: show ? '1' : '0' }">
    <p>智慧信息可视化大屏</p>
    <!-- <div class="bottom-line">
      <div ref="line1" class="line1"></div>
      <div ref="line2" class="line2"></div>
      <div ref="line3" class="line3"></div>
    </div> -->
  </div>
</template>

<script setup lang="js">
import { onMounted, ref } from 'vue'

let show = ref(false)

const line1 = ref(null)
const line2 = ref(null)
const line3 = ref(null)

onMounted(() => {
  // setTimeout(() => {
  //   line1.value.style.width = '895px'
  //   setTimeout(() => {
  //     line2.value.style.width = '35px'
  //     line2.value.style.height = '2px'
  //     setTimeout(() => {
  //       line3.value.style.height = '30px'
  //     }, 100);
  //   }, 690)
  // }, 300)

  setTimeout(() => {
    show.value = true
  }, 1000)
})
</script>
<style scoped lang="less">
.border-wrapper {
  position: absolute;
  width: 95%;
  height: 8%;
  top: 1%;
  // background-color: #181818;
  transition: var(--screen-card-transition);
  p {
    font-size: 2em;
    font-weight: bold;
    color: var(--screen-font-color);
    text-align: center;
    margin: 0;
    letter-spacing: 15px;
    line-height: 2;
    color: #f0f3f8;
    background: -webkit-linear-gradient(#ffffff 35%, #3fdadb 99%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .bottom-line {
    position: relative;
    width: 100%;
    .line1 {
      position: absolute;
      width: 0;
      height: 2px;
      left: 200px;
      top: 70px;
      background-color: #fff;
      transition: all 0.7s;
    }
    .line2 {
      position: absolute;
      width: 0;
      height: 0;
      left: 1092px;
      top: 60px;
      background-color: #fff;
      transform: rotate(145deg);
      transition: all 0.1s;
    }
    .line3 {
      position: absolute;
      width: 2px;
      height: 0;
      left: 1123px;
      top: 21px;
      background-color: #fff;
      transform: rotate(180deg);
      transition: all 0.1s;
      &:hover {
        transform: translateY(100px);
      }
    }
  }
}
</style>
