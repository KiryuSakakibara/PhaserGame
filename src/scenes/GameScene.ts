import Phaser, { Physics } from "phaser";
import ShipSprite from "../gameobjects/ShipSprite";
export default class GameScene extends Phaser.Scene {
    
    walpurgisNacht: Phaser.GameObjects.Image
    shipSprite: ShipSprite

    constructor() {
        super("GameScene")
    }

    preload() {

    }

    create() {
        //this.physics.world.setBounds(0, 0, 800, 600)
        this.walpurgisNacht = this.add.image(400, 100, "walpurgisnachtImage")
        this.shipSprite = new ShipSprite(this, 400, 600, "walpurgisnachtImage")
        
    }

    
    update(time: number, delta: number): void {
        this.shipSprite.update()
    }
    
}