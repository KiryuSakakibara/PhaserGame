type Key = Phaser.Input.Keyboard.Key
var KeyCodes = Phaser.Input.Keyboard.KeyCodes

/**
 * Handles all inputs and stores them in variables
 */
export default class InputController {
    up: Key
    down: Key
    left: Key
    right: Key
    shoot: Key

    private scene: Phaser.Scene

    constructor(scene: Phaser.Scene) {
        this.scene = scene

        // Creating the inputs
        this.setKeys()
    }

    setScene(scene: Phaser.Scene) {
        this.scene = scene
        this.setKeys()
    }

    setKeys() {
        let keyboard = this.scene.input.keyboard
        this.up = keyboard.addKey(KeyCodes.UP)
        this.down = keyboard.addKey(KeyCodes.DOWN)
        this.left = keyboard.addKey(KeyCodes.LEFT)
        this.right = keyboard.addKey(KeyCodes.RIGHT)
        this.shoot = keyboard.addKey(KeyCodes.SPACE)
    }


}