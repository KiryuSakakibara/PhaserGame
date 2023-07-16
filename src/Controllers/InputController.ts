import Phaser, { Input } from "phaser"
type Key = Phaser.Input.Keyboard.Key
const {KeyCodes} = Phaser.Input.Keyboard

/**
 * Handles all inputs and stores them in variables.
 * Call setScene() every time a scene is changed.
 */
export default class InputController {
    private scene: Phaser.Scene

    // Keys
    up: Key
    down: Key
    left: Key
    right: Key
    debug: Key
    timeStop: Key
    /** Either a key or undefined if using a mouse button */
    shoot: Key | undefined = undefined

    // mouse
    mouseX: number
    mouseY: number

    // states
    isShooting: boolean
    shootToggled: boolean

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
        // KEYS
        let keyboard = this.scene.input.keyboard
        this.up = keyboard.addKey(KeyCodes.W)
        this.down = keyboard.addKey(KeyCodes.S)
        this.left = keyboard.addKey(KeyCodes.A)
        this.right = keyboard.addKey(KeyCodes.D)
        this.debug = keyboard.addKey(KeyCodes.P)
        this.timeStop = keyboard.addKey(KeyCodes.SHIFT)

        // MOUSE
        //this.shoot = keyboard.addKey(KeyCodes.SPACE)
        this.shoot = undefined
        this.scene.input.on('pointermove', (pointer: Input.Pointer) => {
            this.mouseX = pointer.x
            this.mouseY = pointer.y
        })
        if (this.shoot === undefined) {
            this.scene.input.on('pointerdown', (pointer: Input.Pointer) => {
                if (pointer.leftButtonDown()) {
                    this.isShooting = !this.isShooting
                }
            })
        }
        
        this.scene.input.mouse.disableContextMenu()
    }

    update() {
        let activePointer = this.scene.input.activePointer
        if (this.shoot instanceof Phaser.Input.Keyboard.Key) {
            if (Phaser.Input.Keyboard.JustDown(this.shoot)) {
                this.isShooting = !this.isShooting
            }
        }
    }


}