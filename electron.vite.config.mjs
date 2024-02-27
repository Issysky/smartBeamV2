import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [
      vue(),
      // require('postcss-px-to-viewport')({
      //   viewportWidth: 1920, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
      //   viewportHeight: 1080, // 视窗的高度，对应的是我们设计稿的高度(也可以不配置)
      //   unitPrecision: 5, // 指定`px`转换为视窗单位值的小数位数
      //   viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
      //   selectorBlackList: [], // 指定不需要转换的类
      //   minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位
      //   mediaQuery: false // 允许在媒体查询中转换`px`
      // })
    ]
  }
})
