import Phaser from "phaser";
import Bullet from "../Bullet";
import GameScene from "../../../scenes/GameScene";

export default class PlayerBullet extends Bullet {

    /** how long it takes for the timeScale of the bullet to synchronize with the timeScale
     * of the world
     */
    timeScaleDelay: number

    constructor(scene: GameScene, x: number, y: number, texture: string) {
        super(scene, x, y, texture)
        this.timeScaleDelay = this.scene.cache.json.get("constants").playerBulletTimeScaleDelay
    }
    
    update(time: number, delta: number, timeScale: number) {
        super.update(time, delta, this.calculateTimeScale(this.age, timeScale))
    }

    /**
     * Function scaling with age so that timeScale is reached at {@link timeScaleDelay} milliseconds
     * @param age age of bullet in milliseconds
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