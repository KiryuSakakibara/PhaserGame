// THE MAIN ENTRY FILE FOR ELECTRON APPLICATION
const { app, BrowserWindow } = require('electron')
 
function createWindow() {
    const win = new BrowserWindow({
        width: 960,
        height: 540,
        webPreferences: {
            nodeIntegration: true
        },
        useContentSize: true,
        backgroundColor: "#000000"
    })
    win.setMenuBarVisibility(false)
    
    win.loadFile('./dist/index.html');
}
 
app.whenReady().then(createWindow)