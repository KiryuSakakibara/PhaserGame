import Phaser from "phaser";

export default class LoadScene extends Phaser.Scene {
    constructor() {
        super("LoadScene")
    }

    preload() {
        this.load.image("walpurgisnachtImage", "assets/whiteSquare.png")
        this.load.image("bullet", "assets/bullet.png")
        this.load.image("ship", "assets/ship.png")
    }

    create() {
        this.scene.start("GameScene")
    }
}