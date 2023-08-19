import Phaser from "phaser"
import InputController from "../Controllers/InputController"
import Bullet from "./Bullets/Bullet"
import PlayerLinearBullet from "./Bullets/PlayerBullets/PlayerLinearBullet"
import PlanckSprite from "./PlanckSprite"
import * as Planck from "planck"
import GameScene from "../scenes/GameScene"
import { PixelScale, Bits, boxFixture, Masks, PlanckScale } from "./PhysicsConstants"

export default class Player extends PlanckSprite {
    /** The inputController */
    inputs: InputController
    /** The speed of the ship in pixels/second */
    speed = 600
    /** The max cooldown of the ship in milliseconds */
    maxCooldown = 80
    /** The remaining shooting cooldown of the ship in milliseconds */
    cooldown = 0
    /** The collection of bullets owned by the ship */
    bullets: Phaser.GameObjects.Group
    /** The health of the player */
    health: number = 10

    constructor(scene: GameScene, x: number, y: number, texture: string, inputs: InputController) {

        // Create the gameobject and add it to the physics world
        super(scene, x, y, texture)
        //scene.physics.world.enable(this)
        //this.setCollideWorldBounds(true)
        //this.setSize(this.width*0.3, this.height*0.5)
        //this.body.setOffset(this.body.offset.x-0.5, this.body.offset.y+2)
        //let radius = 5
        //this.setCircle(radius, this.displayWidth/2-radius-0.5, this.displayHeight/2-radius+4)
        //this.setScale(2, 2)

        this.pbody.createFixture(boxFixture(30, 50, Bits.player, Masks.player, this))
        this.spriteOffset = Planck.Vec2(PixelScale/2, -12)
        console.log(this.pbody.getFixtureList())

        // Set the inputs
        this.inputs = inputs
        
        // Create the bullets
        
        this.bullets = scene.add.group({
            classType: PlayerLinearBullet,
            maxSize: 5000,
            runChildUpdate: false,
        })
        /*
        this.bullets.createMultiple({
            classType: Bullet,
            quantity: this.bullets.maxSize,
            visible: false,
            active: false
        })
        */
        
        
        
    }

    protected preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta)
    }

    /**
     * 
     * @param time 
     * @param delta 
     * @param timeScale the world timeScale
     */
    update(time: number, delta: number, timeScale: number): void {
        this.checkInBounds() // calling this first so body gets updated before sprite jump
        super.update(time, delta, 1)

        this.cooldown -= delta

        this.handleMovement()
        this.handleShoot() // handle shooting first so the bullet sprites get updated
        
        this.bullets.getChildren().forEach((bullet) => {
            let b = bullet as PlayerLinearBullet
            if (b.active) {
                b.update(time, delta, timeScale)
            }
        })

    }

    handleMovement() {
        let velocity = new Phaser.Math.Vector2
        if (this.inputs.left.isDown && this.inputs.right.isUp) {
            velocity.x = -1
        } else if (this.inputs.left.isUp && this.inputs.right.isDown) {
            velocity.x = 1
        } else {
            velocity.x = 0
        }
        if (this.inputs.up.isDown && this.inputs.down.isUp) {
            velocity.y = -1
        } else if (this.inputs.up.isUp && this.inputs.down.isDown) {
            velocity.y = 1
        } else {
            velocity.y = 0
        }
        velocity.normalize().scale(this.speed)
        this.setRawVelocity(velocity.x, velocity.y)

    }

    /**
     * Checks if the player is still within bounds, and moves them back inside if they're not.
     * Should be called after the physics update and before the sprite jumps to the body.
     */
    checkInBounds() {
        let pos = this.pbody.getPosition().clone().mul(1/this.planckScale)
        let newPos = Planck.Vec2(pos.x, pos.y) // in pixels
        let boundsHit = false
        if (pos.x-this.displayWidth/2 < 0) {
            newPos.x = this.displayWidth/2
            boundsHit = true
        }
        else if (pos.x+this.displayWidth/2 > 1920) {
            newPos.x = 1920-this.displayWidth/2
            boundsHit = true
        }
        if (pos.y-this.displayHeight/2 < 0) {
            newPos.y = this.displayHeight/2
            boundsHit = true
        }
        else if (pos.y+this.displayHeight/2 > 1080) {
            newPos.y = 1080-this.displayHeight/2
            boundsHit = true
        }
        if (boundsHit) {
            this.pbody.setPosition(newPos.mul(this.planckScale))
        }
    }

    handleShoot() {
        if (this.inputs.isShooting && this.cooldown <= 0) {
            for (let i=0; i<1; i++) {
                const bullet: PlayerLinearBullet = this.bullets.get()
                if (bullet) {
                    let angle = Phaser.Math.Angle.Between(this.inputs.mouseX, this.inputs.mouseY, this.x, this.y)
                    angle += Math.random()*Math.PI/20-Math.PI/40 + Math.PI
                    let pos = this.pbody.getPosition().clone().mul(1/PlanckScale)
                    bullet.spawn(pos.x, pos.y, angle, 3000*Math.cos(angle), 3000*Math.sin(angle))
                    bullet.setDepth(-1)
                    this.cooldown = this.maxCooldown
                }
            }
            
        } 
    }

    dealDamage(damage: number) {
        this.health -= damage
    }
}