import Bullet from "./Bullet"

type Key = Phaser.Input.Keyboard.Key
var KeyCodes = Phaser.Input.Keyboard.KeyCodes
var Vec2 = Phaser.Math.Vector2

export default class ShipSprite extends Phaser.Physics.Arcade.Sprite {
    /** The input keys for the scene*/
    inputs : {
        up: Key
        down: Key,
        left: Key,
        right: Key,
        shoot: Key
    }
    /** The speed of the ship */
    speed = 500
    /** The max cooldown of the ship */
    maxCooldown = 40
    /** The remaining shooting cooldown of the ship */
    cooldown = 0
    /** The collection of bullets owned by the ship */
    bullets: Phaser.GameObjects.Group

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture) {
        // Create the gameobject and add it to the physics world
        super(scene, x, y, texture)
        scene.physics.world.enable(this)
        scene.add.existing(this)
        this.setCollideWorldBounds(true)

        // Create the inputs
        let keyboard = scene.input.keyboard
        this.inputs = {...this.inputs, ...keyboard.createCursorKeys()}
        this.inputs.shoot = keyboard.addKey(KeyCodes.SPACE)
        
        // Create the bullets
        this.bullets = scene.add.group({
            classType: Bullet,
            maxSize: 200,
            runChildUpdate: true
        })
    }

    protected preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta)
        //console.log(this.cursors.left.isDown)
    }

    update(time: number, delta: number): void {
        //super.update(args)

        this.cooldown -= delta

        this.handleMovement()
        this.handleShoot()
    }

    handleMovement() {
        let velocity = new Phaser.Math.Vector2
        if (this.inputs.left.isDown && this.inputs.right.isUp) {
            velocity.x = -1
        } else if (this.inputs.left.isUp && this.inputs.right.isDown) {
            velocity.x = 1
        } else {
            velocity.x = 0
        }
        if (this.inputs.up.isDown && this.inputs.down.isUp) {
            velocity.y = -1
        } else if (this.inputs.up.isUp && this.inputs.down.isDown) {
            velocity.y = 1
        } else {
            velocity.y = 0
        }
        velocity.normalize().scale(this.speed)
        this.setVelocity(velocity.x, velocity.y)
    }

    handleShoot() {
        if (this.inputs.shoot.isDown && this.cooldown <= 0) {
            const bullet: Bullet = this.bullets.get()
            if (bullet) {
               const yOffset = Math.random()*30-15
               bullet.spawn(this.body.center.x + this.displayWidth/3, this.body.center.y + yOffset, 0, 800, 0)
               bullet.setDepth(-1)
               this.cooldown = this.maxCooldown
            }
        } 
    }
}