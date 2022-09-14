const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    saveText: (text) => ipcRenderer.send('save', text),
    savedText: (callback) => ipcRenderer.on('saved', callback)
})