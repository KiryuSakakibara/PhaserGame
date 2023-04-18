import Phaser from "phaser";
import Ship from "../gameobjects/Ship";
export default class GameScene extends Phaser.Scene {
    ship
    walpurgisNacht

    constructor() {
        super("GameScene")
    }

    preload() {

    }

    create() {
        this.walpurgisnacht = this.add.image(400, 100, "walpurgisnachtImage")
        this.ship = this.add.existing(new Ship(this, 400, 560, 30, 40, 0xffffff))
    }
}