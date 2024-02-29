<!-- 日历组件 -->
<template>
  <div>
    <FullCalendar ref="fullCalendar" :options="calendarOptions" />
  </div>
</template>

<script setup lang="js">
import { onMounted, reactive, ref, watch } from 'vue'
// import '@fullcalendar/core/vdom'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useProductionPlanStore } from '@renderer/stores/homeStore/productionStore/production_plan'
import { useRouter } from 'vue-router'

const productionPlanStore = useProductionPlanStore()

const fullCalendar = ref(null)
let calendarApi

// 日期点击事件
const handleDateClick = (arg) => {
  productionPlanStore.changeTime(arg.dateStr)
  productionPlanStore.changeShow(true)
}
const handleEventClick = (arg) => {
  productionPlanStore.changeTime(arg.event.startStr)
  productionPlanStore.changeShow(true)
}
const calendarOptions = reactive({
  plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin], // 需要用哪个插件引入后放到这个数组里
  height: 600, //日历高度
  initialDate: new Date('2024-01-01'), // 日历第一次加载时显示的初始日期。可以解析为Date的任何职包括ISO8601日期字符串，例如"2014-02-01"。
  initialView: 'dayGridMonth',
  // editable: true,
  locale: 'zh-cn', // 设置日历的语言，中文为 “zh-cn”
  firstDay: '1', // 设置每周的第一天，默认值取决于当前语言环境，该值为代表星期几的数字，且值必须为整数，星期日=0
  buttonText: {
    // 文本将显示在headerToolbar / footerToolbar的按钮上。不支持HTML注入。所有特殊字符将被转义。
    today: '今',
    month: '月',
    week: '周',
    day: '天'
  },
  headerToolbar: {
    // 在日历顶部定义按钮和标题。将headerToolbar选项设置为false不会显示任何标题工具栏。可以为对象提供属性start/center/end或left/center/right。这些属性包含带有逗号/空格分隔值的字符串。用逗号分隔的值将相邻显示。用空格分隔的值之间会显示一个很小的间隙。
    right: 'today prev,next',
    center: 'title',
    left: ''
  },
  events: [...productionPlanStore.calenderPlan.events],
  dateClick: handleDateClick,
  eventClick: handleEventClick
  // weekends: false
})

watch(
  productionPlanStore.calenderPlan,
  (newVal) => {
    console.log('重新渲染')

    calendarApi.setOption('events', productionPlanStore.calenderPlan.events)
  },
  { deep: true }
)

onMounted(() => {
  const router = useRouter()
  setTimeout(async () => {
    productionPlanStore.getCalenderPlan()
    calendarApi = fullCalendar.value.getApi()
    await productionPlanStore.getCalenderPlan().then((res) => {
      productionPlanStore.calenderPlan.events = res
    })
    calendarApi.setOption('events', productionPlanStore.calenderPlan.events)
  }, 500)
})
</script>

<style scoped lang="less">
div {
  width: 100%;
  font-size: 12px;
  height: 80%;
  .fc-h-event .fc-event-title-container {
    height: 30px;
  }
}
.fc-day-other {
  background-color: #fff;
}
.fc-event,
.fc-event-dot {
  border: none !important;
}
</style>
