//const { default: global } = require("./main");
//import steamworks from "steamworks.js"
console.log(require("@electron/remote").getGlobal("steamClient"))
window.steamClient = require("@electron/remote").getGlobal("steamClient")
