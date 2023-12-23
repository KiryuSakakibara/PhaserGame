import Bullet from "../../gameobjects/Bullets/Bullet"
import ConstantBulletSpawner from "../../gameobjects/Bullets/ConstantBulletSpawner"
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
    /** The spread angle in radians */
    spread?: number,
    /** How many bullets are shot per wave */
    shotCount?: number,
    /** Whether the bullets are spread out uniformly, only matters if shotCount > 1 */
    uniform?: boolean
}

export const PlayerLinearBulletSpawnerConfig: ConstantSpawnerConfig = {
    bulletType: PlayerLinearBullet,
    poolSize: 100,
    maxCooldown: 80,
    projectileSpeed: 3000,
    spread: Math.PI/20,
    shotCount: 1,
    uniform: false
}