<!--数字大屏 -->
<template>
  <div class="screen-wrapper">
    <div class="beam-screen-wrapper">
      <div class="label">
        <BorderLineTitle class="title"></BorderLineTitle>
        <div class="change-screen"><span class="left"><el-icon><DArrowLeft /></el-icon></span> 切换大屏</div>
      </div>
      <Overview></Overview>
      <Video></Video>
      <Environment> </Environment>
      <News></News>
      <BeamData></BeamData>
      <ProductProgress></ProductProgress>
      <MixStation></MixStation>
      <productionLine></productionLine>
    </div>

  </div>
</template>

<script setup lang="js">
import { onMounted, ref } from 'vue'
import Overview from './components/Overview.vue'
import Video from './components/Video.vue'
import Environment from './components/Environment.vue'
import News from './components/News.vue'
import BeamData from './components/BeamData.vue'
import ProductProgress from './components/ProductProgress.vue'
import MixStation from './components/MixStation.vue'
import BorderLineTitle from './components/BorderLineTitle.vue'
import productionLine from './components/ProductionLine.vue'

</script>
<style scoped lang="less">
.screen-wrapper {
  width: 100%;
  height: 100%;
  position: relative;

  .beam-screen-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    .label {
      .title{
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 15px;
      }
      .fullscreen {
        position: absolute;
        right: 0;
        top: 0;
        margin-top: 10px;
        margin-right: 10px;
        background-color: transparent;
        border: none;
        outline: none;
        color: var(--screen-font-color);
        font-size: 20px;
        cursor: pointer;
      }
      .change-screen{
        width: 80px;
        position: absolute;
        right: -100px;
        top: 3%;
        background-color: transparent;
        color: var(--screen-font-color);
        font-size: .7em;
        cursor: pointer; 
        transition: all .5s ease-in-out;
        &:hover{
          right: -40px;
        }
        .left{
          font-size: 1em;
          position: absolute;
          left: -12px;
          line-height: 1.7em;
        }
      }
    }
  }
}
</style>
