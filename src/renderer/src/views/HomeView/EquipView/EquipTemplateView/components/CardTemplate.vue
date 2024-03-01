<!-- 模板页面卡片  -->
<template>
  <div class="card-template-wrapper">
    <!-- 标题 -->
    <p class="label">{{ '一号模板' }}</p>
    <!-- 左侧区域 -->
    <div class="left-wrapper">
      <img class="template-img" :src="getImg()" alt="模板" />
      <button class="contarl-steam btn" @click="showMonitor()" v-if="true">视频监控</button>
      <button class="switch-contral btn" @click="handle()" :class="{ close: !isActive }">
        {{ isActive ? '设备控制' : '关闭弹窗' }}
      </button>
      <!-- 数据展示 -->
      <div class="info">
        <div class="item">
          <p class="label">左侧模板:</p>
          <p class="value">{{ '开' }}</p>
        </div>
        <div class="item">
          <p class="label">右侧模板:</p>
          <p class="value">{{ '合' }}</p>
        </div>
        <div class="item">
          <p class="label">振捣状态:</p>
          <p class="value">{{ '启动' }}</p>
        </div>
        <div class="item">
          <p class="label">油泵状态:</p>
          <p class="value">{{ '停止' }}</p>
        </div>
      </div>
    </div>
    <!-- 右侧区域 -->
    <div class="right-wrapper">
      <!-- 表格数据 -->
      <div class="data">
        <p class="label">表格数据</p>
        <el-table :data="tableData.data" style="width: 420px" size="small">
          <el-table-column prop="category" label="部位" width="110" />
          <el-table-column prop="value1" label="点位1" width="60" />
          <el-table-column prop="value2" label="点位2" width="60" />
          <el-table-column prop="value3" label="点位3" width="60" />
          <el-table-column prop="value4" label="点位4" width="60" />
          <el-table-column prop="value5" label="点位5" width="60" />
        </el-table>
      </div>
      <!-- 功能控制模块 -->
      <div class="contral" v-if="!isActive">
        <!-- 控制区域 -->
        <div class="btn-wrapper">
          <div class="item" v-for="(item, index) in controlData.data" :key="index">
            <p class="label">{{ item.name }}</p>
            <el-switch
              v-model="item.value"
              class="ml-2"
              style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
              @change="changeValve(index)"
            />
            <!-- 加载图 -->
            <div class="loading-wrapper" v-if="item.loading">
              <p class="loading" :class="{ active: item.loading }">
                <el-icon><Loading /></el-icon>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { onMounted, reactive, ref, watch } from 'vue'

// props
const props = defineProps(['templateData'])

// 定义isActive,控制按钮的样式
const isActive = ref(true)
// 左侧振捣开关
const is_leftVibrate = ref(false)
// 右侧振捣开关
const is_rightVibrate = ref(false)
// 左侧开关
const is_leftTemplate = ref(false)
// 后门开关
const is_rightTemplate = ref(false)
// 表格数据
const tableData = reactive({
  data: [
    {
      category: '左侧平移点位',
      value1: '0',
      value2: '12',
      value3: '0',
      value4: '0',
      value5: '0'
    },
    {
      category: '右侧平移点位',
      value1: '0',
      value2: '12',
      value3: '0',
      value4: '12',
      value5: '0'
    },
    {
      category: '左侧脱模点位',
      value1: '0',
      value2: '12',
      value3: '10',
      value4: '0',
      value5: '0'
    },
    {
      category: '右侧脱模点位',
      value1: '0',
      value2: '12',
      value3: '10',
      value4: '0',
      value5: '0'
    }
  ]
})

// 开关控制的数据数组
const controlData = reactive({
  data: [
    {
      name: '左侧振捣开关:',
      value: is_leftVibrate.value,
      loading: false
    },
    {
      name: '右侧振捣开关:',
      value: is_rightVibrate.value,
      loading: false
    },
    {
      name: '左侧模板开关:',
      value: is_leftTemplate.value,
      loading: false
    },
    {
      name: '右侧模板开关',
      value: is_rightTemplate.value,
      loading: false
    }
  ]
})

// 点击切换按钮的事件
const handle = () => {
  isActive.value = !isActive.value
}

// 点击控制开关触发的事件
const changeValve = async (index) => {
  controlData.data[index].loading = true
  // 控制开关
  setTimeout(() => {
    controlData.data[index].loading = false
  }, 3000)
}

// 获取图片展示
const getImg = () => {
  if (1) {
    return '/src/assets/img/equipImg/闲置中.png'
  } else {
    return '/src/assets/img/equipImg/养生中.png'
  }
}
</script>
<style scoped lang="less">
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(720deg);
  }
}
.card-template-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .label {
    font-size: 20px;
    width: 100%;
    text-align: center;
    margin: 0 auto;
    font-weight: 600;
    padding-top: 10px;
  }
  .left-wrapper {
    width: 40%;
    height: 80%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    .template-img {
      width: 100%;
      height: 60%;
      object-fit: contain;
      cursor: pointer;
    }
    .btn {
      width: 35%;
      height: 10%;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    .contarl-steam {
      background-color: var(--color-primary);
    }
    .switch-contral {
      background-color: var(--color-success);
    }
    .close {
      background-color: var(--color-danger);
    }
    .info {
      width: 100%;
      height: 20%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-wrap: wrap;
      .item {
        width: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
        p {
          flex: 1;
          margin-bottom: 0;
          padding: 0;
        }
        .label {
          font-size: 12px;
          text-align: left;
        }
        .value {
          font-size: 12px;
          text-align: left;
        }
      }
    }
  }
  .right-wrapper {
    width: 60%;
    height: 80%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    .switch-btn {
      position: absolute;
      right: 0;
      top: -15%;
      width: 30%;
      height: 10%;
      border-radius: 10px;
      background-color: var(--color-primary);
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      z-index: 2;
      margin-right: 20px;
      button {
        width: 45%;
        height: 80%;
        font-size: 16px;
        background-color: transparent;
        border-radius: 10px;
        border: none;
        cursor: pointer;
        color: var(--font-level-1);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .active {
        background-color: #fff;
        color: var(--font-level-12);
      }
    }
    .data {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      .label {
        width: auto;
        height: 12%;
        font-size: 16px;
        text-align: left;
        margin-bottom: 5%;
      }
    }
    .contral {
      width: 65%;
      height: 60%;
      position: absolute;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      box-shadow: 0 0 5px 0px rgba(0, 0, 0, 0.15);
      z-index: 3;
      .label {
        width: auto;
        height: 12%;
        font-size: 16px;
        text-align: left;
      }
      .btn-wrapper {
        width: 100%;
        height: 80%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        align-content: flex-start;
        flex-direction: column;
        .item {
          width: 100%;
          height: 20%;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;

          .label {
            width: auto;
            height: 100%;
            font-size: 16px;
            text-align: center;
            margin: 0;
            margin-right: 15%;
            display: flex;
            align-items: center;
            padding: 0;
          }
          .loading-wrapper {
            width: 70%;
            height: 100%;
            background-color: #00000029;
            position: absolute;
            .loading {
              width: 30px;
              height: 30px;
              display: flex;
              align-items: center;
              justify-content: center;
              position: absolute;
              right: 0%;
              top: 15%;
            }
            .active {
              animation: rotate 3s linear infinite;
            }
          }
        }
      }
    }
  }
}
</style>
