import { ConstantSpawnerConfig } from "../../Constants/GameObjects/BulletSpawnerConsts"
import Bullet from "./Bullet"

/**
 * Bullet pool that spawns bullets at a constant rate.
 * Handles cooldowns internally.
 */
export default class ConstantBulletSpawner extends Phaser.GameObjects.Group {

    /** Internal cooldown */
    cooldown: number = 0

    spawnerConfig: ConstantSpawnerConfig
    speed: number

    constructor(scene: Phaser.Scene, config: ConstantSpawnerConfig) {
        super(scene, {
            classType: config.bulletType,
            maxSize: 1000,
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
                bullet.spawn(x, y, angle, this.speed*Math.cos(angle), this.speed*Math.sin(angle))
                //TODO: Implement spread, shot count, and uniform
                //TODO: calculate offset based on lag/cooldown differences
                
            }
            this.cooldown += this.spawnerConfig.maxCooldown
        }
    }
}