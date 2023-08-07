import Phaser from "phaser";
import * as Planck from "planck"
import { Vec2 } from "planck";
import GameScene from "../scenes/GameScene";

/**
 * Basically the Sprite class but with Planck physics. Has a body, but no fixture or shape.
 */
export default class PlanckSprite extends Phaser.GameObjects.Sprite {

    /** The physics world */
    world: Planck.World
    /** The planck physics body */
    pbody: Planck.Body
    /** The scale to multiply by to convert pixel units to meters */
    planckScale: number
    /** The velocity in pixels/millisecond */
    velocity = new Vec2(0, 0)

    constructor(scene: GameScene, x: number, y: number, texture: string, world: Planck.World) {
        super(scene, x, y, texture)
        this.world = world
        this.planckScale = scene.planckScale
        this.pbody = world.createDynamicBody(Vec2(x*this.planckScale, y*this.planckScale))
    }

    update(time: number, delta: number, timeScale: number): void {
        super.update(time, delta)

        let scaledDelta = delta * timeScale // scale delta for time stop
        this.setPosition(this.x+this.velocity.x*scaledDelta, this.y+this.velocity.y*scaledDelta)
        this.pbody.setPosition(Vec2(this.x * this.planckScale, this.y * this.planckScale))
        this.pbody.setAngle(this.rotation)
    }

    /**
     * Sets the velocity
     * @param x x velocity
     * @param y y velocity
     * @returns this game object
     */
    setVelocity(x: number, y?: number | undefined): this {
        this.velocity.x = x
        this.velocity.y = y !== undefined ? y : x
        return this
    }

    drawDebug() {
        // TODO
    }
}