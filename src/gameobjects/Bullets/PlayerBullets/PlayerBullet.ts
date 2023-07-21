import Bullet from "../Bullet";

export default class PlayerBullet extends Bullet {

    /** how long it takes for the timeScale of the bullet to synchronize with the timeScale
     * of the world
     */
    timeScaleDelay: number

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture) {
        super(scene, x, y, texture)
        this.timeScaleDelay = this.scene.cache.json.get("constants").playerBulletTimeScaleDelay
    }
    
    update(time: number, delta: number, timeScale: number) {
        super.update(time, delta, this.calculateTimeScale(this.age, timeScale))
    }

    /**
     * Function scaling with age so that timeScale is reached at {@link timeScaleDelay} seconds
     * @param age age of bullet
     * @param endTimeScale the destination/desired time scale
     */
    calculateTimeScale(age: number, endTimeScale: number): number {
        if (age >= this.timeScaleDelay) {
            return endTimeScale
        } else {
            return 1-(age/this.timeScaleDelay)**3 + endTimeScale*(age/this.timeScaleDelay)**3
        }
    }
}