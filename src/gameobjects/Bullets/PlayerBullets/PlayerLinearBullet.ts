import Phaser from "phaser";
import PlayerBullet from "./PlayerBullet";
import GameScene from "../../../scenes/GameScene";
import * as Planck from "planck"
import { linearPlayerBulletFixture } from "../../PhysicsConstants";

export default class PlayerLinearBullet extends PlayerBullet {
    constructor(scene: GameScene, x: number, y: number, texture: string) {
        super(scene, x, y, "PlayerBullet")
        this.pbody.createFixture(linearPlayerBulletFixture)
    }
}