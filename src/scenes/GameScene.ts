import Phaser from "phaser";
import Player from "../gameobjects/Player";
import Bullet from "../gameobjects/Bullets/Bullet";
import Enemy from "../gameobjects/Enemy";
import InputController from "../Controllers/InputController";
import { bulletEnemy, bulletPlayer } from "../Controllers/CollisionController";
import * as Planck from "planck"

var Vec2 = Phaser.Math.Vector2

export default class GameScene extends Phaser.Scene {
    
    inputs: InputController
    timeScale = 1
    world: Planck.World
    planckScale: number
    

    create() {
        this.physics.world.drawDebug = false

        // Initialize input controller
        this.inputs = new InputController(this)

        // Initialize the physics world
        this.world = Planck.World()
        this.planckScale = this.cache.json.get("constants").planckScale
        
    }

    
    update(time: number, delta: number): void {
        
        this.inputs.update()

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
        /*
        if (Phaser.Input.Keyboard.JustDown(this.inputs.timeStop)) {
            this.timeScale = 0.1
        } else if (Phaser.Input.Keyboard.JustUp(this.inputs.timeStop)) {
            this.timeScale = 1
        }
        */
        if (this.inputs.isStoppingTime) {
            this.timeScale = 0.02
        } else {
            this.timeScale = 1
        }
    }
    
}