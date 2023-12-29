import { ConstantSpawnerConfig } from "../../Constants/GameObjects/BulletSpawnerConsts"
import GameScene from "../../scenes/GameScene"
import Bullet from "./Bullet"
import PlayerLinearBullet from "./PlayerBullets/PlayerLinearBullet"
var Vec2 = Phaser.Math.Vector2

/**
 * Bullet pool that spawns bullets at a constant rate.
 * Handles cooldowns internally.
 */
export default class ConstantBulletSpawner extends Phaser.GameObjects.Group {

    /** Internal cooldown */
    cooldown: number = 0

    spawnerConfig: ConstantSpawnerConfig
    speed: number

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

        this.spawnerConfig = config
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
                b.update(time, delta, timeScale)
            }
        })
    }

    /**
     * Attempts to spawn a bullet at the target angle, if the cooldown allows.
     * @param x The x position to spawn at in pixels
     * @param y The y position to spawn at in pixels
     * @param angle The angle being aimed at in radians
     */
    attemptSpawn(x: number, y: number, angle: number) {
        while (this.cooldown <= 0) {
            const bullet: Bullet = this.get()
            if (bullet) {
                // Simulated time passed for the first physics update
                let t = -this.cooldown - (this.scene as GameScene).timeSincePhysicsUpdate + 1000/60
                let vx = this.speed*Math.cos(angle)
                let vy = this.speed*Math.sin(angle)
                //bullet.spawn(x-vx*this.cooldown/1000, y-vy*this.cooldown/1000, angle, vx, vy)
                bullet.spawn(x+vx*t/1000, y+vy*t/1000, angle, vx, vy)
                bullet.scaledAge = -this.cooldown
                bullet.trueAge = -this.cooldown
                //TODO: Implement spread, shot count, and uniform
                
            }
            this.cooldown += this.spawnerConfig.maxCooldown
        }
    }
}