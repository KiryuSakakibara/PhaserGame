import { Vec2 } from "planck"
import { PlanckScale } from "./PhysicsConstants"
import Player from "./Player"

export default class PlayerCam extends Phaser.Cameras.Scene2D.Camera {

    /** The player the camera is following */
    player: Player

    /** The offset target the camera is constantly lerping towards */
    offsetTarget: Phaser.Math.Vector2 = new Phaser.Math.Vector2()

    constructor(mainCam: Phaser.Cameras.Scene2D.Camera, player: Player) {
        super(mainCam.x, mainCam.y, mainCam.width, mainCam.height)
        this.player = player
        this.scene = player.scene
        this.centerOn(player.x, player.y)
    }

    update(time: number, delta: number): void {
        this.followPlayer()
    }

    followPlayer() {
        console.log(this.scene.customInputs.mouseScreenPos)
        let mousePos = this.scene.customInputs.mouseScreenPos.scale(0.5)
        this.offsetTarget.lerp(mousePos, 0.1)
        this.centerOn(this.player.x + this.offsetTarget.x, this.player.y + this.offsetTarget.y)
    }
}