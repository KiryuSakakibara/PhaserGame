import Phaser from "phaser";
import Enemy from "../gameobjects/Enemy";
import Player from "../gameobjects/Player";
import GameScene from "./GameScene";

export default class Stage1 extends GameScene {
    walpurgisNacht: Enemy
    player: Player
    enemyHealthText: Phaser.GameObjects.Text
    playerHealthText: Phaser.GameObjects.Text
    fpsText: Phaser.GameObjects.Text

    constructor() {
        super("Stage1")
    }

    create(): void {
        super.create()
        // Create the game objects
        this.walpurgisNacht = new Enemy(this, 1760, 540)
        this.player = new Player(this, 100, 540)
        

        // Create the on screen text
        this.enemyHealthText = this.add.text(20, 20, this.walpurgisNacht.health.toString(), { color: '#ff0000' }).setScale(2)
        this.playerHealthText = this.add.text(20, 60, this.player.health.toString(), {color: "#00ff00"}).setScale(2)
        this.fpsText = this.add.text(20, 100, "fps").setScale(2)
    }

    update(time: number, delta: number): void {
        super.update(time, delta)

        this.player.update(time, delta, this.timeScale)
        this.walpurgisNacht.update(time, delta, this.timeScale)

        // Update text
        this.enemyHealthText.setText(this.walpurgisNacht.health.toString())
        this.playerHealthText.setText(this.player.health.toString())
        this.fpsText.setText(`fps: ${Math.round(1000/delta*10)/10}`)
    }
}