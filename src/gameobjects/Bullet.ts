import Phaser from "phaser";

export default class Bullet extends Phaser.Physics.Arcade.Sprite {

    lifeSpan: number = 1000
    
    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0, "bullet")
        scene.physics.world.enable(this)
        scene.add.existing(this)
        this.setScale(0.5, 0.5)
    }

    update(time: number, delta: number): void {
        super.update()
        this.lifeSpan -= delta
        let bounds = this.scene.physics.world.bounds
        if (this.x-this.displayWidth/2 > bounds.right || this.x+this.displayWidth/2 < 0 ||
            this.y-this.displayHeight/2 > bounds.bottom || this.y+this.displayHeight/2 < 0 ||
            this.lifeSpan <= 0) {

            this.disableBody(true, true)
        }
    }

    spawn(x: number, y: number, angle: number, vx=0, vy=0, lifeSpan=1000) {
        this.enableBody(true, x, y, true, true)
        this.setRotation(angle)
        this.setVelocity(vx, vy)
        
        this.lifeSpan = lifeSpan
    }

}