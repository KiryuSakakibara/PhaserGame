import Phaser from "phaser"
import GameScene from "./scenes/GameScene"
import LoadScene from "./scenes/LoadScene"
import Stage1 from "./scenes/Stage1"
import PlanckPhysicsPlugin from "./Plugins/PlanckPhysicsPlugin"
import CustomInputPlugin from "./Plugins/CustomInputPlugin"
import PauseUIScene from "./scenes/PauseUIScene"
import RexUIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin"

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    title: "PhaserGame",
    backgroundColor: '#2d2d2d',
    scale: {
        width: 1920,
        height: 1080,
        zoom: 1,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    parent: "game",
    fps: {
        target: 60,
        smoothStep: true
    },
    plugins: {
        scene: [
            {key: "planck", plugin: PlanckPhysicsPlugin, start: true, mapping: "planck"},
            {key: "customInputs", plugin: CustomInputPlugin, mapping: "customInputs"},
            {key: "rexUI", plugin: RexUIPlugin, mapping: "rexUI"}
        ]
    },
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: 0},
            /*
            x: -1920,
            y: -1080,
            width: 3840,
            height: 2160
            
            x: -960,
            y: -540,
            width: 1920,
            height: 1080
            */
        }
    },
    input: {
        mouse: {
            target: window
        }
    },
    scene: [LoadScene, Stage1, PauseUIScene],
}

export default new Phaser.Game(config)