<!-- 考勤数据三级路由 -->
<template>
  <div class="labor-attendance-wrapper">
    <LabelType1 :label="'考勤数据'" :eng="'Labor Attendance'" />
    <div class="content">
      <div class="left">
        <div class="content"><InfoCard /></div>
        <div class="chart-wrapper"><ChartAttendance /></div>
      </div>
      <div class="right">
        <TableAttendance />
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { ref } from 'vue'
import LabelType1 from '@renderer/components/LabelType1.vue'
import TableAttendance from './components/TableAttendance.vue'
import ChartAttendance from './components/ChartAttendance.vue'
import InfoCard from './components/InfoCard.vue'
import { useLaborAttendanceStore } from '@renderer/stores/homeStore/laborStore/laborAttendance'

let chart = ref(null)

const laborAttendanceStore = useLaborAttendanceStore()
</script>
<style scoped lang="less">
.labor-attendance-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  .content {
    width: 100%;
    height: 92%;
    display: flex;
    .left {
      width: 30%;
      height: 100%;
      border-radius: 15px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .content {
        width: 90%;
        height: 45%;
        background-color: #fff;
        border-radius: 15px;
        padding-top: 10px;
        margin-bottom: 20px;
      }
      .chart-wrapper {
        width: 90%;
        height: 45%;
        background-color: #fff;
        border-radius: 15px;
        padding-top: 10px;
      }
    }
    .right {
      width: 67%;
      height: 95%;
      border-radius: 15px;
      box-shadow: 0 0 15px 0px rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
