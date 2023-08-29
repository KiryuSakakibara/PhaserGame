import Phaser from "phaser";
var Vec2 = Phaser.Math.Vector2

export default class GameScene extends Phaser.Scene {
    
    /** The world time scale */
    timeScale = 1
    
    /** How much time has passed since the last physics update, in milliseconds */
    timeSincePhysicsUpdate = 0

    create() {
        
    }

    
    update(time: number, delta: number): void {
        
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
        
    }
    
    handleDebug() {
        if (Phaser.Input.Keyboard.JustDown(this.customInputs.debug)) {
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
        if (this.customInputs.isStoppingTime) {
            this.timeScale = 0.02
        } else {
            this.timeScale = 1
        }
    }
    
}