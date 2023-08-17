import Phaser from "phaser";
import InputController from "../Controllers/InputController";
var Vec2 = Phaser.Math.Vector2

export default class GameScene extends Phaser.Scene {
    
    /** Inputs for the scene. */
    inputs: InputController
    /** The world time scale */
    timeScale = 1
    

    create() {
        this.physics.world.drawDebug = false

        // Initialize input controller
        this.inputs = new InputController(this)
        
    }

    
    update(time: number, delta: number): void {
        
        this.inputs.update()

        // Handle debug toggle
        this.handleDebug()

        // Handle the timeStop
        this.handleTimeStop()

        this.planck.world.step(delta/1000,8,5)
    }
    
    handleDebug() {
        if (Phaser.Input.Keyboard.JustDown(this.inputs.debug)) {
            /*
            if (this.physics.world.drawDebug) {
                this.physics.world.drawDebug = false;
                this.physics.world.debugGraphic.clear()
            } else {
                this.physics.world.drawDebug = true;
            }
            */
            this.planck.drawDebug = !this.planck.drawDebug
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