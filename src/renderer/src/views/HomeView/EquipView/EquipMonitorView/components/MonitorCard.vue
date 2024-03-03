<!-- 监控弹窗组件 出现在蒸养棚 -->
<template>
  <div class="monitor-card-wrapper">
    <div class="item">
      <div class="play">
        <el-icon><VideoPlay /></el-icon>
      </div>
      <div class="text-wrapper">
        <p class="label">
          <span class="area">{{ monitorData.area + '--' }}</span>
          <span class="name">{{ monitorData.name }}</span>
        </p>
      </div>
      <div class="video">
        <!-- <img :src="equipMonitorStore.getImgurl()" alt="" /> -->
        <img src="@renderer/assets/img/equipImg/滑县制梁场.jpeg" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { defineProps, ref } from 'vue'
import axios from 'axios'
import { onMounted } from 'vue'
import { useEquipMonitorStore } from '@renderer/stores/homeStore/equipStore/equipMonitor.js'

// 定义store
const equipMonitorStore = useEquipMonitorStore()
// 定义props
const props = defineProps(['monitorData'])

onMounted(() => {
  equipMonitorStore.getImgurl()
})
</script>
<style scoped lang="less">
.monitor-card-wrapper {
  width: 90%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .item {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 15px;
    // background-color: #fff;
    cursor: pointer;
    .play {
      width: 100%;
      height: 100%;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        .el-icon {
          font-size: 50px;
          color: var(--font-level-1);
        }
      }
      .el-icon {
        font-size: 40px;
        color: var(--font-level-1);
        transition: all 0.1s;
      }
    }

    .text-wrapper {
      width: 100%;
      height: 13%;
      font-size: 20px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      .label {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .area {
          font-size: 22px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }
        .name {
          font-size: 16px;
        }
      }
    }
    .video {
      width: 320px;
      height: 180px;
      margin-bottom: 5px;
      border: 2px solid #333;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
}
</style>
