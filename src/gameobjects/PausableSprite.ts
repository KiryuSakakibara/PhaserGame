var Vec2 = Phaser.Math.Vector2

export default class PausableSprite extends Phaser.Physics.Arcade.Sprite {

    /** The absolute velocity of the sprite in pixels/millisecond, not taking into account time */
    velocity: Phaser.Math.Vector2
    /** The time scale between 0 and 1 (0 for frozen time, 1 for normal speed) */
    timeScale = 1

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture) {
        super(scene, x, y, texture)
        this.velocity = new Vec2(0, 0)
    }

    update(time: number, delta: number): void {
        super.update(time, delta)

        let trueDelta = delta * this.timeScale
        this.setPosition(this.x+this.velocity.x*trueDelta, this.y+this.velocity.y*trueDelta)
    }

    setVelocity(x: number, y?: number | undefined): this {
        this.velocity.x = x
        this.velocity.y = y !== undefined ? y : x
        return this
    }

}