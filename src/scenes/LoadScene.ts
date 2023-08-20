import Phaser from "phaser";

export default class LoadScene extends Phaser.Scene {
    constructor() {
        super("LoadScene")
    }

    preload() {
        // The default path starts at the PhaserGameAssets/Assets folder
        this.load.image("walpurgisnachtImage", "assets/Walpurgisnacht.png")
        this.load.image("bullet", "assets/bullet.png")
        this.load.image("Carmine", "assets/Sprites/Characters/Carmine/Carmine.png")
        this.load.image("PlayerBullet", "assets/Sprites/Projectiles/Bullet.png")
    }

    create() {
        this.scene.start("Stage1")
    }
}