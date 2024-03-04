<!-- 设备设置页面的蒸养棚设置内右侧设备组件 -->
<template>
    <div class="template-item-wrapper">
      <div class="item-wrapper">
        <div class="item">
          <p>页面名称</p>
          <input type="text" v-model="showName" />
        </div>
        <div class="item">
          <p>设备名称</p>
          <input type="text" v-model="name" />
        </div>
        <div class="item">
          <p>监控rtsp地址</p>
          <input type="text" v-model="rtspUrl" />
        </div>
        <div class="item">
          <p>设备运行图片</p>
          <input type="text" v-model="runningImg" />
        </div>
        <div class="item">
          <p>设备待机图片</p>
          <input type="text" v-model="standbyImg" />
        </div>
        <div class="item">
          <p>是否连接监控</p>
          <div class="input">
            <el-switch v-model="is_monitor" />
          </div>
        </div>
      </div>
      <div class="btn-wrapper">
        <button class="delete" @click="deleteEquip(templateItemData.id)">删除设备</button>
        <button class="submit" @click="submit()">提交</button>
      </div>
    </div>
  </template>
  
  <script setup lang="js">
  import { onMounted, ref } from 'vue'
  import { useSettingEquipTemplateStore } from '@renderer/stores/homeStore/settingMenuStore/settingEquipTemplate'
  import { useRouter } from 'vue-router'
  
  const props = defineProps(['templateItemData'])
  
  const router = useRouter()
  
  // 使用蒸养棚设置store
  const settingEquiptemplateStore = useSettingEquipTemplateStore()
  
  // 定义数据
  const showName = ref('')
  const name = ref('')
  const rtspUrl = ref('')
  const runningImg = ref('')
  const standbyImg = ref('')
  const is_monitor = ref(false)
  
  // 删除设备
  const deleteEquip = (id) => {
    console.log(id, '删除的id')
    settingEquiptemplateStore.deleteTemplate(id)
    // router.push({ path: '/home/setting_menu/set_equip__template' })
    // router.go(0)
  }
  
  // 提交修改
  const submit = () => {
    const data = {
      showName: showName.value,
      name: name.value,
      rtspUrl: rtspUrl.value,
      runningImg: runningImg.value,
      standbyImg: standbyImg.value,
      is_monitor: is_monitor.value,
      id: props.templateItemData.id
    }
    settingEquiptemplateStore.changeTemplate(props.templateItemData.index, data)
  }
  
  // 初始化数据
  const initData = () => {
    showName.value = props.templateItemData.showName
    name.value = props.templateItemData.name
    rtspUrl.value = props.templateItemData.rtspUrl
    runningImg.value = props.templateItemData.runningImg
    standbyImg.value = props.templateItemData.standbyImg
    is_monitor.value = props.templateItemData.is_monitor
  }
  
  onMounted(() => {
    initData()
    console.log(props.templateItemData, 'props.templateItemData')
  })
  </script>
  <style scoped lang="less">
  .template-item-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    position: relative;
    padding: 30px 0;
  
    .item-wrapper {
      width: 100%;
      height: 80%;
      display: flex;
      align-items: center;
      justify-content: start;
      flex-wrap: wrap;
      margin-bottom: 20px;
      .item {
        width: 45%;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin-bottom: 10px;
        p {
          width: 30%;
          text-align: left;
          font-size: 0.7em;
        }
        input {
          width: 50%;
          height: 15px;
          margin-left: 10px;
          padding: 4px 7px;
          background-color: #171d25;
          color: var(--font-level-3);
          border: 1px solid #616264;
          border-radius: 5px;
          &:focus {
            border: 1px solid var(--color-primary);
            outline: none;
            color: var(--font-level-1);
          }
        }
        .input {
          width: 50%;
          margin-left: 10px;
          display: flex;
          justify-content: center;
        }
      }
    }
  
    .btn-wrapper {
      width: 50%;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .delete {
        width: 80px;
        height: 30px;
        display: flex;
        background-color: var(--color-danger);
        color: var(--font-level-1);
        border: none;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-radius: 10px;
      }
      .submit {
        width: 80px;
        height: 30px;
        background-color: var(--color-primary);
        color: var(--font-level-1);
        border: none;
        cursor: pointer;
        border-radius: 10px;
      }
    }
  }
  </style>
  