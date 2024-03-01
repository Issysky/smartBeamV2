<!-- 三极路由模板设置页面 -->
<template>
<div class="set-equip-template-wrapper">
    <div class="template-wrapper">
      <div
        class="template-item"
        v-for="(item, index) in settingEquipTemplateStore.templateList.data"
        :key="item.id"
      >
        <TemplateItem :templateItemData="{ ...item, index: index }" />
      </div>
    </div>
    <button class="add" @click="addNewEquip">添加新设备</button>
</div>
</template>

<script setup lang="js">
import { useSettingEquipTemplateStore } from '@renderer/stores/homeStore/settingMenuStore/settingEquipTemplate';
import TemplateItem from './components/TemplateItem.vue';

const settingEquipTemplateStore = useSettingEquipTemplateStore()

const addNewEquip = () => {
  settingEquipTemplateStore.addTemplate()
}
</script>
<style scoped lang="less">
.set-equip-template-wrapper {
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
  .template-wrapper {
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    overflow-y: auto;
    overflow-x: hidden;
    .template-item {
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