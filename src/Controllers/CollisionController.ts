import Phaser from "phaser";
import Enemy from "../gameobjects/Enemy";
import * as Planck from "planck"
import { UserData } from "../gameobjects/PhysicsConstants";
import PlayerBullet from "../gameobjects/Bullets/PlayerBullets/PlayerBullet";
import Player from "../gameobjects/Player";
import EnemyBullet from "../gameobjects/Bullets/EnemyBullets/EnemyBullet";

export function collision(contact: Planck.Contact) {
    console.log("contact detected")
    let fixA = contact.getFixtureA()
    let fixB = contact.getFixtureB()
    let spriteA = (fixA.getUserData() as UserData).sprite
    let spriteB = (fixB.getUserData() as UserData).sprite

    
    if (spriteA instanceof Enemy && spriteB instanceof PlayerBullet) {
        spriteA.dealDamage(1)
    } else if (spriteA instanceof PlayerBullet && spriteB instanceof Enemy) {
        spriteB.dealDamage(1)
    }
    
    if (spriteA instanceof Player && spriteB instanceof EnemyBullet) {
        spriteA.dealDamage(1)
    } else if (spriteA instanceof EnemyBullet && spriteB instanceof Player) {
        spriteB.dealDamage(1)
    }

}