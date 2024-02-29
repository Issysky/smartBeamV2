<!-- 卡片弹窗组件2 出现在生产计划 -->
<template>
  <div class="plan-card-wrapper">
    <!-- 遮罩 -->
    <div class="mask"></div>
    <div class="card">
      <button class="close" @click="closeCard()">X</button>
      <!-- 卡片内容区 -->
      <div class="content">
        <!-- 左侧区域 已有计划 可删除 -->
        <div class="left">
          <p class="label">已有计划</p>
          <ul>
            <li
              class="planed"
              v-for="(item, index) in productionPlanStore.planedList.data?.results"
              :key="index"
            >
              <p>{{ item.beam_name }}</p>
              <!-- 删除数据 -->
              <div @click="deletePlan(item.id)">
                <el-icon><CircleCloseFilled /></el-icon>
              </div>
            </li>
          </ul>
        </div>
        <!-- 右侧区域 -->
        <div class="right">
          <p class="label">新增计划</p>

          <div class="top">
            <ul>
              <li
                v-for="(value, key, index) in productionPlanStore.planedList.data.rest_beam"
                :key="index"
                :class="{ active: active[index].active }"
                @click="changeActive(index, key)"
              >
                {{ key }}
              </li>
            </ul>
          </div>
          <div class="bottom">
            <div class="checkbox-wrapper">
              <el-checkbox
                v-for="item in planList.value"
                :key="item.id"
                :label="item.name"
                size="large"
                @click="handleAddPlanList(item.id)"
                border
              />
            </div>
            <el-button type="info" @click="addPlan()">提交</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import axios from 'axios'
import { onMounted, reactive } from 'vue'
import { useProductionPlanStore } from '@renderer/stores/homeStore/productionStore/production_plan'
import { ref } from 'vue'

// 定义生产计划store
const productionPlanStore = useProductionPlanStore()

// 定义计划卡片左侧导航
const active = ref([
  {
    active: false,
    name: ''
  },
  { active: false, name: '' }
])
// 定义可添加计划列表
const planList = reactive([])
// 定义即将添加计划列表
const addPlanList = ref([])

// 删除计划
const deletePlan = (id) => {
  productionPlanStore.delPlanedList(id)
  // 重新获取可添加计划列表
  setTimeout(() => {
    handlePlanList()
    // 重新获取已有计划列表
    addPlanList.value = []
  }, 500)
  console.log('删除计划')
}
// 点击按钮切换状态
const changeActive = (index, name) => {
  active.value[index].active = !active.value[index].active
  active.value[index].name = active.value[index].active ? name : ''
  handlePlanList()
}
// 处理可添加计划数据
const handlePlanList = () => {
  let arr = []
  let i = 0
  for (let key in productionPlanStore.planedList.data.rest_beam) {
    if (active.value[i].name === key) {
      arr.push(...productionPlanStore.planedList.data.rest_beam[key])
    }
    i++
  }
  planList.value = arr
}
//修改即将添加数组
const handleAddPlanList = (id) => {
  if (!addPlanList.value.includes(id)) {
    addPlanList.value.push(id)
  } else {
    addPlanList.value.splice(addPlanList.value.indexOf(id), 1)
  }
}
// 添加计划方法
const addPlan = async () => {
  // 先把计划添加进已有计划列表
  addPlanList.value.forEach((item, index) => {
    const data = {
      time: productionPlanStore.time,
      beam_code: item
    }
    // 发请求
    productionPlanStore.addPlanedList(data)
  })
  // 重新获取可添加计划列表
  setTimeout(() => {
    handlePlanList()
    // 重新获取已有计划列表
    addPlanList.value = []
  }, 500)
}

// 关闭卡片
const closeCard = () => {
  productionPlanStore.changeShow(false)
  addPlan()
}
onMounted(() => {
  productionPlanStore.getPlanedList()
  // productionPlanStore.planedList.data.rest_beam = productionPlanStore.planedList.value.rest_beam
})
</script>
<style scoped lang="less">
.plan-card-wrapper {
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  position: absolute;
  z-index: 100;
  .mask {
    width: 100%;
    height: 100%;
    backdrop-filter: blur(10px); /* 添加毛玻璃效果 */
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
  .card {
    width: 800px;
    height: 500px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 20px;
    padding: 20px;
    box-shadow: 7px 7px 10px #00000044;
    .close {
      width: 30px;
      height: 30px;
      position: absolute;
      right: 10px;
      cursor: pointer;
      border: none;
      color: red;
      background-color: transparent;
    }
    .content {
      width: 100%;
      height: 100%;
      display: flex;
      .left {
        width: 40%;
        height: 100%;
        padding-right: 2%;
        .label {
          width: 110%;
          font-size: 24px;
          margin-bottom: 10px;
          border-bottom: 1px solid #333;
          padding-bottom: 10px;
          font-weight: 600;
        }
        ul {
          height: 90%;
          list-style: none;
          padding: 0;
          margin: 0;
          overflow-y: auto;
          overflow-x: hidden;
          .planed {
            width: 300px;
            height: 35px;
            color: #fff;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: var(--color-primary);
            border-radius: 10px;
            margin-bottom: 8px;
            box-shadow: 2px 2px 4px #00000044;
            p {
              width: 80%;
              text-align: left;
              padding-left: 10px;
              font-size: 14px;
            }
            div {
              width: 40px;
              height: 40px;
              line-height: 48px;
              text-align: center;
              color: #fe4500dd;
              font-size: 20px;
              cursor: pointer;
              transition: all 0.3s;
              padding-right: 10px;
              &:hover {
                font-size: 14px;
              }
            }
          }
        }
      }
      .right {
        flex: 1;
        height: 100%;
        .label {
          width: 90%;
          font-size: 24px;
          margin-bottom: 10px;
          border-bottom: 1px solid #333;
          padding-bottom: 10px;
          font-weight: 600;

        }
        .top {
          width: 100%;
          height: 8%;

          ul {
            list-style: none;
            padding: 0;
            margin: 0;
            display: flex;
            li {
              width: auto;
              height: 35px;
              text-align: center;
              line-height: 35px;
              cursor: pointer;
              color: var(--font-level-1);
              font-size: 16px;
              background-color: var(--color-info);
              border-radius: 10px;
              padding: 0 10px;
              margin-right: 10px;
            }
            .active {
              background-color: var(--color-primary);
              color: #fff;
            }
          }
        }
        .bottom {
          width: 90%;
          height: 82%;
          padding: 10px;
          display: flex;
          flex-wrap: wrap;
          align-content: flex-start;
          .checkbox-wrapper {
            width: 100%;
            height: 90%;
            overflow-y: auto;
            overflow-x: hidden;
            margin-bottom: 12px;
            .el-checkbox {
              width: 100%;
            }
          }
          button {
            width: 60px;
            height: 20px;
          }
        }
      }
    }
  }
}
</style>
