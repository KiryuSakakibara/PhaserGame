export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    health: number = 100

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture) {
        super(scene, x, y, texture)
        scene.physics.world.enable(this)
        scene.add.existing(this)
    }

    dealDamage(damage: number) {
        this.health -= damage
    }
}