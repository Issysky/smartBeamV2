<!-- 设备监控二级路由 -->
<template>
  <div class="equip-monitor-wrapper">
    <Monitor v-if="monitorStore.isShow" />
    <LabelType1 label="设备监控" eng="EquipMonitor" />
    <!-- 过滤器 -->
    <div class="filter-wrapper">
      <div class="input-wrapper">
        <input
          v-model="area"
          type="text"
          class="area"
          placeholder="  区域"
          @blur="getParams('area', area)"
        />
        <input
          v-model="name"
          type="text"
          class="name"
          placeholder=" 名称"
          @blur="getParams('name', name)"
        />
      </div>
      <div class="btn-arr">
        <button @click="getMonitorListData('', '')">查询</button>
        <button @click="resetParams">重置</button>
      </div>
    </div>
    <!-- 监控卡片区域 -->
    <div class="monitor-wrapper">
      <div
        class="monitor"
        v-for="item in equipMonitorStore.monitorList.data"
        :key="item.id"
        @click="monitorStore.showMonitor(item.rtsp_url)"
      >
        <MonitorCard :monitorData="item" />
      </div>
    </div>
    <!-- 分页器 -->
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        v-model:current-page="currentPage"
        @change="getMonitorListData('page', currentPage)"
        :total="equipMonitorStore.totalPage * 10"
      />
    </div>
  </div>
</template>

<script setup lang="js">
import { ref } from 'vue'
import axios from 'axios'
import { onMounted, reactive } from 'vue'
import { useEquipMonitorStore } from '@renderer/stores/homeStore/equipStore/equipMonitor.js'
import { useMonitorStore } from '@renderer/stores/homeStore/equipStore/monitor.js'
import LabelType1 from '@renderer/components/LabelType1.vue'
import MonitorCard from './components/MonitorCard.vue'
import Monitor from '@renderer/components/Monitor.vue'

const equipMonitorStore = useEquipMonitorStore()
const monitorStore = useMonitorStore()
// 定义params
let params = reactive({
  page_size: 8
})

const currentPage = ref(1)
const name = ref('')
const area = ref('')

// 根据筛选获得参数
const getParams = (key, value) => {
  if (key === 'name') {
    params.name = value
  } else if (key === 'area') {
    params.area = value
  }
}
// 重置筛选参数
const resetParams = () => {
  params = {
    page_size: 8
  }
  name.value = ''
  area.value = ''
  currentPage.value = 1
  getMonitorListData('', '')
}

// 获取页面数据
const getMonitorListData = (type, value) => {
  // 只有调用分页器的时候需要传入type和value
  if (type === 'page') {
    params.page = value
  }
  console.log(params)
  equipMonitorStore.getMonitorList(params)
}

onMounted(() => {
  getMonitorListData('', '')
})
</script>
<style scoped lang="less">
.equip-monitor-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .filter-wrapper {
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    font-size: 16px;
    justify-content: space-around;
    margin-bottom: 40px;

    .input-wrapper {
      width: 30%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-right: 2%;
      input {
        width: 45%;
        height: 33%;
        border: 1px solid #ccc;
        border-radius: 5px;
        &:focus {
          border: 1px solid #409eff;
          outline: none;
        }
        &::placeholder {
          color: #a8abb2;
        }
      }
    }
    .btn-arr {
      width: 30%;
      height: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      button {
        width: 30%;
        height: 40%;
        margin-left: 4%;
        border: none;
        border-radius: 5px;
        background-color: #34b2f7;
        color: var(--font-level-1);
        &:hover {
          cursor: pointer;
          background-color: #79bbff;
        }
      }
    }
  }
  .monitor-wrapper {
    width: 100%;
    height: 60%;
    position: relative;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    overflow-y: auto;
    margin-bottom: 30px;
    .monitor {
      width: 23%;
      height: 45%;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  .pagination {
    width: 80%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
