import Bullet from "../../gameobjects/Bullets/Bullet"
import ConstantBulletSpawner from "../../gameobjects/Bullets/ConstantBulletSpawner"
import PlayerHomingBullet from "../../gameobjects/Bullets/PlayerBullets/PlayerHomingBullet"
import PlayerLinearBullet from "../../gameobjects/Bullets/PlayerBullets/PlayerLinearBullet"

export type ConstantSpawnerConfig = {
    /** The type of bullet being shot */
    bulletType: typeof Bullet,
    /** Max number of bullets in the pool */
    poolSize: number
    /** Max cooldown between bullets */
    maxCooldown: number,
    /** Initial projectile speed */
    projectileSpeed: number,
    /** The max spread angle in radians */
    spread: number,
    /** How many bullets are shot per wave */
    shotCount: number,
    /** Whether the bullets are spread out uniformly (spread randomly if false) */
    uniform: boolean
}

export const PlayerLinearBulletSpawnerConfig: ConstantSpawnerConfig = {
    bulletType: PlayerLinearBullet,
    poolSize: 1000,
    maxCooldown: 100,
    projectileSpeed: 3000,
    spread: Math.PI/20,
    shotCount: 1,
    uniform: false
}

export const PlayerHomingBulletSpawnerConfig: ConstantSpawnerConfig = {
    bulletType: PlayerHomingBullet,
    poolSize: 3000,
    maxCooldown: 200,
    projectileSpeed: 2000,
    spread: Math.PI/5,
    shotCount: 2,
    uniform: false
}