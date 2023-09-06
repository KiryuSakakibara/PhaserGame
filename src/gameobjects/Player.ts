import Phaser from "phaser"
import Bullet from "./Bullets/Bullet"
import PlayerLinearBullet from "./Bullets/PlayerBullets/PlayerLinearBullet"
import PlanckSprite from "./PlanckSprite"
import * as Planck from "planck"
import {Fixture} from "planck"
import GameScene from "../scenes/GameScene"
import { PixelScale, Bits, createBoxFixture, Masks, PlanckScale, FixtureData } from "./PhysicsConstants"
import { PlayerConst } from "../Constants/GameObjects/PlayerConst"
import CustomInputPlugin from "../Plugins/CustomInputPlugin"

export default class Player extends PlanckSprite {
    /** The CustomInputPlugin */
    inputs: CustomInputPlugin
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

    constructor(scene: GameScene, x: number, y: number) {

        super(scene, x, y, "Player")

        this.pbody.createFixture(createBoxFixture(
            PlayerConst.width, PlayerConst.height, Bits.player, Masks.player
        ))
        this.setDisplayOrigin(this.width/2-0.5, this.height/2+3)

        // Set the inputs
        this.inputs = this.scene.customInputs
        
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
        // handle shooting before updating bullets so the bullet sprites get updated
        this.handleShoot() 
        
        this.bullets.getChildren().forEach((bullet) => {
            let b = bullet as PlayerLinearBullet
            if (b.active) {
                b.update(time, delta, timeScale)
            }
        })

    }

    handleMovement() {
        let velocity = Planck.Vec2()
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
        //velocity.normalize().scale(this.speed)
        velocity.clamp(1).mul(this.speed)
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
        if (pos.x-PlayerConst.width/2 < 0) {
            newPos.x = PlayerConst.width/2
            boundsHit = true
        }
        else if (pos.x+PlayerConst.width/2 > 1920) {
            newPos.x = 1920-PlayerConst.width/2
            boundsHit = true
        }
        if (pos.y-PlayerConst.height/2 < 0) {
            newPos.y = PlayerConst.height/2
            boundsHit = true
        }
        else if (pos.y+PlayerConst.height/2 > 1080) {
            newPos.y = 1080-PlayerConst.height/2
            boundsHit = true
        }
        if (boundsHit) {
            //this.pbody.setPosition(newPos.mul(this.planckScale))
            this.setPosition(newPos.x, newPos.y)
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