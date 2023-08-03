import Phaser from "phaser";
import { bulletEnemy, bulletPlayer } from "../Controllers/CollisionController";
import Enemy from "../gameobjects/Enemy";
import Player from "../gameobjects/Player";
import GameScene from "./GameScene";

export default class Stage1 extends GameScene {
    walpurgisNacht: Enemy
    player: Player
    enemyHealthText: Phaser.GameObjects.Text
    playerHealthText: Phaser.GameObjects.Text

    constructor() {
        super("Stage1")
    }

    create(): void {
        super.create()
        // Create the game objects
        this.walpurgisNacht = new Enemy(this, 700, 300, "walpurgisnachtImage").setScale(0.7)
        this.player = new Player(this, 100, 300, "Carmine", this.inputs)

        // Create collisions
        this.physics.add.overlap(this.player.bullets, this.walpurgisNacht, bulletEnemy)
        this.physics.add.overlap(this.walpurgisNacht.bullets, this.player, bulletPlayer)
        

        // Create the on screen text
        this.enemyHealthText = this.add.text(20, 20, this.walpurgisNacht.health.toString(), { color: '#ff0000' })
        this.playerHealthText = this.add.text(20, 40, this.player.health.toString(), {color: "#00ff00"})
    }

    update(time: number, delta: number): void {
        super.update(time, delta)

        this.player.update(time, delta, this.timeScale)
        this.walpurgisNacht.update(time, delta, this.timeScale)

        // Update text
        this.enemyHealthText.setText(this.walpurgisNacht.health.toString())
        this.playerHealthText.setText(this.player.health.toString())
    }
}