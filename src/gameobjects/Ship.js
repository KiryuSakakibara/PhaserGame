import Phaser from "phaser";

export default class Ship extends Phaser.GameObjects.Rectangle {

    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {number} width
     * @param {number} height
     * @param {number} fillColor
     */
    constructor(scene, x, y, width=128, height=128, fillColor=0xffffff) {
        super(scene, x, y, width, height, fillColor)
    }


}