<!-- 劳务管理 隧道人员定位 -->
<template>
  <div class="labor-tunnel-wrapper">
    <LabelType1 :label="'隧道人员定位'" :eng="'Tunnel Labor'" />
    <div class="tunnel-wrapper">
      <div class="tunnel">
        <div
          class="unit"
          v-for="(item, index) in tunnelData[0].data"
          :key="index"
          :style="{
            left: getPosition(item.x, item.y,item.type).left,
            top: getPosition(item.x, item.y,item.type).top,
          }"
        >{{ item.type===1?'人':'车' }}</div>
        <div
          class="complated"
          :style="{
            width: `${(tunnelData[0].finish_length / tunnelData[0].length) * 100}%`
          }"
        ></div>
        <div
          class="construction"
          :style="{
            width: `${(tunnelData[0].work_length / tunnelData[0].length) * 100}%`
          }"
        ></div>
        <div
          class="unstart"
          :style="{
            flex: 1
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import LabelType1 from '@renderer/components/LabelType1.vue'

const tunnelData = [
  {
    name: '长白山隧道',
    length: 1000,
    finish_length: 500,
    work_length: 200,
    width: 100,
    count: 30,
    data: [
      {
        name: '张三',
        x: 100,
        y: 23,
        type: 1
      },
      {
        name: '李四',
        x: 200,
        y: 28,
        type: 2
      },
      {
        name: '王五',
        x: 300,
        y: 45,
        type: 1
      }
    ]
  }
]

const getPosition = (x, y,type) => {
   const left = x/tunnelData[0].length * 100
   const top = y/tunnelData[0].width* 100
  return {
    left:left+'%',
    top: top+'%'
  }
}
</script>
<style scoped lang="less">
.labor-tunnel-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  .tunnel-wrapper {
    width: 100%;
    height: 90%;
    display: flex;
    justify-content: center;
    .tunnel {
      width: 80%;
      height: 30%;
      position: relative;
      display: flex;
      .unit{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        background-color: var(--color-danger);
      }
      .complated {
        height: 100%;
        background-color: var(--color-success);
      }
      .construction {
        height: 100%;
        background-color: var(--color-warning);
      }
      .unstart {
        height: 100%;
        background-color: var(--color-info);
      }
    }
  }
}
</style>
