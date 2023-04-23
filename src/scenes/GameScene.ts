import Phaser from "phaser";
import ShipSprite from "../gameobjects/ShipSprite";
import Bullet from "../gameobjects/Bullet";
import Enemy from "../gameobjects/Enemy";
import InputController from "../Controllers/InputController";
import { bulletEnemy } from "../Controllers/CollisionController";

var Vec2 = Phaser.Math.Vector2

export default class GameScene extends Phaser.Scene {
    
    inputController: InputController
    walpurgisNacht: Enemy
    shipSprite: ShipSprite
    text: Phaser.GameObjects.Text;

    constructor() {
        super("GameScene")
    }

    preload() {

    }

    create() {
        this.physics.world.drawDebug = false

        this.inputController = new InputController(this)

        this.walpurgisNacht = new Enemy(this, 700, 300, "walpurgisnachtImage")
        this.text = this.add.text(20, 20, this.walpurgisNacht.health.toString(), { color: '#00ff00' })
        this.shipSprite = new ShipSprite(this, 100, 300, "walpurgisnachtImage", this.inputController)
        this.shipSprite.setScale(0.2, 0.2)

        this.physics.add.overlap(this.shipSprite.bullets, this.walpurgisNacht, undefined, bulletEnemy, this)
        

    }

    
    update(time: number, delta: number): void {
        this.shipSprite.update(time, delta)

        // Toggle debug
        if (Phaser.Input.Keyboard.JustDown(this.inputController.debug)) {
            this.toggleDebug()
        }
        this.text.setText(this.walpurgisNacht.health.toString())
    }
    
    toggleDebug() {
        if (this.physics.world.drawDebug) {
            this.physics.world.drawDebug = false;
            this.physics.world.debugGraphic.clear()
        } else {
            this.physics.world.drawDebug = true;
        }
    }
    
}