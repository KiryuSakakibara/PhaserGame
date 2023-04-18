import Phaser from "phaser"
import GameScene from "./scenes/GameScene"
import LoadScene from "./scenes/LoadScene"

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    title: "PhaserGame",
    backgroundColor: '#2d2d2d',
    scene: [LoadScene, GameScene]
}

export default new Phaser.Game(config)