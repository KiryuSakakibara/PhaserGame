import Phaser from "phaser";

export default class LoadScene extends Phaser.Scene {
    constructor() {
        super("LoadScene")
    }

    preload() {
        this.load.image("walpurgisnachtImage", "assets/Walpurgisnacht.png")
        this.load.image("bullet", "assets/bullet.png")
    }

    create() {
        this.scene.start("GameScene")
    }
}