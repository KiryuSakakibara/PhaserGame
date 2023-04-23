import Bullet from "../gameobjects/Bullet";
import Enemy from "../gameobjects/Enemy";


export function bulletEnemy(ob1: Phaser.GameObjects.GameObject, ob2: Phaser.GameObjects.GameObject) {
    let bullet = ob1 as Bullet
    let enemy = ob2 as Enemy
    bullet.disableBody(true, true)
    enemy.dealDamage(1)
}