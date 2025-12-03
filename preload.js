const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    getVersion: () => ipcRenderer.invoke('get-version'),
    toggleControlPanel: () => ipcRenderer.send('toggle-control-panel')
})
