type Key = Phaser.Input.Keyboard.Key
const {KeyCodes} = Phaser.Input.Keyboard

/**
 * Handles all inputs and stores them in variables.
 * Call setScene() every time a scene is changed.
 */
export default class InputController {
    up: Key
    down: Key
    left: Key
    right: Key
    shoot: Key
    debug: Key
    timeStop: Key

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
        this.debug = keyboard.addKey(KeyCodes.D)
        this.timeStop = keyboard.addKey(KeyCodes.SHIFT)
    }


}