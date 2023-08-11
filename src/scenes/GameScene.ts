import Phaser from "phaser";
import Player from "../gameobjects/Player";
import Bullet from "../gameobjects/Bullets/Bullet";
import Enemy from "../gameobjects/Enemy";
import InputController from "../Controllers/InputController";
import { bulletEnemy, bulletPlayer } from "../Controllers/CollisionController";
import * as Planck from "planck"
import { PlanckScale } from "../gameobjects/PhysicsConstants";

var Vec2 = Phaser.Math.Vector2

export default class GameScene extends Phaser.Scene {
    
    /** Inputs for the scene. */
    inputs: InputController
    /** The world time scale */
    timeScale = 1
    /** The planck physics world */
    world: Planck.World
    /** The conversion rate from pixels to meters */
    planckScale: number
    /** Whether debug lines should be drawn or not */
    drawDebug = false
    

    create() {
        this.physics.world.drawDebug = false

        // Initialize input controller
        this.inputs = new InputController(this)

        // Initialize the physics world
        this.world = Planck.World()
        this.planckScale = PlanckScale

        
    }

    
    update(time: number, delta: number): void {
        
        this.inputs.update()

        // Handle debug toggle
        this.handleDebug()

        // Handle the timeStop
        this.handleTimeStop()

        //this.world.step(delta/1000)
    }
    
    handleDebug() {
        if (Phaser.Input.Keyboard.JustDown(this.inputs.debug)) {
            if (this.physics.world.drawDebug) {
                this.physics.world.drawDebug = false;
                this.physics.world.debugGraphic.clear()
            } else {
                this.physics.world.drawDebug = true;
            }
            this.drawDebug = !this.drawDebug
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