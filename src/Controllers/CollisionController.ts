import Phaser from "phaser";
import Enemy from "../gameobjects/Enemy";
import * as Planck from "planck"
import { BodyData } from "../gameobjects/PhysicsConstants";
import PlayerBullet from "../gameobjects/Bullets/PlayerBullets/PlayerBullet";
import Player from "../gameobjects/Player";
import EnemyBullet from "../gameobjects/Bullets/EnemyBullets/EnemyBullet";

export function collision(contact: Planck.Contact) {
    let fixA = contact.getFixtureA()
    let fixB = contact.getFixtureB()
    let bdA = fixA.getBody()
    let bdB = fixB.getBody()
    let spriteA = (bdA.getUserData() as BodyData).sprite
    let spriteB = (bdB.getUserData() as BodyData).sprite

    // Enemy and PlayerBullet collision
    if (spriteA instanceof Enemy && spriteB instanceof PlayerBullet) {
        spriteA.dealDamage(1)
        spriteB.disable()
    } else if (spriteA instanceof PlayerBullet && spriteB instanceof Enemy) {
        spriteB.dealDamage(1)
        spriteA.disable()
    }
    
    // Player and EnemyBullet collision
    if (spriteA instanceof Player && spriteB instanceof EnemyBullet) {
        spriteA.dealDamage(1)
        spriteB.disable()
    } else if (spriteA instanceof EnemyBullet && spriteB instanceof Player) {
        spriteB.dealDamage(1)
        spriteA.disable()
    }

}