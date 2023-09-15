import Phaser from "phaser";
var Vec2 = Phaser.Math.Vector2

export default class GameScene extends Phaser.Scene {
    
    /** The world time scale */
    timeScale = 1
    
    /** How much time has passed since the last physics update, in milliseconds */
    timeSincePhysicsUpdate = 0

    /** Whether the game is paused */
    isPaused = false

    create() {
        
    }

    
    update(time: number, delta: number): void {
        // Update the inputs
        this.customInputs.update()
        
        // Handle debug toggle
        this.handleDebug()

        // Handle the timeStop
        this.handleTimeStop()

        // step the physics engine
        this.timeSincePhysicsUpdate += delta
        while (this.timeSincePhysicsUpdate >= 1000/60) {
            this.planck.stepWorld()
            this.timeSincePhysicsUpdate -= 1000/60
        }

        this.handlePause()
        
        //TODO: USE STATE MACHINES!!!!
    }
    
    handleDebug() {
        /*
        if (Phaser.Input.Keyboard.JustDown(this.customInputs.debug)) {
            this.planck.drawDebug = !this.planck.drawDebug
        }
        */
        this.planck.drawDebug = this.customInputs.isDebugging
    }

    handleTimeStop() {
        if (this.customInputs.isStoppingTime) {
            this.timeScale = 0.02
        } else {
            this.timeScale = 1
        }
    }

    /** Handles pausing the game */
    handlePause() {
        if (Phaser.Input.Keyboard.JustDown(this.customInputs.pause)) {
            if (!this.isPaused) {
                this.scene.run("PauseUIScene")
            } else {
                this.scene.sleep("PauseUIScene")
            }
            this.isPaused = !this.isPaused
        }
    }
    
}