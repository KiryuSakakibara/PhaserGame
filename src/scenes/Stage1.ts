import Phaser from "phaser";
import Enemy from "../gameobjects/Enemy";
import Player from "../gameobjects/Player";
import GameScene from "./GameScene";
import { RenderOrder } from "../Constants/RenderOrder";
import PlayerCam from "../gameobjects/PlayerCam";

export default class Stage1 extends GameScene {
    walpurgisNacht: Enemy
    player: Player
    enemyHealthText: Phaser.GameObjects.Text
    playerHealthText: Phaser.GameObjects.Text
    fpsText: Phaser.GameObjects.Text

    /** The graphics for this scene's world bounds */
    graphics: Phaser.GameObjects.Graphics

    constructor() {
        super("Stage1")
    }

    create(): void {
        super.create()

        // Create the debug graphics for the bounds
        this.graphics = this.add.graphics()
        this.graphics.strokeRectShape(this.physics.world.bounds)

        // Create the game objects
        this.walpurgisNacht = new Enemy(this, 800, 0)
        this.player = new Player(this, 0, 0)
        this.cameras.addExisting(new PlayerCam(this.cameras.main, this.player), true)
        this.cameras.main.setBounds(-1440, -1440, 2880, 2880)
        this.physics.world.setBounds(-1440, -1440, 2880, 2880)

        // Create the on screen text
        this.enemyHealthText = this.add.text(20, 20, this.walpurgisNacht.health.toString(), { color: '#ff0000' }).setScale(2)
        this.enemyHealthText.setScrollFactor(0, 0).setDepth(RenderOrder.indexOf("debug"))
        this.playerHealthText = this.add.text(20, 60, this.player.health.toString(), {color: "#00ff00"}).setScale(2)
        this.playerHealthText.setScrollFactor(0, 0).setDepth(RenderOrder.indexOf("debug"))
        this.fpsText = this.add.text(20, 100, "fps").setScale(2)
        this.fpsText.setScrollFactor(0, 0).setDepth(RenderOrder.indexOf("debug"))

        // Create the background
        let background = this.add.sprite(0, 0, "GrassBackground")
        background.setDepth(RenderOrder.indexOf("background"))
        background.texture.setFilter(Phaser.Textures.FilterMode.LINEAR)
        background.setScale(6)

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