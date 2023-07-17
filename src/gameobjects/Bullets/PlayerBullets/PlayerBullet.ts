import Bullet from "../Bullet";

export default class PlayerBullet extends Bullet {

    timeScaleDelay: number

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture) {
        super(scene, x, y, texture)
        this.timeScaleDelay = this.scene.cache.json.get("constants").playerBulletTimeScaleDelay
    }
    
    update(time: number, delta: number, timeScale: number) {
        super.update(time, delta, this.calculateTimeScale(this.age, timeScale))
    }

    /**
     * Linear function scaling with age so that timeScale is reached at 0.2 seconds
     * @param age age of bullet
     * @param endTimeScale the destination/desired time scale
     */
    calculateTimeScale(age: number, endTimeScale: number): number {
        if (age >= this.timeScaleDelay) {
            return endTimeScale
        } else {
            return (this.timeScaleDelay-age)/this.timeScaleDelay + endTimeScale*(age/this.timeScaleDelay)
        }
    }
}