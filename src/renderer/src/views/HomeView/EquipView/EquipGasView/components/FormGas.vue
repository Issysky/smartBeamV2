<!-- 有害气体表格  出现在设备管理,有害气体页面-->
<template>
  <div class="form-gas-wrapper">
    <!-- 图表 -->
    <div class="table-wrapper">
      <!-- 表格顶部区域 -->
      <div class="top-wrapper">
        <!-- 过滤器 -->
        <div class="filter">
          <div class="time-select">
            <el-date-picker
              v-model="datePickerValue"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="YYYY/MM/DD hh:mm:ss"
              value-format="YYYY-MM-DD hh:mm:ss "
              @change="getParams('time', datePickerValue)"
            />
          </div>
          <div class="input-wrapper">
            <input
              v-model="name"
              type="text"
              class="name"
              placeholder=" 名称"
              @blur="getParams('name', name)"
            />
          </div>
          <div class="input-wrapper">
            <input
              v-model="area"
              type="text"
              class="area"
              placeholder="  区域"
              @blur="getParams('area', area)"
            />
          </div>
          <div class="excess-select">
            <!-- <span>超标等级</span> -->
            <el-select
              v-model="sensor_category"
              class="m-2"
              filterable
              placeholder="事件类型"
              style="width: 240px"
              @change="getParams('sensor_category', sensor_category)"
            >
              <el-option
                v-for="item in sensor_categoryArr"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="btn-arr">
            <button @click="getFormGasData('', '')">查询</button>
            <button @click="resetParams()">重置</button>
            <button @click="equipGasStore.exportGasExcel()">导出</button>
          </div>
        </div>
      </div>
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
            <span class="icon" @click="sortBy(item.key)">
              <el-icon :style="{ color: isSortShow.show === item.key ? '#409EFF' : '' }"
                ><CaretTop
              /></el-icon>
              <el-icon :style="{ color: isSortShow.show === '-' + item.key ? '#409EFF' : '' }"
                ><CaretBottom
              /></el-icon>
            </span>
          </div>
        </div>
        <div class="value-wrapper">
          <div
            class="value-column"
            v-for="(item, index) in equipGasStore.gasFormData.data"
            :key="index"
          >
            <p class="value" v-for="(valueKey, i) in equipGasStore.gasDataKey" :key="index">
              <!-- 实际方量加后缀 -->
              {{ valueKey === 'sensor_category' ? item[valueKey] + '污染超标' : item[valueKey] }}
            </p>
          </div>
        </div>
      </div>
      <!-- 分页器 -->
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          v-model:current-page="currentPage"
          @change="getFormGasData('page', currentPage)"
          :total="equipGasStore.totalPage * 10"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { ref, onMounted, reactive } from 'vue'
import GasModel from './GasModel.vue'
import ChartGasAlert from './ChartGasAlert.vue'
import { useEquipGasStore } from '@renderer/stores/homeStore/equipStore/equipGas.js'
// 获取store
const equipGasStore = useEquipGasStore()
// 定义传出的筛选数据
let params = reactive({
  page_size: 10
})

const name = ref('')
const area = ref('')
const sensor_category = ref('')
const currentPage = ref(1)

const sensor_categoryArr = [
  {
    name: '一氧化碳超标',
    value: 'co'
  },
  {
    name: '氨气超标',
    value: 'nh3'
  },
  {
    name: '甲烷超标',
    value: 'ch4'
  },
  {
    name: '硫化氢超标',
    value: 'h2s'
  }
]

// 排序按钮是否显示
const isSortShow = reactive({
  show: ''
})
// 根据筛选获得参数
const getParams = (key, value) => {
  if (key === 'time') {
    params.time_from = value[0]
    params.time_to = value[1]
  } else if (key === 'name') {
    params.name = value
  } else if (key === 'area') {
    params.area = value
  } else if (key === 'sensor_category') {
    params.sensor_category = value
  }
}
// 重置筛选参数
const resetParams = () => {
  params = {
    page_size: 10,
    ordering: '-time'
  }
  name.value = ''
  area.value = ''
  sensor_category.value = ''
  getFormGasData('', '')
}

const sortBy = (key) => {
  // 切换排序按钮显示
  if (isSortShow.show === key) {
    isSortShow.show = '-' + key
  } else {
    isSortShow.show = key
  }
  params.ordering = isSortShow.show
  getFormGasData('', '')
}

// 获取页面数据
const getFormGasData = (type, value) => {
  // 只有调用分页器的时候需要传入type和value
  if (type === 'page') {
    params.page = value
  } else {
    currentPage.value = 1
    params.page = 1
  }
  equipGasStore.getFormGasData(params)
}

onMounted(() => {
  // 获取有害气体表格数据
  getFormGasData('', '')
})
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
      height: 10%;
      .filter {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        font-size: 16px;
        .time-select {
          width: 20%;
          height: 100%;
          display: flex;
          align-items: center;
          margin-right: 2%;
        }

        .input-wrapper {
          width: 12%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 2%;
          input {
            width: 100%;
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
        .excess-select {
          width: 10%;
          height: 100%;
          display: flex;
          align-items: center;
          margin-right: 2%;
        }
        .btn-arr {
          flex: 1;
          height: 100%;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          button {
            flex: 1;
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
        height: 40px;
        display: flex;
        background-color: #60626633;
        border-radius: 15px;
        position: relative;
        margin-bottom: 1%;
        box-shadow: 5px 5px 10px #00000033;
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
          height: 30px;
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
    .pagination {
      width: 90%;
      height: 6%;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
