<!-- 有害气体二级路由左上角 最新数据 可以切换 -->
<template>
  <div class="gas-model-wrapper">
    <div class="select-wrapper">
      <el-select
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
      </el-select>
    </div>
    <div class="content-wrapper">
      <div class="item" :class="{danger:item.value>0}" v-for="(item, index) in equipGasStore.gasData.data" :key="index">
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
const areaArr = reactive([
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
])
// 获取store
const equipGasStore = useEquipGasStore()

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
    width: 20%;
    height: 10%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
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
      // animation: dangerColorChange 1s infinite;
    }
  }
}
</style>
