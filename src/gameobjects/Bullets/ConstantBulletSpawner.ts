import { ConstantSpawnerConfig } from "../../Constants/GameObjects/BulletSpawnerConsts"
import GameScene from "../../scenes/GameScene"
import PlanckSprite from "../PlanckSprite"
import Bullet from "./Bullet"
import PlayerHomingBullet from "./PlayerBullets/PlayerHomingBullet"
import PlayerLinearBullet from "./PlayerBullets/PlayerLinearBullet"
var Vec2 = Phaser.Math.Vector2

/**
 * Bullet pool that spawns bullets at a constant rate.
 * Handles cooldowns internally.
 */
export default class ConstantBulletSpawner extends Phaser.GameObjects.Group {

    /** Internal cooldown */
    cooldown: number = 0

    config: ConstantSpawnerConfig
    speed: number
    homingTargetList?: PlanckSprite[]

    constructor(scene: GameScene, config: ConstantSpawnerConfig) {
        super(scene, {
            classType: config.bulletType,
            maxSize: config.poolSize,
            runChildUpdate: false
        })
        /*
        this.createMultiple({
            classType: Bullet,
            quantity: this.bullets.maxSize,
            visible: false,
            active: false
        })
        */

        this.config = config
        this.speed = config.projectileSpeed

        scene.add.existing(this)
    }

    /**
     * Update the cooldowns for the bullet spawner
     * @param time
     * @param delta 
     * @param timeScale 1 if player and is unaffected by timescale
     */
    updateTimer(time: number, delta:number, timeScale: number) {
        if (this.cooldown > 0) {
            this.cooldown -= delta * timeScale
        }
    }

    /**
     * Update every bullet in the pool
     * @param time 
     * @param delta 
     * @param timeScale 
     */
    updateBullets(time: number, delta: number, timeScale: number) {
        this.getChildren().forEach((bullet) => {
            let b = bullet as Bullet
            if (b.active) {
                if (b instanceof PlayerHomingBullet && this.homingTargetList && this.homingTargetList.length > 0) {
                    b.target = this.homingTargetList[0]
                }
                b.update(time, delta, timeScale)
            }
        })
    }

    /**
     * Attempts to spawn a bullet at the target angle, if the cooldown allows.
     * @param x The x position to spawn at in pixels
     * @param y The y position to spawn at in pixels
     * @param angle The angle being aimed at in radians
     * @param time The time the bullet was spawned, so latest bullet can be rendered on top
     */
    attemptSpawn(x: number, y: number, angle: number, time: number) {
        while (this.cooldown <= 0) {
            for (let i=0; i<this.config.shotCount; i++) {
                const bullet: Bullet = this.get()
                if (bullet) {
                    // The random angle (0.5 if spread is uniform)
                    let randA = this.config.uniform ? 0.5 : Math.random()
                    // The angle of the current shot in the wave
                    let a = angle - this.config.spread/2 +
                        this.config.spread/this.config.shotCount * (randA + i)
                    // Simulated time passed for the first physics update
                    let t = -this.cooldown - (this.scene as GameScene).timeSincePhysicsUpdate + 1000/60
                    let vx = this.speed*Math.cos(a)
                    let vy = this.speed*Math.sin(a)
                    bullet.spawn(x+vx*t/1000, y+vy*t/1000, a, vx, vy, time)
                    bullet.scaledAge = -this.cooldown
                    bullet.trueAge = -this.cooldown
                    
                }
                
            }
            this.cooldown += this.config.maxCooldown
        }
    }
}