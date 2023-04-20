export default class ShipSprite extends Phaser.Physics.Arcade.Sprite {
    /** The cursor input keys for the scene this ship belongs to */
    cursors: Phaser.Types.Input.Keyboard.CursorKeys
    /** The speed of the ship */
    speed = 400
    coolDown = 100

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture) {
        // Create the gameobject and add it to the physics world
        super(scene, x, y, texture)
        scene.physics.world.enable(this)
        scene.add.existing(this)
        this.setCollideWorldBounds(true)

        // Create the inputs
        this.cursors = scene.input.keyboard.createCursorKeys()
    }

    protected preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta)
        //console.log(this.cursors.left.isDown)
    }

    update(time: number, delta: number): void {
        //super.update(args)

        this.coolDown -= delta

        // Ship velocity
        let velocity = new Phaser.Math.Vector2
        if (this.cursors.left.isDown && this.cursors.right.isUp) {
            velocity.x = -1
        } else if (this.cursors.left.isUp && this.cursors.right.isDown) {
            velocity.x = 1
        } else {
            velocity.x = 0
        }
        if (this.cursors.up.isDown && this.cursors.down.isUp) {
            velocity.y = -1
        } else if (this.cursors.up.isUp && this.cursors.down.isDown) {
            velocity.y = 1
        } else {
            velocity.y = 0
        }
        velocity.normalize().scale(this.speed)
        this.setVelocity(velocity.x, velocity.y)
    }
}