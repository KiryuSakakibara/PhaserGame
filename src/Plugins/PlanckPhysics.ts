import Phaser from "phaser";
import * as Planck from "planck"

export default class PlanckPhysicsPlugin extends Phaser.Plugins.ScenePlugin {

    world: Planck.World
    worldScale: number

    constructor(scene: Phaser.Scene, pluginManager: Phaser.Plugins.PluginManager) {
        super(scene, pluginManager, "PlanckPhysicsPlugin")

        this.world = Planck.World()
    }
}