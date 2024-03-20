<!-- 劳务管理 隧道人员定位 -->
<template>
  <div class="labor-tunnel-wrapper">
    <LabelType1 :label="'隧道人员定位'" :eng="'Tunnel Labor'" />
    <div class="tunnel-label">下青山大型隧道左隧道工作区</div>
    <div class="card-wrapper">
      <div class="card" v-for="(item, index) in cardArr">
        <div class="label">{{ item.label }}</div>
        <div class="value" :class="`color${index + 1}`">
          {{ item.value }}
          <p class="unit">米</p>
        </div>
      </div>
    </div>
    <div class="tunnel-wrapper">
      <div class="tunnel">
        <div
          class="unit"
          v-for="(item, index) in tunnelData[0].data"
          :key="index"
          :style="{
            left: getPosition(item.x, item.y, item.type).left,
            top: getPosition(item.x, item.y, item.type).top
          }"
        >
          {{ item.type === 1 ? '人' : '车' }}
        </div>
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

const cardArr = [
  {
    label: '当前隧道长度',
    value: '1000'
  },
  {
    label: '当前隧道完工区',
    value: '500'
  },
  {
    label: '当前隧道作业区',
    value: '200'
  },
  {
    label: '当前隧道人数',
    value: '30'
  }
]

const getPosition = (x, y, type) => {
  const left = (x / tunnelData[0].length) * 100
  const top = (y / tunnelData[0].width) * 100
  return {
    left: left + '%',
    top: top + '%'
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

  .tunnel-label {
    width: 100%;
    height: 8%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    font-size: 32px;
    color: var(--font-level-13);
    margin-top: 20px;
  }
  .card-wrapper {
    width: 60%;
    height: 12%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 20px;
    .card {
      width: 200px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      border-radius: 15px;
      .label {
        width: 80%;
        height: 40%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 16px;
        color: var(--font-level-13);
      }
      .value {
        width: 100%;
        height: 60%;
        display: flex;
        justify-content: center;
        font-size: 24px;
        color: var(--font-level-13);
        display: flex;
        align-items: center;
        .unit {
          font-size: 16px;
          color: var(--font-level-13);
        }
      }
      .color1 {
        color: var(--color-primary);
      }
      .color2 {
        color: var(--color-success);
      }
      .color3 {
        color: var(--color-warning);
      }
      .color4 {
        color: var(--color-danger);
      }
    }
  }

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
      .unit {
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
