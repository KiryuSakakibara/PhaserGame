// THE MAIN ENTRY FILE FOR ELECTRON APPLICATION
const { app, BrowserWindow } = require('electron')

const useSteam = true;
if (useSteam) {
    try {
        const steamworks = require("steamworks.js");
        console.log("steamworks, ", steamworks);
        const client = steamworks.init();

        console.log("client", client);
        console.log(client.localplayer.getName());
        app.commandLine.appendSwitch("in-process-gpu");
        app.commandLine.appendSwitch("disable-direct-composition");
        app.allowRendererProcessReuse = false;
    } catch (e) {
        console.log(e)
    }
  
}
/*
if (process.env.APP_ENV === "production") {
    try {
        const client = Steamworks.init(2618510)
    } catch (e) {
        console.log(e)
    }
}
*/

function createWindow() {
    const win = new BrowserWindow({
        width: 960,
        height: 540,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        useContentSize: true,
        backgroundColor: "#000000"
    })
    win.setMenuBarVisibility(false)
    
    win.loadFile('./dist/index.html');
    win.webContents.openDevTools()
}
 
app.whenReady().then(createWindow)