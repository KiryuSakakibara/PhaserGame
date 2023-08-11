import Phaser from "phaser";
import TimeSprite from "../TimeSprite";
import PlanckSprite from "../PlanckSprite";
import * as Planck from "planck"
import GameScene from "../../scenes/GameScene";

export default class Bullet extends PlanckSprite {

    lifeSpan: number = 1000
    age = 0
    
    constructor(scene: GameScene, x: number, y: number, texture: string) {
        super(scene, x, y, texture, scene.world)
        //scene.physics.world.enable(this)
        scene.add.existing(this)

        //this.disableBody(true, true)
    }

    update(time: number, delta: number, timeScale: number): void {
        if (this.active) {
            super.update(time, delta, timeScale)

            //this.lifeSpan -= delta * timeScale
            this.age += delta * timeScale
            let bounds = this.scene.physics.world.bounds
            if (this.x-this.displayWidth/2 > bounds.right || this.x+this.displayWidth/2 < 0 ||
                this.y-this.displayHeight/2 > bounds.bottom || this.y+this.displayHeight/2 < 0 ||
                this.age > this.lifeSpan) {

                //this.disableBody(true, true)
                this.disable()
            }
        }
        
    }

    spawn(x: number, y: number, angle: number, vx=0, vy=0) {
        //this.enableBody(true, x, y, true, true)
        this.setPosition(x, y)
        this.setRotation(angle)
        this.setVelocity(vx, vy)
        
        this.enable()
        this.age = 0
    }


}