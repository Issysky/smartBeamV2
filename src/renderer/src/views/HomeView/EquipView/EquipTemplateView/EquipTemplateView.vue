<!-- 三级路由 模板页面 从属于二级路由设备数据 -->
<template>
  <div class="equip-template-wrapper">
    <LabelType1 :label="'模板'" :eng="'Template'"> </LabelType1>
    <div class="card-wrapper">
      <div
        class="card"
        v-for="(item, index) in settingEquipTemplateStore.templateList.data"
        :key="item.id"
      >
        <CardTemplate :templateData="{ ...item, index: index }" />
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { onMounted } from 'vue'
import LabelType1 from '@renderer/components/LabelType1.vue'
import CardTemplate from './components/CardTemplate.vue'
import { useSettingEquipTemplateStore } from '@renderer/stores/homeStore/settingMenuStore/settingEquipTemplate'

const settingEquipTemplateStore = useSettingEquipTemplateStore()

onMounted(() => {
  // 获取模板列表
  settingEquipTemplateStore.getTemplateList()
})
</script>
<style scoped lang="less">
.equip-template-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .card-wrapper {
    width: 100%;
    height: 84%;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: flex-start;
    overflow-y: auto;
    .card {
      width: 44%;
      height: 45%;
      border-radius: 10px;
      margin: 1% 3%;
      box-shadow: 0 0 7px 0px rgba(0, 0, 0, 0.15);
    }
  }
}
</style>
