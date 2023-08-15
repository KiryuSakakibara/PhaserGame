import Phaser from "phaser";
import * as Planck from "planck"
import { collision } from "../Controllers/CollisionController";

export default class PlanckPhysics extends Phaser.Plugins.ScenePlugin {

    /** The planck world */
    world: Planck.World
    /** The scale to multiply by to convert from pixels to meters */
    planckScale = 0.02
    /** How much the pixel art is scaled up by */
    pixelScale = 5
    /** Whether debug lines should be drawn or not */
    drawDebug = false

    constructor(scene: Phaser.Scene, pluginManager: Phaser.Plugins.PluginManager) {
        super(scene, pluginManager, "myPlugin")

        this.world = Planck.World()
        this.world.on("begin-contact", collision)
    }

}
