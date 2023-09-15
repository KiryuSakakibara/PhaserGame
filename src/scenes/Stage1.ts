import Phaser from "phaser";
import Enemy from "../gameobjects/Enemy";
import Player from "../gameobjects/Player";
import GameScene from "./GameScene";
import { RenderOrder } from "../Constants/RenderOrder";

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
        //this.cameras.main.setBounds(-1440, -810, 2880, 1620)
        //this.physics.world.setBounds(-1440, -810, 2880, 1620)
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
        
        // move camera
        this.moveCamera()

        // Update text
        this.enemyHealthText.setText(this.walpurgisNacht.health.toString())
        this.playerHealthText.setText(this.player.health.toString())
        this.fpsText.setText(`fps: ${Math.round(1000/delta*10)/10}`)

    }

    /**
     * Moves the camera towards the mouse when aiming far away
     */
    moveCamera() {
        // Differences between mouse and player
        let dx = this.customInputs.mouseWorldPos.x - this.player.x
        let dy = this.customInputs.mouseWorldPos.y - this.player.y
        // thresholds for camera movement
        let w = this.cameras.main.displayWidth*1/4
        let h = this.cameras.main.displayHeight*1/4
        let target = new Phaser.Math.Vector2()
        target.x = this.player.x + (dx > 0 ? Math.max(dx-w, 0) : Math.min(dx+w, 0))*0.65
        target.y = this.player.y + (dy > 0 ? Math.max(dy-h, 0) : Math.min(dy+h, 0))*0.65
        target = this.cameras.main.midPoint.lerp(target, 0.1)

        this.cameras.main.centerOn(target.x, target.y)
    }
}