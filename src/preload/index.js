import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const topBar = {
  close: () => ipcRenderer.send('close'),
  mini: () => ipcRenderer.send('mini'),
  max: () => ipcRenderer.send('max'),
  unmax: () => ipcRenderer.send('unmax'),
  // 强制刷新
  reload: () => ipcRenderer.send('reload'),
  // 检测网络
  pingInter: () =>
    ipcRenderer.invoke('check-connection').then((res) => {
      if (res) {
        return '在线'
      } else {
        return '离线'
      }
    }),
  getMenu: () => ipcRenderer.send('show-context-menu'),
  // 打开外链
  openExternal: (url) => ipcRenderer.send('open-external-link', url),
  // 获取mp4路径
  getVideoPath: (fileName) => ipcRenderer.invoke('getVideoPath', fileName)
}

const threeApi = {
  getGlbPath: (fileName) => ipcRenderer.invoke('getGlbPath', fileName),
  getHdrPath: (fileName) => ipcRenderer.invoke('getHdrPath', fileName)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('topBar', topBar)
    contextBridge.exposeInMainWorld('threeApi', threeApi)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
