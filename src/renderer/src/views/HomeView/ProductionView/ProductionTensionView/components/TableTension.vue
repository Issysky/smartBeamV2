<!-- 张拉数据图表组件,出现在张拉数据三级路由 -->
<template>
  <!-- 表格外框 -->
  <div class="table-tension-wrapper">
    <!-- 图表 -->
    <div class="table-wrapper">
      <!-- 表格顶部区域 -->
      <div class="top-wrapper">
        <!-- 过滤器 -->
        <div class="filter">
          <div class="time-select">
            <el-date-picker
              v-model="datePickerValue"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="YYYY/MM/DD"
              value-format="YYYY-MM-DD"
              @change="getParams('time', datePickerValue)"
            />
          </div>
          <!-- 文本框筛选 -->
          <div class="input-wrapper">
            <input
              v-model="event_type"
              type="text"
              class="strength-grade"
              placeholder="事件类型"
              @blur="getParams('event_type', event_type)"
            />
          </div>
          <div class="input-wrapper">
            <input
              v-model="name"
              type="text"
              class="strength-grade"
              placeholder="地点名称"
              @blur="getParams('name', name)"
            />
          </div>
          <div class="btn-arr">
            <button @click="getTensionData('', '')">查询</button>
            <button @click="resetParams('', '')">重置</button>
            <button @click="">导出</button>
          </div>
        </div>
      </div>
      <!-- echarts图表 -->
      <div class="echart-wrapper">
        <div class="chart1"></div>
      </div>
      <!-- 表格主体 -->
      <div class="table">
        <div class="title-wrapper">
          <div class="title" v-for="(item, index) in tensionStore.tensionColumns" :key="index">
            <span> {{ item.name }}</span>
          </div>
        </div>
        <div class="value-wrapper">
          <div
            class="value-column"
            v-for="(item, index) in tensionStore.formData.data"
            :key="index"
          >
            <p
              class="value"
              :title="item[valueKey]"
              v-for="(valueKey, i) in tensionStore.tensionDataKey"
              :key="index"
            >
              <!-- 缩略图和事件类型特殊处理 -->
              {{ item[valueKey] }}
              <!-- 详情显示字体图标 -->
              <el-icon
                v-if="valueKey === 'detail'"
                :style="{ cursor: 'pointer', fontSize: '1.5em' }"
                @click="getDetailData(2)"
                ><Document
              /></el-icon>
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
          @change="getTensionData('page', currentPage)"
          :total="tensionStore.totalPage * 10"
        />
      </div>
    </div>
    <!-- 详情弹窗 -->
  </div>
</template>

<script setup lang="js">
import { onMounted, reactive, ref } from 'vue'
import { useProductionTensionStore } from '@renderer/stores/homeStore/productionStore/production_tension'

const tensionStore = useProductionTensionStore()

// 当前页数
const currentPage = ref(1)
// 选择日期
const datePickerValue = ref('')
// 地点名称
const name = ref('')
// 事件类型
const event_type = ref('')
// 定义传出的筛选数据
let params = reactive({
  page_size: 10,
  page: 1
})

// 根据筛选获得参数
const getParams = (key, value) => {
  if (key === 'time') {
    params.time_from = value[0]
    params.time_to = value[1]
  } else if (key === 'name') {
    params.name = value
  } else if (key === 'event_type') {
    if (value === '不带安全帽') {
      value = 0
    } else if (value === '不穿反光衣') {
      value = 1
    } else if (value === '抽烟') {
      value = 2
    } else if (value === '脱离违禁区') {
      value = 3
    }
    params.event_type = value
  }

  console.log(params)
}
// 重置筛选参数
const resetParams = () => {
  params = {
    page_size: 10,
    ordering: '-time'
  }
  datePickerValue.value = ''
  name.value = ''
  event_type.value = ''
  getSecurityData('', '')
}

// 获取详情弹窗数据
const getDetailData = (id) => {
  tensionStore.showDetail()
  tensionStore.getTensionDetailData(id)
}
// 获取页面数据
const getTensionData = (type, value) => {
  // 只有调用分页器的时候需要传入type和value
  if (type === 'page') {
    params.page = value
  } else {
    currentPage.value = 1
    params.page = 1
  }
  tensionStore.getTensionData(params)
}

onMounted(() => {
  tensionStore.getTensionData(params)
})
</script>
<style scoped lang="less">
.table-tension-wrapper {
  width: 94%;
  height: 87%;
  padding: 0 3%;

  .table-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
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
        font-size: 0.8em;
        .time-select {
          width: 20%;
          height: 100%;
          display: flex;
          align-items: center;
          margin-right: 2%;
        }

        .input-wrapper {
          width: 9%;
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
          margin-right: 30%;
        }
        .btn-arr {
          width: 30%;
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
      height: 39%;
      display: flex;
      justify-content: center;
      align-items: center;
      .chart1 {
        width: 96%;
        height: 95%;
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
          font-size: 0.8em;
          font-weight: 600;
          .icon {
            height: 40%;
            font-size: 0.8em;
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
            flex: 1;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: var(--font-level-13);
            font-size: 0.7em;
            position: relative;
            overflow: hidden;
            white-space: nowrap;

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
