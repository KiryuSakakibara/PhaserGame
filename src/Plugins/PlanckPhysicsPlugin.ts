import Phaser from "phaser";
import * as Planck from "planck"
import { collision } from "../Controllers/CollisionController";
import { BodyData } from "../gameobjects/PhysicsConstants";

export default class PlanckPhysicsPlugin extends Phaser.Plugins.ScenePlugin {

    /** The planck world */
    world: Planck.World
    /** The scale to multiply by to convert from pixels to meters */
    planckScale = 0.02
    /** How much the pixel art is scaled up by */
    pixelScale = 4
    /** Whether debug lines should be drawn or not */
    drawDebug = false

    constructor(scene: Phaser.Scene, pluginManager: Phaser.Plugins.PluginManager) {
        super(scene, pluginManager, "planck")

        this.world = Planck.World()
        this.world.on("begin-contact", collision)
    }

    /**
     * Steps the world by 1/60 of a second
     */
    stepWorld() {
        // Update all sprites' previous positions so they can be interpolated to the new positions
        for (let body = this.world.getBodyList(); body; body = body.getNext()) {
            let sprite = (body.getUserData() as BodyData).sprite
            sprite.previousBodyPos = sprite.pbody.getPosition().clone()
        }
        this.world.step(1/60, 1, 5)
    }

}
