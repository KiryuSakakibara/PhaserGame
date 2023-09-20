import Phaser from "phaser";
import * as Planck from "planck"
import { Vec2 } from "planck";
import GameScene from "../scenes/GameScene";
import { PixelScale, PlanckScale, FixtureData } from "./PhysicsConstants";
import { RenderOrder } from "../Constants/RenderOrder";

/**
 * Basically the Sprite class but with Planck physics. Has a body, but no fixture or shape.
 */
export default class PlanckSprite extends Phaser.GameObjects.Sprite {

    /** The planck physics body */
    pbody: Planck.Body
    /** The scale to multiply by to convert pixel units to meters */
    planckScale: number
    /** The unscaled velocity in pixels/second */
    rawVelocity = new Vec2(0, 0)
    /** The debug graphics for this sprite */
    graphics: Phaser.GameObjects.Graphics
    /** Whether the graphics has already been cleared */
    clearedGraphics: boolean = true

    
    // INTERPOLATION BETWEEN PHYSICS UPDATES
    /** The position of the body in the previous physics update, so the sprite 
     *  can be interpolated, units in meters. ALWAYS CLONE WHEN USING VALUE */
    previousBodyPos: Vec2

    constructor(scene: GameScene, x: number, y: number, texture: string) {
        super(scene, x, y, texture)
        scene.add.existing(this)
        this.planckScale = scene.planck.planckScale
        this.pbody = scene.planck.world.createDynamicBody(Vec2(x*this.planckScale, y*this.planckScale))
        this.pbody.setUserData({sprite: this})
        this.previousBodyPos = this.pbody.getPosition().clone()

        this.graphics = scene.add.graphics()
        this.graphics.setDepth(RenderOrder.indexOf("debug"))

        
        this.texture.setFilter(Phaser.Textures.FilterMode.NEAREST)
        this.setScale(PixelScale)
    }

    update(time: number, delta: number, timeScale: number): void {
        super.update(time, delta)

        let scaledDelta = delta * timeScale // scale delta for time stop
        this.pbody.setLinearVelocity(this.rawVelocity.clone().mul(timeScale*this.planckScale))
        //let pos = this.pbody.getPosition().clone().mul(1/this.planckScale) // body position in pixels
        let prev = this.previousBodyPos.clone()
        let next = this.pbody.getPosition().clone()
        // ratio of how much time passed since the last physics update : how much time a physics update should take
        let t = (this.scene as GameScene).timeSincePhysicsUpdate/(1000/60)
        // lerp between the previous physics position and next physics position
        let pos = prev.mul(1-t).add(next.mul(t)).mul(1/this.planckScale)
        this.setPosition(pos.x, pos.y)
        this.setRotation(this.pbody.getAngle())

        if (this.scene.customInputs.isDebugging) {
            this.drawDebug()
            this.clearedGraphics = false
        } else if (!this.clearedGraphics) {
            this.graphics.clear()
            this.clearedGraphics = true
        }
    }

    /**
     * Sets the velocity of the sprite in pixels/second (unscaled by time, does not set pbody velocity)
     * @param x x velocity
     * @param y y velocity
     * @returns this game object
     */
    setRawVelocity(x: number, y: number): this {
        this.rawVelocity.x = x
        this.rawVelocity.y = y
        return this
    }

    /**
     * Sets the position of both the body and sprite in pixel coordinates.
     * @param x 
     * @param y 
     */
    setFullPosition(x: number, y: number) {
        if (this.pbody) {
            this.pbody.setPosition(Vec2(x*PlanckScale, y*PlanckScale))
            this.previousBodyPos = this.pbody.getPosition().clone()
        }
        this.setPosition(x, y)
        return this
    }

    /**
     * Activates the sprite and body
     */
    enable() {
        this.setActive(true)
        this.setVisible(true)
        this.pbody.setActive(true)
    }

    /**
     * Deactivates the sprite and body
     */
    disable() {
        this.setActive(false)
        this.setVisible(false)
        this.pbody.setActive(false)
        this.graphics.clear()
    }

    /**
     * Draws debug lines to represent every shape/fixture attached to the body
     */
    drawDebug() {
        this.graphics.clear()
        this.graphics.lineStyle(2, 0x00ff00)
        // does not go through loop if there are no fixtures
        for (let f = this.pbody.getFixtureList(); f; f=f.getNext()) {
            let position = this.pbody.getPosition().clone().mul(1/PlanckScale)
            this.graphics.translateCanvas(position.x, position.y)
            this.graphics.rotateCanvas(this.rotation)
            let data = f.getUserData() as FixtureData
            if (data.width && data.height) {
                this.graphics.strokeRect(-data.width/2, -data.height/2, data.width, data.height)
            } else if (data.radius) {
                this.graphics.strokeCircle(0, 0, data.radius)
            } else {
                console.warn("Shape type unknown")
            }
        }
    }
}