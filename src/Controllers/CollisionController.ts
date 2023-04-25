import { GameObjects } from "phaser";
import Bullet from "../gameobjects/Bullet";
import Enemy from "../gameobjects/Enemy";
import ShipSprite from "../gameobjects/ShipSprite";


export function bulletEnemy(ob1: Phaser.GameObjects.GameObject, ob2: Phaser.GameObjects.GameObject) {
    let bullet = ob1 as Bullet
    let enemy = ob2 as Enemy
    bullet.disableBody(true, true)
    enemy.dealDamage(1)
}

export function bulletPlayer(obj1: Phaser.GameObjects.GameObject, obj2: Phaser.GameObjects.GameObject) {
    let bullet = obj1 as Bullet
    let player = obj2 as ShipSprite
    bullet.disableBody(true, true)
    player.dealDamage(1)
}