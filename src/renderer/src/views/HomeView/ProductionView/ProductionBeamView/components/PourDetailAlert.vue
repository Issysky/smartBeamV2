<!-- 图表 混凝土详情弹窗 出现在生产数据 梁体数据图表页面 -->
<template>
    <div class="card-wrapper">
      <!-- 遮罩 -->
      <div class="mask"></div>
      <!-- 卡片 -->
      <div class="card">
        <!-- 标题 -->
        <div class="label-wrapper">
          <p class="label">拌合站明细</p>
          <div class="close">
            <el-icon @click="equipMixStore.showDetailDialog"><CloseBold /></el-icon>
          </div>
        </div>
        <div class="content-wrapper">
          <!-- 内容区1 -->
          <div class="content1" v-for="(item, index) in equipMixStore.mixDetailContent1" :key="index">
            <p class="label">{{ item.name }}</p>
            <p class="value">{{ equipMixStore.mixDetailData[item.key] }}</p>
          </div>
          <!-- 包含表格的部分 -->
          <div class="table">
            <!-- 标题 -->
            <div class="title">
              <p>材料消耗</p>
            </div>
            <!-- 内容区2 -->
            <div
              class="content2"
              v-for="(item, index) in equipMixStore.mixDetailContent2"
              :key="index"
            >
              <p class="label">{{ item.name }}</p>
              <p class="value">{{ equipMixStore.mixDetailData[item.key] }}</p>
            </div>
            <!-- 表格 -->
            <div class="table-content">
              <el-table :data="equipMixStore.mixDetailTableData.data" border style="width: 100%">
                <el-table-column prop="name" label="名称" width="150" />
                <el-table-column prop="design" label="设计值" width="150" />
                <el-table-column prop="actual" label="实际值" width="150" />
                <el-table-column prop="warning" label="预警" width="150" />
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="js">
  import { useEquipMixStore } from '@renderer/stores/homeStore/equipStore/equipMix'
  import { onMounted, ref, defineProps } from 'vue'
  
  const equipMixStore = useEquipMixStore()
  // 定义详细数据
  const props = defineProps(['detailData'])
  
  // 表格数据
  const tableData = [
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    },
    {
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    },
    {
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    }
  ]
  onMounted(() => {
    // 初始化数据
    console.log(equipMixStore.mixData)
  })
  </script>
  <style scoped lang="less">
  .card-wrapper {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0%;
    display: flex;
    justify-content: center;
    align-items: center;
  
    .mask {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
    }
    .card {
      width: 700px;
      height: 95%;
      background-color: #fff;
      z-index: 2;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: column;
      box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
  
      .label-wrapper {
        width: 90%;
        height: 7%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2px solid #ccc;
        margin-bottom: 15px;
        .label {
          width: 90%;
          font-size: 26px;
          font-weight: 600;
        }
        .close {
          width: 10%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          color: #000;
        }
      }
      .content-wrapper {
        width: 95%;
        height: 90%;
        padding-left: 5%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        overflow-y: auto;
        overflow-x: hidden;
        color:var(--font-level-9);
        
        .content1 {
          width: 100%;
          height: auto;
          display: flex;
          justify-content: flex-start;
          margin-bottom: 15px;
          font-size: 14px;
          .label {
            margin-right: 10px;
          }
        }
        .table {
          width: 100%;
          height: auto;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
  
          .title {
            width: 100%;
            font-size: 22px;
            font-weight: 600;
            padding-bottom: 10px;
            border-bottom: 1px solid #ccc;
            margin-bottom: 5px;
          }
          .content2 {
            width: 100%;
            height: auto;
            display: flex;
            justify-content: flex-start;
            margin-bottom: 10px;
            font-size: 14px;
            .label {
              margin-right: 10px;
            }
          }
        }
      }
    }
  }
  </style>
  