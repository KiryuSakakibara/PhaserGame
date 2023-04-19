import Phaser, { Physics } from "phaser";
import Ship from "../gameobjects/Ship";
export default class GameScene extends Phaser.Scene {
    
    ship: Phaser.Types.Physics.Arcade.ImageWithDynamicBody
    walpurgisNacht: Phaser.GameObjects.Image

    constructor() {
        super("GameScene")
    }

    preload() {

    }

    create() {
        this.physics.world.setBounds(0, 0, 800, 600)
        this.walpurgisNacht = this.add.image(400, 100, "walpurgisnachtImage")
        //this.ship = this.add.existing(new Ship(this, 400, 560, 30, 40, 0xffffff))
        //this.ship = this.physics.add.existing(new Ship(this, 400, 560, 30, 40, 0xffffff))
        
        this.ship = this.physics.add.image(400, 300, "walpurgisnachtImage")
        this.ship.setVelocityX(20)
        
    }
}