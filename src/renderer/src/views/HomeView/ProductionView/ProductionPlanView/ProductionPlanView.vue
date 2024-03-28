<!-- 三级路由梁体计划排程 出现在生产数据二级路由下 -->
<template>
  <div class="production-plan-wrapper">
    <LabelType1 :label="'梁体计划排程'" :eng="'Beam Plan'"></LabelType1>
    <div class="content">
      <!-- 月度计划 -->
      <div class="left">
        <!-- 月度计划`展示 -->
        <div class="month-plan">
          <!-- 计划完成 -->
          <div class="uncomplated wrapper">
            <p class="label">本月计划生产:</p>
            <div class="content-wrapper">
              <p class="value">
                <span>{{ productionPlanStore.curMonthPlaned }}</span
                >片
              </p>
            </div>
          </div>
          <!-- 已经完成 -->
          <div class="complated wrapper">
            <p class="label">本月已生产:</p>
            <div class="content-wrapper">
              <p class="value"><span>7</span>片</p>
            </div>
          </div>
          <!-- 完成率 -->
          <div class="complated-rat wrapper">
            <p class="label">完成率:</p>
            <div class="content-wrapper">
              <p class="value"><span>22.5</span>%</p>
            </div>
          </div>
        </div>
        <div class="calender">
          <Calendar></Calendar>
        </div>
        <CardType2 v-if="productionPlanStore.isShow"></CardType2>
      </div>
      <div class="right">
        <ChartYear></ChartYear>
        <ChartMonth></ChartMonth>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import Calendar from './components/Calendar.vue'
import CardType2 from './components/CardType2.vue'
import { useProductionPlanStore } from '@renderer/stores/homeStore/productionStore/production_plan'
import ChartYear from './components/ChartYear.vue'
import ChartMonth from './components/ChartMonth.vue'
import { onMounted } from 'vue'
import LabelType1 from '@renderer/components/LabelType1.vue'

const productionPlanStore = useProductionPlanStore()

onMounted(() => {
  productionPlanStore.getCurMonthPlaned('2024-01')
})
</script>
<style scoped lang="less">
.production-plan-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  .top {
    width: 100%;
    height: 8%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 3%;
  }
  .content {
    width: 100%;
    height: 92%;
    display: flex;
    justify-content: center;
    align-items: center;
    .left {
      width: 45%;
      height: 90%;
      padding-left: 3%;
      margin-right: 60px;
      .month-plan {
        width: 100%;
        height: 100px;
        border-radius: 10px;
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .wrapper {
          width: 23%;
          height: 70%;
          padding: 10px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-direction: column;
          box-shadow: 7px 7px 14px #00000029;
          border-radius: 15px;
          background-color: #fff;
          .label {
            width: 100%;
            font-size: 0.8em;
            font-weight: 600;
            color: #000;
            text-align: left;
            display: flex;
            align-items: center;
          }
          .content-wrapper {
            width: 80%;
            display: flex;
            align-items: center;
            justify-content: center;
            .value {
              width: 50%;
              font-size: 0.8em;
              font-weight: 600;
              color: var(--color-warning);
              text-align: center;
              span {
                font-size: 28px;
                font-weight: 600;
                margin-right: 5px;
              }
            }
          }
        }
        .uncomplated {
          justify-content: space-between;
          align-items: center;
          flex-direction: column;
          .content-wrapper {
            .value {
              color: var(--color-warning);
            }
          }
        }
        .complated {
          justify-content: space-between;
          align-items: center;
          flex-direction: column;
          .content-wrapper {
            .value {
              color: var(--color-success);
            }
          }
        }
        .complated-rat {
          justify-content: space-between;
          align-items: center;
          flex-direction: column;
          .content-wrapper {
            .value {
              color: var(--color-danger);
            }
          }
        }
      }
      .calender {
        width: 95%;
        height: 80%;
        box-shadow: 7px 7px 14px #00000029;
        border-radius: 15px;
        background-color: #fff;
        padding: 20px;
      }
    }
    .right {
      width: 45%;
      height: 92%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-radius: 15px;
    }
  }
}
</style>
