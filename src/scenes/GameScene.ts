import Phaser from "phaser";
import ShipSprite from "../gameobjects/ShipSprite";
import Bullet from "../gameobjects/Bullet";

var Vec2 = Phaser.Math.Vector2

export default class GameScene extends Phaser.Scene {
    
    
    walpurgisNacht: Phaser.GameObjects.Image
    shipSprite: ShipSprite
    bulletCount: number = 0
    spacebar: Phaser.Input.Keyboard.Key
    bullets: Phaser.GameObjects.Group;

    constructor() {
        super("GameScene")
    }

    preload() {

    }

    create() {
        //this.physics.world.setBounds(0, 0, 800, 600)
        this.walpurgisNacht = this.add.sprite(400, 100, "walpurgisnachtImage")
        this.shipSprite = new ShipSprite(this, 400, 600, "walpurgisnachtImage")
        this.shipSprite.setScale(0.2, 0.2)
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        this.bullets = this.add.group({
            classType: Bullet,
            maxSize: 200,
            runChildUpdate: true
        })
    }

    
    update(time: number, delta: number): void {
        this.shipSprite.update(time, delta)
        if (this.spacebar.isDown && this.shipSprite.coolDown <= 0) {
            //this.spawnBullets()
            const bullet: Bullet = this.bullets.get()
            if (bullet) {
                const angle = Phaser.Math.FloatBetween(0, Phaser.Math.PI2)
                const vel = new Vec2(Math.cos(angle), Math.sin(angle)).scale(500)
                console.log(vel.length())
                bullet.spawn(400, 300, angle, vel.x, vel.y)
                this.shipSprite.coolDown = 10
            }
        }
        //console.log(this.bulletCount, 1000/delta)
    }

    spawnBullets() {
        for (let i=0; i<5; i++) {
            const bullet = this.physics.add.sprite(400, 300, "bullet").setScale(0.25, 0.25)
            bullet.setCollideWorldBounds(true, 1, 1)
            bullet.setCircle(16)
            const vel = new Vec2(Phaser.Math.FloatBetween(-1, 1), Phaser.Math.FloatBetween(-1, 1)).normalize().scale(300)

            bullet.setVelocity(vel.x, vel.y)
            this.bulletCount += 1
        }
    }

    
    
}