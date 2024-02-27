 <!-- 大屏概况组件 -->
<template>
  <div class="overview-wrapper" ref="wrapper" :style="{ left: show ? '2%' : '-40%' }">
    <div class="overview">
      <!-- 基本信息 -->
      <Line class="line" :width="'90%'" :label="'项目概况'"></Line>
      <div class="product-info" v-for="item in overviewStore.projectInfo.data" :key="item.label">
        <span class="iconfont" :class="`icon-${item.icon}`"></span>
        <p class="label">{{ item.title + ':' }}</p>
        <p class="text">{{ item.content }}</p>
      </div>
      <!-- 制梁计划 -->
      <div class="beam-info-wrapper">
        <!-- <div class="beam-info" v-for="(item, index) in overviewStore.planInfo.data" :key="index">
          <span class="iconfont" :class="item.icon"></span>
          <p class="label">{{ item.title }}:</p>
          <p class="text">{{ item.value + '片' }}</p>
        </div> -->
        <div class="beam-progress">
          <BeamProgress
            :total="overviewStore.planInfo.data.total"
            :label="'制梁进度'"
            :complate="overviewStore.planInfo.data.beamValue"
            :icon="overviewStore.planInfo.data.iconBeam"
            :color="'#1aaf8b'"
          ></BeamProgress>
        </div>
        <div class="beam-progress">
          <BeamProgress
            :total="overviewStore.planInfo.data.total"
            :label="'架桥进度'"
            :complate="overviewStore.planInfo.data.bridgeValue"
            :icon="overviewStore.planInfo.data.iconBridge"
            :color="'#34b2f7'"
          ></BeamProgress>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { ref, onMounted, onBeforeMount, reactive } from 'vue'
import { load } from 'js-yaml'
import Line from './Line.vue'
import { useOverviewStore } from '@renderer/stores/homeStore/screenStore/overview.js'
import BeamProgress from './BeamProgress.vue'

const overviewStore = useOverviewStore()

const click = () => {
  show.value = !show.value
}
let show = ref(false)
onMounted(() => {
  setTimeout(() => {
    show.value = true
  }, 300)

  // 获取项目基本信息和制梁计划
  overviewStore.getProjectInfo()
  overviewStore.getProjectPlan()
})
</script>
<style scoped lang="less">
.overview-wrapper {
  width: 22%;
  height: 26%;
  position: absolute;
  // left: -50%;
  top: 10%;
  background-color: var(--screen-card-color);
  border-radius: 15px;
  // box-shadow: 0 0 30px 0 #000000dd;
  box-shadow: var(--screen-card-shadow);
  transition:var(--screen-card-transition);
  .overview {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 2%;

    .product-info {
      width: 100%;
      height: 16%;
      display: flex;
      align-items: center;
      color: var(--font-level-2);
      margin-left: 10%;
      img {
        width: 30px;
        height: 30px;
      }
      p {
        margin: 0;
        font-size: 0.7em;
      }
      .iconfont {
        font-size: 1em;
        margin-left: 5%;
      }
      .label {
        margin-left: 2%;
        width: 20%;
      }
      .text {
        width: 70%;
      }
    }
    .beam-info-wrapper {
      width: 100%;
      height: 24%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: var(--font-level-2);
      margin-left: 10%;
      .beam-info {
        width: 50%;
        display: flex;
        align-items: center;
        margin-left: 5%;
        p {
          margin: 0;
          font-size: 0.7em;
        }
        .iconfont {
          font-size: 1em;
        }
        .label {
          width: auto;
          margin-left: 5%;
        }
        .text {
          width: 20%;
          margin-right: 5%;
        }
      }
      .beam-progress {
        width: 90%;
        height: 50%;
      }
    }
  }
}
</style>
