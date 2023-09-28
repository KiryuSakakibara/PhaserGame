// THE MAIN ENTRY FILE FOR ELECTRON APPLICATION
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require("path")
const steamworks = require("steamworks.js")


function createWindow() {
    const win = new BrowserWindow({
        width: 960,
        height: 540,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, "preload.js")
        },
        useContentSize: true,
        backgroundColor: "#000000",
    })
    win.setMenuBarVisibility(false)
    win.maximize()
    
    win.webContents.openDevTools()
    win.loadFile('./dist/index.html');
}

app.whenReady().then(() => {
    createWindow()

    app.on("activate", function() {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

steamworks.electronEnableSteamOverlay()