import Phaser from "phaser";

export default class Bullet extends Phaser.Physics.Arcade.Sprite {

    speed: number = 600
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
        if (this.x-this.displayWidth/2 > bounds.right || this.x+this.displayWidth/2 < 0 || this.y-this.displayHeight/2 > bounds.bottom || this.y+this.displayHeight/2 < 0) {
            this.setActive(false)
            this.setVisible(false)
        }
    }

    spawn(x: number, y: number, angle: number, vx = 0, vy = 0) {
        this.setActive(true)
        this.setVisible(true)
        this.setPosition(x, y)
        this.setRotation(angle)
        this.setVelocity(vx, vy)
        
        this.lifeSpan = 1000
    }

}