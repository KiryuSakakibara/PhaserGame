import Phaser from "phaser";
import PlanckSprite from "../PlanckSprite";
import * as Planck from "planck"
import GameScene from "../../scenes/GameScene";
import PlayerLinearBullet from "./PlayerBullets/PlayerLinearBullet";

export default class Bullet extends PlanckSprite {

    lifeSpan: number = 1000
    age = 0
    
    constructor(scene: GameScene, x: number, y: number, texture: string) {
        super(scene, x, y, texture)
        //scene.physics.world.enable(this)

        //this.disableBody(true, true)
    }

    update(time: number, delta: number, timeScale: number): void {
        if (this.active) {
            super.update(time, delta, timeScale)

            this.age += delta * timeScale
            let bounds = this.scene.physics.world.bounds
            if (this.x-this.displayWidth/2 > bounds.x+bounds.width || this.x+this.displayWidth/2 < bounds.x ||
                this.y-this.displayHeight/2 > bounds.y+bounds.height || this.y+this.displayHeight/2 < bounds.y ||
                this.age > this.lifeSpan) {
                this.disable()
            }
            
        }
        
    }

    /**
     * 
     * @param x x position in pixels
     * @param y y position in pixels
     * @param angle angle in radians
     * @param vx x velocity in pixels/second
     * @param vy y velocity in pixels/second
     */
    spawn(x: number, y: number, angle: number, vx=0, vy=0) {
        //this.pbody.setPosition(Planck.Vec2(x*this.planckScale, y*this.planckScale))
        this.setFullPosition(x, y)
        this.pbody.setAngle(angle)
        this.setRawVelocity(vx, vy)
        
        this.enable()
        this.age = 0
    }


}