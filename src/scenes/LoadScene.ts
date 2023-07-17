import Phaser from "phaser";

export default class LoadScene extends Phaser.Scene {
    constructor() {
        super("LoadScene")
    }

    preload() {
        this.load.image("walpurgisnachtImage", "assets/Walpurgisnacht.png")
        this.load.image("bullet", "assets/bullet.png")
        this.load.image("ship", "assets/ship.png")
        this.load.json("settings", "assets/jsons/settings.json")
        this.load.json("constants", "assets/jsons/constants.json")
    }

    create() {
        this.scene.start("Stage1")
    }
}