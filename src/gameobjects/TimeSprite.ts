import Phaser from "phaser"
var Vec2 = Phaser.Math.Vector2

/**
 * Basically the physics sprite class, but has a timeScale property so it can be slowed down,
 * sped up, or frozen.
 */
export default class TimeSprite extends Phaser.Physics.Arcade.Sprite {

    /** The absolute velocity of the sprite in pixels/millisecond, not taking into account timescale */
    velocity: Phaser.Math.Vector2 = new Vec2(0, 0)

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture) {
        super(scene, x, y, texture)
    }

    update(time: number, delta: number, timeScale: number): void {
        super.update(time, delta)

        let scaledDelta = delta * timeScale
        this.setPosition(this.x+this.velocity.x*scaledDelta, this.y+this.velocity.y*scaledDelta)
    }

    setVelocity(x: number, y?: number | undefined): this {
        this.velocity.x = x
        this.velocity.y = y !== undefined ? y : x
        return this
    }


}