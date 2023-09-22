import Phaser from "phaser";
import Bullet from "../Bullet";
import GameScene from "../../../scenes/GameScene";
import { Bits, Masks, createCircleFixture } from "../../PhysicsConstants";
import { RenderOrder } from "../../../Constants/RenderOrder";

export default class EnemyBullet extends Bullet {
    constructor(scene: GameScene, x: number, y: number) {
        super(scene, x, y, "DefaultEnemyBullet")
        this.lifeSpan = 3000
        this.pbody.createFixture(createCircleFixture(4, Bits.enemyBullet, Masks.enemyBullet))
        this.setDepth(RenderOrder.indexOf("enemyBullet"))
    }
}