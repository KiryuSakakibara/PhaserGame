import Phaser from "phaser";
import Bullet from "../Bullet";
import GameScene from "../../../scenes/GameScene";

export default class EnemyBullet extends Bullet {
    constructor(scene: GameScene, x: number, y: number, texture: Phaser.Textures.Texture) {
        super(scene, x, y, "bullet")
        this.lifeSpan = 3000
    }
}