import Phaser from "phaser"
import InputController from "../Controllers/InputController"
import Bullet from "./Bullets/Bullet"
import PlayerLinearBullet from "./Bullets/PlayerBullets/PlayerLinearBullet"

type Key = Phaser.Input.Keyboard.Key
var KeyCodes = Phaser.Input.Keyboard.KeyCodes
var Vec2 = Phaser.Math.Vector2

export default class Player extends Phaser.Physics.Arcade.Sprite {
    /** The inputController */
    inputs: InputController
    /** The speed of the ship */
    speed = 300
    /** The max cooldown of the ship */
    maxCooldown = 100
    /** The remaining shooting cooldown of the ship */
    cooldown = 0
    /** The collection of bullets owned by the ship */
    bullets: Phaser.GameObjects.Group
    /** The health of the player */
    health: number = 10

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture,
                inputs: InputController) {

        // Create the gameobject and add it to the physics world
        super(scene, x, y, texture)
        scene.physics.world.enable(this)
        scene.add.existing(this)
        this.setCollideWorldBounds(true)
        this.setSize(this.width*0.3, this.height*0.5)
        this.body.setOffset(this.body.offset.x-0.5, this.body.offset.y+2)
        //let radius = 5
        //this.setCircle(radius, this.displayWidth/2-radius-0.5, this.displayHeight/2-radius+4)
        this.setScale(2, 2)

        // Set the inputs
        this.inputs = inputs
        
        // Create the bullets
        
        this.bullets = scene.add.group({
            classType: PlayerLinearBullet,
            maxSize: 1000,
            runChildUpdate: false,
        })
        /*
        this.bullets.createMultiple({
            classType: Bullet,
            quantity: this.bullets.maxSize,
            visible: false,
            active: false
        })
        */
        
        
        
    }

    protected preUpdate(time: number, delta: number): void {
        super.preUpdate(time, delta)
    }

    update(time: number, delta: number, timeScale: number): void {
        super.update(time, delta)

        this.cooldown -= delta

        this.bullets.getChildren().forEach((bullet) => {
            (bullet as PlayerLinearBullet).update(time, delta, timeScale)
        })

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
        if (this.inputs.isShooting && this.cooldown <= 0) {
            const bullet: PlayerLinearBullet = this.bullets.get()
            if (bullet) {
                let angle = Phaser.Math.Angle.Between(this.inputs.mouseX, this.inputs.mouseY, this.x, this.y)
                angle += Math.random()*Math.PI/20-Math.PI/40 + Math.PI
                bullet.spawn(this.x, this.y, angle, 1.5*Math.cos(angle), 1.5*Math.sin(angle))
                bullet.setDepth(-1)
                this.cooldown = this.maxCooldown
            }
        } 
    }

    dealDamage(damage: number) {
        this.health -= damage
    }
}