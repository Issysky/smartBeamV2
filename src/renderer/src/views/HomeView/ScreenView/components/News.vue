<!-- 大屏时事新闻组件 -->
<template>
  <div class="news-wrapper" :style="{ right: show ? '2%' : '-40%' }">
    <Line :width="'80%'" :label="'时事新闻'"></Line>
    <ul class="news" ref="news">
      <li
        ref="li"
        v-for="(item, index) in newsData.data"
        :key="index"
        @click="goToWebsite(item.link)"
      >
        <div class="label">
          <p class="title">{{ item.title }}</p>
          <p class="time">{{ item.time }}</p>
        </div>
        <div class="content">
          <p class="memo">{{ item.memo }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="js">
import { ref, onMounted, onBeforeMount, reactive, onUnmounted } from 'vue'
import Line from './Line.vue'
import { useScreenStore } from '@renderer/stores/homeStore/screenStore/screen.js'

const screenStore = useScreenStore()
// 定义新闻数据从接口获取
const newsData = reactive({
  data: []
})
// 卡片是否展示
let show = ref(false)
// 点击跳转到新的网站
const goToWebsite = (url) => {
  window.topBar.openExternal('https://' + url)
}

const li = ref(null)

// 定义定时器,挂载时启动,卸载时清除
let timer = null
// 无限轮播新闻
const scrollNews = () => {
  timer = setInterval(() => {
    Array.from(li.value).forEach((item) => {
      item.style.transition = 'all .5s'
      item.style.transform = 'translateY(-100%)'
    })
    setTimeout(() => {
      newsData.data.push(newsData.data.shift())
      Array.from(li.value).forEach((item) => {
        item.style.transition = 'none'
        item.style.transform = 'translateY(0%)'
      })
    }, 500)
  }, 3000)
}
onMounted(async () => {
  setTimeout(() => {
    show.value = true
  }, 100)
  newsData.data = await screenStore.getNewsData()
  scrollNews()
})
onUnmounted(() => {
  clearInterval(timer)
  timer = null
})
</script>
<style scoped lang="less">
.news-wrapper {
  width: 23%;
  height: 22%;
  position: absolute;
  top: 72%;
  right: 2%;
  padding-top: 1%;
  background-color: var(--screen-card-color);
  box-shadow: var(--screen-card-shadow);
  color: var(--screen-font-color);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  transition: var(--screen-card-transition);

  .news {
    width: 85%;
    height: 140px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    list-style: none;
    overflow: hidden;
    margin: 0;
    margin-left: 30px;
    padding: 0 0 5% 0;

    li {
      width: 100%;
      padding-top: 10px;
      padding-bottom: 5px;
      border-bottom: 1px solid #000;
      position: relative;
      transition: all 0.5s;
      &:hover {
        cursor: pointer;
      }
      p {
        margin: 0;
      }
      .label {
        width: 100%;
        height: 20px;
        font-size: 14px;
        font-weight: 600;
        display: flex;
        align-items: center;
        color: var(--font-level-2);
        .title {
          width: 65%;
          height: 20px;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-right: 10%;
        }
        .time {
          width: 25%;
          font-size: 12px;
          margin-top: 5px;
          line-height: 2;
        }
      }
      .content {
        width: 70%;
        font-size: 10px;
        .memo {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          color: var(--font-level-3);
        }
      }
    }
  }
}
</style>
