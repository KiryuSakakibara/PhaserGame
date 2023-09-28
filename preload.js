//const { default: global } = require("./main");

const useSteam = true
var client
if (useSteam) {
    try {
        const steamworks = require("steamworks.js");
        console.log("steamworks, ", steamworks);
        client = steamworks.init();

        console.log("client", client);
        console.log(client.localplayer.getName());
        
    } catch (e) {
        console.log(e)
    }
  
}


/*
contextBridge.exposeInMainWorld("steamworks", {
    getSteamClient: () => ipcRenderer.invoke("getSteamClient")
})
*/

window.steamworks = {
    client
}
