<!-- 三级路由蒸养棚设置页面 -->
<template>
  <div class="set-equip-steam-wrapper">
    <div class="steam-wrapper">
      <div
        class="steam-item"
        v-for="(item, index) in settingEquipSteamStore.steamList.data"
        :key="item.id"
      >
        <SteamItem :steamItemData="{ ...item, index: index }" />
      </div>
    </div>
    <button class="add" @click="addNewEquip">添加新设备</button>
  </div>
</template>

<script setup lang="js">
import { onMounted, ref } from 'vue'
import { useSettingEquipSteamStore } from '@renderer/stores/homeStore/settingMenuStore/settingEquipSteam'
import SteamItem from './components/SteamItem.vue'

// 使用蒸养棚设置store
const settingEquipSteamStore = useSettingEquipSteamStore()

// 添加新设备
const addNewEquip = () => {
  settingEquipSteamStore.addSteam()
}

onMounted(() => {
  settingEquipSteamStore.getSteamList()
})
</script>
<style scoped lang="less">
.set-equip-steam-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  position: relative;
  .label {
    width: 80%;
    font-size: 20px;
    margin-top: 20px;
  }
  .steam-wrapper {
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    overflow-y: auto;
    overflow-x: hidden;
    .steam-item {
      width: 100%;
      height: 40%;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      align-content: flex-start;
      justify-content: space-around;
      border-bottom: 1px solid #33333377;
    }
  }
  .add{
    width: 90px;
    height: 30px;
    border-radius: 5px;
    border: none;
    background-color: var(--color-primary);
    position: absolute;
    bottom: 5px;
    right: 5px;
    cursor: pointer;
    color: var(--font-level-1);
    &:hover{
      background-color: var(--color-primary-hover);
    }
  }
}
</style>
