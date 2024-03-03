import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import dns from 'dns'
import { spawn } from 'child_process' 
import path from 'path'
import python_src from '../../resources/python/main.py?asset'


let mainWindow
spawn('python', [python_src])

function createWindow() {
  // 创建浏览器窗口。
  mainWindow = new BrowserWindow({
    width: 400,
    height: 420,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true, // 启用上下文隔离
      nodeIntegration: true,
      webSecurity: false
    },
    // 禁止自定义缩放窗口
    resizable: false,
    // 禁用窗口外壳
    frame: false,
    // 禁用双击放大或缩小
    fullscreenable: false,
    maximizable: false
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    // 默认打开开发者工具
    // mainWindow.webContents.openDevTools()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // 基于 electron-vite cli 的渲染器热模块替换（HMR）。
  // 在开发环境下加载远程 URL，生产环境下加载本地 HTML 文件。
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// 当 Electron 完成初始化并准备创建浏览器窗口时，将调用此方法。
// 一些 API 只能在此事件发生后使用。
app.whenReady().then(() => {
  // 为 Windows 设置应用程序用户模型 ID
  electronApp.setAppUserModelId('com.electron')

  // 在开发环境下，默认通过 F12 打开或关闭 DevTools，
  // 在生产环境下忽略 CommandOrControl + R。
  // 参考：https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  // 顶部栏方法
  //   注册关闭，最大化，最小化
  ipcMain.on('close', () => mainWindow.close())
  ipcMain.on('mini', () => mainWindow.minimize())
  ipcMain.on('max', () => mainWindow.maximize())
  ipcMain.on('unmax', () => mainWindow.unmaximize())
  // 强制刷新
  ipcMain.on('reload', () => mainWindow.reload())
  // 注册读写 YAML 文件的方法
  ipcMain.handle('read-yaml-file', (path) => {
    readYamlFile(path)
  })
  ipcMain.handle('write-yaml-file', (path, data) => {
    writeYamlFile(path, data)
  })
  // 判断是否有网络,在预加载脚本中调用
  ipcMain.handle('check-connection', async () => {
    return new Promise((resolve, reject) => {
      let timer = null
      timer = setTimeout(() => {
        resolve(false)
      }, 8000)
      dns.resolve('www.ihmeng.cn', function (err, addresses) {
        if (err) {
          resolve(false)
        } else {
          timer = null
          resolve(true)
        }
      })
    })
  })
  // 右键上下文菜单
  ipcMain.on('show-context-menu', (event) => {
    menu.popup({ window: BrowserWindow.fromWebContents(event.sender) })
  })
  // 打开外链
  ipcMain.on('open-external-link', (event, url) => {
    shell.openExternal(url)
  })
  // 获取mp4路径
  ipcMain.handle('getVideoPath', (event,fileName) => {
    const mp4Path = path.join(app.getAppPath(), 'resources', 'video',`${fileName}.mp4`);
    return mp4Path
})

  createWindow()

  app.on('activate', function () {
    // 在 macOS 上，当点击 dock 图标且没有其他窗口打开时，重新创建窗口是常见的做法。
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 在所有窗口关闭时退出应用程序，但在 macOS 上除外。
// 在 macOS 上，应用程序和菜单栏通常会保持活动状态，直到用户使用 Cmd + Q 显式退出。
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 在此文件中，您可以包含其余的应用程序特定主进程代码。
// 您也可以将它们放在单独的文件中并在此处引入。
