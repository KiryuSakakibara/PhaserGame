import Phaser, { Input } from "phaser"
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
    //shoot: Key
    debug: Key
    timeStop: Key

    mouseX: number
    mouseY: number
    leftMouseDown: boolean

    private scene: Phaser.Scene

    constructor(scene: Phaser.Scene) {
        this.scene = scene

        // Creating the inputs
        this.createInputs()
    }

    setScene(scene: Phaser.Scene) {
        this.scene = scene
        this.createInputs()
    }

    createInputs() {
        // keys
        let keyboard = this.scene.input.keyboard
        this.up = keyboard.addKey(KeyCodes.W)
        this.down = keyboard.addKey(KeyCodes.S)
        this.left = keyboard.addKey(KeyCodes.A)
        this.right = keyboard.addKey(KeyCodes.D)
        //this.shoot = keyboard.addKey(KeyCodes.SPACE)
        this.debug = keyboard.addKey(KeyCodes.P)
        this.timeStop = keyboard.addKey(KeyCodes.SHIFT)

        // mouse
        this.scene.input.on('pointermove', (pointer: Input.Pointer) => {
            this.mouseX = pointer.x
            this.mouseY = pointer.y
        })
    }

    update() {
        this.leftMouseDown = this.scene.input.mousePointer.leftButtonDown()
    }


}