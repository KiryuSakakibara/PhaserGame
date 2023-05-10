import Bullet from "./Bullet"
import PausableSprite from "./PausableSprite"
enum Attack {

}
var Vec2 = Phaser.Math.Vector2

export default class Enemy extends PausableSprite {
    health: number = 100
    bullets: Phaser.GameObjects.Group
    /** The time elapsed since the last attack */
    attackTimer: number = 0
    wavesFired: number = 0

    // Attack 1 constants
    /** The delay between waves in milliseconds */
    delayBetweenWaves: number = 100
    /** The angle between waves in radians */
    angleBetweenWaves: number = 4
    /** The number of shots per wave */
    shotsPerWave: number = 5
    /** The speed of the bullet */
    bulletSpeed: number = 0.250


    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture) {
        super(scene, x, y, texture)
        scene.physics.world.enable(this)
        scene.add.existing(this)
        let radius = 140
        //this.setCircle(radius, this.displayWidth/2-radius, this.displayHeight/2-radius)
        /*
        console.log(this.width)
        this.setCircle(100)
        console.log(this.width)
        this.body.setOffset(this.displayWidth/2, this.displayHeight/2)
        */

        // Create the bullets
        this.bullets = scene.add.group({
            classType: Bullet,
            maxSize: 1000,
            runChildUpdate: true
        })
        /*
        this.bullets.createMultiple({
            key: "bullet",
            classType: Bullet,
            quantity: this.bullets.maxSize-1,
            frameQuantity: this.bullets.maxSize-1,
            visible: false,
            active: false
        })
        */
        for (let i=0; i<1000; i++) {
            this.bullets.add(new Bullet(scene))
        }
        console.log(this.bullets.getChildren().length)
    }

    update(time: number, delta: number): void {
        super.update(time, delta)
        this.attackTimer += delta * this.timeScale
        this.attack1()
    }

    dealDamage(damage: number) {
        this.health -= damage
    }

    attack1() {
        while (this.attackTimer >= 0) {
            let baseAngle = this.angleBetweenWaves * this.wavesFired % Math.PI*2
            for (let i=0; i<this.shotsPerWave; i++) {
                const bullet: Bullet = this.bullets.getFirst(false, false)
                let angle = baseAngle + Math.PI*2*i/this.shotsPerWave
                let vel = (new Vec2(Math.cos(angle), Math.sin(angle))).scale(this.bulletSpeed)
                if (bullet) {
                    bullet.spawn(this.x + vel.x*this.attackTimer/1000,
                        this.y + vel.y*this.attackTimer/1000, angle, vel.x, vel.y, 3000)
                    bullet.setDepth(-0.1)
                }

            }
            this.wavesFired++
            this.attackTimer -=this.delayBetweenWaves
        }
    }


}