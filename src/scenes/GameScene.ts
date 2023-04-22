import Phaser from "phaser";
import ShipSprite from "../gameobjects/ShipSprite";
import Bullet from "../gameobjects/Bullet";
import Enemy from "../gameobjects/Enemy";
import InputController from "../Controllers/InputController";

var Vec2 = Phaser.Math.Vector2

export default class GameScene extends Phaser.Scene {
    
    inputController: InputController
    walpurgisNacht: Phaser.GameObjects.Image
    shipSprite: ShipSprite

    constructor() {
        super("GameScene")
    }

    preload() {

    }

    create() {
        this.inputController = new InputController(this)
        //this.physics.world.setBounds(0, 0, 800, 600)
        //this.walpurgisNacht = this.add.sprite(700, 300, "walpurgisnachtImage")
        this.walpurgisNacht = new Enemy(this, 700, 300, "walpurgisnachtImage")
        this.shipSprite = new ShipSprite(this, 100, 300, "walpurgisnachtImage", this.inputController)
        this.shipSprite.setScale(0.2, 0.2)

    }

    
    update(time: number, delta: number): void {
        this.shipSprite.update(time, delta)
    }
    
    
}