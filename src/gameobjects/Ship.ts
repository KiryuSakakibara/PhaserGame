import Phaser from "phaser";

export default class Ship extends Phaser.GameObjects.Rectangle {

    constructor(scene: Phaser.Scene, x: number, y: number,
                width: number=128, height: number=128, fillColor: number=0xffffff) {
                    
        super(scene, x, y, width, height, fillColor)
    }


}