<!-- 制梁数据表格 -->
<template>
  <div class="table-wrapper">
    <div class="label-wrapper">
      <div
        class="label"
        v-for="(item, index) in formBeamStore.tableData.label"
        :style="{ width: formBeamStore.tableData.width[index] }"
        :key="index"
      >
        <p>
          {{ item.label }}
        </p>
      </div>
    </div>
    <div class="data-wrapper">
      <div
        class="data"
        v-for="(item, index) in formBeamStore.tableData.data.slice(0, 5)"
        :key="index"
        :style="{
          backgroundColor: index % 2 == 1 ? '#333546' : '',
          color: index % 2 == 1 ? '#fff' : ''
        }"
      >
        <div
          class="data1"
          :title="item.beam_name"
          :style="{ width: formBeamStore.tableData.width[0] }"
        >
          {{ item.beam_name }}
        </div>
        <div
          class="data2"
          :title="item.beam_type"
          :style="{ width: formBeamStore.tableData.width[1] }"
        >
          {{ item.beam_type }}
        </div>
        <div
          class="data3"
          :style="{
            width: formBeamStore.tableData.width[2]
          }"
        >
          {{ item.bind_start_time }}
        </div>
        <div
          class="data4"
          :style="{
            width: formBeamStore.tableData.width[3]
          }"
        >
          {{ item.steam_start_time }}
        </div>
        <div
          class="data5"
          :style="{
            width: formBeamStore.tableData.width[4]
          }"
        >
          {{ item.steam_end_time }}
        </div>
        <div
          class="data6"
          :style="{
            width: formBeamStore.tableData.width[5]
          }"
        >
          {{ item.grouting_end_time }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { onMounted, ref } from 'vue'
import { useFormBeamStore } from '@renderer/stores/homeStore/screenStore/formBeam'

const formBeamStore = useFormBeamStore()

onMounted(() => {
  formBeamStore.getTableData()
})
</script>
<style scoped lang="less">
.table-wrapper {
  width: 100%;
  height: 70%;
  padding-top: 1%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .label-wrapper {
    width: 95%;
    height: 10%;
    display: flex;
    flex-direction: row;
    padding-top: 3px;
    padding-bottom: 3px;
    color: var(--font-level-11);
    background-color: var(--color-primary);
    color: #333546;
    border-radius: 7px;
    .label {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      font-weight: 600;
    }
  }
  .data-wrapper {
    width: 95%;
    height: 90%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    color: var(--font-level-3);
    .data {
      width: 100%;
      display: flex;
      padding-top: 4px;
      padding-bottom: 5px;
      border-radius: 10px;
      div {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: center;
        font-size: 12px;
      }
    }
  }
}
</style>
