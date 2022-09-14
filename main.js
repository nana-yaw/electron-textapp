const fs = require('fs')
const {app, BrowserWindow, ipcMain, dialog} = require('electron')
const path = require('path')
let filePath = undefined

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    const writeToFile = (filePath, data) => {
        fs.writeFile(filePath, data, (error) => {
            if (error)  console.log('There was an error', error);
            console.log('File saved.');
            // Send message to the renderer/tab
            mainWindow.webContents.send('saved', 'success')
        })
    }

    ipcMain.on('save', (event, text) => {
        if (filePath === undefined) {
            dialog.showSaveDialog(mainWindow, {
                properties: ['createDirectory', 'showOverwriteConfirmation'],
                defaultPath: 'filename.txt'
              }).then(result => {
                if (result.filePath) {
                    filePath = result.filePath
                    writeToFile(filePath, text)
                }
              }).catch(err => {
                console.log(err)
              })    
        } else {
            writeToFile(filePath, text)
        }
        
    })

    mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})