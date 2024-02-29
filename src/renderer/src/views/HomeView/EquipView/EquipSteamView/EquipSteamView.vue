<!-- 三级路由 蒸养棚 从属于设备管理二级路由-->
<template>
  <div class="equip-steam-wrapper">
    <LabelType1 :label="'蒸养棚'" :eng="'Steam'"> </LabelType1>
    <Monitor v-if="monitorStore.isShow" />
    <!-- 日期时间选择器 -->
    <div class="date-wrapper">
      <div class="block">
        <el-date-picker
          v-model="timeRange"
          type="datetimerange"
          start-placeholder="开始时间"
          end-placeholder="截止时间"
          format="YYYY-MM-DD HH:mm:ss"
          date-format="YYYY/MM/DD ddd"
          time-format="A hh:mm:ss"
          value-format="YYYY-MM-DD HH:mm:ss"
          editable="false"
          @change="handle"
        />
      </div>
      <button class="btn">查询</button>
      <button class="btn">重置</button>
    </div>

    <!--卡片区域  -->
    <div class="card-wrapper">
      <CardSteam
        v-for="(item, index) in settingEquipSteamStore.steamList.data"
        :key="item.id"
        :steamData="{ ...item, index: index }"
      />
    </div>
  </div>
</template>

<script setup lang="js">
import { onMounted, ref } from 'vue'
import { useEquipSteamStore } from '@renderer/stores/homeStore/equipStore/equipSteam.js'
import { useSettingEquipSteamStore } from '@renderer/stores/homeStore/settingMenuStore/settingEquipSteam.js'
import LabelType1 from '@renderer/components/LabelType1.vue'
import Monitor from '@renderer/components/Monitor.vue'
import { useMonitorStore } from '@renderer/stores/homeStore/equipStore/monitor.js'
import CardSteam from './components/CardSteam.vue'

//定义时间范围
const timeRange = ref('')

//  引入store
const equipSteamStore = useEquipSteamStore()
const settingEquipSteamStore = useSettingEquipSteamStore()
const monitorStore = useMonitorStore()
// 定义isActive,控制按钮的样式
const isActive = ref(true)

const handle = () => {}
onMounted(() => {
  // console.log(equipSteamStore.equipSteamData, 'equipStore.equipSteamData')
  // 获取蒸养棚设备列表
  settingEquipSteamStore.getSteamList()
})
</script>
<style scoped lang="less">
.equip-steam-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  .date-wrapper {
    width: 100%;
    height: 3%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 5%;
    .block {
      width: 30%;
      height: auto;
      display: flex;
      justify-content: flex-end;
    }
    .btn {
      width: 6%;
      height: 100%;
      margin-left: 2%;
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

  .card-wrapper {
    width: 100%;
    height: 84%;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: flex-start;
    overflow-y: auto;
  }
}
</style>
