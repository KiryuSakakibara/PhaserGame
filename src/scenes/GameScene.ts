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
        this.customInputs.initAllInputs()
    }

    
    update(time: number, delta: number): void {
        // Update the inputs
        this.customInputs.update()

        // Handle the timeStop
        this.handleTimeStop()

        // Handle pausing
        this.handlePause()

        if (this.isPaused) return
        // NOTHING PAST THIS POINT WILL RUN IF THE GAME IS PAUSED    

        // step the physics engine
        this.timeSincePhysicsUpdate += delta
        while (this.timeSincePhysicsUpdate >= 1000/60) {
            this.planck.stepWorld()
            this.timeSincePhysicsUpdate -= 1000/60
        }

        
        //TODO: USE STATE MACHINES!!!!
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
        if (this.customInputs.isPausing) {
            if (!this.isPaused) {
                this.scene.run("PauseUIScene")
                this.scene.run("DialogueUIScene")
                this.isPaused = true
            }
        } else if (this.isPaused) {
            this.scene.sleep("PauseUIScene")
            this.scene.sleep("DialogueUIScene")
            this.isPaused = false
        }
    }
    
}