module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 1920, // 视窗的宽度，对应设计稿宽度
      viewportHeight: 1080, // 视窗的高度，对应设计稿高度（可选）
      unitPrecision: 5, // `px` 转换为视窗单位值的小数位数
      viewportUnit: 'vw', // 需要转换成的视窗单位，建议使用 vw
      selectorBlackList: ['login-wrapper'], // 不需要转换的类
      minPixelValue: 1, // 小于或等于 `1px` 不转换为视窗单位
      mediaQuery: false // 允许在媒体查询中转换 `px`
    }
  }
}
