<!-- 有害气体二级路由左上角 最新数据 可以切换 -->
<template>
  <div class="gas-model-wrapper">
    <div class="select-wrapper">
      <!-- <el-select
        v-model="area"
        class="m-2"
        placeholder="选择区域"
        size="small"
        @change="equipGasStore.getGasData(area)"
      >
        <el-option
          v-for="item in areaArr"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        />
      </el-select> -->
      <div class="change-name">
        <button class="pre" @click="changeArea('pre')">上一区域</button>
        <p class="current-name">{{ areaArr.data[0].name }}</p>
        <button class="next" @click="changeArea('next')">下一区域</button>
      </div>
    </div>
    <div class="content-wrapper">
      <div
        class="item"
        :class="{ danger: item.value > 0 }"
        v-for="(item, index) in equipGasStore.gasData.data"
        :key="index"
      >
        <p class="label">{{ item.name }}</p>
        <p class="value">{{ item.value + (index === 3 ? ' %LEL' : ' ppm') }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { ref, onMounted, reactive } from 'vue'
import { useEquipGasStore } from '@renderer/stores/homeStore/equipStore/equipGas.js'

// 选择区域
const area = ref('')
// 区域数组
const areaArr = reactive({
  data: [
    {
      value: '进洞口右洞监测',
      name: '进洞口右洞监测'
    },
    {
      value: '出洞口左洞监测',
      name: '出洞口左洞监测'
    },
    {
      value: '出洞口右洞监测',
      name: '出洞口右洞监测'
    },
    {
      value: '进洞口左洞监测',
      name: '进洞口左洞监测'
    }
  ]
})
// 获取store
const equipGasStore = useEquipGasStore()

// 切换区域
const changeArea = (type) => {
  console.log(123, type)
  if (type == 'pre') {
    areaArr.data.push(areaArr.data.shift())
  } else {
    areaArr.data.unshift(areaArr.data.pop())
  }
  equipGasStore.getGasData(areaArr.data[0].value)
}

onMounted(() => {
  // 获取有害气体数据
  equipGasStore.getGasData()
})
</script>
<style scoped lang="less">
@keyframes dangerColorChange {
  0% {
    background-color: #fe4500; /* 开始颜色 */
  }
  50% {
    background-color: transparent; /* 中间颜色 */
  }
  100% {
    background-color: #fe4500; /* 结束颜色，和开始颜色相同实现循环 */
  }
}
.gas-model-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .select-wrapper {
    width: 100%;
    height: 10%;
    margin-left: 50px;
    .change-name {
      width: 60%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .pre,
      .next {
        width: 100px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--color-primary);
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        &:hover {
          background-color: var(--color-primary-hover);
        }
      }
      .current-name {
        width: 60%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--font-level-13);
        font-size: 14px;
        background-color: #fff;
        border: none;
        margin: 0 10px;
      }
    }
  }
  .content-wrapper {
    width: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    .item {
      width: 40%;
      height: 40%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: var(--color-success);
      margin: 10px 20px;
      border-radius: 15px;
      .label {
        font-size: 1.4em;
        font-weight: bold;
      }
      .value {
        font-size: 1em;
        font-weight: bold;
      }
    }
    .danger {
      animation: dangerColorChange 1s infinite;
    }
  }
}
</style>
