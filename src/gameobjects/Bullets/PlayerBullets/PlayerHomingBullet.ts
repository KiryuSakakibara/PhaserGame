import GameScene from "../../../scenes/GameScene";
import { Bits, Masks, createCircleFixture } from "../../PhysicsConstants";
import PlayerBullet from "./PlayerBullet";

export default class PlayerHomingBullet extends PlayerBullet {

    /** The number of radians the bullet can rotate per frame */
    turnSpeed: number

    constructor(scene: GameScene, x: number, y: number) {
        super(scene, x, y, "CircleBulletBlue")
        this.pbody.createFixture(createCircleFixture(
            4, Bits.playerBullet, Masks.playerBullet
        ))
    }

    update(time: number, delta: number, timeScale: number) {
        super.update(time, delta, timeScale)
        let currentVelocity = this.rawVelocity
    }
}