<!-- 有害气体表格  出现在设备管理,有害气体页面-->
<template>
  <div class="form-gas-wrapper">
    <!-- 图表 -->
    <div class="table-wrapper">
      <!-- 表格顶部区域 -->
      <div class="top-wrapper"></div>
      <!-- echarts图表 -->
      <div class="echart-wrapper">
        <div class="chart1">
          <GasModel />
        </div>
        <div class="chart2">
          <ChartGasAlert />
        </div>
      </div>
      <!-- 图表区域 -->
      <!-- 表格主体 -->
      <div class="table">
        <div class="title-wrapper">
          <div class="title" v-for="(item, index) in equipGasStore.gasColumns" :key="index">
            <span> {{ item.name }}</span>
          </div>
        </div>
      </div>
      <!-- 分页器 -->
      <!-- <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          v-model:current-page="currentPage"
          @change="getMixStationData('page', currentPage)"
          :total="equipMixStore.totalPage * 10"
        />
      </div> -->
    </div>
  </div>
</template>

<script setup lang="js">
import { ref, onMounted } from 'vue'
import GasModel from './GasModel.vue'
import ChartGasAlert from './ChartGasAlert.vue'
import { useEquipGasStore } from '@renderer/stores/homeStore/equipStore/equipGas.js'
// 获取store
const equipGasStore = useEquipGasStore()

onMounted(() => {})
</script>
<style scoped lang="less">
.form-gas-wrapper {
  width: 95%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .table-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .top-wrapper {
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      .title {
        font-size: 20px;
        font-weight: bold;
      }
      .btn-wrapper {
        display: flex;
        align-items: center;
        .btn {
          margin-left: 20px;
        }
      }
    }
    .echart-wrapper {
      width: 100%;
      height: 35%;
      display: flex;
      justify-content: center;
      align-items: center;
      .chart1 {
        width: 35%;
        height: 100%;
      }
      .chart2 {
        flex: 1;
        height: 100%;
      }
    }
    .table {
      width: 100%;
      height: 45%;
      .title-wrapper {
        width: 100%;
        height: 10%;
        display: flex;
        background-color: #60626633;
        border-radius: 15px;
        position: relative;
        margin-bottom: 1%;
        box-shadow: 5px 5px 10px #00000033;

        // &::after {
        //   content: '';
        //   display: block;
        //   width: 95%;
        //   height: 1px;
        //   background: black;
        //   position: absolute;
        //   bottom: -10px;
        //   left: 2.5%;
        // }
        .title {
          width: 20%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: var(--font-level-11);
          font-size: 16px;
          font-weight: 600;
          .icon {
            height: 40%;
            font-size: 16px;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .el-icon {
              height: 45%;
              color: #606266;
            }
          }
        }
      }
      .value-wrapper {
        width: 100%;
        height: 85%;
        .value-column {
          width: 100%;
          height: 10%;
          // margin-bottom: .5%;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 15px;
          &:hover {
            background-color: #fff;
          }
          & > :last-child {
            &:hover {
              color: #34b2f7;
            }
          }
          .value {
            width: 20%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: var(--font-level-13);
            font-size: 14px;
            position: relative;
            img {
              position: absolute;
              width: 100%;
              height: 50%;
              object-fit: contain;
            }
          }
        }
      }
    }
  }
}
</style>
