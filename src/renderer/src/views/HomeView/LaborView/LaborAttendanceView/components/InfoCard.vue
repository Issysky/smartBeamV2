<!-- 考勤数据左上角信息卡片 -->
<template>
  <div class="info-card-wrapper">
    <p class="label">当前人员</p>
    <div class="card">
      <div class="img"><img src="@renderer/assets/img/logo/people.png" alt="" /></div>
      <div class="info">
        <div class="item" v-for="item in arr">
          <p class="name">{{ item.label }}</p>
          <p class="text">{{ item.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { ref } from 'vue'

const arr = [
    {
        label:'姓名:',
        text:'李建国'
    },
    {
        label:'班组名称:',
        text:'管理人员'
    },
    {
        label:'通过设备:',
        text:'隧道左洞'
    },
    {
        label:'入场时间:',
        text:'2021-10-10 10:10:10'
    }
]
</script>
<style scoped lang="less">
.info-card-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .label {
    width: 90%;
    height: 30px;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .card {
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: center;
    .img {
      width: 40%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      img {
        width: 100px;
        height: 100px;
      }
    }
    .info {
      width: 50%;
      height: 50%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      .item{
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 14px;
        background-color: var(--color-info);
        color: var(--font-level-1);
        border-radius: 15px;
        margin-bottom: 10px;
        padding-left: 10px;
      }
    }
  }
}
</style>
