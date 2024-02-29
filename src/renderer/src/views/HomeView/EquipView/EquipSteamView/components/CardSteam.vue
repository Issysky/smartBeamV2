<!-- 蒸养卡片 出现在三极路由蒸养棚中 -->
<template>
  <div class="card">
    <!-- 标题 -->
    <p class="label">{{ steamData.showName }}</p>
    <!-- 左侧区域 -->
    <div class="left-wrapper">
      <img class="door-img" :src="getImg()" alt="蒸养棚" />
      <button class="contarl-steam btn" @click="showMonitor()" v-if="steamData.is_monitor">
        视频监控
      </button>
      <button class="switch-contral btn" @click="handle()" :class="{close:!isActive}">{{isActive?'设备控制':'关闭弹窗'}}</button>
      <!-- 数据展示 -->
      <div class="info">
        <div class="item">
          <p class="label">实时温度:</p>
          <p class="value">{{ getTem() + '℃' }}</p>
        </div>
        <div class="item">
          <p class="label">实时湿度:</p>
          <p class="value">{{ getHum() + '%' }}</p>
        </div>
        <div class="item">
          <p class="label">蒸汽阀:</p>
          <p class="value">{{ getSteamValve() }}</p>
        </div>
        <div class="item">
          <p class="label">水阀:</p>
          <p class="value">{{ getWaterValve() }}</p>
        </div>
      </div>
    </div>
    <!-- 右侧区域 -->
    <div class="right-wrapper">
      <!-- 温湿度曲线展示 -->
      <div class="data">
        <p class="label">温湿度曲线</p>
        <div class="chart">
          <ChartTemHum :index="steamData.index" :name="steamData.name" />
        </div>
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
import { useEquipSteamStore } from '@renderer/stores/homeStore/equipStore/equipSteam.js'
import { useMonitorStore } from '@renderer/stores/homeStore/equipStore/monitor.js'
import { useSettingEquipSteamStore } from '@renderer/stores/homeStore/settingMenuStore/settingEquipSteam.js'
import ChartTemHum from './ChartTemHum.vue'
import * as echarts from 'echarts'

//定义时间范围
const timeRange = ref('')
//  引入store
const equipSteamStore = useEquipSteamStore()
const monitorStore = useMonitorStore()
const settingEquipSteamStore = useSettingEquipSteamStore()

// props
const props = defineProps(['steamData'])
// 定义isActive,控制按钮的样式
const isActive = ref(true)
// 蒸汽阀开关
const is_steamValve = ref(false)
// 水阀开关
const is_waterValve = ref(false)
// 前门开关
const is_frontDoor = ref(false)
// 后门开关
const is_backDoor = ref(false)

// 开关控制的数据数组
const controlData = reactive({
  data: [
    {
      name: '蒸汽开关:',
      value: is_steamValve,
      loading: false
    },
    {
      name: '水阀开关:',
      value: is_waterValve,
      loading: false
    },
    {
      name: '前卷帘门:',
      value: is_frontDoor,
      loading: false
    },
    {
      name: '后卷帘门:',
      value: is_backDoor,
      loading: false
    }
  ]
})

// 定义图表dom
const chart = ref(null)
// 定义图表dom
let myChart
//定义接口返回数据
let apiSteamData = reactive({
  data: {}
})

// 点击切换按钮的事件
const handle = () => {
  isActive.value = !isActive.value
}
// 展示监控
const showMonitor = () => {
  monitorStore.showMonitor()
}
// 获取图片展示
const getImg = () => {
  if (!apiSteamData.data[0]) return 0
  if (apiSteamData.data[0].door[0] === 0) {
    return '/src/assets/img/equipImg/闲置中.png'
  } else {
    return '/src/assets/img/equipImg/养生中.png'
  }
}
// 获取温度
const getTem = () => {
  if (!apiSteamData.data[0]) return 0
  let tem = 0
  apiSteamData.data[0].tem.forEach((item, index) => {
    tem += item
  })
  return (tem / (apiSteamData.data[0].tem.length + 1)).toFixed(1)
}
// 获取湿度
const getHum = () => {
  if (!apiSteamData.data[0]) return 0
  let hum = 0
  apiSteamData.data[0].hum.forEach((item, index) => {
    hum += item
  })
  return (hum / (apiSteamData.data[0].hum.length + 1)).toFixed(1)
}
// 获取蒸汽阀状态
const getSteamValve = () => {
  if (!apiSteamData.data[0]) return 0
  return apiSteamData.data[0].steamValve > 0 ? '开启' : '关闭'
}
// 获取水阀状态
const getWaterValve = () => {
  if (!apiSteamData.data[0]) return 0
  return apiSteamData.data[0].waterValve > 0 ? '开启' : '关闭'
}

// 点击控制开关触发的事件
const changeValve = async (index) => {
  controlData.data[index].loading = true
  // 控制开关
  setTimeout(() => {
    controlData.data[index].loading = false
  }, 3000)
}
onMounted(async () => {
  const requestData = {
    name: props.steamData.name,
    is_latest: true
  }
  // 获取api数据
  apiSteamData.data = await equipSteamStore.getEquipSteamData(requestData)
  console.log(apiSteamData.data[0], 'apiSteamData.data')
})
</script>
<style scoped lang="less">
// 旋转动画
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(720deg);
  }
}
.card {
  width: 44%;
  height: 45%;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 1% 3%;
  box-shadow: 0 0 7px 0px rgba(0, 0, 0, 0.15);

  .label {
    font-size: 20px;
    width: 100%;
    text-align: center;
    margin: 0 auto;
    font-weight: 600;
    padding-top:10px;
  }
  .left-wrapper {
    width: 40%;
    height: 80%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    .door-img {
      width: 100%;
      height: 60%;
      object-fit: contain;
      cursor: pointer;
    }
    .btn{
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
      background-color:var(--color-success);
    } 
    .close{
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
      .chart {
        width: 100%;
        height: 100%;
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
