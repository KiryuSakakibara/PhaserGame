import Phaser from "phaser";
import PlayerBullet from "./PlayerBullet";
import GameScene from "../../../scenes/GameScene";
import * as Planck from "planck"
import { Bits, createBoxFixture, Masks } from "../../PhysicsConstants";

export default class PlayerLinearBullet extends PlayerBullet {
    constructor(scene: GameScene, x: number, y: number) {
        super(scene, x, y, "DefaultPlayerBullet")
        this.pbody.createFixture(createBoxFixture(
            50, 30, Bits.playerBullet, Masks.playerBullet))
    }
}