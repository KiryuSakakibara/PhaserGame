import Phaser from "phaser"
import Bullet from "./Bullets/Bullet"
import EnemyBullet from "./Bullets/EnemyBullets/EnemyBullet"
import PlanckSprite from "./PlanckSprite"
import GameScene from "../scenes/GameScene"
import {Bits, createCircleFixture, Masks, PlanckScale } from "./PhysicsConstants"
import * as Planck from "planck"
enum Attack {

}
var Vec2 = Phaser.Math.Vector2

export default class Enemy extends PlanckSprite {
    health: number = 100
    bullets: Phaser.GameObjects.Group
    /** The time elapsed since the last attack in milliseconds*/
    attackTimer: number = 0
    wavesFired: number = 0

    animKeys: string[]

    // Attack 1 constants
    /** The delay between waves in milliseconds */
    delayBetweenWaves: number = 100
    /** The angle between waves in radians */
    angleBetweenWaves: number = 4
    /** The number of shots per wave */
    shotsPerWave: number = 5
    /** The speed of the bullet in pixels/second */
    bulletSpeed: number = 700
    /** circle completion percentage */
    circleCompletion: number = 0

    constructor(scene: GameScene, x: number, y: number) {
        super(scene, x, y, "SnakeHead")
        this.pbody.createFixture(createCircleFixture(45, Bits.enemy, Masks.enemy))
        

        // Create the bullets
        this.bullets = scene.add.group({
            classType: EnemyBullet,
            maxSize: 5000,
            runChildUpdate: false
        })
        
        /*
        for (let i=0; i<1000; i++) {
            this.bullets.add(new Bullet(scene))
        }
        */

        // make the animations
        let atlasMetaData = this.scene.cache.json.get("SnakeHeadMeta")
        let layers = atlasMetaData["layers"] as Object[]
        let tags = atlasMetaData["frameTags"] as Object[]
        layers.forEach(layer => {
            tags.forEach(tag => {
                let animName = layer["name"] + "-" + tag["name"]
                this.scene.anims.create({
                    key: animName,
                    frames: this.scene.anims.generateFrameNames("SnakeHead", {
                        prefix: animName + "-",
                        start: tag["from"],
                        end: tag["to"]
                    })
                })
            })
        });
        // Animation keys go clockwise starting at east
        this.animKeys = [
            "east-idle",
            "southeast-idle",
            "south-idle",
            "southwest-idle",
            "west-idle",
            "northwest-idle",
            "north-idle",
            "northeast-idle"
        ]
        this.play("east-idle")
    }

    update(time: number, delta: number, timeScale: number): void {
        super.update(time, delta, timeScale)
        this.attackTimer += delta * timeScale
        this.attack1()

        this.bullets.getChildren().forEach((bullet) => {
            (bullet as EnemyBullet).update(time, delta, timeScale);
        })

        this.circleCompletion = (this.circleCompletion + delta/10000*timeScale)%1
        let angle = Math.PI*2*this.circleCompletion

        this.setPosition(960+800*Math.cos(angle), 540-400*Math.sin(angle))
        //this.pbody.setAngle((-angle-Math.PI/2+Math.PI/8)%(Math.PI/4)+Math.PI/8)
        //this.setRotation((-angle-Math.PI/2+Math.PI/8)%(Math.PI/4)+Math.PI/8)

        // set the animation
        let theta = -angle - Math.PI/2
        let index = Math.floor((theta+Math.PI/8)/(Math.PI/4))%8
        if (index < 0) index += 8
        this.play(this.animKeys[index])
        //this.texture.setFilter(Phaser.Textures.FilterMode.NEAREST)
    }

    dealDamage(damage: number) {
        this.health -= damage
    }

    attack1() {
        while (this.attackTimer >= 0) {
            let baseAngle = this.angleBetweenWaves * this.wavesFired % Math.PI*2
            for (let i=0; i<this.shotsPerWave; i++) {
                const bullet: EnemyBullet = this.bullets.get()
                let angle = baseAngle + Math.PI*2*i/this.shotsPerWave
                let vel = (new Vec2(Math.cos(angle), Math.sin(angle))).scale(this.bulletSpeed)
                if (bullet) {
                    bullet.spawn(this.pbody.getPosition().x/this.planckScale + vel.x*this.attackTimer/1000,
                        this.pbody.getPosition().y/this.planckScale + vel.y*this.attackTimer/1000, angle, vel.x, vel.y)
                    bullet.setDepth(-0.1)
                }

            }
            this.wavesFired++
            this.attackTimer -=this.delayBetweenWaves
        }
    }


}