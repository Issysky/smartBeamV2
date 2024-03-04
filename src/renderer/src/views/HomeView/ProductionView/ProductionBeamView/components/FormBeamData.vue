<!-- 图表 生产数据  梁体数据-->
<template>
  <!-- 表格外框 -->
  <div class="table-mix-wrapper">
    <!-- 图表 -->
    <div class="table-wrapper">
      <!-- 表格顶部区域 -->
      <div class="top-wrapper">
        <!-- 过滤器 -->
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
          <div class="status-select">
            <!-- <span>超标等级</span> -->
            <el-select
              v-model="status"
              class="m-2"
              filterable
              placeholder="超标等级"
              style="width: 240px"
              @change="getParams('status', status)"
            >
              <el-option
                v-for="item in statusArr"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="input-wrapper">
            <input
              v-model="bridge"
              type="text"
              class="bridge"
              placeholder="  桥梁筛选"
              @blur="getParams('bridge', bridge)"
            />
          </div>
          <div class="input-wrapper">
            <input
              v-model="beam_code"
              type="text"
              class="beam_code"
              placeholder="  梁号筛选"
              @blur="getParams('beam_code', beam_code)"
            />
          </div>
          <div class="btn-arr">
            <button @click="getBeamData('', '')">查询</button>
            <button @click="resetParams('', '')">重置</button>
            <button @click="productionBeamStore.exportExcelData()">导出</button>
          </div>
        </div>
      </div>
      <!-- 表格主体 -->
      <div class="table">
        <div class="title-wrapper">
          <div
            class="title"
            :style="{ width: item.width }"
            v-for="(item, index) in productionBeamStore.beamDataColumns"
            :key="index"
          >
            <span> {{ item.name }}</span>
            <span class="icon" v-if="item.key !== 'detail'" @click="sortBy(item.key)">
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
            v-for="(item, index) in productionBeamStore.beamData.data"
            :key="index"
          >
            <p class="value" :style="{width:productionBeamStore.beamDataColumns[i].width}" v-for="(valueKey, i) in productionBeamStore.beamDataKeys" :key="index">
              <!-- 实际方量加后缀 -->
              {{ valueKey === 'status' ? getStatus(item[valueKey]) : item[valueKey] }}
              <!-- 详情显示字体图标 -->
              <el-icon
                v-if="valueKey === 'detail'"
                :style="{ cursor: 'pointer', fontSize: '1.5em' }"
                @click="openDetailAlert(item.name)"
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
          @change="getBeamData('page', currentPage)"
          :total="productionBeamStore.totalPage * 10"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { onMounted, reactive, ref } from 'vue'
import { useProductionBeamStore } from '@renderer/stores/homeStore/productionStore/production_beam_data.js'

// 引入store
const productionBeamStore = useProductionBeamStore()

// 当前页数
const currentPage = ref(1)
// 选择日期
const datePickerValue = ref('')
// 桥梁
const bridge = ref('')
// 梁号
const beam_code = ref('')
// 风险等级
const status = ref('')
// 定义传出的筛选数据
let params = reactive({
  page_size: 10
})

// 排序按钮是否显示
const isSortShow = reactive({
  show: 'DischargeTime'
})

// 风险等级数组
const statusArr = [
  { label: '生产中', value: 'producing' },
  { label: '未生产', value: 'not_produced' },
  { label: '存梁区', value: 'in_storage' },
  { label: '已架设', value: 'in_bridge' }
]

// 根据筛选获得参数
const getParams = (key, value) => {
  if (key === 'time') {
    params.time_from = value[0]
    params.time_to = value[1]
  } else if (key === 'beam_code') {
    params.beam_code = value
  } else if (key === 'bridge') {
    params.bridge = value
  } else if (key === 'status') {
    params.status = value
  }
}
// 重置筛选参数
const resetParams = () => {
  params = {
    page_size: 10,
    ordering: '-time'
  }
  datePickerValue.value = ''
  status.value = ''
  bridge.value = ''
  beam_code.value = ''
  getBeamData('', '')
}
// 获得状态
const getStatus = (status) => {
  if (status === 'producing') {
    return '生产中'
  } else if (status === 'not_produced') {
    return '未生产'
  } else if (status === 'in_storage') {
    return '存梁区'
  } else if (status === 'in_bridge') {
    return '已架设'
  }
}
// 打开详情弹窗
const openDetailAlert = (beam_name) => {
  productionBeamStore.getDetailData(beam_name)
  productionBeamStore.showDetail()
}
// 排序
const sortBy = (key) => {
  // 切换排序按钮显示
  if (isSortShow.show === key) {
    isSortShow.show = '-' + key
  } else {
    isSortShow.show = key
  }
  params.ordering = isSortShow.show
  getBeamData('', '')
}

// 获取页面数据
const getBeamData = (type, value) => {
  // 只有调用分页器的时候需要传入type和value
  if (type === 'page') {
    params.page = value
  } else {
    currentPage.value = 1
    params.page = 1
  }
  productionBeamStore.getBeamData(params)
}

onMounted(() => {
  getBeamData('', '')
})
</script>
<style scoped lang="less">
.table-mix-wrapper {
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
        font-size: 16px;
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
        .status-select {
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
            width: 100px;
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
    .table {
      width: 100%;
      height: 75%;
      .title-wrapper {
        width: 100%;
        height: 7%;
        display: flex;
        background-color: #60626633;
        border-radius: 15px;
        position: relative;
        margin-bottom: 1%;
        box-shadow: 5px 5px 10px #00000033;
        justify-content: center;

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
