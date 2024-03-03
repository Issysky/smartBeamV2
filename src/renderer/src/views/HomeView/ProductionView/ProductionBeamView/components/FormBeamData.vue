<!-- 图表 生产数据  梁体数据-->
<template>
  <!-- 表格外框 -->
  <div class="table-mix-wrapper">
    <!-- 图表 -->
    <div class="table-wrapper">
      <!-- 表格顶部区域 -->
      <div class="top-wrapper">
        <!-- 过滤器 -->
        <div class="filter"></div>
      </div>
      <!-- 表格主体 -->
      <div class="table">
        <div class="title-wrapper">
          <div
            class="title"
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
            <p class="value" v-for="(valueKey, i) in productionBeamStore.beamDataKeys" :key="index">
              <!-- 实际方量加后缀 -->
              {{ item[valueKey] }}
              <!-- 详情显示字体图标 -->
              <el-icon
                v-if="valueKey === 'detail'"
                :style="{ cursor: 'pointer', fontSize: '1.5em' }"
                ><Document
              /></el-icon>
            </p>
          </div>
        </div>
      </div>
      <!-- 分页器 -->
      <div class="pagination"></div>
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
// 强度等级
const strengthGrade = ref('')
// 设备编号
const mixStationCode = ref('')
// 浇筑部位
const pouringPosition = ref('')
// 风险等级
const excessGrade = ref('')
// 任务工单号
const taskId = ref('')
// 定义传出的筛选数据
let params = reactive({
  page_size: 10
})

// 排序按钮是否显示
const isSortShow = reactive({
  show: 'DischargeTime'
})

// 风险等级数组
const excessGradeArr = [
  { label: '不超标', value: 0 },
  { label: '一级超标', value: 1 },
  { label: '二级超标', value: 2 },
  { label: '三级超标', value: 3 }
]

// 根据筛选获得参数
const getParams = (key, value) => {
  if (key === 'time') {
    params.time_from = value[0]
    params.time_to = value[1]
  } else if (key === 'strengthGrade') {
    params.StrengthGrade = value
  } else if (key === 'mixStationCode') {
    params.MixStationCode = value
  } else if (key === 'pouringPosition') {
    params.PouringPosition = value
  } else if (key === 'excessGrade') {
    params.ExcessGrade = value
  } else if (key === 'page') {
    params.page = value
  } else if (key === 'taskId') {
    params.TaskId = value
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
  strengthGrade.value = ''
  mixStationCode.value = ''
  pouringPosition.value = ''
  excessGrade.value = ''
  taskId.value = ''
  getMixStationData('', '')
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
  getMixStationData('', '')
}

// 获取页面数据
const getMixStationData = (type, value) => {
  // 只有调用分页器的时候需要传入type和value
  if (type === 'page') {
    params.page = value
  }
  equipMixStore.getMixData(params)
}
// 获取超标图片
const getExcessGradeImg = (value) => {
  if (value === 0) {
    return '/src/assets/img/screenImg/无.png'
  } else if (value === 1) {
    return '/src/assets/img/screenImg/数字1.png'
  } else if (value === 2) {
    return '/src/assets/img/screenImg/数字2.png'
  } else if (value === 3) {
    return '/src/assets/img/screenImg/数字3.png'
  }
}

onMounted(() => {
  productionBeamStore.getBeamData(params)
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
    .table {
      width: 100%;
      height: 75%;
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
    .pagination {
      width: 90%;
      height: 6%;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>