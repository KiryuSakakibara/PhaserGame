import { Vec2 } from "planck";
import GameScene from "../../../scenes/GameScene";
import { Bits, Masks, createCircleFixture } from "../../PhysicsConstants";
import PlanckSprite from "../../PlanckSprite";
import PlayerBullet from "./PlayerBullet";

export default class PlayerHomingBullet extends PlayerBullet {

    /** The number of radians the bullet can rotate per frame */
    turnSpeed = Math.PI/40
    timeScaleDelay = 150
    target: PlanckSprite | undefined

    constructor(scene: GameScene, x: number, y: number) {
        super(scene, x, y, "CircleBulletBlue")
        this.pbody.createFixture(createCircleFixture(
            4, Bits.playerBullet, Masks.playerBullet
        ))
    }

    update(time: number, delta: number, timeScale: number) {
        super.update(time, delta, timeScale)
        
        if (!this.target) return

        let targetDirection = this.target.pbody.getPosition().clone().sub(this.pbody.getPosition())
        targetDirection.normalize()
        let currDirection = this.rawVelocity.clone()
        currDirection.normalize()
        let cross = targetDirection.x*currDirection.y - targetDirection.y*currDirection.x
        this.rotate(-cross * this.turnSpeed * timeScale)
        //TODO: only do this on physics updates
        
    }
}