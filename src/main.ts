import Phaser from "phaser"
import GameScene from "./scenes/GameScene"
import LoadScene from "./scenes/LoadScene"
import Stage1 from "./scenes/Stage1"

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    title: "PhaserGame",
    backgroundColor: '#2d2d2d',
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: 0},
            debug: true
        }
    },
    input: {
        mouse: {
            target: window
        }
    },
    scene: [LoadScene, Stage1]
}

export default new Phaser.Game(config)