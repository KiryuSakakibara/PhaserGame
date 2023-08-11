import Phaser from "phaser";
import * as Planck from "planck"
import { Vec2 } from "planck";
import GameScene from "../scenes/GameScene";
import { PlanckScale } from "./PhysicsConstants";

/**
 * Basically the Sprite class but with Planck physics. Has a body, but no fixture or shape.
 */
export default class PlanckSprite extends Phaser.GameObjects.Sprite {

    /** The physics world */
    world: Planck.World
    /** The planck physics body */
    pbody: Planck.Body
    /** the positional offset of the pbody in pixels */
    pbodyOffset = new Vec2(0, 0)
    /** The scale to multiply by to convert pixel units to meters */
    planckScale: number
    /** The velocity in pixels/millisecond */
    velocity = new Vec2(0, 0)
    /** The debug graphics for this sprite */
    graphics: Phaser.GameObjects.Graphics

    constructor(scene: GameScene, x: number, y: number, texture: string, world: Planck.World) {
        super(scene, x, y, texture)
        this.world = world
        this.planckScale = scene.planckScale
        this.pbody = world.createDynamicBody(Vec2(x*this.planckScale, y*this.planckScale))
        this.graphics = scene.add.graphics()
        this.graphics.setDepth(1000)
    }

    update(time: number, delta: number, timeScale: number): void {
        super.update(time, delta)

        let scaledDelta = delta * timeScale // scale delta for time stop
        this.setPosition(this.x+this.velocity.x*scaledDelta, this.y+this.velocity.y*scaledDelta)
        this.pbody.setPosition(Vec2((this.x+this.pbodyOffset.x) * this.planckScale, (this.y+this.pbodyOffset.y) * this.planckScale))
        this.pbody.setAngle(this.rotation)

        if (this.scene instanceof GameScene && this.scene.drawDebug) {
            this.drawDebug()
        } else {
            this.graphics.clear()
        }
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

    enable() {
        this.setActive(true)
        this.setVisible(true)
        this.pbody.setAwake(true)
    }

    disable() {
        this.setActive(false)
        this.setVisible(false)
        this.pbody.setAwake(false)
        this.graphics.clear()
    }

    drawDebug() {
        this.graphics.clear()
        this.graphics.lineStyle(2, 0x00ff00)
        if (this.pbody.getFixtureList()) {
            for (let f = this.pbody.getFixtureList(); f; f=f.getNext()) {
                let position = this.pbody.getPosition().mul(1/PlanckScale)
                this.graphics.translateCanvas(position.x, position.y)
                this.graphics.rotateCanvas(this.rotation)
                let data = f.getUserData() as any
                switch (data.type) {
                    case "box":
                        this.graphics.strokeRect(-data.width/2, -data.height/2, data.width, data.height)
                        break
                    case "circle":
                        this.graphics.strokeCircle(0, 0, data.radius)
                        break
                    default:
                        console.warn("Shape type unknown");
                        break
                }
            }
        }
    }
}