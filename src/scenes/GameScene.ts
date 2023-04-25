import Phaser from "phaser";
import ShipSprite from "../gameobjects/ShipSprite";
import Bullet from "../gameobjects/Bullet";
import Enemy from "../gameobjects/Enemy";
import InputController from "../Controllers/InputController";
import { bulletEnemy, bulletPlayer } from "../Controllers/CollisionController";

var Vec2 = Phaser.Math.Vector2

export default class GameScene extends Phaser.Scene {
    
    inputController: InputController
    walpurgisNacht: Enemy
    shipSprite: ShipSprite
    enemyHealthText: Phaser.GameObjects.Text
    playerHealthText: Phaser.GameObjects.Text

    constructor() {
        super("GameScene")
    }

    preload() {

    }

    create() {
        this.physics.world.drawDebug = false

        // Initialize input controller
        this.inputController = new InputController(this)

        // Create the game objects
        this.walpurgisNacht = new Enemy(this, 700, 300, "walpurgisnachtImage")
        this.shipSprite = new ShipSprite(this, 100, 300, "ship", this.inputController)

        // Create collisions
        this.physics.add.overlap(this.shipSprite.bullets, this.walpurgisNacht, bulletEnemy)
        this.physics.add.overlap(this.walpurgisNacht.bullets, this.shipSprite, bulletPlayer)
        

        // Create the on screen text
        this.enemyHealthText = this.add.text(20, 20, this.walpurgisNacht.health.toString(), { color: '#ff0000' })
        this.playerHealthText = this.add.text(20, 40, this.shipSprite.health.toString(), {color: "#00ff00"})
    
        
    }

    
    update(time: number, delta: number): void {
        this.shipSprite.update(time, delta)
        this.walpurgisNacht.update(time, delta)

        // Toggle debug
        if (Phaser.Input.Keyboard.JustDown(this.inputController.debug)) {
            this.toggleDebug()
        }

        // Update text
        this.enemyHealthText.setText(this.walpurgisNacht.health.toString())
        this.playerHealthText.setText(this.shipSprite.health.toString())
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