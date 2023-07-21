import Phaser from "phaser";
import Bullet from "../Bullet";

export default class EnemyBullet extends Bullet {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: Phaser.Textures.Texture) {
        super(scene, x, y, "bullet")
    }
}