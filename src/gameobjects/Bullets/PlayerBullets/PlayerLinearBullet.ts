import Phaser from "phaser";
import PlayerBullet from "./PlayerBullet";

export default class PlayerLinearBullet extends PlayerBullet {
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string | Phaser.Textures.Texture) {
        super(scene, x, y, "bullet")
    }
}