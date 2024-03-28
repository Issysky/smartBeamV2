<!-- 张拉压浆弹窗 -->
<template>
  <div class="alert-type1-wrapper">
    <div class="form-wrapper">
      <el-row v-for="(row, index) in rows.data" :key="index" :class="{ 'gap-row': row.gap }">
        <el-col v-for="(col, index2) in row.cols" :key="index2" :span="col.span">
          <div :class="`${col.type} box`">{{ col.content }}</div>
        </el-col>
      </el-row>
    </div>
    <button @click="tensionStore.showDetail">关闭</button>
  </div>
</template>

<script setup lang="js">
import { ref, reactive } from 'vue'
import { useProductionTensionStore } from '@renderer/stores/homeStore/productionStore/production_tension'

const tensionStore = useProductionTensionStore()

const rows = reactive({
  data: [
    // 第一组
    {
      gap: false,
      cols: [
        { span: 3, type: 'label', content: '施工单位' },
        { span: 5, type: 'text', content: '' },
        { span: 3, type: 'label', content: '单位工程' },
        { span: 5, type: 'text', content: '' },
        { span: 3, type: 'label', content: '分部工程' },
        { span: 5, type: 'text', content: '' }
      ]
    },
    {
      gap: false,
      cols: [
        { span: 3, type: 'label', content: '监理单位' },
        { span: 5, type: 'text', content: '' },
        { span: 3, type: 'label', content: '分项工程' },
        { span: 5, type: 'text', content: '' },
        { span: 3, type: 'label', content: '工程部位' },
        { span: 5, type: 'text', content: '' }
      ]
    },
    {
      gap: false,
      cols: [
        { span: 3, type: 'label', content: '隶属标投' },
        { span: 5, type: 'text', content: '' },
        { span: 3, type: 'label', content: '桩号范围%' },
        { span: 5, type: 'text', content: '' },
        { span: 3, type: 'text', content: '' },
        { span: 5, type: 'text', content: '' }
      ]
    },
    {
      gap: true,
      cols: [
        { span: 3, type: 'label', content: '梁场名称' },
        { span: 5, type: 'text', content: '' },
        { span: 3, type: 'text', content: '' },
        { span: 5, type: 'text', content: '' },
        { span: 3, type: 'text', content: '' },
        { span: 5, type: 'text', content: '' }
      ]
    },
    // 第二组
    {
      gap: false,
      cols: [
        { span: 3, type: 'label', content: '张拉设备厂家' },
        { span: 5, type: 'text', content: '' },
        { span: 3, type: 'label', content: '张拉设备型号及规格' },
        { span: 5, type: 'text', content: '' },
        { span: 3, type: 'label', content: '张拉设备编号' },
        { span: 5, type: 'text', content: '' }
      ]
    },
    {
      gap: true,
      cols: [
        { span: 3, type: 'label', content: '钢绞线厂家' },
        { span: 5, type: 'text', content: '' },
        { span: 3, type: 'label', content: '钢绞线型号及规格' },
        { span: 5, type: 'text', content: '' },
        { span: 3, type: 'text', content: '' },
        { span: 5, type: 'text', content: '' }
      ]
    },
    // 第三组
    {
      gap: false,
      cols: [
        { span: 3, type: 'label', content: '砼设计强度Mpa' },
        { span: 3, type: 'text', content: '' },
        { span: 3, type: 'label', content: '混凝土弹性质量Gpa' },
        { span: 3, type: 'text', content: '' },
        { span: 3, type: 'label', content: '钢绞线弹性质量Gpa' },
        { span: 3, type: 'text', content: '' },
        { span: 3, type: 'label', content: '张拉环境温度℃' },
        { span: 3, type: 'text', content: '' }
      ]
    },
    {
      gap: true,
      cols: [
        { span: 3, type: 'label', content: '张拉时砼强度Mpa' },
        { span: 3, type: 'text', content: '' },
        { span: 3, type: 'label', content: '摩擦系数' },
        { span: 3, type: 'text', content: '' },
        { span: 3, type: 'label', content: '钢绞线抗拉强度Mpa' },
        { span: 3, type: 'text', content: '' },
        { span: 3, type: 'text', content: '' },
        { span: 3, type: 'text', content: '' }
      ]
    },
    // 第四组
    {
      gap: false,
      cols: [
        { span: 6, type: 'label', content: '千斤顶编号' },
        { span: 6, type: 'label', content: '油泵编号' },
        { span: 6, type: 'label', content: '千斤顶使用次数' },
        { span: 6, type: 'label', content: '标定日期' }
      ]
    },
    {
      gap: false,
      cols: [
        { span: 6, type: 'text', content: '' },
        { span: 6, type: 'text', content: '' },
        { span: 6, type: 'text', content: '' },
        { span: 6, type: 'text', content: '' }
      ]
    },
    {
      gap: true,
      cols: [
        { span: 6, type: 'text', content: '' },
        { span: 6, type: 'text', content: '' },
        { span: 6, type: 'text', content: '' },
        { span: 6, type: 'text', content: '' }
      ]
    },
    // 第五组
    {
      gap: false,
      cols: [
        { span: 3, type: 'label', content: '构件类型' },
        { span: 4, type: 'text', content: '' },
        { span: 3, type: 'label', content: '构件孔数' },
        { span: 4, type: 'text', content: '' },
        { span: 3, type: 'label', content: '梁板长度' },
        { span: 7, type: 'text', content: '' }
      ]
    },
    {
      gap: false,
      cols: [
        { span: 3, type: 'label', content: '张拉梁号' },
        { span: 4, type: 'text', content: '' },
        { span: 3, type: 'label', content: '施工员' },
        { span: 4, type: 'text', content: '' },
        { span: 3, type: 'label', content: '张拉顺序' },
        { span: 7, type: 'text', content: '' }
      ]
    },
    {
      gap: false,
      cols: [
        { span: 3, type: 'label', content: '浇筑日期' },
        { span: 4, type: 'text', content: '' },
        { span: 3, type: 'label', content: '监理员' },
        { span: 4, type: 'text', content: '' },
        { span: 3, type: 'label', content: '滑断丝情况及处理说明' },
        { span: 7, type: 'text', content: '' }
      ]
    },
    {
      gap: false,
      cols: [
        { span: 3, type: 'label', content: '张拉日期' },
        { span: 4, type: 'text', content: '' },
        { span: 3, type: 'label', content: '质检员' },
        { span: 4, type: 'text', content: '' },
        { span: 3, type: 'label', content: '伸长值偏差超限说明' },
        { span: 7, type: 'text', content: '' }
      ]
    }
  ]
})
</script>
<style scoped lang="less">
.alert-type1-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #fff;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  .form-wrapper {
    width: 90%;
    height: 90%;
    font-size: 14px;
    .label {
      background-color: var(--font-level-5);
      color: var(--font-level-13);
      font-weight: 600;
    }
    .text {
      background-color: transparent;
    }
    .box {
      border: 1px solid #33333333;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .gap-row {
      margin-bottom: 20px;
    }
  }
  button{
    background-color: var(--color-danger);
    border: none;
    color: #fff;
    width: 60px;
    cursor: pointer;
  }
}
</style>
