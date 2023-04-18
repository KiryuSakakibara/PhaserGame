import Phaser from "phaser";
import Ship from "../gameobjects/Ship";

export default class LoadScene extends Phaser.Scene {
    constructor() {
        super("LoadScene")
    }

    preload() {
        this.load.image("walpurgisnachtImage", "assets/Walpurgisnacht.png")
    }

    create() {
        this.scene.start("GameScene")
    }
}