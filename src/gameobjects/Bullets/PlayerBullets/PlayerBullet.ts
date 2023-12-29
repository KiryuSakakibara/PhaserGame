import Phaser from "phaser";
import Bullet from "../Bullet";
import GameScene from "../../../scenes/GameScene";
import { PlayerConst } from "../../../Constants/GameObjects/PlayerConst";
import { RenderOrder } from "../../../Constants/RenderOrder";
import { Vec2 } from "planck";
import { PlanckScale } from "../../PhysicsConstants";

export default class PlayerBullet extends Bullet {

    /** how long it takes for the timeScale of the bullet to synchronize with the timeScale
     * of the world
     */
    timeScaleDelay: number

    constructor(scene: GameScene, x: number, y: number, texture: string) {
        super(scene, x, y, texture)
        this.timeScaleDelay = PlayerConst.playerBulletTimeScaleDelay
        this.lifeSpan = 10000
        this.setDepth(RenderOrder.indexOf("playerBullet"))
    }
    
    update(time: number, delta: number, timeScale: number) {
        //super.update(time, delta, this.calculateTimeScale(this.age, timeScale))
        // The physics world has already been updated at this point
        
        let lastPhysUpdate = this.trueAge + delta - (this.scene as GameScene).timeSincePhysicsUpdate
        let physOverflowTime = lastPhysUpdate + 1000/60 - this.timeScaleDelay
        let overflowTime = this.trueAge + delta - this.timeScaleDelay
        let didAdjustPhysics = false
        
        if (lastPhysUpdate < this.timeScaleDelay) {
            if (physOverflowTime > 0 && physOverflowTime < 1000/60) {
                let avgPhysTimeScale = physOverflowTime/(1000/60)*timeScale + (1000/60-physOverflowTime)/(1000/60)*1
                this.pbody.setPosition(this.previousBodyPos.clone().add(this.rawVelocity.clone().mul(1/60*avgPhysTimeScale*PlanckScale)))
                didAdjustPhysics = true
            }
        }
        
        
        if (this.trueAge < this.timeScaleDelay) {
            // If the time scale change occurs in between frames
            //let physOverflowTime = this.age + delta - (this.scene as GameScene).timeSincePhysicsUpdate + 1000/60 - this.timeScaleDelay
            
            if (overflowTime > 0 && overflowTime < delta) {
                //let avgTimeScale = overflowTime/delta*timeScale + (delta-overflowTime)/delta*1
                //let avgPhysTimeScale = physOverflowTime/(1000/60)*timeScale + (1000/60-physOverflowTime)/(1000/60)*1
                //this.pbody.setPosition(this.previousBodyPos.clone().add(this.rawVelocity.clone().mul(1/60*avgPhysTimeScale*PlanckScale)))
                //this.pbody.setPosition(Vec2.combine(1-avgPhysTimeScale, this.previousBodyPos, avgPhysTimeScale, this.pbody.getPosition()))
                
                super.update(time, delta-overflowTime, 1)
                super.update(time, overflowTime, timeScale)
                //super.update(time, delta, overflowTime/delta*timeScale + (delta-overflowTime)/delta*1)
            } else {
                super.update(time, delta, 1)
                if (didAdjustPhysics) {
                    super.update(time, 0, timeScale)
                }
            }
        } else {
            super.update(time, delta, timeScale)
        }

        // age is updated
    }

    /**
     * Function scaling with age so that timeScale is reached at {@link timeScaleDelay} milliseconds
     * @param age age of bullet in milliseconds
     * @param endTimeScale the destination/desired time scale
     */
    calculateTimeScale(age: number, endTimeScale: number): number {
        if (age >= this.timeScaleDelay) {
            return endTimeScale
        } else {
            //return 1-(age/this.timeScaleDelay)**3 + endTimeScale*(age/this.timeScaleDelay)**3
            return 1
        }
    }
}