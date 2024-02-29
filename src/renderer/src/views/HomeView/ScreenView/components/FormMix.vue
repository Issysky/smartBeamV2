<!-- 拌合站数据表格 -->
<template>
  <div class="table-wrapper">
    <div class="label-wrapper">
      <div
        class="label"
        v-for="(item, index) in formMixStore.tableData.label"
        :style="{ width: formMixStore.tableData.width[index] }"
        :key="index"
        
      >
        {{ item.label }}
      </div>
    </div>
    <div class="data-wrapper">
      <!-- 只取出前六条数据 -->
      <div
        class="data"
        v-for="(item, index) in formMixStore.tableData.data.slice(0, 5)"
        :key="index"
        :style="{ backgroundColor: index % 2 == 1 ? '#333546' : '',color:index%2==1?'#fff':'' }"
      >
        <div class="data1" :title="item.TaskId" :style="{ width: formMixStore.tableData.width[0] }">
          {{ item.TaskId }}
        </div>
        <div
          class="data2"
          :title="item.PouringPosition"
          :style="{ width: formMixStore.tableData.width[1] }"
        >
          {{ item.PouringPosition }}
        </div>
        <div
          class="data3"
          :style="{
            color: getExcessData(item.ExcessGrade).color,
            width: formMixStore.tableData.width[2],
            backgroundImage: getExcessData(item.ExcessGrade).img?`url(${getExcessData(item.ExcessGrade).img})`:'' ,
          }"
        >
          {{ getExcessData(item.ExcessGrade).text?getExcessData(item.ExcessGrade).text:'' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { onMounted, ref } from 'vue'
import { useFormMixStore } from '@renderer/stores/homeStore/screenStore/formMix'

const formMixStore = useFormMixStore()

const getExcessData = (data) => {
  if (data === 0) {
    return {
      // text:'不超标',
      img:'/src/assets/img/screenImg/无.png'
    }
  } else if (data === 1) {
    return {
      img:'/src/assets/img/screenImg/数字1.png'
    }
  } else if (data === 2) {
    return {
      img:'/src/assets/img/screenImg/数字2.png'
    }
  }else if (data === 3) {
    return {
      color: '#F56C6C',
      img:'/src/assets/img/screenImg/数字3.png'
    }
  }
  return {
    color: '#67C23A',
    text: '无超标'
  }
}

onMounted(() => {
  formMixStore.getTableData()
})
</script>
<style scoped lang="less">
.table-wrapper {
  width: 90%;
  height: 100%;
  padding-left: 30px;
  color:var(--screen-font-color);
  .label-wrapper {
    width: 95%;
    height: 13%;
    display: flex;
    flex-direction: row;
    margin-bottom: 2%;
    color: var(--font-level-11);
    background-color: var(--color-warning);
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
    .data {
      width: 100%;
      display: flex;
      padding-bottom: 3px;
      padding-top: 3px;
      margin-bottom: 5px;
      color: var(--font-level-3);
      border-radius: 10px;
      div {
        font-size: 12px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: center;
      }
      .data1 {
        cursor:default;
      }
      .data2 {
        cursor:default;
      }
      .data3 {
        height: 20px;
        text-align: center;
        background-repeat:no-repeat ;
        background-size:contain ;
        background-position:center;
        // background-color: #88ffc3;
      }
    }
  }
}
</style>
