import Phaser from "phaser";
import ShipSprite from "../gameobjects/ShipSprite";
import Bullet from "../gameobjects/Bullet";
import Enemy from "../gameobjects/Enemy";
import InputController from "../Controllers/InputController";
import { bulletEnemy, bulletPlayer } from "../Controllers/CollisionController";

var Vec2 = Phaser.Math.Vector2

export default class GameScene extends Phaser.Scene {
    
    inputs: InputController
    /*
    walpurgisNacht: Enemy
    shipSprite: ShipSprite
    enemyHealthText: Phaser.GameObjects.Text
    playerHealthText: Phaser.GameObjects.Text
    */

    timeScale = 1
    

    create() {
        this.physics.world.drawDebug = false

        // Initialize input controller
        this.inputs = new InputController(this)

        /*
        // Create the game objects
        this.walpurgisNacht = new Enemy(this, 700, 300, "walpurgisnachtImage").setScale(0.7)
        this.shipSprite = new ShipSprite(this, 100, 300, "ship", this.inputs)

        // Create collisions
        this.physics.add.overlap(this.shipSprite.bullets, this.walpurgisNacht, bulletEnemy)
        this.physics.add.overlap(this.walpurgisNacht.bullets, this.shipSprite, bulletPlayer)
        

        // Create the on screen text
        this.enemyHealthText = this.add.text(20, 20, this.walpurgisNacht.health.toString(), { color: '#ff0000' })
        this.playerHealthText = this.add.text(20, 40, this.shipSprite.health.toString(), {color: "#00ff00"})
        */
        
    }

    
    update(time: number, delta: number): void {
        /*
        this.shipSprite.update(time, delta)
        this.walpurgisNacht.update(time, delta)

        // Update text
        this.enemyHealthText.setText(this.walpurgisNacht.health.toString())
        this.playerHealthText.setText(this.shipSprite.health.toString())
        */
        
        // Handle debug toggle
        this.handleDebug()

        // Handle the timeStop
        this.handleTimeStop()
    }
    
    handleDebug() {
        if (Phaser.Input.Keyboard.JustDown(this.inputs.debug)) {
            if (this.physics.world.drawDebug) {
                this.physics.world.drawDebug = false;
                this.physics.world.debugGraphic.clear()
            } else {
                this.physics.world.drawDebug = true;
            }
        }
    }

    handleTimeStop() {
        if (Phaser.Input.Keyboard.JustDown(this.inputs.timeStop)) {
            this.timeScale = 0.2
            /*
            this.walpurgisNacht.bullets.getChildren().forEach((bullet) => {
                (bullet as Bullet).timeScale = 0.2
            })
            this.walpurgisNacht.timeScale = 0.2
            */
        } else if (Phaser.Input.Keyboard.JustUp(this.inputs.timeStop)) {
            this.timeScale = 1
            /*
            this.walpurgisNacht.bullets.getChildren().forEach((bullet) => {
                (bullet as Bullet).timeScale = 1
            })
            this.walpurgisNacht.timeScale = 1
            */
        }
    }
    
}