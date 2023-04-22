import Phaser from "phaser";
import ShipSprite from "../gameobjects/ShipSprite";
import Bullet from "../gameobjects/Bullet";

var Vec2 = Phaser.Math.Vector2

export default class GameScene extends Phaser.Scene {
    
    
    walpurgisNacht: Phaser.GameObjects.Image
    shipSprite: ShipSprite
    bulletCount: number = 0
    spacebar: Phaser.Input.Keyboard.Key
    bullets: Phaser.GameObjects.Group;

    constructor() {
        super("GameScene")
    }

    preload() {

    }

    create() {
        //this.physics.world.setBounds(0, 0, 800, 600)
        this.walpurgisNacht = this.add.sprite(700, 300, "walpurgisnachtImage")
        this.shipSprite = new ShipSprite(this, 100, 300, "walpurgisnachtImage")
        this.shipSprite.setScale(0.2, 0.2)
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        this.bullets = this.add.group({
            classType: Bullet,
            maxSize: 200,
            runChildUpdate: true
        })
    }

    
    update(time: number, delta: number): void {
        this.shipSprite.update(time, delta)
    }
    
    
}