<!-- 大屏中环境监测组件 -->
<template>
  <div class="environment-wrapper" :style="{ left: show ? '2%' : '-40%' }">
    <Line class="line" :width="'80%'" :label="'环境监测'"></Line>
    <!-- 仪表盘图表 -->
    <div class="chart-wrapper">
      <div class="chart-air">
        <p class="title">PM2.5</p>
        <ChartAir></ChartAir>
      </div>
      <div class="chart-noise">
        <p class="title">噪音指数</p>
        <ChartNoise></ChartNoise>
      </div>
    </div>
    <!-- 下方的温湿度风速显示 -->
    <div class="data-wrapper">
      <div class="data tem">
        <span class="iconfont icon-temperature"></span>
        <p class="value">{{ envStore.envData.data.temperature + '℃' }}</p>
      </div>
      <div class="data hum">
        <span class="iconfont icon-humidity"></span>
        <p class="value">{{ envStore.envData.data.humidity + '%' }}</p>
      </div>
      <div class="data wind">
        <span class="iconfont icon-wind_speed"></span>
        <p class="value">
          {{ envStore.envData.data.wind_speed ? envStore.envData.data.wind_speed : '10' + 'M/s' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import Line from './Line.vue'
import ChartAir from './ChartAir.vue'
import ChartNoise from './ChartNoise.vue'
import { useEnvStore } from '@renderer/stores/homeStore/screenStore/environment.js'
import { onMounted, ref, reactive } from 'vue'

// 定义store
const envStore = useEnvStore()
// 定义展示状态
let show = ref(false)

onMounted(async () => {
  setTimeout(() => {
    show.value = true
  }, 200)
})
</script>

<style scoped lang="less">
.environment-wrapper {
  width: 22%;
  height: 30%;
  position: absolute;
  background-color: var(--screen-card-color);
  top: 38%;
  border-radius: 15px;
  padding-top: 1%;
  box-shadow: var(--screen-card-shadow);
  display: flex;
  flex-direction: column;
  transition: var(--screen-card-transition);
  .chart-wrapper {
    width: 100%;
    flex: 1;
    margin-top: -2%;
    display: flex;
    justify-content: space-around;
    color: var(--font-level-2);
    .chart-air {
      width: 40%;
      height: 100%;
      position: relative;
      .title {
        position: absolute;
        top: 5%;
        left: 50%;
        transform: translateX(-50%);
        font-size: 20px;
      }
    }
    .chart-noise {
      width: 40%;
      height: 100%;
      position: relative;

      .title {
        position: absolute;
        top: 5%;
        left: 50%;
        transform: translateX(-50%);
        font-size: 20px;
      }
    }
  }
  .data-wrapper {
    position: absolute;
    bottom: 2%;
    width: 100%;
    height: 15%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 16px;
    color: var(--font-level-2);
    .data {
      width: 24%;
      display: flex;
      height: 60%;
      justify-content: center;
      align-items: center;
      border-radius: 20px;
      p {
        margin: 0;
        font-size: 18px;
        color: var(--font-level-11);
      }
      .iconfont {
        margin-right: 2%;
        font-size: 24px;
        color: var(--font-level-11);
      }
    }
    .tem {
      background-color: var(--color-warning);
    }
    .hum {
      background-color: var(--color-primary);
    }
    .wind {
      background-color: var(--color-success);
    }
  }
}
</style>
