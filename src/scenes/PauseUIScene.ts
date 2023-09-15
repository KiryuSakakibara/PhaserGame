export default class PauseUIScene extends Phaser.Scene {
    constructor() {
        super({key: "PauseUIScene"})
    }

    create() {
        this.add.sprite(0, 0, "Player").setScale(5)
    }
}