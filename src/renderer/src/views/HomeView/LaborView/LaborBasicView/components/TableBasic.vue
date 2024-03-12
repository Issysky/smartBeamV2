<!-- 安全事件图表组件,出现在安全时间三级路由 -->
<template>
  <!-- 表格外框 -->
  <div class="table-mix-wrapper">
    <!-- 图表 -->
    <div class="table-wrapper">
      <!-- 表格顶部区域 -->
      <div class="top-wrapper">
        <div class="card" v-for="(item, index) in laborBasicStore.cardData.data">
          <p class="label">{{ item.label }}</p>
          <div class="content">
            <p class="value">{{ item.value }}</p>
            <p class="unit" v-if="item.unit">{{ item.unit }}</p>
            <div class="detail" v-if="!item.unit">
              <p class="label1">{{ item.label1 }}</p>
              <p class="value1">{{ item.value1 }}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- 表格主体 -->
      <div class="table">
        <div class="title-wrapper">
          <div
            class="title"
            v-for="(item, index) in laborBasicStore.laborBasicColumns"
            :key="index"
          >
            <span> {{ item.name }}</span>
          </div>
        </div>
        <div class="value-wrapper">
          <div
            class="value-column"
            v-for="(item, index) in laborBasicStore.laborBasicData.data"
            :key="index"
          >
            <p
              class="value"
              v-for="(valueKey, i) in laborBasicStore.laborBasicDataKey"
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
          @change="getLaborBasicData('page', currentPage)"
          :total="laborBasicStore.totalPage * 10"
        />
      </div>
    </div>
    <!-- 详情弹窗 -->
  </div>
</template>

<script setup lang="js">
import { onMounted, reactive, ref } from 'vue'
import { useLaborBasicStore } from '@renderer/stores/homeStore/laborStore/laborBasic'
// 引入store
const laborBasicStore = useLaborBasicStore()

// 定义传出的筛选数据
let params = reactive({
  page_size: 10
})

// 排序按钮是否显示
const isSortShow = reactive({
  show: 'DischargeTime'
})

// 获取页面数据
const getLaborBasicData = (type, value) => {
  // 只有调用分页器的时候需要传入type和value
  if (type === 'page') {
    params.page = value
  } else {
    currentPage.value = 1
    params.page = 1
  }
}

onMounted(() => {
  laborBasicStore.getLaborBasicData(params)
})
</script>
<style scoped lang="less">
.table-mix-wrapper {
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
      height: 15%;
      margin-top: 30px;
      display: flex;
      justify-content: space-around;
      .card {
        width: 20%;
        height: 100px;
        background-color: #fff;
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .label {
          width: 80%;
          height: 40%;
          font-size: 20px;
          color: var(--font-level-13);
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }
        .content {
          height: 60%;
          width: 80%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          font-size: 20px;
          color: var(--font-level-13);
          p {
            height: 40px;
            display: flex;
            align-items: flex-end;
            justify-content: center;
          }
          .value {
            font-size: 30px;
            color: var(--color-primary);
            font-weight: 600;
          }
          .unit {
            height: 30px;
            font-size: 14px;
            color: var(--font-level-13);
            line-height: 20px;
          }
          .detail {
            width: 60%;
            height: 60%;
            display: flex;
            justify-content: center;
            align-items: center;
            .label1 {
              font-size: 14px;
              color: var(--font-level-13);
            }
            .value1 {
              font-size: 14px;
            }
          }
        }
      }
    }
    .table {
      width: 100%;
      height: 65%;
      .title-wrapper {
        width: 100%;
        height: 10%;
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
