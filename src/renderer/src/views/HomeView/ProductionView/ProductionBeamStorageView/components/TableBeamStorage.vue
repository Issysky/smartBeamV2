<!-- 架设进度图表组件,出现在架设进度三级路由 -->
<template>
  <!-- 表格外框 -->
  <div class="table-birdge-wrapper">
    <!-- 图表 -->
    <div class="table-wrapper">
      <!-- 表格主体 -->
      <div class="table">
        <div class="title-wrapper">
          <div
            class="title"
            v-for="(item, index) in beamStorageStore.beamStorageColumns"
            :key="index"
          >
            <span> {{ item.name }}</span>
          </div>
        </div>
        <div class="value-wrapper">
          <div class="value-column" v-for="(item, index) in beamStorageStore.pageData.data" :key="index">
            <p
              class="value"
              v-for="(valueKey, i) in beamStorageStore.beamStorageDataKey"
              :key="index"
            >
              {{ item[valueKey] }}
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
          @change="getBridgeData('page', currentPage)"
          :total="10*beamStorageStore.totalPage"
        />
      </div>
    </div>
    <!-- 详情弹窗 -->
  </div>
</template>

<script setup lang="js">
import { onMounted, reactive, ref } from 'vue'
import { useProductionBeamStorageStore } from '@renderer/stores/homeStore/productionStore/production_beam_storage'

// 引入store
const beamStorageStore = useProductionBeamStorageStore()

// 定义分页后的图表数据
const pageData = reactive({
  data: []
})

// 当前页数
const currentPage = ref(1)

// 获取分页数据
const getBridgeData = () => {
  beamStorageStore.getPageData(currentPage.value)
}

onMounted(() => {
  // 获取存梁信息数据
  beamStorageStore.getBeamStorage()
})
</script>
<style scoped lang="less">
.table-birdge-wrapper {
  width: 94%;
  height: 100%;
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
      height: 20%;
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
      height: 64%;
      margin-bottom: 20px;
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
          height: 40px;
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
      height: 12%;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
