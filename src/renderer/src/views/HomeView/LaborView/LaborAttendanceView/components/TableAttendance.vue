<!-- 安全事件图表组件,出现在安全时间三级路由 -->
<template>
  <!-- 表格外框 -->
  <div class="table-attendance-wrapper">
    <!-- 图表 -->
    <div class="table-wrapper">
      <!-- 表格顶部区域 -->
      <div class="top-wrapper">
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
              v-model="name"
              type="text"
              class="name"
              placeholder="姓名筛选"
              @blur="getParams('name', name)"
            />
          </div>
          <div class="btn-arr">
            <button @click="getSecurityData('', '')">查询</button>
            <button @click="resetParams('', '')">重置</button>
            <button @click="">导出</button>
          </div>
        </div>
      </div>
      <!-- 表格主体 -->
      <div class="table">
        <div class="title-wrapper">
          <div
            class="title"
            :style="{width:item.width}"
            v-for="(item, index) in laborAttendanceStore.laborAttendanceColumns"
            :key="index"
          >
            <span> {{ item.name }}</span>
          </div>
        </div>
        <div class="value-wrapper">
          <div
            class="value-column"
            v-for="(item, index) in laborAttendanceStore.laborAttendanceData.data"
            :key="index"
          >
            <p
              class="value"
              :style="{width:laborAttendanceStore.laborAttendanceColumns[i].width}"
              v-for="(valueKey, i) in laborAttendanceStore.laborAttendanceDataKey"
              :key="index"
            >
              <!-- 缩略图和事件类型特殊处理 -->
              {{ valueKey === 'image_url' || valueKey === 'event_type' ? '' : item[valueKey] }}
              <!-- 缩略图 -->
              <img :src="item[valueKey]" v-if="valueKey === 'image_url'" alt="" />
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
          @change="getLaborAttendanceData('page', currentPage)"
          :total="laborAttendanceStore.totalPage * 10"
        />
      </div>
    </div>
    <!-- 详情弹窗 -->
  </div>
</template>

<script setup lang="js">
import { onMounted, reactive, ref } from 'vue'
import { useLaborAttendanceStore } from '@renderer/stores/homeStore/laborStore/laborAttendance'
// 引入store
const laborAttendanceStore = useLaborAttendanceStore()

const name = ref('')
const datePickerValue = ref('')

// 定义传出的筛选数据
let params = reactive({
  page_size: 15
})

// 排序按钮是否显示
const isSortShow = reactive({
  show: 'DischargeTime'
})

// 获取页面数据
const getLaborAttendanceData = (type, value) => {
  // 只有调用分页器的时候需要传入type和value
  if (type === 'page') {
    params.page = value
  } else {
    currentPage.value = 1
    params.page = 1
  }
}

onMounted(() => {
  laborAttendanceStore.getLaborAttendanceData(params)
})
</script>
<style scoped lang="less">
.table-attendance-wrapper {
  width: 94%;
  height: 100%;
  padding: 0 3%;

  .table-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    .top-wrapper {
      width: 100%;
      height: 10%;
      margin-top: 30px;
      display: flex;
      justify-content: space-around;
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
    .table {
      width: 100%;
      height: 75%;
      .title-wrapper {
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: center;
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
            font-size: 0.7em;
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
