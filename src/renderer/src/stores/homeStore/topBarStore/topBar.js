// 顶部栏的store
import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const usetopBarStore = defineStore('topBar', () => {
  // 是否显示最大化/还原按钮
  let isMax = ref(false)
  // 获取大字体文件元素和小字体文件元素，文件在index.html中引入
  const smallFs = document.querySelector('#smallFs')
  const largeFs = document.querySelector('#largeFs')

  // 四个按钮关闭，放大，还原，最小化事件
  const handleMax = () => {
    window.topBar.max()
    isMax.value = true
    // 放大的时候切换大字体文件，禁用小字体文件,禁用拖拽
    // changeFontSize('large')
    changeDrag(false)
    // console.log('max',largeFs.disabled,smallFs.disabled)
  }
  const handleUnmax = () => {
    window.topBar.unmax()
    isMax.value = false
    // 还原的时候切换小字体文件，禁用大字体文件，启用拖拽
    // changeFontSize('small')
    changeDrag(true)
    // console.log('unmax',largeFs.disabled,smallFs.disabled)
  }
  const handleMini = () => {
    window.topBar.mini()
  }
  const handleClose = () => {
    // 清除本地存储
    localStorage.removeItem('token')
    window.topBar.close()
  }
  // 改变窗口文字大小，接受一个size参数，size为目标字体大小，值为large或者small
  const changeFontSize = (size) => {
    // 切换字体大小
    if (size === 'small') {
      largeFs.setAttribute('disabled', 'true')
      smallFs.removeAttribute('disabled')
    } else if (size === 'large') {
      smallFs.setAttribute('disabled', 'true')
      largeFs.removeAttribute('disabled')
    }
  }
  // 改变拖拽许可,接受一个isDrag参数，isDrag为false时禁用拖拽，为true时启用拖拽
  const changeDrag = (isDrag) => {
    // 获取可拖拽元素
    const drag = document.querySelectorAll('.dragbox')
    if (!isDrag) {
      Array.from(drag).forEach((item) => {
        item.classList.remove('dragable')
      })
    } else {
      Array.from(drag).forEach((item) => {
        item.classList.add('dragable')
      })
    }
  }
  return { handleMax, handleUnmax, isMax, handleMini, handleClose, changeFontSize, changeDrag }
})
