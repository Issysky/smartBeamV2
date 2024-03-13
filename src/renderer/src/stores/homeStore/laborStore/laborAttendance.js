// 劳务系统，场内统计
import { defineStore } from 'pinia'
import axios from 'axios'
import { reactive, ref } from 'vue'
import { exportExcel } from '@renderer/utils/excelConfig.js'

export const useLaborAttendanceStore = defineStore('laborAttendance', () => {
  // 请求地址
  const url = '/labor/labor_Attendance/'

  // 安全事件图表数据
  const laborAttendanceData = reactive({
    data: []
  })
  // 总页数
  const totalPage = ref(0)
  // 图表的表头
  const laborAttendanceColumns = [
    { name: '序号', width: '60px', key: 'id' },
    { name: '姓名', width: '60px', key: 'name' },
    { name: '所在项目', width: '120px', key: 'index3' },
    { name: '所在区域', width: '160px', key: 'index4' },
    { name: '班组名称', width: '120px', key: 'index5' },
    { name: '入场时间', width: '160px', key: 'index6' },
    { name: '出场时间', width: '160px', key: 'index7' },
    { name: '刷卡照片', width: '100px', key: 'index8' }
  ]
  // 图表数据的key
  const laborAttendanceDataKey = [
    'id',
    'name',
    'index3',
    'index4',
    'index5',
    'index6',
    'index7',
    'index8'
  ]
  // echarts图表option1
  const laborAttendanceChartOption1 = reactive({
    option: {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      title: {
        text: '近7天出勤趋势(日/人)'
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          areaStyle: {}
        }
      ]
    }
  })
  // 获取考勤数据的数据
  const getLaborAttendanceData = async (params) => {
    // const res = await axios.get(url, {
    //   params: params,
    // })
    const res = {
      data: {
        data: [
          {
            id: 1,
            name: '张三',
            index3: '项目1',
            index4: '区域1',
            index5: '班组1',
            index6: '2021-08-01 08:00:00',
            index7: '2021-08-01 18:00:00',
            index8: '照片1'
          },
          {
            id: 2,
            name: '李四',
            index3: '项目2',
            index4: '区域2',
            index5: '班组2',
            index6: '2021-08-01 08:00:00',
            index7: '2021-08-01 18:00:00',
            index8: '照片2'
          },
          // Add more data here
          {
            id: 3,
            name: '王五',
            index3: '项目3',
            index4: '区域3',
            index5: '班组3',
            index6: '2021-08-02 08:00:00',
            index7: '2021-08-02 18:00:00',
            index8: '照片3'
          },
          {
            id: 4,
            name: '赵六',
            index3: '项目4',
            index4: '区域4',
            index5: '班组4',
            index6: '2021-08-02 08:00:00',
            index7: '2021-08-02 18:00:00',
            index8: '照片4'
          },
          {
            id: 5,
            name: '钱七',
            index3: '项目5',
            index4: '区域5',
            index5: '班组5',
            index6: '2021-08-03 08:00:00',
            index7: '2021-08-03 18:00:00',
            index8: '照片5'
          },
          {
            id: 6,
            name: '孙八',
            index3: '项目6',
            index4: '区域6',
            index5: '班组6',
            index6: '2021-08-03 08:00:00',
            index7: '2021-08-03 18:00:00',
            index8: '照片6'
          },
          {
            id: 7,
            name: '周九',
            index3: '项目7',
            index4: '区域7',
            index5: '班组7',
            index6: '2021-08-04 08:00:00',
            index7: '2021-08-04 18:00:00',
            index8: '照片7'
          },
          {
            id: 8,
            name: '吴十',
            index3: '项目8',
            index4: '区域8',
            index5: '班组8',
            index6: '2021-08-04 08:00:00',
            index7: '2021-08-04 18:00:00',
            index8: '照片8'
          },
          {
            id: 9,
            name: '郑十一',
            index3: '项目9',
            index4: '区域9',
            index5: '班组9',
            index6: '2021-08-05 08:00:00',
            index7: '2021-08-05 18:00:00',
            index8: '照片9'
          },
          {
            id: 10,
            name: '钟十二',
            index3: '项目10',
            index4: '区域10',
            index5: '班组10',
            index6: '2021-08-05 08:00:00',
            index7: '2021-08-05 18:00:00',
            index8: '照片10'
          },
          {
            id: 11,
            name: '马十三',
            index3: '项目11',
            index4: '区域11',
            index5: '班组11',
            index6: '2021-08-06 08:00:00',
            index7: '2021-08-06 18:00:00',
            index8: '照片11'
          },
          {
            id: 12,
            name: '邓十四',
            index3: '项目12',
            index4: '区域12',
            index5: '班组12',
            index6: '2021-08-06 08:00:00',
            index7: '2021-08-06 18:00:00',
            index8: '照片12'
          },
          {
            id: 13,
            name: '肖十五',
            index3: '项目13',
            index4: '区域13',
            index5: '班组13',
            index6: '2021-08-07 08:00:00',
            index7: '2021-08-07 18:00:00',
            index8: '照片13'
          },
          {
            id: 14,
            name: '黄十六',
            index3: '项目14',
            index4: '区域14',
            index5: '班组14',
            index6: '2021-08-07 08:00:00',
            index7: '2021-08-07 18:00:00',
            index8: '照片14'
          },
          {
            id: 15,
            name: '陈十七',
            index3: '项目15',
            index4: '区域15',
            index5: '班组15',
            index6: '2021-08-08 08:00:00',
            index7: '2021-08-08 18:00:00',
            index8: '照片15'
          }
        ],
        total_pages: 2
      }
    }
    laborAttendanceData.data = res.data.data
    totalPage.value = res.data.total_pages
  }
  // 渲染图表
  const renderChart = (mychart) => {
    mychart.setOption(laborAttendanceChartOption1.option)
  }

  return {
    laborAttendanceData,
    totalPage,
    laborAttendanceColumns,
    laborAttendanceDataKey,
    laborAttendanceChartOption1,
    renderChart,
    getLaborAttendanceData
  }
})
